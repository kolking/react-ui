import { jsxs as i, jsx as B, Fragment as g } from "react/jsx-runtime";
import { c as b } from "../../index-DyIdU--j.js";
import { fixedForwardRef as w, wrapNode as u, cssProps as j } from "../../utils/helpers.js";
import { Spinner as x } from "../Spinner/Spinner.js";
const h = "Button_button_WuG2z", E = "Button_primary_C3UKh", F = "Button_secondary_UFzjV", N = "Button_tertiary_qqSEt", q = "Button_negative_j0hVQ", z = "Button_positive_HcpPm", Q = "Button_warning_tNrmu", d = {
  button: h,
  primary: E,
  secondary: F,
  tertiary: N,
  default: "Button_default_Q-4IY",
  negative: q,
  positive: z,
  warning: Q
};
function S({
  as: c,
  variant: n = "primary",
  scheme: m = "default",
  size: p,
  minWidth: _,
  maxWidth: l,
  busy: t,
  title: r,
  icon: o,
  iconPosition: e = "start",
  children: a,
  className: y,
  style: f,
  ...s
}, v) {
  return /* @__PURE__ */ i(
    c ?? "button",
    {
      ...s,
      ref: v,
      "data-button": n,
      "data-busy": t || void 0,
      "aria-disabled": s.disabled,
      "aria-live": t ? "polite" : void 0,
      className: b(d[n], d[m], y),
      style: { ...f, ...j({ size: p, minWidth: _, maxWidth: l }) },
      children: [
        a ? u(a, "span") : /* @__PURE__ */ i(g, { children: [
          e === "start" && o,
          r && u(r, "span"),
          e === "end" && o
        ] }),
        t && /* @__PURE__ */ B(x, { overlay: !0 })
      ]
    }
  );
}
const I = w(S);
export {
  I as Button
};
