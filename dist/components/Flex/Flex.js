import { jsx as a } from "react/jsx-runtime";
import { c as d } from "../../index-DyIdU--j.js";
import { fixedForwardRef as i, cssProps as p } from "../../utils/helpers.js";
const y = "Flex_flex_GBHBA", F = {
  flex: y
};
function u({
  as: s,
  direction: e = "row",
  gap: l,
  align: o,
  justify: r,
  wrap: f,
  marginStart: n,
  marginEnd: x,
  className: m,
  ...t
}, c) {
  return /* @__PURE__ */ a(
    s ?? "div",
    {
      ...t,
      ref: c,
      "data-flex": e,
      className: d(F.flex, m),
      style: {
        ...t.style,
        ...p({ gap: l, align: o, justify: r, direction: e, wrap: f, marginStart: n, marginEnd: x })
      }
    }
  );
}
const j = i(u);
export {
  j as Flex
};
