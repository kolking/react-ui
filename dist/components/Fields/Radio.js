import { jsxs as c, jsx as o } from "react/jsx-runtime";
import { c as l } from "../../index-DyIdU--j.js";
import f from "react";
import { cssProps as n } from "../../utils/helpers.js";
import { I as u, s } from "../../Input-Lz3ft8Tp.js";
const I = f.forwardRef(
  ({ size: r, error: t, label: a, className: e, style: i, required: d, ...m }, p) => /* @__PURE__ */ c(
    "label",
    {
      "data-input": "radio",
      "data-required": d,
      className: l(s.radio, e),
      style: { ...i, ...n({ size: r }) },
      children: [
        /* @__PURE__ */ o(u, { ...m, ref: p, type: "radio", size: r, error: t }),
        a && /* @__PURE__ */ o("div", { className: s.label, children: a })
      ]
    }
  )
);
export {
  I as Radio
};
