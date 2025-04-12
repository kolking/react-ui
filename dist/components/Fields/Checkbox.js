import { jsxs as l, jsx as e } from "react/jsx-runtime";
import { c as d } from "../../index-DyIdU--j.js";
import f from "react";
import { cssProps as x } from "../../utils/helpers.js";
import { I as h, s } from "../../Input-C3ux06Wy.js";
const j = f.forwardRef(
  ({ size: o, error: c, label: r, className: t, style: a, required: m, ...p }, i) => /* @__PURE__ */ l(
    "label",
    {
      "data-input": "checkbox",
      "data-required": m,
      className: d(s.checkbox, t),
      style: { ...a, ...x({ size: o }) },
      children: [
        /* @__PURE__ */ e(h, { ...p, ref: i, type: "checkbox", size: o, error: c }),
        r && /* @__PURE__ */ e("div", { className: s.label, children: r })
      ]
    }
  )
);
export {
  j as Checkbox
};
