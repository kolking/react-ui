import { jsxs as d, jsx as e } from "react/jsx-runtime";
import { c as p } from "../../index-DyIdU--j.js";
import { cssProps as f } from "../../utils/helpers.js";
import { Icon as _ } from "../Icon/Icon.js";
import { Tooltip as y } from "../Tooltip/Tooltip.js";
const b = "styles_field_hqzKT", x = "styles_header_Iwsz6", N = "styles_label_zRVTS", v = "styles_help_pL5KF", l = {
  field: b,
  header: x,
  label: N,
  help: v
}, q = ({
  id: s,
  label: t,
  help: a,
  tooltip: r,
  required: o,
  minWidth: i,
  maxWidth: n,
  className: m,
  children: h,
  ...c
}) => /* @__PURE__ */ d(
  "div",
  {
    ...c,
    "data-field": s || !0,
    className: p(l.field, m),
    style: { ...c.style, ...f({ minWidth: i, maxWidth: n }) },
    children: [
      t && /* @__PURE__ */ d("div", { className: l.header, children: [
        /* @__PURE__ */ e("label", { htmlFor: s, "data-required": o || void 0, className: l.label, children: t }),
        r && /* @__PURE__ */ e(y, { content: r, placement: "top-end", children: /* @__PURE__ */ e(_, { name: "help-circle", tabIndex: 0 }) })
      ] }),
      h,
      a && /* @__PURE__ */ e("small", { className: l.help, children: a })
    ]
  }
);
export {
  q as Field
};
