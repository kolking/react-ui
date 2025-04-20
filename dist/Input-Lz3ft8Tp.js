import { jsxs as f, jsx as s } from "react/jsx-runtime";
import { c as u } from "./index-DyIdU--j.js";
import _ from "react";
import { cssProps as m } from "./utils/helpers.js";
import { s as t, V as h } from "./ValidationTooltip-BgSwl0hJ.js";
const x = "styles_checkbox_pxrU4", w = "styles_radio_0QV8R", v = "styles_label_K65D1", k = "styles_input_j6Qji", g = {
  checkbox: x,
  radio: w,
  label: v,
  input: k
};
function N(a) {
  return ![
    "button",
    "checkbox",
    "color",
    "file",
    "hidden",
    "image",
    "radio",
    "range",
    "reset",
    "submit"
  ].includes(a);
}
function p(a) {
  switch (a) {
    case "checkbox":
    case "radio":
      return g.input;
    case "date":
    case "datetime":
    case "datetime-local":
    case "month":
    case "week":
      return t.date;
    case "time":
    case "number":
    case "search":
    case "range":
    case "hidden":
    case "button":
    case "submit":
    case "reset":
    case "image":
    case "color":
    case "file":
      return t[a];
    default:
      return t.input;
  }
}
const Q = _.forwardRef(
  ({ size: a, error: c, type: e = "text", className: o, style: d, prefix: i, children: n, ...r }, l) => {
    const b = N(e) && (i || n) ? /* @__PURE__ */ f(
      "div",
      {
        "data-input-wrapper": !0,
        "data-disabled": r.disabled,
        "data-invalid": c ? !0 : void 0,
        className: u(t.wrapper, o),
        style: { ...d, ...m({ size: a }) },
        children: [
          i && /* @__PURE__ */ s("div", { "data-input-prefix": !0, className: t.wrapper_prefix, children: i }),
          /* @__PURE__ */ s(
            "input",
            {
              ...r,
              ref: l,
              type: e,
              "data-input": e,
              className: p(e)
            }
          ),
          n && /* @__PURE__ */ s("div", { "data-input-accessory": !0, className: t.wrapper_accessory, children: n })
        ]
      }
    ) : /* @__PURE__ */ s(
      "input",
      {
        ...r,
        ref: l,
        type: e,
        "data-input": e,
        "data-invalid": c ? !0 : void 0,
        className: u(p(e), o),
        style: { ...d, ...m({ size: a }) }
      }
    );
    return /* @__PURE__ */ s(h, { content: c, children: b });
  }
);
export {
  Q as I,
  g as s
};
