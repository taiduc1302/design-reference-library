#!/usr/bin/env python3
"""Optional local Chromium interaction/viewport QA. Requires Python Playwright + Chromium."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import Thread

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / '.qa-output'


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
                for width, height in [(1440, 900), (390, 844), (320, 740)]:
                    page = browser.new_page(viewport={'width': width, 'height': height}, reduced_motion='reduce')
                    errors = []
                    page.on('pageerror', lambda error: errors.append(str(error)))
                    page.goto(url, wait_until='networkidle')
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
                           const {createDataTable} = await import('/components/src/components.mjs');
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
