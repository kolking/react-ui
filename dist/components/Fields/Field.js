import { jsxs as h, jsx as t } from "react/jsx-runtime";
import { c as i } from "../../index-DyIdU--j.js";
import { cssProps as p } from "../../utils/helpers.js";
const _ = "styles_field_hqzKT", y = "styles_header_Iwsz6", b = "styles_label_zRVTS", u = "styles_help_pL5KF", d = {
  field: _,
  header: y,
  label: b,
  help: u
}, F = ({ label: e, required: l, className: s, children: a, ...r }) => /* @__PURE__ */ h("div", { "data-field-header": !0, className: d.header, children: [
  /* @__PURE__ */ t(
    "label",
    {
      ...r,
      "data-field-label": !0,
      "data-required": l,
      className: i(d.label, s),
      children: e
    }
  ),
  a
] }), N = ({ className: e, children: l, ...s }) => /* @__PURE__ */ t("small", { ...s, "data-field-help": !0, className: i(d.help, e), children: l }), q = ({
  id: e,
  label: l,
  labelAccessory: s,
  help: a,
  required: r,
  minWidth: o,
  maxWidth: n,
  className: m,
  children: f,
  ...c
}) => /* @__PURE__ */ h(
  "div",
  {
    ...c,
    "data-field": e || !0,
    className: i(d.field, m),
    style: { ...c.style, ...p({ minWidth: o, maxWidth: n }) },
    children: [
      l && /* @__PURE__ */ t(F, { htmlFor: e, label: l, required: r, children: s }),
      f,
      a && /* @__PURE__ */ t(N, { children: a })
    ]
  }
);
export {
  q as Field,
  N as FieldHelp,
  F as FieldLabel
};
