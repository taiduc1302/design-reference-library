/** Minimal DOM fake for deterministic Node tests; NOT a browser/a11y substitute. */
class FakeNode {
  constructor() { this.childNodes = []; this.parentNode = null; }
  append(...children) {
    for (const child of children) {
      const node = typeof child === 'string' ? new FakeText(child) : child;
      node.parentNode = this;
      this.childNodes.push(node);
    }
  }
  replaceChildren(...children) { this.childNodes = []; this.append(...children); }
  get lastChild() { return this.childNodes.at(-1); }
  get textContent() { return this.childNodes.map(child => child.textContent).join(''); }
  set textContent(text) { this.replaceChildren(new FakeText(String(text))); }
}
class FakeText extends FakeNode {
  constructor(text) { super(); this.value = text; }
  get textContent() { return this.value; }
  set textContent(text) { this.value = String(text); }
}
class FakeElement extends FakeNode {
  constructor(tag) {
    super();
    this.tagName = tag.toUpperCase();
    this.className = '';
    this.attrs = new Map();
    this.handlers = new Map();
    this.value = '';
    this.classList = {add: value => {this.className = [this.className,value].filter(Boolean).join(' ');}};
  }
  setAttribute(name, value) { this.attrs.set(name, String(value)); }
  getAttribute(name) { return this.attrs.get(name) ?? null; }
  addEventListener(name, fn) { (this.handlers.get(name) ?? this.handlers.set(name,[]).get(name)).push(fn); }
  fire(name) { for (const fn of this.handlers.get(name) ?? []) fn({target:this}); }
  click() { this.fire('click'); }
  querySelectorAll(selector) {
    const output = [];
    const matches = node => {
      if (!(node instanceof FakeElement)) return false;
      if (selector.startsWith('.')) return node.className.split(' ').includes(selector.slice(1));
      return node.tagName.toLowerCase() === selector.toLowerCase();
    };
    function visit(node) { for (const child of node.childNodes) { if(matches(child)) output.push(child); visit(child); } }
    visit(this);
    return output;
  }
  querySelector(selector) { return this.querySelectorAll(selector)[0] ?? null; }
}

export function installFakeDom() {
  globalThis.document = {
    createElement: tag => new FakeElement(tag),
    createElementNS: (ns,tag) => new FakeElement(tag),
    createTextNode: text => new FakeText(String(text))
  };
  return globalThis.document;
}
