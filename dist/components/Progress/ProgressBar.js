import { jsx as a } from "react/jsx-runtime";
import f from "react";
import { c as _ } from "../../index-DyIdU--j.js";
import { cssProps as u, clamp as v } from "../../utils/helpers.js";
const P = "Progress_progress_LSrhF", w = "Progress_bar_ywPS-", e = {
  progress: P,
  bar: w
}, R = f.forwardRef(
  ({
    value: s,
    width: o,
    height: t,
    color: i,
    trackColor: p,
    minWidth: n,
    maxWidth: m,
    margin: c,
    style: l,
    className: g,
    ...d
  }, b) => {
    const r = s ? v(s, 0, 100) : void 0;
    return /* @__PURE__ */ a(
      "div",
      {
        ...d,
        ref: b,
        role: "progressbar",
        "aria-valuemin": 0,
        "aria-valuemax": 100,
        "aria-valuenow": r,
        "aria-label": r ? `${r} percent` : "indeterminate",
        "data-progress": "bar",
        "data-progress-value": r ?? "indeterminate",
        className: _(e.progress, g),
        style: {
          ...l,
          ...u({ width: o, height: t, color: i, trackColor: p, minWidth: n, maxWidth: m, margin: c })
        },
        children: /* @__PURE__ */ a("span", { className: e.bar, style: { width: `${r}%` } })
      }
    );
  }
);
export {
  R as ProgressBar
};
