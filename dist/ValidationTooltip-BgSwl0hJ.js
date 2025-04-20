import { jsx as e } from "react/jsx-runtime";
import { Tooltip as s } from "./components/Tooltip/Tooltip.js";
const r = "styles_input_a-JHN", a = "styles_wrapper_b3-VW", o = "styles_date_S0YpO", p = "styles_time_3ywit", c = "styles_search_y6sAm", l = "styles_number_auDA-", _ = "styles_textarea_KRYGO", n = "styles_select_qhElj", i = "styles_tooltip_tBrt4", y = "styles_range_tSqtV", m = "styles_wrapper_prefix_KI25W", w = "styles_wrapper_accessory_yZjv0", u = {
  input: r,
  wrapper: a,
  date: o,
  time: p,
  search: c,
  number: l,
  textarea: _,
  select: n,
  tooltip: i,
  range: y,
  wrapper_prefix: m,
  wrapper_accessory: w
}, f = (t) => /* @__PURE__ */ e(
  s,
  {
    ...t,
    "data-tooltip-validation": !0,
    disabled: !t.content,
    placement: "top-start",
    trigger: "hover focus click",
    className: u.tooltip
  }
);
export {
  f as V,
  u as s
};
