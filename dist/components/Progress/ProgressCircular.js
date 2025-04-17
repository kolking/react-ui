import { jsxs as c, jsx as n } from "react/jsx-runtime";
import j from "react";
import { c as N } from "../../index-DyIdU--j.js";
import { cssProps as k, clamp as w } from "../../utils/helpers.js";
const b = "Progress_inner_Zoiac", h = "Progress_container_tFVew", x = "Progress_range_uqjFb", y = "Progress_progress_MHEjj", C = "Progress_track_jWvrX", a = {
  inner: b,
  container: h,
  range: x,
  progress: y,
  track: C
};
function F(r, s, e) {
  return e !== void 0 ? ((e - r) / (s - r) * 100).toString() : e;
}
const H = j.forwardRef(
  ({
    min: r = 0,
    max: s = 100,
    value: e,
    size: i,
    countdown: l,
    thickness: g,
    linecap: u,
    color: d,
    trackColor: p,
    margin: m,
    className: _,
    style: f,
    children: t,
    ...v
  }, P) => {
    const o = e !== null ? w(e, r, s) : void 0;
    return /* @__PURE__ */ c(
      "div",
      {
        ...v,
        ref: P,
        role: "progressbar",
        "aria-valuemin": r,
        "aria-valuemax": s,
        "aria-valuenow": o,
        "data-progress": "circular",
        "data-countdown": l,
        "data-progress-value": o ?? "indeterminate",
        className: N(a.container, _),
        style: {
          ...f,
          ...k({
            size: i,
            thickness: g,
            linecap: u,
            color: d,
            trackColor: p,
            margin: m,
            value: F(r, s, o)
          })
        },
        children: [
          /* @__PURE__ */ c("svg", { "aria-hidden": !0, className: a.progress, children: [
            /* @__PURE__ */ n("circle", { fill: "none", className: a.track }),
            /* @__PURE__ */ n("circle", { fill: "none", className: a.range })
          ] }),
          t && /* @__PURE__ */ n("div", { className: a.inner, children: t })
        ]
      }
    );
  }
);
export {
  H as ProgressCircular
};
