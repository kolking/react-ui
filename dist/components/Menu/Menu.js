import { jsxs as j, Fragment as z, jsx as t } from "react/jsx-runtime";
import I, { useState as i, useRef as d, useMemo as N, useEffect as b } from "react";
import { a as B, o as D, f as L, s as O, b as W, r as _, c as k, d as A, e as H, g as U, h as q, F as G, i as J, j as K } from "../../floating-ui.react-KLg1MUz0.js";
import { c as Q } from "../../index-DyIdU--j.js";
import { MenuContext as T } from "./MenuContext.js";
import { s as V } from "../../styles.module-CUhWny5T.js";
const se = ({
  placement: p = "bottom-start",
  trigger: r,
  minWidth: g,
  maxWidth: h,
  className: x,
  children: F,
  ...R
}) => {
  const [l, c] = i(!1), [a, v] = i(null), [y, M] = i({}), m = d([]), u = d(null), { refs: s, context: e, floatingStyles: P } = B({
    open: l,
    placement: p,
    onOpenChange: c,
    whileElementsMounted: W,
    middleware: [
      D(5),
      L({ padding: 10 }),
      O({
        padding: 10,
        apply({ rects: o, availableWidth: n, availableHeight: S }) {
          _.flushSync(() => {
            M({
              minWidth: o.reference.width,
              maxWidth: n,
              maxHeight: S
            });
          });
        }
      })
    ]
  }), { getReferenceProps: w, getFloatingProps: C, getItemProps: f } = k([
    A(e),
    H(e, { role: "menu" }),
    U(e, { event: "mousedown" }),
    q(e, {
      listRef: m,
      loop: !0,
      activeIndex: a,
      onNavigate: v
    })
  ]), E = N(
    () => ({ active: a, setOpen: c, getItemProps: f }),
    [a, f]
  );
  return b(() => {
    var n;
    const o = (n = s.domReference.current) == null ? void 0 : n.closest("[data-floating-root]");
    o && (u.current = o);
  }, [s]), /* @__PURE__ */ j(z, { children: [
    I.cloneElement(r, {
      ref: s.setReference,
      "data-menu": "trigger",
      ...w(r.props)
    }),
    /* @__PURE__ */ t(T.Provider, { value: E, children: l && /* @__PURE__ */ t(G, { root: u, children: /* @__PURE__ */ t(J, { context: e, modal: !1, initialFocus: -1, children: /* @__PURE__ */ t(
      "div",
      {
        ...R,
        ref: s.setFloating,
        "data-menu": "content",
        className: Q(V.menu, x),
        style: { ...P, ...y, minWidth: g, maxWidth: h },
        ...C(),
        children: /* @__PURE__ */ t(K, { elementsRef: m, children: F })
      }
    ) }) }) })
  ] });
};
export {
  se as Menu
};
