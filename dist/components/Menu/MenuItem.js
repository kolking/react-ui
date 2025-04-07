import { jsx as i, jsxs as h, Fragment as j } from "react/jsx-runtime";
import { useContext as M, useCallback as N } from "react";
import { u as P } from "../../floating-ui.react-KLg1MUz0.js";
import { c as v } from "../../index-DyIdU--j.js";
import { MenuContext as w } from "./MenuContext.js";
import { cssProps as A } from "../../utils/helpers.js";
import { s as n } from "../../styles.module-CUhWny5T.js";
function a(t) {
  return typeof t == "string" ? /* @__PURE__ */ i("span", { children: t }) : t;
}
const D = ({
  size: t,
  scheme: p = "default",
  icon: c,
  title: s,
  children: r,
  className: u,
  style: f,
  onClick: e,
  ...d
}) => {
  const { active: x, setOpen: o, getItemProps: l } = M(w), { ref: b, index: y } = P(), m = y === x, I = N(
    (g) => {
      o(!1), e == null || e(g);
    },
    [o, e]
  );
  return /* @__PURE__ */ i(
    "button",
    {
      ...d,
      ref: b,
      type: "button",
      role: "menuitem",
      "data-menu": "item",
      "data-active": m,
      tabIndex: m ? 0 : -1,
      className: v(n.menuitem, n[p], u),
      style: { ...f, ...A({ size: t }) },
      ...l({ onClick: I }),
      children: r ? a(r) : /* @__PURE__ */ h(j, { children: [
        c,
        s && a(s)
      ] })
    }
  );
};
export {
  D as MenuItem
};
