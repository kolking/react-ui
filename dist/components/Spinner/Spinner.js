import { jsx as r, jsxs as p } from "react/jsx-runtime";
import m from "react";
import { c as d } from "../../index-DyIdU--j.js";
import { cssProps as _ } from "../../utils/helpers.js";
const f = "Spinner_container_CGGmW", g = "Spinner_spinner_vU3LR", v = "Spinner_track_y1d33", S = "Spinner_range_BVoTJ", n = {
  container: f,
  spinner: g,
  track: v,
  range: S
}, N = m.forwardRef(
  ({ size: e, color: a, overlay: s, overlayColor: i, className: o, style: t, ...c }, l) => /* @__PURE__ */ r(
    "span",
    {
      ...c,
      ref: l,
      role: "status",
      "aria-label": "loading",
      "data-spinner": !0,
      "data-overlay": s || void 0,
      className: d(n.container, o),
      style: { ...t, ..._({ size: e, color: a, overlayColor: i }) },
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
