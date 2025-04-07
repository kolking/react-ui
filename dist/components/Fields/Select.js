import { jsx as e } from "react/jsx-runtime";
import { c as i } from "../../index-DyIdU--j.js";
import l from "react";
import { cssProps as m } from "../../utils/helpers.js";
import { V as d, s as f } from "../../ValidationTooltip-BW7whUiJ.js";
const y = l.forwardRef(
  ({ size: o, error: t, className: s, style: a, ...r }, c) => /* @__PURE__ */ e(d, { content: t, children: /* @__PURE__ */ e(
    "select",
    {
      ...r,
      ref: c,
      "data-select": !0,
      "data-invalid": t ? !0 : void 0,
      className: i(f.select, s),
      style: { ...a, ...m({ size: o }) }
    }
  ) })
);
export {
  y as Select
};
