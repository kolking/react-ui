import { jsx as o } from "react/jsx-runtime";
import f from "react";
function u(t, r, e) {
  return Math.max(r, Math.min(t, e));
}
const m = (t, r, e, n = !0) => n ? `${t} ${t === 1 ? r : e}` : `${t === 1 ? r : e}`;
function c(t) {
  return t.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
function i(t, r) {
  return typeof r == "number" ? `${r}px` : typeof r == "string" ? r.replace(new RegExp("(?<=^|\\s)([1-4]?xs|sm|md|lg|[1-4]?xl)", "g"), `var(--${t}-$1)`) : r;
}
function g(t) {
  const r = {};
  return Object.keys(t).map((e) => {
    const n = c(e), s = i(n, t[e]);
    s && (r[`--${n}`] = s);
  }), r;
}
function $(t, r) {
  return typeof t == "string" ? /* @__PURE__ */ o(r, { children: t }) : t;
}
const l = f.forwardRef;
function x(t) {
  return t instanceof Error && t.message ? t.message : typeof t == "string" ? t : "An error occurred";
}
export {
  u as clamp,
  g as cssProps,
  l as fixedForwardRef,
  x as getErrorMessage,
  m as pluralize,
  $ as wrapNode
};
