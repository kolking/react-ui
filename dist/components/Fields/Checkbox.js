import { jsxs as i, jsx as a } from "react/jsx-runtime";
import { c as p } from "../../index-DyIdU--j.js";
import h, { useRef as x, useImperativeHandle as k, useEffect as b } from "react";
import { cssProps as R } from "../../utils/helpers.js";
import { I as y, s as l } from "../../Input-Lz3ft8Tp.js";
const q = h.forwardRef(
  ({ size: c, error: n, label: t, className: f, style: u, required: m, indeterminate: r, ...s }, d) => {
    const o = s.checked, e = x(null);
    return k(d, () => e.current), b(() => {
      r != null && e.current != null && (e.current.indeterminate = !o && r);
    }, [e, r, o]), /* @__PURE__ */ i(
      "label",
      {
        "data-input": "checkbox",
        "data-required": m,
        className: p(l.checkbox, f),
        style: { ...u, ...R({ size: c }) },
        children: [
          /* @__PURE__ */ a(y, { ...s, ref: e, type: "checkbox", size: c, error: n }),
          t && /* @__PURE__ */ a("div", { className: l.label, children: t })
        ]
      }
    );
  }
);
export {
  q as Checkbox
};
