import { jsxs as o, jsx as c } from "react/jsx-runtime";
import { c as d } from "../../index-DyIdU--j.js";
import h from "react";
import { cssProps as _ } from "../../utils/helpers.js";
const p = "styles_field_hqzKT", u = "styles_header_Iwsz6", b = "styles_label_zRVTS", N = "styles_accessory_S4ccn", F = "styles_description_fZnNW", a = {
  field: p,
  header: u,
  label: b,
  accessory: N,
  description: F
}, v = ({ label: e, required: s, className: l, children: t, ...r }) => /* @__PURE__ */ o("div", { "data-field-header": !0, className: a.header, children: [
  /* @__PURE__ */ c(
    "label",
    {
      ...r,
      "data-field-label": !0,
      "data-required": s,
      className: d(a.label, l),
      children: e
    }
  ),
  h.Children.toArray(t).length > 0 && /* @__PURE__ */ c("div", { "data-field-accessory": !0, className: a.accessory, children: t })
] }), x = ({ className: e, children: s, ...l }) => /* @__PURE__ */ c("small", { ...l, "data-field-description": !0, className: d(a.description, e), children: s }), S = ({
  id: e,
  label: s,
  labelAccessory: l,
  help: t,
  required: r,
  minWidth: n,
  maxWidth: f,
  className: m,
  children: y,
  ...i
}) => /* @__PURE__ */ o(
  "div",
  {
    ...i,
    "data-field": e || !0,
    className: d(a.field, m),
    style: { ...i.style, ..._({ minWidth: n, maxWidth: f }) },
    children: [
      s && /* @__PURE__ */ c(v, { htmlFor: e, label: s, required: r, children: l }),
      y,
      t && /* @__PURE__ */ c(x, { children: t })
    ]
  }
);
export {
  S as Field,
  x as FieldDescription,
  v as FieldLabel
};
