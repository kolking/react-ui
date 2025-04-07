import { jsx as i } from "react/jsx-runtime";
import { c as m } from "./index-DyIdU--j.js";
import f, { useRef as p, useImperativeHandle as h, useEffect as b } from "react";
import { cssProps as _ } from "./utils/helpers.js";
import { V as x, s as a } from "./ValidationTooltip-BW7whUiJ.js";
const k = "styles_checkbox_pxrU4", R = "styles_radio_0QV8R", w = "styles_label_K65D1", I = "styles_input_j6Qji", j = {
  checkbox: k,
  radio: R,
  label: w,
  input: I
};
function v(s) {
  switch (s) {
    case "checkbox":
    case "radio":
      return j.input;
    case "date":
    case "datetime":
    case "datetime-local":
    case "month":
    case "week":
      return a.date;
    case "time":
    case "number":
    case "search":
    case "range":
    case "hidden":
      return a[s];
    default:
      return a.input;
  }
}
const $ = f.forwardRef(
  ({ size: s, error: n, type: e = "text", className: u, style: l, indeterminate: c, ...o }, d) => {
    const r = o.checked, t = p(null);
    return h(d, () => t.current), b(() => {
      c != null && t.current != null && (t.current.indeterminate = !r && c);
    }, [t, c, r]), ["button", "reset", "submit"].includes(e) && console.warn(`Input type "${e}" is not supported, use <Button>`), /* @__PURE__ */ i(x, { content: n, children: /* @__PURE__ */ i(
      "input",
      {
        ...o,
        ref: t,
        type: e,
        "data-input": e,
        "data-invalid": n ? !0 : void 0,
        className: m(v(e), u),
        style: { ...l, ..._({ size: s }) }
      }
    ) });
  }
);
export {
  $ as I,
  j as s
};
