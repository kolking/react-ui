import { jsxs as d, Fragment as E, jsx as r } from "react/jsx-runtime";
import M, { useRef as m, useState as g, useEffect as P } from "react";
import { c as S } from "../../index-DyIdU--j.js";
import { a as b, c as j, d as C, e as U, k as W, l as q, g as A, m as B, F as D, n as H, o as I, f as V, p as $, q as z, b as G } from "../../floating-ui.react-KLg1MUz0.js";
const J = "Tooltip_tooltip_u1Uix", K = "Tooltip_arrow_NBFiV", L = "Tooltip_content_lfpfM", i = {
  tooltip: J,
  arrow: K,
  content: L
}, ee = ({
  trigger: a = "hover focus",
  placement: c = "top",
  content: h,
  disabled: l,
  minWidth: w,
  maxWidth: R,
  className: F,
  children: t,
  ..._
}) => {
  const f = m(null), u = m(null), [p, v] = g(!1), [x, O] = g(!1), { refs: n, context: e, floatingStyles: N } = b({
    open: p,
    placement: c,
    onOpenChange: v,
    whileElementsMounted: G,
    middleware: [
      I(8),
      V(),
      $(),
      z(({ placement: o, rects: s }) => (O(
        s.floating.width < s.reference.width && (o.endsWith("-start") || o.endsWith("-end"))
      ), { element: f, padding: 8 }))
    ]
  }), { getReferenceProps: T, getFloatingProps: k } = j([
    C(e),
    U(e, { role: "tooltip" }),
    W(e, { move: !1, enabled: a.includes("hover") }),
    q(e, { enabled: a.includes("focus") }),
    A(e, { enabled: a.includes("click") })
  ]), y = B([
    n.setReference,
    "ref" in t ? t.ref : null
  ]);
  return P(() => {
    var s;
    const o = (s = n.domReference.current) == null ? void 0 : s.closest("[data-floating-root]");
    !l && o && (u.current = o);
  }, [n, l]), l ? t : /* @__PURE__ */ d(E, { children: [
    M.cloneElement(t, T({ ref: y, ...t.props })),
    p && /* @__PURE__ */ r(D, { root: u, children: /* @__PURE__ */ d(
      "div",
      {
        ..._,
        ref: n.setFloating,
        "data-tooltip": c,
        className: S(i.tooltip, F),
        style: { ...N, minWidth: w, maxWidth: R },
        ...k(),
        children: [
          /* @__PURE__ */ r(
            H,
            {
              width: 12,
              height: 6,
              ref: f,
              context: e,
              className: i.arrow,
              staticOffset: x ? 8 : null
            }
          ),
          /* @__PURE__ */ r("div", { className: i.content, children: h })
        ]
      }
    ) })
  ] });
};
export {
  ee as Tooltip
};
