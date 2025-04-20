import { jsx as e } from "react/jsx-runtime";
import { Tooltip as s } from "./components/Tooltip/Tooltip.js";
const o = "styles_input_a-JHN", a = "styles_date_S0YpO", l = "styles_time_3ywit", n = "styles_search_y6sAm", c = "styles_number_auDA-", i = "styles_textarea_KRYGO", r = "styles_select_qhElj", _ = "styles_tooltip_tBrt4", p = "styles_range_tSqtV", m = {
  input: o,
  date: a,
  time: l,
  search: n,
  number: c,
  textarea: i,
  select: r,
  tooltip: _,
  range: p
}, d = (t) => /* @__PURE__ */ e(
  s,
  {
    ...t,
    "data-tooltip-validation": !0,
    disabled: !t.content,
    placement: "top-start",
    trigger: "hover focus click",
    className: m.tooltip
  }
);
export {
  d as V,
  m as s
};
