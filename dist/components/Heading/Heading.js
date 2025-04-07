import { jsx as h, jsxs as j } from "react/jsx-runtime";
import { c as r } from "../../index-DyIdU--j.js";
import { cssProps as H } from "../../utils/helpers.js";
const p = "Heading_h1_jZARG", u = "Heading_heading_OG4PS", x = "Heading_h2_juB1Q", y = "Heading_h3_tZEj0", G = "Heading_h4_X927D", v = "Heading_h5_047wq", z = "Heading_h6_52sKy", N = "Heading_aside_GCjl7", a = {
  h1: p,
  heading: u,
  h2: x,
  h3: y,
  h4: G,
  h5: v,
  h6: z,
  aside: N
}, q = ({
  as: s = "h2",
  size: f = s,
  title: d,
  margin: i,
  marginStart: n,
  marginEnd: e,
  className: o,
  children: c,
  style: _,
  ...t
}) => {
  const g = `var(--font-size-${f})`;
  return c ? /* @__PURE__ */ j(
    "header",
    {
      ...t,
      "data-heading": s,
      className: r(a.heading, o),
      style: {
        ..._,
        ...H({ fontSize: g, margin: i, marginStart: n, marginEnd: e })
      },
      children: [
        /* @__PURE__ */ h(s, { children: d }),
        /* @__PURE__ */ h("div", { className: a.aside, children: c })
      ]
    }
  ) : /* @__PURE__ */ h(
    s,
    {
      ...t,
      "data-heading": s,
      className: r(a[s], o),
      style: {
        ..._,
        ...H({ fontSize: g, margin: i, marginStart: n, marginEnd: e })
      },
      children: d
    }
  );
};
export {
  q as Heading
};
