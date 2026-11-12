#!/usr/bin/env python3
"""Offline structural checks for original reusable components and source pins."""
import json
import re
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent
components = json.loads((ROOT / 'catalog/components.json').read_text(encoding='utf-8'))
upstreams = json.loads((ROOT / 'catalog/upstreams.json').read_text(encoding='utf-8'))
assert components['schema_version'] == 1
assert upstreams['schema_version'] == 1
assert len(components['components']) >= 5
assert len(upstreams['forks']) == 4
ids = set()
source = (ROOT / 'components/src/components.mjs').read_text(encoding='utf-8')
for component in components['components']:
    name = component['id']
    assert name and name not in ids, f'duplicate component ID: {name}'
    ids.add(name)
    for key in ('entrypoint', 'style'):
        assert (ROOT / component[key]).is_file(), f'missing {key} for {name}'
    assert f'export function {component["export"]}' in source, f'export not found: {name}'
    assert component['status'] in {'PROTOTYPED', 'CODE_TESTED', 'VISUALLY_CHECKED', 'ADOPTED'}
    assert component['source_category'] == 'ORIGINAL_CODE_INFORMED_BY_REFERENCES'
for upstream in upstreams['forks']:
    assert upstream['upstream'].startswith('gusbavia/')
    assert upstream['desired_fork'].startswith('taiduc1302/')
    assert upstream['license'] == 'MIT'
    assert re.fullmatch(r'[0-9a-f]{40}', upstream['upstream_sha'])
    assert upstream['fork_status'] in {'NOT_PRESENT_AT_LAST_CHECK', 'VERIFIED_PARENT', 'UNVERIFIED'}
for path in ('components/demo/index.html', 'components/demo/main.mjs', 'components/components.css',
             'components/src/data.mjs', 'components/tests/data.test.mjs', 'docs/COMPONENT_PROVENANCE.md'):
    assert (ROOT / path).is_file(), f'missing component support file: {path}'
assert 'https://' not in source, 'reusable components must not fetch external resources'
assert '.innerHTML' not in source, 'untrusted data must be text, not parsed markup'
print(f'OK: {len(ids)} component records and {len(upstreams["forks"])} pinned upstreams validated.')
