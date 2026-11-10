#!/usr/bin/env python3
"""Small, dependency-free catalog validation. No external network calls."""
from pathlib import Path
import json
from urllib.parse import urlsplit

ROOT=Path(__file__).resolve().parent.parent
catalog=json.loads((ROOT/'catalog/references.json').read_text(encoding='utf-8'))
refs=catalog['references']
assert catalog['schema_version']==1
assert len(refs)>=4
ids=set()
valid_states={'CANDIDATE','SOURCE_REVIEWED','PROTOTYPED','VISUALLY_CHECKED','ADOPTED'}
for ref in refs:
    assert ref['id'] and ref['id'] not in ids, 'Duplicate or missing ID'
    ids.add(ref['id'])
    assert ref['name'] and ref['author'] and ref['license'] and ref['status'] in valid_states
    assert ref['categories'] and ref['patterns'] and ref['source_paths']
    source=ref['source_url']
    if ref['source_type']=='local-html':
        assert (ROOT/source).is_file(), f'Missing local source {source}'
        for p in ref['source_paths']: assert (ROOT/p).exists(), f'Missing local path {p}'
    else:
        parsed=urlsplit(source)
        assert parsed.scheme=='https' and parsed.netloc=='github.com', f'Unexpected source {source}'
print(f'OK: {len(refs)} catalog records validated, with {len(ids)} unique IDs.')
