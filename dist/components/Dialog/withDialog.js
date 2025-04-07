import { jsxs as s, Fragment as c, jsx as o } from "react/jsx-runtime";
import { Dialog as d } from "./Dialog.js";
import { useDialog as f } from "./useDialog.js";
function x(t) {
  function i({
    children: a,
    defaultOpen: n,
    onShow: e,
    onConfirm: p,
    onCancel: m,
    ...l
  }) {
    const r = f({ defaultOpen: n, onShow: e, onConfirm: p, onCancel: m });
    return /* @__PURE__ */ s(c, { children: [
      a(r),
      /* @__PURE__ */ o(d, { ...l, ...r.props, children: r.data && /* @__PURE__ */ o(t, { ...r.data, dialog: r }) })
    ] });
  }
  return i;
}
export {
  x as withDialog
};
