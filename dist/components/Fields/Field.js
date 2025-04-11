import { jsxs as i, jsx as c } from "react/jsx-runtime";
import { c as d } from "../../index-DyIdU--j.js";
import y from "react";
import { cssProps as _ } from "../../utils/helpers.js";
const p = "styles_field_hqzKT", u = "styles_header_Iwsz6", b = "styles_label_zRVTS", F = "styles_accessory_S4ccn", N = "styles_help_pL5KF", t = {
  field: p,
  header: u,
  label: b,
  accessory: F,
  help: N
}, v = ({ label: e, required: l, className: s, children: a, ...r }) => /* @__PURE__ */ i("div", { "data-field-header": !0, className: t.header, children: [
  /* @__PURE__ */ c(
    "label",
    {
      ...r,
      "data-field-label": !0,
      "data-required": l,
      className: d(t.label, s),
      children: e
    }
  ),
  y.Children.toArray(a).length > 0 && /* @__PURE__ */ c("div", { "data-field-accessory": !0, className: t.accessory, children: a })
] }), x = ({ className: e, children: l, ...s }) => /* @__PURE__ */ c("small", { ...s, "data-field-help": !0, className: d(t.help, e), children: l }), L = ({
  id: e,
  label: l,
  labelAccessory: s,
  help: a,
  required: r,
  minWidth: h,
  maxWidth: n,
  className: m,
  children: f,
  ...o
}) => /* @__PURE__ */ i(
  "div",
  {
    ...o,
    "data-field": e || !0,
    className: d(t.field, m),
    style: { ...o.style, ..._({ minWidth: h, maxWidth: n }) },
    children: [
      l && /* @__PURE__ */ c(v, { htmlFor: e, label: l, required: r, children: s }),
      f,
      a && /* @__PURE__ */ c(x, { children: a })
    ]
  }
);
export {
  L as Field,
  x as FieldHelp,
  v as FieldLabel
};
