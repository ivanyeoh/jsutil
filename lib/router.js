"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const routes = [];
const PAGE_CHANGE = 'router:page:change';

const isModifierKeyPressed = e => e.shiftKey || e.ctrlKey || e.altKey || e.metaKey;

const shouldSkipLink = link => {
  if (!link) return true;
  if (link.target && link.target.toLowerCase() !== '_self') return true;
  if (link.origin !== location.origin) return true;
  if (link.pathname === location.pathname && link.hash !== '') return true;
  if (link.hasAttribute('download')) return true;
  return false;
};

const findHandler = pathname => {
  const route = routes.find(({
    regex
  }) => pathname.match(regex));
  if (route) return route.handler;
};

const updateHistory = pathname => history.pushState(null, null, pathname);

const renderRoute = pathname => {
  const handle = findHandler(pathname);
  if (!handle) return false;
  handle();
  return true;
};

const handleUrlChange = () => {
  renderRoute(location.pathname);
};

const handleLinkClick = e => {
  if (isModifierKeyPressed(e)) return;
  const link = e.target.closest('a');
  if (shouldSkipLink(link)) return;
  if (!renderRoute(link.pathname)) return;
  e.preventDefault();
  updateHistory(link.pathname);
};

const parseHandler = fnOrString => {
  if (typeof fnOrString === 'function') return fnOrString;
  let page;

  if (customElements.get(fnOrString)) {
    page = document.createElement(fnOrString);
  } else {
    page = document.createElement('div');
    page.innerHTML = fnOrString;
  }

  return () => dispatchEvent(new CustomEvent(PAGE_CHANGE, {
    detail: {
      page
    }
  }));
};

const definePage = () => {
  customElements.define('routed-page', class extends HTMLElement {
    constructor() {
      super();
      addEventListener(PAGE_CHANGE, e => {
        this.innerHTML = '';
        this.appendChild(e.detail.page);
      });
    }

  });
};

var _default = {
  add(regex, handler) {
    routes.push({
      regex,
      handler: parseHandler(handler)
    });
    return this;
  },

  navigate(pathname) {
    renderRoute(pathname);
    updateHistory(pathname);
    return this;
  },

  init() {
    definePage();
    addEventListener('click', handleLinkClick);
    addEventListener('popstate', handleUrlChange);
    handleUrlChange();
    return this;
  },

  destroy() {
    routes.length = 0;
    removeEventListener('click', handleLinkClick);
    removeEventListener('popstate', handleUrlChange);
    removeEventListener(PAGE_CHANGE, updatePageComponent);
    return this;
  }

};
exports.default = _default;