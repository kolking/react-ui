import { jsx as e } from "react/jsx-runtime";
import d from "react";
import { c as l } from "../../index-DyIdU--j.js";
import { Icon as g } from "../Icon/Icon.js";
import { Button as m } from "../Button/Button.js";
import { DialogFocusTrap as f } from "./DialogFocusTrap.js";
import { cssProps as p } from "../../utils/helpers.js";
const D = "Dialog_title_2pDPQ", _ = "Dialog_dialog_G3gxL", u = "Dialog_content_7168G", N = "Dialog_footer_N-aEV", v = "Dialog_close_JSEkn", i = {
  title: D,
  dialog: _,
  content: u,
  footer: N,
  close: v
}, G = d.forwardRef(
  ({ open: o = !1, width: t, style: a, className: s, children: c, ...r }, n) => /* @__PURE__ */ e(f, { active: o, children: /* @__PURE__ */ e(
    "dialog",
    {
      ...r,
      ref: n,
      "data-floating-root": !0,
      "data-dialog": o ? "open" : "closed",
      className: l(i.dialog, s),
      style: { ...a, ...p({ width: t }) },
      children: c
    }
  ) })
), P = ({
  className: o,
  children: t,
  ...a
}) => /* @__PURE__ */ e("h4", { ...a, "data-dialog-title": !0, className: l(i.title, o), children: t }), R = ({
  className: o,
  children: t,
  ...a
}) => /* @__PURE__ */ e("div", { ...a, "data-dialog-content": !0, className: l(i.content, o), children: t }), T = ({
  className: o,
  children: t,
  ...a
}) => /* @__PURE__ */ e("div", { ...a, "data-dialog-footer": !0, className: l(i.footer, o), children: t }), j = ({ className: o, ...t }) => /* @__PURE__ */ e(
  m,
  {
    ...t,
    type: "button",
    variant: "tertiary",
    "data-dialog-close": !0,
    "aria-label": "dismiss dialog",
    icon: /* @__PURE__ */ e(g, { name: "close" }),
    className: l(i.close, o)
  }
);
export {
  G as Dialog,
  j as DialogClose,
  R as DialogContent,
  T as DialogFooter,
  P as DialogTitle
};
