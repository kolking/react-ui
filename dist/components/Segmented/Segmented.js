import { jsx as s } from "react/jsx-runtime";
import { c as p } from "../../index-DyIdU--j.js";
import { cssProps as i } from "../../utils/helpers.js";
const h = "Segmented_segmented_UOs8Z", S = {
  segmented: h
}, u = ({
  size: o,
  items: n,
  selected: t,
  disabled: m,
  margin: r,
  className: g,
  style: c,
  onSelect: a,
  ...d
}) => /* @__PURE__ */ s(
  "div",
  {
    ...d,
    "data-segmented": t,
    className: p(S.segmented, g),
    style: {
      ...c,
      ...i({
        size: o,
        margin: r,
        length: n.length.toString(),
        selected: t.toString()
      })
    },
    children: n.map((l, e) => /* @__PURE__ */ s(
      "button",
      {
        type: "button",
        disabled: m,
        "data-selected": e === t,
        onClick: () => e !== t && a(e),
        children: l
      },
      e
    ))
  }
);
export {
  u as Segmented
};
