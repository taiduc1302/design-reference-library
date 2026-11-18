#!/usr/bin/env python3
"""Optional real-browser verification of the static research viewer.

Requires local Playwright for Python and a Playwright-installed Chromium browser.
No paid services, GitHub Actions, or third-party research packages are needed.
Fails closed if HTTP navigation/browser availability is blocked. No fake visual PASS.
"""
from contextlib import contextmanager
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import Thread

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / ".qa-output" / "opportunities"


@contextmanager
def local_server():
    handler = partial(SimpleHTTPRequestHandler, directory=str(ROOT))
    server = ThreadingHTTPServer(("127.0.0.1", 0), handler)
    thread = Thread(target=server.serve_forever, daemon=True)
    thread.start()
    try:
        yield f"http://127.0.0.1:{server.server_port}/gallery/opportunities.html"
    finally:
        server.shutdown()
        server.server_close()
        thread.join(timeout=5)


def main():
    from playwright.sync_api import sync_playwright

    OUT.mkdir(parents=True, exist_ok=True)
    modes = [
        ("desktop", {"viewport": {"width": 1440, "height": 900}}),
        ("dark", {"viewport": {"width": 1024, "height": 768}, "color_scheme": "dark"}),
        ("forced-colors", {"viewport": {"width": 768, "height": 1024}, "forced_colors": "active"}),
        ("reduced-motion", {"viewport": {"width": 390, "height": 844}, "reduced_motion": "reduce"}),
        ("reflow-320", {"viewport": {"width": 320, "height": 740}}),
    ]
    with local_server() as url, sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)
        try:
            for name, settings in modes:
                context = browser.new_context(**settings)
                page = context.new_page()
                errors = []
                page.on("pageerror", lambda error: errors.append(str(error)))
                # HTTP/ESM behavior is part of acceptance; do not hide failures with set_content.
                page.goto(url, wait_until="networkidle")
                assert page.locator("#total-count").inner_text() == "82", name
                assert page.locator("#rows tr").count() == 82, name
                assert page.get_by_role("heading", name="External opportunities").count() == 1
                dims = page.evaluate("({viewport: document.documentElement.clientWidth, width: document.documentElement.scrollWidth})")
                assert dims["width"] <= dims["viewport"] + 1, f"{name} document overflow: {dims}"
                assert not errors, f"{name}: {errors}"
                if name == "desktop":
                    page.get_by_role("combobox", name="Priority").select_option("HIGH")
                    assert page.locator("#rows tr").count() == 10
                    page.get_by_role("combobox", name="Priority").select_option("all")
                    search = page.get_by_role("searchbox", name="Search source or idea")
                    search.fill("archlang")
                    assert page.locator("#rows tr").count() >= 1
                    search.fill("unlikely-match-001xyz")
                    assert "No matching research leads" in page.locator("#rows").inner_text()
                    page.get_by_role("button", name="Clear filters").click()
                    assert page.locator("#rows tr").count() == 82
                    page.get_by_role("combobox", name="Source type").select_option("archived")
                    assert page.locator("#rows tr").count() == 14
                    page.get_by_role("combobox", name="Source type").select_option("all")
                    page.get_by_role("combobox", name="Target capability").select_option("civil-geometry")
                    assert page.locator("#rows tr").count() >= 1
                    page.get_by_role("combobox", name="Target capability").select_option("all")
                    assert page.locator("#rows tr").count() == 82
                    search.focus()
                    page.keyboard.press("Tab")
                    assert page.evaluate("document.activeElement?.id") == "priority", "Keyboard Tab should move from search to priority"
                page.screenshot(path=str(OUT / f"{name}.png"), full_page=True)
                print(f"OK: {name}; 82 sources, no page errors/overflow")
                context.close()
        finally:
            browser.close()
    print("Browser checks finished. Screenshots require independent visual/manual review:", OUT)


if __name__ == "__main__":
    main()
