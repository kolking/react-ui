import { jsx as a, jsxs as f } from "react/jsx-runtime";
import { c as g } from "../../index-DyIdU--j.js";
import { cssProps as H } from "../../utils/helpers.js";
const j = "Heading_h1_jZARG", u = "Heading_heading_OG4PS", p = "Heading_h2_juB1Q", x = "Heading_h3_tZEj0", v = "Heading_h4_X927D", z = "Heading_h5_047wq", B = "Heading_h6_52sKy", G = "Heading_accessory_VOBHY", h = {
  h1: j,
  heading: u,
  h2: p,
  h3: x,
  h4: v,
  h5: z,
  h6: B,
  accessory: G
}, Z = ({
  as: s = "h2",
  size: y = s,
  title: c,
  margin: n,
  marginStart: o,
  marginEnd: e,
  className: d,
  children: i,
  style: r,
  ...t
}) => {
  const _ = `var(--font-size-${y})`;
  return i ? /* @__PURE__ */ f(
    "header",
    {
      ...t,
      "data-heading": s,
      className: g(h.heading, d),
      style: {
        ...r,
        ...H({ fontSize: _, margin: n, marginStart: o, marginEnd: e })
      },
      children: [
        /* @__PURE__ */ a(s, { children: c }),
        /* @__PURE__ */ a("div", { "data-heading-accessory": !0, className: h.accessory, children: i })
      ]
    }
  ) : /* @__PURE__ */ a(
    s,
    {
      ...t,
      "data-heading": s,
      className: g(h[s], d),
      style: {
        ...r,
        ...H({ fontSize: _, margin: n, marginStart: o, marginEnd: e })
      },
      children: c
    }
  );
};
export {
  Z as Heading
};
