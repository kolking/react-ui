import { jsxs as c, jsx as n } from "react/jsx-runtime";
import P from "react";
import { c as j } from "../../index-DyIdU--j.js";
import { cssProps as N, clamp as k } from "../../utils/helpers.js";
const w = "Progress_inner_Zoiac", b = "Progress_container_tFVew", h = "Progress_progress_MHEjj", x = "Progress_range_uqjFb", y = "Progress_track_jWvrX", a = {
  inner: w,
  container: b,
  progress: h,
  range: x,
  track: y
};
function C(r, s, e) {
  return e !== void 0 ? ((e - r) / (s - r) * 100).toString() : e;
}
const E = P.forwardRef(
  ({
    min: r = 0,
    max: s = 100,
    value: e,
    size: i,
    thickness: l,
    linecap: g,
    color: u,
    trackColor: p,
    margin: d,
    className: m,
    style: _,
    children: t,
    ...f
  }, v) => {
    const o = e !== null ? k(e, r, s) : void 0;
    return /* @__PURE__ */ c(
      "div",
      {
        ...f,
        ref: v,
        role: "progressbar",
        "aria-valuemin": r,
        "aria-valuemax": s,
        "aria-valuenow": o,
        "data-progress": "circular",
        "data-progress-value": o ?? "indeterminate",
        className: j(a.container, m),
        style: {
          ..._,
          ...N({
            size: i,
            thickness: l,
            linecap: g,
            color: u,
            trackColor: p,
            margin: d,
            value: C(r, s, o)
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
  E as ProgressCircular
};
