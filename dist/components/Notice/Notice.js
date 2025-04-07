import { jsxs as r, jsx as t } from "react/jsx-runtime";
import { c as v } from "../../index-DyIdU--j.js";
import { cssProps as y, getErrorMessage as p } from "../../utils/helpers.js";
import { Icon as w } from "../Icon/Icon.js";
const h = "Notice_info_tgW7c", z = "Notice_error_ClIfR", b = "Notice_success_-vXfu", j = "Notice_warning_zFUFN", x = "Notice_neutral_Vryzr", C = "Notice_container_d9QoU", I = "Notice_content_cvC5c", Q = "Notice_message_hI1yz", k = "Notice_accessory_AjvqC", F = "Notice_vertical_DsMZQ", M = "Notice_subtle_5QLvc", c = {
  info: h,
  error: z,
  success: b,
  warning: j,
  neutral: x,
  container: C,
  content: I,
  message: Q,
  accessory: k,
  vertical: F,
  subtle: M
}, i = {
  info: "info-circle",
  warning: "warning",
  error: "error-circle",
  success: "checkmark-circle",
  neutral: "info-outline"
}, E = ({
  error: o,
  scheme: e = o ? "error" : "neutral",
  layout: a = "horizontal",
  variant: l = "default",
  size: _,
  icon: s,
  accessory: n,
  margin: N,
  padding: m,
  className: u,
  style: f,
  children: d,
  ...g
}) => /* @__PURE__ */ r(
  "div",
  {
    ...g,
    "data-notice": e,
    className: v(c.container, c[e], c[a], c[l], u),
    style: { ...f, ...y({ size: _, margin: N, padding: m }) },
    children: [
      /* @__PURE__ */ r("div", { className: c.content, children: [
        s !== void 0 ? s : i[e] && /* @__PURE__ */ t(w, { name: i[e] }),
        /* @__PURE__ */ t("div", { className: c.message, children: o ? p(o) : d })
      ] }),
      n && /* @__PURE__ */ t("div", { className: c.accessory, children: n })
    ]
  }
);
export {
  E as Notice
};
