import { jsxs as c, jsx as o } from "react/jsx-runtime";
import { c as l } from "../../index-DyIdU--j.js";
import f from "react";
import { cssProps as n } from "../../utils/helpers.js";
import { I as u, s } from "../../Input-C3ux06Wy.js";
const v = f.forwardRef(
  ({ size: r, error: t, label: a, className: i, style: d, required: e, ...m }, p) => /* @__PURE__ */ c(
    "label",
    {
      "data-input": "radio",
      "data-required": e || void 0,
      className: l(s.radio, i),
      style: { ...d, ...n({ size: r }) },
      children: [
        /* @__PURE__ */ o(u, { ...m, ref: p, type: "radio", size: r, error: t }),
        a && /* @__PURE__ */ o("div", { className: s.label, children: a })
      ]
    }
  )
);
export {
  v as Radio
};
