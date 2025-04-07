import { jsx as s } from "react/jsx-runtime";
import { Tooltip as e } from "./components/Tooltip/Tooltip.js";
const o = "styles_input_a-JHN", a = "styles_date_S0YpO", l = "styles_time_3ywit", n = "styles_search_y6sAm", c = "styles_number_auDA-", r = "styles_textarea_KRYGO", i = "styles_select_qhElj", _ = "styles_tooltip_tBrt4", m = "styles_range_tSqtV", p = {
  input: o,
  date: a,
  time: l,
  search: n,
  number: c,
  textarea: r,
  select: i,
  tooltip: _,
  range: m
}, d = (t) => /* @__PURE__ */ s(
  e,
  {
    ...t,
    disabled: !t.content,
    placement: "top-start",
    trigger: "hover focus click",
    className: p.tooltip
  }
);
export {
  d as V,
  p as s
};
