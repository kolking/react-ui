import { jsxs as i, jsx as e } from "react/jsx-runtime";
import { c as v } from "../../index-DyIdU--j.js";
import { cssProps as p, getErrorMessage as y } from "../../utils/helpers.js";
import { Icon as w } from "../Icon/Icon.js";
const h = "Notice_info_tgW7c", z = "Notice_error_ClIfR", j = "Notice_success_-vXfu", x = "Notice_warning_zFUFN", C = "Notice_neutral_Vryzr", F = "Notice_container_d9QoU", I = "Notice_content_cvC5c", k = "Notice_message_hI1yz", M = "Notice_accessory_AjvqC", Q = "Notice_vertical_DsMZQ", U = "Notice_plain_l9FV5", c = {
  info: h,
  error: z,
  success: j,
  warning: x,
  neutral: C,
  container: F,
  content: I,
  message: k,
  accessory: M,
  vertical: Q,
  plain: U
}, a = {
  info: "info-circle",
  warning: "warning",
  error: "error-circle",
  success: "checkmark-circle",
  neutral: "info-outline"
}, E = ({
  error: n,
  scheme: o = n ? "error" : "neutral",
  layout: t = "horizontal",
  variant: l = "default",
  size: _,
  icon: s,
  accessory: r,
  margin: N,
  padding: m,
  className: d,
  style: f,
  children: g,
  ...u
}) => /* @__PURE__ */ i(
  "div",
  {
    ...u,
    "data-notice": o,
    "data-layout": t,
    className: v(c.container, c[o], c[t], c[l], d),
    style: { ...f, ...p({ size: _, margin: N, padding: m }) },
    children: [
      /* @__PURE__ */ i("div", { className: c.content, children: [
        s !== void 0 ? s : a[o] && /* @__PURE__ */ e(w, { name: a[o] }),
        /* @__PURE__ */ e("div", { className: c.message, children: n ? y(n) : g })
      ] }),
      r && /* @__PURE__ */ e("div", { className: c.accessory, children: r })
    ]
  }
);
export {
  E as Notice
};
