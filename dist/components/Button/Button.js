import { jsxs as u, jsx as v, Fragment as B } from "react/jsx-runtime";
import { c as b } from "../../index-DyIdU--j.js";
import { fixedForwardRef as w, wrapNode as d, cssProps as x } from "../../utils/helpers.js";
import { Spinner as N } from "../Spinner/Spinner.js";
const h = "Button_button_WuG2z", y = {
  button: h,
  "primary-default": "Button_primary-default_lVt-V",
  "secondary-default": "Button_secondary-default_yggNH",
  "tertiary-default": "Button_tertiary-default_qSFa6",
  "primary-negative": "Button_primary-negative_AupXJ",
  "secondary-negative": "Button_secondary-negative_bZbAE",
  "tertiary-negative": "Button_tertiary-negative_7Dh-3",
  "primary-positive": "Button_primary-positive_4Mnfc",
  "secondary-positive": "Button_secondary-positive_h1UJg",
  "tertiary-positive": "Button_tertiary-positive_oTrM5",
  "primary-warning": "Button_primary-warning_9A3NY",
  "secondary-warning": "Button_secondary-warning_mbIUl",
  "tertiary-warning": "Button_tertiary-warning_gM2um"
};
function A({
  as: _,
  variant: r = "primary",
  scheme: a = "default",
  size: p,
  minWidth: m,
  maxWidth: l,
  busy: t,
  title: e,
  icon: n,
  iconPosition: i = "start",
  children: o,
  className: c,
  style: g,
  ...s
}, f) {
  return /* @__PURE__ */ u(
    _ ?? "button",
    {
      ...s,
      ref: f,
      "data-busy": t,
      "data-button": r,
      "data-scheme": a,
      "aria-disabled": s.disabled,
      "aria-live": t ? "polite" : void 0,
      className: b(y.button, y[`${r}-${a}`], c),
      style: { ...g, ...x({ size: p, minWidth: m, maxWidth: l }) },
      children: [
        o ? d(o, "span") : /* @__PURE__ */ u(B, { children: [
          i === "start" && n,
          e && d(e, "span"),
          i === "end" && n
        ] }),
        t && /* @__PURE__ */ v(N, { overlay: !0 })
      ]
    }
  );
}
const S = w(A);
export {
  S as Button
};
