import { jsx as H } from "react/jsx-runtime";
import { c as j } from "../../index-DyIdU--j.js";
import * as c from "react";
import x, { useLayoutEffect as I } from "react";
import { cssProps as N } from "../../utils/helpers.js";
import { V as P, s as _ } from "../../ValidationTooltip-BW7whUiJ.js";
function R() {
  return R = Object.assign ? Object.assign.bind() : function(n) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var e in r) ({}).hasOwnProperty.call(r, e) && (n[e] = r[e]);
    }
    return n;
  }, R.apply(null, arguments);
}
function B(n, t) {
  if (n == null) return {};
  var r = {};
  for (var e in n) if ({}.hasOwnProperty.call(n, e)) {
    if (t.indexOf(e) !== -1) continue;
    r[e] = n[e];
  }
  return r;
}
var M = I, $ = function(t) {
  var r = x.useRef(t);
  return M(function() {
    r.current = t;
  }), r;
}, E = function(t, r) {
  if (typeof t == "function") {
    t(r);
    return;
  }
  t.current = r;
}, G = function(t, r) {
  var e = x.useRef();
  return x.useCallback(function(i) {
    t.current = i, e.current && E(e.current, null), e.current = r, r && E(r, i);
  }, [r]);
}, T = {
  "min-height": "0",
  "max-height": "none",
  height: "0",
  visibility: "hidden",
  overflow: "hidden",
  position: "absolute",
  "z-index": "-1000",
  top: "0",
  right: "0",
  display: "block"
}, V = function(t) {
  Object.keys(T).forEach(function(r) {
    t.style.setProperty(r, T[r], "important");
  });
}, F = V, o = null, W = function(t, r) {
  var e = t.scrollHeight;
  return r.sizingStyle.boxSizing === "border-box" ? e + r.borderSize : e - r.paddingSize;
};
function Y(n, t, r, e) {
  r === void 0 && (r = 1), e === void 0 && (e = 1 / 0), o || (o = document.createElement("textarea"), o.setAttribute("tabindex", "-1"), o.setAttribute("aria-hidden", "true"), F(o)), o.parentNode === null && document.body.appendChild(o);
  var i = n.paddingSize, d = n.borderSize, a = n.sizingStyle, g = a.boxSizing;
  Object.keys(a).forEach(function(f) {
    var m = f;
    o.style[m] = a[m];
  }), F(o), o.value = t;
  var u = W(o, n);
  o.value = t, u = W(o, n), o.value = "x";
  var v = o.scrollHeight - i, l = v * r;
  g === "border-box" && (l = l + i + d), u = Math.max(l, u);
  var h = v * e;
  return g === "border-box" && (h = h + i + d), u = Math.min(h, u), [u, v];
}
var k = function() {
}, q = function(t, r) {
  return t.reduce(function(e, i) {
    return e[i] = r[i], e;
  }, {});
}, U = [
  "borderBottomWidth",
  "borderLeftWidth",
  "borderRightWidth",
  "borderTopWidth",
  "boxSizing",
  "fontFamily",
  "fontSize",
  "fontStyle",
  "fontWeight",
  "letterSpacing",
  "lineHeight",
  "paddingBottom",
  "paddingLeft",
  "paddingRight",
  "paddingTop",
  // non-standard
  "tabSize",
  "textIndent",
  // non-standard
  "textRendering",
  "textTransform",
  "width",
  "wordBreak",
  "wordSpacing",
  "scrollbarGutter"
], X = !!document.documentElement.currentStyle, Z = function(t) {
  var r = window.getComputedStyle(t);
  if (r === null)
    return null;
  var e = q(U, r), i = e.boxSizing;
  if (i === "")
    return null;
  X && i === "border-box" && (e.width = parseFloat(e.width) + parseFloat(e.borderRightWidth) + parseFloat(e.borderLeftWidth) + parseFloat(e.paddingRight) + parseFloat(e.paddingLeft) + "px");
  var d = parseFloat(e.paddingBottom) + parseFloat(e.paddingTop), a = parseFloat(e.borderBottomWidth) + parseFloat(e.borderTopWidth);
  return {
    sizingStyle: e,
    paddingSize: d,
    borderSize: a
  };
}, D = Z;
function L(n, t, r) {
  var e = $(r);
  c.useLayoutEffect(function() {
    var i = function(a) {
      return e.current(a);
    };
    if (n)
      return n.addEventListener(t, i), function() {
        return n.removeEventListener(t, i);
      };
  }, []);
}
var J = function(t, r) {
  L(document.body, "reset", function(e) {
    t.current.form === e.target && r(e);
  });
}, K = function(t) {
  L(window, "resize", t);
}, Q = function(t) {
  L(document.fonts, "loadingdone", t);
}, ee = ["cacheMeasurements", "maxRows", "minRows", "onChange", "onHeightChange"], te = function(t, r) {
  var e = t.cacheMeasurements, i = t.maxRows, d = t.minRows, a = t.onChange, g = a === void 0 ? k : a, u = t.onHeightChange, v = u === void 0 ? k : u, l = B(t, ee), h = l.value !== void 0, f = c.useRef(null), m = G(f, r), w = c.useRef(0), S = c.useRef(), p = function() {
    var s = f.current, z = e && S.current ? S.current : D(s);
    if (z) {
      S.current = z;
      var C = Y(z, s.value || s.placeholder || "x", d, i), b = C[0], O = C[1];
      w.current !== b && (w.current = b, s.style.setProperty("height", b + "px", "important"), v(b, {
        rowHeight: O
      }));
    }
  }, A = function(s) {
    h || p(), g(s);
  };
  return c.useLayoutEffect(p), J(f, function() {
    if (!h) {
      var y = f.current.value;
      requestAnimationFrame(function() {
        var s = f.current;
        s && y !== s.value && p();
      });
    }
  }), K(p), Q(p), /* @__PURE__ */ c.createElement("textarea", R({}, l, {
    onChange: A,
    ref: m
  }));
}, re = /* @__PURE__ */ c.forwardRef(te);
const ue = x.forwardRef(
  ({ autosize: n, size: t, error: r, className: e, style: i, ...d }, a) => /* @__PURE__ */ H(P, { content: r, children: /* @__PURE__ */ H(
    n ? re : "textarea",
    {
      ...d,
      ref: a,
      "data-textarea": !0,
      "data-autosize": n || void 0,
      "data-invalid": r ? !0 : void 0,
      className: j(_.textarea, e),
      style: { ...i, ...N({ size: t }) }
    }
  ) })
);
export {
  ue as Textarea
};
