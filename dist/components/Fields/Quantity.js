import { jsx as a, jsxs as h } from "react/jsx-runtime";
import { c as v } from "../../index-DyIdU--j.js";
import * as i from "react";
import w, { forwardRef as d, useRef as y, useImperativeHandle as R, useCallback as o } from "react";
import { cssProps as g } from "../../utils/helpers.js";
import { V as E } from "../../ValidationTooltip-B8aEOzID.js";
const _ = (n, e) => /* @__PURE__ */ i.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 6 5", ref: e, ...n }, /* @__PURE__ */ i.createElement("path", { fill: "currentColor", fillRule: "evenodd", d: "M0 0h6L3 5z" })), x = d(_), q = (n, e) => /* @__PURE__ */ i.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 6 5", ref: e, ...n }, /* @__PURE__ */ i.createElement("path", { fill: "currentColor", fillRule: "evenodd", d: "M0 5h6L3 0z" })), C = d(q), D = "styles_quantity_JqkoZ", k = "styles_increase_MKRaz", S = "styles_decrease_oD7r3", l = {
  quantity: D,
  increase: k,
  decrease: S
}, j = w.forwardRef(
  ({ size: n, error: e, className: u, style: m, ...c }, p) => {
    const t = y(null);
    R(p, () => t.current);
    const b = o(() => {
      var r, s;
      (r = t.current) == null || r.stepUp(), (s = t.current) == null || s.dispatchEvent(new Event("change", { bubbles: !0 }));
    }, []), f = o(() => {
      var r, s;
      (r = t.current) == null || r.stepDown(), (s = t.current) == null || s.dispatchEvent(new Event("change", { bubbles: !0 }));
    }, []);
    return /* @__PURE__ */ a(E, { content: e, children: /* @__PURE__ */ h(
      "div",
      {
        "data-input": "quantity",
        "data-disabled": c.disabled,
        "data-invalid": e ? !0 : void 0,
        className: v(l.quantity, u),
        style: { ...m, ...g({ size: n }) },
        children: [
          /* @__PURE__ */ a("input", { ...c, ref: t, type: "number" }),
          /* @__PURE__ */ a(
            "button",
            {
              type: "button",
              "aria-label": "Increase",
              disabled: c.disabled,
              className: l.increase,
              onClick: b,
              children: /* @__PURE__ */ a(C, { "aria-hidden": !0 })
            }
          ),
          /* @__PURE__ */ a(
            "button",
            {
              type: "button",
              "aria-label": "Decrease",
              disabled: c.disabled,
              className: l.decrease,
              onClick: f,
              children: /* @__PURE__ */ a(x, { "aria-hidden": !0 })
            }
          )
        ]
      }
    ) });
  }
);
export {
  j as Quantity
};
