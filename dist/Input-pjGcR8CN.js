import { jsx as c } from "react/jsx-runtime";
import { c as u } from "./index-DyIdU--j.js";
import l from "react";
import { cssProps as d } from "./utils/helpers.js";
import { V as m, s } from "./ValidationTooltip-B8aEOzID.js";
const p = "styles_checkbox_pxrU4", b = "styles_radio_0QV8R", f = "styles_label_K65D1", _ = "styles_input_j6Qji", h = {
  checkbox: p,
  radio: b,
  label: f,
  input: _
};
function x(t) {
  switch (t) {
    case "checkbox":
    case "radio":
      return h.input;
    case "date":
    case "datetime":
    case "datetime-local":
    case "month":
    case "week":
      return s.date;
    case "time":
    case "number":
    case "search":
    case "range":
    case "hidden":
    case "button":
    case "submit":
    case "reset":
    case "image":
    case "file":
      return s[t];
    default:
      return s.input;
  }
}
const I = l.forwardRef(
  ({ size: t, error: a, type: e = "text", className: o, style: n, ...i }, r) => (["button", "reset", "submit", "image"].includes(e) && console.warn(`Input type "${e}" is not supported, use <Button>`), /* @__PURE__ */ c(m, { content: a, children: /* @__PURE__ */ c(
    "input",
    {
      ...i,
      ref: r,
      type: e,
      "data-input": e,
      "data-invalid": a ? !0 : void 0,
      className: u(x(e), o),
      style: { ...n, ...d({ size: t }) }
    }
  ) }))
);
export {
  I,
  h as s
};
