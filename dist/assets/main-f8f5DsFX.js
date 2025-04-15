(function () {
  const t = document.createElement('link').relList;
  if (t && t.supports && t.supports('modulepreload')) return;
  for (const o of document.querySelectorAll('link[rel="modulepreload"]')) i(o);
  new MutationObserver((o) => {
    for (const n of o)
      if (n.type === 'childList')
        for (const a of n.addedNodes)
          a.tagName === 'LINK' && a.rel === 'modulepreload' && i(a);
  }).observe(document, { childList: !0, subtree: !0 });
  function r(o) {
    const n = {};
    return (
      o.integrity && (n.integrity = o.integrity),
      o.referrerPolicy && (n.referrerPolicy = o.referrerPolicy),
      o.crossOrigin === 'use-credentials'
        ? (n.credentials = 'include')
        : o.crossOrigin === 'anonymous'
          ? (n.credentials = 'omit')
          : (n.credentials = 'same-origin'),
      n
    );
  }
  function i(o) {
    if (o.ep) return;
    o.ep = !0;
    const n = r(o);
    fetch(o.href, n);
  }
})();
const c = [
  { key: 'home', url: 'index.html', description: 'Home' },
  { key: 'goals', url: 'goals.html', description: 'How to Set Goals' },
  { key: 'setup-goals', url: 'setup-goals.html', description: 'Setup Goals' },
  { key: 'challenge', url: 'challenge.html', description: 'Challenge' },
  { key: 'group', url: 'group.html', description: 'Group' },
];
function u(e) {
  let t = '<ul>';
  const r = c.map((i) => d(i, e));
  return (t += r.join('')), (t += '</ul>'), t;
}
function d(e, t) {
  const r = e.key == t ? ' class="active"' : '';
  return `<li><a href="${e.url}"${r}>${e.description}</a></li>`;
}
function m() {
  const e = document.querySelector('#menu'),
    t = document.querySelector('#navigation');
  e.addEventListener('click', () => {
    e.classList.toggle('open'), t.classList.toggle('open');
  });
}
function f() {
  const e = document.querySelector('.year'),
    r = new Date().getFullYear();
  e.textContent = r;
  const i = document.getElementById('lastModified');
  i.innerHTML = `Last Modified: ${document.lastModified}`;
}
async function p() {
  const e = 'partials/header.html',
    t = 'partials/footer.html',
    r = await s(e),
    i = await s(t),
    o = document.querySelector('.main-header'),
    n = document.querySelector('.main-footer');
  l(r, o), l(i, n), m(), f();
  const a = document.querySelector('#navigation');
  a.innerHTML = u('home');
}
async function s(e) {
  return await (await fetch(e)).text();
}
function l(e, t, r, i) {
  t.innerHTML = e;
}
p();
