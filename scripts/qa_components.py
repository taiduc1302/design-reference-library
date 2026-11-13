#!/usr/bin/env python3
"""Optional local Chromium interaction/viewport QA. Requires Python Playwright + Chromium."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import Thread

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / '.qa-output'



import re

def isolated_browser_html():
    """Assemble the unchanged CSS/JS modules for about:blank preview when HTTP/file navigation is blocked.

    This mode checks rendered UI interactions, not HTTP delivery or CSP enforcement.
    """
    page = (ROOT / "components/demo/index.html").read_text(encoding="utf-8")
    def stylesheet(match):
        file = (ROOT / "components/demo" / match.group(1)).resolve()
        if not file.is_relative_to(ROOT):
            raise ValueError("CSS path escapes repository")
        return "<style>\\n" + file.read_text(encoding="utf-8") + "\\n</style>"
    page = re.sub(r'<link\\s+rel="stylesheet"\\s+href="([^"]+)"\\s*>', stylesheet, page)
    pieces = []
    for name in ("components/src/data.mjs", "components/src/components.mjs", "components/demo/main.mjs"):
        code = (ROOT / name).read_text(encoding="utf-8")
        code = re.sub(r"^import\\s+[^\\n]+\\n", "", code, flags=re.MULTILINE)
        code = re.sub(r"^export\\s+", "", code, flags=re.MULTILINE)
        pieces.append(code)
    joined = "\\n".join(pieces) + "\\nwindow.__designQA={createDataTable};"
    page = page.replace('<script type="module" src="./main.mjs"></script>', "<script>\\n" + joined + "\\n</script>")
    if 'src="./main.mjs"' in page or 'rel="stylesheet"' in page:
        raise AssertionError("Failed to inline source assets for isolated QA")
    return page

def main():
    from playwright.sync_api import sync_playwright
    handler = partial(SimpleHTTPRequestHandler, directory=str(ROOT))
    server = ThreadingHTTPServer(('127.0.0.1', 0), handler)
    Thread(target=server.serve_forever, daemon=True).start()
    url = f'http://127.0.0.1:{server.server_port}/components/demo/'
    OUT.mkdir(exist_ok=True)
    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True, executable_path='/usr/bin/chromium', args=['--no-sandbox'])
            try:
                for width, height in [(1440, 900), (1024, 768), (768, 1024), (390, 844), (320, 740)]:
                    page = browser.new_page(viewport={'width': width, 'height': height}, reduced_motion='reduce')
                    errors = []
                    page.on('pageerror', lambda error: errors.append(str(error)))
                    try:
                        page.goto(url, wait_until='networkidle')
                    except Exception as nav_error:
                        if 'ERR_BLOCKED_BY_ADMINISTRATOR' not in str(nav_error):
                            raise
                        page.set_content(isolated_browser_html(), wait_until='load')
                    hint = page.locator('.dr-table__scroll-hint')
                    assert hint.is_visible() == (width <= 640)
                    assert page.get_by_role('heading', name='Clarity you can reuse.').count() == 1
                    assert page.locator('.dr-kpi').count() == 4
                    assert page.locator('.dr-status').count() >= 5
                    assert page.locator('.dr-table tbody tr').count() == 4
                    dims = page.evaluate('({view:document.documentElement.clientWidth,content:document.documentElement.scrollWidth})')
                    assert dims['content'] <= dims['view'] + 1, f'document overflow at {width}: {dims}'
                    assert not errors, f'browser exceptions: {errors}'
                    page.screenshot(path=str(OUT / f'components-{width}.png'), full_page=True)
                    if width == 1440:
                        search = page.get_by_label('Search', exact=True)
                        search.fill('utility')
                        assert page.locator('.dr-table tbody tr').count() == 1
                        assert 'Utility crossing' in page.locator('.dr-table tbody').inner_text()
                        search.fill('absent-query')
                        assert 'No records match' in page.locator('.dr-table tbody').inner_text()
                        search.fill('')
                        page.get_by_role('button', name='Sort by Readiness %').click()
                        assert '51' in page.locator('.dr-table tbody tr').first.inner_text()
                        page.get_by_role('button', name='Sort by Readiness %').click()
                        assert '96' in page.locator('.dr-table tbody tr').first.inner_text()
                        page.get_by_role('button', name='Mark for review').click()
                        assert 'Nothing was approved' in page.locator('#action-result').inner_text()
                        page.get_by_role('button', name='Loading state').click()
                        assert 'Loading records' in page.locator('.dr-table tbody').inner_text()
                        page.get_by_role('button', name='Error state').click()
                        assert 'Sample loading error' in page.locator('.dr-table tbody').inner_text()
                        page.get_by_role('button', name='Empty state').click()
                        assert 'No records match' in page.locator('.dr-table tbody').inner_text()
                        page.get_by_role('button', name='Sample rows').click()
                        assert page.locator('.dr-table tbody tr').count() == 4
                        # Verify user content cannot inject HTML or execute scripts.
                        injected = page.evaluate('''async () => {
                           const {createDataTable} = window.__designQA || await import('/components/src/components.mjs');
                           const t=createDataTable({caption:'Security demo', columns:[{key:'label',label:'Label'}],
                            rows:[{label:'<img src=x onerror=alert(1)>'}]});
                           document.body.append(t.element);
                           return {html:t.element.querySelector('td').innerHTML,
                                   images:t.element.querySelectorAll('img').length};
                        }''')
                        assert injected['images'] == 0, f'XSS risk: {injected}'
                        assert '&lt;img' in injected['html'], f'expected escaped input: {injected}'
                        # Focus must be able to reach active controls.
                        page.get_by_role('button', name='Sort by Scope').focus()
                        assert page.evaluate("document.activeElement?.getAttribute('aria-label')") == 'Sort by Scope'
                    print(f'OK Chromium {width}x{height}: layout, components, no JS errors')
                    page.close()
            finally:
                browser.close()
    finally:
        server.shutdown()
    print('OK interactive search, sort, actions, empty/loading/error and XSS checks (1440px)')
    print('Screenshots (not yet human-reviewed):', OUT)


if __name__ == '__main__':
    main()
