import { jsx as r, jsxs as p } from "react/jsx-runtime";
import m from "react";
import { c as d } from "../../index-DyIdU--j.js";
import { cssProps as _ } from "../../utils/helpers.js";
const f = "Spinner_container_CGGmW", g = "Spinner_spinner_vU3LR", S = "Spinner_track_y1d33", k = "Spinner_range_BVoTJ", n = {
  container: f,
  spinner: g,
  track: S,
  range: k
}, N = m.forwardRef(
  ({ size: e, color: a, overlay: s, overlayColor: i, className: t, style: c, ...o }, l) => /* @__PURE__ */ r(
    "span",
    {
      ...o,
      ref: l,
      role: "status",
      "aria-label": "loading",
      "data-spinner": !0,
      "data-overlay": s,
      className: d(n.container, t),
      style: { ...c, ..._({ size: e, color: a, overlayColor: i }) },
      children: /* @__PURE__ */ p("svg", { "aria-hidden": !0, viewBox: "0 0 100 100", className: n.spinner, children: [
        /* @__PURE__ */ r("circle", { fill: "none", className: n.track }),
        /* @__PURE__ */ r("circle", { fill: "none", className: n.range })
      ] })
    }
  )
);
export {
  N as Spinner
};
