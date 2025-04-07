import * as W from "react";
import Zw, { useLayoutEffect as Jw, useEffect as eT, useRef as pM } from "react";
import { jsxs as NE, jsx as Aa, Fragment as vM } from "react/jsx-runtime";
import { t as Ly, i as hM } from "./index.esm-Dkuk1b-q.js";
function _y() {
  return typeof window < "u";
}
function po(d) {
  return tT(d) ? (d.nodeName || "").toLowerCase() : "#document";
}
function Sa(d) {
  var g;
  return (d == null || (g = d.ownerDocument) == null ? void 0 : g.defaultView) || window;
}
function vl(d) {
  var g;
  return (g = (tT(d) ? d.ownerDocument : d.document) || window.document) == null ? void 0 : g.documentElement;
}
function tT(d) {
  return _y() ? d instanceof Node || d instanceof Sa(d).Node : !1;
}
function Wt(d) {
  return _y() ? d instanceof Element || d instanceof Sa(d).Element : !1;
}
function An(d) {
  return _y() ? d instanceof HTMLElement || d instanceof Sa(d).HTMLElement : !1;
}
function bE(d) {
  return !_y() || typeof ShadowRoot > "u" ? !1 : d instanceof ShadowRoot || d instanceof Sa(d).ShadowRoot;
}
function dv(d) {
  const {
    overflow: g,
    overflowX: m,
    overflowY: E,
    display: R
  } = Ua(d);
  return /auto|scroll|overlay|hidden|clip/.test(g + E + m) && !["inline", "contents"].includes(R);
}
function mM(d) {
  return ["table", "td", "th"].includes(po(d));
}
function Ny(d) {
  return [":popover-open", ":modal"].some((g) => {
    try {
      return d.matches(g);
    } catch {
      return !1;
    }
  });
}
function zE(d) {
  const g = zy(), m = Wt(d) ? Ua(d) : d;
  return ["transform", "translate", "scale", "rotate", "perspective"].some((E) => m[E] ? m[E] !== "none" : !1) || (m.containerType ? m.containerType !== "normal" : !1) || !g && (m.backdropFilter ? m.backdropFilter !== "none" : !1) || !g && (m.filter ? m.filter !== "none" : !1) || ["transform", "translate", "scale", "rotate", "perspective", "filter"].some((E) => (m.willChange || "").includes(E)) || ["paint", "layout", "strict", "content"].some((E) => (m.contain || "").includes(E));
}
function yM(d) {
  let g = cu(d);
  for (; An(g) && !su(g); ) {
    if (zE(g))
      return g;
    if (Ny(g))
      return null;
    g = cu(g);
  }
  return null;
}
function zy() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
function su(d) {
  return ["html", "body", "#document"].includes(po(d));
}
function Ua(d) {
  return Sa(d).getComputedStyle(d);
}
function Ay(d) {
  return Wt(d) ? {
    scrollLeft: d.scrollLeft,
    scrollTop: d.scrollTop
  } : {
    scrollLeft: d.scrollX,
    scrollTop: d.scrollY
  };
}
function cu(d) {
  if (po(d) === "html")
    return d;
  const g = (
    // Step into the shadow DOM of the parent of a slotted node.
    d.assignedSlot || // DOM Element detected.
    d.parentNode || // ShadowRoot detected.
    bE(d) && d.host || // Fallback.
    vl(d)
  );
  return bE(g) ? g.host : g;
}
function nT(d) {
  const g = cu(d);
  return su(g) ? d.ownerDocument ? d.ownerDocument.body : d.body : An(g) && dv(g) ? g : nT(g);
}
function uo(d, g, m) {
  var E;
  g === void 0 && (g = []), m === void 0 && (m = !0);
  const R = nT(d), w = R === ((E = d.ownerDocument) == null ? void 0 : E.body), h = Sa(R);
  if (w) {
    const b = DE(h);
    return g.concat(h, h.visualViewport || [], dv(R) ? R : [], b && m ? uo(b) : []);
  }
  return g.concat(R, uo(R, [], m));
}
function DE(d) {
  return d.parent && Object.getPrototypeOf(d.parent) ? d.frameElement : null;
}
function Mi(d) {
  let g = d.activeElement;
  for (; ((m = g) == null || (m = m.shadowRoot) == null ? void 0 : m.activeElement) != null; ) {
    var m;
    g = g.shadowRoot.activeElement;
  }
  return g;
}
function mr(d, g) {
  if (!d || !g)
    return !1;
  const m = g.getRootNode == null ? void 0 : g.getRootNode();
  if (d.contains(g))
    return !0;
  if (m && bE(m)) {
    let E = g;
    for (; E; ) {
      if (d === E)
        return !0;
      E = E.parentNode || E.host;
    }
  }
  return !1;
}
function rT() {
  const d = navigator.userAgentData;
  return d != null && d.platform ? d.platform : navigator.platform;
}
function aT() {
  const d = navigator.userAgentData;
  return d && Array.isArray(d.brands) ? d.brands.map((g) => {
    let {
      brand: m,
      version: E
    } = g;
    return m + "/" + E;
  }).join(" ") : navigator.userAgent;
}
function iT(d) {
  return d.mozInputSource === 0 && d.isTrusted ? !0 : kE() && d.pointerType ? d.type === "click" && d.buttons === 1 : d.detail === 0 && !d.pointerType;
}
function AE(d) {
  return SM() ? !1 : !kE() && d.width === 0 && d.height === 0 || kE() && d.width === 1 && d.height === 1 && d.pressure === 0 && d.detail === 0 && d.pointerType === "mouse" || // iOS VoiceOver returns 0.333• for width/height.
  d.width < 1 && d.height < 1 && d.pressure === 0 && d.detail === 0 && d.pointerType === "touch";
}
function lT() {
  return /apple/i.test(navigator.vendor);
}
function kE() {
  const d = /android/i;
  return d.test(rT()) || d.test(aT());
}
function gM() {
  return rT().toLowerCase().startsWith("mac") && !navigator.maxTouchPoints;
}
function SM() {
  return aT().includes("jsdom/");
}
function cv(d, g) {
  const m = ["mouse", "pen"];
  return g || m.push("", void 0), m.includes(d);
}
function EM(d) {
  return "nativeEvent" in d;
}
function CM(d) {
  return d.matches("html,body");
}
function yr(d) {
  return (d == null ? void 0 : d.ownerDocument) || document;
}
function hE(d, g) {
  if (g == null)
    return !1;
  if ("composedPath" in d)
    return d.composedPath().includes(g);
  const m = d;
  return m.target != null && g.contains(m.target);
}
function lo(d) {
  return "composedPath" in d ? d.composedPath()[0] : d.target;
}
const RM = "input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])";
function UE(d) {
  return An(d) && d.matches(RM);
}
function qr(d) {
  d.preventDefault(), d.stopPropagation();
}
function uT(d) {
  return d ? d.getAttribute("role") === "combobox" && UE(d) : !1;
}
const co = Math.min, za = Math.max, by = Math.round, Af = Math.floor, pl = (d) => ({
  x: d,
  y: d
}), xM = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, wM = {
  start: "end",
  end: "start"
};
function OE(d, g, m) {
  return za(d, co(g, m));
}
function Hf(d, g) {
  return typeof d == "function" ? d(g) : d;
}
function fo(d) {
  return d.split("-")[0];
}
function Vf(d) {
  return d.split("-")[1];
}
function oT(d) {
  return d === "x" ? "y" : "x";
}
function FE(d) {
  return d === "y" ? "height" : "width";
}
function zs(d) {
  return ["top", "bottom"].includes(fo(d)) ? "y" : "x";
}
function HE(d) {
  return oT(zs(d));
}
function TM(d, g, m) {
  m === void 0 && (m = !1);
  const E = Vf(d), R = HE(d), w = FE(R);
  let h = R === "x" ? E === (m ? "end" : "start") ? "right" : "left" : E === "start" ? "bottom" : "top";
  return g.reference[w] > g.floating[w] && (h = Dy(h)), [h, Dy(h)];
}
function bM(d) {
  const g = Dy(d);
  return [ME(d), g, ME(g)];
}
function ME(d) {
  return d.replace(/start|end/g, (g) => wM[g]);
}
function DM(d, g, m) {
  const E = ["left", "right"], R = ["right", "left"], w = ["top", "bottom"], h = ["bottom", "top"];
  switch (d) {
    case "top":
    case "bottom":
      return m ? g ? R : E : g ? E : R;
    case "left":
    case "right":
      return g ? w : h;
    default:
      return [];
  }
}
function kM(d, g, m, E) {
  const R = Vf(d);
  let w = DM(fo(d), m === "start", E);
  return R && (w = w.map((h) => h + "-" + R), g && (w = w.concat(w.map(ME)))), w;
}
function Dy(d) {
  return d.replace(/left|right|bottom|top/g, (g) => xM[g]);
}
function OM(d) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...d
  };
}
function sT(d) {
  return typeof d != "number" ? OM(d) : {
    top: d,
    right: d,
    bottom: d,
    left: d
  };
}
function ky(d) {
  const {
    x: g,
    y: m,
    width: E,
    height: R
  } = d;
  return {
    width: E,
    height: R,
    top: m,
    left: g,
    right: g + E,
    bottom: m + R,
    x: g,
    y: m
  };
}
var gy = { exports: {} }, ya = {}, Sy = { exports: {} }, mE = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var xw;
function MM() {
  return xw || (xw = 1, function(d) {
    function g(I, X) {
      var G = I.length;
      I.push(X);
      e: for (; 0 < G; ) {
        var he = G - 1 >>> 1, Me = I[he];
        if (0 < R(Me, X)) I[he] = X, I[G] = Me, G = he;
        else break e;
      }
    }
    function m(I) {
      return I.length === 0 ? null : I[0];
    }
    function E(I) {
      if (I.length === 0) return null;
      var X = I[0], G = I.pop();
      if (G !== X) {
        I[0] = G;
        e: for (var he = 0, Me = I.length, Bt = Me >>> 1; he < Bt; ) {
          var Mt = 2 * (he + 1) - 1, gr = I[Mt], Et = Mt + 1, bt = I[Et];
          if (0 > R(gr, G)) Et < Me && 0 > R(bt, gr) ? (I[he] = bt, I[Et] = G, he = Et) : (I[he] = gr, I[Mt] = G, he = Mt);
          else if (Et < Me && 0 > R(bt, G)) I[he] = bt, I[Et] = G, he = Et;
          else break e;
        }
      }
      return X;
    }
    function R(I, X) {
      var G = I.sortIndex - X.sortIndex;
      return G !== 0 ? G : I.id - X.id;
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
      var w = performance;
      d.unstable_now = function() {
        return w.now();
      };
    } else {
      var h = Date, b = h.now();
      d.unstable_now = function() {
        return h.now() - b;
      };
    }
    var L = [], k = [], U = 1, M = null, A = 3, D = !1, F = !1, H = !1, ne = typeof setTimeout == "function" ? setTimeout : null, J = typeof clearTimeout == "function" ? clearTimeout : null, re = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function K(I) {
      for (var X = m(k); X !== null; ) {
        if (X.callback === null) E(k);
        else if (X.startTime <= I) E(k), X.sortIndex = X.expirationTime, g(L, X);
        else break;
        X = m(k);
      }
    }
    function pe(I) {
      if (H = !1, K(I), !F) if (m(L) !== null) F = !0, oe(fe);
      else {
        var X = m(k);
        X !== null && ye(pe, X.startTime - I);
      }
    }
    function fe(I, X) {
      F = !1, H && (H = !1, J(We), We = -1), D = !0;
      var G = A;
      try {
        for (K(X), M = m(L); M !== null && (!(M.expirationTime > X) || I && !Ae()); ) {
          var he = M.callback;
          if (typeof he == "function") {
            M.callback = null, A = M.priorityLevel;
            var Me = he(M.expirationTime <= X);
            X = d.unstable_now(), typeof Me == "function" ? M.callback = Me : M === m(L) && E(L), K(X);
          } else E(L);
          M = m(L);
        }
        if (M !== null) var Bt = !0;
        else {
          var Mt = m(k);
          Mt !== null && ye(pe, Mt.startTime - X), Bt = !1;
        }
        return Bt;
      } finally {
        M = null, A = G, D = !1;
      }
    }
    var ke = !1, ve = null, We = -1, Oe = 5, Ye = -1;
    function Ae() {
      return !(d.unstable_now() - Ye < Oe);
    }
    function de() {
      if (ve !== null) {
        var I = d.unstable_now();
        Ye = I;
        var X = !0;
        try {
          X = ve(!0, I);
        } finally {
          X ? te() : (ke = !1, ve = null);
        }
      } else ke = !1;
    }
    var te;
    if (typeof re == "function") te = function() {
      re(de);
    };
    else if (typeof MessageChannel < "u") {
      var He = new MessageChannel(), Ce = He.port2;
      He.port1.onmessage = de, te = function() {
        Ce.postMessage(null);
      };
    } else te = function() {
      ne(de, 0);
    };
    function oe(I) {
      ve = I, ke || (ke = !0, te());
    }
    function ye(I, X) {
      We = ne(function() {
        I(d.unstable_now());
      }, X);
    }
    d.unstable_IdlePriority = 5, d.unstable_ImmediatePriority = 1, d.unstable_LowPriority = 4, d.unstable_NormalPriority = 3, d.unstable_Profiling = null, d.unstable_UserBlockingPriority = 2, d.unstable_cancelCallback = function(I) {
      I.callback = null;
    }, d.unstable_continueExecution = function() {
      F || D || (F = !0, oe(fe));
    }, d.unstable_forceFrameRate = function(I) {
      0 > I || 125 < I ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : Oe = 0 < I ? Math.floor(1e3 / I) : 5;
    }, d.unstable_getCurrentPriorityLevel = function() {
      return A;
    }, d.unstable_getFirstCallbackNode = function() {
      return m(L);
    }, d.unstable_next = function(I) {
      switch (A) {
        case 1:
        case 2:
        case 3:
          var X = 3;
          break;
        default:
          X = A;
      }
      var G = A;
      A = X;
      try {
        return I();
      } finally {
        A = G;
      }
    }, d.unstable_pauseExecution = function() {
    }, d.unstable_requestPaint = function() {
    }, d.unstable_runWithPriority = function(I, X) {
      switch (I) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          I = 3;
      }
      var G = A;
      A = I;
      try {
        return X();
      } finally {
        A = G;
      }
    }, d.unstable_scheduleCallback = function(I, X, G) {
      var he = d.unstable_now();
      switch (typeof G == "object" && G !== null ? (G = G.delay, G = typeof G == "number" && 0 < G ? he + G : he) : G = he, I) {
        case 1:
          var Me = -1;
          break;
        case 2:
          Me = 250;
          break;
        case 5:
          Me = 1073741823;
          break;
        case 4:
          Me = 1e4;
          break;
        default:
          Me = 5e3;
      }
      return Me = G + Me, I = { id: U++, callback: X, priorityLevel: I, startTime: G, expirationTime: Me, sortIndex: -1 }, G > he ? (I.sortIndex = G, g(k, I), m(L) === null && I === m(k) && (H ? (J(We), We = -1) : H = !0, ye(pe, G - he))) : (I.sortIndex = Me, g(L, I), F || D || (F = !0, oe(fe))), I;
    }, d.unstable_shouldYield = Ae, d.unstable_wrapCallback = function(I) {
      var X = A;
      return function() {
        var G = A;
        A = X;
        try {
          return I.apply(this, arguments);
        } finally {
          A = G;
        }
      };
    };
  }(mE)), mE;
}
var yE = {};
/**
 * @license React
 * scheduler.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ww;
function LM() {
  return ww || (ww = 1, function(d) {
    process.env.NODE_ENV !== "production" && function() {
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      var g = !1, m = 5;
      function E(me, Ie) {
        var ut = me.length;
        me.push(Ie), h(me, Ie, ut);
      }
      function R(me) {
        return me.length === 0 ? null : me[0];
      }
      function w(me) {
        if (me.length === 0)
          return null;
        var Ie = me[0], ut = me.pop();
        return ut !== Ie && (me[0] = ut, b(me, ut, 0)), Ie;
      }
      function h(me, Ie, ut) {
        for (var Dt = ut; Dt > 0; ) {
          var It = Dt - 1 >>> 1, ln = me[It];
          if (L(ln, Ie) > 0)
            me[It] = Ie, me[Dt] = ln, Dt = It;
          else
            return;
        }
      }
      function b(me, Ie, ut) {
        for (var Dt = ut, It = me.length, ln = It >>> 1; Dt < ln; ) {
          var _t = (Dt + 1) * 2 - 1, Tn = me[_t], en = _t + 1, $t = me[en];
          if (L(Tn, Ie) < 0)
            en < It && L($t, Tn) < 0 ? (me[Dt] = $t, me[en] = Ie, Dt = en) : (me[Dt] = Tn, me[_t] = Ie, Dt = _t);
          else if (en < It && L($t, Ie) < 0)
            me[Dt] = $t, me[en] = Ie, Dt = en;
          else
            return;
        }
      }
      function L(me, Ie) {
        var ut = me.sortIndex - Ie.sortIndex;
        return ut !== 0 ? ut : me.id - Ie.id;
      }
      var k = 1, U = 2, M = 3, A = 4, D = 5;
      function F(me, Ie) {
      }
      var H = typeof performance == "object" && typeof performance.now == "function";
      if (H) {
        var ne = performance;
        d.unstable_now = function() {
          return ne.now();
        };
      } else {
        var J = Date, re = J.now();
        d.unstable_now = function() {
          return J.now() - re;
        };
      }
      var K = 1073741823, pe = -1, fe = 250, ke = 5e3, ve = 1e4, We = K, Oe = [], Ye = [], Ae = 1, de = null, te = M, He = !1, Ce = !1, oe = !1, ye = typeof setTimeout == "function" ? setTimeout : null, I = typeof clearTimeout == "function" ? clearTimeout : null, X = typeof setImmediate < "u" ? setImmediate : null;
      typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
      function G(me) {
        for (var Ie = R(Ye); Ie !== null; ) {
          if (Ie.callback === null)
            w(Ye);
          else if (Ie.startTime <= me)
            w(Ye), Ie.sortIndex = Ie.expirationTime, E(Oe, Ie);
          else
            return;
          Ie = R(Ye);
        }
      }
      function he(me) {
        if (oe = !1, G(me), !Ce)
          if (R(Oe) !== null)
            Ce = !0, Un(Me);
          else {
            var Ie = R(Ye);
            Ie !== null && tr(he, Ie.startTime - me);
          }
      }
      function Me(me, Ie) {
        Ce = !1, oe && (oe = !1, Hr()), He = !0;
        var ut = te;
        try {
          var Dt;
          if (!g) return Bt(me, Ie);
        } finally {
          de = null, te = ut, He = !1;
        }
      }
      function Bt(me, Ie) {
        var ut = Ie;
        for (G(ut), de = R(Oe); de !== null && !(de.expirationTime > ut && (!me || Mn())); ) {
          var Dt = de.callback;
          if (typeof Dt == "function") {
            de.callback = null, te = de.priorityLevel;
            var It = de.expirationTime <= ut, ln = Dt(It);
            ut = d.unstable_now(), typeof ln == "function" ? de.callback = ln : de === R(Oe) && w(Oe), G(ut);
          } else
            w(Oe);
          de = R(Oe);
        }
        if (de !== null)
          return !0;
        var _t = R(Ye);
        return _t !== null && tr(he, _t.startTime - ut), !1;
      }
      function Mt(me, Ie) {
        switch (me) {
          case k:
          case U:
          case M:
          case A:
          case D:
            break;
          default:
            me = M;
        }
        var ut = te;
        te = me;
        try {
          return Ie();
        } finally {
          te = ut;
        }
      }
      function gr(me) {
        var Ie;
        switch (te) {
          case k:
          case U:
          case M:
            Ie = M;
            break;
          default:
            Ie = te;
            break;
        }
        var ut = te;
        te = Ie;
        try {
          return me();
        } finally {
          te = ut;
        }
      }
      function Et(me) {
        var Ie = te;
        return function() {
          var ut = te;
          te = Ie;
          try {
            return me.apply(this, arguments);
          } finally {
            te = ut;
          }
        };
      }
      function bt(me, Ie, ut) {
        var Dt = d.unstable_now(), It;
        if (typeof ut == "object" && ut !== null) {
          var ln = ut.delay;
          typeof ln == "number" && ln > 0 ? It = Dt + ln : It = Dt;
        } else
          It = Dt;
        var _t;
        switch (me) {
          case k:
            _t = pe;
            break;
          case U:
            _t = fe;
            break;
          case D:
            _t = We;
            break;
          case A:
            _t = ve;
            break;
          case M:
          default:
            _t = ke;
            break;
        }
        var Tn = It + _t, en = {
          id: Ae++,
          callback: Ie,
          priorityLevel: me,
          startTime: It,
          expirationTime: Tn,
          sortIndex: -1
        };
        return It > Dt ? (en.sortIndex = It, E(Ye, en), R(Oe) === null && en === R(Ye) && (oe ? Hr() : oe = !0, tr(he, It - Dt))) : (en.sortIndex = Tn, E(Oe, en), !Ce && !He && (Ce = !0, Un(Me))), en;
      }
      function Pt() {
      }
      function Ke() {
        !Ce && !He && (Ce = !0, Un(Me));
      }
      function rt() {
        return R(Oe);
      }
      function Ue(me) {
        me.callback = null;
      }
      function et() {
        return te;
      }
      var st = !1, dt = null, pt = -1, gt = m, vn = -1;
      function Mn() {
        var me = d.unstable_now() - vn;
        return !(me < gt);
      }
      function Xe() {
      }
      function lt(me) {
        if (me < 0 || me > 125) {
          console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported");
          return;
        }
        me > 0 ? gt = Math.floor(1e3 / me) : gt = m;
      }
      var Re = function() {
        if (dt !== null) {
          var me = d.unstable_now();
          vn = me;
          var Ie = !0, ut = !0;
          try {
            ut = dt(Ie, me);
          } finally {
            ut ? Ve() : (st = !1, dt = null);
          }
        } else
          st = !1;
      }, Ve;
      if (typeof X == "function")
        Ve = function() {
          X(Re);
        };
      else if (typeof MessageChannel < "u") {
        var Lt = new MessageChannel(), Jt = Lt.port2;
        Lt.port1.onmessage = Re, Ve = function() {
          Jt.postMessage(null);
        };
      } else
        Ve = function() {
          ye(Re, 0);
        };
      function Un(me) {
        dt = me, st || (st = !0, Ve());
      }
      function tr(me, Ie) {
        pt = ye(function() {
          me(d.unstable_now());
        }, Ie);
      }
      function Hr() {
        I(pt), pt = -1;
      }
      var wn = Xe, Sr = null;
      d.unstable_IdlePriority = D, d.unstable_ImmediatePriority = k, d.unstable_LowPriority = A, d.unstable_NormalPriority = M, d.unstable_Profiling = Sr, d.unstable_UserBlockingPriority = U, d.unstable_cancelCallback = Ue, d.unstable_continueExecution = Ke, d.unstable_forceFrameRate = lt, d.unstable_getCurrentPriorityLevel = et, d.unstable_getFirstCallbackNode = rt, d.unstable_next = gr, d.unstable_pauseExecution = Pt, d.unstable_requestPaint = wn, d.unstable_runWithPriority = Mt, d.unstable_scheduleCallback = bt, d.unstable_shouldYield = Mn, d.unstable_wrapCallback = Et, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
    }();
  }(yE)), yE;
}
var Tw;
function cT() {
  return Tw || (Tw = 1, process.env.NODE_ENV === "production" ? Sy.exports = MM() : Sy.exports = LM()), Sy.exports;
}
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var bw;
function _M() {
  if (bw) return ya;
  bw = 1;
  var d = Zw, g = cT();
  function m(n) {
    for (var r = "https://reactjs.org/docs/error-decoder.html?invariant=" + n, l = 1; l < arguments.length; l++) r += "&args[]=" + encodeURIComponent(arguments[l]);
    return "Minified React error #" + n + "; visit " + r + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var E = /* @__PURE__ */ new Set(), R = {};
  function w(n, r) {
    h(n, r), h(n + "Capture", r);
  }
  function h(n, r) {
    for (R[n] = r, n = 0; n < r.length; n++) E.add(r[n]);
  }
  var b = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), L = Object.prototype.hasOwnProperty, k = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, U = {}, M = {};
  function A(n) {
    return L.call(M, n) ? !0 : L.call(U, n) ? !1 : k.test(n) ? M[n] = !0 : (U[n] = !0, !1);
  }
  function D(n, r, l, o) {
    if (l !== null && l.type === 0) return !1;
    switch (typeof r) {
      case "function":
      case "symbol":
        return !0;
      case "boolean":
        return o ? !1 : l !== null ? !l.acceptsBooleans : (n = n.toLowerCase().slice(0, 5), n !== "data-" && n !== "aria-");
      default:
        return !1;
    }
  }
  function F(n, r, l, o) {
    if (r === null || typeof r > "u" || D(n, r, l, o)) return !0;
    if (o) return !1;
    if (l !== null) switch (l.type) {
      case 3:
        return !r;
      case 4:
        return r === !1;
      case 5:
        return isNaN(r);
      case 6:
        return isNaN(r) || 1 > r;
    }
    return !1;
  }
  function H(n, r, l, o, c, p, S) {
    this.acceptsBooleans = r === 2 || r === 3 || r === 4, this.attributeName = o, this.attributeNamespace = c, this.mustUseProperty = l, this.propertyName = n, this.type = r, this.sanitizeURL = p, this.removeEmptyString = S;
  }
  var ne = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(n) {
    ne[n] = new H(n, 0, !1, n, null, !1, !1);
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(n) {
    var r = n[0];
    ne[r] = new H(r, 1, !1, n[1], null, !1, !1);
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(n) {
    ne[n] = new H(n, 2, !1, n.toLowerCase(), null, !1, !1);
  }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(n) {
    ne[n] = new H(n, 2, !1, n, null, !1, !1);
  }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(n) {
    ne[n] = new H(n, 3, !1, n.toLowerCase(), null, !1, !1);
  }), ["checked", "multiple", "muted", "selected"].forEach(function(n) {
    ne[n] = new H(n, 3, !0, n, null, !1, !1);
  }), ["capture", "download"].forEach(function(n) {
    ne[n] = new H(n, 4, !1, n, null, !1, !1);
  }), ["cols", "rows", "size", "span"].forEach(function(n) {
    ne[n] = new H(n, 6, !1, n, null, !1, !1);
  }), ["rowSpan", "start"].forEach(function(n) {
    ne[n] = new H(n, 5, !1, n.toLowerCase(), null, !1, !1);
  });
  var J = /[\-:]([a-z])/g;
  function re(n) {
    return n[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(n) {
    var r = n.replace(
      J,
      re
    );
    ne[r] = new H(r, 1, !1, n, null, !1, !1);
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(n) {
    var r = n.replace(J, re);
    ne[r] = new H(r, 1, !1, n, "http://www.w3.org/1999/xlink", !1, !1);
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function(n) {
    var r = n.replace(J, re);
    ne[r] = new H(r, 1, !1, n, "http://www.w3.org/XML/1998/namespace", !1, !1);
  }), ["tabIndex", "crossOrigin"].forEach(function(n) {
    ne[n] = new H(n, 1, !1, n.toLowerCase(), null, !1, !1);
  }), ne.xlinkHref = new H("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach(function(n) {
    ne[n] = new H(n, 1, !1, n.toLowerCase(), null, !0, !0);
  });
  function K(n, r, l, o) {
    var c = ne.hasOwnProperty(r) ? ne[r] : null;
    (c !== null ? c.type !== 0 : o || !(2 < r.length) || r[0] !== "o" && r[0] !== "O" || r[1] !== "n" && r[1] !== "N") && (F(r, l, c, o) && (l = null), o || c === null ? A(r) && (l === null ? n.removeAttribute(r) : n.setAttribute(r, "" + l)) : c.mustUseProperty ? n[c.propertyName] = l === null ? c.type === 3 ? !1 : "" : l : (r = c.attributeName, o = c.attributeNamespace, l === null ? n.removeAttribute(r) : (c = c.type, l = c === 3 || c === 4 && l === !0 ? "" : "" + l, o ? n.setAttributeNS(o, r, l) : n.setAttribute(r, l))));
  }
  var pe = d.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, fe = Symbol.for("react.element"), ke = Symbol.for("react.portal"), ve = Symbol.for("react.fragment"), We = Symbol.for("react.strict_mode"), Oe = Symbol.for("react.profiler"), Ye = Symbol.for("react.provider"), Ae = Symbol.for("react.context"), de = Symbol.for("react.forward_ref"), te = Symbol.for("react.suspense"), He = Symbol.for("react.suspense_list"), Ce = Symbol.for("react.memo"), oe = Symbol.for("react.lazy"), ye = Symbol.for("react.offscreen"), I = Symbol.iterator;
  function X(n) {
    return n === null || typeof n != "object" ? null : (n = I && n[I] || n["@@iterator"], typeof n == "function" ? n : null);
  }
  var G = Object.assign, he;
  function Me(n) {
    if (he === void 0) try {
      throw Error();
    } catch (l) {
      var r = l.stack.trim().match(/\n( *(at )?)/);
      he = r && r[1] || "";
    }
    return `
` + he + n;
  }
  var Bt = !1;
  function Mt(n, r) {
    if (!n || Bt) return "";
    Bt = !0;
    var l = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (r) if (r = function() {
        throw Error();
      }, Object.defineProperty(r.prototype, "props", { set: function() {
        throw Error();
      } }), typeof Reflect == "object" && Reflect.construct) {
        try {
          Reflect.construct(r, []);
        } catch (Y) {
          var o = Y;
        }
        Reflect.construct(n, [], r);
      } else {
        try {
          r.call();
        } catch (Y) {
          o = Y;
        }
        n.call(r.prototype);
      }
      else {
        try {
          throw Error();
        } catch (Y) {
          o = Y;
        }
        n();
      }
    } catch (Y) {
      if (Y && o && typeof Y.stack == "string") {
        for (var c = Y.stack.split(`
`), p = o.stack.split(`
`), S = c.length - 1, T = p.length - 1; 1 <= S && 0 <= T && c[S] !== p[T]; ) T--;
        for (; 1 <= S && 0 <= T; S--, T--) if (c[S] !== p[T]) {
          if (S !== 1 || T !== 1)
            do
              if (S--, T--, 0 > T || c[S] !== p[T]) {
                var O = `
` + c[S].replace(" at new ", " at ");
                return n.displayName && O.includes("<anonymous>") && (O = O.replace("<anonymous>", n.displayName)), O;
              }
            while (1 <= S && 0 <= T);
          break;
        }
      }
    } finally {
      Bt = !1, Error.prepareStackTrace = l;
    }
    return (n = n ? n.displayName || n.name : "") ? Me(n) : "";
  }
  function gr(n) {
    switch (n.tag) {
      case 5:
        return Me(n.type);
      case 16:
        return Me("Lazy");
      case 13:
        return Me("Suspense");
      case 19:
        return Me("SuspenseList");
      case 0:
      case 2:
      case 15:
        return n = Mt(n.type, !1), n;
      case 11:
        return n = Mt(n.type.render, !1), n;
      case 1:
        return n = Mt(n.type, !0), n;
      default:
        return "";
    }
  }
  function Et(n) {
    if (n == null) return null;
    if (typeof n == "function") return n.displayName || n.name || null;
    if (typeof n == "string") return n;
    switch (n) {
      case ve:
        return "Fragment";
      case ke:
        return "Portal";
      case Oe:
        return "Profiler";
      case We:
        return "StrictMode";
      case te:
        return "Suspense";
      case He:
        return "SuspenseList";
    }
    if (typeof n == "object") switch (n.$$typeof) {
      case Ae:
        return (n.displayName || "Context") + ".Consumer";
      case Ye:
        return (n._context.displayName || "Context") + ".Provider";
      case de:
        var r = n.render;
        return n = n.displayName, n || (n = r.displayName || r.name || "", n = n !== "" ? "ForwardRef(" + n + ")" : "ForwardRef"), n;
      case Ce:
        return r = n.displayName || null, r !== null ? r : Et(n.type) || "Memo";
      case oe:
        r = n._payload, n = n._init;
        try {
          return Et(n(r));
        } catch {
        }
    }
    return null;
  }
  function bt(n) {
    var r = n.type;
    switch (n.tag) {
      case 24:
        return "Cache";
      case 9:
        return (r.displayName || "Context") + ".Consumer";
      case 10:
        return (r._context.displayName || "Context") + ".Provider";
      case 18:
        return "DehydratedFragment";
      case 11:
        return n = r.render, n = n.displayName || n.name || "", r.displayName || (n !== "" ? "ForwardRef(" + n + ")" : "ForwardRef");
      case 7:
        return "Fragment";
      case 5:
        return r;
      case 4:
        return "Portal";
      case 3:
        return "Root";
      case 6:
        return "Text";
      case 16:
        return Et(r);
      case 8:
        return r === We ? "StrictMode" : "Mode";
      case 22:
        return "Offscreen";
      case 12:
        return "Profiler";
      case 21:
        return "Scope";
      case 13:
        return "Suspense";
      case 19:
        return "SuspenseList";
      case 25:
        return "TracingMarker";
      case 1:
      case 0:
      case 17:
      case 2:
      case 14:
      case 15:
        if (typeof r == "function") return r.displayName || r.name || null;
        if (typeof r == "string") return r;
    }
    return null;
  }
  function Pt(n) {
    switch (typeof n) {
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return n;
      case "object":
        return n;
      default:
        return "";
    }
  }
  function Ke(n) {
    var r = n.type;
    return (n = n.nodeName) && n.toLowerCase() === "input" && (r === "checkbox" || r === "radio");
  }
  function rt(n) {
    var r = Ke(n) ? "checked" : "value", l = Object.getOwnPropertyDescriptor(n.constructor.prototype, r), o = "" + n[r];
    if (!n.hasOwnProperty(r) && typeof l < "u" && typeof l.get == "function" && typeof l.set == "function") {
      var c = l.get, p = l.set;
      return Object.defineProperty(n, r, { configurable: !0, get: function() {
        return c.call(this);
      }, set: function(S) {
        o = "" + S, p.call(this, S);
      } }), Object.defineProperty(n, r, { enumerable: l.enumerable }), { getValue: function() {
        return o;
      }, setValue: function(S) {
        o = "" + S;
      }, stopTracking: function() {
        n._valueTracker = null, delete n[r];
      } };
    }
  }
  function Ue(n) {
    n._valueTracker || (n._valueTracker = rt(n));
  }
  function et(n) {
    if (!n) return !1;
    var r = n._valueTracker;
    if (!r) return !0;
    var l = r.getValue(), o = "";
    return n && (o = Ke(n) ? n.checked ? "true" : "false" : n.value), n = o, n !== l ? (r.setValue(n), !0) : !1;
  }
  function st(n) {
    if (n = n || (typeof document < "u" ? document : void 0), typeof n > "u") return null;
    try {
      return n.activeElement || n.body;
    } catch {
      return n.body;
    }
  }
  function dt(n, r) {
    var l = r.checked;
    return G({}, r, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: l ?? n._wrapperState.initialChecked });
  }
  function pt(n, r) {
    var l = r.defaultValue == null ? "" : r.defaultValue, o = r.checked != null ? r.checked : r.defaultChecked;
    l = Pt(r.value != null ? r.value : l), n._wrapperState = { initialChecked: o, initialValue: l, controlled: r.type === "checkbox" || r.type === "radio" ? r.checked != null : r.value != null };
  }
  function gt(n, r) {
    r = r.checked, r != null && K(n, "checked", r, !1);
  }
  function vn(n, r) {
    gt(n, r);
    var l = Pt(r.value), o = r.type;
    if (l != null) o === "number" ? (l === 0 && n.value === "" || n.value != l) && (n.value = "" + l) : n.value !== "" + l && (n.value = "" + l);
    else if (o === "submit" || o === "reset") {
      n.removeAttribute("value");
      return;
    }
    r.hasOwnProperty("value") ? Xe(n, r.type, l) : r.hasOwnProperty("defaultValue") && Xe(n, r.type, Pt(r.defaultValue)), r.checked == null && r.defaultChecked != null && (n.defaultChecked = !!r.defaultChecked);
  }
  function Mn(n, r, l) {
    if (r.hasOwnProperty("value") || r.hasOwnProperty("defaultValue")) {
      var o = r.type;
      if (!(o !== "submit" && o !== "reset" || r.value !== void 0 && r.value !== null)) return;
      r = "" + n._wrapperState.initialValue, l || r === n.value || (n.value = r), n.defaultValue = r;
    }
    l = n.name, l !== "" && (n.name = ""), n.defaultChecked = !!n._wrapperState.initialChecked, l !== "" && (n.name = l);
  }
  function Xe(n, r, l) {
    (r !== "number" || st(n.ownerDocument) !== n) && (l == null ? n.defaultValue = "" + n._wrapperState.initialValue : n.defaultValue !== "" + l && (n.defaultValue = "" + l));
  }
  var lt = Array.isArray;
  function Re(n, r, l, o) {
    if (n = n.options, r) {
      r = {};
      for (var c = 0; c < l.length; c++) r["$" + l[c]] = !0;
      for (l = 0; l < n.length; l++) c = r.hasOwnProperty("$" + n[l].value), n[l].selected !== c && (n[l].selected = c), c && o && (n[l].defaultSelected = !0);
    } else {
      for (l = "" + Pt(l), r = null, c = 0; c < n.length; c++) {
        if (n[c].value === l) {
          n[c].selected = !0, o && (n[c].defaultSelected = !0);
          return;
        }
        r !== null || n[c].disabled || (r = n[c]);
      }
      r !== null && (r.selected = !0);
    }
  }
  function Ve(n, r) {
    if (r.dangerouslySetInnerHTML != null) throw Error(m(91));
    return G({}, r, { value: void 0, defaultValue: void 0, children: "" + n._wrapperState.initialValue });
  }
  function Lt(n, r) {
    var l = r.value;
    if (l == null) {
      if (l = r.children, r = r.defaultValue, l != null) {
        if (r != null) throw Error(m(92));
        if (lt(l)) {
          if (1 < l.length) throw Error(m(93));
          l = l[0];
        }
        r = l;
      }
      r == null && (r = ""), l = r;
    }
    n._wrapperState = { initialValue: Pt(l) };
  }
  function Jt(n, r) {
    var l = Pt(r.value), o = Pt(r.defaultValue);
    l != null && (l = "" + l, l !== n.value && (n.value = l), r.defaultValue == null && n.defaultValue !== l && (n.defaultValue = l)), o != null && (n.defaultValue = "" + o);
  }
  function Un(n) {
    var r = n.textContent;
    r === n._wrapperState.initialValue && r !== "" && r !== null && (n.value = r);
  }
  function tr(n) {
    switch (n) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function Hr(n, r) {
    return n == null || n === "http://www.w3.org/1999/xhtml" ? tr(r) : n === "http://www.w3.org/2000/svg" && r === "foreignObject" ? "http://www.w3.org/1999/xhtml" : n;
  }
  var wn, Sr = function(n) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(r, l, o, c) {
      MSApp.execUnsafeLocalFunction(function() {
        return n(r, l, o, c);
      });
    } : n;
  }(function(n, r) {
    if (n.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in n) n.innerHTML = r;
    else {
      for (wn = wn || document.createElement("div"), wn.innerHTML = "<svg>" + r.valueOf().toString() + "</svg>", r = wn.firstChild; n.firstChild; ) n.removeChild(n.firstChild);
      for (; r.firstChild; ) n.appendChild(r.firstChild);
    }
  });
  function me(n, r) {
    if (r) {
      var l = n.firstChild;
      if (l && l === n.lastChild && l.nodeType === 3) {
        l.nodeValue = r;
        return;
      }
    }
    n.textContent = r;
  }
  var Ie = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0
  }, ut = ["Webkit", "ms", "Moz", "O"];
  Object.keys(Ie).forEach(function(n) {
    ut.forEach(function(r) {
      r = r + n.charAt(0).toUpperCase() + n.substring(1), Ie[r] = Ie[n];
    });
  });
  function Dt(n, r, l) {
    return r == null || typeof r == "boolean" || r === "" ? "" : l || typeof r != "number" || r === 0 || Ie.hasOwnProperty(n) && Ie[n] ? ("" + r).trim() : r + "px";
  }
  function It(n, r) {
    n = n.style;
    for (var l in r) if (r.hasOwnProperty(l)) {
      var o = l.indexOf("--") === 0, c = Dt(l, r[l], o);
      l === "float" && (l = "cssFloat"), o ? n.setProperty(l, c) : n[l] = c;
    }
  }
  var ln = G({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
  function _t(n, r) {
    if (r) {
      if (ln[n] && (r.children != null || r.dangerouslySetInnerHTML != null)) throw Error(m(137, n));
      if (r.dangerouslySetInnerHTML != null) {
        if (r.children != null) throw Error(m(60));
        if (typeof r.dangerouslySetInnerHTML != "object" || !("__html" in r.dangerouslySetInnerHTML)) throw Error(m(61));
      }
      if (r.style != null && typeof r.style != "object") throw Error(m(62));
    }
  }
  function Tn(n, r) {
    if (n.indexOf("-") === -1) return typeof r.is == "string";
    switch (n) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var en = null;
  function $t(n) {
    return n = n.target || n.srcElement || window, n.correspondingUseElement && (n = n.correspondingUseElement), n.nodeType === 3 ? n.parentNode : n;
  }
  var tn = null, fu = null, _i = null;
  function Fs(n) {
    if (n = je(n)) {
      if (typeof tn != "function") throw Error(m(280));
      var r = n.stateNode;
      r && (r = un(r), tn(n.stateNode, n.type, r));
    }
  }
  function hv(n) {
    fu ? _i ? _i.push(n) : _i = [n] : fu = n;
  }
  function mv() {
    if (fu) {
      var n = fu, r = _i;
      if (_i = fu = null, Fs(n), r) for (n = 0; n < r.length; n++) Fs(r[n]);
    }
  }
  function Pf(n, r) {
    return n(r);
  }
  function jf() {
  }
  var Bf = !1;
  function If(n, r, l) {
    if (Bf) return n(r, l);
    Bf = !0;
    try {
      return Pf(n, r, l);
    } finally {
      Bf = !1, (fu !== null || _i !== null) && (jf(), mv());
    }
  }
  function hl(n, r) {
    var l = n.stateNode;
    if (l === null) return null;
    var o = un(l);
    if (o === null) return null;
    l = o[r];
    e: switch (r) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (o = !o.disabled) || (n = n.type, o = !(n === "button" || n === "input" || n === "select" || n === "textarea")), n = !o;
        break e;
      default:
        n = !1;
    }
    if (n) return null;
    if (l && typeof l != "function") throw Error(m(231, r, typeof l));
    return l;
  }
  var Ni = !1;
  if (b) try {
    var Ea = {};
    Object.defineProperty(Ea, "passive", { get: function() {
      Ni = !0;
    } }), window.addEventListener("test", Ea, Ea), window.removeEventListener("test", Ea, Ea);
  } catch {
    Ni = !1;
  }
  function du(n, r, l, o, c, p, S, T, O) {
    var Y = Array.prototype.slice.call(arguments, 3);
    try {
      r.apply(l, Y);
    } catch (le) {
      this.onError(le);
    }
  }
  var ml = !1, pu = null, vu = !1, vo = null, hu = { onError: function(n) {
    ml = !0, pu = n;
  } };
  function Hs(n, r, l, o, c, p, S, T, O) {
    ml = !1, pu = null, du.apply(hu, arguments);
  }
  function Vs(n, r, l, o, c, p, S, T, O) {
    if (Hs.apply(this, arguments), ml) {
      if (ml) {
        var Y = pu;
        ml = !1, pu = null;
      } else throw Error(m(198));
      vu || (vu = !0, vo = Y);
    }
  }
  function Ca(n) {
    var r = n, l = n;
    if (n.alternate) for (; r.return; ) r = r.return;
    else {
      n = r;
      do
        r = n, (r.flags & 4098) !== 0 && (l = r.return), n = r.return;
      while (n);
    }
    return r.tag === 3 ? l : null;
  }
  function qn(n) {
    if (n.tag === 13) {
      var r = n.memoizedState;
      if (r === null && (n = n.alternate, n !== null && (r = n.memoizedState)), r !== null) return r.dehydrated;
    }
    return null;
  }
  function yv(n) {
    if (Ca(n) !== n) throw Error(m(188));
  }
  function jy(n) {
    var r = n.alternate;
    if (!r) {
      if (r = Ca(n), r === null) throw Error(m(188));
      return r !== n ? null : n;
    }
    for (var l = n, o = r; ; ) {
      var c = l.return;
      if (c === null) break;
      var p = c.alternate;
      if (p === null) {
        if (o = c.return, o !== null) {
          l = o;
          continue;
        }
        break;
      }
      if (c.child === p.child) {
        for (p = c.child; p; ) {
          if (p === l) return yv(c), n;
          if (p === o) return yv(c), r;
          p = p.sibling;
        }
        throw Error(m(188));
      }
      if (l.return !== o.return) l = c, o = p;
      else {
        for (var S = !1, T = c.child; T; ) {
          if (T === l) {
            S = !0, l = c, o = p;
            break;
          }
          if (T === o) {
            S = !0, o = c, l = p;
            break;
          }
          T = T.sibling;
        }
        if (!S) {
          for (T = p.child; T; ) {
            if (T === l) {
              S = !0, l = p, o = c;
              break;
            }
            if (T === o) {
              S = !0, o = p, l = c;
              break;
            }
            T = T.sibling;
          }
          if (!S) throw Error(m(189));
        }
      }
      if (l.alternate !== o) throw Error(m(190));
    }
    if (l.tag !== 3) throw Error(m(188));
    return l.stateNode.current === l ? n : r;
  }
  function $f(n) {
    return n = jy(n), n !== null ? gv(n) : null;
  }
  function gv(n) {
    if (n.tag === 5 || n.tag === 6) return n;
    for (n = n.child; n !== null; ) {
      var r = gv(n);
      if (r !== null) return r;
      n = n.sibling;
    }
    return null;
  }
  var Sv = g.unstable_scheduleCallback, Ev = g.unstable_cancelCallback, Cv = g.unstable_shouldYield, By = g.unstable_requestPaint, Ht = g.unstable_now, ft = g.unstable_getCurrentPriorityLevel, yl = g.unstable_ImmediatePriority, Yf = g.unstable_UserBlockingPriority, ho = g.unstable_NormalPriority, Rv = g.unstable_LowPriority, Qf = g.unstable_IdlePriority, mo = null, Ra = null;
  function xv(n) {
    if (Ra && typeof Ra.onCommitFiberRoot == "function") try {
      Ra.onCommitFiberRoot(mo, n, void 0, (n.current.flags & 128) === 128);
    } catch {
    }
  }
  var Jr = Math.clz32 ? Math.clz32 : Wf, Iy = Math.log, $y = Math.LN2;
  function Wf(n) {
    return n >>>= 0, n === 0 ? 32 : 31 - (Iy(n) / $y | 0) | 0;
  }
  var mu = 64, xa = 4194304;
  function gl(n) {
    switch (n & -n) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return n & 4194240;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return n & 130023424;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 1073741824;
      default:
        return n;
    }
  }
  function Sl(n, r) {
    var l = n.pendingLanes;
    if (l === 0) return 0;
    var o = 0, c = n.suspendedLanes, p = n.pingedLanes, S = l & 268435455;
    if (S !== 0) {
      var T = S & ~c;
      T !== 0 ? o = gl(T) : (p &= S, p !== 0 && (o = gl(p)));
    } else S = l & ~c, S !== 0 ? o = gl(S) : p !== 0 && (o = gl(p));
    if (o === 0) return 0;
    if (r !== 0 && r !== o && (r & c) === 0 && (c = o & -o, p = r & -r, c >= p || c === 16 && (p & 4194240) !== 0)) return r;
    if ((o & 4) !== 0 && (o |= l & 16), r = n.entangledLanes, r !== 0) for (n = n.entanglements, r &= o; 0 < r; ) l = 31 - Jr(r), c = 1 << l, o |= n[l], r &= ~c;
    return o;
  }
  function Yy(n, r) {
    switch (n) {
      case 1:
      case 2:
      case 4:
        return r + 250;
      case 8:
      case 16:
      case 32:
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return r + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return -1;
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function Gf(n, r) {
    for (var l = n.suspendedLanes, o = n.pingedLanes, c = n.expirationTimes, p = n.pendingLanes; 0 < p; ) {
      var S = 31 - Jr(p), T = 1 << S, O = c[S];
      O === -1 ? ((T & l) === 0 || (T & o) !== 0) && (c[S] = Yy(T, r)) : O <= r && (n.expiredLanes |= T), p &= ~T;
    }
  }
  function Kf(n) {
    return n = n.pendingLanes & -1073741825, n !== 0 ? n : n & 1073741824 ? 1073741824 : 0;
  }
  function Ps() {
    var n = mu;
    return mu <<= 1, (mu & 4194240) === 0 && (mu = 64), n;
  }
  function Xf(n) {
    for (var r = [], l = 0; 31 > l; l++) r.push(n);
    return r;
  }
  function El(n, r, l) {
    n.pendingLanes |= r, r !== 536870912 && (n.suspendedLanes = 0, n.pingedLanes = 0), n = n.eventTimes, r = 31 - Jr(r), n[r] = l;
  }
  function Qy(n, r) {
    var l = n.pendingLanes & ~r;
    n.pendingLanes = r, n.suspendedLanes = 0, n.pingedLanes = 0, n.expiredLanes &= r, n.mutableReadLanes &= r, n.entangledLanes &= r, r = n.entanglements;
    var o = n.eventTimes;
    for (n = n.expirationTimes; 0 < l; ) {
      var c = 31 - Jr(l), p = 1 << c;
      r[c] = 0, o[c] = -1, n[c] = -1, l &= ~p;
    }
  }
  function js(n, r) {
    var l = n.entangledLanes |= r;
    for (n = n.entanglements; l; ) {
      var o = 31 - Jr(l), c = 1 << o;
      c & r | n[o] & r && (n[o] |= r), l &= ~c;
    }
  }
  var Nt = 0;
  function qf(n) {
    return n &= -n, 1 < n ? 4 < n ? (n & 268435455) !== 0 ? 16 : 536870912 : 4 : 1;
  }
  var zt, Zf, Jf, at, ed, nr = !1, zi = [], ea = null, Ai = null, nn = null, Yt = /* @__PURE__ */ new Map(), yo = /* @__PURE__ */ new Map(), Fn = [], ta = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function ai(n, r) {
    switch (n) {
      case "focusin":
      case "focusout":
        ea = null;
        break;
      case "dragenter":
      case "dragleave":
        Ai = null;
        break;
      case "mouseover":
      case "mouseout":
        nn = null;
        break;
      case "pointerover":
      case "pointerout":
        Yt.delete(r.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        yo.delete(r.pointerId);
    }
  }
  function go(n, r, l, o, c, p) {
    return n === null || n.nativeEvent !== p ? (n = { blockedOn: r, domEventName: l, eventSystemFlags: o, nativeEvent: p, targetContainers: [c] }, r !== null && (r = je(r), r !== null && Zf(r)), n) : (n.eventSystemFlags |= o, r = n.targetContainers, c !== null && r.indexOf(c) === -1 && r.push(c), n);
  }
  function td(n, r, l, o, c) {
    switch (r) {
      case "focusin":
        return ea = go(ea, n, r, l, o, c), !0;
      case "dragenter":
        return Ai = go(Ai, n, r, l, o, c), !0;
      case "mouseover":
        return nn = go(nn, n, r, l, o, c), !0;
      case "pointerover":
        var p = c.pointerId;
        return Yt.set(p, go(Yt.get(p) || null, n, r, l, o, c)), !0;
      case "gotpointercapture":
        return p = c.pointerId, yo.set(p, go(yo.get(p) || null, n, r, l, o, c)), !0;
    }
    return !1;
  }
  function nd(n) {
    var r = Ml(n.target);
    if (r !== null) {
      var l = Ca(r);
      if (l !== null) {
        if (r = l.tag, r === 13) {
          if (r = qn(l), r !== null) {
            n.blockedOn = r, ed(n.priority, function() {
              Jf(l);
            });
            return;
          }
        } else if (r === 3 && l.stateNode.current.memoizedState.isDehydrated) {
          n.blockedOn = l.tag === 3 ? l.stateNode.containerInfo : null;
          return;
        }
      }
    }
    n.blockedOn = null;
  }
  function So(n) {
    if (n.blockedOn !== null) return !1;
    for (var r = n.targetContainers; 0 < r.length; ) {
      var l = Is(n.domEventName, n.eventSystemFlags, r[0], n.nativeEvent);
      if (l === null) {
        l = n.nativeEvent;
        var o = new l.constructor(l.type, l);
        en = o, l.target.dispatchEvent(o), en = null;
      } else return r = je(l), r !== null && Zf(r), n.blockedOn = l, !1;
      r.shift();
    }
    return !0;
  }
  function wv(n, r, l) {
    So(n) && l.delete(r);
  }
  function Wy() {
    nr = !1, ea !== null && So(ea) && (ea = null), Ai !== null && So(Ai) && (Ai = null), nn !== null && So(nn) && (nn = null), Yt.forEach(wv), yo.forEach(wv);
  }
  function Eo(n, r) {
    n.blockedOn === r && (n.blockedOn = null, nr || (nr = !0, g.unstable_scheduleCallback(g.unstable_NormalPriority, Wy)));
  }
  function Ui(n) {
    function r(c) {
      return Eo(c, n);
    }
    if (0 < zi.length) {
      Eo(zi[0], n);
      for (var l = 1; l < zi.length; l++) {
        var o = zi[l];
        o.blockedOn === n && (o.blockedOn = null);
      }
    }
    for (ea !== null && Eo(ea, n), Ai !== null && Eo(Ai, n), nn !== null && Eo(nn, n), Yt.forEach(r), yo.forEach(r), l = 0; l < Fn.length; l++) o = Fn[l], o.blockedOn === n && (o.blockedOn = null);
    for (; 0 < Fn.length && (l = Fn[0], l.blockedOn === null); ) nd(l), l.blockedOn === null && Fn.shift();
  }
  var Cl = pe.ReactCurrentBatchConfig, Rl = !0;
  function Tv(n, r, l, o) {
    var c = Nt, p = Cl.transition;
    Cl.transition = null;
    try {
      Nt = 1, Bs(n, r, l, o);
    } finally {
      Nt = c, Cl.transition = p;
    }
  }
  function bv(n, r, l, o) {
    var c = Nt, p = Cl.transition;
    Cl.transition = null;
    try {
      Nt = 4, Bs(n, r, l, o);
    } finally {
      Nt = c, Cl.transition = p;
    }
  }
  function Bs(n, r, l, o) {
    if (Rl) {
      var c = Is(n, r, l, o);
      if (c === null) uc(n, r, o, Co, l), ai(n, o);
      else if (td(c, n, r, l, o)) o.stopPropagation();
      else if (ai(n, o), r & 4 && -1 < ta.indexOf(n)) {
        for (; c !== null; ) {
          var p = je(c);
          if (p !== null && zt(p), p = Is(n, r, l, o), p === null && uc(n, r, o, Co, l), p === c) break;
          c = p;
        }
        c !== null && o.stopPropagation();
      } else uc(n, r, o, null, l);
    }
  }
  var Co = null;
  function Is(n, r, l, o) {
    if (Co = null, n = $t(o), n = Ml(n), n !== null) if (r = Ca(n), r === null) n = null;
    else if (l = r.tag, l === 13) {
      if (n = qn(r), n !== null) return n;
      n = null;
    } else if (l === 3) {
      if (r.stateNode.current.memoizedState.isDehydrated) return r.tag === 3 ? r.stateNode.containerInfo : null;
      n = null;
    } else r !== n && (n = null);
    return Co = n, null;
  }
  function $s(n) {
    switch (n) {
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 1;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "toggle":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 4;
      case "message":
        switch (ft()) {
          case yl:
            return 1;
          case Yf:
            return 4;
          case ho:
          case Rv:
            return 16;
          case Qf:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var ii = null, Ys = null, yu = null;
  function rd() {
    if (yu) return yu;
    var n, r = Ys, l = r.length, o, c = "value" in ii ? ii.value : ii.textContent, p = c.length;
    for (n = 0; n < l && r[n] === c[n]; n++) ;
    var S = l - n;
    for (o = 1; o <= S && r[l - o] === c[p - o]; o++) ;
    return yu = c.slice(n, 1 < o ? 1 - o : void 0);
  }
  function Qs(n) {
    var r = n.keyCode;
    return "charCode" in n ? (n = n.charCode, n === 0 && r === 13 && (n = 13)) : n = r, n === 10 && (n = 13), 32 <= n || n === 13 ? n : 0;
  }
  function Ws() {
    return !0;
  }
  function Gs() {
    return !1;
  }
  function Er(n) {
    function r(l, o, c, p, S) {
      this._reactName = l, this._targetInst = c, this.type = o, this.nativeEvent = p, this.target = S, this.currentTarget = null;
      for (var T in n) n.hasOwnProperty(T) && (l = n[T], this[T] = l ? l(p) : p[T]);
      return this.isDefaultPrevented = (p.defaultPrevented != null ? p.defaultPrevented : p.returnValue === !1) ? Ws : Gs, this.isPropagationStopped = Gs, this;
    }
    return G(r.prototype, { preventDefault: function() {
      this.defaultPrevented = !0;
      var l = this.nativeEvent;
      l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = !1), this.isDefaultPrevented = Ws);
    }, stopPropagation: function() {
      var l = this.nativeEvent;
      l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0), this.isPropagationStopped = Ws);
    }, persist: function() {
    }, isPersistent: Ws }), r;
  }
  var xl = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(n) {
    return n.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, Ks = Er(xl), gu = G({}, xl, { view: 0, detail: 0 }), Gy = Er(gu), ad, Hn, wl, Ro = G({}, gu, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: sd, button: 0, buttons: 0, relatedTarget: function(n) {
    return n.relatedTarget === void 0 ? n.fromElement === n.srcElement ? n.toElement : n.fromElement : n.relatedTarget;
  }, movementX: function(n) {
    return "movementX" in n ? n.movementX : (n !== wl && (wl && n.type === "mousemove" ? (ad = n.screenX - wl.screenX, Hn = n.screenY - wl.screenY) : Hn = ad = 0, wl = n), ad);
  }, movementY: function(n) {
    return "movementY" in n ? n.movementY : Hn;
  } }), id = Er(Ro), Ky = G({}, Ro, { dataTransfer: 0 }), Su = Er(Ky), ld = G({}, gu, { relatedTarget: 0 }), Xs = Er(ld), Xy = G({}, xl, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), qy = Er(Xy), Zy = G({}, xl, { clipboardData: function(n) {
    return "clipboardData" in n ? n.clipboardData : window.clipboardData;
  } }), Dv = Er(Zy), ud = G({}, xl, { data: 0 }), od = Er(ud), kv = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, Ov = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, Jy = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function li(n) {
    var r = this.nativeEvent;
    return r.getModifierState ? r.getModifierState(n) : (n = Jy[n]) ? !!r[n] : !1;
  }
  function sd() {
    return li;
  }
  var cd = G({}, gu, { key: function(n) {
    if (n.key) {
      var r = kv[n.key] || n.key;
      if (r !== "Unidentified") return r;
    }
    return n.type === "keypress" ? (n = Qs(n), n === 13 ? "Enter" : String.fromCharCode(n)) : n.type === "keydown" || n.type === "keyup" ? Ov[n.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: sd, charCode: function(n) {
    return n.type === "keypress" ? Qs(n) : 0;
  }, keyCode: function(n) {
    return n.type === "keydown" || n.type === "keyup" ? n.keyCode : 0;
  }, which: function(n) {
    return n.type === "keypress" ? Qs(n) : n.type === "keydown" || n.type === "keyup" ? n.keyCode : 0;
  } }), fd = Er(cd), dd = G({}, Ro, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Mv = Er(dd), qs = G({}, gu, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: sd }), Lv = Er(qs), Cr = G({}, xl, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), ui = Er(Cr), hn = G({}, Ro, {
    deltaX: function(n) {
      return "deltaX" in n ? n.deltaX : "wheelDeltaX" in n ? -n.wheelDeltaX : 0;
    },
    deltaY: function(n) {
      return "deltaY" in n ? n.deltaY : "wheelDeltaY" in n ? -n.wheelDeltaY : "wheelDelta" in n ? -n.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), oi = Er(hn), pd = [9, 13, 27, 32], Eu = b && "CompositionEvent" in window, xo = null;
  b && "documentMode" in document && (xo = document.documentMode);
  var wo = b && "TextEvent" in window && !xo, _v = b && (!Eu || xo && 8 < xo && 11 >= xo), Nv = " ", Zs = !1;
  function zv(n, r) {
    switch (n) {
      case "keyup":
        return pd.indexOf(r.keyCode) !== -1;
      case "keydown":
        return r.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Av(n) {
    return n = n.detail, typeof n == "object" && "data" in n ? n.data : null;
  }
  var Cu = !1;
  function Uv(n, r) {
    switch (n) {
      case "compositionend":
        return Av(r);
      case "keypress":
        return r.which !== 32 ? null : (Zs = !0, Nv);
      case "textInput":
        return n = r.data, n === Nv && Zs ? null : n;
      default:
        return null;
    }
  }
  function eg(n, r) {
    if (Cu) return n === "compositionend" || !Eu && zv(n, r) ? (n = rd(), yu = Ys = ii = null, Cu = !1, n) : null;
    switch (n) {
      case "paste":
        return null;
      case "keypress":
        if (!(r.ctrlKey || r.altKey || r.metaKey) || r.ctrlKey && r.altKey) {
          if (r.char && 1 < r.char.length) return r.char;
          if (r.which) return String.fromCharCode(r.which);
        }
        return null;
      case "compositionend":
        return _v && r.locale !== "ko" ? null : r.data;
      default:
        return null;
    }
  }
  var tg = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
  function Fv(n) {
    var r = n && n.nodeName && n.nodeName.toLowerCase();
    return r === "input" ? !!tg[n.type] : r === "textarea";
  }
  function vd(n, r, l, o) {
    hv(o), r = Mo(r, "onChange"), 0 < r.length && (l = new Ks("onChange", "change", null, l, o), n.push({ event: l, listeners: r }));
  }
  var Fa = null, Tl = null;
  function Hv(n) {
    kl(n, 0);
  }
  function To(n) {
    var r = Ta(n);
    if (et(r)) return n;
  }
  function ng(n, r) {
    if (n === "change") return r;
  }
  var Vv = !1;
  if (b) {
    var hd;
    if (b) {
      var md = "oninput" in document;
      if (!md) {
        var Pv = document.createElement("div");
        Pv.setAttribute("oninput", "return;"), md = typeof Pv.oninput == "function";
      }
      hd = md;
    } else hd = !1;
    Vv = hd && (!document.documentMode || 9 < document.documentMode);
  }
  function jv() {
    Fa && (Fa.detachEvent("onpropertychange", Bv), Tl = Fa = null);
  }
  function Bv(n) {
    if (n.propertyName === "value" && To(Tl)) {
      var r = [];
      vd(r, Tl, n, $t(n)), If(Hv, r);
    }
  }
  function rg(n, r, l) {
    n === "focusin" ? (jv(), Fa = r, Tl = l, Fa.attachEvent("onpropertychange", Bv)) : n === "focusout" && jv();
  }
  function Iv(n) {
    if (n === "selectionchange" || n === "keyup" || n === "keydown") return To(Tl);
  }
  function ag(n, r) {
    if (n === "click") return To(r);
  }
  function $v(n, r) {
    if (n === "input" || n === "change") return To(r);
  }
  function ig(n, r) {
    return n === r && (n !== 0 || 1 / n === 1 / r) || n !== n && r !== r;
  }
  var wa = typeof Object.is == "function" ? Object.is : ig;
  function bo(n, r) {
    if (wa(n, r)) return !0;
    if (typeof n != "object" || n === null || typeof r != "object" || r === null) return !1;
    var l = Object.keys(n), o = Object.keys(r);
    if (l.length !== o.length) return !1;
    for (o = 0; o < l.length; o++) {
      var c = l[o];
      if (!L.call(r, c) || !wa(n[c], r[c])) return !1;
    }
    return !0;
  }
  function Yv(n) {
    for (; n && n.firstChild; ) n = n.firstChild;
    return n;
  }
  function Js(n, r) {
    var l = Yv(n);
    n = 0;
    for (var o; l; ) {
      if (l.nodeType === 3) {
        if (o = n + l.textContent.length, n <= r && o >= r) return { node: l, offset: r - n };
        n = o;
      }
      e: {
        for (; l; ) {
          if (l.nextSibling) {
            l = l.nextSibling;
            break e;
          }
          l = l.parentNode;
        }
        l = void 0;
      }
      l = Yv(l);
    }
  }
  function Fi(n, r) {
    return n && r ? n === r ? !0 : n && n.nodeType === 3 ? !1 : r && r.nodeType === 3 ? Fi(n, r.parentNode) : "contains" in n ? n.contains(r) : n.compareDocumentPosition ? !!(n.compareDocumentPosition(r) & 16) : !1 : !1;
  }
  function Do() {
    for (var n = window, r = st(); r instanceof n.HTMLIFrameElement; ) {
      try {
        var l = typeof r.contentWindow.location.href == "string";
      } catch {
        l = !1;
      }
      if (l) n = r.contentWindow;
      else break;
      r = st(n.document);
    }
    return r;
  }
  function ec(n) {
    var r = n && n.nodeName && n.nodeName.toLowerCase();
    return r && (r === "input" && (n.type === "text" || n.type === "search" || n.type === "tel" || n.type === "url" || n.type === "password") || r === "textarea" || n.contentEditable === "true");
  }
  function Ru(n) {
    var r = Do(), l = n.focusedElem, o = n.selectionRange;
    if (r !== l && l && l.ownerDocument && Fi(l.ownerDocument.documentElement, l)) {
      if (o !== null && ec(l)) {
        if (r = o.start, n = o.end, n === void 0 && (n = r), "selectionStart" in l) l.selectionStart = r, l.selectionEnd = Math.min(n, l.value.length);
        else if (n = (r = l.ownerDocument || document) && r.defaultView || window, n.getSelection) {
          n = n.getSelection();
          var c = l.textContent.length, p = Math.min(o.start, c);
          o = o.end === void 0 ? p : Math.min(o.end, c), !n.extend && p > o && (c = o, o = p, p = c), c = Js(l, p);
          var S = Js(
            l,
            o
          );
          c && S && (n.rangeCount !== 1 || n.anchorNode !== c.node || n.anchorOffset !== c.offset || n.focusNode !== S.node || n.focusOffset !== S.offset) && (r = r.createRange(), r.setStart(c.node, c.offset), n.removeAllRanges(), p > o ? (n.addRange(r), n.extend(S.node, S.offset)) : (r.setEnd(S.node, S.offset), n.addRange(r)));
        }
      }
      for (r = [], n = l; n = n.parentNode; ) n.nodeType === 1 && r.push({ element: n, left: n.scrollLeft, top: n.scrollTop });
      for (typeof l.focus == "function" && l.focus(), l = 0; l < r.length; l++) n = r[l], n.element.scrollLeft = n.left, n.element.scrollTop = n.top;
    }
  }
  var lg = b && "documentMode" in document && 11 >= document.documentMode, xu = null, yd = null, ko = null, gd = !1;
  function Sd(n, r, l) {
    var o = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    gd || xu == null || xu !== st(o) || (o = xu, "selectionStart" in o && ec(o) ? o = { start: o.selectionStart, end: o.selectionEnd } : (o = (o.ownerDocument && o.ownerDocument.defaultView || window).getSelection(), o = { anchorNode: o.anchorNode, anchorOffset: o.anchorOffset, focusNode: o.focusNode, focusOffset: o.focusOffset }), ko && bo(ko, o) || (ko = o, o = Mo(yd, "onSelect"), 0 < o.length && (r = new Ks("onSelect", "select", null, r, l), n.push({ event: r, listeners: o }), r.target = xu)));
  }
  function tc(n, r) {
    var l = {};
    return l[n.toLowerCase()] = r.toLowerCase(), l["Webkit" + n] = "webkit" + r, l["Moz" + n] = "moz" + r, l;
  }
  var bl = { animationend: tc("Animation", "AnimationEnd"), animationiteration: tc("Animation", "AnimationIteration"), animationstart: tc("Animation", "AnimationStart"), transitionend: tc("Transition", "TransitionEnd") }, Vn = {}, Ed = {};
  b && (Ed = document.createElement("div").style, "AnimationEvent" in window || (delete bl.animationend.animation, delete bl.animationiteration.animation, delete bl.animationstart.animation), "TransitionEvent" in window || delete bl.transitionend.transition);
  function nc(n) {
    if (Vn[n]) return Vn[n];
    if (!bl[n]) return n;
    var r = bl[n], l;
    for (l in r) if (r.hasOwnProperty(l) && l in Ed) return Vn[n] = r[l];
    return n;
  }
  var Qv = nc("animationend"), Wv = nc("animationiteration"), Gv = nc("animationstart"), Kv = nc("transitionend"), Cd = /* @__PURE__ */ new Map(), rc = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function na(n, r) {
    Cd.set(n, r), w(r, [n]);
  }
  for (var Rd = 0; Rd < rc.length; Rd++) {
    var Dl = rc[Rd], ug = Dl.toLowerCase(), og = Dl[0].toUpperCase() + Dl.slice(1);
    na(ug, "on" + og);
  }
  na(Qv, "onAnimationEnd"), na(Wv, "onAnimationIteration"), na(Gv, "onAnimationStart"), na("dblclick", "onDoubleClick"), na("focusin", "onFocus"), na("focusout", "onBlur"), na(Kv, "onTransitionEnd"), h("onMouseEnter", ["mouseout", "mouseover"]), h("onMouseLeave", ["mouseout", "mouseover"]), h("onPointerEnter", ["pointerout", "pointerover"]), h("onPointerLeave", ["pointerout", "pointerover"]), w("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), w("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), w("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), w("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), w("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), w("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var Oo = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), xd = new Set("cancel close invalid load scroll toggle".split(" ").concat(Oo));
  function ac(n, r, l) {
    var o = n.type || "unknown-event";
    n.currentTarget = l, Vs(o, r, void 0, n), n.currentTarget = null;
  }
  function kl(n, r) {
    r = (r & 4) !== 0;
    for (var l = 0; l < n.length; l++) {
      var o = n[l], c = o.event;
      o = o.listeners;
      e: {
        var p = void 0;
        if (r) for (var S = o.length - 1; 0 <= S; S--) {
          var T = o[S], O = T.instance, Y = T.currentTarget;
          if (T = T.listener, O !== p && c.isPropagationStopped()) break e;
          ac(c, T, Y), p = O;
        }
        else for (S = 0; S < o.length; S++) {
          if (T = o[S], O = T.instance, Y = T.currentTarget, T = T.listener, O !== p && c.isPropagationStopped()) break e;
          ac(c, T, Y), p = O;
        }
      }
    }
    if (vu) throw n = vo, vu = !1, vo = null, n;
  }
  function kt(n, r) {
    var l = r[No];
    l === void 0 && (l = r[No] = /* @__PURE__ */ new Set());
    var o = n + "__bubble";
    l.has(o) || (Xv(r, n, 2, !1), l.add(o));
  }
  function ic(n, r, l) {
    var o = 0;
    r && (o |= 4), Xv(l, n, o, r);
  }
  var lc = "_reactListening" + Math.random().toString(36).slice(2);
  function wu(n) {
    if (!n[lc]) {
      n[lc] = !0, E.forEach(function(l) {
        l !== "selectionchange" && (xd.has(l) || ic(l, !1, n), ic(l, !0, n));
      });
      var r = n.nodeType === 9 ? n : n.ownerDocument;
      r === null || r[lc] || (r[lc] = !0, ic("selectionchange", !1, r));
    }
  }
  function Xv(n, r, l, o) {
    switch ($s(r)) {
      case 1:
        var c = Tv;
        break;
      case 4:
        c = bv;
        break;
      default:
        c = Bs;
    }
    l = c.bind(null, r, l, n), c = void 0, !Ni || r !== "touchstart" && r !== "touchmove" && r !== "wheel" || (c = !0), o ? c !== void 0 ? n.addEventListener(r, l, { capture: !0, passive: c }) : n.addEventListener(r, l, !0) : c !== void 0 ? n.addEventListener(r, l, { passive: c }) : n.addEventListener(r, l, !1);
  }
  function uc(n, r, l, o, c) {
    var p = o;
    if ((r & 1) === 0 && (r & 2) === 0 && o !== null) e: for (; ; ) {
      if (o === null) return;
      var S = o.tag;
      if (S === 3 || S === 4) {
        var T = o.stateNode.containerInfo;
        if (T === c || T.nodeType === 8 && T.parentNode === c) break;
        if (S === 4) for (S = o.return; S !== null; ) {
          var O = S.tag;
          if ((O === 3 || O === 4) && (O = S.stateNode.containerInfo, O === c || O.nodeType === 8 && O.parentNode === c)) return;
          S = S.return;
        }
        for (; T !== null; ) {
          if (S = Ml(T), S === null) return;
          if (O = S.tag, O === 5 || O === 6) {
            o = p = S;
            continue e;
          }
          T = T.parentNode;
        }
      }
      o = o.return;
    }
    If(function() {
      var Y = p, le = $t(l), se = [];
      e: {
        var ie = Cd.get(n);
        if (ie !== void 0) {
          var we = Ks, Le = n;
          switch (n) {
            case "keypress":
              if (Qs(l) === 0) break e;
            case "keydown":
            case "keyup":
              we = fd;
              break;
            case "focusin":
              Le = "focus", we = Xs;
              break;
            case "focusout":
              Le = "blur", we = Xs;
              break;
            case "beforeblur":
            case "afterblur":
              we = Xs;
              break;
            case "click":
              if (l.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              we = id;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              we = Su;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              we = Lv;
              break;
            case Qv:
            case Wv:
            case Gv:
              we = qy;
              break;
            case Kv:
              we = ui;
              break;
            case "scroll":
              we = Gy;
              break;
            case "wheel":
              we = oi;
              break;
            case "copy":
            case "cut":
            case "paste":
              we = Dv;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              we = Mv;
          }
          var ze = (r & 4) !== 0, dn = !ze && n === "scroll", V = ze ? ie !== null ? ie + "Capture" : null : ie;
          ze = [];
          for (var N = Y, B; N !== null; ) {
            B = N;
            var ue = B.stateNode;
            if (B.tag === 5 && ue !== null && (B = ue, V !== null && (ue = hl(N, V), ue != null && ze.push(Tu(N, ue, B)))), dn) break;
            N = N.return;
          }
          0 < ze.length && (ie = new we(ie, Le, null, l, le), se.push({ event: ie, listeners: ze }));
        }
      }
      if ((r & 7) === 0) {
        e: {
          if (ie = n === "mouseover" || n === "pointerover", we = n === "mouseout" || n === "pointerout", ie && l !== en && (Le = l.relatedTarget || l.fromElement) && (Ml(Le) || Le[si])) break e;
          if ((we || ie) && (ie = le.window === le ? le : (ie = le.ownerDocument) ? ie.defaultView || ie.parentWindow : window, we ? (Le = l.relatedTarget || l.toElement, we = Y, Le = Le ? Ml(Le) : null, Le !== null && (dn = Ca(Le), Le !== dn || Le.tag !== 5 && Le.tag !== 6) && (Le = null)) : (we = null, Le = Y), we !== Le)) {
            if (ze = id, ue = "onMouseLeave", V = "onMouseEnter", N = "mouse", (n === "pointerout" || n === "pointerover") && (ze = Mv, ue = "onPointerLeave", V = "onPointerEnter", N = "pointer"), dn = we == null ? ie : Ta(we), B = Le == null ? ie : Ta(Le), ie = new ze(ue, N + "leave", we, l, le), ie.target = dn, ie.relatedTarget = B, ue = null, Ml(le) === Y && (ze = new ze(V, N + "enter", Le, l, le), ze.target = B, ze.relatedTarget = dn, ue = ze), dn = ue, we && Le) t: {
              for (ze = we, V = Le, N = 0, B = ze; B; B = Hi(B)) N++;
              for (B = 0, ue = V; ue; ue = Hi(ue)) B++;
              for (; 0 < N - B; ) ze = Hi(ze), N--;
              for (; 0 < B - N; ) V = Hi(V), B--;
              for (; N--; ) {
                if (ze === V || V !== null && ze === V.alternate) break t;
                ze = Hi(ze), V = Hi(V);
              }
              ze = null;
            }
            else ze = null;
            we !== null && qv(se, ie, we, ze, !1), Le !== null && dn !== null && qv(se, dn, Le, ze, !0);
          }
        }
        e: {
          if (ie = Y ? Ta(Y) : window, we = ie.nodeName && ie.nodeName.toLowerCase(), we === "select" || we === "input" && ie.type === "file") var _e = ng;
          else if (Fv(ie)) if (Vv) _e = $v;
          else {
            _e = Iv;
            var Qe = rg;
          }
          else (we = ie.nodeName) && we.toLowerCase() === "input" && (ie.type === "checkbox" || ie.type === "radio") && (_e = ag);
          if (_e && (_e = _e(n, Y))) {
            vd(se, _e, l, le);
            break e;
          }
          Qe && Qe(n, ie, Y), n === "focusout" && (Qe = ie._wrapperState) && Qe.controlled && ie.type === "number" && Xe(ie, "number", ie.value);
        }
        switch (Qe = Y ? Ta(Y) : window, n) {
          case "focusin":
            (Fv(Qe) || Qe.contentEditable === "true") && (xu = Qe, yd = Y, ko = null);
            break;
          case "focusout":
            ko = yd = xu = null;
            break;
          case "mousedown":
            gd = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            gd = !1, Sd(se, l, le);
            break;
          case "selectionchange":
            if (lg) break;
          case "keydown":
          case "keyup":
            Sd(se, l, le);
        }
        var Ge;
        if (Eu) e: {
          switch (n) {
            case "compositionstart":
              var Je = "onCompositionStart";
              break e;
            case "compositionend":
              Je = "onCompositionEnd";
              break e;
            case "compositionupdate":
              Je = "onCompositionUpdate";
              break e;
          }
          Je = void 0;
        }
        else Cu ? zv(n, l) && (Je = "onCompositionEnd") : n === "keydown" && l.keyCode === 229 && (Je = "onCompositionStart");
        Je && (_v && l.locale !== "ko" && (Cu || Je !== "onCompositionStart" ? Je === "onCompositionEnd" && Cu && (Ge = rd()) : (ii = le, Ys = "value" in ii ? ii.value : ii.textContent, Cu = !0)), Qe = Mo(Y, Je), 0 < Qe.length && (Je = new od(Je, n, null, l, le), se.push({ event: Je, listeners: Qe }), Ge ? Je.data = Ge : (Ge = Av(l), Ge !== null && (Je.data = Ge)))), (Ge = wo ? Uv(n, l) : eg(n, l)) && (Y = Mo(Y, "onBeforeInput"), 0 < Y.length && (le = new od("onBeforeInput", "beforeinput", null, l, le), se.push({ event: le, listeners: Y }), le.data = Ge));
      }
      kl(se, r);
    });
  }
  function Tu(n, r, l) {
    return { instance: n, listener: r, currentTarget: l };
  }
  function Mo(n, r) {
    for (var l = r + "Capture", o = []; n !== null; ) {
      var c = n, p = c.stateNode;
      c.tag === 5 && p !== null && (c = p, p = hl(n, l), p != null && o.unshift(Tu(n, p, c)), p = hl(n, r), p != null && o.push(Tu(n, p, c))), n = n.return;
    }
    return o;
  }
  function Hi(n) {
    if (n === null) return null;
    do
      n = n.return;
    while (n && n.tag !== 5);
    return n || null;
  }
  function qv(n, r, l, o, c) {
    for (var p = r._reactName, S = []; l !== null && l !== o; ) {
      var T = l, O = T.alternate, Y = T.stateNode;
      if (O !== null && O === o) break;
      T.tag === 5 && Y !== null && (T = Y, c ? (O = hl(l, p), O != null && S.unshift(Tu(l, O, T))) : c || (O = hl(l, p), O != null && S.push(Tu(l, O, T)))), l = l.return;
    }
    S.length !== 0 && n.push({ event: r, listeners: S });
  }
  var Zv = /\r\n?/g, sg = /\u0000|\uFFFD/g;
  function Jv(n) {
    return (typeof n == "string" ? n : "" + n).replace(Zv, `
`).replace(sg, "");
  }
  function oc(n, r, l) {
    if (r = Jv(r), Jv(n) !== r && l) throw Error(m(425));
  }
  function Vi() {
  }
  var Lo = null, Ol = null;
  function sc(n, r) {
    return n === "textarea" || n === "noscript" || typeof r.children == "string" || typeof r.children == "number" || typeof r.dangerouslySetInnerHTML == "object" && r.dangerouslySetInnerHTML !== null && r.dangerouslySetInnerHTML.__html != null;
  }
  var cc = typeof setTimeout == "function" ? setTimeout : void 0, wd = typeof clearTimeout == "function" ? clearTimeout : void 0, eh = typeof Promise == "function" ? Promise : void 0, bu = typeof queueMicrotask == "function" ? queueMicrotask : typeof eh < "u" ? function(n) {
    return eh.resolve(null).then(n).catch(fc);
  } : cc;
  function fc(n) {
    setTimeout(function() {
      throw n;
    });
  }
  function Du(n, r) {
    var l = r, o = 0;
    do {
      var c = l.nextSibling;
      if (n.removeChild(l), c && c.nodeType === 8) if (l = c.data, l === "/$") {
        if (o === 0) {
          n.removeChild(c), Ui(r);
          return;
        }
        o--;
      } else l !== "$" && l !== "$?" && l !== "$!" || o++;
      l = c;
    } while (l);
    Ui(r);
  }
  function Ha(n) {
    for (; n != null; n = n.nextSibling) {
      var r = n.nodeType;
      if (r === 1 || r === 3) break;
      if (r === 8) {
        if (r = n.data, r === "$" || r === "$!" || r === "$?") break;
        if (r === "/$") return null;
      }
    }
    return n;
  }
  function th(n) {
    n = n.previousSibling;
    for (var r = 0; n; ) {
      if (n.nodeType === 8) {
        var l = n.data;
        if (l === "$" || l === "$!" || l === "$?") {
          if (r === 0) return n;
          r--;
        } else l === "/$" && r++;
      }
      n = n.previousSibling;
    }
    return null;
  }
  var Pi = Math.random().toString(36).slice(2), Va = "__reactFiber$" + Pi, _o = "__reactProps$" + Pi, si = "__reactContainer$" + Pi, No = "__reactEvents$" + Pi, ku = "__reactListeners$" + Pi, cg = "__reactHandles$" + Pi;
  function Ml(n) {
    var r = n[Va];
    if (r) return r;
    for (var l = n.parentNode; l; ) {
      if (r = l[si] || l[Va]) {
        if (l = r.alternate, r.child !== null || l !== null && l.child !== null) for (n = th(n); n !== null; ) {
          if (l = n[Va]) return l;
          n = th(n);
        }
        return r;
      }
      n = l, l = n.parentNode;
    }
    return null;
  }
  function je(n) {
    return n = n[Va] || n[si], !n || n.tag !== 5 && n.tag !== 6 && n.tag !== 13 && n.tag !== 3 ? null : n;
  }
  function Ta(n) {
    if (n.tag === 5 || n.tag === 6) return n.stateNode;
    throw Error(m(33));
  }
  function un(n) {
    return n[_o] || null;
  }
  var vt = [], ra = -1;
  function ba(n) {
    return { current: n };
  }
  function jt(n) {
    0 > ra || (n.current = vt[ra], vt[ra] = null, ra--);
  }
  function Pe(n, r) {
    ra++, vt[ra] = n.current, n.current = r;
  }
  var Rr = {}, rn = ba(Rr), bn = ba(!1), xr = Rr;
  function aa(n, r) {
    var l = n.type.contextTypes;
    if (!l) return Rr;
    var o = n.stateNode;
    if (o && o.__reactInternalMemoizedUnmaskedChildContext === r) return o.__reactInternalMemoizedMaskedChildContext;
    var c = {}, p;
    for (p in l) c[p] = r[p];
    return o && (n = n.stateNode, n.__reactInternalMemoizedUnmaskedChildContext = r, n.__reactInternalMemoizedMaskedChildContext = c), c;
  }
  function mn(n) {
    return n = n.childContextTypes, n != null;
  }
  function Ou() {
    jt(bn), jt(rn);
  }
  function nh(n, r, l) {
    if (rn.current !== Rr) throw Error(m(168));
    Pe(rn, r), Pe(bn, l);
  }
  function zo(n, r, l) {
    var o = n.stateNode;
    if (r = r.childContextTypes, typeof o.getChildContext != "function") return l;
    o = o.getChildContext();
    for (var c in o) if (!(c in r)) throw Error(m(108, bt(n) || "Unknown", c));
    return G({}, l, o);
  }
  function wr(n) {
    return n = (n = n.stateNode) && n.__reactInternalMemoizedMergedChildContext || Rr, xr = rn.current, Pe(rn, n), Pe(bn, bn.current), !0;
  }
  function dc(n, r, l) {
    var o = n.stateNode;
    if (!o) throw Error(m(169));
    l ? (n = zo(n, r, xr), o.__reactInternalMemoizedMergedChildContext = n, jt(bn), jt(rn), Pe(rn, n)) : jt(bn), Pe(bn, l);
  }
  var Pa = null, Mu = !1, ci = !1;
  function pc(n) {
    Pa === null ? Pa = [n] : Pa.push(n);
  }
  function ji(n) {
    Mu = !0, pc(n);
  }
  function ja() {
    if (!ci && Pa !== null) {
      ci = !0;
      var n = 0, r = Nt;
      try {
        var l = Pa;
        for (Nt = 1; n < l.length; n++) {
          var o = l[n];
          do
            o = o(!0);
          while (o !== null);
        }
        Pa = null, Mu = !1;
      } catch (c) {
        throw Pa !== null && (Pa = Pa.slice(n + 1)), Sv(yl, ja), c;
      } finally {
        Nt = r, ci = !1;
      }
    }
    return null;
  }
  var Bi = [], Ii = 0, $i = null, fi = 0, yn = [], ia = 0, Vr = null, Ba = 1, Ia = "";
  function Ll(n, r) {
    Bi[Ii++] = fi, Bi[Ii++] = $i, $i = n, fi = r;
  }
  function rh(n, r, l) {
    yn[ia++] = Ba, yn[ia++] = Ia, yn[ia++] = Vr, Vr = n;
    var o = Ba;
    n = Ia;
    var c = 32 - Jr(o) - 1;
    o &= ~(1 << c), l += 1;
    var p = 32 - Jr(r) + c;
    if (30 < p) {
      var S = c - c % 5;
      p = (o & (1 << S) - 1).toString(32), o >>= S, c -= S, Ba = 1 << 32 - Jr(r) + c | l << c | o, Ia = p + n;
    } else Ba = 1 << p | l << c | o, Ia = n;
  }
  function vc(n) {
    n.return !== null && (Ll(n, 1), rh(n, 1, 0));
  }
  function hc(n) {
    for (; n === $i; ) $i = Bi[--Ii], Bi[Ii] = null, fi = Bi[--Ii], Bi[Ii] = null;
    for (; n === Vr; ) Vr = yn[--ia], yn[ia] = null, Ia = yn[--ia], yn[ia] = null, Ba = yn[--ia], yn[ia] = null;
  }
  var Tr = null, br = null, Gt = !1, la = null;
  function Td(n, r) {
    var l = fa(5, null, null, 0);
    l.elementType = "DELETED", l.stateNode = r, l.return = n, r = n.deletions, r === null ? (n.deletions = [l], n.flags |= 16) : r.push(l);
  }
  function ah(n, r) {
    switch (n.tag) {
      case 5:
        var l = n.type;
        return r = r.nodeType !== 1 || l.toLowerCase() !== r.nodeName.toLowerCase() ? null : r, r !== null ? (n.stateNode = r, Tr = n, br = Ha(r.firstChild), !0) : !1;
      case 6:
        return r = n.pendingProps === "" || r.nodeType !== 3 ? null : r, r !== null ? (n.stateNode = r, Tr = n, br = null, !0) : !1;
      case 13:
        return r = r.nodeType !== 8 ? null : r, r !== null ? (l = Vr !== null ? { id: Ba, overflow: Ia } : null, n.memoizedState = { dehydrated: r, treeContext: l, retryLane: 1073741824 }, l = fa(18, null, null, 0), l.stateNode = r, l.return = n, n.child = l, Tr = n, br = null, !0) : !1;
      default:
        return !1;
    }
  }
  function bd(n) {
    return (n.mode & 1) !== 0 && (n.flags & 128) === 0;
  }
  function Dd(n) {
    if (Gt) {
      var r = br;
      if (r) {
        var l = r;
        if (!ah(n, r)) {
          if (bd(n)) throw Error(m(418));
          r = Ha(l.nextSibling);
          var o = Tr;
          r && ah(n, r) ? Td(o, l) : (n.flags = n.flags & -4097 | 2, Gt = !1, Tr = n);
        }
      } else {
        if (bd(n)) throw Error(m(418));
        n.flags = n.flags & -4097 | 2, Gt = !1, Tr = n;
      }
    }
  }
  function Dn(n) {
    for (n = n.return; n !== null && n.tag !== 5 && n.tag !== 3 && n.tag !== 13; ) n = n.return;
    Tr = n;
  }
  function mc(n) {
    if (n !== Tr) return !1;
    if (!Gt) return Dn(n), Gt = !0, !1;
    var r;
    if ((r = n.tag !== 3) && !(r = n.tag !== 5) && (r = n.type, r = r !== "head" && r !== "body" && !sc(n.type, n.memoizedProps)), r && (r = br)) {
      if (bd(n)) throw Ao(), Error(m(418));
      for (; r; ) Td(n, r), r = Ha(r.nextSibling);
    }
    if (Dn(n), n.tag === 13) {
      if (n = n.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(m(317));
      e: {
        for (n = n.nextSibling, r = 0; n; ) {
          if (n.nodeType === 8) {
            var l = n.data;
            if (l === "/$") {
              if (r === 0) {
                br = Ha(n.nextSibling);
                break e;
              }
              r--;
            } else l !== "$" && l !== "$!" && l !== "$?" || r++;
          }
          n = n.nextSibling;
        }
        br = null;
      }
    } else br = Tr ? Ha(n.stateNode.nextSibling) : null;
    return !0;
  }
  function Ao() {
    for (var n = br; n; ) n = Ha(n.nextSibling);
  }
  function Yi() {
    br = Tr = null, Gt = !1;
  }
  function di(n) {
    la === null ? la = [n] : la.push(n);
  }
  var fg = pe.ReactCurrentBatchConfig;
  function _l(n, r, l) {
    if (n = l.ref, n !== null && typeof n != "function" && typeof n != "object") {
      if (l._owner) {
        if (l = l._owner, l) {
          if (l.tag !== 1) throw Error(m(309));
          var o = l.stateNode;
        }
        if (!o) throw Error(m(147, n));
        var c = o, p = "" + n;
        return r !== null && r.ref !== null && typeof r.ref == "function" && r.ref._stringRef === p ? r.ref : (r = function(S) {
          var T = c.refs;
          S === null ? delete T[p] : T[p] = S;
        }, r._stringRef = p, r);
      }
      if (typeof n != "string") throw Error(m(284));
      if (!l._owner) throw Error(m(290, n));
    }
    return n;
  }
  function yc(n, r) {
    throw n = Object.prototype.toString.call(r), Error(m(31, n === "[object Object]" ? "object with keys {" + Object.keys(r).join(", ") + "}" : n));
  }
  function ih(n) {
    var r = n._init;
    return r(n._payload);
  }
  function Nl(n) {
    function r(V, N) {
      if (n) {
        var B = V.deletions;
        B === null ? (V.deletions = [N], V.flags |= 16) : B.push(N);
      }
    }
    function l(V, N) {
      if (!n) return null;
      for (; N !== null; ) r(V, N), N = N.sibling;
      return null;
    }
    function o(V, N) {
      for (V = /* @__PURE__ */ new Map(); N !== null; ) N.key !== null ? V.set(N.key, N) : V.set(N.index, N), N = N.sibling;
      return V;
    }
    function c(V, N) {
      return V = Ji(V, N), V.index = 0, V.sibling = null, V;
    }
    function p(V, N, B) {
      return V.index = B, n ? (B = V.alternate, B !== null ? (B = B.index, B < N ? (V.flags |= 2, N) : B) : (V.flags |= 2, N)) : (V.flags |= 1048576, N);
    }
    function S(V) {
      return n && V.alternate === null && (V.flags |= 2), V;
    }
    function T(V, N, B, ue) {
      return N === null || N.tag !== 6 ? (N = ap(B, V.mode, ue), N.return = V, N) : (N = c(N, B), N.return = V, N);
    }
    function O(V, N, B, ue) {
      var _e = B.type;
      return _e === ve ? le(V, N, B.props.children, ue, B.key) : N !== null && (N.elementType === _e || typeof _e == "object" && _e !== null && _e.$$typeof === oe && ih(_e) === N.type) ? (ue = c(N, B.props), ue.ref = _l(V, N, B), ue.return = V, ue) : (ue = fs(B.type, B.key, B.props, null, V.mode, ue), ue.ref = _l(V, N, B), ue.return = V, ue);
    }
    function Y(V, N, B, ue) {
      return N === null || N.tag !== 4 || N.stateNode.containerInfo !== B.containerInfo || N.stateNode.implementation !== B.implementation ? (N = Xc(B, V.mode, ue), N.return = V, N) : (N = c(N, B.children || []), N.return = V, N);
    }
    function le(V, N, B, ue, _e) {
      return N === null || N.tag !== 7 ? (N = gi(B, V.mode, ue, _e), N.return = V, N) : (N = c(N, B), N.return = V, N);
    }
    function se(V, N, B) {
      if (typeof N == "string" && N !== "" || typeof N == "number") return N = ap("" + N, V.mode, B), N.return = V, N;
      if (typeof N == "object" && N !== null) {
        switch (N.$$typeof) {
          case fe:
            return B = fs(N.type, N.key, N.props, null, V.mode, B), B.ref = _l(V, null, N), B.return = V, B;
          case ke:
            return N = Xc(N, V.mode, B), N.return = V, N;
          case oe:
            var ue = N._init;
            return se(V, ue(N._payload), B);
        }
        if (lt(N) || X(N)) return N = gi(N, V.mode, B, null), N.return = V, N;
        yc(V, N);
      }
      return null;
    }
    function ie(V, N, B, ue) {
      var _e = N !== null ? N.key : null;
      if (typeof B == "string" && B !== "" || typeof B == "number") return _e !== null ? null : T(V, N, "" + B, ue);
      if (typeof B == "object" && B !== null) {
        switch (B.$$typeof) {
          case fe:
            return B.key === _e ? O(V, N, B, ue) : null;
          case ke:
            return B.key === _e ? Y(V, N, B, ue) : null;
          case oe:
            return _e = B._init, ie(
              V,
              N,
              _e(B._payload),
              ue
            );
        }
        if (lt(B) || X(B)) return _e !== null ? null : le(V, N, B, ue, null);
        yc(V, B);
      }
      return null;
    }
    function we(V, N, B, ue, _e) {
      if (typeof ue == "string" && ue !== "" || typeof ue == "number") return V = V.get(B) || null, T(N, V, "" + ue, _e);
      if (typeof ue == "object" && ue !== null) {
        switch (ue.$$typeof) {
          case fe:
            return V = V.get(ue.key === null ? B : ue.key) || null, O(N, V, ue, _e);
          case ke:
            return V = V.get(ue.key === null ? B : ue.key) || null, Y(N, V, ue, _e);
          case oe:
            var Qe = ue._init;
            return we(V, N, B, Qe(ue._payload), _e);
        }
        if (lt(ue) || X(ue)) return V = V.get(B) || null, le(N, V, ue, _e, null);
        yc(N, ue);
      }
      return null;
    }
    function Le(V, N, B, ue) {
      for (var _e = null, Qe = null, Ge = N, Je = N = 0, Nn = null; Ge !== null && Je < B.length; Je++) {
        Ge.index > Je ? (Nn = Ge, Ge = null) : Nn = Ge.sibling;
        var xt = ie(V, Ge, B[Je], ue);
        if (xt === null) {
          Ge === null && (Ge = Nn);
          break;
        }
        n && Ge && xt.alternate === null && r(V, Ge), N = p(xt, N, Je), Qe === null ? _e = xt : Qe.sibling = xt, Qe = xt, Ge = Nn;
      }
      if (Je === B.length) return l(V, Ge), Gt && Ll(V, Je), _e;
      if (Ge === null) {
        for (; Je < B.length; Je++) Ge = se(V, B[Je], ue), Ge !== null && (N = p(Ge, N, Je), Qe === null ? _e = Ge : Qe.sibling = Ge, Qe = Ge);
        return Gt && Ll(V, Je), _e;
      }
      for (Ge = o(V, Ge); Je < B.length; Je++) Nn = we(Ge, V, Je, B[Je], ue), Nn !== null && (n && Nn.alternate !== null && Ge.delete(Nn.key === null ? Je : Nn.key), N = p(Nn, N, Je), Qe === null ? _e = Nn : Qe.sibling = Nn, Qe = Nn);
      return n && Ge.forEach(function(nl) {
        return r(V, nl);
      }), Gt && Ll(V, Je), _e;
    }
    function ze(V, N, B, ue) {
      var _e = X(B);
      if (typeof _e != "function") throw Error(m(150));
      if (B = _e.call(B), B == null) throw Error(m(151));
      for (var Qe = _e = null, Ge = N, Je = N = 0, Nn = null, xt = B.next(); Ge !== null && !xt.done; Je++, xt = B.next()) {
        Ge.index > Je ? (Nn = Ge, Ge = null) : Nn = Ge.sibling;
        var nl = ie(V, Ge, xt.value, ue);
        if (nl === null) {
          Ge === null && (Ge = Nn);
          break;
        }
        n && Ge && nl.alternate === null && r(V, Ge), N = p(nl, N, Je), Qe === null ? _e = nl : Qe.sibling = nl, Qe = nl, Ge = Nn;
      }
      if (xt.done) return l(
        V,
        Ge
      ), Gt && Ll(V, Je), _e;
      if (Ge === null) {
        for (; !xt.done; Je++, xt = B.next()) xt = se(V, xt.value, ue), xt !== null && (N = p(xt, N, Je), Qe === null ? _e = xt : Qe.sibling = xt, Qe = xt);
        return Gt && Ll(V, Je), _e;
      }
      for (Ge = o(V, Ge); !xt.done; Je++, xt = B.next()) xt = we(Ge, V, Je, xt.value, ue), xt !== null && (n && xt.alternate !== null && Ge.delete(xt.key === null ? Je : xt.key), N = p(xt, N, Je), Qe === null ? _e = xt : Qe.sibling = xt, Qe = xt);
      return n && Ge.forEach(function(jh) {
        return r(V, jh);
      }), Gt && Ll(V, Je), _e;
    }
    function dn(V, N, B, ue) {
      if (typeof B == "object" && B !== null && B.type === ve && B.key === null && (B = B.props.children), typeof B == "object" && B !== null) {
        switch (B.$$typeof) {
          case fe:
            e: {
              for (var _e = B.key, Qe = N; Qe !== null; ) {
                if (Qe.key === _e) {
                  if (_e = B.type, _e === ve) {
                    if (Qe.tag === 7) {
                      l(V, Qe.sibling), N = c(Qe, B.props.children), N.return = V, V = N;
                      break e;
                    }
                  } else if (Qe.elementType === _e || typeof _e == "object" && _e !== null && _e.$$typeof === oe && ih(_e) === Qe.type) {
                    l(V, Qe.sibling), N = c(Qe, B.props), N.ref = _l(V, Qe, B), N.return = V, V = N;
                    break e;
                  }
                  l(V, Qe);
                  break;
                } else r(V, Qe);
                Qe = Qe.sibling;
              }
              B.type === ve ? (N = gi(B.props.children, V.mode, ue, B.key), N.return = V, V = N) : (ue = fs(B.type, B.key, B.props, null, V.mode, ue), ue.ref = _l(V, N, B), ue.return = V, V = ue);
            }
            return S(V);
          case ke:
            e: {
              for (Qe = B.key; N !== null; ) {
                if (N.key === Qe) if (N.tag === 4 && N.stateNode.containerInfo === B.containerInfo && N.stateNode.implementation === B.implementation) {
                  l(V, N.sibling), N = c(N, B.children || []), N.return = V, V = N;
                  break e;
                } else {
                  l(V, N);
                  break;
                }
                else r(V, N);
                N = N.sibling;
              }
              N = Xc(B, V.mode, ue), N.return = V, V = N;
            }
            return S(V);
          case oe:
            return Qe = B._init, dn(V, N, Qe(B._payload), ue);
        }
        if (lt(B)) return Le(V, N, B, ue);
        if (X(B)) return ze(V, N, B, ue);
        yc(V, B);
      }
      return typeof B == "string" && B !== "" || typeof B == "number" ? (B = "" + B, N !== null && N.tag === 6 ? (l(V, N.sibling), N = c(N, B), N.return = V, V = N) : (l(V, N), N = ap(B, V.mode, ue), N.return = V, V = N), S(V)) : l(V, N);
    }
    return dn;
  }
  var on = Nl(!0), Se = Nl(!1), Pr = ba(null), Dr = null, Lu = null, kd = null;
  function Od() {
    kd = Lu = Dr = null;
  }
  function Md(n) {
    var r = Pr.current;
    jt(Pr), n._currentValue = r;
  }
  function Ld(n, r, l) {
    for (; n !== null; ) {
      var o = n.alternate;
      if ((n.childLanes & r) !== r ? (n.childLanes |= r, o !== null && (o.childLanes |= r)) : o !== null && (o.childLanes & r) !== r && (o.childLanes |= r), n === l) break;
      n = n.return;
    }
  }
  function Xt(n, r) {
    Dr = n, kd = Lu = null, n = n.dependencies, n !== null && n.firstContext !== null && ((n.lanes & r) !== 0 && (Sn = !0), n.firstContext = null);
  }
  function ua(n) {
    var r = n._currentValue;
    if (kd !== n) if (n = { context: n, memoizedValue: r, next: null }, Lu === null) {
      if (Dr === null) throw Error(m(308));
      Lu = n, Dr.dependencies = { lanes: 0, firstContext: n };
    } else Lu = Lu.next = n;
    return r;
  }
  var zl = null;
  function _d(n) {
    zl === null ? zl = [n] : zl.push(n);
  }
  function Nd(n, r, l, o) {
    var c = r.interleaved;
    return c === null ? (l.next = l, _d(r)) : (l.next = c.next, c.next = l), r.interleaved = l, jr(n, o);
  }
  function jr(n, r) {
    n.lanes |= r;
    var l = n.alternate;
    for (l !== null && (l.lanes |= r), l = n, n = n.return; n !== null; ) n.childLanes |= r, l = n.alternate, l !== null && (l.childLanes |= r), l = n, n = n.return;
    return l.tag === 3 ? l.stateNode : null;
  }
  var Br = !1;
  function zd(n) {
    n.updateQueue = { baseState: n.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function lh(n, r) {
    n = n.updateQueue, r.updateQueue === n && (r.updateQueue = { baseState: n.baseState, firstBaseUpdate: n.firstBaseUpdate, lastBaseUpdate: n.lastBaseUpdate, shared: n.shared, effects: n.effects });
  }
  function pi(n, r) {
    return { eventTime: n, lane: r, tag: 0, payload: null, callback: null, next: null };
  }
  function Qi(n, r, l) {
    var o = n.updateQueue;
    if (o === null) return null;
    if (o = o.shared, (ht & 2) !== 0) {
      var c = o.pending;
      return c === null ? r.next = r : (r.next = c.next, c.next = r), o.pending = r, jr(n, l);
    }
    return c = o.interleaved, c === null ? (r.next = r, _d(o)) : (r.next = c.next, c.next = r), o.interleaved = r, jr(n, l);
  }
  function gc(n, r, l) {
    if (r = r.updateQueue, r !== null && (r = r.shared, (l & 4194240) !== 0)) {
      var o = r.lanes;
      o &= n.pendingLanes, l |= o, r.lanes = l, js(n, l);
    }
  }
  function uh(n, r) {
    var l = n.updateQueue, o = n.alternate;
    if (o !== null && (o = o.updateQueue, l === o)) {
      var c = null, p = null;
      if (l = l.firstBaseUpdate, l !== null) {
        do {
          var S = { eventTime: l.eventTime, lane: l.lane, tag: l.tag, payload: l.payload, callback: l.callback, next: null };
          p === null ? c = p = S : p = p.next = S, l = l.next;
        } while (l !== null);
        p === null ? c = p = r : p = p.next = r;
      } else c = p = r;
      l = { baseState: o.baseState, firstBaseUpdate: c, lastBaseUpdate: p, shared: o.shared, effects: o.effects }, n.updateQueue = l;
      return;
    }
    n = l.lastBaseUpdate, n === null ? l.firstBaseUpdate = r : n.next = r, l.lastBaseUpdate = r;
  }
  function Uo(n, r, l, o) {
    var c = n.updateQueue;
    Br = !1;
    var p = c.firstBaseUpdate, S = c.lastBaseUpdate, T = c.shared.pending;
    if (T !== null) {
      c.shared.pending = null;
      var O = T, Y = O.next;
      O.next = null, S === null ? p = Y : S.next = Y, S = O;
      var le = n.alternate;
      le !== null && (le = le.updateQueue, T = le.lastBaseUpdate, T !== S && (T === null ? le.firstBaseUpdate = Y : T.next = Y, le.lastBaseUpdate = O));
    }
    if (p !== null) {
      var se = c.baseState;
      S = 0, le = Y = O = null, T = p;
      do {
        var ie = T.lane, we = T.eventTime;
        if ((o & ie) === ie) {
          le !== null && (le = le.next = {
            eventTime: we,
            lane: 0,
            tag: T.tag,
            payload: T.payload,
            callback: T.callback,
            next: null
          });
          e: {
            var Le = n, ze = T;
            switch (ie = r, we = l, ze.tag) {
              case 1:
                if (Le = ze.payload, typeof Le == "function") {
                  se = Le.call(we, se, ie);
                  break e;
                }
                se = Le;
                break e;
              case 3:
                Le.flags = Le.flags & -65537 | 128;
              case 0:
                if (Le = ze.payload, ie = typeof Le == "function" ? Le.call(we, se, ie) : Le, ie == null) break e;
                se = G({}, se, ie);
                break e;
              case 2:
                Br = !0;
            }
          }
          T.callback !== null && T.lane !== 0 && (n.flags |= 64, ie = c.effects, ie === null ? c.effects = [T] : ie.push(T));
        } else we = { eventTime: we, lane: ie, tag: T.tag, payload: T.payload, callback: T.callback, next: null }, le === null ? (Y = le = we, O = se) : le = le.next = we, S |= ie;
        if (T = T.next, T === null) {
          if (T = c.shared.pending, T === null) break;
          ie = T, T = ie.next, ie.next = null, c.lastBaseUpdate = ie, c.shared.pending = null;
        }
      } while (!0);
      if (le === null && (O = se), c.baseState = O, c.firstBaseUpdate = Y, c.lastBaseUpdate = le, r = c.shared.interleaved, r !== null) {
        c = r;
        do
          S |= c.lane, c = c.next;
        while (c !== r);
      } else p === null && (c.shared.lanes = 0);
      Ga |= S, n.lanes = S, n.memoizedState = se;
    }
  }
  function Ad(n, r, l) {
    if (n = r.effects, r.effects = null, n !== null) for (r = 0; r < n.length; r++) {
      var o = n[r], c = o.callback;
      if (c !== null) {
        if (o.callback = null, o = l, typeof c != "function") throw Error(m(191, c));
        c.call(o);
      }
    }
  }
  var Fo = {}, $a = ba(Fo), Ho = ba(Fo), Vo = ba(Fo);
  function Al(n) {
    if (n === Fo) throw Error(m(174));
    return n;
  }
  function Ud(n, r) {
    switch (Pe(Vo, r), Pe(Ho, n), Pe($a, Fo), n = r.nodeType, n) {
      case 9:
      case 11:
        r = (r = r.documentElement) ? r.namespaceURI : Hr(null, "");
        break;
      default:
        n = n === 8 ? r.parentNode : r, r = n.namespaceURI || null, n = n.tagName, r = Hr(r, n);
    }
    jt($a), Pe($a, r);
  }
  function Ul() {
    jt($a), jt(Ho), jt(Vo);
  }
  function oh(n) {
    Al(Vo.current);
    var r = Al($a.current), l = Hr(r, n.type);
    r !== l && (Pe(Ho, n), Pe($a, l));
  }
  function Sc(n) {
    Ho.current === n && (jt($a), jt(Ho));
  }
  var qt = ba(0);
  function Ec(n) {
    for (var r = n; r !== null; ) {
      if (r.tag === 13) {
        var l = r.memoizedState;
        if (l !== null && (l = l.dehydrated, l === null || l.data === "$?" || l.data === "$!")) return r;
      } else if (r.tag === 19 && r.memoizedProps.revealOrder !== void 0) {
        if ((r.flags & 128) !== 0) return r;
      } else if (r.child !== null) {
        r.child.return = r, r = r.child;
        continue;
      }
      if (r === n) break;
      for (; r.sibling === null; ) {
        if (r.return === null || r.return === n) return null;
        r = r.return;
      }
      r.sibling.return = r.return, r = r.sibling;
    }
    return null;
  }
  var Po = [];
  function Be() {
    for (var n = 0; n < Po.length; n++) Po[n]._workInProgressVersionPrimary = null;
    Po.length = 0;
  }
  var ot = pe.ReactCurrentDispatcher, Ct = pe.ReactCurrentBatchConfig, At = 0, Rt = null, gn = null, Ln = null, Cc = !1, jo = !1, Fl = 0, ae = 0;
  function St() {
    throw Error(m(321));
  }
  function qe(n, r) {
    if (r === null) return !1;
    for (var l = 0; l < r.length && l < n.length; l++) if (!wa(n[l], r[l])) return !1;
    return !0;
  }
  function Wi(n, r, l, o, c, p) {
    if (At = p, Rt = r, r.memoizedState = null, r.updateQueue = null, r.lanes = 0, ot.current = n === null || n.memoizedState === null ? Uc : Wo, n = l(o, c), jo) {
      p = 0;
      do {
        if (jo = !1, Fl = 0, 25 <= p) throw Error(m(301));
        p += 1, Ln = gn = null, r.updateQueue = null, ot.current = Fc, n = l(o, c);
      } while (jo);
    }
    if (ot.current = Bl, r = gn !== null && gn.next !== null, At = 0, Ln = gn = Rt = null, Cc = !1, r) throw Error(m(300));
    return n;
  }
  function Da() {
    var n = Fl !== 0;
    return Fl = 0, n;
  }
  function Zn() {
    var n = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return Ln === null ? Rt.memoizedState = Ln = n : Ln = Ln.next = n, Ln;
  }
  function sn() {
    if (gn === null) {
      var n = Rt.alternate;
      n = n !== null ? n.memoizedState : null;
    } else n = gn.next;
    var r = Ln === null ? Rt.memoizedState : Ln.next;
    if (r !== null) Ln = r, gn = n;
    else {
      if (n === null) throw Error(m(310));
      gn = n, n = { memoizedState: gn.memoizedState, baseState: gn.baseState, baseQueue: gn.baseQueue, queue: gn.queue, next: null }, Ln === null ? Rt.memoizedState = Ln = n : Ln = Ln.next = n;
    }
    return Ln;
  }
  function vi(n, r) {
    return typeof r == "function" ? r(n) : r;
  }
  function Gi(n) {
    var r = sn(), l = r.queue;
    if (l === null) throw Error(m(311));
    l.lastRenderedReducer = n;
    var o = gn, c = o.baseQueue, p = l.pending;
    if (p !== null) {
      if (c !== null) {
        var S = c.next;
        c.next = p.next, p.next = S;
      }
      o.baseQueue = c = p, l.pending = null;
    }
    if (c !== null) {
      p = c.next, o = o.baseState;
      var T = S = null, O = null, Y = p;
      do {
        var le = Y.lane;
        if ((At & le) === le) O !== null && (O = O.next = { lane: 0, action: Y.action, hasEagerState: Y.hasEagerState, eagerState: Y.eagerState, next: null }), o = Y.hasEagerState ? Y.eagerState : n(o, Y.action);
        else {
          var se = {
            lane: le,
            action: Y.action,
            hasEagerState: Y.hasEagerState,
            eagerState: Y.eagerState,
            next: null
          };
          O === null ? (T = O = se, S = o) : O = O.next = se, Rt.lanes |= le, Ga |= le;
        }
        Y = Y.next;
      } while (Y !== null && Y !== p);
      O === null ? S = o : O.next = T, wa(o, r.memoizedState) || (Sn = !0), r.memoizedState = o, r.baseState = S, r.baseQueue = O, l.lastRenderedState = o;
    }
    if (n = l.interleaved, n !== null) {
      c = n;
      do
        p = c.lane, Rt.lanes |= p, Ga |= p, c = c.next;
      while (c !== n);
    } else c === null && (l.lanes = 0);
    return [r.memoizedState, l.dispatch];
  }
  function Hl(n) {
    var r = sn(), l = r.queue;
    if (l === null) throw Error(m(311));
    l.lastRenderedReducer = n;
    var o = l.dispatch, c = l.pending, p = r.memoizedState;
    if (c !== null) {
      l.pending = null;
      var S = c = c.next;
      do
        p = n(p, S.action), S = S.next;
      while (S !== c);
      wa(p, r.memoizedState) || (Sn = !0), r.memoizedState = p, r.baseQueue === null && (r.baseState = p), l.lastRenderedState = p;
    }
    return [p, o];
  }
  function Rc() {
  }
  function xc(n, r) {
    var l = Rt, o = sn(), c = r(), p = !wa(o.memoizedState, c);
    if (p && (o.memoizedState = c, Sn = !0), o = o.queue, Bo(bc.bind(null, l, o, n), [n]), o.getSnapshot !== r || p || Ln !== null && Ln.memoizedState.tag & 1) {
      if (l.flags |= 2048, Vl(9, Tc.bind(null, l, o, c, r), void 0, null), kn === null) throw Error(m(349));
      (At & 30) !== 0 || wc(l, r, c);
    }
    return c;
  }
  function wc(n, r, l) {
    n.flags |= 16384, n = { getSnapshot: r, value: l }, r = Rt.updateQueue, r === null ? (r = { lastEffect: null, stores: null }, Rt.updateQueue = r, r.stores = [n]) : (l = r.stores, l === null ? r.stores = [n] : l.push(n));
  }
  function Tc(n, r, l, o) {
    r.value = l, r.getSnapshot = o, Dc(r) && kc(n);
  }
  function bc(n, r, l) {
    return l(function() {
      Dc(r) && kc(n);
    });
  }
  function Dc(n) {
    var r = n.getSnapshot;
    n = n.value;
    try {
      var l = r();
      return !wa(n, l);
    } catch {
      return !0;
    }
  }
  function kc(n) {
    var r = jr(n, 1);
    r !== null && lr(r, n, 1, -1);
  }
  function Oc(n) {
    var r = Zn();
    return typeof n == "function" && (n = n()), r.memoizedState = r.baseState = n, n = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: vi, lastRenderedState: n }, r.queue = n, n = n.dispatch = jl.bind(null, Rt, n), [r.memoizedState, n];
  }
  function Vl(n, r, l, o) {
    return n = { tag: n, create: r, destroy: l, deps: o, next: null }, r = Rt.updateQueue, r === null ? (r = { lastEffect: null, stores: null }, Rt.updateQueue = r, r.lastEffect = n.next = n) : (l = r.lastEffect, l === null ? r.lastEffect = n.next = n : (o = l.next, l.next = n, n.next = o, r.lastEffect = n)), n;
  }
  function Mc() {
    return sn().memoizedState;
  }
  function _u(n, r, l, o) {
    var c = Zn();
    Rt.flags |= n, c.memoizedState = Vl(1 | r, l, void 0, o === void 0 ? null : o);
  }
  function Nu(n, r, l, o) {
    var c = sn();
    o = o === void 0 ? null : o;
    var p = void 0;
    if (gn !== null) {
      var S = gn.memoizedState;
      if (p = S.destroy, o !== null && qe(o, S.deps)) {
        c.memoizedState = Vl(r, l, p, o);
        return;
      }
    }
    Rt.flags |= n, c.memoizedState = Vl(1 | r, l, p, o);
  }
  function Lc(n, r) {
    return _u(8390656, 8, n, r);
  }
  function Bo(n, r) {
    return Nu(2048, 8, n, r);
  }
  function _c(n, r) {
    return Nu(4, 2, n, r);
  }
  function Io(n, r) {
    return Nu(4, 4, n, r);
  }
  function Pl(n, r) {
    if (typeof r == "function") return n = n(), r(n), function() {
      r(null);
    };
    if (r != null) return n = n(), r.current = n, function() {
      r.current = null;
    };
  }
  function Nc(n, r, l) {
    return l = l != null ? l.concat([n]) : null, Nu(4, 4, Pl.bind(null, r, n), l);
  }
  function $o() {
  }
  function zc(n, r) {
    var l = sn();
    r = r === void 0 ? null : r;
    var o = l.memoizedState;
    return o !== null && r !== null && qe(r, o[1]) ? o[0] : (l.memoizedState = [n, r], n);
  }
  function Ac(n, r) {
    var l = sn();
    r = r === void 0 ? null : r;
    var o = l.memoizedState;
    return o !== null && r !== null && qe(r, o[1]) ? o[0] : (n = n(), l.memoizedState = [n, r], n);
  }
  function Fd(n, r, l) {
    return (At & 21) === 0 ? (n.baseState && (n.baseState = !1, Sn = !0), n.memoizedState = l) : (wa(l, r) || (l = Ps(), Rt.lanes |= l, Ga |= l, n.baseState = !0), r);
  }
  function Yo(n, r) {
    var l = Nt;
    Nt = l !== 0 && 4 > l ? l : 4, n(!0);
    var o = Ct.transition;
    Ct.transition = {};
    try {
      n(!1), r();
    } finally {
      Nt = l, Ct.transition = o;
    }
  }
  function Hd() {
    return sn().memoizedState;
  }
  function Qo(n, r, l) {
    var o = Ka(n);
    if (l = { lane: o, action: l, hasEagerState: !1, eagerState: null, next: null }, Ir(n)) sh(r, l);
    else if (l = Nd(n, r, l, o), l !== null) {
      var c = Rn();
      lr(l, n, o, c), Vt(l, r, o);
    }
  }
  function jl(n, r, l) {
    var o = Ka(n), c = { lane: o, action: l, hasEagerState: !1, eagerState: null, next: null };
    if (Ir(n)) sh(r, c);
    else {
      var p = n.alternate;
      if (n.lanes === 0 && (p === null || p.lanes === 0) && (p = r.lastRenderedReducer, p !== null)) try {
        var S = r.lastRenderedState, T = p(S, l);
        if (c.hasEagerState = !0, c.eagerState = T, wa(T, S)) {
          var O = r.interleaved;
          O === null ? (c.next = c, _d(r)) : (c.next = O.next, O.next = c), r.interleaved = c;
          return;
        }
      } catch {
      } finally {
      }
      l = Nd(n, r, c, o), l !== null && (c = Rn(), lr(l, n, o, c), Vt(l, r, o));
    }
  }
  function Ir(n) {
    var r = n.alternate;
    return n === Rt || r !== null && r === Rt;
  }
  function sh(n, r) {
    jo = Cc = !0;
    var l = n.pending;
    l === null ? r.next = r : (r.next = l.next, l.next = r), n.pending = r;
  }
  function Vt(n, r, l) {
    if ((l & 4194240) !== 0) {
      var o = r.lanes;
      o &= n.pendingLanes, l |= o, r.lanes = l, js(n, l);
    }
  }
  var Bl = { readContext: ua, useCallback: St, useContext: St, useEffect: St, useImperativeHandle: St, useInsertionEffect: St, useLayoutEffect: St, useMemo: St, useReducer: St, useRef: St, useState: St, useDebugValue: St, useDeferredValue: St, useTransition: St, useMutableSource: St, useSyncExternalStore: St, useId: St, unstable_isNewReconciler: !1 }, Uc = { readContext: ua, useCallback: function(n, r) {
    return Zn().memoizedState = [n, r === void 0 ? null : r], n;
  }, useContext: ua, useEffect: Lc, useImperativeHandle: function(n, r, l) {
    return l = l != null ? l.concat([n]) : null, _u(
      4194308,
      4,
      Pl.bind(null, r, n),
      l
    );
  }, useLayoutEffect: function(n, r) {
    return _u(4194308, 4, n, r);
  }, useInsertionEffect: function(n, r) {
    return _u(4, 2, n, r);
  }, useMemo: function(n, r) {
    var l = Zn();
    return r = r === void 0 ? null : r, n = n(), l.memoizedState = [n, r], n;
  }, useReducer: function(n, r, l) {
    var o = Zn();
    return r = l !== void 0 ? l(r) : r, o.memoizedState = o.baseState = r, n = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: n, lastRenderedState: r }, o.queue = n, n = n.dispatch = Qo.bind(null, Rt, n), [o.memoizedState, n];
  }, useRef: function(n) {
    var r = Zn();
    return n = { current: n }, r.memoizedState = n;
  }, useState: Oc, useDebugValue: $o, useDeferredValue: function(n) {
    return Zn().memoizedState = n;
  }, useTransition: function() {
    var n = Oc(!1), r = n[0];
    return n = Yo.bind(null, n[1]), Zn().memoizedState = n, [r, n];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(n, r, l) {
    var o = Rt, c = Zn();
    if (Gt) {
      if (l === void 0) throw Error(m(407));
      l = l();
    } else {
      if (l = r(), kn === null) throw Error(m(349));
      (At & 30) !== 0 || wc(o, r, l);
    }
    c.memoizedState = l;
    var p = { value: l, getSnapshot: r };
    return c.queue = p, Lc(bc.bind(
      null,
      o,
      p,
      n
    ), [n]), o.flags |= 2048, Vl(9, Tc.bind(null, o, p, l, r), void 0, null), l;
  }, useId: function() {
    var n = Zn(), r = kn.identifierPrefix;
    if (Gt) {
      var l = Ia, o = Ba;
      l = (o & ~(1 << 32 - Jr(o) - 1)).toString(32) + l, r = ":" + r + "R" + l, l = Fl++, 0 < l && (r += "H" + l.toString(32)), r += ":";
    } else l = ae++, r = ":" + r + "r" + l.toString(32) + ":";
    return n.memoizedState = r;
  }, unstable_isNewReconciler: !1 }, Wo = {
    readContext: ua,
    useCallback: zc,
    useContext: ua,
    useEffect: Bo,
    useImperativeHandle: Nc,
    useInsertionEffect: _c,
    useLayoutEffect: Io,
    useMemo: Ac,
    useReducer: Gi,
    useRef: Mc,
    useState: function() {
      return Gi(vi);
    },
    useDebugValue: $o,
    useDeferredValue: function(n) {
      var r = sn();
      return Fd(r, gn.memoizedState, n);
    },
    useTransition: function() {
      var n = Gi(vi)[0], r = sn().memoizedState;
      return [n, r];
    },
    useMutableSource: Rc,
    useSyncExternalStore: xc,
    useId: Hd,
    unstable_isNewReconciler: !1
  }, Fc = { readContext: ua, useCallback: zc, useContext: ua, useEffect: Bo, useImperativeHandle: Nc, useInsertionEffect: _c, useLayoutEffect: Io, useMemo: Ac, useReducer: Hl, useRef: Mc, useState: function() {
    return Hl(vi);
  }, useDebugValue: $o, useDeferredValue: function(n) {
    var r = sn();
    return gn === null ? r.memoizedState = n : Fd(r, gn.memoizedState, n);
  }, useTransition: function() {
    var n = Hl(vi)[0], r = sn().memoizedState;
    return [n, r];
  }, useMutableSource: Rc, useSyncExternalStore: xc, useId: Hd, unstable_isNewReconciler: !1 };
  function ka(n, r) {
    if (n && n.defaultProps) {
      r = G({}, r), n = n.defaultProps;
      for (var l in n) r[l] === void 0 && (r[l] = n[l]);
      return r;
    }
    return r;
  }
  function Vd(n, r, l, o) {
    r = n.memoizedState, l = l(o, r), l = l == null ? r : G({}, r, l), n.memoizedState = l, n.lanes === 0 && (n.updateQueue.baseState = l);
  }
  var Hc = { isMounted: function(n) {
    return (n = n._reactInternals) ? Ca(n) === n : !1;
  }, enqueueSetState: function(n, r, l) {
    n = n._reactInternals;
    var o = Rn(), c = Ka(n), p = pi(o, c);
    p.payload = r, l != null && (p.callback = l), r = Qi(n, p, c), r !== null && (lr(r, n, c, o), gc(r, n, c));
  }, enqueueReplaceState: function(n, r, l) {
    n = n._reactInternals;
    var o = Rn(), c = Ka(n), p = pi(o, c);
    p.tag = 1, p.payload = r, l != null && (p.callback = l), r = Qi(n, p, c), r !== null && (lr(r, n, c, o), gc(r, n, c));
  }, enqueueForceUpdate: function(n, r) {
    n = n._reactInternals;
    var l = Rn(), o = Ka(n), c = pi(l, o);
    c.tag = 2, r != null && (c.callback = r), r = Qi(n, c, o), r !== null && (lr(r, n, o, l), gc(r, n, o));
  } };
  function ch(n, r, l, o, c, p, S) {
    return n = n.stateNode, typeof n.shouldComponentUpdate == "function" ? n.shouldComponentUpdate(o, p, S) : r.prototype && r.prototype.isPureReactComponent ? !bo(l, o) || !bo(c, p) : !0;
  }
  function Vc(n, r, l) {
    var o = !1, c = Rr, p = r.contextType;
    return typeof p == "object" && p !== null ? p = ua(p) : (c = mn(r) ? xr : rn.current, o = r.contextTypes, p = (o = o != null) ? aa(n, c) : Rr), r = new r(l, p), n.memoizedState = r.state !== null && r.state !== void 0 ? r.state : null, r.updater = Hc, n.stateNode = r, r._reactInternals = n, o && (n = n.stateNode, n.__reactInternalMemoizedUnmaskedChildContext = c, n.__reactInternalMemoizedMaskedChildContext = p), r;
  }
  function fh(n, r, l, o) {
    n = r.state, typeof r.componentWillReceiveProps == "function" && r.componentWillReceiveProps(l, o), typeof r.UNSAFE_componentWillReceiveProps == "function" && r.UNSAFE_componentWillReceiveProps(l, o), r.state !== n && Hc.enqueueReplaceState(r, r.state, null);
  }
  function Go(n, r, l, o) {
    var c = n.stateNode;
    c.props = l, c.state = n.memoizedState, c.refs = {}, zd(n);
    var p = r.contextType;
    typeof p == "object" && p !== null ? c.context = ua(p) : (p = mn(r) ? xr : rn.current, c.context = aa(n, p)), c.state = n.memoizedState, p = r.getDerivedStateFromProps, typeof p == "function" && (Vd(n, r, p, l), c.state = n.memoizedState), typeof r.getDerivedStateFromProps == "function" || typeof c.getSnapshotBeforeUpdate == "function" || typeof c.UNSAFE_componentWillMount != "function" && typeof c.componentWillMount != "function" || (r = c.state, typeof c.componentWillMount == "function" && c.componentWillMount(), typeof c.UNSAFE_componentWillMount == "function" && c.UNSAFE_componentWillMount(), r !== c.state && Hc.enqueueReplaceState(c, c.state, null), Uo(n, l, c, o), c.state = n.memoizedState), typeof c.componentDidMount == "function" && (n.flags |= 4194308);
  }
  function Il(n, r) {
    try {
      var l = "", o = r;
      do
        l += gr(o), o = o.return;
      while (o);
      var c = l;
    } catch (p) {
      c = `
Error generating stack: ` + p.message + `
` + p.stack;
    }
    return { value: n, source: r, stack: c, digest: null };
  }
  function Pd(n, r, l) {
    return { value: n, source: null, stack: l ?? null, digest: r ?? null };
  }
  function jd(n, r) {
    try {
      console.error(r.value);
    } catch (l) {
      setTimeout(function() {
        throw l;
      });
    }
  }
  var Pc = typeof WeakMap == "function" ? WeakMap : Map;
  function dh(n, r, l) {
    l = pi(-1, l), l.tag = 3, l.payload = { element: null };
    var o = r.value;
    return l.callback = function() {
      Vu || (Vu = !0, Ql = o), jd(n, r);
    }, l;
  }
  function Bd(n, r, l) {
    l = pi(-1, l), l.tag = 3;
    var o = n.type.getDerivedStateFromError;
    if (typeof o == "function") {
      var c = r.value;
      l.payload = function() {
        return o(c);
      }, l.callback = function() {
        jd(n, r);
      };
    }
    var p = n.stateNode;
    return p !== null && typeof p.componentDidCatch == "function" && (l.callback = function() {
      jd(n, r), typeof o != "function" && (qi === null ? qi = /* @__PURE__ */ new Set([this]) : qi.add(this));
      var S = r.stack;
      this.componentDidCatch(r.value, { componentStack: S !== null ? S : "" });
    }), l;
  }
  function Id(n, r, l) {
    var o = n.pingCache;
    if (o === null) {
      o = n.pingCache = new Pc();
      var c = /* @__PURE__ */ new Set();
      o.set(r, c);
    } else c = o.get(r), c === void 0 && (c = /* @__PURE__ */ new Set(), o.set(r, c));
    c.has(l) || (c.add(l), n = gg.bind(null, n, r, l), r.then(n, n));
  }
  function ph(n) {
    do {
      var r;
      if ((r = n.tag === 13) && (r = n.memoizedState, r = r !== null ? r.dehydrated !== null : !0), r) return n;
      n = n.return;
    } while (n !== null);
    return null;
  }
  function Ki(n, r, l, o, c) {
    return (n.mode & 1) === 0 ? (n === r ? n.flags |= 65536 : (n.flags |= 128, l.flags |= 131072, l.flags &= -52805, l.tag === 1 && (l.alternate === null ? l.tag = 17 : (r = pi(-1, 1), r.tag = 2, Qi(l, r, 1))), l.lanes |= 1), n) : (n.flags |= 65536, n.lanes = c, n);
  }
  var Ko = pe.ReactCurrentOwner, Sn = !1;
  function Pn(n, r, l, o) {
    r.child = n === null ? Se(r, null, l, o) : on(r, n.child, l, o);
  }
  function kr(n, r, l, o, c) {
    l = l.render;
    var p = r.ref;
    return Xt(r, c), o = Wi(n, r, l, o, p, c), l = Da(), n !== null && !Sn ? (r.updateQueue = n.updateQueue, r.flags &= -2053, n.lanes &= ~c, sa(n, r, c)) : (Gt && l && vc(r), r.flags |= 1, Pn(n, r, o, c), r.child);
  }
  function $l(n, r, l, o, c) {
    if (n === null) {
      var p = l.type;
      return typeof p == "function" && !rp(p) && p.defaultProps === void 0 && l.compare === null && l.defaultProps === void 0 ? (r.tag = 15, r.type = p, it(n, r, p, o, c)) : (n = fs(l.type, null, o, r, r.mode, c), n.ref = r.ref, n.return = r, r.child = n);
    }
    if (p = n.child, (n.lanes & c) === 0) {
      var S = p.memoizedProps;
      if (l = l.compare, l = l !== null ? l : bo, l(S, o) && n.ref === r.ref) return sa(n, r, c);
    }
    return r.flags |= 1, n = Ji(p, o), n.ref = r.ref, n.return = r, r.child = n;
  }
  function it(n, r, l, o, c) {
    if (n !== null) {
      var p = n.memoizedProps;
      if (bo(p, o) && n.ref === r.ref) if (Sn = !1, r.pendingProps = o = p, (n.lanes & c) !== 0) (n.flags & 131072) !== 0 && (Sn = !0);
      else return r.lanes = n.lanes, sa(n, r, c);
    }
    return vh(n, r, l, o, c);
  }
  function Xo(n, r, l) {
    var o = r.pendingProps, c = o.children, p = n !== null ? n.memoizedState : null;
    if (o.mode === "hidden") if ((r.mode & 1) === 0) r.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, Pe(Uu, $r), $r |= l;
    else {
      if ((l & 1073741824) === 0) return n = p !== null ? p.baseLanes | l : l, r.lanes = r.childLanes = 1073741824, r.memoizedState = { baseLanes: n, cachePool: null, transitions: null }, r.updateQueue = null, Pe(Uu, $r), $r |= n, null;
      r.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, o = p !== null ? p.baseLanes : l, Pe(Uu, $r), $r |= o;
    }
    else p !== null ? (o = p.baseLanes | l, r.memoizedState = null) : o = l, Pe(Uu, $r), $r |= o;
    return Pn(n, r, c, l), r.child;
  }
  function $d(n, r) {
    var l = r.ref;
    (n === null && l !== null || n !== null && n.ref !== l) && (r.flags |= 512, r.flags |= 2097152);
  }
  function vh(n, r, l, o, c) {
    var p = mn(l) ? xr : rn.current;
    return p = aa(r, p), Xt(r, c), l = Wi(n, r, l, o, p, c), o = Da(), n !== null && !Sn ? (r.updateQueue = n.updateQueue, r.flags &= -2053, n.lanes &= ~c, sa(n, r, c)) : (Gt && o && vc(r), r.flags |= 1, Pn(n, r, l, c), r.child);
  }
  function hh(n, r, l, o, c) {
    if (mn(l)) {
      var p = !0;
      wr(r);
    } else p = !1;
    if (Xt(r, c), r.stateNode === null) oa(n, r), Vc(r, l, o), Go(r, l, o, c), o = !0;
    else if (n === null) {
      var S = r.stateNode, T = r.memoizedProps;
      S.props = T;
      var O = S.context, Y = l.contextType;
      typeof Y == "object" && Y !== null ? Y = ua(Y) : (Y = mn(l) ? xr : rn.current, Y = aa(r, Y));
      var le = l.getDerivedStateFromProps, se = typeof le == "function" || typeof S.getSnapshotBeforeUpdate == "function";
      se || typeof S.UNSAFE_componentWillReceiveProps != "function" && typeof S.componentWillReceiveProps != "function" || (T !== o || O !== Y) && fh(r, S, o, Y), Br = !1;
      var ie = r.memoizedState;
      S.state = ie, Uo(r, o, S, c), O = r.memoizedState, T !== o || ie !== O || bn.current || Br ? (typeof le == "function" && (Vd(r, l, le, o), O = r.memoizedState), (T = Br || ch(r, l, T, o, ie, O, Y)) ? (se || typeof S.UNSAFE_componentWillMount != "function" && typeof S.componentWillMount != "function" || (typeof S.componentWillMount == "function" && S.componentWillMount(), typeof S.UNSAFE_componentWillMount == "function" && S.UNSAFE_componentWillMount()), typeof S.componentDidMount == "function" && (r.flags |= 4194308)) : (typeof S.componentDidMount == "function" && (r.flags |= 4194308), r.memoizedProps = o, r.memoizedState = O), S.props = o, S.state = O, S.context = Y, o = T) : (typeof S.componentDidMount == "function" && (r.flags |= 4194308), o = !1);
    } else {
      S = r.stateNode, lh(n, r), T = r.memoizedProps, Y = r.type === r.elementType ? T : ka(r.type, T), S.props = Y, se = r.pendingProps, ie = S.context, O = l.contextType, typeof O == "object" && O !== null ? O = ua(O) : (O = mn(l) ? xr : rn.current, O = aa(r, O));
      var we = l.getDerivedStateFromProps;
      (le = typeof we == "function" || typeof S.getSnapshotBeforeUpdate == "function") || typeof S.UNSAFE_componentWillReceiveProps != "function" && typeof S.componentWillReceiveProps != "function" || (T !== se || ie !== O) && fh(r, S, o, O), Br = !1, ie = r.memoizedState, S.state = ie, Uo(r, o, S, c);
      var Le = r.memoizedState;
      T !== se || ie !== Le || bn.current || Br ? (typeof we == "function" && (Vd(r, l, we, o), Le = r.memoizedState), (Y = Br || ch(r, l, Y, o, ie, Le, O) || !1) ? (le || typeof S.UNSAFE_componentWillUpdate != "function" && typeof S.componentWillUpdate != "function" || (typeof S.componentWillUpdate == "function" && S.componentWillUpdate(o, Le, O), typeof S.UNSAFE_componentWillUpdate == "function" && S.UNSAFE_componentWillUpdate(o, Le, O)), typeof S.componentDidUpdate == "function" && (r.flags |= 4), typeof S.getSnapshotBeforeUpdate == "function" && (r.flags |= 1024)) : (typeof S.componentDidUpdate != "function" || T === n.memoizedProps && ie === n.memoizedState || (r.flags |= 4), typeof S.getSnapshotBeforeUpdate != "function" || T === n.memoizedProps && ie === n.memoizedState || (r.flags |= 1024), r.memoizedProps = o, r.memoizedState = Le), S.props = o, S.state = Le, S.context = O, o = Y) : (typeof S.componentDidUpdate != "function" || T === n.memoizedProps && ie === n.memoizedState || (r.flags |= 4), typeof S.getSnapshotBeforeUpdate != "function" || T === n.memoizedProps && ie === n.memoizedState || (r.flags |= 1024), o = !1);
    }
    return qo(n, r, l, o, p, c);
  }
  function qo(n, r, l, o, c, p) {
    $d(n, r);
    var S = (r.flags & 128) !== 0;
    if (!o && !S) return c && dc(r, l, !1), sa(n, r, p);
    o = r.stateNode, Ko.current = r;
    var T = S && typeof l.getDerivedStateFromError != "function" ? null : o.render();
    return r.flags |= 1, n !== null && S ? (r.child = on(r, n.child, null, p), r.child = on(r, null, T, p)) : Pn(n, r, T, p), r.memoizedState = o.state, c && dc(r, l, !0), r.child;
  }
  function zu(n) {
    var r = n.stateNode;
    r.pendingContext ? nh(n, r.pendingContext, r.pendingContext !== r.context) : r.context && nh(n, r.context, !1), Ud(n, r.containerInfo);
  }
  function mh(n, r, l, o, c) {
    return Yi(), di(c), r.flags |= 256, Pn(n, r, l, o), r.child;
  }
  var jc = { dehydrated: null, treeContext: null, retryLane: 0 };
  function Yd(n) {
    return { baseLanes: n, cachePool: null, transitions: null };
  }
  function Bc(n, r, l) {
    var o = r.pendingProps, c = qt.current, p = !1, S = (r.flags & 128) !== 0, T;
    if ((T = S) || (T = n !== null && n.memoizedState === null ? !1 : (c & 2) !== 0), T ? (p = !0, r.flags &= -129) : (n === null || n.memoizedState !== null) && (c |= 1), Pe(qt, c & 1), n === null)
      return Dd(r), n = r.memoizedState, n !== null && (n = n.dehydrated, n !== null) ? ((r.mode & 1) === 0 ? r.lanes = 1 : n.data === "$!" ? r.lanes = 8 : r.lanes = 1073741824, null) : (S = o.children, n = o.fallback, p ? (o = r.mode, p = r.child, S = { mode: "hidden", children: S }, (o & 1) === 0 && p !== null ? (p.childLanes = 0, p.pendingProps = S) : p = el(S, o, 0, null), n = gi(n, o, l, null), p.return = r, n.return = r, p.sibling = n, r.child = p, r.child.memoizedState = Yd(l), r.memoizedState = jc, n) : Qd(r, S));
    if (c = n.memoizedState, c !== null && (T = c.dehydrated, T !== null)) return yh(n, r, S, o, T, c, l);
    if (p) {
      p = o.fallback, S = r.mode, c = n.child, T = c.sibling;
      var O = { mode: "hidden", children: o.children };
      return (S & 1) === 0 && r.child !== c ? (o = r.child, o.childLanes = 0, o.pendingProps = O, r.deletions = null) : (o = Ji(c, O), o.subtreeFlags = c.subtreeFlags & 14680064), T !== null ? p = Ji(T, p) : (p = gi(p, S, l, null), p.flags |= 2), p.return = r, o.return = r, o.sibling = p, r.child = o, o = p, p = r.child, S = n.child.memoizedState, S = S === null ? Yd(l) : { baseLanes: S.baseLanes | l, cachePool: null, transitions: S.transitions }, p.memoizedState = S, p.childLanes = n.childLanes & ~l, r.memoizedState = jc, o;
    }
    return p = n.child, n = p.sibling, o = Ji(p, { mode: "visible", children: o.children }), (r.mode & 1) === 0 && (o.lanes = l), o.return = r, o.sibling = null, n !== null && (l = r.deletions, l === null ? (r.deletions = [n], r.flags |= 16) : l.push(n)), r.child = o, r.memoizedState = null, o;
  }
  function Qd(n, r) {
    return r = el({ mode: "visible", children: r }, n.mode, 0, null), r.return = n, n.child = r;
  }
  function Zo(n, r, l, o) {
    return o !== null && di(o), on(r, n.child, null, l), n = Qd(r, r.pendingProps.children), n.flags |= 2, r.memoizedState = null, n;
  }
  function yh(n, r, l, o, c, p, S) {
    if (l)
      return r.flags & 256 ? (r.flags &= -257, o = Pd(Error(m(422))), Zo(n, r, S, o)) : r.memoizedState !== null ? (r.child = n.child, r.flags |= 128, null) : (p = o.fallback, c = r.mode, o = el({ mode: "visible", children: o.children }, c, 0, null), p = gi(p, c, S, null), p.flags |= 2, o.return = r, p.return = r, o.sibling = p, r.child = o, (r.mode & 1) !== 0 && on(r, n.child, null, S), r.child.memoizedState = Yd(S), r.memoizedState = jc, p);
    if ((r.mode & 1) === 0) return Zo(n, r, S, null);
    if (c.data === "$!") {
      if (o = c.nextSibling && c.nextSibling.dataset, o) var T = o.dgst;
      return o = T, p = Error(m(419)), o = Pd(p, o, void 0), Zo(n, r, S, o);
    }
    if (T = (S & n.childLanes) !== 0, Sn || T) {
      if (o = kn, o !== null) {
        switch (S & -S) {
          case 4:
            c = 2;
            break;
          case 16:
            c = 8;
            break;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            c = 32;
            break;
          case 536870912:
            c = 268435456;
            break;
          default:
            c = 0;
        }
        c = (c & (o.suspendedLanes | S)) !== 0 ? 0 : c, c !== 0 && c !== p.retryLane && (p.retryLane = c, jr(n, c), lr(o, n, c, -1));
      }
      return np(), o = Pd(Error(m(421))), Zo(n, r, S, o);
    }
    return c.data === "$?" ? (r.flags |= 128, r.child = n.child, r = Sg.bind(null, n), c._reactRetry = r, null) : (n = p.treeContext, br = Ha(c.nextSibling), Tr = r, Gt = !0, la = null, n !== null && (yn[ia++] = Ba, yn[ia++] = Ia, yn[ia++] = Vr, Ba = n.id, Ia = n.overflow, Vr = r), r = Qd(r, o.children), r.flags |= 4096, r);
  }
  function Wd(n, r, l) {
    n.lanes |= r;
    var o = n.alternate;
    o !== null && (o.lanes |= r), Ld(n.return, r, l);
  }
  function rr(n, r, l, o, c) {
    var p = n.memoizedState;
    p === null ? n.memoizedState = { isBackwards: r, rendering: null, renderingStartTime: 0, last: o, tail: l, tailMode: c } : (p.isBackwards = r, p.rendering = null, p.renderingStartTime = 0, p.last = o, p.tail = l, p.tailMode = c);
  }
  function Ya(n, r, l) {
    var o = r.pendingProps, c = o.revealOrder, p = o.tail;
    if (Pn(n, r, o.children, l), o = qt.current, (o & 2) !== 0) o = o & 1 | 2, r.flags |= 128;
    else {
      if (n !== null && (n.flags & 128) !== 0) e: for (n = r.child; n !== null; ) {
        if (n.tag === 13) n.memoizedState !== null && Wd(n, l, r);
        else if (n.tag === 19) Wd(n, l, r);
        else if (n.child !== null) {
          n.child.return = n, n = n.child;
          continue;
        }
        if (n === r) break e;
        for (; n.sibling === null; ) {
          if (n.return === null || n.return === r) break e;
          n = n.return;
        }
        n.sibling.return = n.return, n = n.sibling;
      }
      o &= 1;
    }
    if (Pe(qt, o), (r.mode & 1) === 0) r.memoizedState = null;
    else switch (c) {
      case "forwards":
        for (l = r.child, c = null; l !== null; ) n = l.alternate, n !== null && Ec(n) === null && (c = l), l = l.sibling;
        l = c, l === null ? (c = r.child, r.child = null) : (c = l.sibling, l.sibling = null), rr(r, !1, c, l, p);
        break;
      case "backwards":
        for (l = null, c = r.child, r.child = null; c !== null; ) {
          if (n = c.alternate, n !== null && Ec(n) === null) {
            r.child = c;
            break;
          }
          n = c.sibling, c.sibling = l, l = c, c = n;
        }
        rr(r, !0, l, null, p);
        break;
      case "together":
        rr(r, !1, null, null, void 0);
        break;
      default:
        r.memoizedState = null;
    }
    return r.child;
  }
  function oa(n, r) {
    (r.mode & 1) === 0 && n !== null && (n.alternate = null, r.alternate = null, r.flags |= 2);
  }
  function sa(n, r, l) {
    if (n !== null && (r.dependencies = n.dependencies), Ga |= r.lanes, (l & r.childLanes) === 0) return null;
    if (n !== null && r.child !== n.child) throw Error(m(153));
    if (r.child !== null) {
      for (n = r.child, l = Ji(n, n.pendingProps), r.child = l, l.return = r; n.sibling !== null; ) n = n.sibling, l = l.sibling = Ji(n, n.pendingProps), l.return = r;
      l.sibling = null;
    }
    return r.child;
  }
  function Jo(n, r, l) {
    switch (r.tag) {
      case 3:
        zu(r), Yi();
        break;
      case 5:
        oh(r);
        break;
      case 1:
        mn(r.type) && wr(r);
        break;
      case 4:
        Ud(r, r.stateNode.containerInfo);
        break;
      case 10:
        var o = r.type._context, c = r.memoizedProps.value;
        Pe(Pr, o._currentValue), o._currentValue = c;
        break;
      case 13:
        if (o = r.memoizedState, o !== null)
          return o.dehydrated !== null ? (Pe(qt, qt.current & 1), r.flags |= 128, null) : (l & r.child.childLanes) !== 0 ? Bc(n, r, l) : (Pe(qt, qt.current & 1), n = sa(n, r, l), n !== null ? n.sibling : null);
        Pe(qt, qt.current & 1);
        break;
      case 19:
        if (o = (l & r.childLanes) !== 0, (n.flags & 128) !== 0) {
          if (o) return Ya(n, r, l);
          r.flags |= 128;
        }
        if (c = r.memoizedState, c !== null && (c.rendering = null, c.tail = null, c.lastEffect = null), Pe(qt, qt.current), o) break;
        return null;
      case 22:
      case 23:
        return r.lanes = 0, Xo(n, r, l);
    }
    return sa(n, r, l);
  }
  var ca, En, gh, Sh;
  ca = function(n, r) {
    for (var l = r.child; l !== null; ) {
      if (l.tag === 5 || l.tag === 6) n.appendChild(l.stateNode);
      else if (l.tag !== 4 && l.child !== null) {
        l.child.return = l, l = l.child;
        continue;
      }
      if (l === r) break;
      for (; l.sibling === null; ) {
        if (l.return === null || l.return === r) return;
        l = l.return;
      }
      l.sibling.return = l.return, l = l.sibling;
    }
  }, En = function() {
  }, gh = function(n, r, l, o) {
    var c = n.memoizedProps;
    if (c !== o) {
      n = r.stateNode, Al($a.current);
      var p = null;
      switch (l) {
        case "input":
          c = dt(n, c), o = dt(n, o), p = [];
          break;
        case "select":
          c = G({}, c, { value: void 0 }), o = G({}, o, { value: void 0 }), p = [];
          break;
        case "textarea":
          c = Ve(n, c), o = Ve(n, o), p = [];
          break;
        default:
          typeof c.onClick != "function" && typeof o.onClick == "function" && (n.onclick = Vi);
      }
      _t(l, o);
      var S;
      l = null;
      for (Y in c) if (!o.hasOwnProperty(Y) && c.hasOwnProperty(Y) && c[Y] != null) if (Y === "style") {
        var T = c[Y];
        for (S in T) T.hasOwnProperty(S) && (l || (l = {}), l[S] = "");
      } else Y !== "dangerouslySetInnerHTML" && Y !== "children" && Y !== "suppressContentEditableWarning" && Y !== "suppressHydrationWarning" && Y !== "autoFocus" && (R.hasOwnProperty(Y) ? p || (p = []) : (p = p || []).push(Y, null));
      for (Y in o) {
        var O = o[Y];
        if (T = c != null ? c[Y] : void 0, o.hasOwnProperty(Y) && O !== T && (O != null || T != null)) if (Y === "style") if (T) {
          for (S in T) !T.hasOwnProperty(S) || O && O.hasOwnProperty(S) || (l || (l = {}), l[S] = "");
          for (S in O) O.hasOwnProperty(S) && T[S] !== O[S] && (l || (l = {}), l[S] = O[S]);
        } else l || (p || (p = []), p.push(
          Y,
          l
        )), l = O;
        else Y === "dangerouslySetInnerHTML" ? (O = O ? O.__html : void 0, T = T ? T.__html : void 0, O != null && T !== O && (p = p || []).push(Y, O)) : Y === "children" ? typeof O != "string" && typeof O != "number" || (p = p || []).push(Y, "" + O) : Y !== "suppressContentEditableWarning" && Y !== "suppressHydrationWarning" && (R.hasOwnProperty(Y) ? (O != null && Y === "onScroll" && kt("scroll", n), p || T === O || (p = [])) : (p = p || []).push(Y, O));
      }
      l && (p = p || []).push("style", l);
      var Y = p;
      (r.updateQueue = Y) && (r.flags |= 4);
    }
  }, Sh = function(n, r, l, o) {
    l !== o && (r.flags |= 4);
  };
  function es(n, r) {
    if (!Gt) switch (n.tailMode) {
      case "hidden":
        r = n.tail;
        for (var l = null; r !== null; ) r.alternate !== null && (l = r), r = r.sibling;
        l === null ? n.tail = null : l.sibling = null;
        break;
      case "collapsed":
        l = n.tail;
        for (var o = null; l !== null; ) l.alternate !== null && (o = l), l = l.sibling;
        o === null ? r || n.tail === null ? n.tail = null : n.tail.sibling = null : o.sibling = null;
    }
  }
  function _n(n) {
    var r = n.alternate !== null && n.alternate.child === n.child, l = 0, o = 0;
    if (r) for (var c = n.child; c !== null; ) l |= c.lanes | c.childLanes, o |= c.subtreeFlags & 14680064, o |= c.flags & 14680064, c.return = n, c = c.sibling;
    else for (c = n.child; c !== null; ) l |= c.lanes | c.childLanes, o |= c.subtreeFlags, o |= c.flags, c.return = n, c = c.sibling;
    return n.subtreeFlags |= o, n.childLanes = l, r;
  }
  function Eh(n, r, l) {
    var o = r.pendingProps;
    switch (hc(r), r.tag) {
      case 2:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return _n(r), null;
      case 1:
        return mn(r.type) && Ou(), _n(r), null;
      case 3:
        return o = r.stateNode, Ul(), jt(bn), jt(rn), Be(), o.pendingContext && (o.context = o.pendingContext, o.pendingContext = null), (n === null || n.child === null) && (mc(r) ? r.flags |= 4 : n === null || n.memoizedState.isDehydrated && (r.flags & 256) === 0 || (r.flags |= 1024, la !== null && (Wl(la), la = null))), En(n, r), _n(r), null;
      case 5:
        Sc(r);
        var c = Al(Vo.current);
        if (l = r.type, n !== null && r.stateNode != null) gh(n, r, l, o, c), n.ref !== r.ref && (r.flags |= 512, r.flags |= 2097152);
        else {
          if (!o) {
            if (r.stateNode === null) throw Error(m(166));
            return _n(r), null;
          }
          if (n = Al($a.current), mc(r)) {
            o = r.stateNode, l = r.type;
            var p = r.memoizedProps;
            switch (o[Va] = r, o[_o] = p, n = (r.mode & 1) !== 0, l) {
              case "dialog":
                kt("cancel", o), kt("close", o);
                break;
              case "iframe":
              case "object":
              case "embed":
                kt("load", o);
                break;
              case "video":
              case "audio":
                for (c = 0; c < Oo.length; c++) kt(Oo[c], o);
                break;
              case "source":
                kt("error", o);
                break;
              case "img":
              case "image":
              case "link":
                kt(
                  "error",
                  o
                ), kt("load", o);
                break;
              case "details":
                kt("toggle", o);
                break;
              case "input":
                pt(o, p), kt("invalid", o);
                break;
              case "select":
                o._wrapperState = { wasMultiple: !!p.multiple }, kt("invalid", o);
                break;
              case "textarea":
                Lt(o, p), kt("invalid", o);
            }
            _t(l, p), c = null;
            for (var S in p) if (p.hasOwnProperty(S)) {
              var T = p[S];
              S === "children" ? typeof T == "string" ? o.textContent !== T && (p.suppressHydrationWarning !== !0 && oc(o.textContent, T, n), c = ["children", T]) : typeof T == "number" && o.textContent !== "" + T && (p.suppressHydrationWarning !== !0 && oc(
                o.textContent,
                T,
                n
              ), c = ["children", "" + T]) : R.hasOwnProperty(S) && T != null && S === "onScroll" && kt("scroll", o);
            }
            switch (l) {
              case "input":
                Ue(o), Mn(o, p, !0);
                break;
              case "textarea":
                Ue(o), Un(o);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof p.onClick == "function" && (o.onclick = Vi);
            }
            o = c, r.updateQueue = o, o !== null && (r.flags |= 4);
          } else {
            S = c.nodeType === 9 ? c : c.ownerDocument, n === "http://www.w3.org/1999/xhtml" && (n = tr(l)), n === "http://www.w3.org/1999/xhtml" ? l === "script" ? (n = S.createElement("div"), n.innerHTML = "<script><\/script>", n = n.removeChild(n.firstChild)) : typeof o.is == "string" ? n = S.createElement(l, { is: o.is }) : (n = S.createElement(l), l === "select" && (S = n, o.multiple ? S.multiple = !0 : o.size && (S.size = o.size))) : n = S.createElementNS(n, l), n[Va] = r, n[_o] = o, ca(n, r, !1, !1), r.stateNode = n;
            e: {
              switch (S = Tn(l, o), l) {
                case "dialog":
                  kt("cancel", n), kt("close", n), c = o;
                  break;
                case "iframe":
                case "object":
                case "embed":
                  kt("load", n), c = o;
                  break;
                case "video":
                case "audio":
                  for (c = 0; c < Oo.length; c++) kt(Oo[c], n);
                  c = o;
                  break;
                case "source":
                  kt("error", n), c = o;
                  break;
                case "img":
                case "image":
                case "link":
                  kt(
                    "error",
                    n
                  ), kt("load", n), c = o;
                  break;
                case "details":
                  kt("toggle", n), c = o;
                  break;
                case "input":
                  pt(n, o), c = dt(n, o), kt("invalid", n);
                  break;
                case "option":
                  c = o;
                  break;
                case "select":
                  n._wrapperState = { wasMultiple: !!o.multiple }, c = G({}, o, { value: void 0 }), kt("invalid", n);
                  break;
                case "textarea":
                  Lt(n, o), c = Ve(n, o), kt("invalid", n);
                  break;
                default:
                  c = o;
              }
              _t(l, c), T = c;
              for (p in T) if (T.hasOwnProperty(p)) {
                var O = T[p];
                p === "style" ? It(n, O) : p === "dangerouslySetInnerHTML" ? (O = O ? O.__html : void 0, O != null && Sr(n, O)) : p === "children" ? typeof O == "string" ? (l !== "textarea" || O !== "") && me(n, O) : typeof O == "number" && me(n, "" + O) : p !== "suppressContentEditableWarning" && p !== "suppressHydrationWarning" && p !== "autoFocus" && (R.hasOwnProperty(p) ? O != null && p === "onScroll" && kt("scroll", n) : O != null && K(n, p, O, S));
              }
              switch (l) {
                case "input":
                  Ue(n), Mn(n, o, !1);
                  break;
                case "textarea":
                  Ue(n), Un(n);
                  break;
                case "option":
                  o.value != null && n.setAttribute("value", "" + Pt(o.value));
                  break;
                case "select":
                  n.multiple = !!o.multiple, p = o.value, p != null ? Re(n, !!o.multiple, p, !1) : o.defaultValue != null && Re(
                    n,
                    !!o.multiple,
                    o.defaultValue,
                    !0
                  );
                  break;
                default:
                  typeof c.onClick == "function" && (n.onclick = Vi);
              }
              switch (l) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  o = !!o.autoFocus;
                  break e;
                case "img":
                  o = !0;
                  break e;
                default:
                  o = !1;
              }
            }
            o && (r.flags |= 4);
          }
          r.ref !== null && (r.flags |= 512, r.flags |= 2097152);
        }
        return _n(r), null;
      case 6:
        if (n && r.stateNode != null) Sh(n, r, n.memoizedProps, o);
        else {
          if (typeof o != "string" && r.stateNode === null) throw Error(m(166));
          if (l = Al(Vo.current), Al($a.current), mc(r)) {
            if (o = r.stateNode, l = r.memoizedProps, o[Va] = r, (p = o.nodeValue !== l) && (n = Tr, n !== null)) switch (n.tag) {
              case 3:
                oc(o.nodeValue, l, (n.mode & 1) !== 0);
                break;
              case 5:
                n.memoizedProps.suppressHydrationWarning !== !0 && oc(o.nodeValue, l, (n.mode & 1) !== 0);
            }
            p && (r.flags |= 4);
          } else o = (l.nodeType === 9 ? l : l.ownerDocument).createTextNode(o), o[Va] = r, r.stateNode = o;
        }
        return _n(r), null;
      case 13:
        if (jt(qt), o = r.memoizedState, n === null || n.memoizedState !== null && n.memoizedState.dehydrated !== null) {
          if (Gt && br !== null && (r.mode & 1) !== 0 && (r.flags & 128) === 0) Ao(), Yi(), r.flags |= 98560, p = !1;
          else if (p = mc(r), o !== null && o.dehydrated !== null) {
            if (n === null) {
              if (!p) throw Error(m(318));
              if (p = r.memoizedState, p = p !== null ? p.dehydrated : null, !p) throw Error(m(317));
              p[Va] = r;
            } else Yi(), (r.flags & 128) === 0 && (r.memoizedState = null), r.flags |= 4;
            _n(r), p = !1;
          } else la !== null && (Wl(la), la = null), p = !0;
          if (!p) return r.flags & 65536 ? r : null;
        }
        return (r.flags & 128) !== 0 ? (r.lanes = l, r) : (o = o !== null, o !== (n !== null && n.memoizedState !== null) && o && (r.child.flags |= 8192, (r.mode & 1) !== 0 && (n === null || (qt.current & 1) !== 0 ? fn === 0 && (fn = 3) : np())), r.updateQueue !== null && (r.flags |= 4), _n(r), null);
      case 4:
        return Ul(), En(n, r), n === null && wu(r.stateNode.containerInfo), _n(r), null;
      case 10:
        return Md(r.type._context), _n(r), null;
      case 17:
        return mn(r.type) && Ou(), _n(r), null;
      case 19:
        if (jt(qt), p = r.memoizedState, p === null) return _n(r), null;
        if (o = (r.flags & 128) !== 0, S = p.rendering, S === null) if (o) es(p, !1);
        else {
          if (fn !== 0 || n !== null && (n.flags & 128) !== 0) for (n = r.child; n !== null; ) {
            if (S = Ec(n), S !== null) {
              for (r.flags |= 128, es(p, !1), o = S.updateQueue, o !== null && (r.updateQueue = o, r.flags |= 4), r.subtreeFlags = 0, o = l, l = r.child; l !== null; ) p = l, n = o, p.flags &= 14680066, S = p.alternate, S === null ? (p.childLanes = 0, p.lanes = n, p.child = null, p.subtreeFlags = 0, p.memoizedProps = null, p.memoizedState = null, p.updateQueue = null, p.dependencies = null, p.stateNode = null) : (p.childLanes = S.childLanes, p.lanes = S.lanes, p.child = S.child, p.subtreeFlags = 0, p.deletions = null, p.memoizedProps = S.memoizedProps, p.memoizedState = S.memoizedState, p.updateQueue = S.updateQueue, p.type = S.type, n = S.dependencies, p.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }), l = l.sibling;
              return Pe(qt, qt.current & 1 | 2), r.child;
            }
            n = n.sibling;
          }
          p.tail !== null && Ht() > Hu && (r.flags |= 128, o = !0, es(p, !1), r.lanes = 4194304);
        }
        else {
          if (!o) if (n = Ec(S), n !== null) {
            if (r.flags |= 128, o = !0, l = n.updateQueue, l !== null && (r.updateQueue = l, r.flags |= 4), es(p, !0), p.tail === null && p.tailMode === "hidden" && !S.alternate && !Gt) return _n(r), null;
          } else 2 * Ht() - p.renderingStartTime > Hu && l !== 1073741824 && (r.flags |= 128, o = !0, es(p, !1), r.lanes = 4194304);
          p.isBackwards ? (S.sibling = r.child, r.child = S) : (l = p.last, l !== null ? l.sibling = S : r.child = S, p.last = S);
        }
        return p.tail !== null ? (r = p.tail, p.rendering = r, p.tail = r.sibling, p.renderingStartTime = Ht(), r.sibling = null, l = qt.current, Pe(qt, o ? l & 1 | 2 : l & 1), r) : (_n(r), null);
      case 22:
      case 23:
        return tp(), o = r.memoizedState !== null, n !== null && n.memoizedState !== null !== o && (r.flags |= 8192), o && (r.mode & 1) !== 0 ? ($r & 1073741824) !== 0 && (_n(r), r.subtreeFlags & 6 && (r.flags |= 8192)) : _n(r), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(m(156, r.tag));
  }
  function Ic(n, r) {
    switch (hc(r), r.tag) {
      case 1:
        return mn(r.type) && Ou(), n = r.flags, n & 65536 ? (r.flags = n & -65537 | 128, r) : null;
      case 3:
        return Ul(), jt(bn), jt(rn), Be(), n = r.flags, (n & 65536) !== 0 && (n & 128) === 0 ? (r.flags = n & -65537 | 128, r) : null;
      case 5:
        return Sc(r), null;
      case 13:
        if (jt(qt), n = r.memoizedState, n !== null && n.dehydrated !== null) {
          if (r.alternate === null) throw Error(m(340));
          Yi();
        }
        return n = r.flags, n & 65536 ? (r.flags = n & -65537 | 128, r) : null;
      case 19:
        return jt(qt), null;
      case 4:
        return Ul(), null;
      case 10:
        return Md(r.type._context), null;
      case 22:
      case 23:
        return tp(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var ts = !1, Jn = !1, dg = typeof WeakSet == "function" ? WeakSet : Set, De = null;
  function Au(n, r) {
    var l = n.ref;
    if (l !== null) if (typeof l == "function") try {
      l(null);
    } catch (o) {
      Kt(n, r, o);
    }
    else l.current = null;
  }
  function $c(n, r, l) {
    try {
      l();
    } catch (o) {
      Kt(n, r, o);
    }
  }
  var Ch = !1;
  function Rh(n, r) {
    if (Lo = Rl, n = Do(), ec(n)) {
      if ("selectionStart" in n) var l = { start: n.selectionStart, end: n.selectionEnd };
      else e: {
        l = (l = n.ownerDocument) && l.defaultView || window;
        var o = l.getSelection && l.getSelection();
        if (o && o.rangeCount !== 0) {
          l = o.anchorNode;
          var c = o.anchorOffset, p = o.focusNode;
          o = o.focusOffset;
          try {
            l.nodeType, p.nodeType;
          } catch {
            l = null;
            break e;
          }
          var S = 0, T = -1, O = -1, Y = 0, le = 0, se = n, ie = null;
          t: for (; ; ) {
            for (var we; se !== l || c !== 0 && se.nodeType !== 3 || (T = S + c), se !== p || o !== 0 && se.nodeType !== 3 || (O = S + o), se.nodeType === 3 && (S += se.nodeValue.length), (we = se.firstChild) !== null; )
              ie = se, se = we;
            for (; ; ) {
              if (se === n) break t;
              if (ie === l && ++Y === c && (T = S), ie === p && ++le === o && (O = S), (we = se.nextSibling) !== null) break;
              se = ie, ie = se.parentNode;
            }
            se = we;
          }
          l = T === -1 || O === -1 ? null : { start: T, end: O };
        } else l = null;
      }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (Ol = { focusedElem: n, selectionRange: l }, Rl = !1, De = r; De !== null; ) if (r = De, n = r.child, (r.subtreeFlags & 1028) !== 0 && n !== null) n.return = r, De = n;
    else for (; De !== null; ) {
      r = De;
      try {
        var Le = r.alternate;
        if ((r.flags & 1024) !== 0) switch (r.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if (Le !== null) {
              var ze = Le.memoizedProps, dn = Le.memoizedState, V = r.stateNode, N = V.getSnapshotBeforeUpdate(r.elementType === r.type ? ze : ka(r.type, ze), dn);
              V.__reactInternalSnapshotBeforeUpdate = N;
            }
            break;
          case 3:
            var B = r.stateNode.containerInfo;
            B.nodeType === 1 ? B.textContent = "" : B.nodeType === 9 && B.documentElement && B.removeChild(B.documentElement);
            break;
          case 5:
          case 6:
          case 4:
          case 17:
            break;
          default:
            throw Error(m(163));
        }
      } catch (ue) {
        Kt(r, r.return, ue);
      }
      if (n = r.sibling, n !== null) {
        n.return = r.return, De = n;
        break;
      }
      De = r.return;
    }
    return Le = Ch, Ch = !1, Le;
  }
  function ns(n, r, l) {
    var o = r.updateQueue;
    if (o = o !== null ? o.lastEffect : null, o !== null) {
      var c = o = o.next;
      do {
        if ((c.tag & n) === n) {
          var p = c.destroy;
          c.destroy = void 0, p !== void 0 && $c(r, l, p);
        }
        c = c.next;
      } while (c !== o);
    }
  }
  function rs(n, r) {
    if (r = r.updateQueue, r = r !== null ? r.lastEffect : null, r !== null) {
      var l = r = r.next;
      do {
        if ((l.tag & n) === n) {
          var o = l.create;
          l.destroy = o();
        }
        l = l.next;
      } while (l !== r);
    }
  }
  function Gd(n) {
    var r = n.ref;
    if (r !== null) {
      var l = n.stateNode;
      switch (n.tag) {
        case 5:
          n = l;
          break;
        default:
          n = l;
      }
      typeof r == "function" ? r(n) : r.current = n;
    }
  }
  function Yc(n) {
    var r = n.alternate;
    r !== null && (n.alternate = null, Yc(r)), n.child = null, n.deletions = null, n.sibling = null, n.tag === 5 && (r = n.stateNode, r !== null && (delete r[Va], delete r[_o], delete r[No], delete r[ku], delete r[cg])), n.stateNode = null, n.return = null, n.dependencies = null, n.memoizedProps = null, n.memoizedState = null, n.pendingProps = null, n.stateNode = null, n.updateQueue = null;
  }
  function as(n) {
    return n.tag === 5 || n.tag === 3 || n.tag === 4;
  }
  function hi(n) {
    e: for (; ; ) {
      for (; n.sibling === null; ) {
        if (n.return === null || as(n.return)) return null;
        n = n.return;
      }
      for (n.sibling.return = n.return, n = n.sibling; n.tag !== 5 && n.tag !== 6 && n.tag !== 18; ) {
        if (n.flags & 2 || n.child === null || n.tag === 4) continue e;
        n.child.return = n, n = n.child;
      }
      if (!(n.flags & 2)) return n.stateNode;
    }
  }
  function Qa(n, r, l) {
    var o = n.tag;
    if (o === 5 || o === 6) n = n.stateNode, r ? l.nodeType === 8 ? l.parentNode.insertBefore(n, r) : l.insertBefore(n, r) : (l.nodeType === 8 ? (r = l.parentNode, r.insertBefore(n, l)) : (r = l, r.appendChild(n)), l = l._reactRootContainer, l != null || r.onclick !== null || (r.onclick = Vi));
    else if (o !== 4 && (n = n.child, n !== null)) for (Qa(n, r, l), n = n.sibling; n !== null; ) Qa(n, r, l), n = n.sibling;
  }
  function Wa(n, r, l) {
    var o = n.tag;
    if (o === 5 || o === 6) n = n.stateNode, r ? l.insertBefore(n, r) : l.appendChild(n);
    else if (o !== 4 && (n = n.child, n !== null)) for (Wa(n, r, l), n = n.sibling; n !== null; ) Wa(n, r, l), n = n.sibling;
  }
  var cn = null, ar = !1;
  function ir(n, r, l) {
    for (l = l.child; l !== null; ) xh(n, r, l), l = l.sibling;
  }
  function xh(n, r, l) {
    if (Ra && typeof Ra.onCommitFiberUnmount == "function") try {
      Ra.onCommitFiberUnmount(mo, l);
    } catch {
    }
    switch (l.tag) {
      case 5:
        Jn || Au(l, r);
      case 6:
        var o = cn, c = ar;
        cn = null, ir(n, r, l), cn = o, ar = c, cn !== null && (ar ? (n = cn, l = l.stateNode, n.nodeType === 8 ? n.parentNode.removeChild(l) : n.removeChild(l)) : cn.removeChild(l.stateNode));
        break;
      case 18:
        cn !== null && (ar ? (n = cn, l = l.stateNode, n.nodeType === 8 ? Du(n.parentNode, l) : n.nodeType === 1 && Du(n, l), Ui(n)) : Du(cn, l.stateNode));
        break;
      case 4:
        o = cn, c = ar, cn = l.stateNode.containerInfo, ar = !0, ir(n, r, l), cn = o, ar = c;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!Jn && (o = l.updateQueue, o !== null && (o = o.lastEffect, o !== null))) {
          c = o = o.next;
          do {
            var p = c, S = p.destroy;
            p = p.tag, S !== void 0 && ((p & 2) !== 0 || (p & 4) !== 0) && $c(l, r, S), c = c.next;
          } while (c !== o);
        }
        ir(n, r, l);
        break;
      case 1:
        if (!Jn && (Au(l, r), o = l.stateNode, typeof o.componentWillUnmount == "function")) try {
          o.props = l.memoizedProps, o.state = l.memoizedState, o.componentWillUnmount();
        } catch (T) {
          Kt(l, r, T);
        }
        ir(n, r, l);
        break;
      case 21:
        ir(n, r, l);
        break;
      case 22:
        l.mode & 1 ? (Jn = (o = Jn) || l.memoizedState !== null, ir(n, r, l), Jn = o) : ir(n, r, l);
        break;
      default:
        ir(n, r, l);
    }
  }
  function wh(n) {
    var r = n.updateQueue;
    if (r !== null) {
      n.updateQueue = null;
      var l = n.stateNode;
      l === null && (l = n.stateNode = new dg()), r.forEach(function(o) {
        var c = Nh.bind(null, n, o);
        l.has(o) || (l.add(o), o.then(c, c));
      });
    }
  }
  function Oa(n, r) {
    var l = r.deletions;
    if (l !== null) for (var o = 0; o < l.length; o++) {
      var c = l[o];
      try {
        var p = n, S = r, T = S;
        e: for (; T !== null; ) {
          switch (T.tag) {
            case 5:
              cn = T.stateNode, ar = !1;
              break e;
            case 3:
              cn = T.stateNode.containerInfo, ar = !0;
              break e;
            case 4:
              cn = T.stateNode.containerInfo, ar = !0;
              break e;
          }
          T = T.return;
        }
        if (cn === null) throw Error(m(160));
        xh(p, S, c), cn = null, ar = !1;
        var O = c.alternate;
        O !== null && (O.return = null), c.return = null;
      } catch (Y) {
        Kt(c, r, Y);
      }
    }
    if (r.subtreeFlags & 12854) for (r = r.child; r !== null; ) Kd(r, n), r = r.sibling;
  }
  function Kd(n, r) {
    var l = n.alternate, o = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (Oa(r, n), Or(n), o & 4) {
          try {
            ns(3, n, n.return), rs(3, n);
          } catch (ze) {
            Kt(n, n.return, ze);
          }
          try {
            ns(5, n, n.return);
          } catch (ze) {
            Kt(n, n.return, ze);
          }
        }
        break;
      case 1:
        Oa(r, n), Or(n), o & 512 && l !== null && Au(l, l.return);
        break;
      case 5:
        if (Oa(r, n), Or(n), o & 512 && l !== null && Au(l, l.return), n.flags & 32) {
          var c = n.stateNode;
          try {
            me(c, "");
          } catch (ze) {
            Kt(n, n.return, ze);
          }
        }
        if (o & 4 && (c = n.stateNode, c != null)) {
          var p = n.memoizedProps, S = l !== null ? l.memoizedProps : p, T = n.type, O = n.updateQueue;
          if (n.updateQueue = null, O !== null) try {
            T === "input" && p.type === "radio" && p.name != null && gt(c, p), Tn(T, S);
            var Y = Tn(T, p);
            for (S = 0; S < O.length; S += 2) {
              var le = O[S], se = O[S + 1];
              le === "style" ? It(c, se) : le === "dangerouslySetInnerHTML" ? Sr(c, se) : le === "children" ? me(c, se) : K(c, le, se, Y);
            }
            switch (T) {
              case "input":
                vn(c, p);
                break;
              case "textarea":
                Jt(c, p);
                break;
              case "select":
                var ie = c._wrapperState.wasMultiple;
                c._wrapperState.wasMultiple = !!p.multiple;
                var we = p.value;
                we != null ? Re(c, !!p.multiple, we, !1) : ie !== !!p.multiple && (p.defaultValue != null ? Re(
                  c,
                  !!p.multiple,
                  p.defaultValue,
                  !0
                ) : Re(c, !!p.multiple, p.multiple ? [] : "", !1));
            }
            c[_o] = p;
          } catch (ze) {
            Kt(n, n.return, ze);
          }
        }
        break;
      case 6:
        if (Oa(r, n), Or(n), o & 4) {
          if (n.stateNode === null) throw Error(m(162));
          c = n.stateNode, p = n.memoizedProps;
          try {
            c.nodeValue = p;
          } catch (ze) {
            Kt(n, n.return, ze);
          }
        }
        break;
      case 3:
        if (Oa(r, n), Or(n), o & 4 && l !== null && l.memoizedState.isDehydrated) try {
          Ui(r.containerInfo);
        } catch (ze) {
          Kt(n, n.return, ze);
        }
        break;
      case 4:
        Oa(r, n), Or(n);
        break;
      case 13:
        Oa(r, n), Or(n), c = n.child, c.flags & 8192 && (p = c.memoizedState !== null, c.stateNode.isHidden = p, !p || c.alternate !== null && c.alternate.memoizedState !== null || (Zd = Ht())), o & 4 && wh(n);
        break;
      case 22:
        if (le = l !== null && l.memoizedState !== null, n.mode & 1 ? (Jn = (Y = Jn) || le, Oa(r, n), Jn = Y) : Oa(r, n), Or(n), o & 8192) {
          if (Y = n.memoizedState !== null, (n.stateNode.isHidden = Y) && !le && (n.mode & 1) !== 0) for (De = n, le = n.child; le !== null; ) {
            for (se = De = le; De !== null; ) {
              switch (ie = De, we = ie.child, ie.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  ns(4, ie, ie.return);
                  break;
                case 1:
                  Au(ie, ie.return);
                  var Le = ie.stateNode;
                  if (typeof Le.componentWillUnmount == "function") {
                    o = ie, l = ie.return;
                    try {
                      r = o, Le.props = r.memoizedProps, Le.state = r.memoizedState, Le.componentWillUnmount();
                    } catch (ze) {
                      Kt(o, l, ze);
                    }
                  }
                  break;
                case 5:
                  Au(ie, ie.return);
                  break;
                case 22:
                  if (ie.memoizedState !== null) {
                    is(se);
                    continue;
                  }
              }
              we !== null ? (we.return = ie, De = we) : is(se);
            }
            le = le.sibling;
          }
          e: for (le = null, se = n; ; ) {
            if (se.tag === 5) {
              if (le === null) {
                le = se;
                try {
                  c = se.stateNode, Y ? (p = c.style, typeof p.setProperty == "function" ? p.setProperty("display", "none", "important") : p.display = "none") : (T = se.stateNode, O = se.memoizedProps.style, S = O != null && O.hasOwnProperty("display") ? O.display : null, T.style.display = Dt("display", S));
                } catch (ze) {
                  Kt(n, n.return, ze);
                }
              }
            } else if (se.tag === 6) {
              if (le === null) try {
                se.stateNode.nodeValue = Y ? "" : se.memoizedProps;
              } catch (ze) {
                Kt(n, n.return, ze);
              }
            } else if ((se.tag !== 22 && se.tag !== 23 || se.memoizedState === null || se === n) && se.child !== null) {
              se.child.return = se, se = se.child;
              continue;
            }
            if (se === n) break e;
            for (; se.sibling === null; ) {
              if (se.return === null || se.return === n) break e;
              le === se && (le = null), se = se.return;
            }
            le === se && (le = null), se.sibling.return = se.return, se = se.sibling;
          }
        }
        break;
      case 19:
        Oa(r, n), Or(n), o & 4 && wh(n);
        break;
      case 21:
        break;
      default:
        Oa(
          r,
          n
        ), Or(n);
    }
  }
  function Or(n) {
    var r = n.flags;
    if (r & 2) {
      try {
        e: {
          for (var l = n.return; l !== null; ) {
            if (as(l)) {
              var o = l;
              break e;
            }
            l = l.return;
          }
          throw Error(m(160));
        }
        switch (o.tag) {
          case 5:
            var c = o.stateNode;
            o.flags & 32 && (me(c, ""), o.flags &= -33);
            var p = hi(n);
            Wa(n, p, c);
            break;
          case 3:
          case 4:
            var S = o.stateNode.containerInfo, T = hi(n);
            Qa(n, T, S);
            break;
          default:
            throw Error(m(161));
        }
      } catch (O) {
        Kt(n, n.return, O);
      }
      n.flags &= -3;
    }
    r & 4096 && (n.flags &= -4097);
  }
  function pg(n, r, l) {
    De = n, Xd(n);
  }
  function Xd(n, r, l) {
    for (var o = (n.mode & 1) !== 0; De !== null; ) {
      var c = De, p = c.child;
      if (c.tag === 22 && o) {
        var S = c.memoizedState !== null || ts;
        if (!S) {
          var T = c.alternate, O = T !== null && T.memoizedState !== null || Jn;
          T = ts;
          var Y = Jn;
          if (ts = S, (Jn = O) && !Y) for (De = c; De !== null; ) S = De, O = S.child, S.tag === 22 && S.memoizedState !== null ? qd(c) : O !== null ? (O.return = S, De = O) : qd(c);
          for (; p !== null; ) De = p, Xd(p), p = p.sibling;
          De = c, ts = T, Jn = Y;
        }
        Th(n);
      } else (c.subtreeFlags & 8772) !== 0 && p !== null ? (p.return = c, De = p) : Th(n);
    }
  }
  function Th(n) {
    for (; De !== null; ) {
      var r = De;
      if ((r.flags & 8772) !== 0) {
        var l = r.alternate;
        try {
          if ((r.flags & 8772) !== 0) switch (r.tag) {
            case 0:
            case 11:
            case 15:
              Jn || rs(5, r);
              break;
            case 1:
              var o = r.stateNode;
              if (r.flags & 4 && !Jn) if (l === null) o.componentDidMount();
              else {
                var c = r.elementType === r.type ? l.memoizedProps : ka(r.type, l.memoizedProps);
                o.componentDidUpdate(c, l.memoizedState, o.__reactInternalSnapshotBeforeUpdate);
              }
              var p = r.updateQueue;
              p !== null && Ad(r, p, o);
              break;
            case 3:
              var S = r.updateQueue;
              if (S !== null) {
                if (l = null, r.child !== null) switch (r.child.tag) {
                  case 5:
                    l = r.child.stateNode;
                    break;
                  case 1:
                    l = r.child.stateNode;
                }
                Ad(r, S, l);
              }
              break;
            case 5:
              var T = r.stateNode;
              if (l === null && r.flags & 4) {
                l = T;
                var O = r.memoizedProps;
                switch (r.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    O.autoFocus && l.focus();
                    break;
                  case "img":
                    O.src && (l.src = O.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (r.memoizedState === null) {
                var Y = r.alternate;
                if (Y !== null) {
                  var le = Y.memoizedState;
                  if (le !== null) {
                    var se = le.dehydrated;
                    se !== null && Ui(se);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(m(163));
          }
          Jn || r.flags & 512 && Gd(r);
        } catch (ie) {
          Kt(r, r.return, ie);
        }
      }
      if (r === n) {
        De = null;
        break;
      }
      if (l = r.sibling, l !== null) {
        l.return = r.return, De = l;
        break;
      }
      De = r.return;
    }
  }
  function is(n) {
    for (; De !== null; ) {
      var r = De;
      if (r === n) {
        De = null;
        break;
      }
      var l = r.sibling;
      if (l !== null) {
        l.return = r.return, De = l;
        break;
      }
      De = r.return;
    }
  }
  function qd(n) {
    for (; De !== null; ) {
      var r = De;
      try {
        switch (r.tag) {
          case 0:
          case 11:
          case 15:
            var l = r.return;
            try {
              rs(4, r);
            } catch (O) {
              Kt(r, l, O);
            }
            break;
          case 1:
            var o = r.stateNode;
            if (typeof o.componentDidMount == "function") {
              var c = r.return;
              try {
                o.componentDidMount();
              } catch (O) {
                Kt(r, c, O);
              }
            }
            var p = r.return;
            try {
              Gd(r);
            } catch (O) {
              Kt(r, p, O);
            }
            break;
          case 5:
            var S = r.return;
            try {
              Gd(r);
            } catch (O) {
              Kt(r, S, O);
            }
        }
      } catch (O) {
        Kt(r, r.return, O);
      }
      if (r === n) {
        De = null;
        break;
      }
      var T = r.sibling;
      if (T !== null) {
        T.return = r.return, De = T;
        break;
      }
      De = r.return;
    }
  }
  var vg = Math.ceil, Xi = pe.ReactCurrentDispatcher, Yl = pe.ReactCurrentOwner, jn = pe.ReactCurrentBatchConfig, ht = 0, kn = null, Cn = null, Bn = 0, $r = 0, Uu = ba(0), fn = 0, ls = null, Ga = 0, Fu = 0, Qc = 0, us = null, Mr = null, Zd = 0, Hu = 1 / 0, Yr = null, Vu = !1, Ql = null, qi = null, Wc = !1, mi = null, os = 0, Zi = 0, Pu = null, ss = -1, er = 0;
  function Rn() {
    return (ht & 6) !== 0 ? Ht() : ss !== -1 ? ss : ss = Ht();
  }
  function Ka(n) {
    return (n.mode & 1) === 0 ? 1 : (ht & 2) !== 0 && Bn !== 0 ? Bn & -Bn : fg.transition !== null ? (er === 0 && (er = Ps()), er) : (n = Nt, n !== 0 || (n = window.event, n = n === void 0 ? 16 : $s(n.type)), n);
  }
  function lr(n, r, l, o) {
    if (50 < Zi) throw Zi = 0, Pu = null, Error(m(185));
    El(n, l, o), ((ht & 2) === 0 || n !== kn) && (n === kn && ((ht & 2) === 0 && (Fu |= l), fn === 4 && Ma(n, Bn)), Lr(n, o), l === 1 && ht === 0 && (r.mode & 1) === 0 && (Hu = Ht() + 500, Mu && ja()));
  }
  function Lr(n, r) {
    var l = n.callbackNode;
    Gf(n, r);
    var o = Sl(n, n === kn ? Bn : 0);
    if (o === 0) l !== null && Ev(l), n.callbackNode = null, n.callbackPriority = 0;
    else if (r = o & -o, n.callbackPriority !== r) {
      if (l != null && Ev(l), r === 1) n.tag === 0 ? ji(Jd.bind(null, n)) : pc(Jd.bind(null, n)), bu(function() {
        (ht & 6) === 0 && ja();
      }), l = null;
      else {
        switch (qf(o)) {
          case 1:
            l = yl;
            break;
          case 4:
            l = Yf;
            break;
          case 16:
            l = ho;
            break;
          case 536870912:
            l = Qf;
            break;
          default:
            l = ho;
        }
        l = Ah(l, Gc.bind(null, n));
      }
      n.callbackPriority = r, n.callbackNode = l;
    }
  }
  function Gc(n, r) {
    if (ss = -1, er = 0, (ht & 6) !== 0) throw Error(m(327));
    var l = n.callbackNode;
    if (ju() && n.callbackNode !== l) return null;
    var o = Sl(n, n === kn ? Bn : 0);
    if (o === 0) return null;
    if ((o & 30) !== 0 || (o & n.expiredLanes) !== 0 || r) r = Kc(n, o);
    else {
      r = o;
      var c = ht;
      ht |= 2;
      var p = Dh();
      (kn !== n || Bn !== r) && (Yr = null, Hu = Ht() + 500, yi(n, r));
      do
        try {
          kh();
          break;
        } catch (T) {
          bh(n, T);
        }
      while (!0);
      Od(), Xi.current = p, ht = c, Cn !== null ? r = 0 : (kn = null, Bn = 0, r = fn);
    }
    if (r !== 0) {
      if (r === 2 && (c = Kf(n), c !== 0 && (o = c, r = cs(n, c))), r === 1) throw l = ls, yi(n, 0), Ma(n, o), Lr(n, Ht()), l;
      if (r === 6) Ma(n, o);
      else {
        if (c = n.current.alternate, (o & 30) === 0 && !hg(c) && (r = Kc(n, o), r === 2 && (p = Kf(n), p !== 0 && (o = p, r = cs(n, p))), r === 1)) throw l = ls, yi(n, 0), Ma(n, o), Lr(n, Ht()), l;
        switch (n.finishedWork = c, n.finishedLanes = o, r) {
          case 0:
          case 1:
            throw Error(m(345));
          case 2:
            Kl(n, Mr, Yr);
            break;
          case 3:
            if (Ma(n, o), (o & 130023424) === o && (r = Zd + 500 - Ht(), 10 < r)) {
              if (Sl(n, 0) !== 0) break;
              if (c = n.suspendedLanes, (c & o) !== o) {
                Rn(), n.pingedLanes |= n.suspendedLanes & c;
                break;
              }
              n.timeoutHandle = cc(Kl.bind(null, n, Mr, Yr), r);
              break;
            }
            Kl(n, Mr, Yr);
            break;
          case 4:
            if (Ma(n, o), (o & 4194240) === o) break;
            for (r = n.eventTimes, c = -1; 0 < o; ) {
              var S = 31 - Jr(o);
              p = 1 << S, S = r[S], S > c && (c = S), o &= ~p;
            }
            if (o = c, o = Ht() - o, o = (120 > o ? 120 : 480 > o ? 480 : 1080 > o ? 1080 : 1920 > o ? 1920 : 3e3 > o ? 3e3 : 4320 > o ? 4320 : 1960 * vg(o / 1960)) - o, 10 < o) {
              n.timeoutHandle = cc(Kl.bind(null, n, Mr, Yr), o);
              break;
            }
            Kl(n, Mr, Yr);
            break;
          case 5:
            Kl(n, Mr, Yr);
            break;
          default:
            throw Error(m(329));
        }
      }
    }
    return Lr(n, Ht()), n.callbackNode === l ? Gc.bind(null, n) : null;
  }
  function cs(n, r) {
    var l = us;
    return n.current.memoizedState.isDehydrated && (yi(n, r).flags |= 256), n = Kc(n, r), n !== 2 && (r = Mr, Mr = l, r !== null && Wl(r)), n;
  }
  function Wl(n) {
    Mr === null ? Mr = n : Mr.push.apply(Mr, n);
  }
  function hg(n) {
    for (var r = n; ; ) {
      if (r.flags & 16384) {
        var l = r.updateQueue;
        if (l !== null && (l = l.stores, l !== null)) for (var o = 0; o < l.length; o++) {
          var c = l[o], p = c.getSnapshot;
          c = c.value;
          try {
            if (!wa(p(), c)) return !1;
          } catch {
            return !1;
          }
        }
      }
      if (l = r.child, r.subtreeFlags & 16384 && l !== null) l.return = r, r = l;
      else {
        if (r === n) break;
        for (; r.sibling === null; ) {
          if (r.return === null || r.return === n) return !0;
          r = r.return;
        }
        r.sibling.return = r.return, r = r.sibling;
      }
    }
    return !0;
  }
  function Ma(n, r) {
    for (r &= ~Qc, r &= ~Fu, n.suspendedLanes |= r, n.pingedLanes &= ~r, n = n.expirationTimes; 0 < r; ) {
      var l = 31 - Jr(r), o = 1 << l;
      n[l] = -1, r &= ~o;
    }
  }
  function Jd(n) {
    if ((ht & 6) !== 0) throw Error(m(327));
    ju();
    var r = Sl(n, 0);
    if ((r & 1) === 0) return Lr(n, Ht()), null;
    var l = Kc(n, r);
    if (n.tag !== 0 && l === 2) {
      var o = Kf(n);
      o !== 0 && (r = o, l = cs(n, o));
    }
    if (l === 1) throw l = ls, yi(n, 0), Ma(n, r), Lr(n, Ht()), l;
    if (l === 6) throw Error(m(345));
    return n.finishedWork = n.current.alternate, n.finishedLanes = r, Kl(n, Mr, Yr), Lr(n, Ht()), null;
  }
  function ep(n, r) {
    var l = ht;
    ht |= 1;
    try {
      return n(r);
    } finally {
      ht = l, ht === 0 && (Hu = Ht() + 500, Mu && ja());
    }
  }
  function Gl(n) {
    mi !== null && mi.tag === 0 && (ht & 6) === 0 && ju();
    var r = ht;
    ht |= 1;
    var l = jn.transition, o = Nt;
    try {
      if (jn.transition = null, Nt = 1, n) return n();
    } finally {
      Nt = o, jn.transition = l, ht = r, (ht & 6) === 0 && ja();
    }
  }
  function tp() {
    $r = Uu.current, jt(Uu);
  }
  function yi(n, r) {
    n.finishedWork = null, n.finishedLanes = 0;
    var l = n.timeoutHandle;
    if (l !== -1 && (n.timeoutHandle = -1, wd(l)), Cn !== null) for (l = Cn.return; l !== null; ) {
      var o = l;
      switch (hc(o), o.tag) {
        case 1:
          o = o.type.childContextTypes, o != null && Ou();
          break;
        case 3:
          Ul(), jt(bn), jt(rn), Be();
          break;
        case 5:
          Sc(o);
          break;
        case 4:
          Ul();
          break;
        case 13:
          jt(qt);
          break;
        case 19:
          jt(qt);
          break;
        case 10:
          Md(o.type._context);
          break;
        case 22:
        case 23:
          tp();
      }
      l = l.return;
    }
    if (kn = n, Cn = n = Ji(n.current, null), Bn = $r = r, fn = 0, ls = null, Qc = Fu = Ga = 0, Mr = us = null, zl !== null) {
      for (r = 0; r < zl.length; r++) if (l = zl[r], o = l.interleaved, o !== null) {
        l.interleaved = null;
        var c = o.next, p = l.pending;
        if (p !== null) {
          var S = p.next;
          p.next = c, o.next = S;
        }
        l.pending = o;
      }
      zl = null;
    }
    return n;
  }
  function bh(n, r) {
    do {
      var l = Cn;
      try {
        if (Od(), ot.current = Bl, Cc) {
          for (var o = Rt.memoizedState; o !== null; ) {
            var c = o.queue;
            c !== null && (c.pending = null), o = o.next;
          }
          Cc = !1;
        }
        if (At = 0, Ln = gn = Rt = null, jo = !1, Fl = 0, Yl.current = null, l === null || l.return === null) {
          fn = 1, ls = r, Cn = null;
          break;
        }
        e: {
          var p = n, S = l.return, T = l, O = r;
          if (r = Bn, T.flags |= 32768, O !== null && typeof O == "object" && typeof O.then == "function") {
            var Y = O, le = T, se = le.tag;
            if ((le.mode & 1) === 0 && (se === 0 || se === 11 || se === 15)) {
              var ie = le.alternate;
              ie ? (le.updateQueue = ie.updateQueue, le.memoizedState = ie.memoizedState, le.lanes = ie.lanes) : (le.updateQueue = null, le.memoizedState = null);
            }
            var we = ph(S);
            if (we !== null) {
              we.flags &= -257, Ki(we, S, T, p, r), we.mode & 1 && Id(p, Y, r), r = we, O = Y;
              var Le = r.updateQueue;
              if (Le === null) {
                var ze = /* @__PURE__ */ new Set();
                ze.add(O), r.updateQueue = ze;
              } else Le.add(O);
              break e;
            } else {
              if ((r & 1) === 0) {
                Id(p, Y, r), np();
                break e;
              }
              O = Error(m(426));
            }
          } else if (Gt && T.mode & 1) {
            var dn = ph(S);
            if (dn !== null) {
              (dn.flags & 65536) === 0 && (dn.flags |= 256), Ki(dn, S, T, p, r), di(Il(O, T));
              break e;
            }
          }
          p = O = Il(O, T), fn !== 4 && (fn = 2), us === null ? us = [p] : us.push(p), p = S;
          do {
            switch (p.tag) {
              case 3:
                p.flags |= 65536, r &= -r, p.lanes |= r;
                var V = dh(p, O, r);
                uh(p, V);
                break e;
              case 1:
                T = O;
                var N = p.type, B = p.stateNode;
                if ((p.flags & 128) === 0 && (typeof N.getDerivedStateFromError == "function" || B !== null && typeof B.componentDidCatch == "function" && (qi === null || !qi.has(B)))) {
                  p.flags |= 65536, r &= -r, p.lanes |= r;
                  var ue = Bd(p, T, r);
                  uh(p, ue);
                  break e;
                }
            }
            p = p.return;
          } while (p !== null);
        }
        Mh(l);
      } catch (_e) {
        r = _e, Cn === l && l !== null && (Cn = l = l.return);
        continue;
      }
      break;
    } while (!0);
  }
  function Dh() {
    var n = Xi.current;
    return Xi.current = Bl, n === null ? Bl : n;
  }
  function np() {
    (fn === 0 || fn === 3 || fn === 2) && (fn = 4), kn === null || (Ga & 268435455) === 0 && (Fu & 268435455) === 0 || Ma(kn, Bn);
  }
  function Kc(n, r) {
    var l = ht;
    ht |= 2;
    var o = Dh();
    (kn !== n || Bn !== r) && (Yr = null, yi(n, r));
    do
      try {
        mg();
        break;
      } catch (c) {
        bh(n, c);
      }
    while (!0);
    if (Od(), ht = l, Xi.current = o, Cn !== null) throw Error(m(261));
    return kn = null, Bn = 0, fn;
  }
  function mg() {
    for (; Cn !== null; ) Oh(Cn);
  }
  function kh() {
    for (; Cn !== null && !Cv(); ) Oh(Cn);
  }
  function Oh(n) {
    var r = zh(n.alternate, n, $r);
    n.memoizedProps = n.pendingProps, r === null ? Mh(n) : Cn = r, Yl.current = null;
  }
  function Mh(n) {
    var r = n;
    do {
      var l = r.alternate;
      if (n = r.return, (r.flags & 32768) === 0) {
        if (l = Eh(l, r, $r), l !== null) {
          Cn = l;
          return;
        }
      } else {
        if (l = Ic(l, r), l !== null) {
          l.flags &= 32767, Cn = l;
          return;
        }
        if (n !== null) n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null;
        else {
          fn = 6, Cn = null;
          return;
        }
      }
      if (r = r.sibling, r !== null) {
        Cn = r;
        return;
      }
      Cn = r = n;
    } while (r !== null);
    fn === 0 && (fn = 5);
  }
  function Kl(n, r, l) {
    var o = Nt, c = jn.transition;
    try {
      jn.transition = null, Nt = 1, yg(n, r, l, o);
    } finally {
      jn.transition = c, Nt = o;
    }
    return null;
  }
  function yg(n, r, l, o) {
    do
      ju();
    while (mi !== null);
    if ((ht & 6) !== 0) throw Error(m(327));
    l = n.finishedWork;
    var c = n.finishedLanes;
    if (l === null) return null;
    if (n.finishedWork = null, n.finishedLanes = 0, l === n.current) throw Error(m(177));
    n.callbackNode = null, n.callbackPriority = 0;
    var p = l.lanes | l.childLanes;
    if (Qy(n, p), n === kn && (Cn = kn = null, Bn = 0), (l.subtreeFlags & 2064) === 0 && (l.flags & 2064) === 0 || Wc || (Wc = !0, Ah(ho, function() {
      return ju(), null;
    })), p = (l.flags & 15990) !== 0, (l.subtreeFlags & 15990) !== 0 || p) {
      p = jn.transition, jn.transition = null;
      var S = Nt;
      Nt = 1;
      var T = ht;
      ht |= 4, Yl.current = null, Rh(n, l), Kd(l, n), Ru(Ol), Rl = !!Lo, Ol = Lo = null, n.current = l, pg(l), By(), ht = T, Nt = S, jn.transition = p;
    } else n.current = l;
    if (Wc && (Wc = !1, mi = n, os = c), p = n.pendingLanes, p === 0 && (qi = null), xv(l.stateNode), Lr(n, Ht()), r !== null) for (o = n.onRecoverableError, l = 0; l < r.length; l++) c = r[l], o(c.value, { componentStack: c.stack, digest: c.digest });
    if (Vu) throw Vu = !1, n = Ql, Ql = null, n;
    return (os & 1) !== 0 && n.tag !== 0 && ju(), p = n.pendingLanes, (p & 1) !== 0 ? n === Pu ? Zi++ : (Zi = 0, Pu = n) : Zi = 0, ja(), null;
  }
  function ju() {
    if (mi !== null) {
      var n = qf(os), r = jn.transition, l = Nt;
      try {
        if (jn.transition = null, Nt = 16 > n ? 16 : n, mi === null) var o = !1;
        else {
          if (n = mi, mi = null, os = 0, (ht & 6) !== 0) throw Error(m(331));
          var c = ht;
          for (ht |= 4, De = n.current; De !== null; ) {
            var p = De, S = p.child;
            if ((De.flags & 16) !== 0) {
              var T = p.deletions;
              if (T !== null) {
                for (var O = 0; O < T.length; O++) {
                  var Y = T[O];
                  for (De = Y; De !== null; ) {
                    var le = De;
                    switch (le.tag) {
                      case 0:
                      case 11:
                      case 15:
                        ns(8, le, p);
                    }
                    var se = le.child;
                    if (se !== null) se.return = le, De = se;
                    else for (; De !== null; ) {
                      le = De;
                      var ie = le.sibling, we = le.return;
                      if (Yc(le), le === Y) {
                        De = null;
                        break;
                      }
                      if (ie !== null) {
                        ie.return = we, De = ie;
                        break;
                      }
                      De = we;
                    }
                  }
                }
                var Le = p.alternate;
                if (Le !== null) {
                  var ze = Le.child;
                  if (ze !== null) {
                    Le.child = null;
                    do {
                      var dn = ze.sibling;
                      ze.sibling = null, ze = dn;
                    } while (ze !== null);
                  }
                }
                De = p;
              }
            }
            if ((p.subtreeFlags & 2064) !== 0 && S !== null) S.return = p, De = S;
            else e: for (; De !== null; ) {
              if (p = De, (p.flags & 2048) !== 0) switch (p.tag) {
                case 0:
                case 11:
                case 15:
                  ns(9, p, p.return);
              }
              var V = p.sibling;
              if (V !== null) {
                V.return = p.return, De = V;
                break e;
              }
              De = p.return;
            }
          }
          var N = n.current;
          for (De = N; De !== null; ) {
            S = De;
            var B = S.child;
            if ((S.subtreeFlags & 2064) !== 0 && B !== null) B.return = S, De = B;
            else e: for (S = N; De !== null; ) {
              if (T = De, (T.flags & 2048) !== 0) try {
                switch (T.tag) {
                  case 0:
                  case 11:
                  case 15:
                    rs(9, T);
                }
              } catch (_e) {
                Kt(T, T.return, _e);
              }
              if (T === S) {
                De = null;
                break e;
              }
              var ue = T.sibling;
              if (ue !== null) {
                ue.return = T.return, De = ue;
                break e;
              }
              De = T.return;
            }
          }
          if (ht = c, ja(), Ra && typeof Ra.onPostCommitFiberRoot == "function") try {
            Ra.onPostCommitFiberRoot(mo, n);
          } catch {
          }
          o = !0;
        }
        return o;
      } finally {
        Nt = l, jn.transition = r;
      }
    }
    return !1;
  }
  function Lh(n, r, l) {
    r = Il(l, r), r = dh(n, r, 1), n = Qi(n, r, 1), r = Rn(), n !== null && (El(n, 1, r), Lr(n, r));
  }
  function Kt(n, r, l) {
    if (n.tag === 3) Lh(n, n, l);
    else for (; r !== null; ) {
      if (r.tag === 3) {
        Lh(r, n, l);
        break;
      } else if (r.tag === 1) {
        var o = r.stateNode;
        if (typeof r.type.getDerivedStateFromError == "function" || typeof o.componentDidCatch == "function" && (qi === null || !qi.has(o))) {
          n = Il(l, n), n = Bd(r, n, 1), r = Qi(r, n, 1), n = Rn(), r !== null && (El(r, 1, n), Lr(r, n));
          break;
        }
      }
      r = r.return;
    }
  }
  function gg(n, r, l) {
    var o = n.pingCache;
    o !== null && o.delete(r), r = Rn(), n.pingedLanes |= n.suspendedLanes & l, kn === n && (Bn & l) === l && (fn === 4 || fn === 3 && (Bn & 130023424) === Bn && 500 > Ht() - Zd ? yi(n, 0) : Qc |= l), Lr(n, r);
  }
  function _h(n, r) {
    r === 0 && ((n.mode & 1) === 0 ? r = 1 : (r = xa, xa <<= 1, (xa & 130023424) === 0 && (xa = 4194304)));
    var l = Rn();
    n = jr(n, r), n !== null && (El(n, r, l), Lr(n, l));
  }
  function Sg(n) {
    var r = n.memoizedState, l = 0;
    r !== null && (l = r.retryLane), _h(n, l);
  }
  function Nh(n, r) {
    var l = 0;
    switch (n.tag) {
      case 13:
        var o = n.stateNode, c = n.memoizedState;
        c !== null && (l = c.retryLane);
        break;
      case 19:
        o = n.stateNode;
        break;
      default:
        throw Error(m(314));
    }
    o !== null && o.delete(r), _h(n, l);
  }
  var zh;
  zh = function(n, r, l) {
    if (n !== null) if (n.memoizedProps !== r.pendingProps || bn.current) Sn = !0;
    else {
      if ((n.lanes & l) === 0 && (r.flags & 128) === 0) return Sn = !1, Jo(n, r, l);
      Sn = (n.flags & 131072) !== 0;
    }
    else Sn = !1, Gt && (r.flags & 1048576) !== 0 && rh(r, fi, r.index);
    switch (r.lanes = 0, r.tag) {
      case 2:
        var o = r.type;
        oa(n, r), n = r.pendingProps;
        var c = aa(r, rn.current);
        Xt(r, l), c = Wi(null, r, o, n, c, l);
        var p = Da();
        return r.flags |= 1, typeof c == "object" && c !== null && typeof c.render == "function" && c.$$typeof === void 0 ? (r.tag = 1, r.memoizedState = null, r.updateQueue = null, mn(o) ? (p = !0, wr(r)) : p = !1, r.memoizedState = c.state !== null && c.state !== void 0 ? c.state : null, zd(r), c.updater = Hc, r.stateNode = c, c._reactInternals = r, Go(r, o, n, l), r = qo(null, r, o, !0, p, l)) : (r.tag = 0, Gt && p && vc(r), Pn(null, r, c, l), r = r.child), r;
      case 16:
        o = r.elementType;
        e: {
          switch (oa(n, r), n = r.pendingProps, c = o._init, o = c(o._payload), r.type = o, c = r.tag = Cg(o), n = ka(o, n), c) {
            case 0:
              r = vh(null, r, o, n, l);
              break e;
            case 1:
              r = hh(null, r, o, n, l);
              break e;
            case 11:
              r = kr(null, r, o, n, l);
              break e;
            case 14:
              r = $l(null, r, o, ka(o.type, n), l);
              break e;
          }
          throw Error(m(
            306,
            o,
            ""
          ));
        }
        return r;
      case 0:
        return o = r.type, c = r.pendingProps, c = r.elementType === o ? c : ka(o, c), vh(n, r, o, c, l);
      case 1:
        return o = r.type, c = r.pendingProps, c = r.elementType === o ? c : ka(o, c), hh(n, r, o, c, l);
      case 3:
        e: {
          if (zu(r), n === null) throw Error(m(387));
          o = r.pendingProps, p = r.memoizedState, c = p.element, lh(n, r), Uo(r, o, null, l);
          var S = r.memoizedState;
          if (o = S.element, p.isDehydrated) if (p = { element: o, isDehydrated: !1, cache: S.cache, pendingSuspenseBoundaries: S.pendingSuspenseBoundaries, transitions: S.transitions }, r.updateQueue.baseState = p, r.memoizedState = p, r.flags & 256) {
            c = Il(Error(m(423)), r), r = mh(n, r, o, l, c);
            break e;
          } else if (o !== c) {
            c = Il(Error(m(424)), r), r = mh(n, r, o, l, c);
            break e;
          } else for (br = Ha(r.stateNode.containerInfo.firstChild), Tr = r, Gt = !0, la = null, l = Se(r, null, o, l), r.child = l; l; ) l.flags = l.flags & -3 | 4096, l = l.sibling;
          else {
            if (Yi(), o === c) {
              r = sa(n, r, l);
              break e;
            }
            Pn(n, r, o, l);
          }
          r = r.child;
        }
        return r;
      case 5:
        return oh(r), n === null && Dd(r), o = r.type, c = r.pendingProps, p = n !== null ? n.memoizedProps : null, S = c.children, sc(o, c) ? S = null : p !== null && sc(o, p) && (r.flags |= 32), $d(n, r), Pn(n, r, S, l), r.child;
      case 6:
        return n === null && Dd(r), null;
      case 13:
        return Bc(n, r, l);
      case 4:
        return Ud(r, r.stateNode.containerInfo), o = r.pendingProps, n === null ? r.child = on(r, null, o, l) : Pn(n, r, o, l), r.child;
      case 11:
        return o = r.type, c = r.pendingProps, c = r.elementType === o ? c : ka(o, c), kr(n, r, o, c, l);
      case 7:
        return Pn(n, r, r.pendingProps, l), r.child;
      case 8:
        return Pn(n, r, r.pendingProps.children, l), r.child;
      case 12:
        return Pn(n, r, r.pendingProps.children, l), r.child;
      case 10:
        e: {
          if (o = r.type._context, c = r.pendingProps, p = r.memoizedProps, S = c.value, Pe(Pr, o._currentValue), o._currentValue = S, p !== null) if (wa(p.value, S)) {
            if (p.children === c.children && !bn.current) {
              r = sa(n, r, l);
              break e;
            }
          } else for (p = r.child, p !== null && (p.return = r); p !== null; ) {
            var T = p.dependencies;
            if (T !== null) {
              S = p.child;
              for (var O = T.firstContext; O !== null; ) {
                if (O.context === o) {
                  if (p.tag === 1) {
                    O = pi(-1, l & -l), O.tag = 2;
                    var Y = p.updateQueue;
                    if (Y !== null) {
                      Y = Y.shared;
                      var le = Y.pending;
                      le === null ? O.next = O : (O.next = le.next, le.next = O), Y.pending = O;
                    }
                  }
                  p.lanes |= l, O = p.alternate, O !== null && (O.lanes |= l), Ld(
                    p.return,
                    l,
                    r
                  ), T.lanes |= l;
                  break;
                }
                O = O.next;
              }
            } else if (p.tag === 10) S = p.type === r.type ? null : p.child;
            else if (p.tag === 18) {
              if (S = p.return, S === null) throw Error(m(341));
              S.lanes |= l, T = S.alternate, T !== null && (T.lanes |= l), Ld(S, l, r), S = p.sibling;
            } else S = p.child;
            if (S !== null) S.return = p;
            else for (S = p; S !== null; ) {
              if (S === r) {
                S = null;
                break;
              }
              if (p = S.sibling, p !== null) {
                p.return = S.return, S = p;
                break;
              }
              S = S.return;
            }
            p = S;
          }
          Pn(n, r, c.children, l), r = r.child;
        }
        return r;
      case 9:
        return c = r.type, o = r.pendingProps.children, Xt(r, l), c = ua(c), o = o(c), r.flags |= 1, Pn(n, r, o, l), r.child;
      case 14:
        return o = r.type, c = ka(o, r.pendingProps), c = ka(o.type, c), $l(n, r, o, c, l);
      case 15:
        return it(n, r, r.type, r.pendingProps, l);
      case 17:
        return o = r.type, c = r.pendingProps, c = r.elementType === o ? c : ka(o, c), oa(n, r), r.tag = 1, mn(o) ? (n = !0, wr(r)) : n = !1, Xt(r, l), Vc(r, o, c), Go(r, o, c, l), qo(null, r, o, !0, n, l);
      case 19:
        return Ya(n, r, l);
      case 22:
        return Xo(n, r, l);
    }
    throw Error(m(156, r.tag));
  };
  function Ah(n, r) {
    return Sv(n, r);
  }
  function Eg(n, r, l, o) {
    this.tag = n, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = r, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = o, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function fa(n, r, l, o) {
    return new Eg(n, r, l, o);
  }
  function rp(n) {
    return n = n.prototype, !(!n || !n.isReactComponent);
  }
  function Cg(n) {
    if (typeof n == "function") return rp(n) ? 1 : 0;
    if (n != null) {
      if (n = n.$$typeof, n === de) return 11;
      if (n === Ce) return 14;
    }
    return 2;
  }
  function Ji(n, r) {
    var l = n.alternate;
    return l === null ? (l = fa(n.tag, r, n.key, n.mode), l.elementType = n.elementType, l.type = n.type, l.stateNode = n.stateNode, l.alternate = n, n.alternate = l) : (l.pendingProps = r, l.type = n.type, l.flags = 0, l.subtreeFlags = 0, l.deletions = null), l.flags = n.flags & 14680064, l.childLanes = n.childLanes, l.lanes = n.lanes, l.child = n.child, l.memoizedProps = n.memoizedProps, l.memoizedState = n.memoizedState, l.updateQueue = n.updateQueue, r = n.dependencies, l.dependencies = r === null ? null : { lanes: r.lanes, firstContext: r.firstContext }, l.sibling = n.sibling, l.index = n.index, l.ref = n.ref, l;
  }
  function fs(n, r, l, o, c, p) {
    var S = 2;
    if (o = n, typeof n == "function") rp(n) && (S = 1);
    else if (typeof n == "string") S = 5;
    else e: switch (n) {
      case ve:
        return gi(l.children, c, p, r);
      case We:
        S = 8, c |= 8;
        break;
      case Oe:
        return n = fa(12, l, r, c | 2), n.elementType = Oe, n.lanes = p, n;
      case te:
        return n = fa(13, l, r, c), n.elementType = te, n.lanes = p, n;
      case He:
        return n = fa(19, l, r, c), n.elementType = He, n.lanes = p, n;
      case ye:
        return el(l, c, p, r);
      default:
        if (typeof n == "object" && n !== null) switch (n.$$typeof) {
          case Ye:
            S = 10;
            break e;
          case Ae:
            S = 9;
            break e;
          case de:
            S = 11;
            break e;
          case Ce:
            S = 14;
            break e;
          case oe:
            S = 16, o = null;
            break e;
        }
        throw Error(m(130, n == null ? n : typeof n, ""));
    }
    return r = fa(S, l, r, c), r.elementType = n, r.type = o, r.lanes = p, r;
  }
  function gi(n, r, l, o) {
    return n = fa(7, n, o, r), n.lanes = l, n;
  }
  function el(n, r, l, o) {
    return n = fa(22, n, o, r), n.elementType = ye, n.lanes = l, n.stateNode = { isHidden: !1 }, n;
  }
  function ap(n, r, l) {
    return n = fa(6, n, null, r), n.lanes = l, n;
  }
  function Xc(n, r, l) {
    return r = fa(4, n.children !== null ? n.children : [], n.key, r), r.lanes = l, r.stateNode = { containerInfo: n.containerInfo, pendingChildren: null, implementation: n.implementation }, r;
  }
  function Uh(n, r, l, o, c) {
    this.tag = r, this.containerInfo = n, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Xf(0), this.expirationTimes = Xf(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Xf(0), this.identifierPrefix = o, this.onRecoverableError = c, this.mutableSourceEagerHydrationData = null;
  }
  function qc(n, r, l, o, c, p, S, T, O) {
    return n = new Uh(n, r, l, T, O), r === 1 ? (r = 1, p === !0 && (r |= 8)) : r = 0, p = fa(3, null, null, r), n.current = p, p.stateNode = n, p.memoizedState = { element: o, isDehydrated: l, cache: null, transitions: null, pendingSuspenseBoundaries: null }, zd(p), n;
  }
  function Rg(n, r, l) {
    var o = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: ke, key: o == null ? null : "" + o, children: n, containerInfo: r, implementation: l };
  }
  function ip(n) {
    if (!n) return Rr;
    n = n._reactInternals;
    e: {
      if (Ca(n) !== n || n.tag !== 1) throw Error(m(170));
      var r = n;
      do {
        switch (r.tag) {
          case 3:
            r = r.stateNode.context;
            break e;
          case 1:
            if (mn(r.type)) {
              r = r.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
        }
        r = r.return;
      } while (r !== null);
      throw Error(m(171));
    }
    if (n.tag === 1) {
      var l = n.type;
      if (mn(l)) return zo(n, l, r);
    }
    return r;
  }
  function Fh(n, r, l, o, c, p, S, T, O) {
    return n = qc(l, o, !0, n, c, p, S, T, O), n.context = ip(null), l = n.current, o = Rn(), c = Ka(l), p = pi(o, c), p.callback = r ?? null, Qi(l, p, c), n.current.lanes = c, El(n, c, o), Lr(n, o), n;
  }
  function Zc(n, r, l, o) {
    var c = r.current, p = Rn(), S = Ka(c);
    return l = ip(l), r.context === null ? r.context = l : r.pendingContext = l, r = pi(p, S), r.payload = { element: n }, o = o === void 0 ? null : o, o !== null && (r.callback = o), n = Qi(c, r, S), n !== null && (lr(n, c, S, p), gc(n, c, S)), S;
  }
  function Jc(n) {
    if (n = n.current, !n.child) return null;
    switch (n.child.tag) {
      case 5:
        return n.child.stateNode;
      default:
        return n.child.stateNode;
    }
  }
  function lp(n, r) {
    if (n = n.memoizedState, n !== null && n.dehydrated !== null) {
      var l = n.retryLane;
      n.retryLane = l !== 0 && l < r ? l : r;
    }
  }
  function ef(n, r) {
    lp(n, r), (n = n.alternate) && lp(n, r);
  }
  function Hh() {
    return null;
  }
  var Xl = typeof reportError == "function" ? reportError : function(n) {
    console.error(n);
  };
  function up(n) {
    this._internalRoot = n;
  }
  tf.prototype.render = up.prototype.render = function(n) {
    var r = this._internalRoot;
    if (r === null) throw Error(m(409));
    Zc(n, r, null, null);
  }, tf.prototype.unmount = up.prototype.unmount = function() {
    var n = this._internalRoot;
    if (n !== null) {
      this._internalRoot = null;
      var r = n.containerInfo;
      Gl(function() {
        Zc(null, n, null, null);
      }), r[si] = null;
    }
  };
  function tf(n) {
    this._internalRoot = n;
  }
  tf.prototype.unstable_scheduleHydration = function(n) {
    if (n) {
      var r = at();
      n = { blockedOn: null, target: n, priority: r };
      for (var l = 0; l < Fn.length && r !== 0 && r < Fn[l].priority; l++) ;
      Fn.splice(l, 0, n), l === 0 && nd(n);
    }
  };
  function op(n) {
    return !(!n || n.nodeType !== 1 && n.nodeType !== 9 && n.nodeType !== 11);
  }
  function nf(n) {
    return !(!n || n.nodeType !== 1 && n.nodeType !== 9 && n.nodeType !== 11 && (n.nodeType !== 8 || n.nodeValue !== " react-mount-point-unstable "));
  }
  function Vh() {
  }
  function xg(n, r, l, o, c) {
    if (c) {
      if (typeof o == "function") {
        var p = o;
        o = function() {
          var Y = Jc(S);
          p.call(Y);
        };
      }
      var S = Fh(r, o, n, 0, null, !1, !1, "", Vh);
      return n._reactRootContainer = S, n[si] = S.current, wu(n.nodeType === 8 ? n.parentNode : n), Gl(), S;
    }
    for (; c = n.lastChild; ) n.removeChild(c);
    if (typeof o == "function") {
      var T = o;
      o = function() {
        var Y = Jc(O);
        T.call(Y);
      };
    }
    var O = qc(n, 0, !1, null, null, !1, !1, "", Vh);
    return n._reactRootContainer = O, n[si] = O.current, wu(n.nodeType === 8 ? n.parentNode : n), Gl(function() {
      Zc(r, O, l, o);
    }), O;
  }
  function ds(n, r, l, o, c) {
    var p = l._reactRootContainer;
    if (p) {
      var S = p;
      if (typeof c == "function") {
        var T = c;
        c = function() {
          var O = Jc(S);
          T.call(O);
        };
      }
      Zc(r, S, n, c);
    } else S = xg(l, r, n, c, o);
    return Jc(S);
  }
  zt = function(n) {
    switch (n.tag) {
      case 3:
        var r = n.stateNode;
        if (r.current.memoizedState.isDehydrated) {
          var l = gl(r.pendingLanes);
          l !== 0 && (js(r, l | 1), Lr(r, Ht()), (ht & 6) === 0 && (Hu = Ht() + 500, ja()));
        }
        break;
      case 13:
        Gl(function() {
          var o = jr(n, 1);
          if (o !== null) {
            var c = Rn();
            lr(o, n, 1, c);
          }
        }), ef(n, 1);
    }
  }, Zf = function(n) {
    if (n.tag === 13) {
      var r = jr(n, 134217728);
      if (r !== null) {
        var l = Rn();
        lr(r, n, 134217728, l);
      }
      ef(n, 134217728);
    }
  }, Jf = function(n) {
    if (n.tag === 13) {
      var r = Ka(n), l = jr(n, r);
      if (l !== null) {
        var o = Rn();
        lr(l, n, r, o);
      }
      ef(n, r);
    }
  }, at = function() {
    return Nt;
  }, ed = function(n, r) {
    var l = Nt;
    try {
      return Nt = n, r();
    } finally {
      Nt = l;
    }
  }, tn = function(n, r, l) {
    switch (r) {
      case "input":
        if (vn(n, l), r = l.name, l.type === "radio" && r != null) {
          for (l = n; l.parentNode; ) l = l.parentNode;
          for (l = l.querySelectorAll("input[name=" + JSON.stringify("" + r) + '][type="radio"]'), r = 0; r < l.length; r++) {
            var o = l[r];
            if (o !== n && o.form === n.form) {
              var c = un(o);
              if (!c) throw Error(m(90));
              et(o), vn(o, c);
            }
          }
        }
        break;
      case "textarea":
        Jt(n, l);
        break;
      case "select":
        r = l.value, r != null && Re(n, !!l.multiple, r, !1);
    }
  }, Pf = ep, jf = Gl;
  var wg = { usingClientEntryPoint: !1, Events: [je, Ta, un, hv, mv, ep] }, ps = { findFiberByHostInstance: Ml, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, Ph = { bundleType: ps.bundleType, version: ps.version, rendererPackageName: ps.rendererPackageName, rendererConfig: ps.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: pe.ReactCurrentDispatcher, findHostInstanceByFiber: function(n) {
    return n = $f(n), n === null ? null : n.stateNode;
  }, findFiberByHostInstance: ps.findFiberByHostInstance || Hh, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var tl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!tl.isDisabled && tl.supportsFiber) try {
      mo = tl.inject(Ph), Ra = tl;
    } catch {
    }
  }
  return ya.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = wg, ya.createPortal = function(n, r) {
    var l = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!op(r)) throw Error(m(200));
    return Rg(n, r, null, l);
  }, ya.createRoot = function(n, r) {
    if (!op(n)) throw Error(m(299));
    var l = !1, o = "", c = Xl;
    return r != null && (r.unstable_strictMode === !0 && (l = !0), r.identifierPrefix !== void 0 && (o = r.identifierPrefix), r.onRecoverableError !== void 0 && (c = r.onRecoverableError)), r = qc(n, 1, !1, null, null, l, !1, o, c), n[si] = r.current, wu(n.nodeType === 8 ? n.parentNode : n), new up(r);
  }, ya.findDOMNode = function(n) {
    if (n == null) return null;
    if (n.nodeType === 1) return n;
    var r = n._reactInternals;
    if (r === void 0)
      throw typeof n.render == "function" ? Error(m(188)) : (n = Object.keys(n).join(","), Error(m(268, n)));
    return n = $f(r), n = n === null ? null : n.stateNode, n;
  }, ya.flushSync = function(n) {
    return Gl(n);
  }, ya.hydrate = function(n, r, l) {
    if (!nf(r)) throw Error(m(200));
    return ds(null, n, r, !0, l);
  }, ya.hydrateRoot = function(n, r, l) {
    if (!op(n)) throw Error(m(405));
    var o = l != null && l.hydratedSources || null, c = !1, p = "", S = Xl;
    if (l != null && (l.unstable_strictMode === !0 && (c = !0), l.identifierPrefix !== void 0 && (p = l.identifierPrefix), l.onRecoverableError !== void 0 && (S = l.onRecoverableError)), r = Fh(r, null, n, 1, l ?? null, c, !1, p, S), n[si] = r.current, wu(n), o) for (n = 0; n < o.length; n++) l = o[n], c = l._getVersion, c = c(l._source), r.mutableSourceEagerHydrationData == null ? r.mutableSourceEagerHydrationData = [l, c] : r.mutableSourceEagerHydrationData.push(
      l,
      c
    );
    return new tf(r);
  }, ya.render = function(n, r, l) {
    if (!nf(r)) throw Error(m(200));
    return ds(null, n, r, !1, l);
  }, ya.unmountComponentAtNode = function(n) {
    if (!nf(n)) throw Error(m(40));
    return n._reactRootContainer ? (Gl(function() {
      ds(null, null, n, !1, function() {
        n._reactRootContainer = null, n[si] = null;
      });
    }), !0) : !1;
  }, ya.unstable_batchedUpdates = ep, ya.unstable_renderSubtreeIntoContainer = function(n, r, l, o) {
    if (!nf(l)) throw Error(m(200));
    if (n == null || n._reactInternals === void 0) throw Error(m(38));
    return ds(n, r, l, !1, o);
  }, ya.version = "18.3.1-next-f1338f8080-20240426", ya;
}
var ga = {};
/**
 * @license React
 * react-dom.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Dw;
function NM() {
  return Dw || (Dw = 1, process.env.NODE_ENV !== "production" && function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var d = Zw, g = cT(), m = d.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, E = !1;
    function R(e) {
      E = e;
    }
    function w(e) {
      if (!E) {
        for (var t = arguments.length, a = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
          a[i - 1] = arguments[i];
        b("warn", e, a);
      }
    }
    function h(e) {
      if (!E) {
        for (var t = arguments.length, a = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
          a[i - 1] = arguments[i];
        b("error", e, a);
      }
    }
    function b(e, t, a) {
      {
        var i = m.ReactDebugCurrentFrame, u = i.getStackAddendum();
        u !== "" && (t += "%s", a = a.concat([u]));
        var s = a.map(function(f) {
          return String(f);
        });
        s.unshift("Warning: " + t), Function.prototype.apply.call(console[e], console, s);
      }
    }
    var L = 0, k = 1, U = 2, M = 3, A = 4, D = 5, F = 6, H = 7, ne = 8, J = 9, re = 10, K = 11, pe = 12, fe = 13, ke = 14, ve = 15, We = 16, Oe = 17, Ye = 18, Ae = 19, de = 21, te = 22, He = 23, Ce = 24, oe = 25, ye = !0, I = !1, X = !1, G = !1, he = !1, Me = !0, Bt = !0, Mt = !0, gr = !0, Et = /* @__PURE__ */ new Set(), bt = {}, Pt = {};
    function Ke(e, t) {
      rt(e, t), rt(e + "Capture", t);
    }
    function rt(e, t) {
      bt[e] && h("EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.", e), bt[e] = t;
      {
        var a = e.toLowerCase();
        Pt[a] = e, e === "onDoubleClick" && (Pt.ondblclick = e);
      }
      for (var i = 0; i < t.length; i++)
        Et.add(t[i]);
    }
    var Ue = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", et = Object.prototype.hasOwnProperty;
    function st(e) {
      {
        var t = typeof Symbol == "function" && Symbol.toStringTag, a = t && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return a;
      }
    }
    function dt(e) {
      try {
        return pt(e), !1;
      } catch {
        return !0;
      }
    }
    function pt(e) {
      return "" + e;
    }
    function gt(e, t) {
      if (dt(e))
        return h("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before before using it here.", t, st(e)), pt(e);
    }
    function vn(e) {
      if (dt(e))
        return h("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", st(e)), pt(e);
    }
    function Mn(e, t) {
      if (dt(e))
        return h("The provided `%s` prop is an unsupported type %s. This value must be coerced to a string before before using it here.", t, st(e)), pt(e);
    }
    function Xe(e, t) {
      if (dt(e))
        return h("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before before using it here.", t, st(e)), pt(e);
    }
    function lt(e) {
      if (dt(e))
        return h("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before before using it here.", st(e)), pt(e);
    }
    function Re(e) {
      if (dt(e))
        return h("Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before before using it here.", st(e)), pt(e);
    }
    var Ve = 0, Lt = 1, Jt = 2, Un = 3, tr = 4, Hr = 5, wn = 6, Sr = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", me = Sr + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", Ie = new RegExp("^[" + Sr + "][" + me + "]*$"), ut = {}, Dt = {};
    function It(e) {
      return et.call(Dt, e) ? !0 : et.call(ut, e) ? !1 : Ie.test(e) ? (Dt[e] = !0, !0) : (ut[e] = !0, h("Invalid attribute name: `%s`", e), !1);
    }
    function ln(e, t, a) {
      return t !== null ? t.type === Ve : a ? !1 : e.length > 2 && (e[0] === "o" || e[0] === "O") && (e[1] === "n" || e[1] === "N");
    }
    function _t(e, t, a, i) {
      if (a !== null && a.type === Ve)
        return !1;
      switch (typeof t) {
        case "function":
        // $FlowIssue symbol is perfectly valid here
        case "symbol":
          return !0;
        case "boolean": {
          if (i)
            return !1;
          if (a !== null)
            return !a.acceptsBooleans;
          var u = e.toLowerCase().slice(0, 5);
          return u !== "data-" && u !== "aria-";
        }
        default:
          return !1;
      }
    }
    function Tn(e, t, a, i) {
      if (t === null || typeof t > "u" || _t(e, t, a, i))
        return !0;
      if (i)
        return !1;
      if (a !== null)
        switch (a.type) {
          case Un:
            return !t;
          case tr:
            return t === !1;
          case Hr:
            return isNaN(t);
          case wn:
            return isNaN(t) || t < 1;
        }
      return !1;
    }
    function en(e) {
      return tn.hasOwnProperty(e) ? tn[e] : null;
    }
    function $t(e, t, a, i, u, s, f) {
      this.acceptsBooleans = t === Jt || t === Un || t === tr, this.attributeName = i, this.attributeNamespace = u, this.mustUseProperty = a, this.propertyName = e, this.type = t, this.sanitizeURL = s, this.removeEmptyString = f;
    }
    var tn = {}, fu = [
      "children",
      "dangerouslySetInnerHTML",
      // TODO: This prevents the assignment of defaultValue to regular
      // elements (not just inputs). Now that ReactDOMInput assigns to the
      // defaultValue property -- do we need this?
      "defaultValue",
      "defaultChecked",
      "innerHTML",
      "suppressContentEditableWarning",
      "suppressHydrationWarning",
      "style"
    ];
    fu.forEach(function(e) {
      tn[e] = new $t(
        e,
        Ve,
        !1,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
      var t = e[0], a = e[1];
      tn[t] = new $t(
        t,
        Lt,
        !1,
        // mustUseProperty
        a,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
      tn[e] = new $t(
        e,
        Jt,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
      tn[e] = new $t(
        e,
        Jt,
        !1,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "allowFullScreen",
      "async",
      // Note: there is a special case that prevents it from being written to the DOM
      // on the client side because the browsers are inconsistent. Instead we call focus().
      "autoFocus",
      "autoPlay",
      "controls",
      "default",
      "defer",
      "disabled",
      "disablePictureInPicture",
      "disableRemotePlayback",
      "formNoValidate",
      "hidden",
      "loop",
      "noModule",
      "noValidate",
      "open",
      "playsInline",
      "readOnly",
      "required",
      "reversed",
      "scoped",
      "seamless",
      // Microdata
      "itemScope"
    ].forEach(function(e) {
      tn[e] = new $t(
        e,
        Un,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "checked",
      // Note: `option.selected` is not updated if `select.multiple` is
      // disabled with `removeAttribute`. We have special logic for handling this.
      "multiple",
      "muted",
      "selected"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      tn[e] = new $t(
        e,
        Un,
        !0,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "capture",
      "download"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      tn[e] = new $t(
        e,
        tr,
        !1,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "cols",
      "rows",
      "size",
      "span"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      tn[e] = new $t(
        e,
        wn,
        !1,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), ["rowSpan", "start"].forEach(function(e) {
      tn[e] = new $t(
        e,
        Hr,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    });
    var _i = /[\-\:]([a-z])/g, Fs = function(e) {
      return e[1].toUpperCase();
    };
    [
      "accent-height",
      "alignment-baseline",
      "arabic-form",
      "baseline-shift",
      "cap-height",
      "clip-path",
      "clip-rule",
      "color-interpolation",
      "color-interpolation-filters",
      "color-profile",
      "color-rendering",
      "dominant-baseline",
      "enable-background",
      "fill-opacity",
      "fill-rule",
      "flood-color",
      "flood-opacity",
      "font-family",
      "font-size",
      "font-size-adjust",
      "font-stretch",
      "font-style",
      "font-variant",
      "font-weight",
      "glyph-name",
      "glyph-orientation-horizontal",
      "glyph-orientation-vertical",
      "horiz-adv-x",
      "horiz-origin-x",
      "image-rendering",
      "letter-spacing",
      "lighting-color",
      "marker-end",
      "marker-mid",
      "marker-start",
      "overline-position",
      "overline-thickness",
      "paint-order",
      "panose-1",
      "pointer-events",
      "rendering-intent",
      "shape-rendering",
      "stop-color",
      "stop-opacity",
      "strikethrough-position",
      "strikethrough-thickness",
      "stroke-dasharray",
      "stroke-dashoffset",
      "stroke-linecap",
      "stroke-linejoin",
      "stroke-miterlimit",
      "stroke-opacity",
      "stroke-width",
      "text-anchor",
      "text-decoration",
      "text-rendering",
      "underline-position",
      "underline-thickness",
      "unicode-bidi",
      "unicode-range",
      "units-per-em",
      "v-alphabetic",
      "v-hanging",
      "v-ideographic",
      "v-mathematical",
      "vector-effect",
      "vert-adv-y",
      "vert-origin-x",
      "vert-origin-y",
      "word-spacing",
      "writing-mode",
      "xmlns:xlink",
      "x-height"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      var t = e.replace(_i, Fs);
      tn[t] = new $t(
        t,
        Lt,
        !1,
        // mustUseProperty
        e,
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "xlink:actuate",
      "xlink:arcrole",
      "xlink:role",
      "xlink:show",
      "xlink:title",
      "xlink:type"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      var t = e.replace(_i, Fs);
      tn[t] = new $t(
        t,
        Lt,
        !1,
        // mustUseProperty
        e,
        "http://www.w3.org/1999/xlink",
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "xml:base",
      "xml:lang",
      "xml:space"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      var t = e.replace(_i, Fs);
      tn[t] = new $t(
        t,
        Lt,
        !1,
        // mustUseProperty
        e,
        "http://www.w3.org/XML/1998/namespace",
        !1,
        // sanitizeURL
        !1
      );
    }), ["tabIndex", "crossOrigin"].forEach(function(e) {
      tn[e] = new $t(
        e,
        Lt,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    });
    var hv = "xlinkHref";
    tn[hv] = new $t(
      "xlinkHref",
      Lt,
      !1,
      // mustUseProperty
      "xlink:href",
      "http://www.w3.org/1999/xlink",
      !0,
      // sanitizeURL
      !1
    ), ["src", "href", "action", "formAction"].forEach(function(e) {
      tn[e] = new $t(
        e,
        Lt,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !0,
        // sanitizeURL
        !0
      );
    });
    var mv = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i, Pf = !1;
    function jf(e) {
      !Pf && mv.test(e) && (Pf = !0, h("A future version of React will block javascript: URLs as a security precaution. Use event handlers instead if you can. If you need to generate unsafe HTML try using dangerouslySetInnerHTML instead. React was passed %s.", JSON.stringify(e)));
    }
    function Bf(e, t, a, i) {
      if (i.mustUseProperty) {
        var u = i.propertyName;
        return e[u];
      } else {
        gt(a, t), i.sanitizeURL && jf("" + a);
        var s = i.attributeName, f = null;
        if (i.type === tr) {
          if (e.hasAttribute(s)) {
            var v = e.getAttribute(s);
            return v === "" ? !0 : Tn(t, a, i, !1) ? v : v === "" + a ? a : v;
          }
        } else if (e.hasAttribute(s)) {
          if (Tn(t, a, i, !1))
            return e.getAttribute(s);
          if (i.type === Un)
            return a;
          f = e.getAttribute(s);
        }
        return Tn(t, a, i, !1) ? f === null ? a : f : f === "" + a ? a : f;
      }
    }
    function If(e, t, a, i) {
      {
        if (!It(t))
          return;
        if (!e.hasAttribute(t))
          return a === void 0 ? void 0 : null;
        var u = e.getAttribute(t);
        return gt(a, t), u === "" + a ? a : u;
      }
    }
    function hl(e, t, a, i) {
      var u = en(t);
      if (!ln(t, u, i)) {
        if (Tn(t, a, u, i) && (a = null), i || u === null) {
          if (It(t)) {
            var s = t;
            a === null ? e.removeAttribute(s) : (gt(a, t), e.setAttribute(s, "" + a));
          }
          return;
        }
        var f = u.mustUseProperty;
        if (f) {
          var v = u.propertyName;
          if (a === null) {
            var y = u.type;
            e[v] = y === Un ? !1 : "";
          } else
            e[v] = a;
          return;
        }
        var C = u.attributeName, x = u.attributeNamespace;
        if (a === null)
          e.removeAttribute(C);
        else {
          var z = u.type, _;
          z === Un || z === tr && a === !0 ? _ = "" : (gt(a, C), _ = "" + a, u.sanitizeURL && jf(_.toString())), x ? e.setAttributeNS(x, C, _) : e.setAttribute(C, _);
        }
      }
    }
    var Ni = Symbol.for("react.element"), Ea = Symbol.for("react.portal"), du = Symbol.for("react.fragment"), ml = Symbol.for("react.strict_mode"), pu = Symbol.for("react.profiler"), vu = Symbol.for("react.provider"), vo = Symbol.for("react.context"), hu = Symbol.for("react.forward_ref"), Hs = Symbol.for("react.suspense"), Vs = Symbol.for("react.suspense_list"), Ca = Symbol.for("react.memo"), qn = Symbol.for("react.lazy"), yv = Symbol.for("react.scope"), jy = Symbol.for("react.debug_trace_mode"), $f = Symbol.for("react.offscreen"), gv = Symbol.for("react.legacy_hidden"), Sv = Symbol.for("react.cache"), Ev = Symbol.for("react.tracing_marker"), Cv = Symbol.iterator, By = "@@iterator";
    function Ht(e) {
      if (e === null || typeof e != "object")
        return null;
      var t = Cv && e[Cv] || e[By];
      return typeof t == "function" ? t : null;
    }
    var ft = Object.assign, yl = 0, Yf, ho, Rv, Qf, mo, Ra, xv;
    function Jr() {
    }
    Jr.__reactDisabledLog = !0;
    function Iy() {
      {
        if (yl === 0) {
          Yf = console.log, ho = console.info, Rv = console.warn, Qf = console.error, mo = console.group, Ra = console.groupCollapsed, xv = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: Jr,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        yl++;
      }
    }
    function $y() {
      {
        if (yl--, yl === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: ft({}, e, {
              value: Yf
            }),
            info: ft({}, e, {
              value: ho
            }),
            warn: ft({}, e, {
              value: Rv
            }),
            error: ft({}, e, {
              value: Qf
            }),
            group: ft({}, e, {
              value: mo
            }),
            groupCollapsed: ft({}, e, {
              value: Ra
            }),
            groupEnd: ft({}, e, {
              value: xv
            })
          });
        }
        yl < 0 && h("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Wf = m.ReactCurrentDispatcher, mu;
    function xa(e, t, a) {
      {
        if (mu === void 0)
          try {
            throw Error();
          } catch (u) {
            var i = u.stack.trim().match(/\n( *(at )?)/);
            mu = i && i[1] || "";
          }
        return `
` + mu + e;
      }
    }
    var gl = !1, Sl;
    {
      var Yy = typeof WeakMap == "function" ? WeakMap : Map;
      Sl = new Yy();
    }
    function Gf(e, t) {
      if (!e || gl)
        return "";
      {
        var a = Sl.get(e);
        if (a !== void 0)
          return a;
      }
      var i;
      gl = !0;
      var u = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var s;
      s = Wf.current, Wf.current = null, Iy();
      try {
        if (t) {
          var f = function() {
            throw Error();
          };
          if (Object.defineProperty(f.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(f, []);
            } catch (Q) {
              i = Q;
            }
            Reflect.construct(e, [], f);
          } else {
            try {
              f.call();
            } catch (Q) {
              i = Q;
            }
            e.call(f.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Q) {
            i = Q;
          }
          e();
        }
      } catch (Q) {
        if (Q && i && typeof Q.stack == "string") {
          for (var v = Q.stack.split(`
`), y = i.stack.split(`
`), C = v.length - 1, x = y.length - 1; C >= 1 && x >= 0 && v[C] !== y[x]; )
            x--;
          for (; C >= 1 && x >= 0; C--, x--)
            if (v[C] !== y[x]) {
              if (C !== 1 || x !== 1)
                do
                  if (C--, x--, x < 0 || v[C] !== y[x]) {
                    var z = `
` + v[C].replace(" at new ", " at ");
                    return e.displayName && z.includes("<anonymous>") && (z = z.replace("<anonymous>", e.displayName)), typeof e == "function" && Sl.set(e, z), z;
                  }
                while (C >= 1 && x >= 0);
              break;
            }
        }
      } finally {
        gl = !1, Wf.current = s, $y(), Error.prepareStackTrace = u;
      }
      var _ = e ? e.displayName || e.name : "", $ = _ ? xa(_) : "";
      return typeof e == "function" && Sl.set(e, $), $;
    }
    function Kf(e, t, a) {
      return Gf(e, !0);
    }
    function Ps(e, t, a) {
      return Gf(e, !1);
    }
    function Xf(e) {
      var t = e.prototype;
      return !!(t && t.isReactComponent);
    }
    function El(e, t, a) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return Gf(e, Xf(e));
      if (typeof e == "string")
        return xa(e);
      switch (e) {
        case Hs:
          return xa("Suspense");
        case Vs:
          return xa("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case hu:
            return Ps(e.render);
          case Ca:
            return El(e.type, t, a);
          case qn: {
            var i = e, u = i._payload, s = i._init;
            try {
              return El(s(u), t, a);
            } catch {
            }
          }
        }
      return "";
    }
    function Qy(e) {
      switch (e._debugOwner && e._debugOwner.type, e._debugSource, e.tag) {
        case D:
          return xa(e.type);
        case We:
          return xa("Lazy");
        case fe:
          return xa("Suspense");
        case Ae:
          return xa("SuspenseList");
        case L:
        case U:
        case ve:
          return Ps(e.type);
        case K:
          return Ps(e.type.render);
        case k:
          return Kf(e.type);
        default:
          return "";
      }
    }
    function js(e) {
      try {
        var t = "", a = e;
        do
          t += Qy(a), a = a.return;
        while (a);
        return t;
      } catch (i) {
        return `
Error generating stack: ` + i.message + `
` + i.stack;
      }
    }
    function Nt(e, t, a) {
      var i = e.displayName;
      if (i)
        return i;
      var u = t.displayName || t.name || "";
      return u !== "" ? a + "(" + u + ")" : a;
    }
    function qf(e) {
      return e.displayName || "Context";
    }
    function zt(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && h("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case du:
          return "Fragment";
        case Ea:
          return "Portal";
        case pu:
          return "Profiler";
        case ml:
          return "StrictMode";
        case Hs:
          return "Suspense";
        case Vs:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case vo:
            var t = e;
            return qf(t) + ".Consumer";
          case vu:
            var a = e;
            return qf(a._context) + ".Provider";
          case hu:
            return Nt(e, e.render, "ForwardRef");
          case Ca:
            var i = e.displayName || null;
            return i !== null ? i : zt(e.type) || "Memo";
          case qn: {
            var u = e, s = u._payload, f = u._init;
            try {
              return zt(f(s));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    function Zf(e, t, a) {
      var i = t.displayName || t.name || "";
      return e.displayName || (i !== "" ? a + "(" + i + ")" : a);
    }
    function Jf(e) {
      return e.displayName || "Context";
    }
    function at(e) {
      var t = e.tag, a = e.type;
      switch (t) {
        case Ce:
          return "Cache";
        case J:
          var i = a;
          return Jf(i) + ".Consumer";
        case re:
          var u = a;
          return Jf(u._context) + ".Provider";
        case Ye:
          return "DehydratedFragment";
        case K:
          return Zf(a, a.render, "ForwardRef");
        case H:
          return "Fragment";
        case D:
          return a;
        case A:
          return "Portal";
        case M:
          return "Root";
        case F:
          return "Text";
        case We:
          return zt(a);
        case ne:
          return a === ml ? "StrictMode" : "Mode";
        case te:
          return "Offscreen";
        case pe:
          return "Profiler";
        case de:
          return "Scope";
        case fe:
          return "Suspense";
        case Ae:
          return "SuspenseList";
        case oe:
          return "TracingMarker";
        // The display name for this tags come from the user-provided type:
        case k:
        case L:
        case Oe:
        case U:
        case ke:
        case ve:
          if (typeof a == "function")
            return a.displayName || a.name || null;
          if (typeof a == "string")
            return a;
          break;
      }
      return null;
    }
    var ed = m.ReactDebugCurrentFrame, nr = null, zi = !1;
    function ea() {
      {
        if (nr === null)
          return null;
        var e = nr._debugOwner;
        if (e !== null && typeof e < "u")
          return at(e);
      }
      return null;
    }
    function Ai() {
      return nr === null ? "" : js(nr);
    }
    function nn() {
      ed.getCurrentStack = null, nr = null, zi = !1;
    }
    function Yt(e) {
      ed.getCurrentStack = e === null ? null : Ai, nr = e, zi = !1;
    }
    function yo() {
      return nr;
    }
    function Fn(e) {
      zi = e;
    }
    function ta(e) {
      return "" + e;
    }
    function ai(e) {
      switch (typeof e) {
        case "boolean":
        case "number":
        case "string":
        case "undefined":
          return e;
        case "object":
          return Re(e), e;
        default:
          return "";
      }
    }
    var go = {
      button: !0,
      checkbox: !0,
      image: !0,
      hidden: !0,
      radio: !0,
      reset: !0,
      submit: !0
    };
    function td(e, t) {
      go[t.type] || t.onChange || t.onInput || t.readOnly || t.disabled || t.value == null || h("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."), t.onChange || t.readOnly || t.disabled || t.checked == null || h("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
    }
    function nd(e) {
      var t = e.type, a = e.nodeName;
      return a && a.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
    }
    function So(e) {
      return e._valueTracker;
    }
    function wv(e) {
      e._valueTracker = null;
    }
    function Wy(e) {
      var t = "";
      return e && (nd(e) ? t = e.checked ? "true" : "false" : t = e.value), t;
    }
    function Eo(e) {
      var t = nd(e) ? "checked" : "value", a = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
      Re(e[t]);
      var i = "" + e[t];
      if (!(e.hasOwnProperty(t) || typeof a > "u" || typeof a.get != "function" || typeof a.set != "function")) {
        var u = a.get, s = a.set;
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function() {
            return u.call(this);
          },
          set: function(v) {
            Re(v), i = "" + v, s.call(this, v);
          }
        }), Object.defineProperty(e, t, {
          enumerable: a.enumerable
        });
        var f = {
          getValue: function() {
            return i;
          },
          setValue: function(v) {
            Re(v), i = "" + v;
          },
          stopTracking: function() {
            wv(e), delete e[t];
          }
        };
        return f;
      }
    }
    function Ui(e) {
      So(e) || (e._valueTracker = Eo(e));
    }
    function Cl(e) {
      if (!e)
        return !1;
      var t = So(e);
      if (!t)
        return !0;
      var a = t.getValue(), i = Wy(e);
      return i !== a ? (t.setValue(i), !0) : !1;
    }
    function Rl(e) {
      if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u")
        return null;
      try {
        return e.activeElement || e.body;
      } catch {
        return e.body;
      }
    }
    var Tv = !1, bv = !1, Bs = !1, Co = !1;
    function Is(e) {
      var t = e.type === "checkbox" || e.type === "radio";
      return t ? e.checked != null : e.value != null;
    }
    function $s(e, t) {
      var a = e, i = t.checked, u = ft({}, t, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: i ?? a._wrapperState.initialChecked
      });
      return u;
    }
    function ii(e, t) {
      td("input", t), t.checked !== void 0 && t.defaultChecked !== void 0 && !bv && (h("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", ea() || "A component", t.type), bv = !0), t.value !== void 0 && t.defaultValue !== void 0 && !Tv && (h("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", ea() || "A component", t.type), Tv = !0);
      var a = e, i = t.defaultValue == null ? "" : t.defaultValue;
      a._wrapperState = {
        initialChecked: t.checked != null ? t.checked : t.defaultChecked,
        initialValue: ai(t.value != null ? t.value : i),
        controlled: Is(t)
      };
    }
    function Ys(e, t) {
      var a = e, i = t.checked;
      i != null && hl(a, "checked", i, !1);
    }
    function yu(e, t) {
      var a = e;
      {
        var i = Is(t);
        !a._wrapperState.controlled && i && !Co && (h("A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), Co = !0), a._wrapperState.controlled && !i && !Bs && (h("A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), Bs = !0);
      }
      Ys(e, t);
      var u = ai(t.value), s = t.type;
      if (u != null)
        s === "number" ? (u === 0 && a.value === "" || // We explicitly want to coerce to number here if possible.
        // eslint-disable-next-line
        a.value != u) && (a.value = ta(u)) : a.value !== ta(u) && (a.value = ta(u));
      else if (s === "submit" || s === "reset") {
        a.removeAttribute("value");
        return;
      }
      t.hasOwnProperty("value") ? Gs(a, t.type, u) : t.hasOwnProperty("defaultValue") && Gs(a, t.type, ai(t.defaultValue)), t.checked == null && t.defaultChecked != null && (a.defaultChecked = !!t.defaultChecked);
    }
    function rd(e, t, a) {
      var i = e;
      if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
        var u = t.type, s = u === "submit" || u === "reset";
        if (s && (t.value === void 0 || t.value === null))
          return;
        var f = ta(i._wrapperState.initialValue);
        a || f !== i.value && (i.value = f), i.defaultValue = f;
      }
      var v = i.name;
      v !== "" && (i.name = ""), i.defaultChecked = !i.defaultChecked, i.defaultChecked = !!i._wrapperState.initialChecked, v !== "" && (i.name = v);
    }
    function Qs(e, t) {
      var a = e;
      yu(a, t), Ws(a, t);
    }
    function Ws(e, t) {
      var a = t.name;
      if (t.type === "radio" && a != null) {
        for (var i = e; i.parentNode; )
          i = i.parentNode;
        gt(a, "name");
        for (var u = i.querySelectorAll("input[name=" + JSON.stringify("" + a) + '][type="radio"]'), s = 0; s < u.length; s++) {
          var f = u[s];
          if (!(f === e || f.form !== e.form)) {
            var v = am(f);
            if (!v)
              throw new Error("ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported.");
            Cl(f), yu(f, v);
          }
        }
      }
    }
    function Gs(e, t, a) {
      // Focused number inputs synchronize on blur. See ChangeEventPlugin.js
      (t !== "number" || Rl(e.ownerDocument) !== e) && (a == null ? e.defaultValue = ta(e._wrapperState.initialValue) : e.defaultValue !== ta(a) && (e.defaultValue = ta(a)));
    }
    var Er = !1, xl = !1, Ks = !1;
    function gu(e, t) {
      t.value == null && (typeof t.children == "object" && t.children !== null ? d.Children.forEach(t.children, function(a) {
        a != null && (typeof a == "string" || typeof a == "number" || xl || (xl = !0, h("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.")));
      }) : t.dangerouslySetInnerHTML != null && (Ks || (Ks = !0, h("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected.")))), t.selected != null && !Er && (h("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), Er = !0);
    }
    function Gy(e, t) {
      t.value != null && e.setAttribute("value", ta(ai(t.value)));
    }
    var ad = Array.isArray;
    function Hn(e) {
      return ad(e);
    }
    var wl;
    wl = !1;
    function Ro() {
      var e = ea();
      return e ? `

Check the render method of \`` + e + "`." : "";
    }
    var id = ["value", "defaultValue"];
    function Ky(e) {
      {
        td("select", e);
        for (var t = 0; t < id.length; t++) {
          var a = id[t];
          if (e[a] != null) {
            var i = Hn(e[a]);
            e.multiple && !i ? h("The `%s` prop supplied to <select> must be an array if `multiple` is true.%s", a, Ro()) : !e.multiple && i && h("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s", a, Ro());
          }
        }
      }
    }
    function Su(e, t, a, i) {
      var u = e.options;
      if (t) {
        for (var s = a, f = {}, v = 0; v < s.length; v++)
          f["$" + s[v]] = !0;
        for (var y = 0; y < u.length; y++) {
          var C = f.hasOwnProperty("$" + u[y].value);
          u[y].selected !== C && (u[y].selected = C), C && i && (u[y].defaultSelected = !0);
        }
      } else {
        for (var x = ta(ai(a)), z = null, _ = 0; _ < u.length; _++) {
          if (u[_].value === x) {
            u[_].selected = !0, i && (u[_].defaultSelected = !0);
            return;
          }
          z === null && !u[_].disabled && (z = u[_]);
        }
        z !== null && (z.selected = !0);
      }
    }
    function ld(e, t) {
      return ft({}, t, {
        value: void 0
      });
    }
    function Xs(e, t) {
      var a = e;
      Ky(t), a._wrapperState = {
        wasMultiple: !!t.multiple
      }, t.value !== void 0 && t.defaultValue !== void 0 && !wl && (h("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components"), wl = !0);
    }
    function Xy(e, t) {
      var a = e;
      a.multiple = !!t.multiple;
      var i = t.value;
      i != null ? Su(a, !!t.multiple, i, !1) : t.defaultValue != null && Su(a, !!t.multiple, t.defaultValue, !0);
    }
    function qy(e, t) {
      var a = e, i = a._wrapperState.wasMultiple;
      a._wrapperState.wasMultiple = !!t.multiple;
      var u = t.value;
      u != null ? Su(a, !!t.multiple, u, !1) : i !== !!t.multiple && (t.defaultValue != null ? Su(a, !!t.multiple, t.defaultValue, !0) : Su(a, !!t.multiple, t.multiple ? [] : "", !1));
    }
    function Zy(e, t) {
      var a = e, i = t.value;
      i != null && Su(a, !!t.multiple, i, !1);
    }
    var Dv = !1;
    function ud(e, t) {
      var a = e;
      if (t.dangerouslySetInnerHTML != null)
        throw new Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
      var i = ft({}, t, {
        value: void 0,
        defaultValue: void 0,
        children: ta(a._wrapperState.initialValue)
      });
      return i;
    }
    function od(e, t) {
      var a = e;
      td("textarea", t), t.value !== void 0 && t.defaultValue !== void 0 && !Dv && (h("%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components", ea() || "A component"), Dv = !0);
      var i = t.value;
      if (i == null) {
        var u = t.children, s = t.defaultValue;
        if (u != null) {
          h("Use the `defaultValue` or `value` props instead of setting children on <textarea>.");
          {
            if (s != null)
              throw new Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
            if (Hn(u)) {
              if (u.length > 1)
                throw new Error("<textarea> can only have at most one child.");
              u = u[0];
            }
            s = u;
          }
        }
        s == null && (s = ""), i = s;
      }
      a._wrapperState = {
        initialValue: ai(i)
      };
    }
    function kv(e, t) {
      var a = e, i = ai(t.value), u = ai(t.defaultValue);
      if (i != null) {
        var s = ta(i);
        s !== a.value && (a.value = s), t.defaultValue == null && a.defaultValue !== s && (a.defaultValue = s);
      }
      u != null && (a.defaultValue = ta(u));
    }
    function Ov(e, t) {
      var a = e, i = a.textContent;
      i === a._wrapperState.initialValue && i !== "" && i !== null && (a.value = i);
    }
    function Jy(e, t) {
      kv(e, t);
    }
    var li = "http://www.w3.org/1999/xhtml", sd = "http://www.w3.org/1998/Math/MathML", cd = "http://www.w3.org/2000/svg";
    function fd(e) {
      switch (e) {
        case "svg":
          return cd;
        case "math":
          return sd;
        default:
          return li;
      }
    }
    function dd(e, t) {
      return e == null || e === li ? fd(t) : e === cd && t === "foreignObject" ? li : e;
    }
    var Mv = function(e) {
      return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, a, i, u) {
        MSApp.execUnsafeLocalFunction(function() {
          return e(t, a, i, u);
        });
      } : e;
    }, qs, Lv = Mv(function(e, t) {
      if (e.namespaceURI === cd && !("innerHTML" in e)) {
        qs = qs || document.createElement("div"), qs.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>";
        for (var a = qs.firstChild; e.firstChild; )
          e.removeChild(e.firstChild);
        for (; a.firstChild; )
          e.appendChild(a.firstChild);
        return;
      }
      e.innerHTML = t;
    }), Cr = 1, ui = 3, hn = 8, oi = 9, pd = 11, Eu = function(e, t) {
      if (t) {
        var a = e.firstChild;
        if (a && a === e.lastChild && a.nodeType === ui) {
          a.nodeValue = t;
          return;
        }
      }
      e.textContent = t;
    }, xo = {
      animation: ["animationDelay", "animationDirection", "animationDuration", "animationFillMode", "animationIterationCount", "animationName", "animationPlayState", "animationTimingFunction"],
      background: ["backgroundAttachment", "backgroundClip", "backgroundColor", "backgroundImage", "backgroundOrigin", "backgroundPositionX", "backgroundPositionY", "backgroundRepeat", "backgroundSize"],
      backgroundPosition: ["backgroundPositionX", "backgroundPositionY"],
      border: ["borderBottomColor", "borderBottomStyle", "borderBottomWidth", "borderImageOutset", "borderImageRepeat", "borderImageSlice", "borderImageSource", "borderImageWidth", "borderLeftColor", "borderLeftStyle", "borderLeftWidth", "borderRightColor", "borderRightStyle", "borderRightWidth", "borderTopColor", "borderTopStyle", "borderTopWidth"],
      borderBlockEnd: ["borderBlockEndColor", "borderBlockEndStyle", "borderBlockEndWidth"],
      borderBlockStart: ["borderBlockStartColor", "borderBlockStartStyle", "borderBlockStartWidth"],
      borderBottom: ["borderBottomColor", "borderBottomStyle", "borderBottomWidth"],
      borderColor: ["borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor"],
      borderImage: ["borderImageOutset", "borderImageRepeat", "borderImageSlice", "borderImageSource", "borderImageWidth"],
      borderInlineEnd: ["borderInlineEndColor", "borderInlineEndStyle", "borderInlineEndWidth"],
      borderInlineStart: ["borderInlineStartColor", "borderInlineStartStyle", "borderInlineStartWidth"],
      borderLeft: ["borderLeftColor", "borderLeftStyle", "borderLeftWidth"],
      borderRadius: ["borderBottomLeftRadius", "borderBottomRightRadius", "borderTopLeftRadius", "borderTopRightRadius"],
      borderRight: ["borderRightColor", "borderRightStyle", "borderRightWidth"],
      borderStyle: ["borderBottomStyle", "borderLeftStyle", "borderRightStyle", "borderTopStyle"],
      borderTop: ["borderTopColor", "borderTopStyle", "borderTopWidth"],
      borderWidth: ["borderBottomWidth", "borderLeftWidth", "borderRightWidth", "borderTopWidth"],
      columnRule: ["columnRuleColor", "columnRuleStyle", "columnRuleWidth"],
      columns: ["columnCount", "columnWidth"],
      flex: ["flexBasis", "flexGrow", "flexShrink"],
      flexFlow: ["flexDirection", "flexWrap"],
      font: ["fontFamily", "fontFeatureSettings", "fontKerning", "fontLanguageOverride", "fontSize", "fontSizeAdjust", "fontStretch", "fontStyle", "fontVariant", "fontVariantAlternates", "fontVariantCaps", "fontVariantEastAsian", "fontVariantLigatures", "fontVariantNumeric", "fontVariantPosition", "fontWeight", "lineHeight"],
      fontVariant: ["fontVariantAlternates", "fontVariantCaps", "fontVariantEastAsian", "fontVariantLigatures", "fontVariantNumeric", "fontVariantPosition"],
      gap: ["columnGap", "rowGap"],
      grid: ["gridAutoColumns", "gridAutoFlow", "gridAutoRows", "gridTemplateAreas", "gridTemplateColumns", "gridTemplateRows"],
      gridArea: ["gridColumnEnd", "gridColumnStart", "gridRowEnd", "gridRowStart"],
      gridColumn: ["gridColumnEnd", "gridColumnStart"],
      gridColumnGap: ["columnGap"],
      gridGap: ["columnGap", "rowGap"],
      gridRow: ["gridRowEnd", "gridRowStart"],
      gridRowGap: ["rowGap"],
      gridTemplate: ["gridTemplateAreas", "gridTemplateColumns", "gridTemplateRows"],
      listStyle: ["listStyleImage", "listStylePosition", "listStyleType"],
      margin: ["marginBottom", "marginLeft", "marginRight", "marginTop"],
      marker: ["markerEnd", "markerMid", "markerStart"],
      mask: ["maskClip", "maskComposite", "maskImage", "maskMode", "maskOrigin", "maskPositionX", "maskPositionY", "maskRepeat", "maskSize"],
      maskPosition: ["maskPositionX", "maskPositionY"],
      outline: ["outlineColor", "outlineStyle", "outlineWidth"],
      overflow: ["overflowX", "overflowY"],
      padding: ["paddingBottom", "paddingLeft", "paddingRight", "paddingTop"],
      placeContent: ["alignContent", "justifyContent"],
      placeItems: ["alignItems", "justifyItems"],
      placeSelf: ["alignSelf", "justifySelf"],
      textDecoration: ["textDecorationColor", "textDecorationLine", "textDecorationStyle"],
      textEmphasis: ["textEmphasisColor", "textEmphasisStyle"],
      transition: ["transitionDelay", "transitionDuration", "transitionProperty", "transitionTimingFunction"],
      wordWrap: ["overflowWrap"]
    }, wo = {
      animationIterationCount: !0,
      aspectRatio: !0,
      borderImageOutset: !0,
      borderImageSlice: !0,
      borderImageWidth: !0,
      boxFlex: !0,
      boxFlexGroup: !0,
      boxOrdinalGroup: !0,
      columnCount: !0,
      columns: !0,
      flex: !0,
      flexGrow: !0,
      flexPositive: !0,
      flexShrink: !0,
      flexNegative: !0,
      flexOrder: !0,
      gridArea: !0,
      gridRow: !0,
      gridRowEnd: !0,
      gridRowSpan: !0,
      gridRowStart: !0,
      gridColumn: !0,
      gridColumnEnd: !0,
      gridColumnSpan: !0,
      gridColumnStart: !0,
      fontWeight: !0,
      lineClamp: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      tabSize: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0,
      // SVG-related properties
      fillOpacity: !0,
      floodOpacity: !0,
      stopOpacity: !0,
      strokeDasharray: !0,
      strokeDashoffset: !0,
      strokeMiterlimit: !0,
      strokeOpacity: !0,
      strokeWidth: !0
    };
    function _v(e, t) {
      return e + t.charAt(0).toUpperCase() + t.substring(1);
    }
    var Nv = ["Webkit", "ms", "Moz", "O"];
    Object.keys(wo).forEach(function(e) {
      Nv.forEach(function(t) {
        wo[_v(t, e)] = wo[e];
      });
    });
    function Zs(e, t, a) {
      var i = t == null || typeof t == "boolean" || t === "";
      return i ? "" : !a && typeof t == "number" && t !== 0 && !(wo.hasOwnProperty(e) && wo[e]) ? t + "px" : (Xe(t, e), ("" + t).trim());
    }
    var zv = /([A-Z])/g, Av = /^ms-/;
    function Cu(e) {
      return e.replace(zv, "-$1").toLowerCase().replace(Av, "-ms-");
    }
    var Uv = function() {
    };
    {
      var eg = /^(?:webkit|moz|o)[A-Z]/, tg = /^-ms-/, Fv = /-(.)/g, vd = /;\s*$/, Fa = {}, Tl = {}, Hv = !1, To = !1, ng = function(e) {
        return e.replace(Fv, function(t, a) {
          return a.toUpperCase();
        });
      }, Vv = function(e) {
        Fa.hasOwnProperty(e) && Fa[e] || (Fa[e] = !0, h(
          "Unsupported style property %s. Did you mean %s?",
          e,
          // As Andi Smith suggests
          // (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
          // is converted to lowercase `ms`.
          ng(e.replace(tg, "ms-"))
        ));
      }, hd = function(e) {
        Fa.hasOwnProperty(e) && Fa[e] || (Fa[e] = !0, h("Unsupported vendor-prefixed style property %s. Did you mean %s?", e, e.charAt(0).toUpperCase() + e.slice(1)));
      }, md = function(e, t) {
        Tl.hasOwnProperty(t) && Tl[t] || (Tl[t] = !0, h(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`, e, t.replace(vd, "")));
      }, Pv = function(e, t) {
        Hv || (Hv = !0, h("`NaN` is an invalid value for the `%s` css style property.", e));
      }, jv = function(e, t) {
        To || (To = !0, h("`Infinity` is an invalid value for the `%s` css style property.", e));
      };
      Uv = function(e, t) {
        e.indexOf("-") > -1 ? Vv(e) : eg.test(e) ? hd(e) : vd.test(t) && md(e, t), typeof t == "number" && (isNaN(t) ? Pv(e, t) : isFinite(t) || jv(e, t));
      };
    }
    var Bv = Uv;
    function rg(e) {
      {
        var t = "", a = "";
        for (var i in e)
          if (e.hasOwnProperty(i)) {
            var u = e[i];
            if (u != null) {
              var s = i.indexOf("--") === 0;
              t += a + (s ? i : Cu(i)) + ":", t += Zs(i, u, s), a = ";";
            }
          }
        return t || null;
      }
    }
    function Iv(e, t) {
      var a = e.style;
      for (var i in t)
        if (t.hasOwnProperty(i)) {
          var u = i.indexOf("--") === 0;
          u || Bv(i, t[i]);
          var s = Zs(i, t[i], u);
          i === "float" && (i = "cssFloat"), u ? a.setProperty(i, s) : a[i] = s;
        }
    }
    function ag(e) {
      return e == null || typeof e == "boolean" || e === "";
    }
    function $v(e) {
      var t = {};
      for (var a in e)
        for (var i = xo[a] || [a], u = 0; u < i.length; u++)
          t[i[u]] = a;
      return t;
    }
    function ig(e, t) {
      {
        if (!t)
          return;
        var a = $v(e), i = $v(t), u = {};
        for (var s in a) {
          var f = a[s], v = i[s];
          if (v && f !== v) {
            var y = f + "," + v;
            if (u[y])
              continue;
            u[y] = !0, h("%s a style property during rerender (%s) when a conflicting property is set (%s) can lead to styling bugs. To avoid this, don't mix shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.", ag(e[f]) ? "Removing" : "Updating", f, v);
          }
        }
      }
    }
    var wa = {
      area: !0,
      base: !0,
      br: !0,
      col: !0,
      embed: !0,
      hr: !0,
      img: !0,
      input: !0,
      keygen: !0,
      link: !0,
      meta: !0,
      param: !0,
      source: !0,
      track: !0,
      wbr: !0
      // NOTE: menuitem's close tag should be omitted, but that causes problems.
    }, bo = ft({
      menuitem: !0
    }, wa), Yv = "__html";
    function Js(e, t) {
      if (t) {
        if (bo[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
          throw new Error(e + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
        if (t.dangerouslySetInnerHTML != null) {
          if (t.children != null)
            throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
          if (typeof t.dangerouslySetInnerHTML != "object" || !(Yv in t.dangerouslySetInnerHTML))
            throw new Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
        }
        if (!t.suppressContentEditableWarning && t.contentEditable && t.children != null && h("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional."), t.style != null && typeof t.style != "object")
          throw new Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
      }
    }
    function Fi(e, t) {
      if (e.indexOf("-") === -1)
        return typeof t.is == "string";
      switch (e) {
        // These are reserved SVG and MathML elements.
        // We don't mind this list too much because we expect it to never grow.
        // The alternative is to track the namespace in a few places which is convoluted.
        // https://w3c.github.io/webcomponents/spec/custom/#custom-elements-core-concepts
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
          return !1;
        default:
          return !0;
      }
    }
    var Do = {
      // HTML
      accept: "accept",
      acceptcharset: "acceptCharset",
      "accept-charset": "acceptCharset",
      accesskey: "accessKey",
      action: "action",
      allowfullscreen: "allowFullScreen",
      alt: "alt",
      as: "as",
      async: "async",
      autocapitalize: "autoCapitalize",
      autocomplete: "autoComplete",
      autocorrect: "autoCorrect",
      autofocus: "autoFocus",
      autoplay: "autoPlay",
      autosave: "autoSave",
      capture: "capture",
      cellpadding: "cellPadding",
      cellspacing: "cellSpacing",
      challenge: "challenge",
      charset: "charSet",
      checked: "checked",
      children: "children",
      cite: "cite",
      class: "className",
      classid: "classID",
      classname: "className",
      cols: "cols",
      colspan: "colSpan",
      content: "content",
      contenteditable: "contentEditable",
      contextmenu: "contextMenu",
      controls: "controls",
      controlslist: "controlsList",
      coords: "coords",
      crossorigin: "crossOrigin",
      dangerouslysetinnerhtml: "dangerouslySetInnerHTML",
      data: "data",
      datetime: "dateTime",
      default: "default",
      defaultchecked: "defaultChecked",
      defaultvalue: "defaultValue",
      defer: "defer",
      dir: "dir",
      disabled: "disabled",
      disablepictureinpicture: "disablePictureInPicture",
      disableremoteplayback: "disableRemotePlayback",
      download: "download",
      draggable: "draggable",
      enctype: "encType",
      enterkeyhint: "enterKeyHint",
      for: "htmlFor",
      form: "form",
      formmethod: "formMethod",
      formaction: "formAction",
      formenctype: "formEncType",
      formnovalidate: "formNoValidate",
      formtarget: "formTarget",
      frameborder: "frameBorder",
      headers: "headers",
      height: "height",
      hidden: "hidden",
      high: "high",
      href: "href",
      hreflang: "hrefLang",
      htmlfor: "htmlFor",
      httpequiv: "httpEquiv",
      "http-equiv": "httpEquiv",
      icon: "icon",
      id: "id",
      imagesizes: "imageSizes",
      imagesrcset: "imageSrcSet",
      innerhtml: "innerHTML",
      inputmode: "inputMode",
      integrity: "integrity",
      is: "is",
      itemid: "itemID",
      itemprop: "itemProp",
      itemref: "itemRef",
      itemscope: "itemScope",
      itemtype: "itemType",
      keyparams: "keyParams",
      keytype: "keyType",
      kind: "kind",
      label: "label",
      lang: "lang",
      list: "list",
      loop: "loop",
      low: "low",
      manifest: "manifest",
      marginwidth: "marginWidth",
      marginheight: "marginHeight",
      max: "max",
      maxlength: "maxLength",
      media: "media",
      mediagroup: "mediaGroup",
      method: "method",
      min: "min",
      minlength: "minLength",
      multiple: "multiple",
      muted: "muted",
      name: "name",
      nomodule: "noModule",
      nonce: "nonce",
      novalidate: "noValidate",
      open: "open",
      optimum: "optimum",
      pattern: "pattern",
      placeholder: "placeholder",
      playsinline: "playsInline",
      poster: "poster",
      preload: "preload",
      profile: "profile",
      radiogroup: "radioGroup",
      readonly: "readOnly",
      referrerpolicy: "referrerPolicy",
      rel: "rel",
      required: "required",
      reversed: "reversed",
      role: "role",
      rows: "rows",
      rowspan: "rowSpan",
      sandbox: "sandbox",
      scope: "scope",
      scoped: "scoped",
      scrolling: "scrolling",
      seamless: "seamless",
      selected: "selected",
      shape: "shape",
      size: "size",
      sizes: "sizes",
      span: "span",
      spellcheck: "spellCheck",
      src: "src",
      srcdoc: "srcDoc",
      srclang: "srcLang",
      srcset: "srcSet",
      start: "start",
      step: "step",
      style: "style",
      summary: "summary",
      tabindex: "tabIndex",
      target: "target",
      title: "title",
      type: "type",
      usemap: "useMap",
      value: "value",
      width: "width",
      wmode: "wmode",
      wrap: "wrap",
      // SVG
      about: "about",
      accentheight: "accentHeight",
      "accent-height": "accentHeight",
      accumulate: "accumulate",
      additive: "additive",
      alignmentbaseline: "alignmentBaseline",
      "alignment-baseline": "alignmentBaseline",
      allowreorder: "allowReorder",
      alphabetic: "alphabetic",
      amplitude: "amplitude",
      arabicform: "arabicForm",
      "arabic-form": "arabicForm",
      ascent: "ascent",
      attributename: "attributeName",
      attributetype: "attributeType",
      autoreverse: "autoReverse",
      azimuth: "azimuth",
      basefrequency: "baseFrequency",
      baselineshift: "baselineShift",
      "baseline-shift": "baselineShift",
      baseprofile: "baseProfile",
      bbox: "bbox",
      begin: "begin",
      bias: "bias",
      by: "by",
      calcmode: "calcMode",
      capheight: "capHeight",
      "cap-height": "capHeight",
      clip: "clip",
      clippath: "clipPath",
      "clip-path": "clipPath",
      clippathunits: "clipPathUnits",
      cliprule: "clipRule",
      "clip-rule": "clipRule",
      color: "color",
      colorinterpolation: "colorInterpolation",
      "color-interpolation": "colorInterpolation",
      colorinterpolationfilters: "colorInterpolationFilters",
      "color-interpolation-filters": "colorInterpolationFilters",
      colorprofile: "colorProfile",
      "color-profile": "colorProfile",
      colorrendering: "colorRendering",
      "color-rendering": "colorRendering",
      contentscripttype: "contentScriptType",
      contentstyletype: "contentStyleType",
      cursor: "cursor",
      cx: "cx",
      cy: "cy",
      d: "d",
      datatype: "datatype",
      decelerate: "decelerate",
      descent: "descent",
      diffuseconstant: "diffuseConstant",
      direction: "direction",
      display: "display",
      divisor: "divisor",
      dominantbaseline: "dominantBaseline",
      "dominant-baseline": "dominantBaseline",
      dur: "dur",
      dx: "dx",
      dy: "dy",
      edgemode: "edgeMode",
      elevation: "elevation",
      enablebackground: "enableBackground",
      "enable-background": "enableBackground",
      end: "end",
      exponent: "exponent",
      externalresourcesrequired: "externalResourcesRequired",
      fill: "fill",
      fillopacity: "fillOpacity",
      "fill-opacity": "fillOpacity",
      fillrule: "fillRule",
      "fill-rule": "fillRule",
      filter: "filter",
      filterres: "filterRes",
      filterunits: "filterUnits",
      floodopacity: "floodOpacity",
      "flood-opacity": "floodOpacity",
      floodcolor: "floodColor",
      "flood-color": "floodColor",
      focusable: "focusable",
      fontfamily: "fontFamily",
      "font-family": "fontFamily",
      fontsize: "fontSize",
      "font-size": "fontSize",
      fontsizeadjust: "fontSizeAdjust",
      "font-size-adjust": "fontSizeAdjust",
      fontstretch: "fontStretch",
      "font-stretch": "fontStretch",
      fontstyle: "fontStyle",
      "font-style": "fontStyle",
      fontvariant: "fontVariant",
      "font-variant": "fontVariant",
      fontweight: "fontWeight",
      "font-weight": "fontWeight",
      format: "format",
      from: "from",
      fx: "fx",
      fy: "fy",
      g1: "g1",
      g2: "g2",
      glyphname: "glyphName",
      "glyph-name": "glyphName",
      glyphorientationhorizontal: "glyphOrientationHorizontal",
      "glyph-orientation-horizontal": "glyphOrientationHorizontal",
      glyphorientationvertical: "glyphOrientationVertical",
      "glyph-orientation-vertical": "glyphOrientationVertical",
      glyphref: "glyphRef",
      gradienttransform: "gradientTransform",
      gradientunits: "gradientUnits",
      hanging: "hanging",
      horizadvx: "horizAdvX",
      "horiz-adv-x": "horizAdvX",
      horizoriginx: "horizOriginX",
      "horiz-origin-x": "horizOriginX",
      ideographic: "ideographic",
      imagerendering: "imageRendering",
      "image-rendering": "imageRendering",
      in2: "in2",
      in: "in",
      inlist: "inlist",
      intercept: "intercept",
      k1: "k1",
      k2: "k2",
      k3: "k3",
      k4: "k4",
      k: "k",
      kernelmatrix: "kernelMatrix",
      kernelunitlength: "kernelUnitLength",
      kerning: "kerning",
      keypoints: "keyPoints",
      keysplines: "keySplines",
      keytimes: "keyTimes",
      lengthadjust: "lengthAdjust",
      letterspacing: "letterSpacing",
      "letter-spacing": "letterSpacing",
      lightingcolor: "lightingColor",
      "lighting-color": "lightingColor",
      limitingconeangle: "limitingConeAngle",
      local: "local",
      markerend: "markerEnd",
      "marker-end": "markerEnd",
      markerheight: "markerHeight",
      markermid: "markerMid",
      "marker-mid": "markerMid",
      markerstart: "markerStart",
      "marker-start": "markerStart",
      markerunits: "markerUnits",
      markerwidth: "markerWidth",
      mask: "mask",
      maskcontentunits: "maskContentUnits",
      maskunits: "maskUnits",
      mathematical: "mathematical",
      mode: "mode",
      numoctaves: "numOctaves",
      offset: "offset",
      opacity: "opacity",
      operator: "operator",
      order: "order",
      orient: "orient",
      orientation: "orientation",
      origin: "origin",
      overflow: "overflow",
      overlineposition: "overlinePosition",
      "overline-position": "overlinePosition",
      overlinethickness: "overlineThickness",
      "overline-thickness": "overlineThickness",
      paintorder: "paintOrder",
      "paint-order": "paintOrder",
      panose1: "panose1",
      "panose-1": "panose1",
      pathlength: "pathLength",
      patterncontentunits: "patternContentUnits",
      patterntransform: "patternTransform",
      patternunits: "patternUnits",
      pointerevents: "pointerEvents",
      "pointer-events": "pointerEvents",
      points: "points",
      pointsatx: "pointsAtX",
      pointsaty: "pointsAtY",
      pointsatz: "pointsAtZ",
      prefix: "prefix",
      preservealpha: "preserveAlpha",
      preserveaspectratio: "preserveAspectRatio",
      primitiveunits: "primitiveUnits",
      property: "property",
      r: "r",
      radius: "radius",
      refx: "refX",
      refy: "refY",
      renderingintent: "renderingIntent",
      "rendering-intent": "renderingIntent",
      repeatcount: "repeatCount",
      repeatdur: "repeatDur",
      requiredextensions: "requiredExtensions",
      requiredfeatures: "requiredFeatures",
      resource: "resource",
      restart: "restart",
      result: "result",
      results: "results",
      rotate: "rotate",
      rx: "rx",
      ry: "ry",
      scale: "scale",
      security: "security",
      seed: "seed",
      shaperendering: "shapeRendering",
      "shape-rendering": "shapeRendering",
      slope: "slope",
      spacing: "spacing",
      specularconstant: "specularConstant",
      specularexponent: "specularExponent",
      speed: "speed",
      spreadmethod: "spreadMethod",
      startoffset: "startOffset",
      stddeviation: "stdDeviation",
      stemh: "stemh",
      stemv: "stemv",
      stitchtiles: "stitchTiles",
      stopcolor: "stopColor",
      "stop-color": "stopColor",
      stopopacity: "stopOpacity",
      "stop-opacity": "stopOpacity",
      strikethroughposition: "strikethroughPosition",
      "strikethrough-position": "strikethroughPosition",
      strikethroughthickness: "strikethroughThickness",
      "strikethrough-thickness": "strikethroughThickness",
      string: "string",
      stroke: "stroke",
      strokedasharray: "strokeDasharray",
      "stroke-dasharray": "strokeDasharray",
      strokedashoffset: "strokeDashoffset",
      "stroke-dashoffset": "strokeDashoffset",
      strokelinecap: "strokeLinecap",
      "stroke-linecap": "strokeLinecap",
      strokelinejoin: "strokeLinejoin",
      "stroke-linejoin": "strokeLinejoin",
      strokemiterlimit: "strokeMiterlimit",
      "stroke-miterlimit": "strokeMiterlimit",
      strokewidth: "strokeWidth",
      "stroke-width": "strokeWidth",
      strokeopacity: "strokeOpacity",
      "stroke-opacity": "strokeOpacity",
      suppresscontenteditablewarning: "suppressContentEditableWarning",
      suppresshydrationwarning: "suppressHydrationWarning",
      surfacescale: "surfaceScale",
      systemlanguage: "systemLanguage",
      tablevalues: "tableValues",
      targetx: "targetX",
      targety: "targetY",
      textanchor: "textAnchor",
      "text-anchor": "textAnchor",
      textdecoration: "textDecoration",
      "text-decoration": "textDecoration",
      textlength: "textLength",
      textrendering: "textRendering",
      "text-rendering": "textRendering",
      to: "to",
      transform: "transform",
      typeof: "typeof",
      u1: "u1",
      u2: "u2",
      underlineposition: "underlinePosition",
      "underline-position": "underlinePosition",
      underlinethickness: "underlineThickness",
      "underline-thickness": "underlineThickness",
      unicode: "unicode",
      unicodebidi: "unicodeBidi",
      "unicode-bidi": "unicodeBidi",
      unicoderange: "unicodeRange",
      "unicode-range": "unicodeRange",
      unitsperem: "unitsPerEm",
      "units-per-em": "unitsPerEm",
      unselectable: "unselectable",
      valphabetic: "vAlphabetic",
      "v-alphabetic": "vAlphabetic",
      values: "values",
      vectoreffect: "vectorEffect",
      "vector-effect": "vectorEffect",
      version: "version",
      vertadvy: "vertAdvY",
      "vert-adv-y": "vertAdvY",
      vertoriginx: "vertOriginX",
      "vert-origin-x": "vertOriginX",
      vertoriginy: "vertOriginY",
      "vert-origin-y": "vertOriginY",
      vhanging: "vHanging",
      "v-hanging": "vHanging",
      videographic: "vIdeographic",
      "v-ideographic": "vIdeographic",
      viewbox: "viewBox",
      viewtarget: "viewTarget",
      visibility: "visibility",
      vmathematical: "vMathematical",
      "v-mathematical": "vMathematical",
      vocab: "vocab",
      widths: "widths",
      wordspacing: "wordSpacing",
      "word-spacing": "wordSpacing",
      writingmode: "writingMode",
      "writing-mode": "writingMode",
      x1: "x1",
      x2: "x2",
      x: "x",
      xchannelselector: "xChannelSelector",
      xheight: "xHeight",
      "x-height": "xHeight",
      xlinkactuate: "xlinkActuate",
      "xlink:actuate": "xlinkActuate",
      xlinkarcrole: "xlinkArcrole",
      "xlink:arcrole": "xlinkArcrole",
      xlinkhref: "xlinkHref",
      "xlink:href": "xlinkHref",
      xlinkrole: "xlinkRole",
      "xlink:role": "xlinkRole",
      xlinkshow: "xlinkShow",
      "xlink:show": "xlinkShow",
      xlinktitle: "xlinkTitle",
      "xlink:title": "xlinkTitle",
      xlinktype: "xlinkType",
      "xlink:type": "xlinkType",
      xmlbase: "xmlBase",
      "xml:base": "xmlBase",
      xmllang: "xmlLang",
      "xml:lang": "xmlLang",
      xmlns: "xmlns",
      "xml:space": "xmlSpace",
      xmlnsxlink: "xmlnsXlink",
      "xmlns:xlink": "xmlnsXlink",
      xmlspace: "xmlSpace",
      y1: "y1",
      y2: "y2",
      y: "y",
      ychannelselector: "yChannelSelector",
      z: "z",
      zoomandpan: "zoomAndPan"
    }, ec = {
      "aria-current": 0,
      // state
      "aria-description": 0,
      "aria-details": 0,
      "aria-disabled": 0,
      // state
      "aria-hidden": 0,
      // state
      "aria-invalid": 0,
      // state
      "aria-keyshortcuts": 0,
      "aria-label": 0,
      "aria-roledescription": 0,
      // Widget Attributes
      "aria-autocomplete": 0,
      "aria-checked": 0,
      "aria-expanded": 0,
      "aria-haspopup": 0,
      "aria-level": 0,
      "aria-modal": 0,
      "aria-multiline": 0,
      "aria-multiselectable": 0,
      "aria-orientation": 0,
      "aria-placeholder": 0,
      "aria-pressed": 0,
      "aria-readonly": 0,
      "aria-required": 0,
      "aria-selected": 0,
      "aria-sort": 0,
      "aria-valuemax": 0,
      "aria-valuemin": 0,
      "aria-valuenow": 0,
      "aria-valuetext": 0,
      // Live Region Attributes
      "aria-atomic": 0,
      "aria-busy": 0,
      "aria-live": 0,
      "aria-relevant": 0,
      // Drag-and-Drop Attributes
      "aria-dropeffect": 0,
      "aria-grabbed": 0,
      // Relationship Attributes
      "aria-activedescendant": 0,
      "aria-colcount": 0,
      "aria-colindex": 0,
      "aria-colspan": 0,
      "aria-controls": 0,
      "aria-describedby": 0,
      "aria-errormessage": 0,
      "aria-flowto": 0,
      "aria-labelledby": 0,
      "aria-owns": 0,
      "aria-posinset": 0,
      "aria-rowcount": 0,
      "aria-rowindex": 0,
      "aria-rowspan": 0,
      "aria-setsize": 0
    }, Ru = {}, lg = new RegExp("^(aria)-[" + me + "]*$"), xu = new RegExp("^(aria)[A-Z][" + me + "]*$");
    function yd(e, t) {
      {
        if (et.call(Ru, t) && Ru[t])
          return !0;
        if (xu.test(t)) {
          var a = "aria-" + t.slice(4).toLowerCase(), i = ec.hasOwnProperty(a) ? a : null;
          if (i == null)
            return h("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", t), Ru[t] = !0, !0;
          if (t !== i)
            return h("Invalid ARIA attribute `%s`. Did you mean `%s`?", t, i), Ru[t] = !0, !0;
        }
        if (lg.test(t)) {
          var u = t.toLowerCase(), s = ec.hasOwnProperty(u) ? u : null;
          if (s == null)
            return Ru[t] = !0, !1;
          if (t !== s)
            return h("Unknown ARIA attribute `%s`. Did you mean `%s`?", t, s), Ru[t] = !0, !0;
        }
      }
      return !0;
    }
    function ko(e, t) {
      {
        var a = [];
        for (var i in t) {
          var u = yd(e, i);
          u || a.push(i);
        }
        var s = a.map(function(f) {
          return "`" + f + "`";
        }).join(", ");
        a.length === 1 ? h("Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", s, e) : a.length > 1 && h("Invalid aria props %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", s, e);
      }
    }
    function gd(e, t) {
      Fi(e, t) || ko(e, t);
    }
    var Sd = !1;
    function tc(e, t) {
      {
        if (e !== "input" && e !== "textarea" && e !== "select")
          return;
        t != null && t.value === null && !Sd && (Sd = !0, e === "select" && t.multiple ? h("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", e) : h("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", e));
      }
    }
    var bl = function() {
    };
    {
      var Vn = {}, Ed = /^on./, nc = /^on[^A-Z]/, Qv = new RegExp("^(aria)-[" + me + "]*$"), Wv = new RegExp("^(aria)[A-Z][" + me + "]*$");
      bl = function(e, t, a, i) {
        if (et.call(Vn, t) && Vn[t])
          return !0;
        var u = t.toLowerCase();
        if (u === "onfocusin" || u === "onfocusout")
          return h("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."), Vn[t] = !0, !0;
        if (i != null) {
          var s = i.registrationNameDependencies, f = i.possibleRegistrationNames;
          if (s.hasOwnProperty(t))
            return !0;
          var v = f.hasOwnProperty(u) ? f[u] : null;
          if (v != null)
            return h("Invalid event handler property `%s`. Did you mean `%s`?", t, v), Vn[t] = !0, !0;
          if (Ed.test(t))
            return h("Unknown event handler property `%s`. It will be ignored.", t), Vn[t] = !0, !0;
        } else if (Ed.test(t))
          return nc.test(t) && h("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", t), Vn[t] = !0, !0;
        if (Qv.test(t) || Wv.test(t))
          return !0;
        if (u === "innerhtml")
          return h("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."), Vn[t] = !0, !0;
        if (u === "aria")
          return h("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."), Vn[t] = !0, !0;
        if (u === "is" && a !== null && a !== void 0 && typeof a != "string")
          return h("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof a), Vn[t] = !0, !0;
        if (typeof a == "number" && isNaN(a))
          return h("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", t), Vn[t] = !0, !0;
        var y = en(t), C = y !== null && y.type === Ve;
        if (Do.hasOwnProperty(u)) {
          var x = Do[u];
          if (x !== t)
            return h("Invalid DOM property `%s`. Did you mean `%s`?", t, x), Vn[t] = !0, !0;
        } else if (!C && t !== u)
          return h("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", t, u), Vn[t] = !0, !0;
        return typeof a == "boolean" && _t(t, a, y, !1) ? (a ? h('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.', a, t, t, a, t) : h('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.', a, t, t, a, t, t, t), Vn[t] = !0, !0) : C ? !0 : _t(t, a, y, !1) ? (Vn[t] = !0, !1) : ((a === "false" || a === "true") && y !== null && y.type === Un && (h("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", a, t, a === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".', t, a), Vn[t] = !0), !0);
      };
    }
    var Gv = function(e, t, a) {
      {
        var i = [];
        for (var u in t) {
          var s = bl(e, u, t[u], a);
          s || i.push(u);
        }
        var f = i.map(function(v) {
          return "`" + v + "`";
        }).join(", ");
        i.length === 1 ? h("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", f, e) : i.length > 1 && h("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", f, e);
      }
    };
    function Kv(e, t, a) {
      Fi(e, t) || Gv(e, t, a);
    }
    var Cd = 1, rc = 2, na = 4, Rd = Cd | rc | na, Dl = null;
    function ug(e) {
      Dl !== null && h("Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."), Dl = e;
    }
    function og() {
      Dl === null && h("Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."), Dl = null;
    }
    function Oo(e) {
      return e === Dl;
    }
    function xd(e) {
      var t = e.target || e.srcElement || window;
      return t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === ui ? t.parentNode : t;
    }
    var ac = null, kl = null, kt = null;
    function ic(e) {
      var t = $u(e);
      if (t) {
        if (typeof ac != "function")
          throw new Error("setRestoreImplementation() needs to be called to handle a target for controlled events. This error is likely caused by a bug in React. Please file an issue.");
        var a = t.stateNode;
        if (a) {
          var i = am(a);
          ac(t.stateNode, t.type, i);
        }
      }
    }
    function lc(e) {
      ac = e;
    }
    function wu(e) {
      kl ? kt ? kt.push(e) : kt = [e] : kl = e;
    }
    function Xv() {
      return kl !== null || kt !== null;
    }
    function uc() {
      if (kl) {
        var e = kl, t = kt;
        if (kl = null, kt = null, ic(e), t)
          for (var a = 0; a < t.length; a++)
            ic(t[a]);
      }
    }
    var Tu = function(e, t) {
      return e(t);
    }, Mo = function() {
    }, Hi = !1;
    function qv() {
      var e = Xv();
      e && (Mo(), uc());
    }
    function Zv(e, t, a) {
      if (Hi)
        return e(t, a);
      Hi = !0;
      try {
        return Tu(e, t, a);
      } finally {
        Hi = !1, qv();
      }
    }
    function sg(e, t, a) {
      Tu = e, Mo = a;
    }
    function Jv(e) {
      return e === "button" || e === "input" || e === "select" || e === "textarea";
    }
    function oc(e, t, a) {
      switch (e) {
        case "onClick":
        case "onClickCapture":
        case "onDoubleClick":
        case "onDoubleClickCapture":
        case "onMouseDown":
        case "onMouseDownCapture":
        case "onMouseMove":
        case "onMouseMoveCapture":
        case "onMouseUp":
        case "onMouseUpCapture":
        case "onMouseEnter":
          return !!(a.disabled && Jv(t));
        default:
          return !1;
      }
    }
    function Vi(e, t) {
      var a = e.stateNode;
      if (a === null)
        return null;
      var i = am(a);
      if (i === null)
        return null;
      var u = i[t];
      if (oc(t, e.type, i))
        return null;
      if (u && typeof u != "function")
        throw new Error("Expected `" + t + "` listener to be a function, instead got a value of `" + typeof u + "` type.");
      return u;
    }
    var Lo = !1;
    if (Ue)
      try {
        var Ol = {};
        Object.defineProperty(Ol, "passive", {
          get: function() {
            Lo = !0;
          }
        }), window.addEventListener("test", Ol, Ol), window.removeEventListener("test", Ol, Ol);
      } catch {
        Lo = !1;
      }
    function sc(e, t, a, i, u, s, f, v, y) {
      var C = Array.prototype.slice.call(arguments, 3);
      try {
        t.apply(a, C);
      } catch (x) {
        this.onError(x);
      }
    }
    var cc = sc;
    if (typeof window < "u" && typeof window.dispatchEvent == "function" && typeof document < "u" && typeof document.createEvent == "function") {
      var wd = document.createElement("react");
      cc = function(t, a, i, u, s, f, v, y, C) {
        if (typeof document > "u" || document === null)
          throw new Error("The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.");
        var x = document.createEvent("Event"), z = !1, _ = !0, $ = window.event, Q = Object.getOwnPropertyDescriptor(window, "event");
        function q() {
          wd.removeEventListener(Z, $e, !1), typeof window.event < "u" && window.hasOwnProperty("event") && (window.event = $);
        }
        var Ee = Array.prototype.slice.call(arguments, 3);
        function $e() {
          z = !0, q(), a.apply(i, Ee), _ = !1;
        }
        var Fe, yt = !1, ct = !1;
        function P(j) {
          if (Fe = j.error, yt = !0, Fe === null && j.colno === 0 && j.lineno === 0 && (ct = !0), j.defaultPrevented && Fe != null && typeof Fe == "object")
            try {
              Fe._suppressLogging = !0;
            } catch {
            }
        }
        var Z = "react-" + (t || "invokeguardedcallback");
        if (window.addEventListener("error", P), wd.addEventListener(Z, $e, !1), x.initEvent(Z, !1, !1), wd.dispatchEvent(x), Q && Object.defineProperty(window, "event", Q), z && _ && (yt ? ct && (Fe = new Error("A cross-origin error was thrown. React doesn't have access to the actual error object in development. See https://reactjs.org/link/crossorigin-error for more information.")) : Fe = new Error(`An error was thrown inside one of your components, but React doesn't know what it was. This is likely due to browser flakiness. React does its best to preserve the "Pause on exceptions" behavior of the DevTools, which requires some DEV-mode only tricks. It's possible that these don't work in your browser. Try triggering the error in production mode, or switching to a modern browser. If you suspect that this is actually an issue with React, please file an issue.`), this.onError(Fe)), window.removeEventListener("error", P), !z)
          return q(), sc.apply(this, arguments);
      };
    }
    var eh = cc, bu = !1, fc = null, Du = !1, Ha = null, th = {
      onError: function(e) {
        bu = !0, fc = e;
      }
    };
    function Pi(e, t, a, i, u, s, f, v, y) {
      bu = !1, fc = null, eh.apply(th, arguments);
    }
    function Va(e, t, a, i, u, s, f, v, y) {
      if (Pi.apply(this, arguments), bu) {
        var C = No();
        Du || (Du = !0, Ha = C);
      }
    }
    function _o() {
      if (Du) {
        var e = Ha;
        throw Du = !1, Ha = null, e;
      }
    }
    function si() {
      return bu;
    }
    function No() {
      if (bu) {
        var e = fc;
        return bu = !1, fc = null, e;
      } else
        throw new Error("clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue.");
    }
    function ku(e) {
      return e._reactInternals;
    }
    function cg(e) {
      return e._reactInternals !== void 0;
    }
    function Ml(e, t) {
      e._reactInternals = t;
    }
    var je = (
      /*                      */
      0
    ), Ta = (
      /*                */
      1
    ), un = (
      /*                    */
      2
    ), vt = (
      /*                       */
      4
    ), ra = (
      /*                */
      16
    ), ba = (
      /*                 */
      32
    ), jt = (
      /*                     */
      64
    ), Pe = (
      /*                   */
      128
    ), Rr = (
      /*            */
      256
    ), rn = (
      /*                          */
      512
    ), bn = (
      /*                     */
      1024
    ), xr = (
      /*                      */
      2048
    ), aa = (
      /*                    */
      4096
    ), mn = (
      /*                   */
      8192
    ), Ou = (
      /*             */
      16384
    ), nh = (
      /*               */
      32767
    ), zo = (
      /*                   */
      32768
    ), wr = (
      /*                */
      65536
    ), dc = (
      /* */
      131072
    ), Pa = (
      /*                       */
      1048576
    ), Mu = (
      /*                    */
      2097152
    ), ci = (
      /*                 */
      4194304
    ), pc = (
      /*                */
      8388608
    ), ji = (
      /*               */
      16777216
    ), ja = (
      /*              */
      33554432
    ), Bi = (
      // TODO: Remove Update flag from before mutation phase by re-landing Visibility
      // flag logic (see #20043)
      vt | bn | 0
    ), Ii = un | vt | ra | ba | rn | aa | mn, $i = vt | jt | rn | mn, fi = xr | ra, yn = ci | pc | Mu, ia = m.ReactCurrentOwner;
    function Vr(e) {
      var t = e, a = e;
      if (e.alternate)
        for (; t.return; )
          t = t.return;
      else {
        var i = t;
        do
          t = i, (t.flags & (un | aa)) !== je && (a = t.return), i = t.return;
        while (i);
      }
      return t.tag === M ? a : null;
    }
    function Ba(e) {
      if (e.tag === fe) {
        var t = e.memoizedState;
        if (t === null) {
          var a = e.alternate;
          a !== null && (t = a.memoizedState);
        }
        if (t !== null)
          return t.dehydrated;
      }
      return null;
    }
    function Ia(e) {
      return e.tag === M ? e.stateNode.containerInfo : null;
    }
    function Ll(e) {
      return Vr(e) === e;
    }
    function rh(e) {
      {
        var t = ia.current;
        if (t !== null && t.tag === k) {
          var a = t, i = a.stateNode;
          i._warnedAboutRefsInRender || h("%s is accessing isMounted inside its render() function. render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", at(a) || "A component"), i._warnedAboutRefsInRender = !0;
        }
      }
      var u = ku(e);
      return u ? Vr(u) === u : !1;
    }
    function vc(e) {
      if (Vr(e) !== e)
        throw new Error("Unable to find node on an unmounted component.");
    }
    function hc(e) {
      var t = e.alternate;
      if (!t) {
        var a = Vr(e);
        if (a === null)
          throw new Error("Unable to find node on an unmounted component.");
        return a !== e ? null : e;
      }
      for (var i = e, u = t; ; ) {
        var s = i.return;
        if (s === null)
          break;
        var f = s.alternate;
        if (f === null) {
          var v = s.return;
          if (v !== null) {
            i = u = v;
            continue;
          }
          break;
        }
        if (s.child === f.child) {
          for (var y = s.child; y; ) {
            if (y === i)
              return vc(s), e;
            if (y === u)
              return vc(s), t;
            y = y.sibling;
          }
          throw new Error("Unable to find node on an unmounted component.");
        }
        if (i.return !== u.return)
          i = s, u = f;
        else {
          for (var C = !1, x = s.child; x; ) {
            if (x === i) {
              C = !0, i = s, u = f;
              break;
            }
            if (x === u) {
              C = !0, u = s, i = f;
              break;
            }
            x = x.sibling;
          }
          if (!C) {
            for (x = f.child; x; ) {
              if (x === i) {
                C = !0, i = f, u = s;
                break;
              }
              if (x === u) {
                C = !0, u = f, i = s;
                break;
              }
              x = x.sibling;
            }
            if (!C)
              throw new Error("Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue.");
          }
        }
        if (i.alternate !== u)
          throw new Error("Return fibers should always be each others' alternates. This error is likely caused by a bug in React. Please file an issue.");
      }
      if (i.tag !== M)
        throw new Error("Unable to find node on an unmounted component.");
      return i.stateNode.current === i ? e : t;
    }
    function Tr(e) {
      var t = hc(e);
      return t !== null ? br(t) : null;
    }
    function br(e) {
      if (e.tag === D || e.tag === F)
        return e;
      for (var t = e.child; t !== null; ) {
        var a = br(t);
        if (a !== null)
          return a;
        t = t.sibling;
      }
      return null;
    }
    function Gt(e) {
      var t = hc(e);
      return t !== null ? la(t) : null;
    }
    function la(e) {
      if (e.tag === D || e.tag === F)
        return e;
      for (var t = e.child; t !== null; ) {
        if (t.tag !== A) {
          var a = la(t);
          if (a !== null)
            return a;
        }
        t = t.sibling;
      }
      return null;
    }
    var Td = g.unstable_scheduleCallback, ah = g.unstable_cancelCallback, bd = g.unstable_shouldYield, Dd = g.unstable_requestPaint, Dn = g.unstable_now, mc = g.unstable_getCurrentPriorityLevel, Ao = g.unstable_ImmediatePriority, Yi = g.unstable_UserBlockingPriority, di = g.unstable_NormalPriority, fg = g.unstable_LowPriority, _l = g.unstable_IdlePriority, yc = g.unstable_yieldValue, ih = g.unstable_setDisableYieldValue, Nl = null, on = null, Se = null, Pr = !1, Dr = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u";
    function Lu(e) {
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u")
        return !1;
      var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (t.isDisabled)
        return !0;
      if (!t.supportsFiber)
        return h("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://reactjs.org/link/react-devtools"), !0;
      try {
        Bt && (e = ft({}, e, {
          getLaneLabelMap: zl,
          injectProfilingHooks: ua
        })), Nl = t.inject(e), on = t;
      } catch (a) {
        h("React instrumentation encountered an error: %s.", a);
      }
      return !!t.checkDCE;
    }
    function kd(e, t) {
      if (on && typeof on.onScheduleFiberRoot == "function")
        try {
          on.onScheduleFiberRoot(Nl, e, t);
        } catch (a) {
          Pr || (Pr = !0, h("React instrumentation encountered an error: %s", a));
        }
    }
    function Od(e, t) {
      if (on && typeof on.onCommitFiberRoot == "function")
        try {
          var a = (e.current.flags & Pe) === Pe;
          if (Mt) {
            var i;
            switch (t) {
              case rr:
                i = Ao;
                break;
              case Ya:
                i = Yi;
                break;
              case oa:
                i = di;
                break;
              case sa:
                i = _l;
                break;
              default:
                i = di;
                break;
            }
            on.onCommitFiberRoot(Nl, e, i, a);
          }
        } catch (u) {
          Pr || (Pr = !0, h("React instrumentation encountered an error: %s", u));
        }
    }
    function Md(e) {
      if (on && typeof on.onPostCommitFiberRoot == "function")
        try {
          on.onPostCommitFiberRoot(Nl, e);
        } catch (t) {
          Pr || (Pr = !0, h("React instrumentation encountered an error: %s", t));
        }
    }
    function Ld(e) {
      if (on && typeof on.onCommitFiberUnmount == "function")
        try {
          on.onCommitFiberUnmount(Nl, e);
        } catch (t) {
          Pr || (Pr = !0, h("React instrumentation encountered an error: %s", t));
        }
    }
    function Xt(e) {
      if (typeof yc == "function" && (ih(e), R(e)), on && typeof on.setStrictMode == "function")
        try {
          on.setStrictMode(Nl, e);
        } catch (t) {
          Pr || (Pr = !0, h("React instrumentation encountered an error: %s", t));
        }
    }
    function ua(e) {
      Se = e;
    }
    function zl() {
      {
        for (var e = /* @__PURE__ */ new Map(), t = 1, a = 0; a < Fl; a++) {
          var i = sh(t);
          e.set(t, i), t *= 2;
        }
        return e;
      }
    }
    function _d(e) {
      Se !== null && typeof Se.markCommitStarted == "function" && Se.markCommitStarted(e);
    }
    function Nd() {
      Se !== null && typeof Se.markCommitStopped == "function" && Se.markCommitStopped();
    }
    function jr(e) {
      Se !== null && typeof Se.markComponentRenderStarted == "function" && Se.markComponentRenderStarted(e);
    }
    function Br() {
      Se !== null && typeof Se.markComponentRenderStopped == "function" && Se.markComponentRenderStopped();
    }
    function zd(e) {
      Se !== null && typeof Se.markComponentPassiveEffectMountStarted == "function" && Se.markComponentPassiveEffectMountStarted(e);
    }
    function lh() {
      Se !== null && typeof Se.markComponentPassiveEffectMountStopped == "function" && Se.markComponentPassiveEffectMountStopped();
    }
    function pi(e) {
      Se !== null && typeof Se.markComponentPassiveEffectUnmountStarted == "function" && Se.markComponentPassiveEffectUnmountStarted(e);
    }
    function Qi() {
      Se !== null && typeof Se.markComponentPassiveEffectUnmountStopped == "function" && Se.markComponentPassiveEffectUnmountStopped();
    }
    function gc(e) {
      Se !== null && typeof Se.markComponentLayoutEffectMountStarted == "function" && Se.markComponentLayoutEffectMountStarted(e);
    }
    function uh() {
      Se !== null && typeof Se.markComponentLayoutEffectMountStopped == "function" && Se.markComponentLayoutEffectMountStopped();
    }
    function Uo(e) {
      Se !== null && typeof Se.markComponentLayoutEffectUnmountStarted == "function" && Se.markComponentLayoutEffectUnmountStarted(e);
    }
    function Ad() {
      Se !== null && typeof Se.markComponentLayoutEffectUnmountStopped == "function" && Se.markComponentLayoutEffectUnmountStopped();
    }
    function Fo(e, t, a) {
      Se !== null && typeof Se.markComponentErrored == "function" && Se.markComponentErrored(e, t, a);
    }
    function $a(e, t, a) {
      Se !== null && typeof Se.markComponentSuspended == "function" && Se.markComponentSuspended(e, t, a);
    }
    function Ho(e) {
      Se !== null && typeof Se.markLayoutEffectsStarted == "function" && Se.markLayoutEffectsStarted(e);
    }
    function Vo() {
      Se !== null && typeof Se.markLayoutEffectsStopped == "function" && Se.markLayoutEffectsStopped();
    }
    function Al(e) {
      Se !== null && typeof Se.markPassiveEffectsStarted == "function" && Se.markPassiveEffectsStarted(e);
    }
    function Ud() {
      Se !== null && typeof Se.markPassiveEffectsStopped == "function" && Se.markPassiveEffectsStopped();
    }
    function Ul(e) {
      Se !== null && typeof Se.markRenderStarted == "function" && Se.markRenderStarted(e);
    }
    function oh() {
      Se !== null && typeof Se.markRenderYielded == "function" && Se.markRenderYielded();
    }
    function Sc() {
      Se !== null && typeof Se.markRenderStopped == "function" && Se.markRenderStopped();
    }
    function qt(e) {
      Se !== null && typeof Se.markRenderScheduled == "function" && Se.markRenderScheduled(e);
    }
    function Ec(e, t) {
      Se !== null && typeof Se.markForceUpdateScheduled == "function" && Se.markForceUpdateScheduled(e, t);
    }
    function Po(e, t) {
      Se !== null && typeof Se.markStateUpdateScheduled == "function" && Se.markStateUpdateScheduled(e, t);
    }
    var Be = (
      /*                         */
      0
    ), ot = (
      /*                 */
      1
    ), Ct = (
      /*                    */
      2
    ), At = (
      /*               */
      8
    ), Rt = (
      /*              */
      16
    ), gn = Math.clz32 ? Math.clz32 : jo, Ln = Math.log, Cc = Math.LN2;
    function jo(e) {
      var t = e >>> 0;
      return t === 0 ? 32 : 31 - (Ln(t) / Cc | 0) | 0;
    }
    var Fl = 31, ae = (
      /*                        */
      0
    ), St = (
      /*                          */
      0
    ), qe = (
      /*                        */
      1
    ), Wi = (
      /*    */
      2
    ), Da = (
      /*             */
      4
    ), Zn = (
      /*            */
      8
    ), sn = (
      /*                     */
      16
    ), vi = (
      /*                */
      32
    ), Gi = (
      /*                       */
      4194240
    ), Hl = (
      /*                        */
      64
    ), Rc = (
      /*                        */
      128
    ), xc = (
      /*                        */
      256
    ), wc = (
      /*                        */
      512
    ), Tc = (
      /*                        */
      1024
    ), bc = (
      /*                        */
      2048
    ), Dc = (
      /*                        */
      4096
    ), kc = (
      /*                        */
      8192
    ), Oc = (
      /*                        */
      16384
    ), Vl = (
      /*                       */
      32768
    ), Mc = (
      /*                       */
      65536
    ), _u = (
      /*                       */
      131072
    ), Nu = (
      /*                       */
      262144
    ), Lc = (
      /*                       */
      524288
    ), Bo = (
      /*                       */
      1048576
    ), _c = (
      /*                       */
      2097152
    ), Io = (
      /*                            */
      130023424
    ), Pl = (
      /*                             */
      4194304
    ), Nc = (
      /*                             */
      8388608
    ), $o = (
      /*                             */
      16777216
    ), zc = (
      /*                             */
      33554432
    ), Ac = (
      /*                             */
      67108864
    ), Fd = Pl, Yo = (
      /*          */
      134217728
    ), Hd = (
      /*                          */
      268435455
    ), Qo = (
      /*               */
      268435456
    ), jl = (
      /*                        */
      536870912
    ), Ir = (
      /*                   */
      1073741824
    );
    function sh(e) {
      {
        if (e & qe)
          return "Sync";
        if (e & Wi)
          return "InputContinuousHydration";
        if (e & Da)
          return "InputContinuous";
        if (e & Zn)
          return "DefaultHydration";
        if (e & sn)
          return "Default";
        if (e & vi)
          return "TransitionHydration";
        if (e & Gi)
          return "Transition";
        if (e & Io)
          return "Retry";
        if (e & Yo)
          return "SelectiveHydration";
        if (e & Qo)
          return "IdleHydration";
        if (e & jl)
          return "Idle";
        if (e & Ir)
          return "Offscreen";
      }
    }
    var Vt = -1, Bl = Hl, Uc = Pl;
    function Wo(e) {
      switch (Ki(e)) {
        case qe:
          return qe;
        case Wi:
          return Wi;
        case Da:
          return Da;
        case Zn:
          return Zn;
        case sn:
          return sn;
        case vi:
          return vi;
        case Hl:
        case Rc:
        case xc:
        case wc:
        case Tc:
        case bc:
        case Dc:
        case kc:
        case Oc:
        case Vl:
        case Mc:
        case _u:
        case Nu:
        case Lc:
        case Bo:
        case _c:
          return e & Gi;
        case Pl:
        case Nc:
        case $o:
        case zc:
        case Ac:
          return e & Io;
        case Yo:
          return Yo;
        case Qo:
          return Qo;
        case jl:
          return jl;
        case Ir:
          return Ir;
        default:
          return h("Should have found matching lanes. This is a bug in React."), e;
      }
    }
    function Fc(e, t) {
      var a = e.pendingLanes;
      if (a === ae)
        return ae;
      var i = ae, u = e.suspendedLanes, s = e.pingedLanes, f = a & Hd;
      if (f !== ae) {
        var v = f & ~u;
        if (v !== ae)
          i = Wo(v);
        else {
          var y = f & s;
          y !== ae && (i = Wo(y));
        }
      } else {
        var C = a & ~u;
        C !== ae ? i = Wo(C) : s !== ae && (i = Wo(s));
      }
      if (i === ae)
        return ae;
      if (t !== ae && t !== i && // If we already suspended with a delay, then interrupting is fine. Don't
      // bother waiting until the root is complete.
      (t & u) === ae) {
        var x = Ki(i), z = Ki(t);
        if (
          // Tests whether the next lane is equal or lower priority than the wip
          // one. This works because the bits decrease in priority as you go left.
          x >= z || // Default priority updates should not interrupt transition updates. The
          // only difference between default updates and transition updates is that
          // default updates do not support refresh transitions.
          x === sn && (z & Gi) !== ae
        )
          return t;
      }
      (i & Da) !== ae && (i |= a & sn);
      var _ = e.entangledLanes;
      if (_ !== ae)
        for (var $ = e.entanglements, Q = i & _; Q > 0; ) {
          var q = Sn(Q), Ee = 1 << q;
          i |= $[q], Q &= ~Ee;
        }
      return i;
    }
    function ka(e, t) {
      for (var a = e.eventTimes, i = Vt; t > 0; ) {
        var u = Sn(t), s = 1 << u, f = a[u];
        f > i && (i = f), t &= ~s;
      }
      return i;
    }
    function Vd(e, t) {
      switch (e) {
        case qe:
        case Wi:
        case Da:
          return t + 250;
        case Zn:
        case sn:
        case vi:
        case Hl:
        case Rc:
        case xc:
        case wc:
        case Tc:
        case bc:
        case Dc:
        case kc:
        case Oc:
        case Vl:
        case Mc:
        case _u:
        case Nu:
        case Lc:
        case Bo:
        case _c:
          return t + 5e3;
        case Pl:
        case Nc:
        case $o:
        case zc:
        case Ac:
          return Vt;
        case Yo:
        case Qo:
        case jl:
        case Ir:
          return Vt;
        default:
          return h("Should have found matching lanes. This is a bug in React."), Vt;
      }
    }
    function Hc(e, t) {
      for (var a = e.pendingLanes, i = e.suspendedLanes, u = e.pingedLanes, s = e.expirationTimes, f = a; f > 0; ) {
        var v = Sn(f), y = 1 << v, C = s[v];
        C === Vt ? ((y & i) === ae || (y & u) !== ae) && (s[v] = Vd(y, t)) : C <= t && (e.expiredLanes |= y), f &= ~y;
      }
    }
    function ch(e) {
      return Wo(e.pendingLanes);
    }
    function Vc(e) {
      var t = e.pendingLanes & -1073741825;
      return t !== ae ? t : t & Ir ? Ir : ae;
    }
    function fh(e) {
      return (e & qe) !== ae;
    }
    function Go(e) {
      return (e & Hd) !== ae;
    }
    function Il(e) {
      return (e & Io) === e;
    }
    function Pd(e) {
      var t = qe | Da | sn;
      return (e & t) === ae;
    }
    function jd(e) {
      return (e & Gi) === e;
    }
    function Pc(e, t) {
      var a = Wi | Da | Zn | sn;
      return (t & a) !== ae;
    }
    function dh(e, t) {
      return (t & e.expiredLanes) !== ae;
    }
    function Bd(e) {
      return (e & Gi) !== ae;
    }
    function Id() {
      var e = Bl;
      return Bl <<= 1, (Bl & Gi) === ae && (Bl = Hl), e;
    }
    function ph() {
      var e = Uc;
      return Uc <<= 1, (Uc & Io) === ae && (Uc = Pl), e;
    }
    function Ki(e) {
      return e & -e;
    }
    function Ko(e) {
      return Ki(e);
    }
    function Sn(e) {
      return 31 - gn(e);
    }
    function Pn(e) {
      return Sn(e);
    }
    function kr(e, t) {
      return (e & t) !== ae;
    }
    function $l(e, t) {
      return (e & t) === t;
    }
    function it(e, t) {
      return e | t;
    }
    function Xo(e, t) {
      return e & ~t;
    }
    function $d(e, t) {
      return e & t;
    }
    function vh(e) {
      return e;
    }
    function hh(e, t) {
      return e !== St && e < t ? e : t;
    }
    function qo(e) {
      for (var t = [], a = 0; a < Fl; a++)
        t.push(e);
      return t;
    }
    function zu(e, t, a) {
      e.pendingLanes |= t, t !== jl && (e.suspendedLanes = ae, e.pingedLanes = ae);
      var i = e.eventTimes, u = Pn(t);
      i[u] = a;
    }
    function mh(e, t) {
      e.suspendedLanes |= t, e.pingedLanes &= ~t;
      for (var a = e.expirationTimes, i = t; i > 0; ) {
        var u = Sn(i), s = 1 << u;
        a[u] = Vt, i &= ~s;
      }
    }
    function jc(e, t, a) {
      e.pingedLanes |= e.suspendedLanes & t;
    }
    function Yd(e, t) {
      var a = e.pendingLanes & ~t;
      e.pendingLanes = t, e.suspendedLanes = ae, e.pingedLanes = ae, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t;
      for (var i = e.entanglements, u = e.eventTimes, s = e.expirationTimes, f = a; f > 0; ) {
        var v = Sn(f), y = 1 << v;
        i[v] = ae, u[v] = Vt, s[v] = Vt, f &= ~y;
      }
    }
    function Bc(e, t) {
      for (var a = e.entangledLanes |= t, i = e.entanglements, u = a; u; ) {
        var s = Sn(u), f = 1 << s;
        // Is this one of the newly entangled lanes?
        f & t | // Is this lane transitively entangled with the newly entangled lanes?
        i[s] & t && (i[s] |= t), u &= ~f;
      }
    }
    function Qd(e, t) {
      var a = Ki(t), i;
      switch (a) {
        case Da:
          i = Wi;
          break;
        case sn:
          i = Zn;
          break;
        case Hl:
        case Rc:
        case xc:
        case wc:
        case Tc:
        case bc:
        case Dc:
        case kc:
        case Oc:
        case Vl:
        case Mc:
        case _u:
        case Nu:
        case Lc:
        case Bo:
        case _c:
        case Pl:
        case Nc:
        case $o:
        case zc:
        case Ac:
          i = vi;
          break;
        case jl:
          i = Qo;
          break;
        default:
          i = St;
          break;
      }
      return (i & (e.suspendedLanes | t)) !== St ? St : i;
    }
    function Zo(e, t, a) {
      if (Dr)
        for (var i = e.pendingUpdatersLaneMap; a > 0; ) {
          var u = Pn(a), s = 1 << u, f = i[u];
          f.add(t), a &= ~s;
        }
    }
    function yh(e, t) {
      if (Dr)
        for (var a = e.pendingUpdatersLaneMap, i = e.memoizedUpdaters; t > 0; ) {
          var u = Pn(t), s = 1 << u, f = a[u];
          f.size > 0 && (f.forEach(function(v) {
            var y = v.alternate;
            (y === null || !i.has(y)) && i.add(v);
          }), f.clear()), t &= ~s;
        }
    }
    function Wd(e, t) {
      return null;
    }
    var rr = qe, Ya = Da, oa = sn, sa = jl, Jo = St;
    function ca() {
      return Jo;
    }
    function En(e) {
      Jo = e;
    }
    function gh(e, t) {
      var a = Jo;
      try {
        return Jo = e, t();
      } finally {
        Jo = a;
      }
    }
    function Sh(e, t) {
      return e !== 0 && e < t ? e : t;
    }
    function es(e, t) {
      return e > t ? e : t;
    }
    function _n(e, t) {
      return e !== 0 && e < t;
    }
    function Eh(e) {
      var t = Ki(e);
      return _n(rr, t) ? _n(Ya, t) ? Go(t) ? oa : sa : Ya : rr;
    }
    function Ic(e) {
      var t = e.current.memoizedState;
      return t.isDehydrated;
    }
    var ts;
    function Jn(e) {
      ts = e;
    }
    function dg(e) {
      ts(e);
    }
    var De;
    function Au(e) {
      De = e;
    }
    var $c;
    function Ch(e) {
      $c = e;
    }
    var Rh;
    function ns(e) {
      Rh = e;
    }
    var rs;
    function Gd(e) {
      rs = e;
    }
    var Yc = !1, as = [], hi = null, Qa = null, Wa = null, cn = /* @__PURE__ */ new Map(), ar = /* @__PURE__ */ new Map(), ir = [], xh = [
      "mousedown",
      "mouseup",
      "touchcancel",
      "touchend",
      "touchstart",
      "auxclick",
      "dblclick",
      "pointercancel",
      "pointerdown",
      "pointerup",
      "dragend",
      "dragstart",
      "drop",
      "compositionend",
      "compositionstart",
      "keydown",
      "keypress",
      "keyup",
      "input",
      "textInput",
      // Intentionally camelCase
      "copy",
      "cut",
      "paste",
      "click",
      "change",
      "contextmenu",
      "reset",
      "submit"
    ];
    function wh(e) {
      return xh.indexOf(e) > -1;
    }
    function Oa(e, t, a, i, u) {
      return {
        blockedOn: e,
        domEventName: t,
        eventSystemFlags: a,
        nativeEvent: u,
        targetContainers: [i]
      };
    }
    function Kd(e, t) {
      switch (e) {
        case "focusin":
        case "focusout":
          hi = null;
          break;
        case "dragenter":
        case "dragleave":
          Qa = null;
          break;
        case "mouseover":
        case "mouseout":
          Wa = null;
          break;
        case "pointerover":
        case "pointerout": {
          var a = t.pointerId;
          cn.delete(a);
          break;
        }
        case "gotpointercapture":
        case "lostpointercapture": {
          var i = t.pointerId;
          ar.delete(i);
          break;
        }
      }
    }
    function Or(e, t, a, i, u, s) {
      if (e === null || e.nativeEvent !== s) {
        var f = Oa(t, a, i, u, s);
        if (t !== null) {
          var v = $u(t);
          v !== null && De(v);
        }
        return f;
      }
      e.eventSystemFlags |= i;
      var y = e.targetContainers;
      return u !== null && y.indexOf(u) === -1 && y.push(u), e;
    }
    function pg(e, t, a, i, u) {
      switch (t) {
        case "focusin": {
          var s = u;
          return hi = Or(hi, e, t, a, i, s), !0;
        }
        case "dragenter": {
          var f = u;
          return Qa = Or(Qa, e, t, a, i, f), !0;
        }
        case "mouseover": {
          var v = u;
          return Wa = Or(Wa, e, t, a, i, v), !0;
        }
        case "pointerover": {
          var y = u, C = y.pointerId;
          return cn.set(C, Or(cn.get(C) || null, e, t, a, i, y)), !0;
        }
        case "gotpointercapture": {
          var x = u, z = x.pointerId;
          return ar.set(z, Or(ar.get(z) || null, e, t, a, i, x)), !0;
        }
      }
      return !1;
    }
    function Xd(e) {
      var t = ms(e.target);
      if (t !== null) {
        var a = Vr(t);
        if (a !== null) {
          var i = a.tag;
          if (i === fe) {
            var u = Ba(a);
            if (u !== null) {
              e.blockedOn = u, rs(e.priority, function() {
                $c(a);
              });
              return;
            }
          } else if (i === M) {
            var s = a.stateNode;
            if (Ic(s)) {
              e.blockedOn = Ia(a);
              return;
            }
          }
        }
      }
      e.blockedOn = null;
    }
    function Th(e) {
      for (var t = Rh(), a = {
        blockedOn: null,
        target: e,
        priority: t
      }, i = 0; i < ir.length && _n(t, ir[i].priority); i++)
        ;
      ir.splice(i, 0, a), i === 0 && Xd(a);
    }
    function is(e) {
      if (e.blockedOn !== null)
        return !1;
      for (var t = e.targetContainers; t.length > 0; ) {
        var a = t[0], i = Fu(e.domEventName, e.eventSystemFlags, a, e.nativeEvent);
        if (i === null) {
          var u = e.nativeEvent, s = new u.constructor(u.type, u);
          ug(s), u.target.dispatchEvent(s), og();
        } else {
          var f = $u(i);
          return f !== null && De(f), e.blockedOn = i, !1;
        }
        t.shift();
      }
      return !0;
    }
    function qd(e, t, a) {
      is(e) && a.delete(t);
    }
    function vg() {
      Yc = !1, hi !== null && is(hi) && (hi = null), Qa !== null && is(Qa) && (Qa = null), Wa !== null && is(Wa) && (Wa = null), cn.forEach(qd), ar.forEach(qd);
    }
    function Xi(e, t) {
      e.blockedOn === t && (e.blockedOn = null, Yc || (Yc = !0, g.unstable_scheduleCallback(g.unstable_NormalPriority, vg)));
    }
    function Yl(e) {
      if (as.length > 0) {
        Xi(as[0], e);
        for (var t = 1; t < as.length; t++) {
          var a = as[t];
          a.blockedOn === e && (a.blockedOn = null);
        }
      }
      hi !== null && Xi(hi, e), Qa !== null && Xi(Qa, e), Wa !== null && Xi(Wa, e);
      var i = function(v) {
        return Xi(v, e);
      };
      cn.forEach(i), ar.forEach(i);
      for (var u = 0; u < ir.length; u++) {
        var s = ir[u];
        s.blockedOn === e && (s.blockedOn = null);
      }
      for (; ir.length > 0; ) {
        var f = ir[0];
        if (f.blockedOn !== null)
          break;
        Xd(f), f.blockedOn === null && ir.shift();
      }
    }
    var jn = m.ReactCurrentBatchConfig, ht = !0;
    function kn(e) {
      ht = !!e;
    }
    function Cn() {
      return ht;
    }
    function Bn(e, t, a) {
      var i = Qc(t), u;
      switch (i) {
        case rr:
          u = $r;
          break;
        case Ya:
          u = Uu;
          break;
        case oa:
        default:
          u = fn;
          break;
      }
      return u.bind(null, t, a, e);
    }
    function $r(e, t, a, i) {
      var u = ca(), s = jn.transition;
      jn.transition = null;
      try {
        En(rr), fn(e, t, a, i);
      } finally {
        En(u), jn.transition = s;
      }
    }
    function Uu(e, t, a, i) {
      var u = ca(), s = jn.transition;
      jn.transition = null;
      try {
        En(Ya), fn(e, t, a, i);
      } finally {
        En(u), jn.transition = s;
      }
    }
    function fn(e, t, a, i) {
      ht && ls(e, t, a, i);
    }
    function ls(e, t, a, i) {
      var u = Fu(e, t, a, i);
      if (u === null) {
        Lg(e, t, i, Ga, a), Kd(e, i);
        return;
      }
      if (pg(u, e, t, a, i)) {
        i.stopPropagation();
        return;
      }
      if (Kd(e, i), t & na && wh(e)) {
        for (; u !== null; ) {
          var s = $u(u);
          s !== null && dg(s);
          var f = Fu(e, t, a, i);
          if (f === null && Lg(e, t, i, Ga, a), f === u)
            break;
          u = f;
        }
        u !== null && i.stopPropagation();
        return;
      }
      Lg(e, t, i, null, a);
    }
    var Ga = null;
    function Fu(e, t, a, i) {
      Ga = null;
      var u = xd(i), s = ms(u);
      if (s !== null) {
        var f = Vr(s);
        if (f === null)
          s = null;
        else {
          var v = f.tag;
          if (v === fe) {
            var y = Ba(f);
            if (y !== null)
              return y;
            s = null;
          } else if (v === M) {
            var C = f.stateNode;
            if (Ic(C))
              return Ia(f);
            s = null;
          } else f !== s && (s = null);
        }
      }
      return Ga = s, null;
    }
    function Qc(e) {
      switch (e) {
        // Used by SimpleEventPlugin:
        case "cancel":
        case "click":
        case "close":
        case "contextmenu":
        case "copy":
        case "cut":
        case "auxclick":
        case "dblclick":
        case "dragend":
        case "dragstart":
        case "drop":
        case "focusin":
        case "focusout":
        case "input":
        case "invalid":
        case "keydown":
        case "keypress":
        case "keyup":
        case "mousedown":
        case "mouseup":
        case "paste":
        case "pause":
        case "play":
        case "pointercancel":
        case "pointerdown":
        case "pointerup":
        case "ratechange":
        case "reset":
        case "resize":
        case "seeked":
        case "submit":
        case "touchcancel":
        case "touchend":
        case "touchstart":
        case "volumechange":
        // Used by polyfills:
        // eslint-disable-next-line no-fallthrough
        case "change":
        case "selectionchange":
        case "textInput":
        case "compositionstart":
        case "compositionend":
        case "compositionupdate":
        // Only enableCreateEventHandleAPI:
        // eslint-disable-next-line no-fallthrough
        case "beforeblur":
        case "afterblur":
        // Not used by React but could be by user code:
        // eslint-disable-next-line no-fallthrough
        case "beforeinput":
        case "blur":
        case "fullscreenchange":
        case "focus":
        case "hashchange":
        case "popstate":
        case "select":
        case "selectstart":
          return rr;
        case "drag":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "mousemove":
        case "mouseout":
        case "mouseover":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "scroll":
        case "toggle":
        case "touchmove":
        case "wheel":
        // Not used by React but could be by user code:
        // eslint-disable-next-line no-fallthrough
        case "mouseenter":
        case "mouseleave":
        case "pointerenter":
        case "pointerleave":
          return Ya;
        case "message": {
          var t = mc();
          switch (t) {
            case Ao:
              return rr;
            case Yi:
              return Ya;
            case di:
            case fg:
              return oa;
            case _l:
              return sa;
            default:
              return oa;
          }
        }
        default:
          return oa;
      }
    }
    function us(e, t, a) {
      return e.addEventListener(t, a, !1), a;
    }
    function Mr(e, t, a) {
      return e.addEventListener(t, a, !0), a;
    }
    function Zd(e, t, a, i) {
      return e.addEventListener(t, a, {
        capture: !0,
        passive: i
      }), a;
    }
    function Hu(e, t, a, i) {
      return e.addEventListener(t, a, {
        passive: i
      }), a;
    }
    var Yr = null, Vu = null, Ql = null;
    function qi(e) {
      return Yr = e, Vu = os(), !0;
    }
    function Wc() {
      Yr = null, Vu = null, Ql = null;
    }
    function mi() {
      if (Ql)
        return Ql;
      var e, t = Vu, a = t.length, i, u = os(), s = u.length;
      for (e = 0; e < a && t[e] === u[e]; e++)
        ;
      var f = a - e;
      for (i = 1; i <= f && t[a - i] === u[s - i]; i++)
        ;
      var v = i > 1 ? 1 - i : void 0;
      return Ql = u.slice(e, v), Ql;
    }
    function os() {
      return "value" in Yr ? Yr.value : Yr.textContent;
    }
    function Zi(e) {
      var t, a = e.keyCode;
      return "charCode" in e ? (t = e.charCode, t === 0 && a === 13 && (t = 13)) : t = a, t === 10 && (t = 13), t >= 32 || t === 13 ? t : 0;
    }
    function Pu() {
      return !0;
    }
    function ss() {
      return !1;
    }
    function er(e) {
      function t(a, i, u, s, f) {
        this._reactName = a, this._targetInst = u, this.type = i, this.nativeEvent = s, this.target = f, this.currentTarget = null;
        for (var v in e)
          if (e.hasOwnProperty(v)) {
            var y = e[v];
            y ? this[v] = y(s) : this[v] = s[v];
          }
        var C = s.defaultPrevented != null ? s.defaultPrevented : s.returnValue === !1;
        return C ? this.isDefaultPrevented = Pu : this.isDefaultPrevented = ss, this.isPropagationStopped = ss, this;
      }
      return ft(t.prototype, {
        preventDefault: function() {
          this.defaultPrevented = !0;
          var a = this.nativeEvent;
          a && (a.preventDefault ? a.preventDefault() : typeof a.returnValue != "unknown" && (a.returnValue = !1), this.isDefaultPrevented = Pu);
        },
        stopPropagation: function() {
          var a = this.nativeEvent;
          a && (a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0), this.isPropagationStopped = Pu);
        },
        /**
         * We release all dispatched `SyntheticEvent`s after each event loop, adding
         * them back into the pool. This allows a way to hold onto a reference that
         * won't be added back into the pool.
         */
        persist: function() {
        },
        /**
         * Checks if this event should be released back into the pool.
         *
         * @return {boolean} True if this should not be released, false otherwise.
         */
        isPersistent: Pu
      }), t;
    }
    var Rn = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function(e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0
    }, Ka = er(Rn), lr = ft({}, Rn, {
      view: 0,
      detail: 0
    }), Lr = er(lr), Gc, cs, Wl;
    function hg(e) {
      e !== Wl && (Wl && e.type === "mousemove" ? (Gc = e.screenX - Wl.screenX, cs = e.screenY - Wl.screenY) : (Gc = 0, cs = 0), Wl = e);
    }
    var Ma = ft({}, lr, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: Kt,
      button: 0,
      buttons: 0,
      relatedTarget: function(e) {
        return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
      },
      movementX: function(e) {
        return "movementX" in e ? e.movementX : (hg(e), Gc);
      },
      movementY: function(e) {
        return "movementY" in e ? e.movementY : cs;
      }
    }), Jd = er(Ma), ep = ft({}, Ma, {
      dataTransfer: 0
    }), Gl = er(ep), tp = ft({}, lr, {
      relatedTarget: 0
    }), yi = er(tp), bh = ft({}, Rn, {
      animationName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), Dh = er(bh), np = ft({}, Rn, {
      clipboardData: function(e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      }
    }), Kc = er(np), mg = ft({}, Rn, {
      data: 0
    }), kh = er(mg), Oh = kh, Mh = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified"
    }, Kl = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta"
    };
    function yg(e) {
      if (e.key) {
        var t = Mh[e.key] || e.key;
        if (t !== "Unidentified")
          return t;
      }
      if (e.type === "keypress") {
        var a = Zi(e);
        return a === 13 ? "Enter" : String.fromCharCode(a);
      }
      return e.type === "keydown" || e.type === "keyup" ? Kl[e.keyCode] || "Unidentified" : "";
    }
    var ju = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey"
    };
    function Lh(e) {
      var t = this, a = t.nativeEvent;
      if (a.getModifierState)
        return a.getModifierState(e);
      var i = ju[e];
      return i ? !!a[i] : !1;
    }
    function Kt(e) {
      return Lh;
    }
    var gg = ft({}, lr, {
      key: yg,
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: Kt,
      // Legacy Interface
      charCode: function(e) {
        return e.type === "keypress" ? Zi(e) : 0;
      },
      keyCode: function(e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function(e) {
        return e.type === "keypress" ? Zi(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      }
    }), _h = er(gg), Sg = ft({}, Ma, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0
    }), Nh = er(Sg), zh = ft({}, lr, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Kt
    }), Ah = er(zh), Eg = ft({}, Rn, {
      propertyName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), fa = er(Eg), rp = ft({}, Ma, {
      deltaX: function(e) {
        return "deltaX" in e ? e.deltaX : (
          // Fallback to `wheelDeltaX` for Webkit and normalize (right is positive).
          "wheelDeltaX" in e ? -e.wheelDeltaX : 0
        );
      },
      deltaY: function(e) {
        return "deltaY" in e ? e.deltaY : (
          // Fallback to `wheelDeltaY` for Webkit and normalize (down is positive).
          "wheelDeltaY" in e ? -e.wheelDeltaY : (
            // Fallback to `wheelDelta` for IE<9 and normalize (down is positive).
            "wheelDelta" in e ? -e.wheelDelta : 0
          )
        );
      },
      deltaZ: 0,
      // Browsers without "deltaMode" is reporting in raw wheel delta where one
      // notch on the scroll is always +/- 120, roughly equivalent to pixels.
      // A good approximation of DOM_DELTA_LINE (1) is 5% of viewport size or
      // ~40 pixels, for DOM_DELTA_SCREEN (2) it is 87.5% of viewport size.
      deltaMode: 0
    }), Cg = er(rp), Ji = [9, 13, 27, 32], fs = 229, gi = Ue && "CompositionEvent" in window, el = null;
    Ue && "documentMode" in document && (el = document.documentMode);
    var ap = Ue && "TextEvent" in window && !el, Xc = Ue && (!gi || el && el > 8 && el <= 11), Uh = 32, qc = String.fromCharCode(Uh);
    function Rg() {
      Ke("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), Ke("onCompositionEnd", ["compositionend", "focusout", "keydown", "keypress", "keyup", "mousedown"]), Ke("onCompositionStart", ["compositionstart", "focusout", "keydown", "keypress", "keyup", "mousedown"]), Ke("onCompositionUpdate", ["compositionupdate", "focusout", "keydown", "keypress", "keyup", "mousedown"]);
    }
    var ip = !1;
    function Fh(e) {
      return (e.ctrlKey || e.altKey || e.metaKey) && // ctrlKey && altKey is equivalent to AltGr, and is not a command.
      !(e.ctrlKey && e.altKey);
    }
    function Zc(e) {
      switch (e) {
        case "compositionstart":
          return "onCompositionStart";
        case "compositionend":
          return "onCompositionEnd";
        case "compositionupdate":
          return "onCompositionUpdate";
      }
    }
    function Jc(e, t) {
      return e === "keydown" && t.keyCode === fs;
    }
    function lp(e, t) {
      switch (e) {
        case "keyup":
          return Ji.indexOf(t.keyCode) !== -1;
        case "keydown":
          return t.keyCode !== fs;
        case "keypress":
        case "mousedown":
        case "focusout":
          return !0;
        default:
          return !1;
      }
    }
    function ef(e) {
      var t = e.detail;
      return typeof t == "object" && "data" in t ? t.data : null;
    }
    function Hh(e) {
      return e.locale === "ko";
    }
    var Xl = !1;
    function up(e, t, a, i, u) {
      var s, f;
      if (gi ? s = Zc(t) : Xl ? lp(t, i) && (s = "onCompositionEnd") : Jc(t, i) && (s = "onCompositionStart"), !s)
        return null;
      Xc && !Hh(i) && (!Xl && s === "onCompositionStart" ? Xl = qi(u) : s === "onCompositionEnd" && Xl && (f = mi()));
      var v = Yh(a, s);
      if (v.length > 0) {
        var y = new kh(s, t, null, i, u);
        if (e.push({
          event: y,
          listeners: v
        }), f)
          y.data = f;
        else {
          var C = ef(i);
          C !== null && (y.data = C);
        }
      }
    }
    function tf(e, t) {
      switch (e) {
        case "compositionend":
          return ef(t);
        case "keypress":
          var a = t.which;
          return a !== Uh ? null : (ip = !0, qc);
        case "textInput":
          var i = t.data;
          return i === qc && ip ? null : i;
        default:
          return null;
      }
    }
    function op(e, t) {
      if (Xl) {
        if (e === "compositionend" || !gi && lp(e, t)) {
          var a = mi();
          return Wc(), Xl = !1, a;
        }
        return null;
      }
      switch (e) {
        case "paste":
          return null;
        case "keypress":
          if (!Fh(t)) {
            if (t.char && t.char.length > 1)
              return t.char;
            if (t.which)
              return String.fromCharCode(t.which);
          }
          return null;
        case "compositionend":
          return Xc && !Hh(t) ? null : t.data;
        default:
          return null;
      }
    }
    function nf(e, t, a, i, u) {
      var s;
      if (ap ? s = tf(t, i) : s = op(t, i), !s)
        return null;
      var f = Yh(a, "onBeforeInput");
      if (f.length > 0) {
        var v = new Oh("onBeforeInput", "beforeinput", null, i, u);
        e.push({
          event: v,
          listeners: f
        }), v.data = s;
      }
    }
    function Vh(e, t, a, i, u, s, f) {
      up(e, t, a, i, u), nf(e, t, a, i, u);
    }
    var xg = {
      color: !0,
      date: !0,
      datetime: !0,
      "datetime-local": !0,
      email: !0,
      month: !0,
      number: !0,
      password: !0,
      range: !0,
      search: !0,
      tel: !0,
      text: !0,
      time: !0,
      url: !0,
      week: !0
    };
    function ds(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t === "input" ? !!xg[e.type] : t === "textarea";
    }
    /**
     * Checks if an event is supported in the current execution environment.
     *
     * NOTE: This will not work correctly for non-generic events such as `change`,
     * `reset`, `load`, `error`, and `select`.
     *
     * Borrows from Modernizr.
     *
     * @param {string} eventNameSuffix Event name, e.g. "click".
     * @return {boolean} True if the event is supported.
     * @internal
     * @license Modernizr 3.0.0pre (Custom Build) | MIT
     */
    function wg(e) {
      if (!Ue)
        return !1;
      var t = "on" + e, a = t in document;
      if (!a) {
        var i = document.createElement("div");
        i.setAttribute(t, "return;"), a = typeof i[t] == "function";
      }
      return a;
    }
    function ps() {
      Ke("onChange", ["change", "click", "focusin", "focusout", "input", "keydown", "keyup", "selectionchange"]);
    }
    function Ph(e, t, a, i) {
      wu(i);
      var u = Yh(t, "onChange");
      if (u.length > 0) {
        var s = new Ka("onChange", "change", null, a, i);
        e.push({
          event: s,
          listeners: u
        });
      }
    }
    var tl = null, n = null;
    function r(e) {
      var t = e.nodeName && e.nodeName.toLowerCase();
      return t === "select" || t === "input" && e.type === "file";
    }
    function l(e) {
      var t = [];
      Ph(t, n, e, xd(e)), Zv(o, t);
    }
    function o(e) {
      eC(e, 0);
    }
    function c(e) {
      var t = sf(e);
      if (Cl(t))
        return e;
    }
    function p(e, t) {
      if (e === "change")
        return t;
    }
    var S = !1;
    Ue && (S = wg("input") && (!document.documentMode || document.documentMode > 9));
    function T(e, t) {
      tl = e, n = t, tl.attachEvent("onpropertychange", Y);
    }
    function O() {
      tl && (tl.detachEvent("onpropertychange", Y), tl = null, n = null);
    }
    function Y(e) {
      e.propertyName === "value" && c(n) && l(e);
    }
    function le(e, t, a) {
      e === "focusin" ? (O(), T(t, a)) : e === "focusout" && O();
    }
    function se(e, t) {
      if (e === "selectionchange" || e === "keyup" || e === "keydown")
        return c(n);
    }
    function ie(e) {
      var t = e.nodeName;
      return t && t.toLowerCase() === "input" && (e.type === "checkbox" || e.type === "radio");
    }
    function we(e, t) {
      if (e === "click")
        return c(t);
    }
    function Le(e, t) {
      if (e === "input" || e === "change")
        return c(t);
    }
    function ze(e) {
      var t = e._wrapperState;
      !t || !t.controlled || e.type !== "number" || Gs(e, "number", e.value);
    }
    function dn(e, t, a, i, u, s, f) {
      var v = a ? sf(a) : window, y, C;
      if (r(v) ? y = p : ds(v) ? S ? y = Le : (y = se, C = le) : ie(v) && (y = we), y) {
        var x = y(t, a);
        if (x) {
          Ph(e, x, i, u);
          return;
        }
      }
      C && C(t, v, a), t === "focusout" && ze(v);
    }
    function V() {
      rt("onMouseEnter", ["mouseout", "mouseover"]), rt("onMouseLeave", ["mouseout", "mouseover"]), rt("onPointerEnter", ["pointerout", "pointerover"]), rt("onPointerLeave", ["pointerout", "pointerover"]);
    }
    function N(e, t, a, i, u, s, f) {
      var v = t === "mouseover" || t === "pointerover", y = t === "mouseout" || t === "pointerout";
      if (v && !Oo(i)) {
        var C = i.relatedTarget || i.fromElement;
        if (C && (ms(C) || Rp(C)))
          return;
      }
      if (!(!y && !v)) {
        var x;
        if (u.window === u)
          x = u;
        else {
          var z = u.ownerDocument;
          z ? x = z.defaultView || z.parentWindow : x = window;
        }
        var _, $;
        if (y) {
          var Q = i.relatedTarget || i.toElement;
          if (_ = a, $ = Q ? ms(Q) : null, $ !== null) {
            var q = Vr($);
            ($ !== q || $.tag !== D && $.tag !== F) && ($ = null);
          }
        } else
          _ = null, $ = a;
        if (_ !== $) {
          var Ee = Jd, $e = "onMouseLeave", Fe = "onMouseEnter", yt = "mouse";
          (t === "pointerout" || t === "pointerover") && (Ee = Nh, $e = "onPointerLeave", Fe = "onPointerEnter", yt = "pointer");
          var ct = _ == null ? x : sf(_), P = $ == null ? x : sf($), Z = new Ee($e, yt + "leave", _, i, u);
          Z.target = ct, Z.relatedTarget = P;
          var j = null, ce = ms(u);
          if (ce === a) {
            var be = new Ee(Fe, yt + "enter", $, i, u);
            be.target = P, be.relatedTarget = ct, j = be;
          }
          YT(e, Z, j, _, $);
        }
      }
    }
    function B(e, t) {
      return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
    }
    var ue = typeof Object.is == "function" ? Object.is : B;
    function _e(e, t) {
      if (ue(e, t))
        return !0;
      if (typeof e != "object" || e === null || typeof t != "object" || t === null)
        return !1;
      var a = Object.keys(e), i = Object.keys(t);
      if (a.length !== i.length)
        return !1;
      for (var u = 0; u < a.length; u++) {
        var s = a[u];
        if (!et.call(t, s) || !ue(e[s], t[s]))
          return !1;
      }
      return !0;
    }
    function Qe(e) {
      for (; e && e.firstChild; )
        e = e.firstChild;
      return e;
    }
    function Ge(e) {
      for (; e; ) {
        if (e.nextSibling)
          return e.nextSibling;
        e = e.parentNode;
      }
    }
    function Je(e, t) {
      for (var a = Qe(e), i = 0, u = 0; a; ) {
        if (a.nodeType === ui) {
          if (u = i + a.textContent.length, i <= t && u >= t)
            return {
              node: a,
              offset: t - i
            };
          i = u;
        }
        a = Qe(Ge(a));
      }
    }
    function Nn(e) {
      var t = e.ownerDocument, a = t && t.defaultView || window, i = a.getSelection && a.getSelection();
      if (!i || i.rangeCount === 0)
        return null;
      var u = i.anchorNode, s = i.anchorOffset, f = i.focusNode, v = i.focusOffset;
      try {
        u.nodeType, f.nodeType;
      } catch {
        return null;
      }
      return xt(e, u, s, f, v);
    }
    function xt(e, t, a, i, u) {
      var s = 0, f = -1, v = -1, y = 0, C = 0, x = e, z = null;
      e: for (; ; ) {
        for (var _ = null; x === t && (a === 0 || x.nodeType === ui) && (f = s + a), x === i && (u === 0 || x.nodeType === ui) && (v = s + u), x.nodeType === ui && (s += x.nodeValue.length), (_ = x.firstChild) !== null; )
          z = x, x = _;
        for (; ; ) {
          if (x === e)
            break e;
          if (z === t && ++y === a && (f = s), z === i && ++C === u && (v = s), (_ = x.nextSibling) !== null)
            break;
          x = z, z = x.parentNode;
        }
        x = _;
      }
      return f === -1 || v === -1 ? null : {
        start: f,
        end: v
      };
    }
    function nl(e, t) {
      var a = e.ownerDocument || document, i = a && a.defaultView || window;
      if (i.getSelection) {
        var u = i.getSelection(), s = e.textContent.length, f = Math.min(t.start, s), v = t.end === void 0 ? f : Math.min(t.end, s);
        if (!u.extend && f > v) {
          var y = v;
          v = f, f = y;
        }
        var C = Je(e, f), x = Je(e, v);
        if (C && x) {
          if (u.rangeCount === 1 && u.anchorNode === C.node && u.anchorOffset === C.offset && u.focusNode === x.node && u.focusOffset === x.offset)
            return;
          var z = a.createRange();
          z.setStart(C.node, C.offset), u.removeAllRanges(), f > v ? (u.addRange(z), u.extend(x.node, x.offset)) : (z.setEnd(x.node, x.offset), u.addRange(z));
        }
      }
    }
    function jh(e) {
      return e && e.nodeType === ui;
    }
    function IE(e, t) {
      return !e || !t ? !1 : e === t ? !0 : jh(e) ? !1 : jh(t) ? IE(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1;
    }
    function DT(e) {
      return e && e.ownerDocument && IE(e.ownerDocument.documentElement, e);
    }
    function kT(e) {
      try {
        return typeof e.contentWindow.location.href == "string";
      } catch {
        return !1;
      }
    }
    function $E() {
      for (var e = window, t = Rl(); t instanceof e.HTMLIFrameElement; ) {
        if (kT(t))
          e = t.contentWindow;
        else
          return t;
        t = Rl(e.document);
      }
      return t;
    }
    function Tg(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
    }
    function OT() {
      var e = $E();
      return {
        focusedElem: e,
        selectionRange: Tg(e) ? LT(e) : null
      };
    }
    function MT(e) {
      var t = $E(), a = e.focusedElem, i = e.selectionRange;
      if (t !== a && DT(a)) {
        i !== null && Tg(a) && _T(a, i);
        for (var u = [], s = a; s = s.parentNode; )
          s.nodeType === Cr && u.push({
            element: s,
            left: s.scrollLeft,
            top: s.scrollTop
          });
        typeof a.focus == "function" && a.focus();
        for (var f = 0; f < u.length; f++) {
          var v = u[f];
          v.element.scrollLeft = v.left, v.element.scrollTop = v.top;
        }
      }
    }
    function LT(e) {
      var t;
      return "selectionStart" in e ? t = {
        start: e.selectionStart,
        end: e.selectionEnd
      } : t = Nn(e), t || {
        start: 0,
        end: 0
      };
    }
    function _T(e, t) {
      var a = t.start, i = t.end;
      i === void 0 && (i = a), "selectionStart" in e ? (e.selectionStart = a, e.selectionEnd = Math.min(i, e.value.length)) : nl(e, t);
    }
    var NT = Ue && "documentMode" in document && document.documentMode <= 11;
    function zT() {
      Ke("onSelect", ["focusout", "contextmenu", "dragend", "focusin", "keydown", "keyup", "mousedown", "mouseup", "selectionchange"]);
    }
    var rf = null, bg = null, sp = null, Dg = !1;
    function AT(e) {
      if ("selectionStart" in e && Tg(e))
        return {
          start: e.selectionStart,
          end: e.selectionEnd
        };
      var t = e.ownerDocument && e.ownerDocument.defaultView || window, a = t.getSelection();
      return {
        anchorNode: a.anchorNode,
        anchorOffset: a.anchorOffset,
        focusNode: a.focusNode,
        focusOffset: a.focusOffset
      };
    }
    function UT(e) {
      return e.window === e ? e.document : e.nodeType === oi ? e : e.ownerDocument;
    }
    function YE(e, t, a) {
      var i = UT(a);
      if (!(Dg || rf == null || rf !== Rl(i))) {
        var u = AT(rf);
        if (!sp || !_e(sp, u)) {
          sp = u;
          var s = Yh(bg, "onSelect");
          if (s.length > 0) {
            var f = new Ka("onSelect", "select", null, t, a);
            e.push({
              event: f,
              listeners: s
            }), f.target = rf;
          }
        }
      }
    }
    function FT(e, t, a, i, u, s, f) {
      var v = a ? sf(a) : window;
      switch (t) {
        // Track the input node that has focus.
        case "focusin":
          (ds(v) || v.contentEditable === "true") && (rf = v, bg = a, sp = null);
          break;
        case "focusout":
          rf = null, bg = null, sp = null;
          break;
        // Don't fire the event while the user is dragging. This matches the
        // semantics of the native select event.
        case "mousedown":
          Dg = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Dg = !1, YE(e, i, u);
          break;
        // Chrome and IE fire non-standard event when selection is changed (and
        // sometimes when it hasn't). IE's event fires out of order with respect
        // to key and input events on deletion, so we discard it.
        //
        // Firefox doesn't support selectionchange, so check selection status
        // after each key entry. The selection changes after keydown and before
        // keyup, but we check on keydown as well in the case of holding down a
        // key, when multiple keydown events are fired but only one keyup is.
        // This is also our approach for IE handling, for the reason above.
        case "selectionchange":
          if (NT)
            break;
        // falls through
        case "keydown":
        case "keyup":
          YE(e, i, u);
      }
    }
    function Bh(e, t) {
      var a = {};
      return a[e.toLowerCase()] = t.toLowerCase(), a["Webkit" + e] = "webkit" + t, a["Moz" + e] = "moz" + t, a;
    }
    var af = {
      animationend: Bh("Animation", "AnimationEnd"),
      animationiteration: Bh("Animation", "AnimationIteration"),
      animationstart: Bh("Animation", "AnimationStart"),
      transitionend: Bh("Transition", "TransitionEnd")
    }, kg = {}, QE = {};
    Ue && (QE = document.createElement("div").style, "AnimationEvent" in window || (delete af.animationend.animation, delete af.animationiteration.animation, delete af.animationstart.animation), "TransitionEvent" in window || delete af.transitionend.transition);
    function Ih(e) {
      if (kg[e])
        return kg[e];
      if (!af[e])
        return e;
      var t = af[e];
      for (var a in t)
        if (t.hasOwnProperty(a) && a in QE)
          return kg[e] = t[a];
      return e;
    }
    var WE = Ih("animationend"), GE = Ih("animationiteration"), KE = Ih("animationstart"), XE = Ih("transitionend"), qE = /* @__PURE__ */ new Map(), ZE = ["abort", "auxClick", "cancel", "canPlay", "canPlayThrough", "click", "close", "contextMenu", "copy", "cut", "drag", "dragEnd", "dragEnter", "dragExit", "dragLeave", "dragOver", "dragStart", "drop", "durationChange", "emptied", "encrypted", "ended", "error", "gotPointerCapture", "input", "invalid", "keyDown", "keyPress", "keyUp", "load", "loadedData", "loadedMetadata", "loadStart", "lostPointerCapture", "mouseDown", "mouseMove", "mouseOut", "mouseOver", "mouseUp", "paste", "pause", "play", "playing", "pointerCancel", "pointerDown", "pointerMove", "pointerOut", "pointerOver", "pointerUp", "progress", "rateChange", "reset", "resize", "seeked", "seeking", "stalled", "submit", "suspend", "timeUpdate", "touchCancel", "touchEnd", "touchStart", "volumeChange", "scroll", "toggle", "touchMove", "waiting", "wheel"];
    function Bu(e, t) {
      qE.set(e, t), Ke(t, [e]);
    }
    function HT() {
      for (var e = 0; e < ZE.length; e++) {
        var t = ZE[e], a = t.toLowerCase(), i = t[0].toUpperCase() + t.slice(1);
        Bu(a, "on" + i);
      }
      Bu(WE, "onAnimationEnd"), Bu(GE, "onAnimationIteration"), Bu(KE, "onAnimationStart"), Bu("dblclick", "onDoubleClick"), Bu("focusin", "onFocus"), Bu("focusout", "onBlur"), Bu(XE, "onTransitionEnd");
    }
    function VT(e, t, a, i, u, s, f) {
      var v = qE.get(t);
      if (v !== void 0) {
        var y = Ka, C = t;
        switch (t) {
          case "keypress":
            if (Zi(i) === 0)
              return;
          /* falls through */
          case "keydown":
          case "keyup":
            y = _h;
            break;
          case "focusin":
            C = "focus", y = yi;
            break;
          case "focusout":
            C = "blur", y = yi;
            break;
          case "beforeblur":
          case "afterblur":
            y = yi;
            break;
          case "click":
            if (i.button === 2)
              return;
          /* falls through */
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          // TODO: Disabled elements should not respond to mouse events
          /* falls through */
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            y = Jd;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            y = Gl;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            y = Ah;
            break;
          case WE:
          case GE:
          case KE:
            y = Dh;
            break;
          case XE:
            y = fa;
            break;
          case "scroll":
            y = Lr;
            break;
          case "wheel":
            y = Cg;
            break;
          case "copy":
          case "cut":
          case "paste":
            y = Kc;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            y = Nh;
            break;
        }
        var x = (s & na) !== 0;
        {
          var z = !x && // TODO: ideally, we'd eventually add all events from
          // nonDelegatedEvents list in DOMPluginEventSystem.
          // Then we can remove this special list.
          // This is a breaking change that can wait until React 18.
          t === "scroll", _ = IT(a, v, i.type, x, z);
          if (_.length > 0) {
            var $ = new y(v, C, null, i, u);
            e.push({
              event: $,
              listeners: _
            });
          }
        }
      }
    }
    HT(), V(), ps(), zT(), Rg();
    function PT(e, t, a, i, u, s, f) {
      VT(e, t, a, i, u, s);
      var v = (s & Rd) === 0;
      v && (N(e, t, a, i, u), dn(e, t, a, i, u), FT(e, t, a, i, u), Vh(e, t, a, i, u));
    }
    var cp = ["abort", "canplay", "canplaythrough", "durationchange", "emptied", "encrypted", "ended", "error", "loadeddata", "loadedmetadata", "loadstart", "pause", "play", "playing", "progress", "ratechange", "resize", "seeked", "seeking", "stalled", "suspend", "timeupdate", "volumechange", "waiting"], Og = new Set(["cancel", "close", "invalid", "load", "scroll", "toggle"].concat(cp));
    function JE(e, t, a) {
      var i = e.type || "unknown-event";
      e.currentTarget = a, Va(i, t, void 0, e), e.currentTarget = null;
    }
    function jT(e, t, a) {
      var i;
      if (a)
        for (var u = t.length - 1; u >= 0; u--) {
          var s = t[u], f = s.instance, v = s.currentTarget, y = s.listener;
          if (f !== i && e.isPropagationStopped())
            return;
          JE(e, y, v), i = f;
        }
      else
        for (var C = 0; C < t.length; C++) {
          var x = t[C], z = x.instance, _ = x.currentTarget, $ = x.listener;
          if (z !== i && e.isPropagationStopped())
            return;
          JE(e, $, _), i = z;
        }
    }
    function eC(e, t) {
      for (var a = (t & na) !== 0, i = 0; i < e.length; i++) {
        var u = e[i], s = u.event, f = u.listeners;
        jT(s, f, a);
      }
      _o();
    }
    function BT(e, t, a, i, u) {
      var s = xd(a), f = [];
      PT(f, e, i, a, s, t), eC(f, t);
    }
    function Zt(e, t) {
      Og.has(e) || h('Did not expect a listenToNonDelegatedEvent() call for "%s". This is a bug in React. Please file an issue.', e);
      var a = !1, i = gb(t), u = QT(e);
      i.has(u) || (tC(t, e, rc, a), i.add(u));
    }
    function Mg(e, t, a) {
      Og.has(e) && !t && h('Did not expect a listenToNativeEvent() call for "%s" in the bubble phase. This is a bug in React. Please file an issue.', e);
      var i = 0;
      t && (i |= na), tC(a, e, i, t);
    }
    var $h = "_reactListening" + Math.random().toString(36).slice(2);
    function fp(e) {
      if (!e[$h]) {
        e[$h] = !0, Et.forEach(function(a) {
          a !== "selectionchange" && (Og.has(a) || Mg(a, !1, e), Mg(a, !0, e));
        });
        var t = e.nodeType === oi ? e : e.ownerDocument;
        t !== null && (t[$h] || (t[$h] = !0, Mg("selectionchange", !1, t)));
      }
    }
    function tC(e, t, a, i, u) {
      var s = Bn(e, t, a), f = void 0;
      Lo && (t === "touchstart" || t === "touchmove" || t === "wheel") && (f = !0), e = e, i ? f !== void 0 ? Zd(e, t, s, f) : Mr(e, t, s) : f !== void 0 ? Hu(e, t, s, f) : us(e, t, s);
    }
    function nC(e, t) {
      return e === t || e.nodeType === hn && e.parentNode === t;
    }
    function Lg(e, t, a, i, u) {
      var s = i;
      if ((t & Cd) === 0 && (t & rc) === 0) {
        var f = u;
        if (i !== null) {
          var v = i;
          e: for (; ; ) {
            if (v === null)
              return;
            var y = v.tag;
            if (y === M || y === A) {
              var C = v.stateNode.containerInfo;
              if (nC(C, f))
                break;
              if (y === A)
                for (var x = v.return; x !== null; ) {
                  var z = x.tag;
                  if (z === M || z === A) {
                    var _ = x.stateNode.containerInfo;
                    if (nC(_, f))
                      return;
                  }
                  x = x.return;
                }
              for (; C !== null; ) {
                var $ = ms(C);
                if ($ === null)
                  return;
                var Q = $.tag;
                if (Q === D || Q === F) {
                  v = s = $;
                  continue e;
                }
                C = C.parentNode;
              }
            }
            v = v.return;
          }
        }
      }
      Zv(function() {
        return BT(e, t, a, s);
      });
    }
    function dp(e, t, a) {
      return {
        instance: e,
        listener: t,
        currentTarget: a
      };
    }
    function IT(e, t, a, i, u, s) {
      for (var f = t !== null ? t + "Capture" : null, v = i ? f : t, y = [], C = e, x = null; C !== null; ) {
        var z = C, _ = z.stateNode, $ = z.tag;
        if ($ === D && _ !== null && (x = _, v !== null)) {
          var Q = Vi(C, v);
          Q != null && y.push(dp(C, Q, x));
        }
        if (u)
          break;
        C = C.return;
      }
      return y;
    }
    function Yh(e, t) {
      for (var a = t + "Capture", i = [], u = e; u !== null; ) {
        var s = u, f = s.stateNode, v = s.tag;
        if (v === D && f !== null) {
          var y = f, C = Vi(u, a);
          C != null && i.unshift(dp(u, C, y));
          var x = Vi(u, t);
          x != null && i.push(dp(u, x, y));
        }
        u = u.return;
      }
      return i;
    }
    function lf(e) {
      if (e === null)
        return null;
      do
        e = e.return;
      while (e && e.tag !== D);
      return e || null;
    }
    function $T(e, t) {
      for (var a = e, i = t, u = 0, s = a; s; s = lf(s))
        u++;
      for (var f = 0, v = i; v; v = lf(v))
        f++;
      for (; u - f > 0; )
        a = lf(a), u--;
      for (; f - u > 0; )
        i = lf(i), f--;
      for (var y = u; y--; ) {
        if (a === i || i !== null && a === i.alternate)
          return a;
        a = lf(a), i = lf(i);
      }
      return null;
    }
    function rC(e, t, a, i, u) {
      for (var s = t._reactName, f = [], v = a; v !== null && v !== i; ) {
        var y = v, C = y.alternate, x = y.stateNode, z = y.tag;
        if (C !== null && C === i)
          break;
        if (z === D && x !== null) {
          var _ = x;
          if (u) {
            var $ = Vi(v, s);
            $ != null && f.unshift(dp(v, $, _));
          } else if (!u) {
            var Q = Vi(v, s);
            Q != null && f.push(dp(v, Q, _));
          }
        }
        v = v.return;
      }
      f.length !== 0 && e.push({
        event: t,
        listeners: f
      });
    }
    function YT(e, t, a, i, u) {
      var s = i && u ? $T(i, u) : null;
      i !== null && rC(e, t, i, s, !1), u !== null && a !== null && rC(e, a, u, s, !0);
    }
    function QT(e, t) {
      return e + "__bubble";
    }
    var da = !1, pp = "dangerouslySetInnerHTML", Qh = "suppressContentEditableWarning", Iu = "suppressHydrationWarning", aC = "autoFocus", vs = "children", hs = "style", Wh = "__html", _g, Gh, vp, iC, Kh, lC, uC;
    _g = {
      // There are working polyfills for <dialog>. Let people use it.
      dialog: !0,
      // Electron ships a custom <webview> tag to display external web content in
      // an isolated frame and process.
      // This tag is not present in non Electron environments such as JSDom which
      // is often used for testing purposes.
      // @see https://electronjs.org/docs/api/webview-tag
      webview: !0
    }, Gh = function(e, t) {
      gd(e, t), tc(e, t), Kv(e, t, {
        registrationNameDependencies: bt,
        possibleRegistrationNames: Pt
      });
    }, lC = Ue && !document.documentMode, vp = function(e, t, a) {
      if (!da) {
        var i = Xh(a), u = Xh(t);
        u !== i && (da = !0, h("Prop `%s` did not match. Server: %s Client: %s", e, JSON.stringify(u), JSON.stringify(i)));
      }
    }, iC = function(e) {
      if (!da) {
        da = !0;
        var t = [];
        e.forEach(function(a) {
          t.push(a);
        }), h("Extra attributes from the server: %s", t);
      }
    }, Kh = function(e, t) {
      t === !1 ? h("Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.", e, e, e) : h("Expected `%s` listener to be a function, instead got a value of `%s` type.", e, typeof t);
    }, uC = function(e, t) {
      var a = e.namespaceURI === li ? e.ownerDocument.createElement(e.tagName) : e.ownerDocument.createElementNS(e.namespaceURI, e.tagName);
      return a.innerHTML = t, a.innerHTML;
    };
    var WT = /\r\n?/g, GT = /\u0000|\uFFFD/g;
    function Xh(e) {
      lt(e);
      var t = typeof e == "string" ? e : "" + e;
      return t.replace(WT, `
`).replace(GT, "");
    }
    function qh(e, t, a, i) {
      var u = Xh(t), s = Xh(e);
      if (s !== u && (i && (da || (da = !0, h('Text content did not match. Server: "%s" Client: "%s"', s, u))), a && ye))
        throw new Error("Text content does not match server-rendered HTML.");
    }
    function oC(e) {
      return e.nodeType === oi ? e : e.ownerDocument;
    }
    function KT() {
    }
    function Zh(e) {
      e.onclick = KT;
    }
    function XT(e, t, a, i, u) {
      for (var s in i)
        if (i.hasOwnProperty(s)) {
          var f = i[s];
          if (s === hs)
            f && Object.freeze(f), Iv(t, f);
          else if (s === pp) {
            var v = f ? f[Wh] : void 0;
            v != null && Lv(t, v);
          } else if (s === vs)
            if (typeof f == "string") {
              var y = e !== "textarea" || f !== "";
              y && Eu(t, f);
            } else typeof f == "number" && Eu(t, "" + f);
          else s === Qh || s === Iu || s === aC || (bt.hasOwnProperty(s) ? f != null && (typeof f != "function" && Kh(s, f), s === "onScroll" && Zt("scroll", t)) : f != null && hl(t, s, f, u));
        }
    }
    function qT(e, t, a, i) {
      for (var u = 0; u < t.length; u += 2) {
        var s = t[u], f = t[u + 1];
        s === hs ? Iv(e, f) : s === pp ? Lv(e, f) : s === vs ? Eu(e, f) : hl(e, s, f, i);
      }
    }
    function ZT(e, t, a, i) {
      var u, s = oC(a), f, v = i;
      if (v === li && (v = fd(e)), v === li) {
        if (u = Fi(e, t), !u && e !== e.toLowerCase() && h("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", e), e === "script") {
          var y = s.createElement("div");
          y.innerHTML = "<script><\/script>";
          var C = y.firstChild;
          f = y.removeChild(C);
        } else if (typeof t.is == "string")
          f = s.createElement(e, {
            is: t.is
          });
        else if (f = s.createElement(e), e === "select") {
          var x = f;
          t.multiple ? x.multiple = !0 : t.size && (x.size = t.size);
        }
      } else
        f = s.createElementNS(v, e);
      return v === li && !u && Object.prototype.toString.call(f) === "[object HTMLUnknownElement]" && !et.call(_g, e) && (_g[e] = !0, h("The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.", e)), f;
    }
    function JT(e, t) {
      return oC(t).createTextNode(e);
    }
    function e1(e, t, a, i) {
      var u = Fi(t, a);
      Gh(t, a);
      var s;
      switch (t) {
        case "dialog":
          Zt("cancel", e), Zt("close", e), s = a;
          break;
        case "iframe":
        case "object":
        case "embed":
          Zt("load", e), s = a;
          break;
        case "video":
        case "audio":
          for (var f = 0; f < cp.length; f++)
            Zt(cp[f], e);
          s = a;
          break;
        case "source":
          Zt("error", e), s = a;
          break;
        case "img":
        case "image":
        case "link":
          Zt("error", e), Zt("load", e), s = a;
          break;
        case "details":
          Zt("toggle", e), s = a;
          break;
        case "input":
          ii(e, a), s = $s(e, a), Zt("invalid", e);
          break;
        case "option":
          gu(e, a), s = a;
          break;
        case "select":
          Xs(e, a), s = ld(e, a), Zt("invalid", e);
          break;
        case "textarea":
          od(e, a), s = ud(e, a), Zt("invalid", e);
          break;
        default:
          s = a;
      }
      switch (Js(t, s), XT(t, e, i, s, u), t) {
        case "input":
          Ui(e), rd(e, a, !1);
          break;
        case "textarea":
          Ui(e), Ov(e);
          break;
        case "option":
          Gy(e, a);
          break;
        case "select":
          Xy(e, a);
          break;
        default:
          typeof s.onClick == "function" && Zh(e);
          break;
      }
    }
    function t1(e, t, a, i, u) {
      Gh(t, i);
      var s = null, f, v;
      switch (t) {
        case "input":
          f = $s(e, a), v = $s(e, i), s = [];
          break;
        case "select":
          f = ld(e, a), v = ld(e, i), s = [];
          break;
        case "textarea":
          f = ud(e, a), v = ud(e, i), s = [];
          break;
        default:
          f = a, v = i, typeof f.onClick != "function" && typeof v.onClick == "function" && Zh(e);
          break;
      }
      Js(t, v);
      var y, C, x = null;
      for (y in f)
        if (!(v.hasOwnProperty(y) || !f.hasOwnProperty(y) || f[y] == null))
          if (y === hs) {
            var z = f[y];
            for (C in z)
              z.hasOwnProperty(C) && (x || (x = {}), x[C] = "");
          } else y === pp || y === vs || y === Qh || y === Iu || y === aC || (bt.hasOwnProperty(y) ? s || (s = []) : (s = s || []).push(y, null));
      for (y in v) {
        var _ = v[y], $ = f != null ? f[y] : void 0;
        if (!(!v.hasOwnProperty(y) || _ === $ || _ == null && $ == null))
          if (y === hs)
            if (_ && Object.freeze(_), $) {
              for (C in $)
                $.hasOwnProperty(C) && (!_ || !_.hasOwnProperty(C)) && (x || (x = {}), x[C] = "");
              for (C in _)
                _.hasOwnProperty(C) && $[C] !== _[C] && (x || (x = {}), x[C] = _[C]);
            } else
              x || (s || (s = []), s.push(y, x)), x = _;
          else if (y === pp) {
            var Q = _ ? _[Wh] : void 0, q = $ ? $[Wh] : void 0;
            Q != null && q !== Q && (s = s || []).push(y, Q);
          } else y === vs ? (typeof _ == "string" || typeof _ == "number") && (s = s || []).push(y, "" + _) : y === Qh || y === Iu || (bt.hasOwnProperty(y) ? (_ != null && (typeof _ != "function" && Kh(y, _), y === "onScroll" && Zt("scroll", e)), !s && $ !== _ && (s = [])) : (s = s || []).push(y, _));
      }
      return x && (ig(x, v[hs]), (s = s || []).push(hs, x)), s;
    }
    function n1(e, t, a, i, u) {
      a === "input" && u.type === "radio" && u.name != null && Ys(e, u);
      var s = Fi(a, i), f = Fi(a, u);
      switch (qT(e, t, s, f), a) {
        case "input":
          yu(e, u);
          break;
        case "textarea":
          kv(e, u);
          break;
        case "select":
          qy(e, u);
          break;
      }
    }
    function r1(e) {
      {
        var t = e.toLowerCase();
        return Do.hasOwnProperty(t) && Do[t] || null;
      }
    }
    function a1(e, t, a, i, u, s, f) {
      var v, y;
      switch (v = Fi(t, a), Gh(t, a), t) {
        case "dialog":
          Zt("cancel", e), Zt("close", e);
          break;
        case "iframe":
        case "object":
        case "embed":
          Zt("load", e);
          break;
        case "video":
        case "audio":
          for (var C = 0; C < cp.length; C++)
            Zt(cp[C], e);
          break;
        case "source":
          Zt("error", e);
          break;
        case "img":
        case "image":
        case "link":
          Zt("error", e), Zt("load", e);
          break;
        case "details":
          Zt("toggle", e);
          break;
        case "input":
          ii(e, a), Zt("invalid", e);
          break;
        case "option":
          gu(e, a);
          break;
        case "select":
          Xs(e, a), Zt("invalid", e);
          break;
        case "textarea":
          od(e, a), Zt("invalid", e);
          break;
      }
      Js(t, a);
      {
        y = /* @__PURE__ */ new Set();
        for (var x = e.attributes, z = 0; z < x.length; z++) {
          var _ = x[z].name.toLowerCase();
          switch (_) {
            // Controlled attributes are not validated
            // TODO: Only ignore them on controlled tags.
            case "value":
              break;
            case "checked":
              break;
            case "selected":
              break;
            default:
              y.add(x[z].name);
          }
        }
      }
      var $ = null;
      for (var Q in a)
        if (a.hasOwnProperty(Q)) {
          var q = a[Q];
          if (Q === vs)
            typeof q == "string" ? e.textContent !== q && (a[Iu] !== !0 && qh(e.textContent, q, s, f), $ = [vs, q]) : typeof q == "number" && e.textContent !== "" + q && (a[Iu] !== !0 && qh(e.textContent, q, s, f), $ = [vs, "" + q]);
          else if (bt.hasOwnProperty(Q))
            q != null && (typeof q != "function" && Kh(Q, q), Q === "onScroll" && Zt("scroll", e));
          else if (f && // Convince Flow we've calculated it (it's DEV-only in this method.)
          typeof v == "boolean") {
            var Ee = void 0, $e = en(Q);
            if (a[Iu] !== !0) {
              if (!(Q === Qh || Q === Iu || // Controlled attributes are not validated
              // TODO: Only ignore them on controlled tags.
              Q === "value" || Q === "checked" || Q === "selected")) {
                if (Q === pp) {
                  var Fe = e.innerHTML, yt = q ? q[Wh] : void 0;
                  if (yt != null) {
                    var ct = uC(e, yt);
                    ct !== Fe && vp(Q, Fe, ct);
                  }
                } else if (Q === hs) {
                  if (y.delete(Q), lC) {
                    var P = rg(q);
                    Ee = e.getAttribute("style"), P !== Ee && vp(Q, Ee, P);
                  }
                } else if (v)
                  y.delete(Q.toLowerCase()), Ee = If(e, Q, q), q !== Ee && vp(Q, Ee, q);
                else if (!ln(Q, $e, v) && !Tn(Q, q, $e, v)) {
                  var Z = !1;
                  if ($e !== null)
                    y.delete($e.attributeName), Ee = Bf(e, Q, q, $e);
                  else {
                    var j = i;
                    if (j === li && (j = fd(t)), j === li)
                      y.delete(Q.toLowerCase());
                    else {
                      var ce = r1(Q);
                      ce !== null && ce !== Q && (Z = !0, y.delete(ce)), y.delete(Q);
                    }
                    Ee = If(e, Q, q);
                  }
                  var be = he;
                  !be && q !== Ee && !Z && vp(Q, Ee, q);
                }
              }
            }
          }
        }
      switch (f && // $FlowFixMe - Should be inferred as not undefined.
      y.size > 0 && a[Iu] !== !0 && iC(y), t) {
        case "input":
          Ui(e), rd(e, a, !0);
          break;
        case "textarea":
          Ui(e), Ov(e);
          break;
        case "select":
        case "option":
          break;
        default:
          typeof a.onClick == "function" && Zh(e);
          break;
      }
      return $;
    }
    function i1(e, t, a) {
      var i = e.nodeValue !== t;
      return i;
    }
    function Ng(e, t) {
      {
        if (da)
          return;
        da = !0, h("Did not expect server HTML to contain a <%s> in <%s>.", t.nodeName.toLowerCase(), e.nodeName.toLowerCase());
      }
    }
    function zg(e, t) {
      {
        if (da)
          return;
        da = !0, h('Did not expect server HTML to contain the text node "%s" in <%s>.', t.nodeValue, e.nodeName.toLowerCase());
      }
    }
    function Ag(e, t, a) {
      {
        if (da)
          return;
        da = !0, h("Expected server HTML to contain a matching <%s> in <%s>.", t, e.nodeName.toLowerCase());
      }
    }
    function Ug(e, t) {
      {
        if (t === "" || da)
          return;
        da = !0, h('Expected server HTML to contain a matching text node for "%s" in <%s>.', t, e.nodeName.toLowerCase());
      }
    }
    function l1(e, t, a) {
      switch (t) {
        case "input":
          Qs(e, a);
          return;
        case "textarea":
          Jy(e, a);
          return;
        case "select":
          Zy(e, a);
          return;
      }
    }
    var hp = function() {
    }, mp = function() {
    };
    {
      var u1 = ["address", "applet", "area", "article", "aside", "base", "basefont", "bgsound", "blockquote", "body", "br", "button", "caption", "center", "col", "colgroup", "dd", "details", "dir", "div", "dl", "dt", "embed", "fieldset", "figcaption", "figure", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "iframe", "img", "input", "isindex", "li", "link", "listing", "main", "marquee", "menu", "menuitem", "meta", "nav", "noembed", "noframes", "noscript", "object", "ol", "p", "param", "plaintext", "pre", "script", "section", "select", "source", "style", "summary", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "title", "tr", "track", "ul", "wbr", "xmp"], sC = [
        "applet",
        "caption",
        "html",
        "table",
        "td",
        "th",
        "marquee",
        "object",
        "template",
        // https://html.spec.whatwg.org/multipage/syntax.html#html-integration-point
        // TODO: Distinguish by namespace here -- for <title>, including it here
        // errs on the side of fewer warnings
        "foreignObject",
        "desc",
        "title"
      ], o1 = sC.concat(["button"]), s1 = ["dd", "dt", "li", "option", "optgroup", "p", "rp", "rt"], cC = {
        current: null,
        formTag: null,
        aTagInScope: null,
        buttonTagInScope: null,
        nobrTagInScope: null,
        pTagInButtonScope: null,
        listItemTagAutoclosing: null,
        dlItemTagAutoclosing: null
      };
      mp = function(e, t) {
        var a = ft({}, e || cC), i = {
          tag: t
        };
        return sC.indexOf(t) !== -1 && (a.aTagInScope = null, a.buttonTagInScope = null, a.nobrTagInScope = null), o1.indexOf(t) !== -1 && (a.pTagInButtonScope = null), u1.indexOf(t) !== -1 && t !== "address" && t !== "div" && t !== "p" && (a.listItemTagAutoclosing = null, a.dlItemTagAutoclosing = null), a.current = i, t === "form" && (a.formTag = i), t === "a" && (a.aTagInScope = i), t === "button" && (a.buttonTagInScope = i), t === "nobr" && (a.nobrTagInScope = i), t === "p" && (a.pTagInButtonScope = i), t === "li" && (a.listItemTagAutoclosing = i), (t === "dd" || t === "dt") && (a.dlItemTagAutoclosing = i), a;
      };
      var c1 = function(e, t) {
        switch (t) {
          // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-inselect
          case "select":
            return e === "option" || e === "optgroup" || e === "#text";
          case "optgroup":
            return e === "option" || e === "#text";
          // Strictly speaking, seeing an <option> doesn't mean we're in a <select>
          // but
          case "option":
            return e === "#text";
          // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intd
          // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-incaption
          // No special behavior since these rules fall back to "in body" mode for
          // all except special table nodes which cause bad parsing behavior anyway.
          // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intr
          case "tr":
            return e === "th" || e === "td" || e === "style" || e === "script" || e === "template";
          // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intbody
          case "tbody":
          case "thead":
          case "tfoot":
            return e === "tr" || e === "style" || e === "script" || e === "template";
          // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-incolgroup
          case "colgroup":
            return e === "col" || e === "template";
          // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intable
          case "table":
            return e === "caption" || e === "colgroup" || e === "tbody" || e === "tfoot" || e === "thead" || e === "style" || e === "script" || e === "template";
          // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-inhead
          case "head":
            return e === "base" || e === "basefont" || e === "bgsound" || e === "link" || e === "meta" || e === "title" || e === "noscript" || e === "noframes" || e === "style" || e === "script" || e === "template";
          // https://html.spec.whatwg.org/multipage/semantics.html#the-html-element
          case "html":
            return e === "head" || e === "body" || e === "frameset";
          case "frameset":
            return e === "frame";
          case "#document":
            return e === "html";
        }
        switch (e) {
          case "h1":
          case "h2":
          case "h3":
          case "h4":
          case "h5":
          case "h6":
            return t !== "h1" && t !== "h2" && t !== "h3" && t !== "h4" && t !== "h5" && t !== "h6";
          case "rp":
          case "rt":
            return s1.indexOf(t) === -1;
          case "body":
          case "caption":
          case "col":
          case "colgroup":
          case "frameset":
          case "frame":
          case "head":
          case "html":
          case "tbody":
          case "td":
          case "tfoot":
          case "th":
          case "thead":
          case "tr":
            return t == null;
        }
        return !0;
      }, f1 = function(e, t) {
        switch (e) {
          case "address":
          case "article":
          case "aside":
          case "blockquote":
          case "center":
          case "details":
          case "dialog":
          case "dir":
          case "div":
          case "dl":
          case "fieldset":
          case "figcaption":
          case "figure":
          case "footer":
          case "header":
          case "hgroup":
          case "main":
          case "menu":
          case "nav":
          case "ol":
          case "p":
          case "section":
          case "summary":
          case "ul":
          case "pre":
          case "listing":
          case "table":
          case "hr":
          case "xmp":
          case "h1":
          case "h2":
          case "h3":
          case "h4":
          case "h5":
          case "h6":
            return t.pTagInButtonScope;
          case "form":
            return t.formTag || t.pTagInButtonScope;
          case "li":
            return t.listItemTagAutoclosing;
          case "dd":
          case "dt":
            return t.dlItemTagAutoclosing;
          case "button":
            return t.buttonTagInScope;
          case "a":
            return t.aTagInScope;
          case "nobr":
            return t.nobrTagInScope;
        }
        return null;
      }, fC = {};
      hp = function(e, t, a) {
        a = a || cC;
        var i = a.current, u = i && i.tag;
        t != null && (e != null && h("validateDOMNesting: when childText is passed, childTag should be null"), e = "#text");
        var s = c1(e, u) ? null : i, f = s ? null : f1(e, a), v = s || f;
        if (v) {
          var y = v.tag, C = !!s + "|" + e + "|" + y;
          if (!fC[C]) {
            fC[C] = !0;
            var x = e, z = "";
            if (e === "#text" ? /\S/.test(t) ? x = "Text nodes" : (x = "Whitespace text nodes", z = " Make sure you don't have any extra whitespace between tags on each line of your source code.") : x = "<" + e + ">", s) {
              var _ = "";
              y === "table" && e === "tr" && (_ += " Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser."), h("validateDOMNesting(...): %s cannot appear as a child of <%s>.%s%s", x, y, z, _);
            } else
              h("validateDOMNesting(...): %s cannot appear as a descendant of <%s>.", x, y);
          }
        }
      };
    }
    var Jh = "suppressHydrationWarning", em = "$", tm = "/$", yp = "$?", gp = "$!", d1 = "style", Fg = null, Hg = null;
    function p1(e) {
      var t, a, i = e.nodeType;
      switch (i) {
        case oi:
        case pd: {
          t = i === oi ? "#document" : "#fragment";
          var u = e.documentElement;
          a = u ? u.namespaceURI : dd(null, "");
          break;
        }
        default: {
          var s = i === hn ? e.parentNode : e, f = s.namespaceURI || null;
          t = s.tagName, a = dd(f, t);
          break;
        }
      }
      {
        var v = t.toLowerCase(), y = mp(null, v);
        return {
          namespace: a,
          ancestorInfo: y
        };
      }
    }
    function v1(e, t, a) {
      {
        var i = e, u = dd(i.namespace, t), s = mp(i.ancestorInfo, t);
        return {
          namespace: u,
          ancestorInfo: s
        };
      }
    }
    function VL(e) {
      return e;
    }
    function h1(e) {
      Fg = Cn(), Hg = OT();
      var t = null;
      return kn(!1), t;
    }
    function m1(e) {
      MT(Hg), kn(Fg), Fg = null, Hg = null;
    }
    function y1(e, t, a, i, u) {
      var s;
      {
        var f = i;
        if (hp(e, null, f.ancestorInfo), typeof t.children == "string" || typeof t.children == "number") {
          var v = "" + t.children, y = mp(f.ancestorInfo, e);
          hp(null, v, y);
        }
        s = f.namespace;
      }
      var C = ZT(e, t, a, s);
      return Cp(u, C), Qg(C, t), C;
    }
    function g1(e, t) {
      e.appendChild(t);
    }
    function S1(e, t, a, i, u) {
      switch (e1(e, t, a, i), t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          return !!a.autoFocus;
        case "img":
          return !0;
        default:
          return !1;
      }
    }
    function E1(e, t, a, i, u, s) {
      {
        var f = s;
        if (typeof i.children != typeof a.children && (typeof i.children == "string" || typeof i.children == "number")) {
          var v = "" + i.children, y = mp(f.ancestorInfo, t);
          hp(null, v, y);
        }
      }
      return t1(e, t, a, i);
    }
    function Vg(e, t) {
      return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
    }
    function C1(e, t, a, i) {
      {
        var u = a;
        hp(null, e, u.ancestorInfo);
      }
      var s = JT(e, t);
      return Cp(i, s), s;
    }
    function R1() {
      var e = window.event;
      return e === void 0 ? oa : Qc(e.type);
    }
    var Pg = typeof setTimeout == "function" ? setTimeout : void 0, x1 = typeof clearTimeout == "function" ? clearTimeout : void 0, jg = -1, dC = typeof Promise == "function" ? Promise : void 0, w1 = typeof queueMicrotask == "function" ? queueMicrotask : typeof dC < "u" ? function(e) {
      return dC.resolve(null).then(e).catch(T1);
    } : Pg;
    function T1(e) {
      setTimeout(function() {
        throw e;
      });
    }
    function b1(e, t, a, i) {
      switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          a.autoFocus && e.focus();
          return;
        case "img": {
          a.src && (e.src = a.src);
          return;
        }
      }
    }
    function D1(e, t, a, i, u, s) {
      n1(e, t, a, i, u), Qg(e, u);
    }
    function pC(e) {
      Eu(e, "");
    }
    function k1(e, t, a) {
      e.nodeValue = a;
    }
    function O1(e, t) {
      e.appendChild(t);
    }
    function M1(e, t) {
      var a;
      e.nodeType === hn ? (a = e.parentNode, a.insertBefore(t, e)) : (a = e, a.appendChild(t));
      var i = e._reactRootContainer;
      i == null && a.onclick === null && Zh(a);
    }
    function L1(e, t, a) {
      e.insertBefore(t, a);
    }
    function _1(e, t, a) {
      e.nodeType === hn ? e.parentNode.insertBefore(t, a) : e.insertBefore(t, a);
    }
    function N1(e, t) {
      e.removeChild(t);
    }
    function z1(e, t) {
      e.nodeType === hn ? e.parentNode.removeChild(t) : e.removeChild(t);
    }
    function Bg(e, t) {
      var a = t, i = 0;
      do {
        var u = a.nextSibling;
        if (e.removeChild(a), u && u.nodeType === hn) {
          var s = u.data;
          if (s === tm)
            if (i === 0) {
              e.removeChild(u), Yl(t);
              return;
            } else
              i--;
          else (s === em || s === yp || s === gp) && i++;
        }
        a = u;
      } while (a);
      Yl(t);
    }
    function A1(e, t) {
      e.nodeType === hn ? Bg(e.parentNode, t) : e.nodeType === Cr && Bg(e, t), Yl(e);
    }
    function U1(e) {
      e = e;
      var t = e.style;
      typeof t.setProperty == "function" ? t.setProperty("display", "none", "important") : t.display = "none";
    }
    function F1(e) {
      e.nodeValue = "";
    }
    function H1(e, t) {
      e = e;
      var a = t[d1], i = a != null && a.hasOwnProperty("display") ? a.display : null;
      e.style.display = Zs("display", i);
    }
    function V1(e, t) {
      e.nodeValue = t;
    }
    function P1(e) {
      e.nodeType === Cr ? e.textContent = "" : e.nodeType === oi && e.documentElement && e.removeChild(e.documentElement);
    }
    function j1(e, t, a) {
      return e.nodeType !== Cr || t.toLowerCase() !== e.nodeName.toLowerCase() ? null : e;
    }
    function B1(e, t) {
      return t === "" || e.nodeType !== ui ? null : e;
    }
    function I1(e) {
      return e.nodeType !== hn ? null : e;
    }
    function vC(e) {
      return e.data === yp;
    }
    function Ig(e) {
      return e.data === gp;
    }
    function $1(e) {
      var t = e.nextSibling && e.nextSibling.dataset, a, i, u;
      return t && (a = t.dgst, i = t.msg, u = t.stck), {
        message: i,
        digest: a,
        stack: u
      };
    }
    function Y1(e, t) {
      e._reactRetry = t;
    }
    function nm(e) {
      for (; e != null; e = e.nextSibling) {
        var t = e.nodeType;
        if (t === Cr || t === ui)
          break;
        if (t === hn) {
          var a = e.data;
          if (a === em || a === gp || a === yp)
            break;
          if (a === tm)
            return null;
        }
      }
      return e;
    }
    function Sp(e) {
      return nm(e.nextSibling);
    }
    function Q1(e) {
      return nm(e.firstChild);
    }
    function W1(e) {
      return nm(e.firstChild);
    }
    function G1(e) {
      return nm(e.nextSibling);
    }
    function K1(e, t, a, i, u, s, f) {
      Cp(s, e), Qg(e, a);
      var v;
      {
        var y = u;
        v = y.namespace;
      }
      var C = (s.mode & ot) !== Be;
      return a1(e, t, a, v, i, C, f);
    }
    function X1(e, t, a, i) {
      return Cp(a, e), a.mode & ot, i1(e, t);
    }
    function q1(e, t) {
      Cp(t, e);
    }
    function Z1(e) {
      for (var t = e.nextSibling, a = 0; t; ) {
        if (t.nodeType === hn) {
          var i = t.data;
          if (i === tm) {
            if (a === 0)
              return Sp(t);
            a--;
          } else (i === em || i === gp || i === yp) && a++;
        }
        t = t.nextSibling;
      }
      return null;
    }
    function hC(e) {
      for (var t = e.previousSibling, a = 0; t; ) {
        if (t.nodeType === hn) {
          var i = t.data;
          if (i === em || i === gp || i === yp) {
            if (a === 0)
              return t;
            a--;
          } else i === tm && a++;
        }
        t = t.previousSibling;
      }
      return null;
    }
    function J1(e) {
      Yl(e);
    }
    function eb(e) {
      Yl(e);
    }
    function tb(e) {
      return e !== "head" && e !== "body";
    }
    function nb(e, t, a, i) {
      var u = !0;
      qh(t.nodeValue, a, i, u);
    }
    function rb(e, t, a, i, u, s) {
      if (t[Jh] !== !0) {
        var f = !0;
        qh(i.nodeValue, u, s, f);
      }
    }
    function ab(e, t) {
      t.nodeType === Cr ? Ng(e, t) : t.nodeType === hn || zg(e, t);
    }
    function ib(e, t) {
      {
        var a = e.parentNode;
        a !== null && (t.nodeType === Cr ? Ng(a, t) : t.nodeType === hn || zg(a, t));
      }
    }
    function lb(e, t, a, i, u) {
      (u || t[Jh] !== !0) && (i.nodeType === Cr ? Ng(a, i) : i.nodeType === hn || zg(a, i));
    }
    function ub(e, t, a) {
      Ag(e, t);
    }
    function ob(e, t) {
      Ug(e, t);
    }
    function sb(e, t, a) {
      {
        var i = e.parentNode;
        i !== null && Ag(i, t);
      }
    }
    function cb(e, t) {
      {
        var a = e.parentNode;
        a !== null && Ug(a, t);
      }
    }
    function fb(e, t, a, i, u, s) {
      (s || t[Jh] !== !0) && Ag(a, i);
    }
    function db(e, t, a, i, u) {
      (u || t[Jh] !== !0) && Ug(a, i);
    }
    function pb(e) {
      h("An error occurred during hydration. The server HTML was replaced with client content in <%s>.", e.nodeName.toLowerCase());
    }
    function vb(e) {
      fp(e);
    }
    var uf = Math.random().toString(36).slice(2), of = "__reactFiber$" + uf, $g = "__reactProps$" + uf, Ep = "__reactContainer$" + uf, Yg = "__reactEvents$" + uf, hb = "__reactListeners$" + uf, mb = "__reactHandles$" + uf;
    function yb(e) {
      delete e[of], delete e[$g], delete e[Yg], delete e[hb], delete e[mb];
    }
    function Cp(e, t) {
      t[of] = e;
    }
    function rm(e, t) {
      t[Ep] = e;
    }
    function mC(e) {
      e[Ep] = null;
    }
    function Rp(e) {
      return !!e[Ep];
    }
    function ms(e) {
      var t = e[of];
      if (t)
        return t;
      for (var a = e.parentNode; a; ) {
        if (t = a[Ep] || a[of], t) {
          var i = t.alternate;
          if (t.child !== null || i !== null && i.child !== null)
            for (var u = hC(e); u !== null; ) {
              var s = u[of];
              if (s)
                return s;
              u = hC(u);
            }
          return t;
        }
        e = a, a = e.parentNode;
      }
      return null;
    }
    function $u(e) {
      var t = e[of] || e[Ep];
      return t && (t.tag === D || t.tag === F || t.tag === fe || t.tag === M) ? t : null;
    }
    function sf(e) {
      if (e.tag === D || e.tag === F)
        return e.stateNode;
      throw new Error("getNodeFromInstance: Invalid argument.");
    }
    function am(e) {
      return e[$g] || null;
    }
    function Qg(e, t) {
      e[$g] = t;
    }
    function gb(e) {
      var t = e[Yg];
      return t === void 0 && (t = e[Yg] = /* @__PURE__ */ new Set()), t;
    }
    var yC = {}, gC = m.ReactDebugCurrentFrame;
    function im(e) {
      if (e) {
        var t = e._owner, a = El(e.type, e._source, t ? t.type : null);
        gC.setExtraStackFrame(a);
      } else
        gC.setExtraStackFrame(null);
    }
    function Si(e, t, a, i, u) {
      {
        var s = Function.call.bind(et);
        for (var f in e)
          if (s(e, f)) {
            var v = void 0;
            try {
              if (typeof e[f] != "function") {
                var y = Error((i || "React class") + ": " + a + " type `" + f + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[f] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw y.name = "Invariant Violation", y;
              }
              v = e[f](t, f, i, a, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (C) {
              v = C;
            }
            v && !(v instanceof Error) && (im(u), h("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", i || "React class", a, f, typeof v), im(null)), v instanceof Error && !(v.message in yC) && (yC[v.message] = !0, im(u), h("Failed %s type: %s", a, v.message), im(null));
          }
      }
    }
    var Wg = [], lm;
    lm = [];
    var ql = -1;
    function Yu(e) {
      return {
        current: e
      };
    }
    function _r(e, t) {
      if (ql < 0) {
        h("Unexpected pop.");
        return;
      }
      t !== lm[ql] && h("Unexpected Fiber popped."), e.current = Wg[ql], Wg[ql] = null, lm[ql] = null, ql--;
    }
    function Nr(e, t, a) {
      ql++, Wg[ql] = e.current, lm[ql] = a, e.current = t;
    }
    var Gg;
    Gg = {};
    var La = {};
    Object.freeze(La);
    var Zl = Yu(La), rl = Yu(!1), Kg = La;
    function cf(e, t, a) {
      return a && al(t) ? Kg : Zl.current;
    }
    function SC(e, t, a) {
      {
        var i = e.stateNode;
        i.__reactInternalMemoizedUnmaskedChildContext = t, i.__reactInternalMemoizedMaskedChildContext = a;
      }
    }
    function ff(e, t) {
      {
        var a = e.type, i = a.contextTypes;
        if (!i)
          return La;
        var u = e.stateNode;
        if (u && u.__reactInternalMemoizedUnmaskedChildContext === t)
          return u.__reactInternalMemoizedMaskedChildContext;
        var s = {};
        for (var f in i)
          s[f] = t[f];
        {
          var v = at(e) || "Unknown";
          Si(i, s, "context", v);
        }
        return u && SC(e, t, s), s;
      }
    }
    function um() {
      return rl.current;
    }
    function al(e) {
      {
        var t = e.childContextTypes;
        return t != null;
      }
    }
    function om(e) {
      _r(rl, e), _r(Zl, e);
    }
    function Xg(e) {
      _r(rl, e), _r(Zl, e);
    }
    function EC(e, t, a) {
      {
        if (Zl.current !== La)
          throw new Error("Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.");
        Nr(Zl, t, e), Nr(rl, a, e);
      }
    }
    function CC(e, t, a) {
      {
        var i = e.stateNode, u = t.childContextTypes;
        if (typeof i.getChildContext != "function") {
          {
            var s = at(e) || "Unknown";
            Gg[s] || (Gg[s] = !0, h("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.", s, s));
          }
          return a;
        }
        var f = i.getChildContext();
        for (var v in f)
          if (!(v in u))
            throw new Error((at(e) || "Unknown") + '.getChildContext(): key "' + v + '" is not defined in childContextTypes.');
        {
          var y = at(e) || "Unknown";
          Si(u, f, "child context", y);
        }
        return ft({}, a, f);
      }
    }
    function sm(e) {
      {
        var t = e.stateNode, a = t && t.__reactInternalMemoizedMergedChildContext || La;
        return Kg = Zl.current, Nr(Zl, a, e), Nr(rl, rl.current, e), !0;
      }
    }
    function RC(e, t, a) {
      {
        var i = e.stateNode;
        if (!i)
          throw new Error("Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.");
        if (a) {
          var u = CC(e, t, Kg);
          i.__reactInternalMemoizedMergedChildContext = u, _r(rl, e), _r(Zl, e), Nr(Zl, u, e), Nr(rl, a, e);
        } else
          _r(rl, e), Nr(rl, a, e);
      }
    }
    function Sb(e) {
      {
        if (!Ll(e) || e.tag !== k)
          throw new Error("Expected subtree parent to be a mounted class component. This error is likely caused by a bug in React. Please file an issue.");
        var t = e;
        do {
          switch (t.tag) {
            case M:
              return t.stateNode.context;
            case k: {
              var a = t.type;
              if (al(a))
                return t.stateNode.__reactInternalMemoizedMergedChildContext;
              break;
            }
          }
          t = t.return;
        } while (t !== null);
        throw new Error("Found unexpected detached subtree parent. This error is likely caused by a bug in React. Please file an issue.");
      }
    }
    var Qu = 0, cm = 1, Jl = null, qg = !1, Zg = !1;
    function xC(e) {
      Jl === null ? Jl = [e] : Jl.push(e);
    }
    function Eb(e) {
      qg = !0, xC(e);
    }
    function wC() {
      qg && Wu();
    }
    function Wu() {
      if (!Zg && Jl !== null) {
        Zg = !0;
        var e = 0, t = ca();
        try {
          var a = !0, i = Jl;
          for (En(rr); e < i.length; e++) {
            var u = i[e];
            do
              u = u(a);
            while (u !== null);
          }
          Jl = null, qg = !1;
        } catch (s) {
          throw Jl !== null && (Jl = Jl.slice(e + 1)), Td(Ao, Wu), s;
        } finally {
          En(t), Zg = !1;
        }
      }
      return null;
    }
    var df = [], pf = 0, fm = null, dm = 0, Xa = [], qa = 0, ys = null, eu = 1, tu = "";
    function Cb(e) {
      return Ss(), (e.flags & Pa) !== je;
    }
    function Rb(e) {
      return Ss(), dm;
    }
    function xb() {
      var e = tu, t = eu, a = t & ~wb(t);
      return a.toString(32) + e;
    }
    function gs(e, t) {
      Ss(), df[pf++] = dm, df[pf++] = fm, fm = e, dm = t;
    }
    function TC(e, t, a) {
      Ss(), Xa[qa++] = eu, Xa[qa++] = tu, Xa[qa++] = ys, ys = e;
      var i = eu, u = tu, s = pm(i) - 1, f = i & ~(1 << s), v = a + 1, y = pm(t) + s;
      if (y > 30) {
        var C = s - s % 5, x = (1 << C) - 1, z = (f & x).toString(32), _ = f >> C, $ = s - C, Q = pm(t) + $, q = v << $, Ee = q | _, $e = z + u;
        eu = 1 << Q | Ee, tu = $e;
      } else {
        var Fe = v << s, yt = Fe | f, ct = u;
        eu = 1 << y | yt, tu = ct;
      }
    }
    function Jg(e) {
      Ss();
      var t = e.return;
      if (t !== null) {
        var a = 1, i = 0;
        gs(e, a), TC(e, a, i);
      }
    }
    function pm(e) {
      return 32 - gn(e);
    }
    function wb(e) {
      return 1 << pm(e) - 1;
    }
    function eS(e) {
      for (; e === fm; )
        fm = df[--pf], df[pf] = null, dm = df[--pf], df[pf] = null;
      for (; e === ys; )
        ys = Xa[--qa], Xa[qa] = null, tu = Xa[--qa], Xa[qa] = null, eu = Xa[--qa], Xa[qa] = null;
    }
    function Tb() {
      return Ss(), ys !== null ? {
        id: eu,
        overflow: tu
      } : null;
    }
    function bb(e, t) {
      Ss(), Xa[qa++] = eu, Xa[qa++] = tu, Xa[qa++] = ys, eu = t.id, tu = t.overflow, ys = e;
    }
    function Ss() {
      or() || h("Expected to be hydrating. This is a bug in React. Please file an issue.");
    }
    var ur = null, Za = null, Ei = !1, Es = !1, Gu = null;
    function Db() {
      Ei && h("We should not be hydrating here. This is a bug in React. Please file a bug.");
    }
    function bC() {
      Es = !0;
    }
    function kb() {
      return Es;
    }
    function Ob(e) {
      var t = e.stateNode.containerInfo;
      return Za = W1(t), ur = e, Ei = !0, Gu = null, Es = !1, !0;
    }
    function Mb(e, t, a) {
      return Za = G1(t), ur = e, Ei = !0, Gu = null, Es = !1, a !== null && bb(e, a), !0;
    }
    function DC(e, t) {
      switch (e.tag) {
        case M: {
          ab(e.stateNode.containerInfo, t);
          break;
        }
        case D: {
          var a = (e.mode & ot) !== Be;
          lb(
            e.type,
            e.memoizedProps,
            e.stateNode,
            t,
            // TODO: Delete this argument when we remove the legacy root API.
            a
          );
          break;
        }
        case fe: {
          var i = e.memoizedState;
          i.dehydrated !== null && ib(i.dehydrated, t);
          break;
        }
      }
    }
    function kC(e, t) {
      DC(e, t);
      var a = zO();
      a.stateNode = t, a.return = e;
      var i = e.deletions;
      i === null ? (e.deletions = [a], e.flags |= ra) : i.push(a);
    }
    function tS(e, t) {
      {
        if (Es)
          return;
        switch (e.tag) {
          case M: {
            var a = e.stateNode.containerInfo;
            switch (t.tag) {
              case D:
                var i = t.type;
                t.pendingProps, ub(a, i);
                break;
              case F:
                var u = t.pendingProps;
                ob(a, u);
                break;
            }
            break;
          }
          case D: {
            var s = e.type, f = e.memoizedProps, v = e.stateNode;
            switch (t.tag) {
              case D: {
                var y = t.type, C = t.pendingProps, x = (e.mode & ot) !== Be;
                fb(
                  s,
                  f,
                  v,
                  y,
                  C,
                  // TODO: Delete this argument when we remove the legacy root API.
                  x
                );
                break;
              }
              case F: {
                var z = t.pendingProps, _ = (e.mode & ot) !== Be;
                db(
                  s,
                  f,
                  v,
                  z,
                  // TODO: Delete this argument when we remove the legacy root API.
                  _
                );
                break;
              }
            }
            break;
          }
          case fe: {
            var $ = e.memoizedState, Q = $.dehydrated;
            if (Q !== null) switch (t.tag) {
              case D:
                var q = t.type;
                t.pendingProps, sb(Q, q);
                break;
              case F:
                var Ee = t.pendingProps;
                cb(Q, Ee);
                break;
            }
            break;
          }
          default:
            return;
        }
      }
    }
    function OC(e, t) {
      t.flags = t.flags & -4097 | un, tS(e, t);
    }
    function MC(e, t) {
      switch (e.tag) {
        case D: {
          var a = e.type;
          e.pendingProps;
          var i = j1(t, a);
          return i !== null ? (e.stateNode = i, ur = e, Za = Q1(i), !0) : !1;
        }
        case F: {
          var u = e.pendingProps, s = B1(t, u);
          return s !== null ? (e.stateNode = s, ur = e, Za = null, !0) : !1;
        }
        case fe: {
          var f = I1(t);
          if (f !== null) {
            var v = {
              dehydrated: f,
              treeContext: Tb(),
              retryLane: Ir
            };
            e.memoizedState = v;
            var y = AO(f);
            return y.return = e, e.child = y, ur = e, Za = null, !0;
          }
          return !1;
        }
        default:
          return !1;
      }
    }
    function nS(e) {
      return (e.mode & ot) !== Be && (e.flags & Pe) === je;
    }
    function rS(e) {
      throw new Error("Hydration failed because the initial UI does not match what was rendered on the server.");
    }
    function aS(e) {
      if (Ei) {
        var t = Za;
        if (!t) {
          nS(e) && (tS(ur, e), rS()), OC(ur, e), Ei = !1, ur = e;
          return;
        }
        var a = t;
        if (!MC(e, t)) {
          nS(e) && (tS(ur, e), rS()), t = Sp(a);
          var i = ur;
          if (!t || !MC(e, t)) {
            OC(ur, e), Ei = !1, ur = e;
            return;
          }
          kC(i, a);
        }
      }
    }
    function Lb(e, t, a) {
      var i = e.stateNode, u = !Es, s = K1(i, e.type, e.memoizedProps, t, a, e, u);
      return e.updateQueue = s, s !== null;
    }
    function _b(e) {
      var t = e.stateNode, a = e.memoizedProps, i = X1(t, a, e);
      if (i) {
        var u = ur;
        if (u !== null)
          switch (u.tag) {
            case M: {
              var s = u.stateNode.containerInfo, f = (u.mode & ot) !== Be;
              nb(
                s,
                t,
                a,
                // TODO: Delete this argument when we remove the legacy root API.
                f
              );
              break;
            }
            case D: {
              var v = u.type, y = u.memoizedProps, C = u.stateNode, x = (u.mode & ot) !== Be;
              rb(
                v,
                y,
                C,
                t,
                a,
                // TODO: Delete this argument when we remove the legacy root API.
                x
              );
              break;
            }
          }
      }
      return i;
    }
    function Nb(e) {
      var t = e.memoizedState, a = t !== null ? t.dehydrated : null;
      if (!a)
        throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
      q1(a, e);
    }
    function zb(e) {
      var t = e.memoizedState, a = t !== null ? t.dehydrated : null;
      if (!a)
        throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
      return Z1(a);
    }
    function LC(e) {
      for (var t = e.return; t !== null && t.tag !== D && t.tag !== M && t.tag !== fe; )
        t = t.return;
      ur = t;
    }
    function vm(e) {
      if (e !== ur)
        return !1;
      if (!Ei)
        return LC(e), Ei = !0, !1;
      if (e.tag !== M && (e.tag !== D || tb(e.type) && !Vg(e.type, e.memoizedProps))) {
        var t = Za;
        if (t)
          if (nS(e))
            _C(e), rS();
          else
            for (; t; )
              kC(e, t), t = Sp(t);
      }
      return LC(e), e.tag === fe ? Za = zb(e) : Za = ur ? Sp(e.stateNode) : null, !0;
    }
    function Ab() {
      return Ei && Za !== null;
    }
    function _C(e) {
      for (var t = Za; t; )
        DC(e, t), t = Sp(t);
    }
    function vf() {
      ur = null, Za = null, Ei = !1, Es = !1;
    }
    function NC() {
      Gu !== null && (bx(Gu), Gu = null);
    }
    function or() {
      return Ei;
    }
    function iS(e) {
      Gu === null ? Gu = [e] : Gu.push(e);
    }
    var Ub = m.ReactCurrentBatchConfig, Fb = null;
    function Hb() {
      return Ub.transition;
    }
    var Ci = {
      recordUnsafeLifecycleWarnings: function(e, t) {
      },
      flushPendingUnsafeLifecycleWarnings: function() {
      },
      recordLegacyContextWarning: function(e, t) {
      },
      flushLegacyContextWarning: function() {
      },
      discardPendingWarnings: function() {
      }
    };
    {
      var Vb = function(e) {
        for (var t = null, a = e; a !== null; )
          a.mode & At && (t = a), a = a.return;
        return t;
      }, Cs = function(e) {
        var t = [];
        return e.forEach(function(a) {
          t.push(a);
        }), t.sort().join(", ");
      }, xp = [], wp = [], Tp = [], bp = [], Dp = [], kp = [], Rs = /* @__PURE__ */ new Set();
      Ci.recordUnsafeLifecycleWarnings = function(e, t) {
        Rs.has(e.type) || (typeof t.componentWillMount == "function" && // Don't warn about react-lifecycles-compat polyfilled components.
        t.componentWillMount.__suppressDeprecationWarning !== !0 && xp.push(e), e.mode & At && typeof t.UNSAFE_componentWillMount == "function" && wp.push(e), typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps.__suppressDeprecationWarning !== !0 && Tp.push(e), e.mode & At && typeof t.UNSAFE_componentWillReceiveProps == "function" && bp.push(e), typeof t.componentWillUpdate == "function" && t.componentWillUpdate.__suppressDeprecationWarning !== !0 && Dp.push(e), e.mode & At && typeof t.UNSAFE_componentWillUpdate == "function" && kp.push(e));
      }, Ci.flushPendingUnsafeLifecycleWarnings = function() {
        var e = /* @__PURE__ */ new Set();
        xp.length > 0 && (xp.forEach(function(_) {
          e.add(at(_) || "Component"), Rs.add(_.type);
        }), xp = []);
        var t = /* @__PURE__ */ new Set();
        wp.length > 0 && (wp.forEach(function(_) {
          t.add(at(_) || "Component"), Rs.add(_.type);
        }), wp = []);
        var a = /* @__PURE__ */ new Set();
        Tp.length > 0 && (Tp.forEach(function(_) {
          a.add(at(_) || "Component"), Rs.add(_.type);
        }), Tp = []);
        var i = /* @__PURE__ */ new Set();
        bp.length > 0 && (bp.forEach(function(_) {
          i.add(at(_) || "Component"), Rs.add(_.type);
        }), bp = []);
        var u = /* @__PURE__ */ new Set();
        Dp.length > 0 && (Dp.forEach(function(_) {
          u.add(at(_) || "Component"), Rs.add(_.type);
        }), Dp = []);
        var s = /* @__PURE__ */ new Set();
        if (kp.length > 0 && (kp.forEach(function(_) {
          s.add(at(_) || "Component"), Rs.add(_.type);
        }), kp = []), t.size > 0) {
          var f = Cs(t);
          h(`Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.

Please update the following components: %s`, f);
        }
        if (i.size > 0) {
          var v = Cs(i);
          h(`Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state

Please update the following components: %s`, v);
        }
        if (s.size > 0) {
          var y = Cs(s);
          h(`Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.

Please update the following components: %s`, y);
        }
        if (e.size > 0) {
          var C = Cs(e);
          w(`componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.
* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, C);
        }
        if (a.size > 0) {
          var x = Cs(a);
          w(`componentWillReceiveProps has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state
* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, x);
        }
        if (u.size > 0) {
          var z = Cs(u);
          w(`componentWillUpdate has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, z);
        }
      };
      var hm = /* @__PURE__ */ new Map(), zC = /* @__PURE__ */ new Set();
      Ci.recordLegacyContextWarning = function(e, t) {
        var a = Vb(e);
        if (a === null) {
          h("Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue.");
          return;
        }
        if (!zC.has(e.type)) {
          var i = hm.get(a);
          (e.type.contextTypes != null || e.type.childContextTypes != null || t !== null && typeof t.getChildContext == "function") && (i === void 0 && (i = [], hm.set(a, i)), i.push(e));
        }
      }, Ci.flushLegacyContextWarning = function() {
        hm.forEach(function(e, t) {
          if (e.length !== 0) {
            var a = e[0], i = /* @__PURE__ */ new Set();
            e.forEach(function(s) {
              i.add(at(s) || "Component"), zC.add(s.type);
            });
            var u = Cs(i);
            try {
              Yt(a), h(`Legacy context API has been detected within a strict-mode tree.

The old API will be supported in all 16.x releases, but applications using it should migrate to the new version.

Please update the following components: %s

Learn more about this warning here: https://reactjs.org/link/legacy-context`, u);
            } finally {
              nn();
            }
          }
        });
      }, Ci.discardPendingWarnings = function() {
        xp = [], wp = [], Tp = [], bp = [], Dp = [], kp = [], hm = /* @__PURE__ */ new Map();
      };
    }
    var lS, uS, oS, sS, cS, AC = function(e, t) {
    };
    lS = !1, uS = !1, oS = {}, sS = {}, cS = {}, AC = function(e, t) {
      if (!(e === null || typeof e != "object") && !(!e._store || e._store.validated || e.key != null)) {
        if (typeof e._store != "object")
          throw new Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");
        e._store.validated = !0;
        var a = at(t) || "Component";
        sS[a] || (sS[a] = !0, h('Each child in a list should have a unique "key" prop. See https://reactjs.org/link/warning-keys for more information.'));
      }
    };
    function Pb(e) {
      return e.prototype && e.prototype.isReactComponent;
    }
    function Op(e, t, a) {
      var i = a.ref;
      if (i !== null && typeof i != "function" && typeof i != "object") {
        if ((e.mode & At || Me) && // We warn in ReactElement.js if owner and self are equal for string refs
        // because these cannot be automatically converted to an arrow function
        // using a codemod. Therefore, we don't have to warn about string refs again.
        !(a._owner && a._self && a._owner.stateNode !== a._self) && // Will already throw with "Function components cannot have string refs"
        !(a._owner && a._owner.tag !== k) && // Will already warn with "Function components cannot be given refs"
        !(typeof a.type == "function" && !Pb(a.type)) && // Will already throw with "Element ref was specified as a string (someStringRef) but no owner was set"
        a._owner) {
          var u = at(e) || "Component";
          oS[u] || (h('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. We recommend using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', u, i), oS[u] = !0);
        }
        if (a._owner) {
          var s = a._owner, f;
          if (s) {
            var v = s;
            if (v.tag !== k)
              throw new Error("Function components cannot have string refs. We recommend using useRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref");
            f = v.stateNode;
          }
          if (!f)
            throw new Error("Missing owner for string ref " + i + ". This error is likely caused by a bug in React. Please file an issue.");
          var y = f;
          Mn(i, "ref");
          var C = "" + i;
          if (t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === C)
            return t.ref;
          var x = function(z) {
            var _ = y.refs;
            z === null ? delete _[C] : _[C] = z;
          };
          return x._stringRef = C, x;
        } else {
          if (typeof i != "string")
            throw new Error("Expected ref to be a function, a string, an object returned by React.createRef(), or null.");
          if (!a._owner)
            throw new Error("Element ref was specified as a string (" + i + `) but no owner was set. This could happen for one of the following reasons:
1. You may be adding a ref to a function component
2. You may be adding a ref to a component that was not created inside a component's render method
3. You have multiple copies of React loaded
See https://reactjs.org/link/refs-must-have-owner for more information.`);
        }
      }
      return i;
    }
    function mm(e, t) {
      var a = Object.prototype.toString.call(t);
      throw new Error("Objects are not valid as a React child (found: " + (a === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : a) + "). If you meant to render a collection of children, use an array instead.");
    }
    function ym(e) {
      {
        var t = at(e) || "Component";
        if (cS[t])
          return;
        cS[t] = !0, h("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.");
      }
    }
    function UC(e) {
      var t = e._payload, a = e._init;
      return a(t);
    }
    function FC(e) {
      function t(P, Z) {
        if (e) {
          var j = P.deletions;
          j === null ? (P.deletions = [Z], P.flags |= ra) : j.push(Z);
        }
      }
      function a(P, Z) {
        if (!e)
          return null;
        for (var j = Z; j !== null; )
          t(P, j), j = j.sibling;
        return null;
      }
      function i(P, Z) {
        for (var j = /* @__PURE__ */ new Map(), ce = Z; ce !== null; )
          ce.key !== null ? j.set(ce.key, ce) : j.set(ce.index, ce), ce = ce.sibling;
        return j;
      }
      function u(P, Z) {
        var j = Ls(P, Z);
        return j.index = 0, j.sibling = null, j;
      }
      function s(P, Z, j) {
        if (P.index = j, !e)
          return P.flags |= Pa, Z;
        var ce = P.alternate;
        if (ce !== null) {
          var be = ce.index;
          return be < Z ? (P.flags |= un, Z) : be;
        } else
          return P.flags |= un, Z;
      }
      function f(P) {
        return e && P.alternate === null && (P.flags |= un), P;
      }
      function v(P, Z, j, ce) {
        if (Z === null || Z.tag !== F) {
          var be = iE(j, P.mode, ce);
          return be.return = P, be;
        } else {
          var xe = u(Z, j);
          return xe.return = P, xe;
        }
      }
      function y(P, Z, j, ce) {
        var be = j.type;
        if (be === du)
          return x(P, Z, j.props.children, ce, j.key);
        if (Z !== null && (Z.elementType === be || // Keep this check inline so it only runs on the false path:
        Bx(Z, j) || // Lazy types should reconcile their resolved type.
        // We need to do this after the Hot Reloading check above,
        // because hot reloading has different semantics than prod because
        // it doesn't resuspend. So we can't let the call below suspend.
        typeof be == "object" && be !== null && be.$$typeof === qn && UC(be) === Z.type)) {
          var xe = u(Z, j.props);
          return xe.ref = Op(P, Z, j), xe.return = P, xe._debugSource = j._source, xe._debugOwner = j._owner, xe;
        }
        var Ze = aE(j, P.mode, ce);
        return Ze.ref = Op(P, Z, j), Ze.return = P, Ze;
      }
      function C(P, Z, j, ce) {
        if (Z === null || Z.tag !== A || Z.stateNode.containerInfo !== j.containerInfo || Z.stateNode.implementation !== j.implementation) {
          var be = lE(j, P.mode, ce);
          return be.return = P, be;
        } else {
          var xe = u(Z, j.children || []);
          return xe.return = P, xe;
        }
      }
      function x(P, Z, j, ce, be) {
        if (Z === null || Z.tag !== H) {
          var xe = io(j, P.mode, ce, be);
          return xe.return = P, xe;
        } else {
          var Ze = u(Z, j);
          return Ze.return = P, Ze;
        }
      }
      function z(P, Z, j) {
        if (typeof Z == "string" && Z !== "" || typeof Z == "number") {
          var ce = iE("" + Z, P.mode, j);
          return ce.return = P, ce;
        }
        if (typeof Z == "object" && Z !== null) {
          switch (Z.$$typeof) {
            case Ni: {
              var be = aE(Z, P.mode, j);
              return be.ref = Op(P, null, Z), be.return = P, be;
            }
            case Ea: {
              var xe = lE(Z, P.mode, j);
              return xe.return = P, xe;
            }
            case qn: {
              var Ze = Z._payload, nt = Z._init;
              return z(P, nt(Ze), j);
            }
          }
          if (Hn(Z) || Ht(Z)) {
            var Ft = io(Z, P.mode, j, null);
            return Ft.return = P, Ft;
          }
          mm(P, Z);
        }
        return typeof Z == "function" && ym(P), null;
      }
      function _(P, Z, j, ce) {
        var be = Z !== null ? Z.key : null;
        if (typeof j == "string" && j !== "" || typeof j == "number")
          return be !== null ? null : v(P, Z, "" + j, ce);
        if (typeof j == "object" && j !== null) {
          switch (j.$$typeof) {
            case Ni:
              return j.key === be ? y(P, Z, j, ce) : null;
            case Ea:
              return j.key === be ? C(P, Z, j, ce) : null;
            case qn: {
              var xe = j._payload, Ze = j._init;
              return _(P, Z, Ze(xe), ce);
            }
          }
          if (Hn(j) || Ht(j))
            return be !== null ? null : x(P, Z, j, ce, null);
          mm(P, j);
        }
        return typeof j == "function" && ym(P), null;
      }
      function $(P, Z, j, ce, be) {
        if (typeof ce == "string" && ce !== "" || typeof ce == "number") {
          var xe = P.get(j) || null;
          return v(Z, xe, "" + ce, be);
        }
        if (typeof ce == "object" && ce !== null) {
          switch (ce.$$typeof) {
            case Ni: {
              var Ze = P.get(ce.key === null ? j : ce.key) || null;
              return y(Z, Ze, ce, be);
            }
            case Ea: {
              var nt = P.get(ce.key === null ? j : ce.key) || null;
              return C(Z, nt, ce, be);
            }
            case qn:
              var Ft = ce._payload, wt = ce._init;
              return $(P, Z, j, wt(Ft), be);
          }
          if (Hn(ce) || Ht(ce)) {
            var On = P.get(j) || null;
            return x(Z, On, ce, be, null);
          }
          mm(Z, ce);
        }
        return typeof ce == "function" && ym(Z), null;
      }
      function Q(P, Z, j) {
        {
          if (typeof P != "object" || P === null)
            return Z;
          switch (P.$$typeof) {
            case Ni:
            case Ea:
              AC(P, j);
              var ce = P.key;
              if (typeof ce != "string")
                break;
              if (Z === null) {
                Z = /* @__PURE__ */ new Set(), Z.add(ce);
                break;
              }
              if (!Z.has(ce)) {
                Z.add(ce);
                break;
              }
              h("Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.", ce);
              break;
            case qn:
              var be = P._payload, xe = P._init;
              Q(xe(be), Z, j);
              break;
          }
        }
        return Z;
      }
      function q(P, Z, j, ce) {
        for (var be = null, xe = 0; xe < j.length; xe++) {
          var Ze = j[xe];
          be = Q(Ze, be, P);
        }
        for (var nt = null, Ft = null, wt = Z, On = 0, Tt = 0, xn = null; wt !== null && Tt < j.length; Tt++) {
          wt.index > Tt ? (xn = wt, wt = null) : xn = wt.sibling;
          var Ar = _(P, wt, j[Tt], ce);
          if (Ar === null) {
            wt === null && (wt = xn);
            break;
          }
          e && wt && Ar.alternate === null && t(P, wt), On = s(Ar, On, Tt), Ft === null ? nt = Ar : Ft.sibling = Ar, Ft = Ar, wt = xn;
        }
        if (Tt === j.length) {
          if (a(P, wt), or()) {
            var hr = Tt;
            gs(P, hr);
          }
          return nt;
        }
        if (wt === null) {
          for (; Tt < j.length; Tt++) {
            var Na = z(P, j[Tt], ce);
            Na !== null && (On = s(Na, On, Tt), Ft === null ? nt = Na : Ft.sibling = Na, Ft = Na);
          }
          if (or()) {
            var Kr = Tt;
            gs(P, Kr);
          }
          return nt;
        }
        for (var Xr = i(P, wt); Tt < j.length; Tt++) {
          var Ur = $(Xr, P, Tt, j[Tt], ce);
          Ur !== null && (e && Ur.alternate !== null && Xr.delete(Ur.key === null ? Tt : Ur.key), On = s(Ur, On, Tt), Ft === null ? nt = Ur : Ft.sibling = Ur, Ft = Ur);
        }
        if (e && Xr.forEach(function(Nf) {
          return t(P, Nf);
        }), or()) {
          var ou = Tt;
          gs(P, ou);
        }
        return nt;
      }
      function Ee(P, Z, j, ce) {
        var be = Ht(j);
        if (typeof be != "function")
          throw new Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
        {
          typeof Symbol == "function" && // $FlowFixMe Flow doesn't know about toStringTag
          j[Symbol.toStringTag] === "Generator" && (uS || h("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers."), uS = !0), j.entries === be && (lS || h("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), lS = !0);
          var xe = be.call(j);
          if (xe)
            for (var Ze = null, nt = xe.next(); !nt.done; nt = xe.next()) {
              var Ft = nt.value;
              Ze = Q(Ft, Ze, P);
            }
        }
        var wt = be.call(j);
        if (wt == null)
          throw new Error("An iterable object provided no iterator.");
        for (var On = null, Tt = null, xn = Z, Ar = 0, hr = 0, Na = null, Kr = wt.next(); xn !== null && !Kr.done; hr++, Kr = wt.next()) {
          xn.index > hr ? (Na = xn, xn = null) : Na = xn.sibling;
          var Xr = _(P, xn, Kr.value, ce);
          if (Xr === null) {
            xn === null && (xn = Na);
            break;
          }
          e && xn && Xr.alternate === null && t(P, xn), Ar = s(Xr, Ar, hr), Tt === null ? On = Xr : Tt.sibling = Xr, Tt = Xr, xn = Na;
        }
        if (Kr.done) {
          if (a(P, xn), or()) {
            var Ur = hr;
            gs(P, Ur);
          }
          return On;
        }
        if (xn === null) {
          for (; !Kr.done; hr++, Kr = wt.next()) {
            var ou = z(P, Kr.value, ce);
            ou !== null && (Ar = s(ou, Ar, hr), Tt === null ? On = ou : Tt.sibling = ou, Tt = ou);
          }
          if (or()) {
            var Nf = hr;
            gs(P, Nf);
          }
          return On;
        }
        for (var uv = i(P, xn); !Kr.done; hr++, Kr = wt.next()) {
          var dl = $(uv, P, hr, Kr.value, ce);
          dl !== null && (e && dl.alternate !== null && uv.delete(dl.key === null ? hr : dl.key), Ar = s(dl, Ar, hr), Tt === null ? On = dl : Tt.sibling = dl, Tt = dl);
        }
        if (e && uv.forEach(function(dM) {
          return t(P, dM);
        }), or()) {
          var fM = hr;
          gs(P, fM);
        }
        return On;
      }
      function $e(P, Z, j, ce) {
        if (Z !== null && Z.tag === F) {
          a(P, Z.sibling);
          var be = u(Z, j);
          return be.return = P, be;
        }
        a(P, Z);
        var xe = iE(j, P.mode, ce);
        return xe.return = P, xe;
      }
      function Fe(P, Z, j, ce) {
        for (var be = j.key, xe = Z; xe !== null; ) {
          if (xe.key === be) {
            var Ze = j.type;
            if (Ze === du) {
              if (xe.tag === H) {
                a(P, xe.sibling);
                var nt = u(xe, j.props.children);
                return nt.return = P, nt._debugSource = j._source, nt._debugOwner = j._owner, nt;
              }
            } else if (xe.elementType === Ze || // Keep this check inline so it only runs on the false path:
            Bx(xe, j) || // Lazy types should reconcile their resolved type.
            // We need to do this after the Hot Reloading check above,
            // because hot reloading has different semantics than prod because
            // it doesn't resuspend. So we can't let the call below suspend.
            typeof Ze == "object" && Ze !== null && Ze.$$typeof === qn && UC(Ze) === xe.type) {
              a(P, xe.sibling);
              var Ft = u(xe, j.props);
              return Ft.ref = Op(P, xe, j), Ft.return = P, Ft._debugSource = j._source, Ft._debugOwner = j._owner, Ft;
            }
            a(P, xe);
            break;
          } else
            t(P, xe);
          xe = xe.sibling;
        }
        if (j.type === du) {
          var wt = io(j.props.children, P.mode, ce, j.key);
          return wt.return = P, wt;
        } else {
          var On = aE(j, P.mode, ce);
          return On.ref = Op(P, Z, j), On.return = P, On;
        }
      }
      function yt(P, Z, j, ce) {
        for (var be = j.key, xe = Z; xe !== null; ) {
          if (xe.key === be)
            if (xe.tag === A && xe.stateNode.containerInfo === j.containerInfo && xe.stateNode.implementation === j.implementation) {
              a(P, xe.sibling);
              var Ze = u(xe, j.children || []);
              return Ze.return = P, Ze;
            } else {
              a(P, xe);
              break;
            }
          else
            t(P, xe);
          xe = xe.sibling;
        }
        var nt = lE(j, P.mode, ce);
        return nt.return = P, nt;
      }
      function ct(P, Z, j, ce) {
        var be = typeof j == "object" && j !== null && j.type === du && j.key === null;
        if (be && (j = j.props.children), typeof j == "object" && j !== null) {
          switch (j.$$typeof) {
            case Ni:
              return f(Fe(P, Z, j, ce));
            case Ea:
              return f(yt(P, Z, j, ce));
            case qn:
              var xe = j._payload, Ze = j._init;
              return ct(P, Z, Ze(xe), ce);
          }
          if (Hn(j))
            return q(P, Z, j, ce);
          if (Ht(j))
            return Ee(P, Z, j, ce);
          mm(P, j);
        }
        return typeof j == "string" && j !== "" || typeof j == "number" ? f($e(P, Z, "" + j, ce)) : (typeof j == "function" && ym(P), a(P, Z));
      }
      return ct;
    }
    var hf = FC(!0), HC = FC(!1);
    function jb(e, t) {
      if (e !== null && t.child !== e.child)
        throw new Error("Resuming work not yet implemented.");
      if (t.child !== null) {
        var a = t.child, i = Ls(a, a.pendingProps);
        for (t.child = i, i.return = t; a.sibling !== null; )
          a = a.sibling, i = i.sibling = Ls(a, a.pendingProps), i.return = t;
        i.sibling = null;
      }
    }
    function Bb(e, t) {
      for (var a = e.child; a !== null; )
        OO(a, t), a = a.sibling;
    }
    var fS = Yu(null), dS;
    dS = {};
    var gm = null, mf = null, pS = null, Sm = !1;
    function Em() {
      gm = null, mf = null, pS = null, Sm = !1;
    }
    function VC() {
      Sm = !0;
    }
    function PC() {
      Sm = !1;
    }
    function jC(e, t, a) {
      Nr(fS, t._currentValue, e), t._currentValue = a, t._currentRenderer !== void 0 && t._currentRenderer !== null && t._currentRenderer !== dS && h("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), t._currentRenderer = dS;
    }
    function vS(e, t) {
      var a = fS.current;
      _r(fS, t), e._currentValue = a;
    }
    function hS(e, t, a) {
      for (var i = e; i !== null; ) {
        var u = i.alternate;
        if ($l(i.childLanes, t) ? u !== null && !$l(u.childLanes, t) && (u.childLanes = it(u.childLanes, t)) : (i.childLanes = it(i.childLanes, t), u !== null && (u.childLanes = it(u.childLanes, t))), i === a)
          break;
        i = i.return;
      }
      i !== a && h("Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue.");
    }
    function Ib(e, t, a) {
      $b(e, t, a);
    }
    function $b(e, t, a) {
      var i = e.child;
      for (i !== null && (i.return = e); i !== null; ) {
        var u = void 0, s = i.dependencies;
        if (s !== null) {
          u = i.child;
          for (var f = s.firstContext; f !== null; ) {
            if (f.context === t) {
              if (i.tag === k) {
                var v = Ko(a), y = nu(Vt, v);
                y.tag = Rm;
                var C = i.updateQueue;
                if (C !== null) {
                  var x = C.shared, z = x.pending;
                  z === null ? y.next = y : (y.next = z.next, z.next = y), x.pending = y;
                }
              }
              i.lanes = it(i.lanes, a);
              var _ = i.alternate;
              _ !== null && (_.lanes = it(_.lanes, a)), hS(i.return, a, e), s.lanes = it(s.lanes, a);
              break;
            }
            f = f.next;
          }
        } else if (i.tag === re)
          u = i.type === e.type ? null : i.child;
        else if (i.tag === Ye) {
          var $ = i.return;
          if ($ === null)
            throw new Error("We just came from a parent so we must have had a parent. This is a bug in React.");
          $.lanes = it($.lanes, a);
          var Q = $.alternate;
          Q !== null && (Q.lanes = it(Q.lanes, a)), hS($, a, e), u = i.sibling;
        } else
          u = i.child;
        if (u !== null)
          u.return = i;
        else
          for (u = i; u !== null; ) {
            if (u === e) {
              u = null;
              break;
            }
            var q = u.sibling;
            if (q !== null) {
              q.return = u.return, u = q;
              break;
            }
            u = u.return;
          }
        i = u;
      }
    }
    function yf(e, t) {
      gm = e, mf = null, pS = null;
      var a = e.dependencies;
      if (a !== null) {
        var i = a.firstContext;
        i !== null && (kr(a.lanes, t) && $p(), a.firstContext = null);
      }
    }
    function zn(e) {
      Sm && h("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
      var t = e._currentValue;
      if (pS !== e) {
        var a = {
          context: e,
          memoizedValue: t,
          next: null
        };
        if (mf === null) {
          if (gm === null)
            throw new Error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
          mf = a, gm.dependencies = {
            lanes: ae,
            firstContext: a
          };
        } else
          mf = mf.next = a;
      }
      return t;
    }
    var xs = null;
    function mS(e) {
      xs === null ? xs = [e] : xs.push(e);
    }
    function Yb() {
      if (xs !== null) {
        for (var e = 0; e < xs.length; e++) {
          var t = xs[e], a = t.interleaved;
          if (a !== null) {
            t.interleaved = null;
            var i = a.next, u = t.pending;
            if (u !== null) {
              var s = u.next;
              u.next = i, a.next = s;
            }
            t.pending = a;
          }
        }
        xs = null;
      }
    }
    function BC(e, t, a, i) {
      var u = t.interleaved;
      return u === null ? (a.next = a, mS(t)) : (a.next = u.next, u.next = a), t.interleaved = a, Cm(e, i);
    }
    function Qb(e, t, a, i) {
      var u = t.interleaved;
      u === null ? (a.next = a, mS(t)) : (a.next = u.next, u.next = a), t.interleaved = a;
    }
    function Wb(e, t, a, i) {
      var u = t.interleaved;
      return u === null ? (a.next = a, mS(t)) : (a.next = u.next, u.next = a), t.interleaved = a, Cm(e, i);
    }
    function pa(e, t) {
      return Cm(e, t);
    }
    var Gb = Cm;
    function Cm(e, t) {
      e.lanes = it(e.lanes, t);
      var a = e.alternate;
      a !== null && (a.lanes = it(a.lanes, t)), a === null && (e.flags & (un | aa)) !== je && Hx(e);
      for (var i = e, u = e.return; u !== null; )
        u.childLanes = it(u.childLanes, t), a = u.alternate, a !== null ? a.childLanes = it(a.childLanes, t) : (u.flags & (un | aa)) !== je && Hx(e), i = u, u = u.return;
      if (i.tag === M) {
        var s = i.stateNode;
        return s;
      } else
        return null;
    }
    var IC = 0, $C = 1, Rm = 2, yS = 3, xm = !1, gS, wm;
    gS = !1, wm = null;
    function SS(e) {
      var t = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: {
          pending: null,
          interleaved: null,
          lanes: ae
        },
        effects: null
      };
      e.updateQueue = t;
    }
    function YC(e, t) {
      var a = t.updateQueue, i = e.updateQueue;
      if (a === i) {
        var u = {
          baseState: i.baseState,
          firstBaseUpdate: i.firstBaseUpdate,
          lastBaseUpdate: i.lastBaseUpdate,
          shared: i.shared,
          effects: i.effects
        };
        t.updateQueue = u;
      }
    }
    function nu(e, t) {
      var a = {
        eventTime: e,
        lane: t,
        tag: IC,
        payload: null,
        callback: null,
        next: null
      };
      return a;
    }
    function Ku(e, t, a) {
      var i = e.updateQueue;
      if (i === null)
        return null;
      var u = i.shared;
      if (wm === u && !gS && (h("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback."), gS = !0), Qk()) {
        var s = u.pending;
        return s === null ? t.next = t : (t.next = s.next, s.next = t), u.pending = t, Gb(e, a);
      } else
        return Wb(e, u, t, a);
    }
    function Tm(e, t, a) {
      var i = t.updateQueue;
      if (i !== null) {
        var u = i.shared;
        if (Bd(a)) {
          var s = u.lanes;
          s = $d(s, e.pendingLanes);
          var f = it(s, a);
          u.lanes = f, Bc(e, f);
        }
      }
    }
    function ES(e, t) {
      var a = e.updateQueue, i = e.alternate;
      if (i !== null) {
        var u = i.updateQueue;
        if (a === u) {
          var s = null, f = null, v = a.firstBaseUpdate;
          if (v !== null) {
            var y = v;
            do {
              var C = {
                eventTime: y.eventTime,
                lane: y.lane,
                tag: y.tag,
                payload: y.payload,
                callback: y.callback,
                next: null
              };
              f === null ? s = f = C : (f.next = C, f = C), y = y.next;
            } while (y !== null);
            f === null ? s = f = t : (f.next = t, f = t);
          } else
            s = f = t;
          a = {
            baseState: u.baseState,
            firstBaseUpdate: s,
            lastBaseUpdate: f,
            shared: u.shared,
            effects: u.effects
          }, e.updateQueue = a;
          return;
        }
      }
      var x = a.lastBaseUpdate;
      x === null ? a.firstBaseUpdate = t : x.next = t, a.lastBaseUpdate = t;
    }
    function Kb(e, t, a, i, u, s) {
      switch (a.tag) {
        case $C: {
          var f = a.payload;
          if (typeof f == "function") {
            VC();
            var v = f.call(s, i, u);
            {
              if (e.mode & At) {
                Xt(!0);
                try {
                  f.call(s, i, u);
                } finally {
                  Xt(!1);
                }
              }
              PC();
            }
            return v;
          }
          return f;
        }
        case yS:
          e.flags = e.flags & -65537 | Pe;
        // Intentional fallthrough
        case IC: {
          var y = a.payload, C;
          if (typeof y == "function") {
            VC(), C = y.call(s, i, u);
            {
              if (e.mode & At) {
                Xt(!0);
                try {
                  y.call(s, i, u);
                } finally {
                  Xt(!1);
                }
              }
              PC();
            }
          } else
            C = y;
          return C == null ? i : ft({}, i, C);
        }
        case Rm:
          return xm = !0, i;
      }
      return i;
    }
    function bm(e, t, a, i) {
      var u = e.updateQueue;
      xm = !1, wm = u.shared;
      var s = u.firstBaseUpdate, f = u.lastBaseUpdate, v = u.shared.pending;
      if (v !== null) {
        u.shared.pending = null;
        var y = v, C = y.next;
        y.next = null, f === null ? s = C : f.next = C, f = y;
        var x = e.alternate;
        if (x !== null) {
          var z = x.updateQueue, _ = z.lastBaseUpdate;
          _ !== f && (_ === null ? z.firstBaseUpdate = C : _.next = C, z.lastBaseUpdate = y);
        }
      }
      if (s !== null) {
        var $ = u.baseState, Q = ae, q = null, Ee = null, $e = null, Fe = s;
        do {
          var yt = Fe.lane, ct = Fe.eventTime;
          if ($l(i, yt)) {
            if ($e !== null) {
              var Z = {
                eventTime: ct,
                // This update is going to be committed so we never want uncommit
                // it. Using NoLane works because 0 is a subset of all bitmasks, so
                // this will never be skipped by the check above.
                lane: St,
                tag: Fe.tag,
                payload: Fe.payload,
                callback: Fe.callback,
                next: null
              };
              $e = $e.next = Z;
            }
            $ = Kb(e, u, Fe, $, t, a);
            var j = Fe.callback;
            if (j !== null && // If the update was already committed, we should not queue its
            // callback again.
            Fe.lane !== St) {
              e.flags |= jt;
              var ce = u.effects;
              ce === null ? u.effects = [Fe] : ce.push(Fe);
            }
          } else {
            var P = {
              eventTime: ct,
              lane: yt,
              tag: Fe.tag,
              payload: Fe.payload,
              callback: Fe.callback,
              next: null
            };
            $e === null ? (Ee = $e = P, q = $) : $e = $e.next = P, Q = it(Q, yt);
          }
          if (Fe = Fe.next, Fe === null) {
            if (v = u.shared.pending, v === null)
              break;
            var be = v, xe = be.next;
            be.next = null, Fe = xe, u.lastBaseUpdate = be, u.shared.pending = null;
          }
        } while (!0);
        $e === null && (q = $), u.baseState = q, u.firstBaseUpdate = Ee, u.lastBaseUpdate = $e;
        var Ze = u.shared.interleaved;
        if (Ze !== null) {
          var nt = Ze;
          do
            Q = it(Q, nt.lane), nt = nt.next;
          while (nt !== Ze);
        } else s === null && (u.shared.lanes = ae);
        nv(Q), e.lanes = Q, e.memoizedState = $;
      }
      wm = null;
    }
    function Xb(e, t) {
      if (typeof e != "function")
        throw new Error("Invalid argument passed as callback. Expected a function. Instead " + ("received: " + e));
      e.call(t);
    }
    function QC() {
      xm = !1;
    }
    function Dm() {
      return xm;
    }
    function WC(e, t, a) {
      var i = t.effects;
      if (t.effects = null, i !== null)
        for (var u = 0; u < i.length; u++) {
          var s = i[u], f = s.callback;
          f !== null && (s.callback = null, Xb(f, a));
        }
    }
    var Mp = {}, Xu = Yu(Mp), Lp = Yu(Mp), km = Yu(Mp);
    function Om(e) {
      if (e === Mp)
        throw new Error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.");
      return e;
    }
    function GC() {
      var e = Om(km.current);
      return e;
    }
    function CS(e, t) {
      Nr(km, t, e), Nr(Lp, e, e), Nr(Xu, Mp, e);
      var a = p1(t);
      _r(Xu, e), Nr(Xu, a, e);
    }
    function gf(e) {
      _r(Xu, e), _r(Lp, e), _r(km, e);
    }
    function RS() {
      var e = Om(Xu.current);
      return e;
    }
    function KC(e) {
      Om(km.current);
      var t = Om(Xu.current), a = v1(t, e.type);
      t !== a && (Nr(Lp, e, e), Nr(Xu, a, e));
    }
    function xS(e) {
      Lp.current === e && (_r(Xu, e), _r(Lp, e));
    }
    var qb = 0, XC = 1, qC = 1, _p = 2, Ri = Yu(qb);
    function wS(e, t) {
      return (e & t) !== 0;
    }
    function Sf(e) {
      return e & XC;
    }
    function TS(e, t) {
      return e & XC | t;
    }
    function Zb(e, t) {
      return e | t;
    }
    function qu(e, t) {
      Nr(Ri, t, e);
    }
    function Ef(e) {
      _r(Ri, e);
    }
    function Jb(e, t) {
      var a = e.memoizedState;
      return a !== null ? a.dehydrated !== null : (e.memoizedProps, !0);
    }
    function Mm(e) {
      for (var t = e; t !== null; ) {
        if (t.tag === fe) {
          var a = t.memoizedState;
          if (a !== null) {
            var i = a.dehydrated;
            if (i === null || vC(i) || Ig(i))
              return t;
          }
        } else if (t.tag === Ae && // revealOrder undefined can't be trusted because it don't
        // keep track of whether it suspended or not.
        t.memoizedProps.revealOrder !== void 0) {
          var u = (t.flags & Pe) !== je;
          if (u)
            return t;
        } else if (t.child !== null) {
          t.child.return = t, t = t.child;
          continue;
        }
        if (t === e)
          return null;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e)
            return null;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
      return null;
    }
    var va = (
      /*   */
      0
    ), In = (
      /* */
      1
    ), il = (
      /*  */
      2
    ), $n = (
      /*    */
      4
    ), sr = (
      /*   */
      8
    ), bS = [];
    function DS() {
      for (var e = 0; e < bS.length; e++) {
        var t = bS[e];
        t._workInProgressVersionPrimary = null;
      }
      bS.length = 0;
    }
    function eD(e, t) {
      var a = t._getVersion, i = a(t._source);
      e.mutableSourceEagerHydrationData == null ? e.mutableSourceEagerHydrationData = [t, i] : e.mutableSourceEagerHydrationData.push(t, i);
    }
    var Te = m.ReactCurrentDispatcher, Np = m.ReactCurrentBatchConfig, kS, Cf;
    kS = /* @__PURE__ */ new Set();
    var ws = ae, Ut = null, Yn = null, Qn = null, Lm = !1, zp = !1, Ap = 0, tD = 0, nD = 25, ee = null, Ja = null, Zu = -1, OS = !1;
    function Ot() {
      {
        var e = ee;
        Ja === null ? Ja = [e] : Ja.push(e);
      }
    }
    function ge() {
      {
        var e = ee;
        Ja !== null && (Zu++, Ja[Zu] !== e && rD(e));
      }
    }
    function Rf(e) {
      e != null && !Hn(e) && h("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", ee, typeof e);
    }
    function rD(e) {
      {
        var t = at(Ut);
        if (!kS.has(t) && (kS.add(t), Ja !== null)) {
          for (var a = "", i = 30, u = 0; u <= Zu; u++) {
            for (var s = Ja[u], f = u === Zu ? e : s, v = u + 1 + ". " + s; v.length < i; )
              v += " ";
            v += f + `
`, a += v;
          }
          h(`React has detected a change in the order of Hooks called by %s. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://reactjs.org/link/rules-of-hooks

   Previous render            Next render
   ------------------------------------------------------
%s   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
`, t, a);
        }
      }
    }
    function zr() {
      throw new Error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`);
    }
    function MS(e, t) {
      if (OS)
        return !1;
      if (t === null)
        return h("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", ee), !1;
      e.length !== t.length && h(`The final argument passed to %s changed size between renders. The order and size of this array must remain constant.

Previous: %s
Incoming: %s`, ee, "[" + t.join(", ") + "]", "[" + e.join(", ") + "]");
      for (var a = 0; a < t.length && a < e.length; a++)
        if (!ue(e[a], t[a]))
          return !1;
      return !0;
    }
    function xf(e, t, a, i, u, s) {
      ws = s, Ut = t, Ja = e !== null ? e._debugHookTypes : null, Zu = -1, OS = e !== null && e.type !== t.type, t.memoizedState = null, t.updateQueue = null, t.lanes = ae, e !== null && e.memoizedState !== null ? Te.current = SR : Ja !== null ? Te.current = gR : Te.current = yR;
      var f = a(i, u);
      if (zp) {
        var v = 0;
        do {
          if (zp = !1, Ap = 0, v >= nD)
            throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
          v += 1, OS = !1, Yn = null, Qn = null, t.updateQueue = null, Zu = -1, Te.current = ER, f = a(i, u);
        } while (zp);
      }
      Te.current = $m, t._debugHookTypes = Ja;
      var y = Yn !== null && Yn.next !== null;
      if (ws = ae, Ut = null, Yn = null, Qn = null, ee = null, Ja = null, Zu = -1, e !== null && (e.flags & yn) !== (t.flags & yn) && // Disable this warning in legacy mode, because legacy Suspense is weird
      // and creates false positives. To make this work in legacy mode, we'd
      // need to mark fibers that commit in an incomplete state, somehow. For
      // now I'll disable the warning that most of the bugs that would trigger
      // it are either exclusive to concurrent mode or exist in both.
      (e.mode & ot) !== Be && h("Internal React error: Expected static flag was missing. Please notify the React team."), Lm = !1, y)
        throw new Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");
      return f;
    }
    function wf() {
      var e = Ap !== 0;
      return Ap = 0, e;
    }
    function ZC(e, t, a) {
      t.updateQueue = e.updateQueue, (t.mode & Rt) !== Be ? t.flags &= -50333701 : t.flags &= -2053, e.lanes = Xo(e.lanes, a);
    }
    function JC() {
      if (Te.current = $m, Lm) {
        for (var e = Ut.memoizedState; e !== null; ) {
          var t = e.queue;
          t !== null && (t.pending = null), e = e.next;
        }
        Lm = !1;
      }
      ws = ae, Ut = null, Yn = null, Qn = null, Ja = null, Zu = -1, ee = null, dR = !1, zp = !1, Ap = 0;
    }
    function ll() {
      var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
      };
      return Qn === null ? Ut.memoizedState = Qn = e : Qn = Qn.next = e, Qn;
    }
    function ei() {
      var e;
      if (Yn === null) {
        var t = Ut.alternate;
        t !== null ? e = t.memoizedState : e = null;
      } else
        e = Yn.next;
      var a;
      if (Qn === null ? a = Ut.memoizedState : a = Qn.next, a !== null)
        Qn = a, a = Qn.next, Yn = e;
      else {
        if (e === null)
          throw new Error("Rendered more hooks than during the previous render.");
        Yn = e;
        var i = {
          memoizedState: Yn.memoizedState,
          baseState: Yn.baseState,
          baseQueue: Yn.baseQueue,
          queue: Yn.queue,
          next: null
        };
        Qn === null ? Ut.memoizedState = Qn = i : Qn = Qn.next = i;
      }
      return Qn;
    }
    function eR() {
      return {
        lastEffect: null,
        stores: null
      };
    }
    function LS(e, t) {
      return typeof t == "function" ? t(e) : t;
    }
    function _S(e, t, a) {
      var i = ll(), u;
      a !== void 0 ? u = a(t) : u = t, i.memoizedState = i.baseState = u;
      var s = {
        pending: null,
        interleaved: null,
        lanes: ae,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: u
      };
      i.queue = s;
      var f = s.dispatch = uD.bind(null, Ut, s);
      return [i.memoizedState, f];
    }
    function NS(e, t, a) {
      var i = ei(), u = i.queue;
      if (u === null)
        throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
      u.lastRenderedReducer = e;
      var s = Yn, f = s.baseQueue, v = u.pending;
      if (v !== null) {
        if (f !== null) {
          var y = f.next, C = v.next;
          f.next = C, v.next = y;
        }
        s.baseQueue !== f && h("Internal error: Expected work-in-progress queue to be a clone. This is a bug in React."), s.baseQueue = f = v, u.pending = null;
      }
      if (f !== null) {
        var x = f.next, z = s.baseState, _ = null, $ = null, Q = null, q = x;
        do {
          var Ee = q.lane;
          if ($l(ws, Ee)) {
            if (Q !== null) {
              var Fe = {
                // This update is going to be committed so we never want uncommit
                // it. Using NoLane works because 0 is a subset of all bitmasks, so
                // this will never be skipped by the check above.
                lane: St,
                action: q.action,
                hasEagerState: q.hasEagerState,
                eagerState: q.eagerState,
                next: null
              };
              Q = Q.next = Fe;
            }
            if (q.hasEagerState)
              z = q.eagerState;
            else {
              var yt = q.action;
              z = e(z, yt);
            }
          } else {
            var $e = {
              lane: Ee,
              action: q.action,
              hasEagerState: q.hasEagerState,
              eagerState: q.eagerState,
              next: null
            };
            Q === null ? ($ = Q = $e, _ = z) : Q = Q.next = $e, Ut.lanes = it(Ut.lanes, Ee), nv(Ee);
          }
          q = q.next;
        } while (q !== null && q !== x);
        Q === null ? _ = z : Q.next = $, ue(z, i.memoizedState) || $p(), i.memoizedState = z, i.baseState = _, i.baseQueue = Q, u.lastRenderedState = z;
      }
      var ct = u.interleaved;
      if (ct !== null) {
        var P = ct;
        do {
          var Z = P.lane;
          Ut.lanes = it(Ut.lanes, Z), nv(Z), P = P.next;
        } while (P !== ct);
      } else f === null && (u.lanes = ae);
      var j = u.dispatch;
      return [i.memoizedState, j];
    }
    function zS(e, t, a) {
      var i = ei(), u = i.queue;
      if (u === null)
        throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
      u.lastRenderedReducer = e;
      var s = u.dispatch, f = u.pending, v = i.memoizedState;
      if (f !== null) {
        u.pending = null;
        var y = f.next, C = y;
        do {
          var x = C.action;
          v = e(v, x), C = C.next;
        } while (C !== y);
        ue(v, i.memoizedState) || $p(), i.memoizedState = v, i.baseQueue === null && (i.baseState = v), u.lastRenderedState = v;
      }
      return [v, s];
    }
    function PL(e, t, a) {
    }
    function jL(e, t, a) {
    }
    function AS(e, t, a) {
      var i = Ut, u = ll(), s, f = or();
      if (f) {
        if (a === void 0)
          throw new Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
        s = a(), Cf || s !== a() && (h("The result of getServerSnapshot should be cached to avoid an infinite loop"), Cf = !0);
      } else {
        if (s = t(), !Cf) {
          var v = t();
          ue(s, v) || (h("The result of getSnapshot should be cached to avoid an infinite loop"), Cf = !0);
        }
        var y = sy();
        if (y === null)
          throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
        Pc(y, ws) || tR(i, t, s);
      }
      u.memoizedState = s;
      var C = {
        value: s,
        getSnapshot: t
      };
      return u.queue = C, Um(rR.bind(null, i, C, e), [e]), i.flags |= xr, Up(In | sr, nR.bind(null, i, C, s, t), void 0, null), s;
    }
    function _m(e, t, a) {
      var i = Ut, u = ei(), s = t();
      if (!Cf) {
        var f = t();
        ue(s, f) || (h("The result of getSnapshot should be cached to avoid an infinite loop"), Cf = !0);
      }
      var v = u.memoizedState, y = !ue(v, s);
      y && (u.memoizedState = s, $p());
      var C = u.queue;
      if (Hp(rR.bind(null, i, C, e), [e]), C.getSnapshot !== t || y || // Check if the susbcribe function changed. We can save some memory by
      // checking whether we scheduled a subscription effect above.
      Qn !== null && Qn.memoizedState.tag & In) {
        i.flags |= xr, Up(In | sr, nR.bind(null, i, C, s, t), void 0, null);
        var x = sy();
        if (x === null)
          throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
        Pc(x, ws) || tR(i, t, s);
      }
      return s;
    }
    function tR(e, t, a) {
      e.flags |= Ou;
      var i = {
        getSnapshot: t,
        value: a
      }, u = Ut.updateQueue;
      if (u === null)
        u = eR(), Ut.updateQueue = u, u.stores = [i];
      else {
        var s = u.stores;
        s === null ? u.stores = [i] : s.push(i);
      }
    }
    function nR(e, t, a, i) {
      t.value = a, t.getSnapshot = i, aR(t) && iR(e);
    }
    function rR(e, t, a) {
      var i = function() {
        aR(t) && iR(e);
      };
      return a(i);
    }
    function aR(e) {
      var t = e.getSnapshot, a = e.value;
      try {
        var i = t();
        return !ue(a, i);
      } catch {
        return !0;
      }
    }
    function iR(e) {
      var t = pa(e, qe);
      t !== null && Xn(t, e, qe, Vt);
    }
    function Nm(e) {
      var t = ll();
      typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e;
      var a = {
        pending: null,
        interleaved: null,
        lanes: ae,
        dispatch: null,
        lastRenderedReducer: LS,
        lastRenderedState: e
      };
      t.queue = a;
      var i = a.dispatch = oD.bind(null, Ut, a);
      return [t.memoizedState, i];
    }
    function US(e) {
      return NS(LS);
    }
    function FS(e) {
      return zS(LS);
    }
    function Up(e, t, a, i) {
      var u = {
        tag: e,
        create: t,
        destroy: a,
        deps: i,
        // Circular
        next: null
      }, s = Ut.updateQueue;
      if (s === null)
        s = eR(), Ut.updateQueue = s, s.lastEffect = u.next = u;
      else {
        var f = s.lastEffect;
        if (f === null)
          s.lastEffect = u.next = u;
        else {
          var v = f.next;
          f.next = u, u.next = v, s.lastEffect = u;
        }
      }
      return u;
    }
    function HS(e) {
      var t = ll();
      {
        var a = {
          current: e
        };
        return t.memoizedState = a, a;
      }
    }
    function zm(e) {
      var t = ei();
      return t.memoizedState;
    }
    function Fp(e, t, a, i) {
      var u = ll(), s = i === void 0 ? null : i;
      Ut.flags |= e, u.memoizedState = Up(In | t, a, void 0, s);
    }
    function Am(e, t, a, i) {
      var u = ei(), s = i === void 0 ? null : i, f = void 0;
      if (Yn !== null) {
        var v = Yn.memoizedState;
        if (f = v.destroy, s !== null) {
          var y = v.deps;
          if (MS(s, y)) {
            u.memoizedState = Up(t, a, f, s);
            return;
          }
        }
      }
      Ut.flags |= e, u.memoizedState = Up(In | t, a, f, s);
    }
    function Um(e, t) {
      return (Ut.mode & Rt) !== Be ? Fp(ja | xr | pc, sr, e, t) : Fp(xr | pc, sr, e, t);
    }
    function Hp(e, t) {
      return Am(xr, sr, e, t);
    }
    function VS(e, t) {
      return Fp(vt, il, e, t);
    }
    function Fm(e, t) {
      return Am(vt, il, e, t);
    }
    function PS(e, t) {
      var a = vt;
      return a |= ci, (Ut.mode & Rt) !== Be && (a |= ji), Fp(a, $n, e, t);
    }
    function Hm(e, t) {
      return Am(vt, $n, e, t);
    }
    function lR(e, t) {
      if (typeof t == "function") {
        var a = t, i = e();
        return a(i), function() {
          a(null);
        };
      } else if (t != null) {
        var u = t;
        u.hasOwnProperty("current") || h("Expected useImperativeHandle() first argument to either be a ref callback or React.createRef() object. Instead received: %s.", "an object with keys {" + Object.keys(u).join(", ") + "}");
        var s = e();
        return u.current = s, function() {
          u.current = null;
        };
      }
    }
    function jS(e, t, a) {
      typeof t != "function" && h("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
      var i = a != null ? a.concat([e]) : null, u = vt;
      return u |= ci, (Ut.mode & Rt) !== Be && (u |= ji), Fp(u, $n, lR.bind(null, t, e), i);
    }
    function Vm(e, t, a) {
      typeof t != "function" && h("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
      var i = a != null ? a.concat([e]) : null;
      return Am(vt, $n, lR.bind(null, t, e), i);
    }
    function aD(e, t) {
    }
    var Pm = aD;
    function BS(e, t) {
      var a = ll(), i = t === void 0 ? null : t;
      return a.memoizedState = [e, i], e;
    }
    function jm(e, t) {
      var a = ei(), i = t === void 0 ? null : t, u = a.memoizedState;
      if (u !== null && i !== null) {
        var s = u[1];
        if (MS(i, s))
          return u[0];
      }
      return a.memoizedState = [e, i], e;
    }
    function IS(e, t) {
      var a = ll(), i = t === void 0 ? null : t, u = e();
      return a.memoizedState = [u, i], u;
    }
    function Bm(e, t) {
      var a = ei(), i = t === void 0 ? null : t, u = a.memoizedState;
      if (u !== null && i !== null) {
        var s = u[1];
        if (MS(i, s))
          return u[0];
      }
      var f = e();
      return a.memoizedState = [f, i], f;
    }
    function $S(e) {
      var t = ll();
      return t.memoizedState = e, e;
    }
    function uR(e) {
      var t = ei(), a = Yn, i = a.memoizedState;
      return sR(t, i, e);
    }
    function oR(e) {
      var t = ei();
      if (Yn === null)
        return t.memoizedState = e, e;
      var a = Yn.memoizedState;
      return sR(t, a, e);
    }
    function sR(e, t, a) {
      var i = !Pd(ws);
      if (i) {
        if (!ue(a, t)) {
          var u = Id();
          Ut.lanes = it(Ut.lanes, u), nv(u), e.baseState = !0;
        }
        return t;
      } else
        return e.baseState && (e.baseState = !1, $p()), e.memoizedState = a, a;
    }
    function iD(e, t, a) {
      var i = ca();
      En(Sh(i, Ya)), e(!0);
      var u = Np.transition;
      Np.transition = {};
      var s = Np.transition;
      Np.transition._updatedFibers = /* @__PURE__ */ new Set();
      try {
        e(!1), t();
      } finally {
        if (En(i), Np.transition = u, u === null && s._updatedFibers) {
          var f = s._updatedFibers.size;
          f > 10 && w("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), s._updatedFibers.clear();
        }
      }
    }
    function YS() {
      var e = Nm(!1), t = e[0], a = e[1], i = iD.bind(null, a), u = ll();
      return u.memoizedState = i, [t, i];
    }
    function cR() {
      var e = US(), t = e[0], a = ei(), i = a.memoizedState;
      return [t, i];
    }
    function fR() {
      var e = FS(), t = e[0], a = ei(), i = a.memoizedState;
      return [t, i];
    }
    var dR = !1;
    function lD() {
      return dR;
    }
    function QS() {
      var e = ll(), t = sy(), a = t.identifierPrefix, i;
      if (or()) {
        var u = xb();
        i = ":" + a + "R" + u;
        var s = Ap++;
        s > 0 && (i += "H" + s.toString(32)), i += ":";
      } else {
        var f = tD++;
        i = ":" + a + "r" + f.toString(32) + ":";
      }
      return e.memoizedState = i, i;
    }
    function Im() {
      var e = ei(), t = e.memoizedState;
      return t;
    }
    function uD(e, t, a) {
      typeof arguments[3] == "function" && h("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
      var i = ro(e), u = {
        lane: i,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if (pR(e))
        vR(t, u);
      else {
        var s = BC(e, t, u, i);
        if (s !== null) {
          var f = Gr();
          Xn(s, e, i, f), hR(s, t, i);
        }
      }
      mR(e, i);
    }
    function oD(e, t, a) {
      typeof arguments[3] == "function" && h("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
      var i = ro(e), u = {
        lane: i,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if (pR(e))
        vR(t, u);
      else {
        var s = e.alternate;
        if (e.lanes === ae && (s === null || s.lanes === ae)) {
          var f = t.lastRenderedReducer;
          if (f !== null) {
            var v;
            v = Te.current, Te.current = xi;
            try {
              var y = t.lastRenderedState, C = f(y, a);
              if (u.hasEagerState = !0, u.eagerState = C, ue(C, y)) {
                Qb(e, t, u, i);
                return;
              }
            } catch {
            } finally {
              Te.current = v;
            }
          }
        }
        var x = BC(e, t, u, i);
        if (x !== null) {
          var z = Gr();
          Xn(x, e, i, z), hR(x, t, i);
        }
      }
      mR(e, i);
    }
    function pR(e) {
      var t = e.alternate;
      return e === Ut || t !== null && t === Ut;
    }
    function vR(e, t) {
      zp = Lm = !0;
      var a = e.pending;
      a === null ? t.next = t : (t.next = a.next, a.next = t), e.pending = t;
    }
    function hR(e, t, a) {
      if (Bd(a)) {
        var i = t.lanes;
        i = $d(i, e.pendingLanes);
        var u = it(i, a);
        t.lanes = u, Bc(e, u);
      }
    }
    function mR(e, t, a) {
      Po(e, t);
    }
    var $m = {
      readContext: zn,
      useCallback: zr,
      useContext: zr,
      useEffect: zr,
      useImperativeHandle: zr,
      useInsertionEffect: zr,
      useLayoutEffect: zr,
      useMemo: zr,
      useReducer: zr,
      useRef: zr,
      useState: zr,
      useDebugValue: zr,
      useDeferredValue: zr,
      useTransition: zr,
      useMutableSource: zr,
      useSyncExternalStore: zr,
      useId: zr,
      unstable_isNewReconciler: I
    }, yR = null, gR = null, SR = null, ER = null, ul = null, xi = null, Ym = null;
    {
      var WS = function() {
        h("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
      }, tt = function() {
        h("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks");
      };
      yR = {
        readContext: function(e) {
          return zn(e);
        },
        useCallback: function(e, t) {
          return ee = "useCallback", Ot(), Rf(t), BS(e, t);
        },
        useContext: function(e) {
          return ee = "useContext", Ot(), zn(e);
        },
        useEffect: function(e, t) {
          return ee = "useEffect", Ot(), Rf(t), Um(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return ee = "useImperativeHandle", Ot(), Rf(a), jS(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return ee = "useInsertionEffect", Ot(), Rf(t), VS(e, t);
        },
        useLayoutEffect: function(e, t) {
          return ee = "useLayoutEffect", Ot(), Rf(t), PS(e, t);
        },
        useMemo: function(e, t) {
          ee = "useMemo", Ot(), Rf(t);
          var a = Te.current;
          Te.current = ul;
          try {
            return IS(e, t);
          } finally {
            Te.current = a;
          }
        },
        useReducer: function(e, t, a) {
          ee = "useReducer", Ot();
          var i = Te.current;
          Te.current = ul;
          try {
            return _S(e, t, a);
          } finally {
            Te.current = i;
          }
        },
        useRef: function(e) {
          return ee = "useRef", Ot(), HS(e);
        },
        useState: function(e) {
          ee = "useState", Ot();
          var t = Te.current;
          Te.current = ul;
          try {
            return Nm(e);
          } finally {
            Te.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return ee = "useDebugValue", Ot(), void 0;
        },
        useDeferredValue: function(e) {
          return ee = "useDeferredValue", Ot(), $S(e);
        },
        useTransition: function() {
          return ee = "useTransition", Ot(), YS();
        },
        useMutableSource: function(e, t, a) {
          return ee = "useMutableSource", Ot(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return ee = "useSyncExternalStore", Ot(), AS(e, t, a);
        },
        useId: function() {
          return ee = "useId", Ot(), QS();
        },
        unstable_isNewReconciler: I
      }, gR = {
        readContext: function(e) {
          return zn(e);
        },
        useCallback: function(e, t) {
          return ee = "useCallback", ge(), BS(e, t);
        },
        useContext: function(e) {
          return ee = "useContext", ge(), zn(e);
        },
        useEffect: function(e, t) {
          return ee = "useEffect", ge(), Um(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return ee = "useImperativeHandle", ge(), jS(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return ee = "useInsertionEffect", ge(), VS(e, t);
        },
        useLayoutEffect: function(e, t) {
          return ee = "useLayoutEffect", ge(), PS(e, t);
        },
        useMemo: function(e, t) {
          ee = "useMemo", ge();
          var a = Te.current;
          Te.current = ul;
          try {
            return IS(e, t);
          } finally {
            Te.current = a;
          }
        },
        useReducer: function(e, t, a) {
          ee = "useReducer", ge();
          var i = Te.current;
          Te.current = ul;
          try {
            return _S(e, t, a);
          } finally {
            Te.current = i;
          }
        },
        useRef: function(e) {
          return ee = "useRef", ge(), HS(e);
        },
        useState: function(e) {
          ee = "useState", ge();
          var t = Te.current;
          Te.current = ul;
          try {
            return Nm(e);
          } finally {
            Te.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return ee = "useDebugValue", ge(), void 0;
        },
        useDeferredValue: function(e) {
          return ee = "useDeferredValue", ge(), $S(e);
        },
        useTransition: function() {
          return ee = "useTransition", ge(), YS();
        },
        useMutableSource: function(e, t, a) {
          return ee = "useMutableSource", ge(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return ee = "useSyncExternalStore", ge(), AS(e, t, a);
        },
        useId: function() {
          return ee = "useId", ge(), QS();
        },
        unstable_isNewReconciler: I
      }, SR = {
        readContext: function(e) {
          return zn(e);
        },
        useCallback: function(e, t) {
          return ee = "useCallback", ge(), jm(e, t);
        },
        useContext: function(e) {
          return ee = "useContext", ge(), zn(e);
        },
        useEffect: function(e, t) {
          return ee = "useEffect", ge(), Hp(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return ee = "useImperativeHandle", ge(), Vm(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return ee = "useInsertionEffect", ge(), Fm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return ee = "useLayoutEffect", ge(), Hm(e, t);
        },
        useMemo: function(e, t) {
          ee = "useMemo", ge();
          var a = Te.current;
          Te.current = xi;
          try {
            return Bm(e, t);
          } finally {
            Te.current = a;
          }
        },
        useReducer: function(e, t, a) {
          ee = "useReducer", ge();
          var i = Te.current;
          Te.current = xi;
          try {
            return NS(e, t, a);
          } finally {
            Te.current = i;
          }
        },
        useRef: function(e) {
          return ee = "useRef", ge(), zm();
        },
        useState: function(e) {
          ee = "useState", ge();
          var t = Te.current;
          Te.current = xi;
          try {
            return US(e);
          } finally {
            Te.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return ee = "useDebugValue", ge(), Pm();
        },
        useDeferredValue: function(e) {
          return ee = "useDeferredValue", ge(), uR(e);
        },
        useTransition: function() {
          return ee = "useTransition", ge(), cR();
        },
        useMutableSource: function(e, t, a) {
          return ee = "useMutableSource", ge(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return ee = "useSyncExternalStore", ge(), _m(e, t);
        },
        useId: function() {
          return ee = "useId", ge(), Im();
        },
        unstable_isNewReconciler: I
      }, ER = {
        readContext: function(e) {
          return zn(e);
        },
        useCallback: function(e, t) {
          return ee = "useCallback", ge(), jm(e, t);
        },
        useContext: function(e) {
          return ee = "useContext", ge(), zn(e);
        },
        useEffect: function(e, t) {
          return ee = "useEffect", ge(), Hp(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return ee = "useImperativeHandle", ge(), Vm(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return ee = "useInsertionEffect", ge(), Fm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return ee = "useLayoutEffect", ge(), Hm(e, t);
        },
        useMemo: function(e, t) {
          ee = "useMemo", ge();
          var a = Te.current;
          Te.current = Ym;
          try {
            return Bm(e, t);
          } finally {
            Te.current = a;
          }
        },
        useReducer: function(e, t, a) {
          ee = "useReducer", ge();
          var i = Te.current;
          Te.current = Ym;
          try {
            return zS(e, t, a);
          } finally {
            Te.current = i;
          }
        },
        useRef: function(e) {
          return ee = "useRef", ge(), zm();
        },
        useState: function(e) {
          ee = "useState", ge();
          var t = Te.current;
          Te.current = Ym;
          try {
            return FS(e);
          } finally {
            Te.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return ee = "useDebugValue", ge(), Pm();
        },
        useDeferredValue: function(e) {
          return ee = "useDeferredValue", ge(), oR(e);
        },
        useTransition: function() {
          return ee = "useTransition", ge(), fR();
        },
        useMutableSource: function(e, t, a) {
          return ee = "useMutableSource", ge(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return ee = "useSyncExternalStore", ge(), _m(e, t);
        },
        useId: function() {
          return ee = "useId", ge(), Im();
        },
        unstable_isNewReconciler: I
      }, ul = {
        readContext: function(e) {
          return WS(), zn(e);
        },
        useCallback: function(e, t) {
          return ee = "useCallback", tt(), Ot(), BS(e, t);
        },
        useContext: function(e) {
          return ee = "useContext", tt(), Ot(), zn(e);
        },
        useEffect: function(e, t) {
          return ee = "useEffect", tt(), Ot(), Um(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return ee = "useImperativeHandle", tt(), Ot(), jS(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return ee = "useInsertionEffect", tt(), Ot(), VS(e, t);
        },
        useLayoutEffect: function(e, t) {
          return ee = "useLayoutEffect", tt(), Ot(), PS(e, t);
        },
        useMemo: function(e, t) {
          ee = "useMemo", tt(), Ot();
          var a = Te.current;
          Te.current = ul;
          try {
            return IS(e, t);
          } finally {
            Te.current = a;
          }
        },
        useReducer: function(e, t, a) {
          ee = "useReducer", tt(), Ot();
          var i = Te.current;
          Te.current = ul;
          try {
            return _S(e, t, a);
          } finally {
            Te.current = i;
          }
        },
        useRef: function(e) {
          return ee = "useRef", tt(), Ot(), HS(e);
        },
        useState: function(e) {
          ee = "useState", tt(), Ot();
          var t = Te.current;
          Te.current = ul;
          try {
            return Nm(e);
          } finally {
            Te.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return ee = "useDebugValue", tt(), Ot(), void 0;
        },
        useDeferredValue: function(e) {
          return ee = "useDeferredValue", tt(), Ot(), $S(e);
        },
        useTransition: function() {
          return ee = "useTransition", tt(), Ot(), YS();
        },
        useMutableSource: function(e, t, a) {
          return ee = "useMutableSource", tt(), Ot(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return ee = "useSyncExternalStore", tt(), Ot(), AS(e, t, a);
        },
        useId: function() {
          return ee = "useId", tt(), Ot(), QS();
        },
        unstable_isNewReconciler: I
      }, xi = {
        readContext: function(e) {
          return WS(), zn(e);
        },
        useCallback: function(e, t) {
          return ee = "useCallback", tt(), ge(), jm(e, t);
        },
        useContext: function(e) {
          return ee = "useContext", tt(), ge(), zn(e);
        },
        useEffect: function(e, t) {
          return ee = "useEffect", tt(), ge(), Hp(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return ee = "useImperativeHandle", tt(), ge(), Vm(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return ee = "useInsertionEffect", tt(), ge(), Fm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return ee = "useLayoutEffect", tt(), ge(), Hm(e, t);
        },
        useMemo: function(e, t) {
          ee = "useMemo", tt(), ge();
          var a = Te.current;
          Te.current = xi;
          try {
            return Bm(e, t);
          } finally {
            Te.current = a;
          }
        },
        useReducer: function(e, t, a) {
          ee = "useReducer", tt(), ge();
          var i = Te.current;
          Te.current = xi;
          try {
            return NS(e, t, a);
          } finally {
            Te.current = i;
          }
        },
        useRef: function(e) {
          return ee = "useRef", tt(), ge(), zm();
        },
        useState: function(e) {
          ee = "useState", tt(), ge();
          var t = Te.current;
          Te.current = xi;
          try {
            return US(e);
          } finally {
            Te.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return ee = "useDebugValue", tt(), ge(), Pm();
        },
        useDeferredValue: function(e) {
          return ee = "useDeferredValue", tt(), ge(), uR(e);
        },
        useTransition: function() {
          return ee = "useTransition", tt(), ge(), cR();
        },
        useMutableSource: function(e, t, a) {
          return ee = "useMutableSource", tt(), ge(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return ee = "useSyncExternalStore", tt(), ge(), _m(e, t);
        },
        useId: function() {
          return ee = "useId", tt(), ge(), Im();
        },
        unstable_isNewReconciler: I
      }, Ym = {
        readContext: function(e) {
          return WS(), zn(e);
        },
        useCallback: function(e, t) {
          return ee = "useCallback", tt(), ge(), jm(e, t);
        },
        useContext: function(e) {
          return ee = "useContext", tt(), ge(), zn(e);
        },
        useEffect: function(e, t) {
          return ee = "useEffect", tt(), ge(), Hp(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return ee = "useImperativeHandle", tt(), ge(), Vm(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return ee = "useInsertionEffect", tt(), ge(), Fm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return ee = "useLayoutEffect", tt(), ge(), Hm(e, t);
        },
        useMemo: function(e, t) {
          ee = "useMemo", tt(), ge();
          var a = Te.current;
          Te.current = xi;
          try {
            return Bm(e, t);
          } finally {
            Te.current = a;
          }
        },
        useReducer: function(e, t, a) {
          ee = "useReducer", tt(), ge();
          var i = Te.current;
          Te.current = xi;
          try {
            return zS(e, t, a);
          } finally {
            Te.current = i;
          }
        },
        useRef: function(e) {
          return ee = "useRef", tt(), ge(), zm();
        },
        useState: function(e) {
          ee = "useState", tt(), ge();
          var t = Te.current;
          Te.current = xi;
          try {
            return FS(e);
          } finally {
            Te.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return ee = "useDebugValue", tt(), ge(), Pm();
        },
        useDeferredValue: function(e) {
          return ee = "useDeferredValue", tt(), ge(), oR(e);
        },
        useTransition: function() {
          return ee = "useTransition", tt(), ge(), fR();
        },
        useMutableSource: function(e, t, a) {
          return ee = "useMutableSource", tt(), ge(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return ee = "useSyncExternalStore", tt(), ge(), _m(e, t);
        },
        useId: function() {
          return ee = "useId", tt(), ge(), Im();
        },
        unstable_isNewReconciler: I
      };
    }
    var Ju = g.unstable_now, CR = 0, Qm = -1, Vp = -1, Wm = -1, GS = !1, Gm = !1;
    function RR() {
      return GS;
    }
    function sD() {
      Gm = !0;
    }
    function cD() {
      GS = !1, Gm = !1;
    }
    function fD() {
      GS = Gm, Gm = !1;
    }
    function xR() {
      return CR;
    }
    function wR() {
      CR = Ju();
    }
    function KS(e) {
      Vp = Ju(), e.actualStartTime < 0 && (e.actualStartTime = Ju());
    }
    function TR(e) {
      Vp = -1;
    }
    function Km(e, t) {
      if (Vp >= 0) {
        var a = Ju() - Vp;
        e.actualDuration += a, t && (e.selfBaseDuration = a), Vp = -1;
      }
    }
    function ol(e) {
      if (Qm >= 0) {
        var t = Ju() - Qm;
        Qm = -1;
        for (var a = e.return; a !== null; ) {
          switch (a.tag) {
            case M:
              var i = a.stateNode;
              i.effectDuration += t;
              return;
            case pe:
              var u = a.stateNode;
              u.effectDuration += t;
              return;
          }
          a = a.return;
        }
      }
    }
    function XS(e) {
      if (Wm >= 0) {
        var t = Ju() - Wm;
        Wm = -1;
        for (var a = e.return; a !== null; ) {
          switch (a.tag) {
            case M:
              var i = a.stateNode;
              i !== null && (i.passiveEffectDuration += t);
              return;
            case pe:
              var u = a.stateNode;
              u !== null && (u.passiveEffectDuration += t);
              return;
          }
          a = a.return;
        }
      }
    }
    function sl() {
      Qm = Ju();
    }
    function qS() {
      Wm = Ju();
    }
    function ZS(e) {
      for (var t = e.child; t; )
        e.actualDuration += t.actualDuration, t = t.sibling;
    }
    function wi(e, t) {
      if (e && e.defaultProps) {
        var a = ft({}, t), i = e.defaultProps;
        for (var u in i)
          a[u] === void 0 && (a[u] = i[u]);
        return a;
      }
      return t;
    }
    var JS = {}, e0, t0, n0, r0, a0, bR, Xm, i0, l0, u0, Pp;
    {
      e0 = /* @__PURE__ */ new Set(), t0 = /* @__PURE__ */ new Set(), n0 = /* @__PURE__ */ new Set(), r0 = /* @__PURE__ */ new Set(), i0 = /* @__PURE__ */ new Set(), a0 = /* @__PURE__ */ new Set(), l0 = /* @__PURE__ */ new Set(), u0 = /* @__PURE__ */ new Set(), Pp = /* @__PURE__ */ new Set();
      var DR = /* @__PURE__ */ new Set();
      Xm = function(e, t) {
        if (!(e === null || typeof e == "function")) {
          var a = t + "_" + e;
          DR.has(a) || (DR.add(a), h("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e));
        }
      }, bR = function(e, t) {
        if (t === void 0) {
          var a = zt(e) || "Component";
          a0.has(a) || (a0.add(a), h("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", a));
        }
      }, Object.defineProperty(JS, "_processChildContext", {
        enumerable: !1,
        value: function() {
          throw new Error("_processChildContext is not available in React 16+. This likely means you have multiple copies of React and are attempting to nest a React 15 tree inside a React 16 tree using unstable_renderSubtreeIntoContainer, which isn't supported. Try to make sure you have only one copy of React (and ideally, switch to ReactDOM.createPortal).");
        }
      }), Object.freeze(JS);
    }
    function o0(e, t, a, i) {
      var u = e.memoizedState, s = a(i, u);
      {
        if (e.mode & At) {
          Xt(!0);
          try {
            s = a(i, u);
          } finally {
            Xt(!1);
          }
        }
        bR(t, s);
      }
      var f = s == null ? u : ft({}, u, s);
      if (e.memoizedState = f, e.lanes === ae) {
        var v = e.updateQueue;
        v.baseState = f;
      }
    }
    var s0 = {
      isMounted: rh,
      enqueueSetState: function(e, t, a) {
        var i = ku(e), u = Gr(), s = ro(i), f = nu(u, s);
        f.payload = t, a != null && (Xm(a, "setState"), f.callback = a);
        var v = Ku(i, f, s);
        v !== null && (Xn(v, i, s, u), Tm(v, i, s)), Po(i, s);
      },
      enqueueReplaceState: function(e, t, a) {
        var i = ku(e), u = Gr(), s = ro(i), f = nu(u, s);
        f.tag = $C, f.payload = t, a != null && (Xm(a, "replaceState"), f.callback = a);
        var v = Ku(i, f, s);
        v !== null && (Xn(v, i, s, u), Tm(v, i, s)), Po(i, s);
      },
      enqueueForceUpdate: function(e, t) {
        var a = ku(e), i = Gr(), u = ro(a), s = nu(i, u);
        s.tag = Rm, t != null && (Xm(t, "forceUpdate"), s.callback = t);
        var f = Ku(a, s, u);
        f !== null && (Xn(f, a, u, i), Tm(f, a, u)), Ec(a, u);
      }
    };
    function kR(e, t, a, i, u, s, f) {
      var v = e.stateNode;
      if (typeof v.shouldComponentUpdate == "function") {
        var y = v.shouldComponentUpdate(i, s, f);
        {
          if (e.mode & At) {
            Xt(!0);
            try {
              y = v.shouldComponentUpdate(i, s, f);
            } finally {
              Xt(!1);
            }
          }
          y === void 0 && h("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.", zt(t) || "Component");
        }
        return y;
      }
      return t.prototype && t.prototype.isPureReactComponent ? !_e(a, i) || !_e(u, s) : !0;
    }
    function dD(e, t, a) {
      var i = e.stateNode;
      {
        var u = zt(t) || "Component", s = i.render;
        s || (t.prototype && typeof t.prototype.render == "function" ? h("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", u) : h("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", u)), i.getInitialState && !i.getInitialState.isReactClassApproved && !i.state && h("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", u), i.getDefaultProps && !i.getDefaultProps.isReactClassApproved && h("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", u), i.propTypes && h("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", u), i.contextType && h("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", u), t.childContextTypes && !Pp.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
        // this one.
        (e.mode & At) === Be && (Pp.add(t), h(`%s uses the legacy childContextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() instead

.Learn more about this warning here: https://reactjs.org/link/legacy-context`, u)), t.contextTypes && !Pp.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
        // this one.
        (e.mode & At) === Be && (Pp.add(t), h(`%s uses the legacy contextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() with static contextType instead.

Learn more about this warning here: https://reactjs.org/link/legacy-context`, u)), i.contextTypes && h("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", u), t.contextType && t.contextTypes && !l0.has(t) && (l0.add(t), h("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", u)), typeof i.componentShouldUpdate == "function" && h("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", u), t.prototype && t.prototype.isPureReactComponent && typeof i.shouldComponentUpdate < "u" && h("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", zt(t) || "A pure component"), typeof i.componentDidUnmount == "function" && h("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", u), typeof i.componentDidReceiveProps == "function" && h("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", u), typeof i.componentWillRecieveProps == "function" && h("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", u), typeof i.UNSAFE_componentWillRecieveProps == "function" && h("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", u);
        var f = i.props !== a;
        i.props !== void 0 && f && h("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", u, u), i.defaultProps && h("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", u, u), typeof i.getSnapshotBeforeUpdate == "function" && typeof i.componentDidUpdate != "function" && !n0.has(t) && (n0.add(t), h("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", zt(t))), typeof i.getDerivedStateFromProps == "function" && h("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", u), typeof i.getDerivedStateFromError == "function" && h("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", u), typeof t.getSnapshotBeforeUpdate == "function" && h("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", u);
        var v = i.state;
        v && (typeof v != "object" || Hn(v)) && h("%s.state: must be set to an object or null", u), typeof i.getChildContext == "function" && typeof t.childContextTypes != "object" && h("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", u);
      }
    }
    function OR(e, t) {
      t.updater = s0, e.stateNode = t, Ml(t, e), t._reactInternalInstance = JS;
    }
    function MR(e, t, a) {
      var i = !1, u = La, s = La, f = t.contextType;
      if ("contextType" in t) {
        var v = (
          // Allow null for conditional declaration
          f === null || f !== void 0 && f.$$typeof === vo && f._context === void 0
        );
        if (!v && !u0.has(t)) {
          u0.add(t);
          var y = "";
          f === void 0 ? y = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof f != "object" ? y = " However, it is set to a " + typeof f + "." : f.$$typeof === vu ? y = " Did you accidentally pass the Context.Provider instead?" : f._context !== void 0 ? y = " Did you accidentally pass the Context.Consumer instead?" : y = " However, it is set to an object with keys {" + Object.keys(f).join(", ") + "}.", h("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", zt(t) || "Component", y);
        }
      }
      if (typeof f == "object" && f !== null)
        s = zn(f);
      else {
        u = cf(e, t, !0);
        var C = t.contextTypes;
        i = C != null, s = i ? ff(e, u) : La;
      }
      var x = new t(a, s);
      if (e.mode & At) {
        Xt(!0);
        try {
          x = new t(a, s);
        } finally {
          Xt(!1);
        }
      }
      var z = e.memoizedState = x.state !== null && x.state !== void 0 ? x.state : null;
      OR(e, x);
      {
        if (typeof t.getDerivedStateFromProps == "function" && z === null) {
          var _ = zt(t) || "Component";
          t0.has(_) || (t0.add(_), h("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", _, x.state === null ? "null" : "undefined", _));
        }
        if (typeof t.getDerivedStateFromProps == "function" || typeof x.getSnapshotBeforeUpdate == "function") {
          var $ = null, Q = null, q = null;
          if (typeof x.componentWillMount == "function" && x.componentWillMount.__suppressDeprecationWarning !== !0 ? $ = "componentWillMount" : typeof x.UNSAFE_componentWillMount == "function" && ($ = "UNSAFE_componentWillMount"), typeof x.componentWillReceiveProps == "function" && x.componentWillReceiveProps.__suppressDeprecationWarning !== !0 ? Q = "componentWillReceiveProps" : typeof x.UNSAFE_componentWillReceiveProps == "function" && (Q = "UNSAFE_componentWillReceiveProps"), typeof x.componentWillUpdate == "function" && x.componentWillUpdate.__suppressDeprecationWarning !== !0 ? q = "componentWillUpdate" : typeof x.UNSAFE_componentWillUpdate == "function" && (q = "UNSAFE_componentWillUpdate"), $ !== null || Q !== null || q !== null) {
            var Ee = zt(t) || "Component", $e = typeof t.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
            r0.has(Ee) || (r0.add(Ee), h(`Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://reactjs.org/link/unsafe-component-lifecycles`, Ee, $e, $ !== null ? `
  ` + $ : "", Q !== null ? `
  ` + Q : "", q !== null ? `
  ` + q : ""));
          }
        }
      }
      return i && SC(e, u, s), x;
    }
    function pD(e, t) {
      var a = t.state;
      typeof t.componentWillMount == "function" && t.componentWillMount(), typeof t.UNSAFE_componentWillMount == "function" && t.UNSAFE_componentWillMount(), a !== t.state && (h("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", at(e) || "Component"), s0.enqueueReplaceState(t, t.state, null));
    }
    function LR(e, t, a, i) {
      var u = t.state;
      if (typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(a, i), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(a, i), t.state !== u) {
        {
          var s = at(e) || "Component";
          e0.has(s) || (e0.add(s), h("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", s));
        }
        s0.enqueueReplaceState(t, t.state, null);
      }
    }
    function c0(e, t, a, i) {
      dD(e, t, a);
      var u = e.stateNode;
      u.props = a, u.state = e.memoizedState, u.refs = {}, SS(e);
      var s = t.contextType;
      if (typeof s == "object" && s !== null)
        u.context = zn(s);
      else {
        var f = cf(e, t, !0);
        u.context = ff(e, f);
      }
      {
        if (u.state === a) {
          var v = zt(t) || "Component";
          i0.has(v) || (i0.add(v), h("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", v));
        }
        e.mode & At && Ci.recordLegacyContextWarning(e, u), Ci.recordUnsafeLifecycleWarnings(e, u);
      }
      u.state = e.memoizedState;
      var y = t.getDerivedStateFromProps;
      if (typeof y == "function" && (o0(e, t, y, a), u.state = e.memoizedState), typeof t.getDerivedStateFromProps != "function" && typeof u.getSnapshotBeforeUpdate != "function" && (typeof u.UNSAFE_componentWillMount == "function" || typeof u.componentWillMount == "function") && (pD(e, u), bm(e, a, u, i), u.state = e.memoizedState), typeof u.componentDidMount == "function") {
        var C = vt;
        C |= ci, (e.mode & Rt) !== Be && (C |= ji), e.flags |= C;
      }
    }
    function vD(e, t, a, i) {
      var u = e.stateNode, s = e.memoizedProps;
      u.props = s;
      var f = u.context, v = t.contextType, y = La;
      if (typeof v == "object" && v !== null)
        y = zn(v);
      else {
        var C = cf(e, t, !0);
        y = ff(e, C);
      }
      var x = t.getDerivedStateFromProps, z = typeof x == "function" || typeof u.getSnapshotBeforeUpdate == "function";
      !z && (typeof u.UNSAFE_componentWillReceiveProps == "function" || typeof u.componentWillReceiveProps == "function") && (s !== a || f !== y) && LR(e, u, a, y), QC();
      var _ = e.memoizedState, $ = u.state = _;
      if (bm(e, a, u, i), $ = e.memoizedState, s === a && _ === $ && !um() && !Dm()) {
        if (typeof u.componentDidMount == "function") {
          var Q = vt;
          Q |= ci, (e.mode & Rt) !== Be && (Q |= ji), e.flags |= Q;
        }
        return !1;
      }
      typeof x == "function" && (o0(e, t, x, a), $ = e.memoizedState);
      var q = Dm() || kR(e, t, s, a, _, $, y);
      if (q) {
        if (!z && (typeof u.UNSAFE_componentWillMount == "function" || typeof u.componentWillMount == "function") && (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function") {
          var Ee = vt;
          Ee |= ci, (e.mode & Rt) !== Be && (Ee |= ji), e.flags |= Ee;
        }
      } else {
        if (typeof u.componentDidMount == "function") {
          var $e = vt;
          $e |= ci, (e.mode & Rt) !== Be && ($e |= ji), e.flags |= $e;
        }
        e.memoizedProps = a, e.memoizedState = $;
      }
      return u.props = a, u.state = $, u.context = y, q;
    }
    function hD(e, t, a, i, u) {
      var s = t.stateNode;
      YC(e, t);
      var f = t.memoizedProps, v = t.type === t.elementType ? f : wi(t.type, f);
      s.props = v;
      var y = t.pendingProps, C = s.context, x = a.contextType, z = La;
      if (typeof x == "object" && x !== null)
        z = zn(x);
      else {
        var _ = cf(t, a, !0);
        z = ff(t, _);
      }
      var $ = a.getDerivedStateFromProps, Q = typeof $ == "function" || typeof s.getSnapshotBeforeUpdate == "function";
      !Q && (typeof s.UNSAFE_componentWillReceiveProps == "function" || typeof s.componentWillReceiveProps == "function") && (f !== y || C !== z) && LR(t, s, i, z), QC();
      var q = t.memoizedState, Ee = s.state = q;
      if (bm(t, i, s, u), Ee = t.memoizedState, f === y && q === Ee && !um() && !Dm())
        return typeof s.componentDidUpdate == "function" && (f !== e.memoizedProps || q !== e.memoizedState) && (t.flags |= vt), typeof s.getSnapshotBeforeUpdate == "function" && (f !== e.memoizedProps || q !== e.memoizedState) && (t.flags |= bn), !1;
      typeof $ == "function" && (o0(t, a, $, i), Ee = t.memoizedState);
      var $e = Dm() || kR(t, a, v, i, q, Ee, z) || // TODO: In some cases, we'll end up checking if context has changed twice,
      // both before and after `shouldComponentUpdate` has been called. Not ideal,
      // but I'm loath to refactor this function. This only happens for memoized
      // components so it's not that common.
      X;
      return $e ? (!Q && (typeof s.UNSAFE_componentWillUpdate == "function" || typeof s.componentWillUpdate == "function") && (typeof s.componentWillUpdate == "function" && s.componentWillUpdate(i, Ee, z), typeof s.UNSAFE_componentWillUpdate == "function" && s.UNSAFE_componentWillUpdate(i, Ee, z)), typeof s.componentDidUpdate == "function" && (t.flags |= vt), typeof s.getSnapshotBeforeUpdate == "function" && (t.flags |= bn)) : (typeof s.componentDidUpdate == "function" && (f !== e.memoizedProps || q !== e.memoizedState) && (t.flags |= vt), typeof s.getSnapshotBeforeUpdate == "function" && (f !== e.memoizedProps || q !== e.memoizedState) && (t.flags |= bn), t.memoizedProps = i, t.memoizedState = Ee), s.props = i, s.state = Ee, s.context = z, $e;
    }
    function Ts(e, t) {
      return {
        value: e,
        source: t,
        stack: js(t),
        digest: null
      };
    }
    function f0(e, t, a) {
      return {
        value: e,
        source: null,
        stack: a ?? null,
        digest: t ?? null
      };
    }
    function mD(e, t) {
      return !0;
    }
    function d0(e, t) {
      try {
        var a = mD(e, t);
        if (a === !1)
          return;
        var i = t.value, u = t.source, s = t.stack, f = s !== null ? s : "";
        if (i != null && i._suppressLogging) {
          if (e.tag === k)
            return;
          console.error(i);
        }
        var v = u ? at(u) : null, y = v ? "The above error occurred in the <" + v + "> component:" : "The above error occurred in one of your React components:", C;
        if (e.tag === M)
          C = `Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.`;
        else {
          var x = at(e) || "Anonymous";
          C = "React will try to recreate this component tree from scratch " + ("using the error boundary you provided, " + x + ".");
        }
        var z = y + `
` + f + `

` + ("" + C);
        console.error(z);
      } catch (_) {
        setTimeout(function() {
          throw _;
        });
      }
    }
    var yD = typeof WeakMap == "function" ? WeakMap : Map;
    function _R(e, t, a) {
      var i = nu(Vt, a);
      i.tag = yS, i.payload = {
        element: null
      };
      var u = t.value;
      return i.callback = function() {
        sO(u), d0(e, t);
      }, i;
    }
    function p0(e, t, a) {
      var i = nu(Vt, a);
      i.tag = yS;
      var u = e.type.getDerivedStateFromError;
      if (typeof u == "function") {
        var s = t.value;
        i.payload = function() {
          return u(s);
        }, i.callback = function() {
          Ix(e), d0(e, t);
        };
      }
      var f = e.stateNode;
      return f !== null && typeof f.componentDidCatch == "function" && (i.callback = function() {
        Ix(e), d0(e, t), typeof u != "function" && uO(this);
        var y = t.value, C = t.stack;
        this.componentDidCatch(y, {
          componentStack: C !== null ? C : ""
        }), typeof u != "function" && (kr(e.lanes, qe) || h("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.", at(e) || "Unknown"));
      }), i;
    }
    function NR(e, t, a) {
      var i = e.pingCache, u;
      if (i === null ? (i = e.pingCache = new yD(), u = /* @__PURE__ */ new Set(), i.set(t, u)) : (u = i.get(t), u === void 0 && (u = /* @__PURE__ */ new Set(), i.set(t, u))), !u.has(a)) {
        u.add(a);
        var s = cO.bind(null, e, t, a);
        Dr && rv(e, a), t.then(s, s);
      }
    }
    function gD(e, t, a, i) {
      var u = e.updateQueue;
      if (u === null) {
        var s = /* @__PURE__ */ new Set();
        s.add(a), e.updateQueue = s;
      } else
        u.add(a);
    }
    function SD(e, t) {
      var a = e.tag;
      if ((e.mode & ot) === Be && (a === L || a === K || a === ve)) {
        var i = e.alternate;
        i ? (e.updateQueue = i.updateQueue, e.memoizedState = i.memoizedState, e.lanes = i.lanes) : (e.updateQueue = null, e.memoizedState = null);
      }
    }
    function zR(e) {
      var t = e;
      do {
        if (t.tag === fe && Jb(t))
          return t;
        t = t.return;
      } while (t !== null);
      return null;
    }
    function AR(e, t, a, i, u) {
      if ((e.mode & ot) === Be) {
        if (e === t)
          e.flags |= wr;
        else {
          if (e.flags |= Pe, a.flags |= dc, a.flags &= -52805, a.tag === k) {
            var s = a.alternate;
            if (s === null)
              a.tag = Oe;
            else {
              var f = nu(Vt, qe);
              f.tag = Rm, Ku(a, f, qe);
            }
          }
          a.lanes = it(a.lanes, qe);
        }
        return e;
      }
      return e.flags |= wr, e.lanes = u, e;
    }
    function ED(e, t, a, i, u) {
      if (a.flags |= zo, Dr && rv(e, u), i !== null && typeof i == "object" && typeof i.then == "function") {
        var s = i;
        SD(a), or() && a.mode & ot && bC();
        var f = zR(t);
        if (f !== null) {
          f.flags &= -257, AR(f, t, a, e, u), f.mode & ot && NR(e, s, u), gD(f, e, s);
          return;
        } else {
          if (!fh(u)) {
            NR(e, s, u), Q0();
            return;
          }
          var v = new Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");
          i = v;
        }
      } else if (or() && a.mode & ot) {
        bC();
        var y = zR(t);
        if (y !== null) {
          (y.flags & wr) === je && (y.flags |= Rr), AR(y, t, a, e, u), iS(Ts(i, a));
          return;
        }
      }
      i = Ts(i, a), Jk(i);
      var C = t;
      do {
        switch (C.tag) {
          case M: {
            var x = i;
            C.flags |= wr;
            var z = Ko(u);
            C.lanes = it(C.lanes, z);
            var _ = _R(C, x, z);
            ES(C, _);
            return;
          }
          case k:
            var $ = i, Q = C.type, q = C.stateNode;
            if ((C.flags & Pe) === je && (typeof Q.getDerivedStateFromError == "function" || q !== null && typeof q.componentDidCatch == "function" && !zx(q))) {
              C.flags |= wr;
              var Ee = Ko(u);
              C.lanes = it(C.lanes, Ee);
              var $e = p0(C, $, Ee);
              ES(C, $e);
              return;
            }
            break;
        }
        C = C.return;
      } while (C !== null);
    }
    function CD() {
      return null;
    }
    var jp = m.ReactCurrentOwner, Ti = !1, v0, Bp, h0, m0, y0, bs, g0, qm, Ip;
    v0 = {}, Bp = {}, h0 = {}, m0 = {}, y0 = {}, bs = !1, g0 = {}, qm = {}, Ip = {};
    function Qr(e, t, a, i) {
      e === null ? t.child = HC(t, null, a, i) : t.child = hf(t, e.child, a, i);
    }
    function RD(e, t, a, i) {
      t.child = hf(t, e.child, null, i), t.child = hf(t, null, a, i);
    }
    function UR(e, t, a, i, u) {
      if (t.type !== t.elementType) {
        var s = a.propTypes;
        s && Si(
          s,
          i,
          // Resolved props
          "prop",
          zt(a)
        );
      }
      var f = a.render, v = t.ref, y, C;
      yf(t, u), jr(t);
      {
        if (jp.current = t, Fn(!0), y = xf(e, t, f, i, v, u), C = wf(), t.mode & At) {
          Xt(!0);
          try {
            y = xf(e, t, f, i, v, u), C = wf();
          } finally {
            Xt(!1);
          }
        }
        Fn(!1);
      }
      return Br(), e !== null && !Ti ? (ZC(e, t, u), ru(e, t, u)) : (or() && C && Jg(t), t.flags |= Ta, Qr(e, t, y, u), t.child);
    }
    function FR(e, t, a, i, u) {
      if (e === null) {
        var s = a.type;
        if (DO(s) && a.compare === null && // SimpleMemoComponent codepath doesn't resolve outer props either.
        a.defaultProps === void 0) {
          var f = s;
          return f = _f(s), t.tag = ve, t.type = f, C0(t, s), HR(e, t, f, i, u);
        }
        {
          var v = s.propTypes;
          if (v && Si(
            v,
            i,
            // Resolved props
            "prop",
            zt(s)
          ), a.defaultProps !== void 0) {
            var y = zt(s) || "Unknown";
            Ip[y] || (h("%s: Support for defaultProps will be removed from memo components in a future major release. Use JavaScript default parameters instead.", y), Ip[y] = !0);
          }
        }
        var C = rE(a.type, null, i, t, t.mode, u);
        return C.ref = t.ref, C.return = t, t.child = C, C;
      }
      {
        var x = a.type, z = x.propTypes;
        z && Si(
          z,
          i,
          // Resolved props
          "prop",
          zt(x)
        );
      }
      var _ = e.child, $ = D0(e, u);
      if (!$) {
        var Q = _.memoizedProps, q = a.compare;
        if (q = q !== null ? q : _e, q(Q, i) && e.ref === t.ref)
          return ru(e, t, u);
      }
      t.flags |= Ta;
      var Ee = Ls(_, i);
      return Ee.ref = t.ref, Ee.return = t, t.child = Ee, Ee;
    }
    function HR(e, t, a, i, u) {
      if (t.type !== t.elementType) {
        var s = t.elementType;
        if (s.$$typeof === qn) {
          var f = s, v = f._payload, y = f._init;
          try {
            s = y(v);
          } catch {
            s = null;
          }
          var C = s && s.propTypes;
          C && Si(
            C,
            i,
            // Resolved (SimpleMemoComponent has no defaultProps)
            "prop",
            zt(s)
          );
        }
      }
      if (e !== null) {
        var x = e.memoizedProps;
        if (_e(x, i) && e.ref === t.ref && // Prevent bailout if the implementation changed due to hot reload.
        t.type === e.type)
          if (Ti = !1, t.pendingProps = i = x, D0(e, u))
            (e.flags & dc) !== je && (Ti = !0);
          else return t.lanes = e.lanes, ru(e, t, u);
      }
      return S0(e, t, a, i, u);
    }
    function VR(e, t, a) {
      var i = t.pendingProps, u = i.children, s = e !== null ? e.memoizedState : null;
      if (i.mode === "hidden" || G)
        if ((t.mode & ot) === Be) {
          var f = {
            baseLanes: ae,
            cachePool: null,
            transitions: null
          };
          t.memoizedState = f, cy(t, a);
        } else if (kr(a, Ir)) {
          var z = {
            baseLanes: ae,
            cachePool: null,
            transitions: null
          };
          t.memoizedState = z;
          var _ = s !== null ? s.baseLanes : a;
          cy(t, _);
        } else {
          var v = null, y;
          if (s !== null) {
            var C = s.baseLanes;
            y = it(C, a);
          } else
            y = a;
          t.lanes = t.childLanes = Ir;
          var x = {
            baseLanes: y,
            cachePool: v,
            transitions: null
          };
          return t.memoizedState = x, t.updateQueue = null, cy(t, y), null;
        }
      else {
        var $;
        s !== null ? ($ = it(s.baseLanes, a), t.memoizedState = null) : $ = a, cy(t, $);
      }
      return Qr(e, t, u, a), t.child;
    }
    function xD(e, t, a) {
      var i = t.pendingProps;
      return Qr(e, t, i, a), t.child;
    }
    function wD(e, t, a) {
      var i = t.pendingProps.children;
      return Qr(e, t, i, a), t.child;
    }
    function TD(e, t, a) {
      {
        t.flags |= vt;
        {
          var i = t.stateNode;
          i.effectDuration = 0, i.passiveEffectDuration = 0;
        }
      }
      var u = t.pendingProps, s = u.children;
      return Qr(e, t, s, a), t.child;
    }
    function PR(e, t) {
      var a = t.ref;
      (e === null && a !== null || e !== null && e.ref !== a) && (t.flags |= rn, t.flags |= Mu);
    }
    function S0(e, t, a, i, u) {
      if (t.type !== t.elementType) {
        var s = a.propTypes;
        s && Si(
          s,
          i,
          // Resolved props
          "prop",
          zt(a)
        );
      }
      var f;
      {
        var v = cf(t, a, !0);
        f = ff(t, v);
      }
      var y, C;
      yf(t, u), jr(t);
      {
        if (jp.current = t, Fn(!0), y = xf(e, t, a, i, f, u), C = wf(), t.mode & At) {
          Xt(!0);
          try {
            y = xf(e, t, a, i, f, u), C = wf();
          } finally {
            Xt(!1);
          }
        }
        Fn(!1);
      }
      return Br(), e !== null && !Ti ? (ZC(e, t, u), ru(e, t, u)) : (or() && C && Jg(t), t.flags |= Ta, Qr(e, t, y, u), t.child);
    }
    function jR(e, t, a, i, u) {
      {
        switch (BO(t)) {
          case !1: {
            var s = t.stateNode, f = t.type, v = new f(t.memoizedProps, s.context), y = v.state;
            s.updater.enqueueSetState(s, y, null);
            break;
          }
          case !0: {
            t.flags |= Pe, t.flags |= wr;
            var C = new Error("Simulated error coming from DevTools"), x = Ko(u);
            t.lanes = it(t.lanes, x);
            var z = p0(t, Ts(C, t), x);
            ES(t, z);
            break;
          }
        }
        if (t.type !== t.elementType) {
          var _ = a.propTypes;
          _ && Si(
            _,
            i,
            // Resolved props
            "prop",
            zt(a)
          );
        }
      }
      var $;
      al(a) ? ($ = !0, sm(t)) : $ = !1, yf(t, u);
      var Q = t.stateNode, q;
      Q === null ? (Jm(e, t), MR(t, a, i), c0(t, a, i, u), q = !0) : e === null ? q = vD(t, a, i, u) : q = hD(e, t, a, i, u);
      var Ee = E0(e, t, a, q, $, u);
      {
        var $e = t.stateNode;
        q && $e.props !== i && (bs || h("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", at(t) || "a component"), bs = !0);
      }
      return Ee;
    }
    function E0(e, t, a, i, u, s) {
      PR(e, t);
      var f = (t.flags & Pe) !== je;
      if (!i && !f)
        return u && RC(t, a, !1), ru(e, t, s);
      var v = t.stateNode;
      jp.current = t;
      var y;
      if (f && typeof a.getDerivedStateFromError != "function")
        y = null, TR();
      else {
        jr(t);
        {
          if (Fn(!0), y = v.render(), t.mode & At) {
            Xt(!0);
            try {
              v.render();
            } finally {
              Xt(!1);
            }
          }
          Fn(!1);
        }
        Br();
      }
      return t.flags |= Ta, e !== null && f ? RD(e, t, y, s) : Qr(e, t, y, s), t.memoizedState = v.state, u && RC(t, a, !0), t.child;
    }
    function BR(e) {
      var t = e.stateNode;
      t.pendingContext ? EC(e, t.pendingContext, t.pendingContext !== t.context) : t.context && EC(e, t.context, !1), CS(e, t.containerInfo);
    }
    function bD(e, t, a) {
      if (BR(t), e === null)
        throw new Error("Should have a current fiber. This is a bug in React.");
      var i = t.pendingProps, u = t.memoizedState, s = u.element;
      YC(e, t), bm(t, i, null, a);
      var f = t.memoizedState;
      t.stateNode;
      var v = f.element;
      if (u.isDehydrated) {
        var y = {
          element: v,
          isDehydrated: !1,
          cache: f.cache,
          pendingSuspenseBoundaries: f.pendingSuspenseBoundaries,
          transitions: f.transitions
        }, C = t.updateQueue;
        if (C.baseState = y, t.memoizedState = y, t.flags & Rr) {
          var x = Ts(new Error("There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering."), t);
          return IR(e, t, v, a, x);
        } else if (v !== s) {
          var z = Ts(new Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."), t);
          return IR(e, t, v, a, z);
        } else {
          Ob(t);
          var _ = HC(t, null, v, a);
          t.child = _;
          for (var $ = _; $; )
            $.flags = $.flags & -3 | aa, $ = $.sibling;
        }
      } else {
        if (vf(), v === s)
          return ru(e, t, a);
        Qr(e, t, v, a);
      }
      return t.child;
    }
    function IR(e, t, a, i, u) {
      return vf(), iS(u), t.flags |= Rr, Qr(e, t, a, i), t.child;
    }
    function DD(e, t, a) {
      KC(t), e === null && aS(t);
      var i = t.type, u = t.pendingProps, s = e !== null ? e.memoizedProps : null, f = u.children, v = Vg(i, u);
      return v ? f = null : s !== null && Vg(i, s) && (t.flags |= ba), PR(e, t), Qr(e, t, f, a), t.child;
    }
    function kD(e, t) {
      return e === null && aS(t), null;
    }
    function OD(e, t, a, i) {
      Jm(e, t);
      var u = t.pendingProps, s = a, f = s._payload, v = s._init, y = v(f);
      t.type = y;
      var C = t.tag = kO(y), x = wi(y, u), z;
      switch (C) {
        case L:
          return C0(t, y), t.type = y = _f(y), z = S0(null, t, y, x, i), z;
        case k:
          return t.type = y = q0(y), z = jR(null, t, y, x, i), z;
        case K:
          return t.type = y = Z0(y), z = UR(null, t, y, x, i), z;
        case ke: {
          if (t.type !== t.elementType) {
            var _ = y.propTypes;
            _ && Si(
              _,
              x,
              // Resolved for outer only
              "prop",
              zt(y)
            );
          }
          return z = FR(
            null,
            t,
            y,
            wi(y.type, x),
            // The inner type can have defaults too
            i
          ), z;
        }
      }
      var $ = "";
      throw y !== null && typeof y == "object" && y.$$typeof === qn && ($ = " Did you wrap a component in React.lazy() more than once?"), new Error("Element type is invalid. Received a promise that resolves to: " + y + ". " + ("Lazy element type must resolve to a class or function." + $));
    }
    function MD(e, t, a, i, u) {
      Jm(e, t), t.tag = k;
      var s;
      return al(a) ? (s = !0, sm(t)) : s = !1, yf(t, u), MR(t, a, i), c0(t, a, i, u), E0(null, t, a, !0, s, u);
    }
    function LD(e, t, a, i) {
      Jm(e, t);
      var u = t.pendingProps, s;
      {
        var f = cf(t, a, !1);
        s = ff(t, f);
      }
      yf(t, i);
      var v, y;
      jr(t);
      {
        if (a.prototype && typeof a.prototype.render == "function") {
          var C = zt(a) || "Unknown";
          v0[C] || (h("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", C, C), v0[C] = !0);
        }
        t.mode & At && Ci.recordLegacyContextWarning(t, null), Fn(!0), jp.current = t, v = xf(null, t, a, u, s, i), y = wf(), Fn(!1);
      }
      if (Br(), t.flags |= Ta, typeof v == "object" && v !== null && typeof v.render == "function" && v.$$typeof === void 0) {
        var x = zt(a) || "Unknown";
        Bp[x] || (h("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", x, x, x), Bp[x] = !0);
      }
      if (
        // Run these checks in production only if the flag is off.
        // Eventually we'll delete this branch altogether.
        typeof v == "object" && v !== null && typeof v.render == "function" && v.$$typeof === void 0
      ) {
        {
          var z = zt(a) || "Unknown";
          Bp[z] || (h("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", z, z, z), Bp[z] = !0);
        }
        t.tag = k, t.memoizedState = null, t.updateQueue = null;
        var _ = !1;
        return al(a) ? (_ = !0, sm(t)) : _ = !1, t.memoizedState = v.state !== null && v.state !== void 0 ? v.state : null, SS(t), OR(t, v), c0(t, a, u, i), E0(null, t, a, !0, _, i);
      } else {
        if (t.tag = L, t.mode & At) {
          Xt(!0);
          try {
            v = xf(null, t, a, u, s, i), y = wf();
          } finally {
            Xt(!1);
          }
        }
        return or() && y && Jg(t), Qr(null, t, v, i), C0(t, a), t.child;
      }
    }
    function C0(e, t) {
      {
        if (t && t.childContextTypes && h("%s(...): childContextTypes cannot be defined on a function component.", t.displayName || t.name || "Component"), e.ref !== null) {
          var a = "", i = ea();
          i && (a += `

Check the render method of \`` + i + "`.");
          var u = i || "", s = e._debugSource;
          s && (u = s.fileName + ":" + s.lineNumber), y0[u] || (y0[u] = !0, h("Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?%s", a));
        }
        if (t.defaultProps !== void 0) {
          var f = zt(t) || "Unknown";
          Ip[f] || (h("%s: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.", f), Ip[f] = !0);
        }
        if (typeof t.getDerivedStateFromProps == "function") {
          var v = zt(t) || "Unknown";
          m0[v] || (h("%s: Function components do not support getDerivedStateFromProps.", v), m0[v] = !0);
        }
        if (typeof t.contextType == "object" && t.contextType !== null) {
          var y = zt(t) || "Unknown";
          h0[y] || (h("%s: Function components do not support contextType.", y), h0[y] = !0);
        }
      }
    }
    var R0 = {
      dehydrated: null,
      treeContext: null,
      retryLane: St
    };
    function x0(e) {
      return {
        baseLanes: e,
        cachePool: CD(),
        transitions: null
      };
    }
    function _D(e, t) {
      var a = null;
      return {
        baseLanes: it(e.baseLanes, t),
        cachePool: a,
        transitions: e.transitions
      };
    }
    function ND(e, t, a, i) {
      if (t !== null) {
        var u = t.memoizedState;
        if (u === null)
          return !1;
      }
      return wS(e, _p);
    }
    function zD(e, t) {
      return Xo(e.childLanes, t);
    }
    function $R(e, t, a) {
      var i = t.pendingProps;
      IO(t) && (t.flags |= Pe);
      var u = Ri.current, s = !1, f = (t.flags & Pe) !== je;
      if (f || ND(u, e) ? (s = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (u = Zb(u, qC)), u = Sf(u), qu(t, u), e === null) {
        aS(t);
        var v = t.memoizedState;
        if (v !== null) {
          var y = v.dehydrated;
          if (y !== null)
            return VD(t, y);
        }
        var C = i.children, x = i.fallback;
        if (s) {
          var z = AD(t, C, x, a), _ = t.child;
          return _.memoizedState = x0(a), t.memoizedState = R0, z;
        } else
          return w0(t, C);
      } else {
        var $ = e.memoizedState;
        if ($ !== null) {
          var Q = $.dehydrated;
          if (Q !== null)
            return PD(e, t, f, i, Q, $, a);
        }
        if (s) {
          var q = i.fallback, Ee = i.children, $e = FD(e, t, Ee, q, a), Fe = t.child, yt = e.child.memoizedState;
          return Fe.memoizedState = yt === null ? x0(a) : _D(yt, a), Fe.childLanes = zD(e, a), t.memoizedState = R0, $e;
        } else {
          var ct = i.children, P = UD(e, t, ct, a);
          return t.memoizedState = null, P;
        }
      }
    }
    function w0(e, t, a) {
      var i = e.mode, u = {
        mode: "visible",
        children: t
      }, s = T0(u, i);
      return s.return = e, e.child = s, s;
    }
    function AD(e, t, a, i) {
      var u = e.mode, s = e.child, f = {
        mode: "hidden",
        children: t
      }, v, y;
      return (u & ot) === Be && s !== null ? (v = s, v.childLanes = ae, v.pendingProps = f, e.mode & Ct && (v.actualDuration = 0, v.actualStartTime = -1, v.selfBaseDuration = 0, v.treeBaseDuration = 0), y = io(a, u, i, null)) : (v = T0(f, u), y = io(a, u, i, null)), v.return = e, y.return = e, v.sibling = y, e.child = v, y;
    }
    function T0(e, t, a) {
      return Yx(e, t, ae, null);
    }
    function YR(e, t) {
      return Ls(e, t);
    }
    function UD(e, t, a, i) {
      var u = e.child, s = u.sibling, f = YR(u, {
        mode: "visible",
        children: a
      });
      if ((t.mode & ot) === Be && (f.lanes = i), f.return = t, f.sibling = null, s !== null) {
        var v = t.deletions;
        v === null ? (t.deletions = [s], t.flags |= ra) : v.push(s);
      }
      return t.child = f, f;
    }
    function FD(e, t, a, i, u) {
      var s = t.mode, f = e.child, v = f.sibling, y = {
        mode: "hidden",
        children: a
      }, C;
      if (
        // In legacy mode, we commit the primary tree as if it successfully
        // completed, even though it's in an inconsistent state.
        (s & ot) === Be && // Make sure we're on the second pass, i.e. the primary child fragment was
        // already cloned. In legacy mode, the only case where this isn't true is
        // when DevTools forces us to display a fallback; we skip the first render
        // pass entirely and go straight to rendering the fallback. (In Concurrent
        // Mode, SuspenseList can also trigger this scenario, but this is a legacy-
        // only codepath.)
        t.child !== f
      ) {
        var x = t.child;
        C = x, C.childLanes = ae, C.pendingProps = y, t.mode & Ct && (C.actualDuration = 0, C.actualStartTime = -1, C.selfBaseDuration = f.selfBaseDuration, C.treeBaseDuration = f.treeBaseDuration), t.deletions = null;
      } else
        C = YR(f, y), C.subtreeFlags = f.subtreeFlags & yn;
      var z;
      return v !== null ? z = Ls(v, i) : (z = io(i, s, u, null), z.flags |= un), z.return = t, C.return = t, C.sibling = z, t.child = C, z;
    }
    function Zm(e, t, a, i) {
      i !== null && iS(i), hf(t, e.child, null, a);
      var u = t.pendingProps, s = u.children, f = w0(t, s);
      return f.flags |= un, t.memoizedState = null, f;
    }
    function HD(e, t, a, i, u) {
      var s = t.mode, f = {
        mode: "visible",
        children: a
      }, v = T0(f, s), y = io(i, s, u, null);
      return y.flags |= un, v.return = t, y.return = t, v.sibling = y, t.child = v, (t.mode & ot) !== Be && hf(t, e.child, null, u), y;
    }
    function VD(e, t, a) {
      return (e.mode & ot) === Be ? (h("Cannot hydrate Suspense in legacy mode. Switch from ReactDOM.hydrate(element, container) to ReactDOMClient.hydrateRoot(container, <App />).render(element) or remove the Suspense components from the server rendered components."), e.lanes = qe) : Ig(t) ? e.lanes = Zn : e.lanes = Ir, null;
    }
    function PD(e, t, a, i, u, s, f) {
      if (a)
        if (t.flags & Rr) {
          t.flags &= -257;
          var P = f0(new Error("There was an error while hydrating this Suspense boundary. Switched to client rendering."));
          return Zm(e, t, f, P);
        } else {
          if (t.memoizedState !== null)
            return t.child = e.child, t.flags |= Pe, null;
          var Z = i.children, j = i.fallback, ce = HD(e, t, Z, j, f), be = t.child;
          return be.memoizedState = x0(f), t.memoizedState = R0, ce;
        }
      else {
        if (Db(), (t.mode & ot) === Be)
          return Zm(
            e,
            t,
            f,
            // TODO: When we delete legacy mode, we should make this error argument
            // required — every concurrent mode path that causes hydration to
            // de-opt to client rendering should have an error message.
            null
          );
        if (Ig(u)) {
          var v, y, C;
          {
            var x = $1(u);
            v = x.digest, y = x.message, C = x.stack;
          }
          var z;
          y ? z = new Error(y) : z = new Error("The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering.");
          var _ = f0(z, v, C);
          return Zm(e, t, f, _);
        }
        var $ = kr(f, e.childLanes);
        if (Ti || $) {
          var Q = sy();
          if (Q !== null) {
            var q = Qd(Q, f);
            if (q !== St && q !== s.retryLane) {
              s.retryLane = q;
              var Ee = Vt;
              pa(e, q), Xn(Q, e, q, Ee);
            }
          }
          Q0();
          var $e = f0(new Error("This Suspense boundary received an update before it finished hydrating. This caused the boundary to switch to client rendering. The usual way to fix this is to wrap the original update in startTransition."));
          return Zm(e, t, f, $e);
        } else if (vC(u)) {
          t.flags |= Pe, t.child = e.child;
          var Fe = fO.bind(null, e);
          return Y1(u, Fe), null;
        } else {
          Mb(t, u, s.treeContext);
          var yt = i.children, ct = w0(t, yt);
          return ct.flags |= aa, ct;
        }
      }
    }
    function QR(e, t, a) {
      e.lanes = it(e.lanes, t);
      var i = e.alternate;
      i !== null && (i.lanes = it(i.lanes, t)), hS(e.return, t, a);
    }
    function jD(e, t, a) {
      for (var i = t; i !== null; ) {
        if (i.tag === fe) {
          var u = i.memoizedState;
          u !== null && QR(i, a, e);
        } else if (i.tag === Ae)
          QR(i, a, e);
        else if (i.child !== null) {
          i.child.return = i, i = i.child;
          continue;
        }
        if (i === e)
          return;
        for (; i.sibling === null; ) {
          if (i.return === null || i.return === e)
            return;
          i = i.return;
        }
        i.sibling.return = i.return, i = i.sibling;
      }
    }
    function BD(e) {
      for (var t = e, a = null; t !== null; ) {
        var i = t.alternate;
        i !== null && Mm(i) === null && (a = t), t = t.sibling;
      }
      return a;
    }
    function ID(e) {
      if (e !== void 0 && e !== "forwards" && e !== "backwards" && e !== "together" && !g0[e])
        if (g0[e] = !0, typeof e == "string")
          switch (e.toLowerCase()) {
            case "together":
            case "forwards":
            case "backwards": {
              h('"%s" is not a valid value for revealOrder on <SuspenseList />. Use lowercase "%s" instead.', e, e.toLowerCase());
              break;
            }
            case "forward":
            case "backward": {
              h('"%s" is not a valid value for revealOrder on <SuspenseList />. React uses the -s suffix in the spelling. Use "%ss" instead.', e, e.toLowerCase());
              break;
            }
            default:
              h('"%s" is not a supported revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?', e);
              break;
          }
        else
          h('%s is not a supported value for revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?', e);
    }
    function $D(e, t) {
      e !== void 0 && !qm[e] && (e !== "collapsed" && e !== "hidden" ? (qm[e] = !0, h('"%s" is not a supported value for tail on <SuspenseList />. Did you mean "collapsed" or "hidden"?', e)) : t !== "forwards" && t !== "backwards" && (qm[e] = !0, h('<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?', e)));
    }
    function WR(e, t) {
      {
        var a = Hn(e), i = !a && typeof Ht(e) == "function";
        if (a || i) {
          var u = a ? "array" : "iterable";
          return h("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>", u, t, u), !1;
        }
      }
      return !0;
    }
    function YD(e, t) {
      if ((t === "forwards" || t === "backwards") && e !== void 0 && e !== null && e !== !1)
        if (Hn(e)) {
          for (var a = 0; a < e.length; a++)
            if (!WR(e[a], a))
              return;
        } else {
          var i = Ht(e);
          if (typeof i == "function") {
            var u = i.call(e);
            if (u)
              for (var s = u.next(), f = 0; !s.done; s = u.next()) {
                if (!WR(s.value, f))
                  return;
                f++;
              }
          } else
            h('A single row was passed to a <SuspenseList revealOrder="%s" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?', t);
        }
    }
    function b0(e, t, a, i, u) {
      var s = e.memoizedState;
      s === null ? e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: i,
        tail: a,
        tailMode: u
      } : (s.isBackwards = t, s.rendering = null, s.renderingStartTime = 0, s.last = i, s.tail = a, s.tailMode = u);
    }
    function GR(e, t, a) {
      var i = t.pendingProps, u = i.revealOrder, s = i.tail, f = i.children;
      ID(u), $D(s, u), YD(f, u), Qr(e, t, f, a);
      var v = Ri.current, y = wS(v, _p);
      if (y)
        v = TS(v, _p), t.flags |= Pe;
      else {
        var C = e !== null && (e.flags & Pe) !== je;
        C && jD(t, t.child, a), v = Sf(v);
      }
      if (qu(t, v), (t.mode & ot) === Be)
        t.memoizedState = null;
      else
        switch (u) {
          case "forwards": {
            var x = BD(t.child), z;
            x === null ? (z = t.child, t.child = null) : (z = x.sibling, x.sibling = null), b0(
              t,
              !1,
              // isBackwards
              z,
              x,
              s
            );
            break;
          }
          case "backwards": {
            var _ = null, $ = t.child;
            for (t.child = null; $ !== null; ) {
              var Q = $.alternate;
              if (Q !== null && Mm(Q) === null) {
                t.child = $;
                break;
              }
              var q = $.sibling;
              $.sibling = _, _ = $, $ = q;
            }
            b0(
              t,
              !0,
              // isBackwards
              _,
              null,
              // last
              s
            );
            break;
          }
          case "together": {
            b0(
              t,
              !1,
              // isBackwards
              null,
              // tail
              null,
              // last
              void 0
            );
            break;
          }
          default:
            t.memoizedState = null;
        }
      return t.child;
    }
    function QD(e, t, a) {
      CS(t, t.stateNode.containerInfo);
      var i = t.pendingProps;
      return e === null ? t.child = hf(t, null, i, a) : Qr(e, t, i, a), t.child;
    }
    var KR = !1;
    function WD(e, t, a) {
      var i = t.type, u = i._context, s = t.pendingProps, f = t.memoizedProps, v = s.value;
      {
        "value" in s || KR || (KR = !0, h("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?"));
        var y = t.type.propTypes;
        y && Si(y, s, "prop", "Context.Provider");
      }
      if (jC(t, u, v), f !== null) {
        var C = f.value;
        if (ue(C, v)) {
          if (f.children === s.children && !um())
            return ru(e, t, a);
        } else
          Ib(t, u, a);
      }
      var x = s.children;
      return Qr(e, t, x, a), t.child;
    }
    var XR = !1;
    function GD(e, t, a) {
      var i = t.type;
      i._context === void 0 ? i !== i.Consumer && (XR || (XR = !0, h("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?"))) : i = i._context;
      var u = t.pendingProps, s = u.children;
      typeof s != "function" && h("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."), yf(t, a);
      var f = zn(i);
      jr(t);
      var v;
      return jp.current = t, Fn(!0), v = s(f), Fn(!1), Br(), t.flags |= Ta, Qr(e, t, v, a), t.child;
    }
    function $p() {
      Ti = !0;
    }
    function Jm(e, t) {
      (t.mode & ot) === Be && e !== null && (e.alternate = null, t.alternate = null, t.flags |= un);
    }
    function ru(e, t, a) {
      return e !== null && (t.dependencies = e.dependencies), TR(), nv(t.lanes), kr(a, t.childLanes) ? (jb(e, t), t.child) : null;
    }
    function KD(e, t, a) {
      {
        var i = t.return;
        if (i === null)
          throw new Error("Cannot swap the root fiber.");
        if (e.alternate = null, t.alternate = null, a.index = t.index, a.sibling = t.sibling, a.return = t.return, a.ref = t.ref, t === i.child)
          i.child = a;
        else {
          var u = i.child;
          if (u === null)
            throw new Error("Expected parent to have a child.");
          for (; u.sibling !== t; )
            if (u = u.sibling, u === null)
              throw new Error("Expected to find the previous sibling.");
          u.sibling = a;
        }
        var s = i.deletions;
        return s === null ? (i.deletions = [e], i.flags |= ra) : s.push(e), a.flags |= un, a;
      }
    }
    function D0(e, t) {
      var a = e.lanes;
      return !!kr(a, t);
    }
    function XD(e, t, a) {
      switch (t.tag) {
        case M:
          BR(t), t.stateNode, vf();
          break;
        case D:
          KC(t);
          break;
        case k: {
          var i = t.type;
          al(i) && sm(t);
          break;
        }
        case A:
          CS(t, t.stateNode.containerInfo);
          break;
        case re: {
          var u = t.memoizedProps.value, s = t.type._context;
          jC(t, s, u);
          break;
        }
        case pe:
          {
            var f = kr(a, t.childLanes);
            f && (t.flags |= vt);
            {
              var v = t.stateNode;
              v.effectDuration = 0, v.passiveEffectDuration = 0;
            }
          }
          break;
        case fe: {
          var y = t.memoizedState;
          if (y !== null) {
            if (y.dehydrated !== null)
              return qu(t, Sf(Ri.current)), t.flags |= Pe, null;
            var C = t.child, x = C.childLanes;
            if (kr(a, x))
              return $R(e, t, a);
            qu(t, Sf(Ri.current));
            var z = ru(e, t, a);
            return z !== null ? z.sibling : null;
          } else
            qu(t, Sf(Ri.current));
          break;
        }
        case Ae: {
          var _ = (e.flags & Pe) !== je, $ = kr(a, t.childLanes);
          if (_) {
            if ($)
              return GR(e, t, a);
            t.flags |= Pe;
          }
          var Q = t.memoizedState;
          if (Q !== null && (Q.rendering = null, Q.tail = null, Q.lastEffect = null), qu(t, Ri.current), $)
            break;
          return null;
        }
        case te:
        case He:
          return t.lanes = ae, VR(e, t, a);
      }
      return ru(e, t, a);
    }
    function qR(e, t, a) {
      if (t._debugNeedsRemount && e !== null)
        return KD(e, t, rE(t.type, t.key, t.pendingProps, t._debugOwner || null, t.mode, t.lanes));
      if (e !== null) {
        var i = e.memoizedProps, u = t.pendingProps;
        if (i !== u || um() || // Force a re-render if the implementation changed due to hot reload:
        t.type !== e.type)
          Ti = !0;
        else {
          var s = D0(e, a);
          if (!s && // If this is the second pass of an error or suspense boundary, there
          // may not be work scheduled on `current`, so we check for this flag.
          (t.flags & Pe) === je)
            return Ti = !1, XD(e, t, a);
          (e.flags & dc) !== je ? Ti = !0 : Ti = !1;
        }
      } else if (Ti = !1, or() && Cb(t)) {
        var f = t.index, v = Rb();
        TC(t, v, f);
      }
      switch (t.lanes = ae, t.tag) {
        case U:
          return LD(e, t, t.type, a);
        case We: {
          var y = t.elementType;
          return OD(e, t, y, a);
        }
        case L: {
          var C = t.type, x = t.pendingProps, z = t.elementType === C ? x : wi(C, x);
          return S0(e, t, C, z, a);
        }
        case k: {
          var _ = t.type, $ = t.pendingProps, Q = t.elementType === _ ? $ : wi(_, $);
          return jR(e, t, _, Q, a);
        }
        case M:
          return bD(e, t, a);
        case D:
          return DD(e, t, a);
        case F:
          return kD(e, t);
        case fe:
          return $R(e, t, a);
        case A:
          return QD(e, t, a);
        case K: {
          var q = t.type, Ee = t.pendingProps, $e = t.elementType === q ? Ee : wi(q, Ee);
          return UR(e, t, q, $e, a);
        }
        case H:
          return xD(e, t, a);
        case ne:
          return wD(e, t, a);
        case pe:
          return TD(e, t, a);
        case re:
          return WD(e, t, a);
        case J:
          return GD(e, t, a);
        case ke: {
          var Fe = t.type, yt = t.pendingProps, ct = wi(Fe, yt);
          if (t.type !== t.elementType) {
            var P = Fe.propTypes;
            P && Si(
              P,
              ct,
              // Resolved for outer only
              "prop",
              zt(Fe)
            );
          }
          return ct = wi(Fe.type, ct), FR(e, t, Fe, ct, a);
        }
        case ve:
          return HR(e, t, t.type, t.pendingProps, a);
        case Oe: {
          var Z = t.type, j = t.pendingProps, ce = t.elementType === Z ? j : wi(Z, j);
          return MD(e, t, Z, ce, a);
        }
        case Ae:
          return GR(e, t, a);
        case de:
          break;
        case te:
          return VR(e, t, a);
      }
      throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
    }
    function Tf(e) {
      e.flags |= vt;
    }
    function ZR(e) {
      e.flags |= rn, e.flags |= Mu;
    }
    var JR, k0, ex, tx;
    JR = function(e, t, a, i) {
      for (var u = t.child; u !== null; ) {
        if (u.tag === D || u.tag === F)
          g1(e, u.stateNode);
        else if (u.tag !== A) {
          if (u.child !== null) {
            u.child.return = u, u = u.child;
            continue;
          }
        }
        if (u === t)
          return;
        for (; u.sibling === null; ) {
          if (u.return === null || u.return === t)
            return;
          u = u.return;
        }
        u.sibling.return = u.return, u = u.sibling;
      }
    }, k0 = function(e, t) {
    }, ex = function(e, t, a, i, u) {
      var s = e.memoizedProps;
      if (s !== i) {
        var f = t.stateNode, v = RS(), y = E1(f, a, s, i, u, v);
        t.updateQueue = y, y && Tf(t);
      }
    }, tx = function(e, t, a, i) {
      a !== i && Tf(t);
    };
    function Yp(e, t) {
      if (!or())
        switch (e.tailMode) {
          case "hidden": {
            for (var a = e.tail, i = null; a !== null; )
              a.alternate !== null && (i = a), a = a.sibling;
            i === null ? e.tail = null : i.sibling = null;
            break;
          }
          case "collapsed": {
            for (var u = e.tail, s = null; u !== null; )
              u.alternate !== null && (s = u), u = u.sibling;
            s === null ? !t && e.tail !== null ? e.tail.sibling = null : e.tail = null : s.sibling = null;
            break;
          }
        }
    }
    function cr(e) {
      var t = e.alternate !== null && e.alternate.child === e.child, a = ae, i = je;
      if (t) {
        if ((e.mode & Ct) !== Be) {
          for (var y = e.selfBaseDuration, C = e.child; C !== null; )
            a = it(a, it(C.lanes, C.childLanes)), i |= C.subtreeFlags & yn, i |= C.flags & yn, y += C.treeBaseDuration, C = C.sibling;
          e.treeBaseDuration = y;
        } else
          for (var x = e.child; x !== null; )
            a = it(a, it(x.lanes, x.childLanes)), i |= x.subtreeFlags & yn, i |= x.flags & yn, x.return = e, x = x.sibling;
        e.subtreeFlags |= i;
      } else {
        if ((e.mode & Ct) !== Be) {
          for (var u = e.actualDuration, s = e.selfBaseDuration, f = e.child; f !== null; )
            a = it(a, it(f.lanes, f.childLanes)), i |= f.subtreeFlags, i |= f.flags, u += f.actualDuration, s += f.treeBaseDuration, f = f.sibling;
          e.actualDuration = u, e.treeBaseDuration = s;
        } else
          for (var v = e.child; v !== null; )
            a = it(a, it(v.lanes, v.childLanes)), i |= v.subtreeFlags, i |= v.flags, v.return = e, v = v.sibling;
        e.subtreeFlags |= i;
      }
      return e.childLanes = a, t;
    }
    function qD(e, t, a) {
      if (Ab() && (t.mode & ot) !== Be && (t.flags & Pe) === je)
        return _C(t), vf(), t.flags |= Rr | zo | wr, !1;
      var i = vm(t);
      if (a !== null && a.dehydrated !== null)
        if (e === null) {
          if (!i)
            throw new Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
          if (Nb(t), cr(t), (t.mode & Ct) !== Be) {
            var u = a !== null;
            if (u) {
              var s = t.child;
              s !== null && (t.treeBaseDuration -= s.treeBaseDuration);
            }
          }
          return !1;
        } else {
          if (vf(), (t.flags & Pe) === je && (t.memoizedState = null), t.flags |= vt, cr(t), (t.mode & Ct) !== Be) {
            var f = a !== null;
            if (f) {
              var v = t.child;
              v !== null && (t.treeBaseDuration -= v.treeBaseDuration);
            }
          }
          return !1;
        }
      else
        return NC(), !0;
    }
    function nx(e, t, a) {
      var i = t.pendingProps;
      switch (eS(t), t.tag) {
        case U:
        case We:
        case ve:
        case L:
        case K:
        case H:
        case ne:
        case pe:
        case J:
        case ke:
          return cr(t), null;
        case k: {
          var u = t.type;
          return al(u) && om(t), cr(t), null;
        }
        case M: {
          var s = t.stateNode;
          if (gf(t), Xg(t), DS(), s.pendingContext && (s.context = s.pendingContext, s.pendingContext = null), e === null || e.child === null) {
            var f = vm(t);
            if (f)
              Tf(t);
            else if (e !== null) {
              var v = e.memoizedState;
              // Check if this is a client root
              (!v.isDehydrated || // Check if we reverted to client rendering (e.g. due to an error)
              (t.flags & Rr) !== je) && (t.flags |= bn, NC());
            }
          }
          return k0(e, t), cr(t), null;
        }
        case D: {
          xS(t);
          var y = GC(), C = t.type;
          if (e !== null && t.stateNode != null)
            ex(e, t, C, i, y), e.ref !== t.ref && ZR(t);
          else {
            if (!i) {
              if (t.stateNode === null)
                throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
              return cr(t), null;
            }
            var x = RS(), z = vm(t);
            if (z)
              Lb(t, y, x) && Tf(t);
            else {
              var _ = y1(C, i, y, x, t);
              JR(_, t, !1, !1), t.stateNode = _, S1(_, C, i, y) && Tf(t);
            }
            t.ref !== null && ZR(t);
          }
          return cr(t), null;
        }
        case F: {
          var $ = i;
          if (e && t.stateNode != null) {
            var Q = e.memoizedProps;
            tx(e, t, Q, $);
          } else {
            if (typeof $ != "string" && t.stateNode === null)
              throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
            var q = GC(), Ee = RS(), $e = vm(t);
            $e ? _b(t) && Tf(t) : t.stateNode = C1($, q, Ee, t);
          }
          return cr(t), null;
        }
        case fe: {
          Ef(t);
          var Fe = t.memoizedState;
          if (e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
            var yt = qD(e, t, Fe);
            if (!yt)
              return t.flags & wr ? t : null;
          }
          if ((t.flags & Pe) !== je)
            return t.lanes = a, (t.mode & Ct) !== Be && ZS(t), t;
          var ct = Fe !== null, P = e !== null && e.memoizedState !== null;
          if (ct !== P && ct) {
            var Z = t.child;
            if (Z.flags |= mn, (t.mode & ot) !== Be) {
              var j = e === null && (t.memoizedProps.unstable_avoidThisFallback !== !0 || !0);
              j || wS(Ri.current, qC) ? Zk() : Q0();
            }
          }
          var ce = t.updateQueue;
          if (ce !== null && (t.flags |= vt), cr(t), (t.mode & Ct) !== Be && ct) {
            var be = t.child;
            be !== null && (t.treeBaseDuration -= be.treeBaseDuration);
          }
          return null;
        }
        case A:
          return gf(t), k0(e, t), e === null && vb(t.stateNode.containerInfo), cr(t), null;
        case re:
          var xe = t.type._context;
          return vS(xe, t), cr(t), null;
        case Oe: {
          var Ze = t.type;
          return al(Ze) && om(t), cr(t), null;
        }
        case Ae: {
          Ef(t);
          var nt = t.memoizedState;
          if (nt === null)
            return cr(t), null;
          var Ft = (t.flags & Pe) !== je, wt = nt.rendering;
          if (wt === null)
            if (Ft)
              Yp(nt, !1);
            else {
              var On = eO() && (e === null || (e.flags & Pe) === je);
              if (!On)
                for (var Tt = t.child; Tt !== null; ) {
                  var xn = Mm(Tt);
                  if (xn !== null) {
                    Ft = !0, t.flags |= Pe, Yp(nt, !1);
                    var Ar = xn.updateQueue;
                    return Ar !== null && (t.updateQueue = Ar, t.flags |= vt), t.subtreeFlags = je, Bb(t, a), qu(t, TS(Ri.current, _p)), t.child;
                  }
                  Tt = Tt.sibling;
                }
              nt.tail !== null && Dn() > xx() && (t.flags |= Pe, Ft = !0, Yp(nt, !1), t.lanes = Fd);
            }
          else {
            if (!Ft) {
              var hr = Mm(wt);
              if (hr !== null) {
                t.flags |= Pe, Ft = !0;
                var Na = hr.updateQueue;
                if (Na !== null && (t.updateQueue = Na, t.flags |= vt), Yp(nt, !0), nt.tail === null && nt.tailMode === "hidden" && !wt.alternate && !or())
                  return cr(t), null;
              } else // The time it took to render last row is greater than the remaining
              // time we have to render. So rendering one more row would likely
              // exceed it.
              Dn() * 2 - nt.renderingStartTime > xx() && a !== Ir && (t.flags |= Pe, Ft = !0, Yp(nt, !1), t.lanes = Fd);
            }
            if (nt.isBackwards)
              wt.sibling = t.child, t.child = wt;
            else {
              var Kr = nt.last;
              Kr !== null ? Kr.sibling = wt : t.child = wt, nt.last = wt;
            }
          }
          if (nt.tail !== null) {
            var Xr = nt.tail;
            nt.rendering = Xr, nt.tail = Xr.sibling, nt.renderingStartTime = Dn(), Xr.sibling = null;
            var Ur = Ri.current;
            return Ft ? Ur = TS(Ur, _p) : Ur = Sf(Ur), qu(t, Ur), Xr;
          }
          return cr(t), null;
        }
        case de:
          break;
        case te:
        case He: {
          Y0(t);
          var ou = t.memoizedState, Nf = ou !== null;
          if (e !== null) {
            var uv = e.memoizedState, dl = uv !== null;
            dl !== Nf && (t.flags |= mn);
          }
          return !Nf || (t.mode & ot) === Be ? cr(t) : kr(fl, Ir) && (cr(t), t.subtreeFlags & (un | vt) && (t.flags |= mn)), null;
        }
        case Ce:
          return null;
        case oe:
          return null;
      }
      throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
    }
    function ZD(e, t, a) {
      switch (eS(t), t.tag) {
        case k: {
          var i = t.type;
          al(i) && om(t);
          var u = t.flags;
          return u & wr ? (t.flags = u & -65537 | Pe, (t.mode & Ct) !== Be && ZS(t), t) : null;
        }
        case M: {
          t.stateNode, gf(t), Xg(t), DS();
          var s = t.flags;
          return (s & wr) !== je && (s & Pe) === je ? (t.flags = s & -65537 | Pe, t) : null;
        }
        case D:
          return xS(t), null;
        case fe: {
          Ef(t);
          var f = t.memoizedState;
          if (f !== null && f.dehydrated !== null) {
            if (t.alternate === null)
              throw new Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
            vf();
          }
          var v = t.flags;
          return v & wr ? (t.flags = v & -65537 | Pe, (t.mode & Ct) !== Be && ZS(t), t) : null;
        }
        case Ae:
          return Ef(t), null;
        case A:
          return gf(t), null;
        case re:
          var y = t.type._context;
          return vS(y, t), null;
        case te:
        case He:
          return Y0(t), null;
        case Ce:
          return null;
        default:
          return null;
      }
    }
    function rx(e, t, a) {
      switch (eS(t), t.tag) {
        case k: {
          var i = t.type.childContextTypes;
          i != null && om(t);
          break;
        }
        case M: {
          t.stateNode, gf(t), Xg(t), DS();
          break;
        }
        case D: {
          xS(t);
          break;
        }
        case A:
          gf(t);
          break;
        case fe:
          Ef(t);
          break;
        case Ae:
          Ef(t);
          break;
        case re:
          var u = t.type._context;
          vS(u, t);
          break;
        case te:
        case He:
          Y0(t);
          break;
      }
    }
    var ax = null;
    ax = /* @__PURE__ */ new Set();
    var ey = !1, fr = !1, JD = typeof WeakSet == "function" ? WeakSet : Set, Ne = null, bf = null, Df = null;
    function ek(e) {
      Pi(null, function() {
        throw e;
      }), No();
    }
    var tk = function(e, t) {
      if (t.props = e.memoizedProps, t.state = e.memoizedState, e.mode & Ct)
        try {
          sl(), t.componentWillUnmount();
        } finally {
          ol(e);
        }
      else
        t.componentWillUnmount();
    };
    function ix(e, t) {
      try {
        eo($n, e);
      } catch (a) {
        Qt(e, t, a);
      }
    }
    function O0(e, t, a) {
      try {
        tk(e, a);
      } catch (i) {
        Qt(e, t, i);
      }
    }
    function nk(e, t, a) {
      try {
        a.componentDidMount();
      } catch (i) {
        Qt(e, t, i);
      }
    }
    function lx(e, t) {
      try {
        ox(e);
      } catch (a) {
        Qt(e, t, a);
      }
    }
    function kf(e, t) {
      var a = e.ref;
      if (a !== null)
        if (typeof a == "function") {
          var i;
          try {
            if (Mt && gr && e.mode & Ct)
              try {
                sl(), i = a(null);
              } finally {
                ol(e);
              }
            else
              i = a(null);
          } catch (u) {
            Qt(e, t, u);
          }
          typeof i == "function" && h("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", at(e));
        } else
          a.current = null;
    }
    function ty(e, t, a) {
      try {
        a();
      } catch (i) {
        Qt(e, t, i);
      }
    }
    var ux = !1;
    function rk(e, t) {
      h1(e.containerInfo), Ne = t, ak();
      var a = ux;
      return ux = !1, a;
    }
    function ak() {
      for (; Ne !== null; ) {
        var e = Ne, t = e.child;
        (e.subtreeFlags & Bi) !== je && t !== null ? (t.return = e, Ne = t) : ik();
      }
    }
    function ik() {
      for (; Ne !== null; ) {
        var e = Ne;
        Yt(e);
        try {
          lk(e);
        } catch (a) {
          Qt(e, e.return, a);
        }
        nn();
        var t = e.sibling;
        if (t !== null) {
          t.return = e.return, Ne = t;
          return;
        }
        Ne = e.return;
      }
    }
    function lk(e) {
      var t = e.alternate, a = e.flags;
      if ((a & bn) !== je) {
        switch (Yt(e), e.tag) {
          case L:
          case K:
          case ve:
            break;
          case k: {
            if (t !== null) {
              var i = t.memoizedProps, u = t.memoizedState, s = e.stateNode;
              e.type === e.elementType && !bs && (s.props !== e.memoizedProps && h("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", at(e) || "instance"), s.state !== e.memoizedState && h("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", at(e) || "instance"));
              var f = s.getSnapshotBeforeUpdate(e.elementType === e.type ? i : wi(e.type, i), u);
              {
                var v = ax;
                f === void 0 && !v.has(e.type) && (v.add(e.type), h("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.", at(e)));
              }
              s.__reactInternalSnapshotBeforeUpdate = f;
            }
            break;
          }
          case M: {
            {
              var y = e.stateNode;
              P1(y.containerInfo);
            }
            break;
          }
          case D:
          case F:
          case A:
          case Oe:
            break;
          default:
            throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
        }
        nn();
      }
    }
    function bi(e, t, a) {
      var i = t.updateQueue, u = i !== null ? i.lastEffect : null;
      if (u !== null) {
        var s = u.next, f = s;
        do {
          if ((f.tag & e) === e) {
            var v = f.destroy;
            f.destroy = void 0, v !== void 0 && ((e & sr) !== va ? pi(t) : (e & $n) !== va && Uo(t), (e & il) !== va && av(!0), ty(t, a, v), (e & il) !== va && av(!1), (e & sr) !== va ? Qi() : (e & $n) !== va && Ad());
          }
          f = f.next;
        } while (f !== s);
      }
    }
    function eo(e, t) {
      var a = t.updateQueue, i = a !== null ? a.lastEffect : null;
      if (i !== null) {
        var u = i.next, s = u;
        do {
          if ((s.tag & e) === e) {
            (e & sr) !== va ? zd(t) : (e & $n) !== va && gc(t);
            var f = s.create;
            (e & il) !== va && av(!0), s.destroy = f(), (e & il) !== va && av(!1), (e & sr) !== va ? lh() : (e & $n) !== va && uh();
            {
              var v = s.destroy;
              if (v !== void 0 && typeof v != "function") {
                var y = void 0;
                (s.tag & $n) !== je ? y = "useLayoutEffect" : (s.tag & il) !== je ? y = "useInsertionEffect" : y = "useEffect";
                var C = void 0;
                v === null ? C = " You returned null. If your effect does not require clean up, return undefined (or nothing)." : typeof v.then == "function" ? C = `

It looks like you wrote ` + y + `(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:

` + y + `(() => {
  async function fetchData() {
    // You can await here
    const response = await MyAPI.getData(someId);
    // ...
  }
  fetchData();
}, [someId]); // Or [] if effect doesn't need props or state

Learn more about data fetching with Hooks: https://reactjs.org/link/hooks-data-fetching` : C = " You returned: " + v, h("%s must not return anything besides a function, which is used for clean-up.%s", y, C);
              }
            }
          }
          s = s.next;
        } while (s !== u);
      }
    }
    function uk(e, t) {
      if ((t.flags & vt) !== je)
        switch (t.tag) {
          case pe: {
            var a = t.stateNode.passiveEffectDuration, i = t.memoizedProps, u = i.id, s = i.onPostCommit, f = xR(), v = t.alternate === null ? "mount" : "update";
            RR() && (v = "nested-update"), typeof s == "function" && s(u, v, a, f);
            var y = t.return;
            e: for (; y !== null; ) {
              switch (y.tag) {
                case M:
                  var C = y.stateNode;
                  C.passiveEffectDuration += a;
                  break e;
                case pe:
                  var x = y.stateNode;
                  x.passiveEffectDuration += a;
                  break e;
              }
              y = y.return;
            }
            break;
          }
        }
    }
    function ok(e, t, a, i) {
      if ((a.flags & $i) !== je)
        switch (a.tag) {
          case L:
          case K:
          case ve: {
            if (!fr)
              if (a.mode & Ct)
                try {
                  sl(), eo($n | In, a);
                } finally {
                  ol(a);
                }
              else
                eo($n | In, a);
            break;
          }
          case k: {
            var u = a.stateNode;
            if (a.flags & vt && !fr)
              if (t === null)
                if (a.type === a.elementType && !bs && (u.props !== a.memoizedProps && h("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", at(a) || "instance"), u.state !== a.memoizedState && h("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", at(a) || "instance")), a.mode & Ct)
                  try {
                    sl(), u.componentDidMount();
                  } finally {
                    ol(a);
                  }
                else
                  u.componentDidMount();
              else {
                var s = a.elementType === a.type ? t.memoizedProps : wi(a.type, t.memoizedProps), f = t.memoizedState;
                if (a.type === a.elementType && !bs && (u.props !== a.memoizedProps && h("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", at(a) || "instance"), u.state !== a.memoizedState && h("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", at(a) || "instance")), a.mode & Ct)
                  try {
                    sl(), u.componentDidUpdate(s, f, u.__reactInternalSnapshotBeforeUpdate);
                  } finally {
                    ol(a);
                  }
                else
                  u.componentDidUpdate(s, f, u.__reactInternalSnapshotBeforeUpdate);
              }
            var v = a.updateQueue;
            v !== null && (a.type === a.elementType && !bs && (u.props !== a.memoizedProps && h("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", at(a) || "instance"), u.state !== a.memoizedState && h("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", at(a) || "instance")), WC(a, v, u));
            break;
          }
          case M: {
            var y = a.updateQueue;
            if (y !== null) {
              var C = null;
              if (a.child !== null)
                switch (a.child.tag) {
                  case D:
                    C = a.child.stateNode;
                    break;
                  case k:
                    C = a.child.stateNode;
                    break;
                }
              WC(a, y, C);
            }
            break;
          }
          case D: {
            var x = a.stateNode;
            if (t === null && a.flags & vt) {
              var z = a.type, _ = a.memoizedProps;
              b1(x, z, _);
            }
            break;
          }
          case F:
            break;
          case A:
            break;
          case pe: {
            {
              var $ = a.memoizedProps, Q = $.onCommit, q = $.onRender, Ee = a.stateNode.effectDuration, $e = xR(), Fe = t === null ? "mount" : "update";
              RR() && (Fe = "nested-update"), typeof q == "function" && q(a.memoizedProps.id, Fe, a.actualDuration, a.treeBaseDuration, a.actualStartTime, $e);
              {
                typeof Q == "function" && Q(a.memoizedProps.id, Fe, Ee, $e), iO(a);
                var yt = a.return;
                e: for (; yt !== null; ) {
                  switch (yt.tag) {
                    case M:
                      var ct = yt.stateNode;
                      ct.effectDuration += Ee;
                      break e;
                    case pe:
                      var P = yt.stateNode;
                      P.effectDuration += Ee;
                      break e;
                  }
                  yt = yt.return;
                }
              }
            }
            break;
          }
          case fe: {
            mk(e, a);
            break;
          }
          case Ae:
          case Oe:
          case de:
          case te:
          case He:
          case oe:
            break;
          default:
            throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
        }
      fr || a.flags & rn && ox(a);
    }
    function sk(e) {
      switch (e.tag) {
        case L:
        case K:
        case ve: {
          if (e.mode & Ct)
            try {
              sl(), ix(e, e.return);
            } finally {
              ol(e);
            }
          else
            ix(e, e.return);
          break;
        }
        case k: {
          var t = e.stateNode;
          typeof t.componentDidMount == "function" && nk(e, e.return, t), lx(e, e.return);
          break;
        }
        case D: {
          lx(e, e.return);
          break;
        }
      }
    }
    function ck(e, t) {
      for (var a = null, i = e; ; ) {
        if (i.tag === D) {
          if (a === null) {
            a = i;
            try {
              var u = i.stateNode;
              t ? U1(u) : H1(i.stateNode, i.memoizedProps);
            } catch (f) {
              Qt(e, e.return, f);
            }
          }
        } else if (i.tag === F) {
          if (a === null)
            try {
              var s = i.stateNode;
              t ? F1(s) : V1(s, i.memoizedProps);
            } catch (f) {
              Qt(e, e.return, f);
            }
        } else if (!((i.tag === te || i.tag === He) && i.memoizedState !== null && i !== e)) {
          if (i.child !== null) {
            i.child.return = i, i = i.child;
            continue;
          }
        }
        if (i === e)
          return;
        for (; i.sibling === null; ) {
          if (i.return === null || i.return === e)
            return;
          a === i && (a = null), i = i.return;
        }
        a === i && (a = null), i.sibling.return = i.return, i = i.sibling;
      }
    }
    function ox(e) {
      var t = e.ref;
      if (t !== null) {
        var a = e.stateNode, i;
        switch (e.tag) {
          case D:
            i = a;
            break;
          default:
            i = a;
        }
        if (typeof t == "function") {
          var u;
          if (e.mode & Ct)
            try {
              sl(), u = t(i);
            } finally {
              ol(e);
            }
          else
            u = t(i);
          typeof u == "function" && h("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", at(e));
        } else
          t.hasOwnProperty("current") || h("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().", at(e)), t.current = i;
      }
    }
    function fk(e) {
      var t = e.alternate;
      t !== null && (t.return = null), e.return = null;
    }
    function sx(e) {
      var t = e.alternate;
      t !== null && (e.alternate = null, sx(t));
      {
        if (e.child = null, e.deletions = null, e.sibling = null, e.tag === D) {
          var a = e.stateNode;
          a !== null && yb(a);
        }
        e.stateNode = null, e._debugOwner = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
      }
    }
    function dk(e) {
      for (var t = e.return; t !== null; ) {
        if (cx(t))
          return t;
        t = t.return;
      }
      throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
    }
    function cx(e) {
      return e.tag === D || e.tag === M || e.tag === A;
    }
    function fx(e) {
      var t = e;
      e: for (; ; ) {
        for (; t.sibling === null; ) {
          if (t.return === null || cx(t.return))
            return null;
          t = t.return;
        }
        for (t.sibling.return = t.return, t = t.sibling; t.tag !== D && t.tag !== F && t.tag !== Ye; ) {
          if (t.flags & un || t.child === null || t.tag === A)
            continue e;
          t.child.return = t, t = t.child;
        }
        if (!(t.flags & un))
          return t.stateNode;
      }
    }
    function pk(e) {
      var t = dk(e);
      switch (t.tag) {
        case D: {
          var a = t.stateNode;
          t.flags & ba && (pC(a), t.flags &= -33);
          var i = fx(e);
          L0(e, i, a);
          break;
        }
        case M:
        case A: {
          var u = t.stateNode.containerInfo, s = fx(e);
          M0(e, s, u);
          break;
        }
        // eslint-disable-next-line-no-fallthrough
        default:
          throw new Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.");
      }
    }
    function M0(e, t, a) {
      var i = e.tag, u = i === D || i === F;
      if (u) {
        var s = e.stateNode;
        t ? _1(a, s, t) : M1(a, s);
      } else if (i !== A) {
        var f = e.child;
        if (f !== null) {
          M0(f, t, a);
          for (var v = f.sibling; v !== null; )
            M0(v, t, a), v = v.sibling;
        }
      }
    }
    function L0(e, t, a) {
      var i = e.tag, u = i === D || i === F;
      if (u) {
        var s = e.stateNode;
        t ? L1(a, s, t) : O1(a, s);
      } else if (i !== A) {
        var f = e.child;
        if (f !== null) {
          L0(f, t, a);
          for (var v = f.sibling; v !== null; )
            L0(v, t, a), v = v.sibling;
        }
      }
    }
    var dr = null, Di = !1;
    function vk(e, t, a) {
      {
        var i = t;
        e: for (; i !== null; ) {
          switch (i.tag) {
            case D: {
              dr = i.stateNode, Di = !1;
              break e;
            }
            case M: {
              dr = i.stateNode.containerInfo, Di = !0;
              break e;
            }
            case A: {
              dr = i.stateNode.containerInfo, Di = !0;
              break e;
            }
          }
          i = i.return;
        }
        if (dr === null)
          throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
        dx(e, t, a), dr = null, Di = !1;
      }
      fk(a);
    }
    function to(e, t, a) {
      for (var i = a.child; i !== null; )
        dx(e, t, i), i = i.sibling;
    }
    function dx(e, t, a) {
      switch (Ld(a), a.tag) {
        case D:
          fr || kf(a, t);
        // eslint-disable-next-line-no-fallthrough
        case F: {
          {
            var i = dr, u = Di;
            dr = null, to(e, t, a), dr = i, Di = u, dr !== null && (Di ? z1(dr, a.stateNode) : N1(dr, a.stateNode));
          }
          return;
        }
        case Ye: {
          dr !== null && (Di ? A1(dr, a.stateNode) : Bg(dr, a.stateNode));
          return;
        }
        case A: {
          {
            var s = dr, f = Di;
            dr = a.stateNode.containerInfo, Di = !0, to(e, t, a), dr = s, Di = f;
          }
          return;
        }
        case L:
        case K:
        case ke:
        case ve: {
          if (!fr) {
            var v = a.updateQueue;
            if (v !== null) {
              var y = v.lastEffect;
              if (y !== null) {
                var C = y.next, x = C;
                do {
                  var z = x, _ = z.destroy, $ = z.tag;
                  _ !== void 0 && (($ & il) !== va ? ty(a, t, _) : ($ & $n) !== va && (Uo(a), a.mode & Ct ? (sl(), ty(a, t, _), ol(a)) : ty(a, t, _), Ad())), x = x.next;
                } while (x !== C);
              }
            }
          }
          to(e, t, a);
          return;
        }
        case k: {
          if (!fr) {
            kf(a, t);
            var Q = a.stateNode;
            typeof Q.componentWillUnmount == "function" && O0(a, t, Q);
          }
          to(e, t, a);
          return;
        }
        case de: {
          to(e, t, a);
          return;
        }
        case te: {
          if (
            // TODO: Remove this dead flag
            a.mode & ot
          ) {
            var q = fr;
            fr = q || a.memoizedState !== null, to(e, t, a), fr = q;
          } else
            to(e, t, a);
          break;
        }
        default: {
          to(e, t, a);
          return;
        }
      }
    }
    function hk(e) {
      e.memoizedState;
    }
    function mk(e, t) {
      var a = t.memoizedState;
      if (a === null) {
        var i = t.alternate;
        if (i !== null) {
          var u = i.memoizedState;
          if (u !== null) {
            var s = u.dehydrated;
            s !== null && eb(s);
          }
        }
      }
    }
    function px(e) {
      var t = e.updateQueue;
      if (t !== null) {
        e.updateQueue = null;
        var a = e.stateNode;
        a === null && (a = e.stateNode = new JD()), t.forEach(function(i) {
          var u = dO.bind(null, e, i);
          if (!a.has(i)) {
            if (a.add(i), Dr)
              if (bf !== null && Df !== null)
                rv(Df, bf);
              else
                throw Error("Expected finished root and lanes to be set. This is a bug in React.");
            i.then(u, u);
          }
        });
      }
    }
    function yk(e, t, a) {
      bf = a, Df = e, Yt(t), vx(t, e), Yt(t), bf = null, Df = null;
    }
    function ki(e, t, a) {
      var i = t.deletions;
      if (i !== null)
        for (var u = 0; u < i.length; u++) {
          var s = i[u];
          try {
            vk(e, t, s);
          } catch (y) {
            Qt(s, t, y);
          }
        }
      var f = yo();
      if (t.subtreeFlags & Ii)
        for (var v = t.child; v !== null; )
          Yt(v), vx(v, e), v = v.sibling;
      Yt(f);
    }
    function vx(e, t, a) {
      var i = e.alternate, u = e.flags;
      switch (e.tag) {
        case L:
        case K:
        case ke:
        case ve: {
          if (ki(t, e), cl(e), u & vt) {
            try {
              bi(il | In, e, e.return), eo(il | In, e);
            } catch (Ze) {
              Qt(e, e.return, Ze);
            }
            if (e.mode & Ct) {
              try {
                sl(), bi($n | In, e, e.return);
              } catch (Ze) {
                Qt(e, e.return, Ze);
              }
              ol(e);
            } else
              try {
                bi($n | In, e, e.return);
              } catch (Ze) {
                Qt(e, e.return, Ze);
              }
          }
          return;
        }
        case k: {
          ki(t, e), cl(e), u & rn && i !== null && kf(i, i.return);
          return;
        }
        case D: {
          ki(t, e), cl(e), u & rn && i !== null && kf(i, i.return);
          {
            if (e.flags & ba) {
              var s = e.stateNode;
              try {
                pC(s);
              } catch (Ze) {
                Qt(e, e.return, Ze);
              }
            }
            if (u & vt) {
              var f = e.stateNode;
              if (f != null) {
                var v = e.memoizedProps, y = i !== null ? i.memoizedProps : v, C = e.type, x = e.updateQueue;
                if (e.updateQueue = null, x !== null)
                  try {
                    D1(f, x, C, y, v, e);
                  } catch (Ze) {
                    Qt(e, e.return, Ze);
                  }
              }
            }
          }
          return;
        }
        case F: {
          if (ki(t, e), cl(e), u & vt) {
            if (e.stateNode === null)
              throw new Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");
            var z = e.stateNode, _ = e.memoizedProps, $ = i !== null ? i.memoizedProps : _;
            try {
              k1(z, $, _);
            } catch (Ze) {
              Qt(e, e.return, Ze);
            }
          }
          return;
        }
        case M: {
          if (ki(t, e), cl(e), u & vt && i !== null) {
            var Q = i.memoizedState;
            if (Q.isDehydrated)
              try {
                J1(t.containerInfo);
              } catch (Ze) {
                Qt(e, e.return, Ze);
              }
          }
          return;
        }
        case A: {
          ki(t, e), cl(e);
          return;
        }
        case fe: {
          ki(t, e), cl(e);
          var q = e.child;
          if (q.flags & mn) {
            var Ee = q.stateNode, $e = q.memoizedState, Fe = $e !== null;
            if (Ee.isHidden = Fe, Fe) {
              var yt = q.alternate !== null && q.alternate.memoizedState !== null;
              yt || qk();
            }
          }
          if (u & vt) {
            try {
              hk(e);
            } catch (Ze) {
              Qt(e, e.return, Ze);
            }
            px(e);
          }
          return;
        }
        case te: {
          var ct = i !== null && i.memoizedState !== null;
          if (
            // TODO: Remove this dead flag
            e.mode & ot
          ) {
            var P = fr;
            fr = P || ct, ki(t, e), fr = P;
          } else
            ki(t, e);
          if (cl(e), u & mn) {
            var Z = e.stateNode, j = e.memoizedState, ce = j !== null, be = e;
            if (Z.isHidden = ce, ce && !ct && (be.mode & ot) !== Be) {
              Ne = be;
              for (var xe = be.child; xe !== null; )
                Ne = xe, Sk(xe), xe = xe.sibling;
            }
            ck(be, ce);
          }
          return;
        }
        case Ae: {
          ki(t, e), cl(e), u & vt && px(e);
          return;
        }
        case de:
          return;
        default: {
          ki(t, e), cl(e);
          return;
        }
      }
    }
    function cl(e) {
      var t = e.flags;
      if (t & un) {
        try {
          pk(e);
        } catch (a) {
          Qt(e, e.return, a);
        }
        e.flags &= -3;
      }
      t & aa && (e.flags &= -4097);
    }
    function gk(e, t, a) {
      bf = a, Df = t, Ne = e, hx(e, t, a), bf = null, Df = null;
    }
    function hx(e, t, a) {
      for (var i = (e.mode & ot) !== Be; Ne !== null; ) {
        var u = Ne, s = u.child;
        if (u.tag === te && i) {
          var f = u.memoizedState !== null, v = f || ey;
          if (v) {
            _0(e, t, a);
            continue;
          } else {
            var y = u.alternate, C = y !== null && y.memoizedState !== null, x = C || fr, z = ey, _ = fr;
            ey = v, fr = x, fr && !_ && (Ne = u, Ek(u));
            for (var $ = s; $ !== null; )
              Ne = $, hx(
                $,
                // New root; bubble back up to here and stop.
                t,
                a
              ), $ = $.sibling;
            Ne = u, ey = z, fr = _, _0(e, t, a);
            continue;
          }
        }
        (u.subtreeFlags & $i) !== je && s !== null ? (s.return = u, Ne = s) : _0(e, t, a);
      }
    }
    function _0(e, t, a) {
      for (; Ne !== null; ) {
        var i = Ne;
        if ((i.flags & $i) !== je) {
          var u = i.alternate;
          Yt(i);
          try {
            ok(t, u, i, a);
          } catch (f) {
            Qt(i, i.return, f);
          }
          nn();
        }
        if (i === e) {
          Ne = null;
          return;
        }
        var s = i.sibling;
        if (s !== null) {
          s.return = i.return, Ne = s;
          return;
        }
        Ne = i.return;
      }
    }
    function Sk(e) {
      for (; Ne !== null; ) {
        var t = Ne, a = t.child;
        switch (t.tag) {
          case L:
          case K:
          case ke:
          case ve: {
            if (t.mode & Ct)
              try {
                sl(), bi($n, t, t.return);
              } finally {
                ol(t);
              }
            else
              bi($n, t, t.return);
            break;
          }
          case k: {
            kf(t, t.return);
            var i = t.stateNode;
            typeof i.componentWillUnmount == "function" && O0(t, t.return, i);
            break;
          }
          case D: {
            kf(t, t.return);
            break;
          }
          case te: {
            var u = t.memoizedState !== null;
            if (u) {
              mx(e);
              continue;
            }
            break;
          }
        }
        a !== null ? (a.return = t, Ne = a) : mx(e);
      }
    }
    function mx(e) {
      for (; Ne !== null; ) {
        var t = Ne;
        if (t === e) {
          Ne = null;
          return;
        }
        var a = t.sibling;
        if (a !== null) {
          a.return = t.return, Ne = a;
          return;
        }
        Ne = t.return;
      }
    }
    function Ek(e) {
      for (; Ne !== null; ) {
        var t = Ne, a = t.child;
        if (t.tag === te) {
          var i = t.memoizedState !== null;
          if (i) {
            yx(e);
            continue;
          }
        }
        a !== null ? (a.return = t, Ne = a) : yx(e);
      }
    }
    function yx(e) {
      for (; Ne !== null; ) {
        var t = Ne;
        Yt(t);
        try {
          sk(t);
        } catch (i) {
          Qt(t, t.return, i);
        }
        if (nn(), t === e) {
          Ne = null;
          return;
        }
        var a = t.sibling;
        if (a !== null) {
          a.return = t.return, Ne = a;
          return;
        }
        Ne = t.return;
      }
    }
    function Ck(e, t, a, i) {
      Ne = t, Rk(t, e, a, i);
    }
    function Rk(e, t, a, i) {
      for (; Ne !== null; ) {
        var u = Ne, s = u.child;
        (u.subtreeFlags & fi) !== je && s !== null ? (s.return = u, Ne = s) : xk(e, t, a, i);
      }
    }
    function xk(e, t, a, i) {
      for (; Ne !== null; ) {
        var u = Ne;
        if ((u.flags & xr) !== je) {
          Yt(u);
          try {
            wk(t, u, a, i);
          } catch (f) {
            Qt(u, u.return, f);
          }
          nn();
        }
        if (u === e) {
          Ne = null;
          return;
        }
        var s = u.sibling;
        if (s !== null) {
          s.return = u.return, Ne = s;
          return;
        }
        Ne = u.return;
      }
    }
    function wk(e, t, a, i) {
      switch (t.tag) {
        case L:
        case K:
        case ve: {
          if (t.mode & Ct) {
            qS();
            try {
              eo(sr | In, t);
            } finally {
              XS(t);
            }
          } else
            eo(sr | In, t);
          break;
        }
      }
    }
    function Tk(e) {
      Ne = e, bk();
    }
    function bk() {
      for (; Ne !== null; ) {
        var e = Ne, t = e.child;
        if ((Ne.flags & ra) !== je) {
          var a = e.deletions;
          if (a !== null) {
            for (var i = 0; i < a.length; i++) {
              var u = a[i];
              Ne = u, Ok(u, e);
            }
            {
              var s = e.alternate;
              if (s !== null) {
                var f = s.child;
                if (f !== null) {
                  s.child = null;
                  do {
                    var v = f.sibling;
                    f.sibling = null, f = v;
                  } while (f !== null);
                }
              }
            }
            Ne = e;
          }
        }
        (e.subtreeFlags & fi) !== je && t !== null ? (t.return = e, Ne = t) : Dk();
      }
    }
    function Dk() {
      for (; Ne !== null; ) {
        var e = Ne;
        (e.flags & xr) !== je && (Yt(e), kk(e), nn());
        var t = e.sibling;
        if (t !== null) {
          t.return = e.return, Ne = t;
          return;
        }
        Ne = e.return;
      }
    }
    function kk(e) {
      switch (e.tag) {
        case L:
        case K:
        case ve: {
          e.mode & Ct ? (qS(), bi(sr | In, e, e.return), XS(e)) : bi(sr | In, e, e.return);
          break;
        }
      }
    }
    function Ok(e, t) {
      for (; Ne !== null; ) {
        var a = Ne;
        Yt(a), Lk(a, t), nn();
        var i = a.child;
        i !== null ? (i.return = a, Ne = i) : Mk(e);
      }
    }
    function Mk(e) {
      for (; Ne !== null; ) {
        var t = Ne, a = t.sibling, i = t.return;
        if (sx(t), t === e) {
          Ne = null;
          return;
        }
        if (a !== null) {
          a.return = i, Ne = a;
          return;
        }
        Ne = i;
      }
    }
    function Lk(e, t) {
      switch (e.tag) {
        case L:
        case K:
        case ve: {
          e.mode & Ct ? (qS(), bi(sr, e, t), XS(e)) : bi(sr, e, t);
          break;
        }
      }
    }
    function _k(e) {
      switch (e.tag) {
        case L:
        case K:
        case ve: {
          try {
            eo($n | In, e);
          } catch (a) {
            Qt(e, e.return, a);
          }
          break;
        }
        case k: {
          var t = e.stateNode;
          try {
            t.componentDidMount();
          } catch (a) {
            Qt(e, e.return, a);
          }
          break;
        }
      }
    }
    function Nk(e) {
      switch (e.tag) {
        case L:
        case K:
        case ve: {
          try {
            eo(sr | In, e);
          } catch (t) {
            Qt(e, e.return, t);
          }
          break;
        }
      }
    }
    function zk(e) {
      switch (e.tag) {
        case L:
        case K:
        case ve: {
          try {
            bi($n | In, e, e.return);
          } catch (a) {
            Qt(e, e.return, a);
          }
          break;
        }
        case k: {
          var t = e.stateNode;
          typeof t.componentWillUnmount == "function" && O0(e, e.return, t);
          break;
        }
      }
    }
    function Ak(e) {
      switch (e.tag) {
        case L:
        case K:
        case ve:
          try {
            bi(sr | In, e, e.return);
          } catch (t) {
            Qt(e, e.return, t);
          }
      }
    }
    if (typeof Symbol == "function" && Symbol.for) {
      var Qp = Symbol.for;
      Qp("selector.component"), Qp("selector.has_pseudo_class"), Qp("selector.role"), Qp("selector.test_id"), Qp("selector.text");
    }
    var Uk = [];
    function Fk() {
      Uk.forEach(function(e) {
        return e();
      });
    }
    var Hk = m.ReactCurrentActQueue;
    function Vk(e) {
      {
        var t = (
          // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
          typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
        ), a = typeof jest < "u";
        return a && t !== !1;
      }
    }
    function gx() {
      {
        var e = (
          // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
          typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
        );
        return !e && Hk.current !== null && h("The current testing environment is not configured to support act(...)"), e;
      }
    }
    var Pk = Math.ceil, N0 = m.ReactCurrentDispatcher, z0 = m.ReactCurrentOwner, pr = m.ReactCurrentBatchConfig, Oi = m.ReactCurrentActQueue, Wn = (
      /*             */
      0
    ), Sx = (
      /*               */
      1
    ), vr = (
      /*                */
      2
    ), ti = (
      /*                */
      4
    ), au = 0, Wp = 1, Ds = 2, ny = 3, Gp = 4, Ex = 5, A0 = 6, mt = Wn, Wr = null, pn = null, Gn = ae, fl = ae, U0 = Yu(ae), Kn = au, Kp = null, ry = ae, Xp = ae, ay = ae, qp = null, ha = null, F0 = 0, Cx = 500, Rx = 1 / 0, jk = 500, iu = null;
    function Zp() {
      Rx = Dn() + jk;
    }
    function xx() {
      return Rx;
    }
    var iy = !1, H0 = null, Of = null, ks = !1, no = null, Jp = ae, V0 = [], P0 = null, Bk = 50, ev = 0, j0 = null, B0 = !1, ly = !1, Ik = 50, Mf = 0, uy = null, tv = Vt, oy = ae, wx = !1;
    function sy() {
      return Wr;
    }
    function Gr() {
      return (mt & (vr | ti)) !== Wn ? Dn() : (tv !== Vt || (tv = Dn()), tv);
    }
    function ro(e) {
      var t = e.mode;
      if ((t & ot) === Be)
        return qe;
      if ((mt & vr) !== Wn && Gn !== ae)
        return Ko(Gn);
      var a = Hb() !== Fb;
      if (a) {
        if (pr.transition !== null) {
          var i = pr.transition;
          i._updatedFibers || (i._updatedFibers = /* @__PURE__ */ new Set()), i._updatedFibers.add(e);
        }
        return oy === St && (oy = Id()), oy;
      }
      var u = ca();
      if (u !== St)
        return u;
      var s = R1();
      return s;
    }
    function $k(e) {
      var t = e.mode;
      return (t & ot) === Be ? qe : ph();
    }
    function Xn(e, t, a, i) {
      vO(), wx && h("useInsertionEffect must not schedule updates."), B0 && (ly = !0), zu(e, a, i), (mt & vr) !== ae && e === Wr ? yO(t) : (Dr && Zo(e, t, a), gO(t), e === Wr && ((mt & vr) === Wn && (Xp = it(Xp, a)), Kn === Gp && ao(e, Gn)), ma(e, i), a === qe && mt === Wn && (t.mode & ot) === Be && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
      !Oi.isBatchingLegacy && (Zp(), wC()));
    }
    function Yk(e, t, a) {
      var i = e.current;
      i.lanes = t, zu(e, t, a), ma(e, a);
    }
    function Qk(e) {
      return (
        // TODO: Remove outdated deferRenderPhaseUpdateToNextBatch experiment. We
        // decided not to enable it.
        (mt & vr) !== Wn
      );
    }
    function ma(e, t) {
      var a = e.callbackNode;
      Hc(e, t);
      var i = Fc(e, e === Wr ? Gn : ae);
      if (i === ae) {
        a !== null && Px(a), e.callbackNode = null, e.callbackPriority = St;
        return;
      }
      var u = Ki(i), s = e.callbackPriority;
      if (s === u && // Special case related to `act`. If the currently scheduled task is a
      // Scheduler task, rather than an `act` task, cancel it and re-scheduled
      // on the `act` queue.
      !(Oi.current !== null && a !== K0)) {
        a == null && s !== qe && h("Expected scheduled callback to exist. This error is likely caused by a bug in React. Please file an issue.");
        return;
      }
      a != null && Px(a);
      var f;
      if (u === qe)
        e.tag === Qu ? (Oi.isBatchingLegacy !== null && (Oi.didScheduleLegacyUpdate = !0), Eb(Dx.bind(null, e))) : xC(Dx.bind(null, e)), Oi.current !== null ? Oi.current.push(Wu) : w1(function() {
          (mt & (vr | ti)) === Wn && Wu();
        }), f = null;
      else {
        var v;
        switch (Eh(i)) {
          case rr:
            v = Ao;
            break;
          case Ya:
            v = Yi;
            break;
          case oa:
            v = di;
            break;
          case sa:
            v = _l;
            break;
          default:
            v = di;
            break;
        }
        f = X0(v, Tx.bind(null, e));
      }
      e.callbackPriority = u, e.callbackNode = f;
    }
    function Tx(e, t) {
      if (cD(), tv = Vt, oy = ae, (mt & (vr | ti)) !== Wn)
        throw new Error("Should not already be working.");
      var a = e.callbackNode, i = uu();
      if (i && e.callbackNode !== a)
        return null;
      var u = Fc(e, e === Wr ? Gn : ae);
      if (u === ae)
        return null;
      var s = !Pc(e, u) && !dh(e, u) && !t, f = s ? nO(e, u) : fy(e, u);
      if (f !== au) {
        if (f === Ds) {
          var v = Vc(e);
          v !== ae && (u = v, f = I0(e, v));
        }
        if (f === Wp) {
          var y = Kp;
          throw Os(e, ae), ao(e, u), ma(e, Dn()), y;
        }
        if (f === A0)
          ao(e, u);
        else {
          var C = !Pc(e, u), x = e.current.alternate;
          if (C && !Gk(x)) {
            if (f = fy(e, u), f === Ds) {
              var z = Vc(e);
              z !== ae && (u = z, f = I0(e, z));
            }
            if (f === Wp) {
              var _ = Kp;
              throw Os(e, ae), ao(e, u), ma(e, Dn()), _;
            }
          }
          e.finishedWork = x, e.finishedLanes = u, Wk(e, f, u);
        }
      }
      return ma(e, Dn()), e.callbackNode === a ? Tx.bind(null, e) : null;
    }
    function I0(e, t) {
      var a = qp;
      if (Ic(e)) {
        var i = Os(e, t);
        i.flags |= Rr, pb(e.containerInfo);
      }
      var u = fy(e, t);
      if (u !== Ds) {
        var s = ha;
        ha = a, s !== null && bx(s);
      }
      return u;
    }
    function bx(e) {
      ha === null ? ha = e : ha.push.apply(ha, e);
    }
    function Wk(e, t, a) {
      switch (t) {
        case au:
        case Wp:
          throw new Error("Root did not complete. This is a bug in React.");
        // Flow knows about invariant, so it complains if I add a break
        // statement, but eslint doesn't know about invariant, so it complains
        // if I do. eslint-disable-next-line no-fallthrough
        case Ds: {
          Ms(e, ha, iu);
          break;
        }
        case ny: {
          if (ao(e, a), Il(a) && // do not delay if we're inside an act() scope
          !jx()) {
            var i = F0 + Cx - Dn();
            if (i > 10) {
              var u = Fc(e, ae);
              if (u !== ae)
                break;
              var s = e.suspendedLanes;
              if (!$l(s, a)) {
                Gr(), jc(e, s);
                break;
              }
              e.timeoutHandle = Pg(Ms.bind(null, e, ha, iu), i);
              break;
            }
          }
          Ms(e, ha, iu);
          break;
        }
        case Gp: {
          if (ao(e, a), jd(a))
            break;
          if (!jx()) {
            var f = ka(e, a), v = f, y = Dn() - v, C = pO(y) - y;
            if (C > 10) {
              e.timeoutHandle = Pg(Ms.bind(null, e, ha, iu), C);
              break;
            }
          }
          Ms(e, ha, iu);
          break;
        }
        case Ex: {
          Ms(e, ha, iu);
          break;
        }
        default:
          throw new Error("Unknown root exit status.");
      }
    }
    function Gk(e) {
      for (var t = e; ; ) {
        if (t.flags & Ou) {
          var a = t.updateQueue;
          if (a !== null) {
            var i = a.stores;
            if (i !== null)
              for (var u = 0; u < i.length; u++) {
                var s = i[u], f = s.getSnapshot, v = s.value;
                try {
                  if (!ue(f(), v))
                    return !1;
                } catch {
                  return !1;
                }
              }
          }
        }
        var y = t.child;
        if (t.subtreeFlags & Ou && y !== null) {
          y.return = t, t = y;
          continue;
        }
        if (t === e)
          return !0;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e)
            return !0;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
      return !0;
    }
    function ao(e, t) {
      t = Xo(t, ay), t = Xo(t, Xp), mh(e, t);
    }
    function Dx(e) {
      if (fD(), (mt & (vr | ti)) !== Wn)
        throw new Error("Should not already be working.");
      uu();
      var t = Fc(e, ae);
      if (!kr(t, qe))
        return ma(e, Dn()), null;
      var a = fy(e, t);
      if (e.tag !== Qu && a === Ds) {
        var i = Vc(e);
        i !== ae && (t = i, a = I0(e, i));
      }
      if (a === Wp) {
        var u = Kp;
        throw Os(e, ae), ao(e, t), ma(e, Dn()), u;
      }
      if (a === A0)
        throw new Error("Root did not complete. This is a bug in React.");
      var s = e.current.alternate;
      return e.finishedWork = s, e.finishedLanes = t, Ms(e, ha, iu), ma(e, Dn()), null;
    }
    function Kk(e, t) {
      t !== ae && (Bc(e, it(t, qe)), ma(e, Dn()), (mt & (vr | ti)) === Wn && (Zp(), Wu()));
    }
    function $0(e, t) {
      var a = mt;
      mt |= Sx;
      try {
        return e(t);
      } finally {
        mt = a, mt === Wn && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
        !Oi.isBatchingLegacy && (Zp(), wC());
      }
    }
    function Xk(e, t, a, i, u) {
      var s = ca(), f = pr.transition;
      try {
        return pr.transition = null, En(rr), e(t, a, i, u);
      } finally {
        En(s), pr.transition = f, mt === Wn && Zp();
      }
    }
    function lu(e) {
      no !== null && no.tag === Qu && (mt & (vr | ti)) === Wn && uu();
      var t = mt;
      mt |= Sx;
      var a = pr.transition, i = ca();
      try {
        return pr.transition = null, En(rr), e ? e() : void 0;
      } finally {
        En(i), pr.transition = a, mt = t, (mt & (vr | ti)) === Wn && Wu();
      }
    }
    function kx() {
      return (mt & (vr | ti)) !== Wn;
    }
    function cy(e, t) {
      Nr(U0, fl, e), fl = it(fl, t);
    }
    function Y0(e) {
      fl = U0.current, _r(U0, e);
    }
    function Os(e, t) {
      e.finishedWork = null, e.finishedLanes = ae;
      var a = e.timeoutHandle;
      if (a !== jg && (e.timeoutHandle = jg, x1(a)), pn !== null)
        for (var i = pn.return; i !== null; ) {
          var u = i.alternate;
          rx(u, i), i = i.return;
        }
      Wr = e;
      var s = Ls(e.current, null);
      return pn = s, Gn = fl = t, Kn = au, Kp = null, ry = ae, Xp = ae, ay = ae, qp = null, ha = null, Yb(), Ci.discardPendingWarnings(), s;
    }
    function Ox(e, t) {
      do {
        var a = pn;
        try {
          if (Em(), JC(), nn(), z0.current = null, a === null || a.return === null) {
            Kn = Wp, Kp = t, pn = null;
            return;
          }
          if (Mt && a.mode & Ct && Km(a, !0), Bt)
            if (Br(), t !== null && typeof t == "object" && typeof t.then == "function") {
              var i = t;
              $a(a, i, Gn);
            } else
              Fo(a, t, Gn);
          ED(e, a.return, a, t, Gn), Nx(a);
        } catch (u) {
          t = u, pn === a && a !== null ? (a = a.return, pn = a) : a = pn;
          continue;
        }
        return;
      } while (!0);
    }
    function Mx() {
      var e = N0.current;
      return N0.current = $m, e === null ? $m : e;
    }
    function Lx(e) {
      N0.current = e;
    }
    function qk() {
      F0 = Dn();
    }
    function nv(e) {
      ry = it(e, ry);
    }
    function Zk() {
      Kn === au && (Kn = ny);
    }
    function Q0() {
      (Kn === au || Kn === ny || Kn === Ds) && (Kn = Gp), Wr !== null && (Go(ry) || Go(Xp)) && ao(Wr, Gn);
    }
    function Jk(e) {
      Kn !== Gp && (Kn = Ds), qp === null ? qp = [e] : qp.push(e);
    }
    function eO() {
      return Kn === au;
    }
    function fy(e, t) {
      var a = mt;
      mt |= vr;
      var i = Mx();
      if (Wr !== e || Gn !== t) {
        if (Dr) {
          var u = e.memoizedUpdaters;
          u.size > 0 && (rv(e, Gn), u.clear()), yh(e, t);
        }
        iu = Wd(), Os(e, t);
      }
      Ul(t);
      do
        try {
          tO();
          break;
        } catch (s) {
          Ox(e, s);
        }
      while (!0);
      if (Em(), mt = a, Lx(i), pn !== null)
        throw new Error("Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.");
      return Sc(), Wr = null, Gn = ae, Kn;
    }
    function tO() {
      for (; pn !== null; )
        _x(pn);
    }
    function nO(e, t) {
      var a = mt;
      mt |= vr;
      var i = Mx();
      if (Wr !== e || Gn !== t) {
        if (Dr) {
          var u = e.memoizedUpdaters;
          u.size > 0 && (rv(e, Gn), u.clear()), yh(e, t);
        }
        iu = Wd(), Zp(), Os(e, t);
      }
      Ul(t);
      do
        try {
          rO();
          break;
        } catch (s) {
          Ox(e, s);
        }
      while (!0);
      return Em(), Lx(i), mt = a, pn !== null ? (oh(), au) : (Sc(), Wr = null, Gn = ae, Kn);
    }
    function rO() {
      for (; pn !== null && !bd(); )
        _x(pn);
    }
    function _x(e) {
      var t = e.alternate;
      Yt(e);
      var a;
      (e.mode & Ct) !== Be ? (KS(e), a = W0(t, e, fl), Km(e, !0)) : a = W0(t, e, fl), nn(), e.memoizedProps = e.pendingProps, a === null ? Nx(e) : pn = a, z0.current = null;
    }
    function Nx(e) {
      var t = e;
      do {
        var a = t.alternate, i = t.return;
        if ((t.flags & zo) === je) {
          Yt(t);
          var u = void 0;
          if ((t.mode & Ct) === Be ? u = nx(a, t, fl) : (KS(t), u = nx(a, t, fl), Km(t, !1)), nn(), u !== null) {
            pn = u;
            return;
          }
        } else {
          var s = ZD(a, t);
          if (s !== null) {
            s.flags &= nh, pn = s;
            return;
          }
          if ((t.mode & Ct) !== Be) {
            Km(t, !1);
            for (var f = t.actualDuration, v = t.child; v !== null; )
              f += v.actualDuration, v = v.sibling;
            t.actualDuration = f;
          }
          if (i !== null)
            i.flags |= zo, i.subtreeFlags = je, i.deletions = null;
          else {
            Kn = A0, pn = null;
            return;
          }
        }
        var y = t.sibling;
        if (y !== null) {
          pn = y;
          return;
        }
        t = i, pn = t;
      } while (t !== null);
      Kn === au && (Kn = Ex);
    }
    function Ms(e, t, a) {
      var i = ca(), u = pr.transition;
      try {
        pr.transition = null, En(rr), aO(e, t, a, i);
      } finally {
        pr.transition = u, En(i);
      }
      return null;
    }
    function aO(e, t, a, i) {
      do
        uu();
      while (no !== null);
      if (hO(), (mt & (vr | ti)) !== Wn)
        throw new Error("Should not already be working.");
      var u = e.finishedWork, s = e.finishedLanes;
      if (_d(s), u === null)
        return Nd(), null;
      if (s === ae && h("root.finishedLanes should not be empty during a commit. This is a bug in React."), e.finishedWork = null, e.finishedLanes = ae, u === e.current)
        throw new Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");
      e.callbackNode = null, e.callbackPriority = St;
      var f = it(u.lanes, u.childLanes);
      Yd(e, f), e === Wr && (Wr = null, pn = null, Gn = ae), ((u.subtreeFlags & fi) !== je || (u.flags & fi) !== je) && (ks || (ks = !0, P0 = a, X0(di, function() {
        return uu(), null;
      })));
      var v = (u.subtreeFlags & (Bi | Ii | $i | fi)) !== je, y = (u.flags & (Bi | Ii | $i | fi)) !== je;
      if (v || y) {
        var C = pr.transition;
        pr.transition = null;
        var x = ca();
        En(rr);
        var z = mt;
        mt |= ti, z0.current = null, rk(e, u), wR(), yk(e, u, s), m1(e.containerInfo), e.current = u, Ho(s), gk(u, e, s), Vo(), Dd(), mt = z, En(x), pr.transition = C;
      } else
        e.current = u, wR();
      var _ = ks;
      if (ks ? (ks = !1, no = e, Jp = s) : (Mf = 0, uy = null), f = e.pendingLanes, f === ae && (Of = null), _ || Fx(e.current, !1), Od(u.stateNode, i), Dr && e.memoizedUpdaters.clear(), Fk(), ma(e, Dn()), t !== null)
        for (var $ = e.onRecoverableError, Q = 0; Q < t.length; Q++) {
          var q = t[Q], Ee = q.stack, $e = q.digest;
          $(q.value, {
            componentStack: Ee,
            digest: $e
          });
        }
      if (iy) {
        iy = !1;
        var Fe = H0;
        throw H0 = null, Fe;
      }
      return kr(Jp, qe) && e.tag !== Qu && uu(), f = e.pendingLanes, kr(f, qe) ? (sD(), e === j0 ? ev++ : (ev = 0, j0 = e)) : ev = 0, Wu(), Nd(), null;
    }
    function uu() {
      if (no !== null) {
        var e = Eh(Jp), t = es(oa, e), a = pr.transition, i = ca();
        try {
          return pr.transition = null, En(t), lO();
        } finally {
          En(i), pr.transition = a;
        }
      }
      return !1;
    }
    function iO(e) {
      V0.push(e), ks || (ks = !0, X0(di, function() {
        return uu(), null;
      }));
    }
    function lO() {
      if (no === null)
        return !1;
      var e = P0;
      P0 = null;
      var t = no, a = Jp;
      if (no = null, Jp = ae, (mt & (vr | ti)) !== Wn)
        throw new Error("Cannot flush passive effects while already rendering.");
      B0 = !0, ly = !1, Al(a);
      var i = mt;
      mt |= ti, Tk(t.current), Ck(t, t.current, a, e);
      {
        var u = V0;
        V0 = [];
        for (var s = 0; s < u.length; s++) {
          var f = u[s];
          uk(t, f);
        }
      }
      Ud(), Fx(t.current, !0), mt = i, Wu(), ly ? t === uy ? Mf++ : (Mf = 0, uy = t) : Mf = 0, B0 = !1, ly = !1, Md(t);
      {
        var v = t.current.stateNode;
        v.effectDuration = 0, v.passiveEffectDuration = 0;
      }
      return !0;
    }
    function zx(e) {
      return Of !== null && Of.has(e);
    }
    function uO(e) {
      Of === null ? Of = /* @__PURE__ */ new Set([e]) : Of.add(e);
    }
    function oO(e) {
      iy || (iy = !0, H0 = e);
    }
    var sO = oO;
    function Ax(e, t, a) {
      var i = Ts(a, t), u = _R(e, i, qe), s = Ku(e, u, qe), f = Gr();
      s !== null && (zu(s, qe, f), ma(s, f));
    }
    function Qt(e, t, a) {
      if (ek(a), av(!1), e.tag === M) {
        Ax(e, e, a);
        return;
      }
      var i = null;
      for (i = t; i !== null; ) {
        if (i.tag === M) {
          Ax(i, e, a);
          return;
        } else if (i.tag === k) {
          var u = i.type, s = i.stateNode;
          if (typeof u.getDerivedStateFromError == "function" || typeof s.componentDidCatch == "function" && !zx(s)) {
            var f = Ts(a, e), v = p0(i, f, qe), y = Ku(i, v, qe), C = Gr();
            y !== null && (zu(y, qe, C), ma(y, C));
            return;
          }
        }
        i = i.return;
      }
      h(`Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Likely causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.

Error message:

%s`, a);
    }
    function cO(e, t, a) {
      var i = e.pingCache;
      i !== null && i.delete(t);
      var u = Gr();
      jc(e, a), SO(e), Wr === e && $l(Gn, a) && (Kn === Gp || Kn === ny && Il(Gn) && Dn() - F0 < Cx ? Os(e, ae) : ay = it(ay, a)), ma(e, u);
    }
    function Ux(e, t) {
      t === St && (t = $k(e));
      var a = Gr(), i = pa(e, t);
      i !== null && (zu(i, t, a), ma(i, a));
    }
    function fO(e) {
      var t = e.memoizedState, a = St;
      t !== null && (a = t.retryLane), Ux(e, a);
    }
    function dO(e, t) {
      var a = St, i;
      switch (e.tag) {
        case fe:
          i = e.stateNode;
          var u = e.memoizedState;
          u !== null && (a = u.retryLane);
          break;
        case Ae:
          i = e.stateNode;
          break;
        default:
          throw new Error("Pinged unknown suspense boundary type. This is probably a bug in React.");
      }
      i !== null && i.delete(t), Ux(e, a);
    }
    function pO(e) {
      return e < 120 ? 120 : e < 480 ? 480 : e < 1080 ? 1080 : e < 1920 ? 1920 : e < 3e3 ? 3e3 : e < 4320 ? 4320 : Pk(e / 1960) * 1960;
    }
    function vO() {
      if (ev > Bk)
        throw ev = 0, j0 = null, new Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");
      Mf > Ik && (Mf = 0, uy = null, h("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."));
    }
    function hO() {
      Ci.flushLegacyContextWarning(), Ci.flushPendingUnsafeLifecycleWarnings();
    }
    function Fx(e, t) {
      Yt(e), dy(e, ji, zk), t && dy(e, ja, Ak), dy(e, ji, _k), t && dy(e, ja, Nk), nn();
    }
    function dy(e, t, a) {
      for (var i = e, u = null; i !== null; ) {
        var s = i.subtreeFlags & t;
        i !== u && i.child !== null && s !== je ? i = i.child : ((i.flags & t) !== je && a(i), i.sibling !== null ? i = i.sibling : i = u = i.return);
      }
    }
    var py = null;
    function Hx(e) {
      {
        if ((mt & vr) !== Wn || !(e.mode & ot))
          return;
        var t = e.tag;
        if (t !== U && t !== M && t !== k && t !== L && t !== K && t !== ke && t !== ve)
          return;
        var a = at(e) || "ReactComponent";
        if (py !== null) {
          if (py.has(a))
            return;
          py.add(a);
        } else
          py = /* @__PURE__ */ new Set([a]);
        var i = nr;
        try {
          Yt(e), h("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.");
        } finally {
          i ? Yt(e) : nn();
        }
      }
    }
    var W0;
    {
      var mO = null;
      W0 = function(e, t, a) {
        var i = Qx(mO, t);
        try {
          return qR(e, t, a);
        } catch (s) {
          if (kb() || s !== null && typeof s == "object" && typeof s.then == "function")
            throw s;
          if (Em(), JC(), rx(e, t), Qx(t, i), t.mode & Ct && KS(t), Pi(null, qR, null, e, t, a), si()) {
            var u = No();
            typeof u == "object" && u !== null && u._suppressLogging && typeof s == "object" && s !== null && !s._suppressLogging && (s._suppressLogging = !0);
          }
          throw s;
        }
      };
    }
    var Vx = !1, G0;
    G0 = /* @__PURE__ */ new Set();
    function yO(e) {
      if (zi && !lD())
        switch (e.tag) {
          case L:
          case K:
          case ve: {
            var t = pn && at(pn) || "Unknown", a = t;
            if (!G0.has(a)) {
              G0.add(a);
              var i = at(e) || "Unknown";
              h("Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render", i, t, t);
            }
            break;
          }
          case k: {
            Vx || (h("Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."), Vx = !0);
            break;
          }
        }
    }
    function rv(e, t) {
      if (Dr) {
        var a = e.memoizedUpdaters;
        a.forEach(function(i) {
          Zo(e, i, t);
        });
      }
    }
    var K0 = {};
    function X0(e, t) {
      {
        var a = Oi.current;
        return a !== null ? (a.push(t), K0) : Td(e, t);
      }
    }
    function Px(e) {
      if (e !== K0)
        return ah(e);
    }
    function jx() {
      return Oi.current !== null;
    }
    function gO(e) {
      {
        if (e.mode & ot) {
          if (!gx())
            return;
        } else if (!Vk() || mt !== Wn || e.tag !== L && e.tag !== K && e.tag !== ve)
          return;
        if (Oi.current === null) {
          var t = nr;
          try {
            Yt(e), h(`An update to %s inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`, at(e));
          } finally {
            t ? Yt(e) : nn();
          }
        }
      }
    }
    function SO(e) {
      e.tag !== Qu && gx() && Oi.current === null && h(`A suspended resource finished loading inside a test, but the event was not wrapped in act(...).

When testing, code that resolves suspended data should be wrapped into act(...):

act(() => {
  /* finish loading suspended data */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`);
    }
    function av(e) {
      wx = e;
    }
    var ni = null, Lf = null, EO = function(e) {
      ni = e;
    };
    function _f(e) {
      {
        if (ni === null)
          return e;
        var t = ni(e);
        return t === void 0 ? e : t.current;
      }
    }
    function q0(e) {
      return _f(e);
    }
    function Z0(e) {
      {
        if (ni === null)
          return e;
        var t = ni(e);
        if (t === void 0) {
          if (e != null && typeof e.render == "function") {
            var a = _f(e.render);
            if (e.render !== a) {
              var i = {
                $$typeof: hu,
                render: a
              };
              return e.displayName !== void 0 && (i.displayName = e.displayName), i;
            }
          }
          return e;
        }
        return t.current;
      }
    }
    function Bx(e, t) {
      {
        if (ni === null)
          return !1;
        var a = e.elementType, i = t.type, u = !1, s = typeof i == "object" && i !== null ? i.$$typeof : null;
        switch (e.tag) {
          case k: {
            typeof i == "function" && (u = !0);
            break;
          }
          case L: {
            (typeof i == "function" || s === qn) && (u = !0);
            break;
          }
          case K: {
            (s === hu || s === qn) && (u = !0);
            break;
          }
          case ke:
          case ve: {
            (s === Ca || s === qn) && (u = !0);
            break;
          }
          default:
            return !1;
        }
        if (u) {
          var f = ni(a);
          if (f !== void 0 && f === ni(i))
            return !0;
        }
        return !1;
      }
    }
    function Ix(e) {
      {
        if (ni === null || typeof WeakSet != "function")
          return;
        Lf === null && (Lf = /* @__PURE__ */ new WeakSet()), Lf.add(e);
      }
    }
    var CO = function(e, t) {
      {
        if (ni === null)
          return;
        var a = t.staleFamilies, i = t.updatedFamilies;
        uu(), lu(function() {
          J0(e.current, i, a);
        });
      }
    }, RO = function(e, t) {
      {
        if (e.context !== La)
          return;
        uu(), lu(function() {
          iv(t, e, null, null);
        });
      }
    };
    function J0(e, t, a) {
      {
        var i = e.alternate, u = e.child, s = e.sibling, f = e.tag, v = e.type, y = null;
        switch (f) {
          case L:
          case ve:
          case k:
            y = v;
            break;
          case K:
            y = v.render;
            break;
        }
        if (ni === null)
          throw new Error("Expected resolveFamily to be set during hot reload.");
        var C = !1, x = !1;
        if (y !== null) {
          var z = ni(y);
          z !== void 0 && (a.has(z) ? x = !0 : t.has(z) && (f === k ? x = !0 : C = !0));
        }
        if (Lf !== null && (Lf.has(e) || i !== null && Lf.has(i)) && (x = !0), x && (e._debugNeedsRemount = !0), x || C) {
          var _ = pa(e, qe);
          _ !== null && Xn(_, e, qe, Vt);
        }
        u !== null && !x && J0(u, t, a), s !== null && J0(s, t, a);
      }
    }
    var xO = function(e, t) {
      {
        var a = /* @__PURE__ */ new Set(), i = new Set(t.map(function(u) {
          return u.current;
        }));
        return eE(e.current, i, a), a;
      }
    };
    function eE(e, t, a) {
      {
        var i = e.child, u = e.sibling, s = e.tag, f = e.type, v = null;
        switch (s) {
          case L:
          case ve:
          case k:
            v = f;
            break;
          case K:
            v = f.render;
            break;
        }
        var y = !1;
        v !== null && t.has(v) && (y = !0), y ? wO(e, a) : i !== null && eE(i, t, a), u !== null && eE(u, t, a);
      }
    }
    function wO(e, t) {
      {
        var a = TO(e, t);
        if (a)
          return;
        for (var i = e; ; ) {
          switch (i.tag) {
            case D:
              t.add(i.stateNode);
              return;
            case A:
              t.add(i.stateNode.containerInfo);
              return;
            case M:
              t.add(i.stateNode.containerInfo);
              return;
          }
          if (i.return === null)
            throw new Error("Expected to reach root first.");
          i = i.return;
        }
      }
    }
    function TO(e, t) {
      for (var a = e, i = !1; ; ) {
        if (a.tag === D)
          i = !0, t.add(a.stateNode);
        else if (a.child !== null) {
          a.child.return = a, a = a.child;
          continue;
        }
        if (a === e)
          return i;
        for (; a.sibling === null; ) {
          if (a.return === null || a.return === e)
            return i;
          a = a.return;
        }
        a.sibling.return = a.return, a = a.sibling;
      }
      return !1;
    }
    var tE;
    {
      tE = !1;
      try {
        var $x = Object.preventExtensions({});
      } catch {
        tE = !0;
      }
    }
    function bO(e, t, a, i) {
      this.tag = e, this.key = a, this.elementType = null, this.type = null, this.stateNode = null, this.return = null, this.child = null, this.sibling = null, this.index = 0, this.ref = null, this.pendingProps = t, this.memoizedProps = null, this.updateQueue = null, this.memoizedState = null, this.dependencies = null, this.mode = i, this.flags = je, this.subtreeFlags = je, this.deletions = null, this.lanes = ae, this.childLanes = ae, this.alternate = null, this.actualDuration = Number.NaN, this.actualStartTime = Number.NaN, this.selfBaseDuration = Number.NaN, this.treeBaseDuration = Number.NaN, this.actualDuration = 0, this.actualStartTime = -1, this.selfBaseDuration = 0, this.treeBaseDuration = 0, this._debugSource = null, this._debugOwner = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, !tE && typeof Object.preventExtensions == "function" && Object.preventExtensions(this);
    }
    var _a = function(e, t, a, i) {
      return new bO(e, t, a, i);
    };
    function nE(e) {
      var t = e.prototype;
      return !!(t && t.isReactComponent);
    }
    function DO(e) {
      return typeof e == "function" && !nE(e) && e.defaultProps === void 0;
    }
    function kO(e) {
      if (typeof e == "function")
        return nE(e) ? k : L;
      if (e != null) {
        var t = e.$$typeof;
        if (t === hu)
          return K;
        if (t === Ca)
          return ke;
      }
      return U;
    }
    function Ls(e, t) {
      var a = e.alternate;
      a === null ? (a = _a(e.tag, t, e.key, e.mode), a.elementType = e.elementType, a.type = e.type, a.stateNode = e.stateNode, a._debugSource = e._debugSource, a._debugOwner = e._debugOwner, a._debugHookTypes = e._debugHookTypes, a.alternate = e, e.alternate = a) : (a.pendingProps = t, a.type = e.type, a.flags = je, a.subtreeFlags = je, a.deletions = null, a.actualDuration = 0, a.actualStartTime = -1), a.flags = e.flags & yn, a.childLanes = e.childLanes, a.lanes = e.lanes, a.child = e.child, a.memoizedProps = e.memoizedProps, a.memoizedState = e.memoizedState, a.updateQueue = e.updateQueue;
      var i = e.dependencies;
      switch (a.dependencies = i === null ? null : {
        lanes: i.lanes,
        firstContext: i.firstContext
      }, a.sibling = e.sibling, a.index = e.index, a.ref = e.ref, a.selfBaseDuration = e.selfBaseDuration, a.treeBaseDuration = e.treeBaseDuration, a._debugNeedsRemount = e._debugNeedsRemount, a.tag) {
        case U:
        case L:
        case ve:
          a.type = _f(e.type);
          break;
        case k:
          a.type = q0(e.type);
          break;
        case K:
          a.type = Z0(e.type);
          break;
      }
      return a;
    }
    function OO(e, t) {
      e.flags &= yn | un;
      var a = e.alternate;
      if (a === null)
        e.childLanes = ae, e.lanes = t, e.child = null, e.subtreeFlags = je, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null, e.selfBaseDuration = 0, e.treeBaseDuration = 0;
      else {
        e.childLanes = a.childLanes, e.lanes = a.lanes, e.child = a.child, e.subtreeFlags = je, e.deletions = null, e.memoizedProps = a.memoizedProps, e.memoizedState = a.memoizedState, e.updateQueue = a.updateQueue, e.type = a.type;
        var i = a.dependencies;
        e.dependencies = i === null ? null : {
          lanes: i.lanes,
          firstContext: i.firstContext
        }, e.selfBaseDuration = a.selfBaseDuration, e.treeBaseDuration = a.treeBaseDuration;
      }
      return e;
    }
    function MO(e, t, a) {
      var i;
      return e === cm ? (i = ot, t === !0 && (i |= At, i |= Rt)) : i = Be, Dr && (i |= Ct), _a(M, null, null, i);
    }
    function rE(e, t, a, i, u, s) {
      var f = U, v = e;
      if (typeof e == "function")
        nE(e) ? (f = k, v = q0(v)) : v = _f(v);
      else if (typeof e == "string")
        f = D;
      else
        e: switch (e) {
          case du:
            return io(a.children, u, s, t);
          case ml:
            f = ne, u |= At, (u & ot) !== Be && (u |= Rt);
            break;
          case pu:
            return LO(a, u, s, t);
          case Hs:
            return _O(a, u, s, t);
          case Vs:
            return NO(a, u, s, t);
          case $f:
            return Yx(a, u, s, t);
          case gv:
          // eslint-disable-next-line no-fallthrough
          case yv:
          // eslint-disable-next-line no-fallthrough
          case Sv:
          // eslint-disable-next-line no-fallthrough
          case Ev:
          // eslint-disable-next-line no-fallthrough
          case jy:
          // eslint-disable-next-line no-fallthrough
          default: {
            if (typeof e == "object" && e !== null)
              switch (e.$$typeof) {
                case vu:
                  f = re;
                  break e;
                case vo:
                  f = J;
                  break e;
                case hu:
                  f = K, v = Z0(v);
                  break e;
                case Ca:
                  f = ke;
                  break e;
                case qn:
                  f = We, v = null;
                  break e;
              }
            var y = "";
            {
              (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (y += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
              var C = i ? at(i) : null;
              C && (y += `

Check the render method of \`` + C + "`.");
            }
            throw new Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) " + ("but got: " + (e == null ? e : typeof e) + "." + y));
          }
        }
      var x = _a(f, a, t, u);
      return x.elementType = e, x.type = v, x.lanes = s, x._debugOwner = i, x;
    }
    function aE(e, t, a) {
      var i = null;
      i = e._owner;
      var u = e.type, s = e.key, f = e.props, v = rE(u, s, f, i, t, a);
      return v._debugSource = e._source, v._debugOwner = e._owner, v;
    }
    function io(e, t, a, i) {
      var u = _a(H, e, i, t);
      return u.lanes = a, u;
    }
    function LO(e, t, a, i) {
      typeof e.id != "string" && h('Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.', typeof e.id);
      var u = _a(pe, e, i, t | Ct);
      return u.elementType = pu, u.lanes = a, u.stateNode = {
        effectDuration: 0,
        passiveEffectDuration: 0
      }, u;
    }
    function _O(e, t, a, i) {
      var u = _a(fe, e, i, t);
      return u.elementType = Hs, u.lanes = a, u;
    }
    function NO(e, t, a, i) {
      var u = _a(Ae, e, i, t);
      return u.elementType = Vs, u.lanes = a, u;
    }
    function Yx(e, t, a, i) {
      var u = _a(te, e, i, t);
      u.elementType = $f, u.lanes = a;
      var s = {
        isHidden: !1
      };
      return u.stateNode = s, u;
    }
    function iE(e, t, a) {
      var i = _a(F, e, null, t);
      return i.lanes = a, i;
    }
    function zO() {
      var e = _a(D, null, null, Be);
      return e.elementType = "DELETED", e;
    }
    function AO(e) {
      var t = _a(Ye, null, null, Be);
      return t.stateNode = e, t;
    }
    function lE(e, t, a) {
      var i = e.children !== null ? e.children : [], u = _a(A, i, e.key, t);
      return u.lanes = a, u.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        // Used by persistent updates
        implementation: e.implementation
      }, u;
    }
    function Qx(e, t) {
      return e === null && (e = _a(U, null, null, Be)), e.tag = t.tag, e.key = t.key, e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.return = t.return, e.child = t.child, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.pendingProps = t.pendingProps, e.memoizedProps = t.memoizedProps, e.updateQueue = t.updateQueue, e.memoizedState = t.memoizedState, e.dependencies = t.dependencies, e.mode = t.mode, e.flags = t.flags, e.subtreeFlags = t.subtreeFlags, e.deletions = t.deletions, e.lanes = t.lanes, e.childLanes = t.childLanes, e.alternate = t.alternate, e.actualDuration = t.actualDuration, e.actualStartTime = t.actualStartTime, e.selfBaseDuration = t.selfBaseDuration, e.treeBaseDuration = t.treeBaseDuration, e._debugSource = t._debugSource, e._debugOwner = t._debugOwner, e._debugNeedsRemount = t._debugNeedsRemount, e._debugHookTypes = t._debugHookTypes, e;
    }
    function UO(e, t, a, i, u) {
      this.tag = t, this.containerInfo = e, this.pendingChildren = null, this.current = null, this.pingCache = null, this.finishedWork = null, this.timeoutHandle = jg, this.context = null, this.pendingContext = null, this.callbackNode = null, this.callbackPriority = St, this.eventTimes = qo(ae), this.expirationTimes = qo(Vt), this.pendingLanes = ae, this.suspendedLanes = ae, this.pingedLanes = ae, this.expiredLanes = ae, this.mutableReadLanes = ae, this.finishedLanes = ae, this.entangledLanes = ae, this.entanglements = qo(ae), this.identifierPrefix = i, this.onRecoverableError = u, this.mutableSourceEagerHydrationData = null, this.effectDuration = 0, this.passiveEffectDuration = 0;
      {
        this.memoizedUpdaters = /* @__PURE__ */ new Set();
        for (var s = this.pendingUpdatersLaneMap = [], f = 0; f < Fl; f++)
          s.push(/* @__PURE__ */ new Set());
      }
      switch (t) {
        case cm:
          this._debugRootType = a ? "hydrateRoot()" : "createRoot()";
          break;
        case Qu:
          this._debugRootType = a ? "hydrate()" : "render()";
          break;
      }
    }
    function Wx(e, t, a, i, u, s, f, v, y, C) {
      var x = new UO(e, t, a, v, y), z = MO(t, s);
      x.current = z, z.stateNode = x;
      {
        var _ = {
          element: i,
          isDehydrated: a,
          cache: null,
          // not enabled yet
          transitions: null,
          pendingSuspenseBoundaries: null
        };
        z.memoizedState = _;
      }
      return SS(z), x;
    }
    var uE = "18.3.1";
    function FO(e, t, a) {
      var i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
      return vn(i), {
        // This tag allow us to uniquely identify this as a React Portal
        $$typeof: Ea,
        key: i == null ? null : "" + i,
        children: e,
        containerInfo: t,
        implementation: a
      };
    }
    var oE, sE;
    oE = !1, sE = {};
    function Gx(e) {
      if (!e)
        return La;
      var t = ku(e), a = Sb(t);
      if (t.tag === k) {
        var i = t.type;
        if (al(i))
          return CC(t, i, a);
      }
      return a;
    }
    function HO(e, t) {
      {
        var a = ku(e);
        if (a === void 0) {
          if (typeof e.render == "function")
            throw new Error("Unable to find node on an unmounted component.");
          var i = Object.keys(e).join(",");
          throw new Error("Argument appears to not be a ReactComponent. Keys: " + i);
        }
        var u = Tr(a);
        if (u === null)
          return null;
        if (u.mode & At) {
          var s = at(a) || "Component";
          if (!sE[s]) {
            sE[s] = !0;
            var f = nr;
            try {
              Yt(u), a.mode & At ? h("%s is deprecated in StrictMode. %s was passed an instance of %s which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, s) : h("%s is deprecated in StrictMode. %s was passed an instance of %s which renders StrictMode children. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, s);
            } finally {
              f ? Yt(f) : nn();
            }
          }
        }
        return u.stateNode;
      }
    }
    function Kx(e, t, a, i, u, s, f, v) {
      var y = !1, C = null;
      return Wx(e, t, y, C, a, i, u, s, f);
    }
    function Xx(e, t, a, i, u, s, f, v, y, C) {
      var x = !0, z = Wx(a, i, x, e, u, s, f, v, y);
      z.context = Gx(null);
      var _ = z.current, $ = Gr(), Q = ro(_), q = nu($, Q);
      return q.callback = t ?? null, Ku(_, q, Q), Yk(z, Q, $), z;
    }
    function iv(e, t, a, i) {
      kd(t, e);
      var u = t.current, s = Gr(), f = ro(u);
      qt(f);
      var v = Gx(a);
      t.context === null ? t.context = v : t.pendingContext = v, zi && nr !== null && !oE && (oE = !0, h(`Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.

Check the render method of %s.`, at(nr) || "Unknown"));
      var y = nu(s, f);
      y.payload = {
        element: e
      }, i = i === void 0 ? null : i, i !== null && (typeof i != "function" && h("render(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", i), y.callback = i);
      var C = Ku(u, y, f);
      return C !== null && (Xn(C, u, f, s), Tm(C, u, f)), f;
    }
    function vy(e) {
      var t = e.current;
      if (!t.child)
        return null;
      switch (t.child.tag) {
        case D:
          return t.child.stateNode;
        default:
          return t.child.stateNode;
      }
    }
    function VO(e) {
      switch (e.tag) {
        case M: {
          var t = e.stateNode;
          if (Ic(t)) {
            var a = ch(t);
            Kk(t, a);
          }
          break;
        }
        case fe: {
          lu(function() {
            var u = pa(e, qe);
            if (u !== null) {
              var s = Gr();
              Xn(u, e, qe, s);
            }
          });
          var i = qe;
          cE(e, i);
          break;
        }
      }
    }
    function qx(e, t) {
      var a = e.memoizedState;
      a !== null && a.dehydrated !== null && (a.retryLane = hh(a.retryLane, t));
    }
    function cE(e, t) {
      qx(e, t);
      var a = e.alternate;
      a && qx(a, t);
    }
    function PO(e) {
      if (e.tag === fe) {
        var t = Yo, a = pa(e, t);
        if (a !== null) {
          var i = Gr();
          Xn(a, e, t, i);
        }
        cE(e, t);
      }
    }
    function jO(e) {
      if (e.tag === fe) {
        var t = ro(e), a = pa(e, t);
        if (a !== null) {
          var i = Gr();
          Xn(a, e, t, i);
        }
        cE(e, t);
      }
    }
    function Zx(e) {
      var t = Gt(e);
      return t === null ? null : t.stateNode;
    }
    var Jx = function(e) {
      return null;
    };
    function BO(e) {
      return Jx(e);
    }
    var ew = function(e) {
      return !1;
    };
    function IO(e) {
      return ew(e);
    }
    var tw = null, nw = null, rw = null, aw = null, iw = null, lw = null, uw = null, ow = null, sw = null;
    {
      var cw = function(e, t, a) {
        var i = t[a], u = Hn(e) ? e.slice() : ft({}, e);
        return a + 1 === t.length ? (Hn(u) ? u.splice(i, 1) : delete u[i], u) : (u[i] = cw(e[i], t, a + 1), u);
      }, fw = function(e, t) {
        return cw(e, t, 0);
      }, dw = function(e, t, a, i) {
        var u = t[i], s = Hn(e) ? e.slice() : ft({}, e);
        if (i + 1 === t.length) {
          var f = a[i];
          s[f] = s[u], Hn(s) ? s.splice(u, 1) : delete s[u];
        } else
          s[u] = dw(
            // $FlowFixMe number or string is fine here
            e[u],
            t,
            a,
            i + 1
          );
        return s;
      }, pw = function(e, t, a) {
        if (t.length !== a.length) {
          w("copyWithRename() expects paths of the same length");
          return;
        } else
          for (var i = 0; i < a.length - 1; i++)
            if (t[i] !== a[i]) {
              w("copyWithRename() expects paths to be the same except for the deepest key");
              return;
            }
        return dw(e, t, a, 0);
      }, vw = function(e, t, a, i) {
        if (a >= t.length)
          return i;
        var u = t[a], s = Hn(e) ? e.slice() : ft({}, e);
        return s[u] = vw(e[u], t, a + 1, i), s;
      }, hw = function(e, t, a) {
        return vw(e, t, 0, a);
      }, fE = function(e, t) {
        for (var a = e.memoizedState; a !== null && t > 0; )
          a = a.next, t--;
        return a;
      };
      tw = function(e, t, a, i) {
        var u = fE(e, t);
        if (u !== null) {
          var s = hw(u.memoizedState, a, i);
          u.memoizedState = s, u.baseState = s, e.memoizedProps = ft({}, e.memoizedProps);
          var f = pa(e, qe);
          f !== null && Xn(f, e, qe, Vt);
        }
      }, nw = function(e, t, a) {
        var i = fE(e, t);
        if (i !== null) {
          var u = fw(i.memoizedState, a);
          i.memoizedState = u, i.baseState = u, e.memoizedProps = ft({}, e.memoizedProps);
          var s = pa(e, qe);
          s !== null && Xn(s, e, qe, Vt);
        }
      }, rw = function(e, t, a, i) {
        var u = fE(e, t);
        if (u !== null) {
          var s = pw(u.memoizedState, a, i);
          u.memoizedState = s, u.baseState = s, e.memoizedProps = ft({}, e.memoizedProps);
          var f = pa(e, qe);
          f !== null && Xn(f, e, qe, Vt);
        }
      }, aw = function(e, t, a) {
        e.pendingProps = hw(e.memoizedProps, t, a), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var i = pa(e, qe);
        i !== null && Xn(i, e, qe, Vt);
      }, iw = function(e, t) {
        e.pendingProps = fw(e.memoizedProps, t), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var a = pa(e, qe);
        a !== null && Xn(a, e, qe, Vt);
      }, lw = function(e, t, a) {
        e.pendingProps = pw(e.memoizedProps, t, a), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var i = pa(e, qe);
        i !== null && Xn(i, e, qe, Vt);
      }, uw = function(e) {
        var t = pa(e, qe);
        t !== null && Xn(t, e, qe, Vt);
      }, ow = function(e) {
        Jx = e;
      }, sw = function(e) {
        ew = e;
      };
    }
    function $O(e) {
      var t = Tr(e);
      return t === null ? null : t.stateNode;
    }
    function YO(e) {
      return null;
    }
    function QO() {
      return nr;
    }
    function WO(e) {
      var t = e.findFiberByHostInstance, a = m.ReactCurrentDispatcher;
      return Lu({
        bundleType: e.bundleType,
        version: e.version,
        rendererPackageName: e.rendererPackageName,
        rendererConfig: e.rendererConfig,
        overrideHookState: tw,
        overrideHookStateDeletePath: nw,
        overrideHookStateRenamePath: rw,
        overrideProps: aw,
        overridePropsDeletePath: iw,
        overridePropsRenamePath: lw,
        setErrorHandler: ow,
        setSuspenseHandler: sw,
        scheduleUpdate: uw,
        currentDispatcherRef: a,
        findHostInstanceByFiber: $O,
        findFiberByHostInstance: t || YO,
        // React Refresh
        findHostInstancesForRefresh: xO,
        scheduleRefresh: CO,
        scheduleRoot: RO,
        setRefreshHandler: EO,
        // Enables DevTools to append owner stacks to error messages in DEV mode.
        getCurrentFiber: QO,
        // Enables DevTools to detect reconciler version rather than renderer version
        // which may not match for third party renderers.
        reconcilerVersion: uE
      });
    }
    var mw = typeof reportError == "function" ? (
      // In modern browsers, reportError will dispatch an error event,
      // emulating an uncaught JavaScript error.
      reportError
    ) : function(e) {
      console.error(e);
    };
    function dE(e) {
      this._internalRoot = e;
    }
    hy.prototype.render = dE.prototype.render = function(e) {
      var t = this._internalRoot;
      if (t === null)
        throw new Error("Cannot update an unmounted root.");
      {
        typeof arguments[1] == "function" ? h("render(...): does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().") : my(arguments[1]) ? h("You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root.") : typeof arguments[1] < "u" && h("You passed a second argument to root.render(...) but it only accepts one argument.");
        var a = t.containerInfo;
        if (a.nodeType !== hn) {
          var i = Zx(t.current);
          i && i.parentNode !== a && h("render(...): It looks like the React-rendered content of the root container was removed without using React. This is not supported and will cause errors. Instead, call root.unmount() to empty a root's container.");
        }
      }
      iv(e, t, null, null);
    }, hy.prototype.unmount = dE.prototype.unmount = function() {
      typeof arguments[0] == "function" && h("unmount(...): does not support a callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().");
      var e = this._internalRoot;
      if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        kx() && h("Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition."), lu(function() {
          iv(null, e, null, null);
        }), mC(t);
      }
    };
    function GO(e, t) {
      if (!my(e))
        throw new Error("createRoot(...): Target container is not a DOM element.");
      yw(e);
      var a = !1, i = !1, u = "", s = mw;
      t != null && (t.hydrate ? w("hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead.") : typeof t == "object" && t !== null && t.$$typeof === Ni && h(`You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:

  let root = createRoot(domContainer);
  root.render(<App />);`), t.unstable_strictMode === !0 && (a = !0), t.identifierPrefix !== void 0 && (u = t.identifierPrefix), t.onRecoverableError !== void 0 && (s = t.onRecoverableError), t.transitionCallbacks !== void 0 && t.transitionCallbacks);
      var f = Kx(e, cm, null, a, i, u, s);
      rm(f.current, e);
      var v = e.nodeType === hn ? e.parentNode : e;
      return fp(v), new dE(f);
    }
    function hy(e) {
      this._internalRoot = e;
    }
    function KO(e) {
      e && Th(e);
    }
    hy.prototype.unstable_scheduleHydration = KO;
    function XO(e, t, a) {
      if (!my(e))
        throw new Error("hydrateRoot(...): Target container is not a DOM element.");
      yw(e), t === void 0 && h("Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)");
      var i = a ?? null, u = a != null && a.hydratedSources || null, s = !1, f = !1, v = "", y = mw;
      a != null && (a.unstable_strictMode === !0 && (s = !0), a.identifierPrefix !== void 0 && (v = a.identifierPrefix), a.onRecoverableError !== void 0 && (y = a.onRecoverableError));
      var C = Xx(t, null, e, cm, i, s, f, v, y);
      if (rm(C.current, e), fp(e), u)
        for (var x = 0; x < u.length; x++) {
          var z = u[x];
          eD(C, z);
        }
      return new hy(C);
    }
    function my(e) {
      return !!(e && (e.nodeType === Cr || e.nodeType === oi || e.nodeType === pd));
    }
    function lv(e) {
      return !!(e && (e.nodeType === Cr || e.nodeType === oi || e.nodeType === pd || e.nodeType === hn && e.nodeValue === " react-mount-point-unstable "));
    }
    function yw(e) {
      e.nodeType === Cr && e.tagName && e.tagName.toUpperCase() === "BODY" && h("createRoot(): Creating roots directly with document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try using a container element created for your app."), Rp(e) && (e._reactRootContainer ? h("You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported.") : h("You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."));
    }
    var qO = m.ReactCurrentOwner, gw;
    gw = function(e) {
      if (e._reactRootContainer && e.nodeType !== hn) {
        var t = Zx(e._reactRootContainer.current);
        t && t.parentNode !== e && h("render(...): It looks like the React-rendered content of this container was removed without using React. This is not supported and will cause errors. Instead, call ReactDOM.unmountComponentAtNode to empty a container.");
      }
      var a = !!e._reactRootContainer, i = pE(e), u = !!(i && $u(i));
      u && !a && h("render(...): Replacing React-rendered children with a new root component. If you intended to update the children of this node, you should instead have the existing children update their state and render the new components instead of calling ReactDOM.render."), e.nodeType === Cr && e.tagName && e.tagName.toUpperCase() === "BODY" && h("render(): Rendering components directly into document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try rendering into a container element created for your app.");
    };
    function pE(e) {
      return e ? e.nodeType === oi ? e.documentElement : e.firstChild : null;
    }
    function Sw() {
    }
    function ZO(e, t, a, i, u) {
      if (u) {
        if (typeof i == "function") {
          var s = i;
          i = function() {
            var _ = vy(f);
            s.call(_);
          };
        }
        var f = Xx(
          t,
          i,
          e,
          Qu,
          null,
          // hydrationCallbacks
          !1,
          // isStrictMode
          !1,
          // concurrentUpdatesByDefaultOverride,
          "",
          // identifierPrefix
          Sw
        );
        e._reactRootContainer = f, rm(f.current, e);
        var v = e.nodeType === hn ? e.parentNode : e;
        return fp(v), lu(), f;
      } else {
        for (var y; y = e.lastChild; )
          e.removeChild(y);
        if (typeof i == "function") {
          var C = i;
          i = function() {
            var _ = vy(x);
            C.call(_);
          };
        }
        var x = Kx(
          e,
          Qu,
          null,
          // hydrationCallbacks
          !1,
          // isStrictMode
          !1,
          // concurrentUpdatesByDefaultOverride,
          "",
          // identifierPrefix
          Sw
        );
        e._reactRootContainer = x, rm(x.current, e);
        var z = e.nodeType === hn ? e.parentNode : e;
        return fp(z), lu(function() {
          iv(t, x, a, i);
        }), x;
      }
    }
    function JO(e, t) {
      e !== null && typeof e != "function" && h("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e);
    }
    function yy(e, t, a, i, u) {
      gw(a), JO(u === void 0 ? null : u, "render");
      var s = a._reactRootContainer, f;
      if (!s)
        f = ZO(a, t, e, u, i);
      else {
        if (f = s, typeof u == "function") {
          var v = u;
          u = function() {
            var y = vy(f);
            v.call(y);
          };
        }
        iv(t, f, e, u);
      }
      return vy(f);
    }
    var Ew = !1;
    function eM(e) {
      {
        Ew || (Ew = !0, h("findDOMNode is deprecated and will be removed in the next major release. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node"));
        var t = qO.current;
        if (t !== null && t.stateNode !== null) {
          var a = t.stateNode._warnedAboutRefsInRender;
          a || h("%s is accessing findDOMNode inside its render(). render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", zt(t.type) || "A component"), t.stateNode._warnedAboutRefsInRender = !0;
        }
      }
      return e == null ? null : e.nodeType === Cr ? e : HO(e, "findDOMNode");
    }
    function tM(e, t, a) {
      if (h("ReactDOM.hydrate is no longer supported in React 18. Use hydrateRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !lv(t))
        throw new Error("Target container is not a DOM element.");
      {
        var i = Rp(t) && t._reactRootContainer === void 0;
        i && h("You are calling ReactDOM.hydrate() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call hydrateRoot(container, element)?");
      }
      return yy(null, e, t, !0, a);
    }
    function nM(e, t, a) {
      if (h("ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !lv(t))
        throw new Error("Target container is not a DOM element.");
      {
        var i = Rp(t) && t._reactRootContainer === void 0;
        i && h("You are calling ReactDOM.render() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.render(element)?");
      }
      return yy(null, e, t, !1, a);
    }
    function rM(e, t, a, i) {
      if (h("ReactDOM.unstable_renderSubtreeIntoContainer() is no longer supported in React 18. Consider using a portal instead. Until you switch to the createRoot API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !lv(a))
        throw new Error("Target container is not a DOM element.");
      if (e == null || !cg(e))
        throw new Error("parentComponent must be a valid React Component");
      return yy(e, t, a, !1, i);
    }
    var Cw = !1;
    function aM(e) {
      if (Cw || (Cw = !0, h("unmountComponentAtNode is deprecated and will be removed in the next major release. Switch to the createRoot API. Learn more: https://reactjs.org/link/switch-to-createroot")), !lv(e))
        throw new Error("unmountComponentAtNode(...): Target container is not a DOM element.");
      {
        var t = Rp(e) && e._reactRootContainer === void 0;
        t && h("You are calling ReactDOM.unmountComponentAtNode() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.unmount()?");
      }
      if (e._reactRootContainer) {
        {
          var a = pE(e), i = a && !$u(a);
          i && h("unmountComponentAtNode(): The node you're attempting to unmount was rendered by another copy of React.");
        }
        return lu(function() {
          yy(null, null, e, !1, function() {
            e._reactRootContainer = null, mC(e);
          });
        }), !0;
      } else {
        {
          var u = pE(e), s = !!(u && $u(u)), f = e.nodeType === Cr && lv(e.parentNode) && !!e.parentNode._reactRootContainer;
          s && h("unmountComponentAtNode(): The node you're attempting to unmount was rendered by React and is not a top-level container. %s", f ? "You may have accidentally passed in a React root node instead of its container." : "Instead, have the parent component update its state and rerender in order to remove this component.");
        }
        return !1;
      }
    }
    Jn(VO), Au(PO), Ch(jO), ns(ca), Gd(gh), (typeof Map != "function" || // $FlowIssue Flow incorrectly thinks Map has no prototype
    Map.prototype == null || typeof Map.prototype.forEach != "function" || typeof Set != "function" || // $FlowIssue Flow incorrectly thinks Set has no prototype
    Set.prototype == null || typeof Set.prototype.clear != "function" || typeof Set.prototype.forEach != "function") && h("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"), lc(l1), sg($0, Xk, lu);
    function iM(e, t) {
      var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
      if (!my(t))
        throw new Error("Target container is not a DOM element.");
      return FO(e, t, null, a);
    }
    function lM(e, t, a, i) {
      return rM(e, t, a, i);
    }
    var vE = {
      usingClientEntryPoint: !1,
      // Keep in sync with ReactTestUtils.js.
      // This is an array for better minification.
      Events: [$u, sf, am, wu, uc, $0]
    };
    function uM(e, t) {
      return vE.usingClientEntryPoint || h('You are importing createRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), GO(e, t);
    }
    function oM(e, t, a) {
      return vE.usingClientEntryPoint || h('You are importing hydrateRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), XO(e, t, a);
    }
    function sM(e) {
      return kx() && h("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task."), lu(e);
    }
    var cM = WO({
      findFiberByHostInstance: ms,
      bundleType: 1,
      version: uE,
      rendererPackageName: "react-dom"
    });
    if (!cM && Ue && window.top === window.self && (navigator.userAgent.indexOf("Chrome") > -1 && navigator.userAgent.indexOf("Edge") === -1 || navigator.userAgent.indexOf("Firefox") > -1)) {
      var Rw = window.location.protocol;
      /^(https?|file):$/.test(Rw) && console.info("%cDownload the React DevTools for a better development experience: https://reactjs.org/link/react-devtools" + (Rw === "file:" ? `
You might need to use a local HTTP server (instead of file://): https://reactjs.org/link/react-devtools-faq` : ""), "font-weight:bold");
    }
    ga.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = vE, ga.createPortal = iM, ga.createRoot = uM, ga.findDOMNode = eM, ga.flushSync = sM, ga.hydrate = tM, ga.hydrateRoot = oM, ga.render = nM, ga.unmountComponentAtNode = aM, ga.unstable_batchedUpdates = $0, ga.unstable_renderSubtreeIntoContainer = lM, ga.version = uE, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  }()), ga;
}
var kw;
function zM() {
  if (kw) return gy.exports;
  kw = 1;
  function d() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) {
      if (process.env.NODE_ENV !== "production")
        throw new Error("^_^");
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(d);
      } catch (g) {
        console.error(g);
      }
    }
  }
  return process.env.NODE_ENV === "production" ? (d(), gy.exports = _M()) : gy.exports = NM(), gy.exports;
}
var fT = zM();
function Ow(d, g, m) {
  let {
    reference: E,
    floating: R
  } = d;
  const w = zs(g), h = HE(g), b = FE(h), L = fo(g), k = w === "y", U = E.x + E.width / 2 - R.width / 2, M = E.y + E.height / 2 - R.height / 2, A = E[b] / 2 - R[b] / 2;
  let D;
  switch (L) {
    case "top":
      D = {
        x: U,
        y: E.y - R.height
      };
      break;
    case "bottom":
      D = {
        x: U,
        y: E.y + E.height
      };
      break;
    case "right":
      D = {
        x: E.x + E.width,
        y: M
      };
      break;
    case "left":
      D = {
        x: E.x - R.width,
        y: M
      };
      break;
    default:
      D = {
        x: E.x,
        y: E.y
      };
  }
  switch (Vf(g)) {
    case "start":
      D[h] -= A * (m && k ? -1 : 1);
      break;
    case "end":
      D[h] += A * (m && k ? -1 : 1);
      break;
  }
  return D;
}
const AM = async (d, g, m) => {
  const {
    placement: E = "bottom",
    strategy: R = "absolute",
    middleware: w = [],
    platform: h
  } = m, b = w.filter(Boolean), L = await (h.isRTL == null ? void 0 : h.isRTL(g));
  let k = await h.getElementRects({
    reference: d,
    floating: g,
    strategy: R
  }), {
    x: U,
    y: M
  } = Ow(k, E, L), A = E, D = {}, F = 0;
  for (let H = 0; H < b.length; H++) {
    const {
      name: ne,
      fn: J
    } = b[H], {
      x: re,
      y: K,
      data: pe,
      reset: fe
    } = await J({
      x: U,
      y: M,
      initialPlacement: E,
      placement: A,
      strategy: R,
      middlewareData: D,
      rects: k,
      platform: h,
      elements: {
        reference: d,
        floating: g
      }
    });
    U = re ?? U, M = K ?? M, D = {
      ...D,
      [ne]: {
        ...D[ne],
        ...pe
      }
    }, fe && F <= 50 && (F++, typeof fe == "object" && (fe.placement && (A = fe.placement), fe.rects && (k = fe.rects === !0 ? await h.getElementRects({
      reference: d,
      floating: g,
      strategy: R
    }) : fe.rects), {
      x: U,
      y: M
    } = Ow(k, A, L)), H = -1);
  }
  return {
    x: U,
    y: M,
    placement: A,
    strategy: R,
    middlewareData: D
  };
};
async function VE(d, g) {
  var m;
  g === void 0 && (g = {});
  const {
    x: E,
    y: R,
    platform: w,
    rects: h,
    elements: b,
    strategy: L
  } = d, {
    boundary: k = "clippingAncestors",
    rootBoundary: U = "viewport",
    elementContext: M = "floating",
    altBoundary: A = !1,
    padding: D = 0
  } = Hf(g, d), F = sT(D), ne = b[A ? M === "floating" ? "reference" : "floating" : M], J = ky(await w.getClippingRect({
    element: (m = await (w.isElement == null ? void 0 : w.isElement(ne))) == null || m ? ne : ne.contextElement || await (w.getDocumentElement == null ? void 0 : w.getDocumentElement(b.floating)),
    boundary: k,
    rootBoundary: U,
    strategy: L
  })), re = M === "floating" ? {
    x: E,
    y: R,
    width: h.floating.width,
    height: h.floating.height
  } : h.reference, K = await (w.getOffsetParent == null ? void 0 : w.getOffsetParent(b.floating)), pe = await (w.isElement == null ? void 0 : w.isElement(K)) ? await (w.getScale == null ? void 0 : w.getScale(K)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, fe = ky(w.convertOffsetParentRelativeRectToViewportRelativeRect ? await w.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: b,
    rect: re,
    offsetParent: K,
    strategy: L
  }) : re);
  return {
    top: (J.top - fe.top + F.top) / pe.y,
    bottom: (fe.bottom - J.bottom + F.bottom) / pe.y,
    left: (J.left - fe.left + F.left) / pe.x,
    right: (fe.right - J.right + F.right) / pe.x
  };
}
const UM = (d) => ({
  name: "arrow",
  options: d,
  async fn(g) {
    const {
      x: m,
      y: E,
      placement: R,
      rects: w,
      platform: h,
      elements: b,
      middlewareData: L
    } = g, {
      element: k,
      padding: U = 0
    } = Hf(d, g) || {};
    if (k == null)
      return {};
    const M = sT(U), A = {
      x: m,
      y: E
    }, D = HE(R), F = FE(D), H = await h.getDimensions(k), ne = D === "y", J = ne ? "top" : "left", re = ne ? "bottom" : "right", K = ne ? "clientHeight" : "clientWidth", pe = w.reference[F] + w.reference[D] - A[D] - w.floating[F], fe = A[D] - w.reference[D], ke = await (h.getOffsetParent == null ? void 0 : h.getOffsetParent(k));
    let ve = ke ? ke[K] : 0;
    (!ve || !await (h.isElement == null ? void 0 : h.isElement(ke))) && (ve = b.floating[K] || w.floating[F]);
    const We = pe / 2 - fe / 2, Oe = ve / 2 - H[F] / 2 - 1, Ye = co(M[J], Oe), Ae = co(M[re], Oe), de = Ye, te = ve - H[F] - Ae, He = ve / 2 - H[F] / 2 + We, Ce = OE(de, He, te), oe = !L.arrow && Vf(R) != null && He !== Ce && w.reference[F] / 2 - (He < de ? Ye : Ae) - H[F] / 2 < 0, ye = oe ? He < de ? He - de : He - te : 0;
    return {
      [D]: A[D] + ye,
      data: {
        [D]: Ce,
        centerOffset: He - Ce - ye,
        ...oe && {
          alignmentOffset: ye
        }
      },
      reset: oe
    };
  }
}), FM = function(d) {
  return d === void 0 && (d = {}), {
    name: "flip",
    options: d,
    async fn(g) {
      var m, E;
      const {
        placement: R,
        middlewareData: w,
        rects: h,
        initialPlacement: b,
        platform: L,
        elements: k
      } = g, {
        mainAxis: U = !0,
        crossAxis: M = !0,
        fallbackPlacements: A,
        fallbackStrategy: D = "bestFit",
        fallbackAxisSideDirection: F = "none",
        flipAlignment: H = !0,
        ...ne
      } = Hf(d, g);
      if ((m = w.arrow) != null && m.alignmentOffset)
        return {};
      const J = fo(R), re = zs(b), K = fo(b) === b, pe = await (L.isRTL == null ? void 0 : L.isRTL(k.floating)), fe = A || (K || !H ? [Dy(b)] : bM(b)), ke = F !== "none";
      !A && ke && fe.push(...kM(b, H, F, pe));
      const ve = [b, ...fe], We = await VE(g, ne), Oe = [];
      let Ye = ((E = w.flip) == null ? void 0 : E.overflows) || [];
      if (U && Oe.push(We[J]), M) {
        const He = TM(R, h, pe);
        Oe.push(We[He[0]], We[He[1]]);
      }
      if (Ye = [...Ye, {
        placement: R,
        overflows: Oe
      }], !Oe.every((He) => He <= 0)) {
        var Ae, de;
        const He = (((Ae = w.flip) == null ? void 0 : Ae.index) || 0) + 1, Ce = ve[He];
        if (Ce)
          return {
            data: {
              index: He,
              overflows: Ye
            },
            reset: {
              placement: Ce
            }
          };
        let oe = (de = Ye.filter((ye) => ye.overflows[0] <= 0).sort((ye, I) => ye.overflows[1] - I.overflows[1])[0]) == null ? void 0 : de.placement;
        if (!oe)
          switch (D) {
            case "bestFit": {
              var te;
              const ye = (te = Ye.filter((I) => {
                if (ke) {
                  const X = zs(I.placement);
                  return X === re || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  X === "y";
                }
                return !0;
              }).map((I) => [I.placement, I.overflows.filter((X) => X > 0).reduce((X, G) => X + G, 0)]).sort((I, X) => I[1] - X[1])[0]) == null ? void 0 : te[0];
              ye && (oe = ye);
              break;
            }
            case "initialPlacement":
              oe = b;
              break;
          }
        if (R !== oe)
          return {
            reset: {
              placement: oe
            }
          };
      }
      return {};
    }
  };
};
async function HM(d, g) {
  const {
    placement: m,
    platform: E,
    elements: R
  } = d, w = await (E.isRTL == null ? void 0 : E.isRTL(R.floating)), h = fo(m), b = Vf(m), L = zs(m) === "y", k = ["left", "top"].includes(h) ? -1 : 1, U = w && L ? -1 : 1, M = Hf(g, d);
  let {
    mainAxis: A,
    crossAxis: D,
    alignmentAxis: F
  } = typeof M == "number" ? {
    mainAxis: M,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: M.mainAxis || 0,
    crossAxis: M.crossAxis || 0,
    alignmentAxis: M.alignmentAxis
  };
  return b && typeof F == "number" && (D = b === "end" ? F * -1 : F), L ? {
    x: D * U,
    y: A * k
  } : {
    x: A * k,
    y: D * U
  };
}
const VM = function(d) {
  return d === void 0 && (d = 0), {
    name: "offset",
    options: d,
    async fn(g) {
      var m, E;
      const {
        x: R,
        y: w,
        placement: h,
        middlewareData: b
      } = g, L = await HM(g, d);
      return h === ((m = b.offset) == null ? void 0 : m.placement) && (E = b.arrow) != null && E.alignmentOffset ? {} : {
        x: R + L.x,
        y: w + L.y,
        data: {
          ...L,
          placement: h
        }
      };
    }
  };
}, PM = function(d) {
  return d === void 0 && (d = {}), {
    name: "shift",
    options: d,
    async fn(g) {
      const {
        x: m,
        y: E,
        placement: R
      } = g, {
        mainAxis: w = !0,
        crossAxis: h = !1,
        limiter: b = {
          fn: (ne) => {
            let {
              x: J,
              y: re
            } = ne;
            return {
              x: J,
              y: re
            };
          }
        },
        ...L
      } = Hf(d, g), k = {
        x: m,
        y: E
      }, U = await VE(g, L), M = zs(fo(R)), A = oT(M);
      let D = k[A], F = k[M];
      if (w) {
        const ne = A === "y" ? "top" : "left", J = A === "y" ? "bottom" : "right", re = D + U[ne], K = D - U[J];
        D = OE(re, D, K);
      }
      if (h) {
        const ne = M === "y" ? "top" : "left", J = M === "y" ? "bottom" : "right", re = F + U[ne], K = F - U[J];
        F = OE(re, F, K);
      }
      const H = b.fn({
        ...g,
        [A]: D,
        [M]: F
      });
      return {
        ...H,
        data: {
          x: H.x - m,
          y: H.y - E,
          enabled: {
            [A]: w,
            [M]: h
          }
        }
      };
    }
  };
}, jM = function(d) {
  return d === void 0 && (d = {}), {
    name: "size",
    options: d,
    async fn(g) {
      var m, E;
      const {
        placement: R,
        rects: w,
        platform: h,
        elements: b
      } = g, {
        apply: L = () => {
        },
        ...k
      } = Hf(d, g), U = await VE(g, k), M = fo(R), A = Vf(R), D = zs(R) === "y", {
        width: F,
        height: H
      } = w.floating;
      let ne, J;
      M === "top" || M === "bottom" ? (ne = M, J = A === (await (h.isRTL == null ? void 0 : h.isRTL(b.floating)) ? "start" : "end") ? "left" : "right") : (J = M, ne = A === "end" ? "top" : "bottom");
      const re = H - U.top - U.bottom, K = F - U.left - U.right, pe = co(H - U[ne], re), fe = co(F - U[J], K), ke = !g.middlewareData.shift;
      let ve = pe, We = fe;
      if ((m = g.middlewareData.shift) != null && m.enabled.x && (We = K), (E = g.middlewareData.shift) != null && E.enabled.y && (ve = re), ke && !A) {
        const Ye = za(U.left, 0), Ae = za(U.right, 0), de = za(U.top, 0), te = za(U.bottom, 0);
        D ? We = F - 2 * (Ye !== 0 || Ae !== 0 ? Ye + Ae : za(U.left, U.right)) : ve = H - 2 * (de !== 0 || te !== 0 ? de + te : za(U.top, U.bottom));
      }
      await L({
        ...g,
        availableWidth: We,
        availableHeight: ve
      });
      const Oe = await h.getDimensions(b.floating);
      return F !== Oe.width || H !== Oe.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function dT(d) {
  const g = Ua(d);
  let m = parseFloat(g.width) || 0, E = parseFloat(g.height) || 0;
  const R = An(d), w = R ? d.offsetWidth : m, h = R ? d.offsetHeight : E, b = by(m) !== w || by(E) !== h;
  return b && (m = w, E = h), {
    width: m,
    height: E,
    $: b
  };
}
function PE(d) {
  return Wt(d) ? d : d.contextElement;
}
function Uf(d) {
  const g = PE(d);
  if (!An(g))
    return pl(1);
  const m = g.getBoundingClientRect(), {
    width: E,
    height: R,
    $: w
  } = dT(g);
  let h = (w ? by(m.width) : m.width) / E, b = (w ? by(m.height) : m.height) / R;
  return (!h || !Number.isFinite(h)) && (h = 1), (!b || !Number.isFinite(b)) && (b = 1), {
    x: h,
    y: b
  };
}
const BM = /* @__PURE__ */ pl(0);
function pT(d) {
  const g = Sa(d);
  return !zy() || !g.visualViewport ? BM : {
    x: g.visualViewport.offsetLeft,
    y: g.visualViewport.offsetTop
  };
}
function IM(d, g, m) {
  return g === void 0 && (g = !1), !m || g && m !== Sa(d) ? !1 : g;
}
function As(d, g, m, E) {
  g === void 0 && (g = !1), m === void 0 && (m = !1);
  const R = d.getBoundingClientRect(), w = PE(d);
  let h = pl(1);
  g && (E ? Wt(E) && (h = Uf(E)) : h = Uf(d));
  const b = IM(w, m, E) ? pT(w) : pl(0);
  let L = (R.left + b.x) / h.x, k = (R.top + b.y) / h.y, U = R.width / h.x, M = R.height / h.y;
  if (w) {
    const A = Sa(w), D = E && Wt(E) ? Sa(E) : E;
    let F = A, H = DE(F);
    for (; H && E && D !== F; ) {
      const ne = Uf(H), J = H.getBoundingClientRect(), re = Ua(H), K = J.left + (H.clientLeft + parseFloat(re.paddingLeft)) * ne.x, pe = J.top + (H.clientTop + parseFloat(re.paddingTop)) * ne.y;
      L *= ne.x, k *= ne.y, U *= ne.x, M *= ne.y, L += K, k += pe, F = Sa(H), H = DE(F);
    }
  }
  return ky({
    width: U,
    height: M,
    x: L,
    y: k
  });
}
function jE(d, g) {
  const m = Ay(d).scrollLeft;
  return g ? g.left + m : As(vl(d)).left + m;
}
function vT(d, g, m) {
  m === void 0 && (m = !1);
  const E = d.getBoundingClientRect(), R = E.left + g.scrollLeft - (m ? 0 : (
    // RTL <body> scrollbar.
    jE(d, E)
  )), w = E.top + g.scrollTop;
  return {
    x: R,
    y: w
  };
}
function $M(d) {
  let {
    elements: g,
    rect: m,
    offsetParent: E,
    strategy: R
  } = d;
  const w = R === "fixed", h = vl(E), b = g ? Ny(g.floating) : !1;
  if (E === h || b && w)
    return m;
  let L = {
    scrollLeft: 0,
    scrollTop: 0
  }, k = pl(1);
  const U = pl(0), M = An(E);
  if ((M || !M && !w) && ((po(E) !== "body" || dv(h)) && (L = Ay(E)), An(E))) {
    const D = As(E);
    k = Uf(E), U.x = D.x + E.clientLeft, U.y = D.y + E.clientTop;
  }
  const A = h && !M && !w ? vT(h, L, !0) : pl(0);
  return {
    width: m.width * k.x,
    height: m.height * k.y,
    x: m.x * k.x - L.scrollLeft * k.x + U.x + A.x,
    y: m.y * k.y - L.scrollTop * k.y + U.y + A.y
  };
}
function YM(d) {
  return Array.from(d.getClientRects());
}
function QM(d) {
  const g = vl(d), m = Ay(d), E = d.ownerDocument.body, R = za(g.scrollWidth, g.clientWidth, E.scrollWidth, E.clientWidth), w = za(g.scrollHeight, g.clientHeight, E.scrollHeight, E.clientHeight);
  let h = -m.scrollLeft + jE(d);
  const b = -m.scrollTop;
  return Ua(E).direction === "rtl" && (h += za(g.clientWidth, E.clientWidth) - R), {
    width: R,
    height: w,
    x: h,
    y: b
  };
}
function WM(d, g) {
  const m = Sa(d), E = vl(d), R = m.visualViewport;
  let w = E.clientWidth, h = E.clientHeight, b = 0, L = 0;
  if (R) {
    w = R.width, h = R.height;
    const k = zy();
    (!k || k && g === "fixed") && (b = R.offsetLeft, L = R.offsetTop);
  }
  return {
    width: w,
    height: h,
    x: b,
    y: L
  };
}
function GM(d, g) {
  const m = As(d, !0, g === "fixed"), E = m.top + d.clientTop, R = m.left + d.clientLeft, w = An(d) ? Uf(d) : pl(1), h = d.clientWidth * w.x, b = d.clientHeight * w.y, L = R * w.x, k = E * w.y;
  return {
    width: h,
    height: b,
    x: L,
    y: k
  };
}
function Mw(d, g, m) {
  let E;
  if (g === "viewport")
    E = WM(d, m);
  else if (g === "document")
    E = QM(vl(d));
  else if (Wt(g))
    E = GM(g, m);
  else {
    const R = pT(d);
    E = {
      x: g.x - R.x,
      y: g.y - R.y,
      width: g.width,
      height: g.height
    };
  }
  return ky(E);
}
function hT(d, g) {
  const m = cu(d);
  return m === g || !Wt(m) || su(m) ? !1 : Ua(m).position === "fixed" || hT(m, g);
}
function KM(d, g) {
  const m = g.get(d);
  if (m)
    return m;
  let E = uo(d, [], !1).filter((b) => Wt(b) && po(b) !== "body"), R = null;
  const w = Ua(d).position === "fixed";
  let h = w ? cu(d) : d;
  for (; Wt(h) && !su(h); ) {
    const b = Ua(h), L = zE(h);
    !L && b.position === "fixed" && (R = null), (w ? !L && !R : !L && b.position === "static" && !!R && ["absolute", "fixed"].includes(R.position) || dv(h) && !L && hT(d, h)) ? E = E.filter((U) => U !== h) : R = b, h = cu(h);
  }
  return g.set(d, E), E;
}
function XM(d) {
  let {
    element: g,
    boundary: m,
    rootBoundary: E,
    strategy: R
  } = d;
  const h = [...m === "clippingAncestors" ? Ny(g) ? [] : KM(g, this._c) : [].concat(m), E], b = h[0], L = h.reduce((k, U) => {
    const M = Mw(g, U, R);
    return k.top = za(M.top, k.top), k.right = co(M.right, k.right), k.bottom = co(M.bottom, k.bottom), k.left = za(M.left, k.left), k;
  }, Mw(g, b, R));
  return {
    width: L.right - L.left,
    height: L.bottom - L.top,
    x: L.left,
    y: L.top
  };
}
function qM(d) {
  const {
    width: g,
    height: m
  } = dT(d);
  return {
    width: g,
    height: m
  };
}
function ZM(d, g, m) {
  const E = An(g), R = vl(g), w = m === "fixed", h = As(d, !0, w, g);
  let b = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const L = pl(0);
  if (E || !E && !w)
    if ((po(g) !== "body" || dv(R)) && (b = Ay(g)), E) {
      const A = As(g, !0, w, g);
      L.x = A.x + g.clientLeft, L.y = A.y + g.clientTop;
    } else R && (L.x = jE(R));
  const k = R && !E && !w ? vT(R, b) : pl(0), U = h.left + b.scrollLeft - L.x - k.x, M = h.top + b.scrollTop - L.y - k.y;
  return {
    x: U,
    y: M,
    width: h.width,
    height: h.height
  };
}
function gE(d) {
  return Ua(d).position === "static";
}
function Lw(d, g) {
  if (!An(d) || Ua(d).position === "fixed")
    return null;
  if (g)
    return g(d);
  let m = d.offsetParent;
  return vl(d) === m && (m = m.ownerDocument.body), m;
}
function mT(d, g) {
  const m = Sa(d);
  if (Ny(d))
    return m;
  if (!An(d)) {
    let R = cu(d);
    for (; R && !su(R); ) {
      if (Wt(R) && !gE(R))
        return R;
      R = cu(R);
    }
    return m;
  }
  let E = Lw(d, g);
  for (; E && mM(E) && gE(E); )
    E = Lw(E, g);
  return E && su(E) && gE(E) && !zE(E) ? m : E || yM(d) || m;
}
const JM = async function(d) {
  const g = this.getOffsetParent || mT, m = this.getDimensions, E = await m(d.floating);
  return {
    reference: ZM(d.reference, await g(d.floating), d.strategy),
    floating: {
      x: 0,
      y: 0,
      width: E.width,
      height: E.height
    }
  };
};
function eL(d) {
  return Ua(d).direction === "rtl";
}
const tL = {
  convertOffsetParentRelativeRectToViewportRelativeRect: $M,
  getDocumentElement: vl,
  getClippingRect: XM,
  getOffsetParent: mT,
  getElementRects: JM,
  getClientRects: YM,
  getDimensions: qM,
  getScale: Uf,
  isElement: Wt,
  isRTL: eL
};
function yT(d, g) {
  return d.x === g.x && d.y === g.y && d.width === g.width && d.height === g.height;
}
function nL(d, g) {
  let m = null, E;
  const R = vl(d);
  function w() {
    var b;
    clearTimeout(E), (b = m) == null || b.disconnect(), m = null;
  }
  function h(b, L) {
    b === void 0 && (b = !1), L === void 0 && (L = 1), w();
    const k = d.getBoundingClientRect(), {
      left: U,
      top: M,
      width: A,
      height: D
    } = k;
    if (b || g(), !A || !D)
      return;
    const F = Af(M), H = Af(R.clientWidth - (U + A)), ne = Af(R.clientHeight - (M + D)), J = Af(U), K = {
      rootMargin: -F + "px " + -H + "px " + -ne + "px " + -J + "px",
      threshold: za(0, co(1, L)) || 1
    };
    let pe = !0;
    function fe(ke) {
      const ve = ke[0].intersectionRatio;
      if (ve !== L) {
        if (!pe)
          return h();
        ve ? h(!1, ve) : E = setTimeout(() => {
          h(!1, 1e-7);
        }, 1e3);
      }
      ve === 1 && !yT(k, d.getBoundingClientRect()) && h(), pe = !1;
    }
    try {
      m = new IntersectionObserver(fe, {
        ...K,
        // Handle <iframe>s
        root: R.ownerDocument
      });
    } catch {
      m = new IntersectionObserver(fe, K);
    }
    m.observe(d);
  }
  return h(!0), w;
}
function YL(d, g, m, E) {
  E === void 0 && (E = {});
  const {
    ancestorScroll: R = !0,
    ancestorResize: w = !0,
    elementResize: h = typeof ResizeObserver == "function",
    layoutShift: b = typeof IntersectionObserver == "function",
    animationFrame: L = !1
  } = E, k = PE(d), U = R || w ? [...k ? uo(k) : [], ...uo(g)] : [];
  U.forEach((J) => {
    R && J.addEventListener("scroll", m, {
      passive: !0
    }), w && J.addEventListener("resize", m);
  });
  const M = k && b ? nL(k, m) : null;
  let A = -1, D = null;
  h && (D = new ResizeObserver((J) => {
    let [re] = J;
    re && re.target === k && D && (D.unobserve(g), cancelAnimationFrame(A), A = requestAnimationFrame(() => {
      var K;
      (K = D) == null || K.observe(g);
    })), m();
  }), k && !L && D.observe(k), D.observe(g));
  let F, H = L ? As(d) : null;
  L && ne();
  function ne() {
    const J = As(d);
    H && !yT(H, J) && m(), H = J, F = requestAnimationFrame(ne);
  }
  return m(), () => {
    var J;
    U.forEach((re) => {
      R && re.removeEventListener("scroll", m), w && re.removeEventListener("resize", m);
    }), M == null || M(), (J = D) == null || J.disconnect(), D = null, L && cancelAnimationFrame(F);
  };
}
const rL = VM, aL = PM, iL = FM, lL = jM, _w = UM, uL = (d, g, m) => {
  const E = /* @__PURE__ */ new Map(), R = {
    platform: tL,
    ...m
  }, w = {
    ...R.platform,
    _c: E
  };
  return AM(d, g, {
    ...R,
    platform: w
  });
};
var xy = typeof document < "u" ? Jw : eT;
function Oy(d, g) {
  if (d === g)
    return !0;
  if (typeof d != typeof g)
    return !1;
  if (typeof d == "function" && d.toString() === g.toString())
    return !0;
  let m, E, R;
  if (d && g && typeof d == "object") {
    if (Array.isArray(d)) {
      if (m = d.length, m !== g.length) return !1;
      for (E = m; E-- !== 0; )
        if (!Oy(d[E], g[E]))
          return !1;
      return !0;
    }
    if (R = Object.keys(d), m = R.length, m !== Object.keys(g).length)
      return !1;
    for (E = m; E-- !== 0; )
      if (!{}.hasOwnProperty.call(g, R[E]))
        return !1;
    for (E = m; E-- !== 0; ) {
      const w = R[E];
      if (!(w === "_owner" && d.$$typeof) && !Oy(d[w], g[w]))
        return !1;
    }
    return !0;
  }
  return d !== d && g !== g;
}
function gT(d) {
  return typeof window > "u" ? 1 : (d.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Nw(d, g) {
  const m = gT(d);
  return Math.round(g * m) / m;
}
function SE(d) {
  const g = W.useRef(d);
  return xy(() => {
    g.current = d;
  }), g;
}
function oL(d) {
  d === void 0 && (d = {});
  const {
    placement: g = "bottom",
    strategy: m = "absolute",
    middleware: E = [],
    platform: R,
    elements: {
      reference: w,
      floating: h
    } = {},
    transform: b = !0,
    whileElementsMounted: L,
    open: k
  } = d, [U, M] = W.useState({
    x: 0,
    y: 0,
    strategy: m,
    placement: g,
    middlewareData: {},
    isPositioned: !1
  }), [A, D] = W.useState(E);
  Oy(A, E) || D(E);
  const [F, H] = W.useState(null), [ne, J] = W.useState(null), re = W.useCallback((I) => {
    I !== ke.current && (ke.current = I, H(I));
  }, []), K = W.useCallback((I) => {
    I !== ve.current && (ve.current = I, J(I));
  }, []), pe = w || F, fe = h || ne, ke = W.useRef(null), ve = W.useRef(null), We = W.useRef(U), Oe = L != null, Ye = SE(L), Ae = SE(R), de = SE(k), te = W.useCallback(() => {
    if (!ke.current || !ve.current)
      return;
    const I = {
      placement: g,
      strategy: m,
      middleware: A
    };
    Ae.current && (I.platform = Ae.current), uL(ke.current, ve.current, I).then((X) => {
      const G = {
        ...X,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: de.current !== !1
      };
      He.current && !Oy(We.current, G) && (We.current = G, fT.flushSync(() => {
        M(G);
      }));
    });
  }, [A, g, m, Ae, de]);
  xy(() => {
    k === !1 && We.current.isPositioned && (We.current.isPositioned = !1, M((I) => ({
      ...I,
      isPositioned: !1
    })));
  }, [k]);
  const He = W.useRef(!1);
  xy(() => (He.current = !0, () => {
    He.current = !1;
  }), []), xy(() => {
    if (pe && (ke.current = pe), fe && (ve.current = fe), pe && fe) {
      if (Ye.current)
        return Ye.current(pe, fe, te);
      te();
    }
  }, [pe, fe, te, Ye, Oe]);
  const Ce = W.useMemo(() => ({
    reference: ke,
    floating: ve,
    setReference: re,
    setFloating: K
  }), [re, K]), oe = W.useMemo(() => ({
    reference: pe,
    floating: fe
  }), [pe, fe]), ye = W.useMemo(() => {
    const I = {
      position: m,
      left: 0,
      top: 0
    };
    if (!oe.floating)
      return I;
    const X = Nw(oe.floating, U.x), G = Nw(oe.floating, U.y);
    return b ? {
      ...I,
      transform: "translate(" + X + "px, " + G + "px)",
      ...gT(oe.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: m,
      left: X,
      top: G
    };
  }, [m, b, oe.floating, U.x, U.y]);
  return W.useMemo(() => ({
    ...U,
    update: te,
    refs: Ce,
    elements: oe,
    floatingStyles: ye
  }), [U, te, Ce, oe, ye]);
}
const sL = (d) => {
  function g(m) {
    return {}.hasOwnProperty.call(m, "current");
  }
  return {
    name: "arrow",
    options: d,
    fn(m) {
      const {
        element: E,
        padding: R
      } = typeof d == "function" ? d(m) : d;
      return E && g(E) ? E.current != null ? _w({
        element: E.current,
        padding: R
      }).fn(m) : {} : E ? _w({
        element: E,
        padding: R
      }).fn(m) : {};
    }
  };
}, QL = (d, g) => ({
  ...rL(d),
  options: [d, g]
}), WL = (d, g) => ({
  ...aL(d),
  options: [d, g]
}), GL = (d, g) => ({
  ...iL(d),
  options: [d, g]
}), KL = (d, g) => ({
  ...lL(d),
  options: [d, g]
}), XL = (d, g) => ({
  ...sL(d),
  options: [d, g]
});
function qL(d) {
  const g = W.useRef(void 0), m = W.useCallback((E) => {
    const R = d.map((w) => {
      if (w != null) {
        if (typeof w == "function") {
          const h = w, b = h(E);
          return typeof b == "function" ? b : () => {
            h(null);
          };
        }
        return w.current = E, () => {
          w.current = null;
        };
      }
    });
    return () => {
      R.forEach((w) => w == null ? void 0 : w());
    };
  }, d);
  return W.useMemo(() => d.every((E) => E == null) ? null : (E) => {
    g.current && (g.current(), g.current = void 0), E != null && (g.current = m(E));
  }, d);
}
const ST = {
  ...W
}, cL = ST.useInsertionEffect, fL = cL || ((d) => d());
function Zr(d) {
  const g = W.useRef(() => {
    if (process.env.NODE_ENV !== "production")
      throw new Error("Cannot call an event handler while rendering.");
  });
  return fL(() => {
    g.current = d;
  }), W.useCallback(function() {
    for (var m = arguments.length, E = new Array(m), R = 0; R < m; R++)
      E[R] = arguments[R];
    return g.current == null ? void 0 : g.current(...E);
  }, []);
}
const BE = "ArrowUp", pv = "ArrowDown", oo = "ArrowLeft", so = "ArrowRight";
function Ey(d, g, m) {
  return Math.floor(d / g) !== m;
}
function ov(d, g) {
  return g < 0 || g >= d.current.length;
}
function EE(d, g) {
  return Fr(d, {
    disabledIndices: g
  });
}
function zw(d, g) {
  return Fr(d, {
    decrement: !0,
    startingIndex: d.current.length,
    disabledIndices: g
  });
}
function Fr(d, g) {
  let {
    startingIndex: m = -1,
    decrement: E = !1,
    disabledIndices: R,
    amount: w = 1
  } = g === void 0 ? {} : g;
  const h = d.current;
  let b = m;
  do
    b += E ? -w : w;
  while (b >= 0 && b <= h.length - 1 && wy(h, b, R));
  return b;
}
function dL(d, g) {
  let {
    event: m,
    orientation: E,
    loop: R,
    rtl: w,
    cols: h,
    disabledIndices: b,
    minIndex: L,
    maxIndex: k,
    prevIndex: U,
    stopEvent: M = !1
  } = g, A = U;
  if (m.key === BE) {
    if (M && qr(m), U === -1)
      A = k;
    else if (A = Fr(d, {
      startingIndex: A,
      amount: h,
      decrement: !0,
      disabledIndices: b
    }), R && (U - h < L || A < 0)) {
      const D = U % h, F = k % h, H = k - (F - D);
      F === D ? A = k : A = F > D ? H : H - h;
    }
    ov(d, A) && (A = U);
  }
  if (m.key === pv && (M && qr(m), U === -1 ? A = L : (A = Fr(d, {
    startingIndex: U,
    amount: h,
    disabledIndices: b
  }), R && U + h > k && (A = Fr(d, {
    startingIndex: U % h - h,
    amount: h,
    disabledIndices: b
  }))), ov(d, A) && (A = U)), E === "both") {
    const D = Af(U / h);
    m.key === (w ? oo : so) && (M && qr(m), U % h !== h - 1 ? (A = Fr(d, {
      startingIndex: U,
      disabledIndices: b
    }), R && Ey(A, h, D) && (A = Fr(d, {
      startingIndex: U - U % h - 1,
      disabledIndices: b
    }))) : R && (A = Fr(d, {
      startingIndex: U - U % h - 1,
      disabledIndices: b
    })), Ey(A, h, D) && (A = U)), m.key === (w ? so : oo) && (M && qr(m), U % h !== 0 ? (A = Fr(d, {
      startingIndex: U,
      decrement: !0,
      disabledIndices: b
    }), R && Ey(A, h, D) && (A = Fr(d, {
      startingIndex: U + (h - U % h),
      decrement: !0,
      disabledIndices: b
    }))) : R && (A = Fr(d, {
      startingIndex: U + (h - U % h),
      decrement: !0,
      disabledIndices: b
    })), Ey(A, h, D) && (A = U));
    const F = Af(k / h) === D;
    ov(d, A) && (R && F ? A = m.key === (w ? so : oo) ? k : Fr(d, {
      startingIndex: U - U % h - 1,
      disabledIndices: b
    }) : A = U);
  }
  return A;
}
function pL(d, g, m) {
  const E = [];
  let R = 0;
  return d.forEach((w, h) => {
    let {
      width: b,
      height: L
    } = w;
    if (b > g && process.env.NODE_ENV !== "production")
      throw new Error("[Floating UI]: Invalid grid - item width at index " + h + " is greater than grid columns");
    let k = !1;
    for (m && (R = 0); !k; ) {
      const U = [];
      for (let M = 0; M < b; M++)
        for (let A = 0; A < L; A++)
          U.push(R + M + A * g);
      R % g + b <= g && U.every((M) => E[M] == null) ? (U.forEach((M) => {
        E[M] = h;
      }), k = !0) : R++;
    }
  }), [...E];
}
function vL(d, g, m, E, R) {
  if (d === -1) return -1;
  const w = m.indexOf(d), h = g[d];
  switch (R) {
    case "tl":
      return w;
    case "tr":
      return h ? w + h.width - 1 : w;
    case "bl":
      return h ? w + (h.height - 1) * E : w;
    case "br":
      return m.lastIndexOf(d);
  }
}
function hL(d, g) {
  return g.flatMap((m, E) => d.includes(m) ? [E] : []);
}
function wy(d, g, m) {
  if (m)
    return m.includes(g);
  const E = d[g];
  return E == null || E.hasAttribute("disabled") || E.getAttribute("aria-disabled") === "true";
}
var an = typeof document < "u" ? Jw : eT;
function mL(d, g) {
  const m = d.compareDocumentPosition(g);
  return m & Node.DOCUMENT_POSITION_FOLLOWING || m & Node.DOCUMENT_POSITION_CONTAINED_BY ? -1 : m & Node.DOCUMENT_POSITION_PRECEDING || m & Node.DOCUMENT_POSITION_CONTAINS ? 1 : 0;
}
const ET = /* @__PURE__ */ W.createContext({
  register: () => {
  },
  unregister: () => {
  },
  map: /* @__PURE__ */ new Map(),
  elementsRef: {
    current: []
  }
});
function ZL(d) {
  const {
    children: g,
    elementsRef: m,
    labelsRef: E
  } = d, [R, w] = W.useState(() => /* @__PURE__ */ new Set()), h = W.useCallback((k) => {
    w((U) => new Set(U).add(k));
  }, []), b = W.useCallback((k) => {
    w((U) => {
      const M = new Set(U);
      return M.delete(k), M;
    });
  }, []), L = W.useMemo(() => {
    const k = /* @__PURE__ */ new Map();
    return Array.from(R.keys()).sort(mL).forEach((M, A) => {
      k.set(M, A);
    }), k;
  }, [R]);
  return /* @__PURE__ */ Aa(ET.Provider, {
    value: W.useMemo(() => ({
      register: h,
      unregister: b,
      map: L,
      elementsRef: m,
      labelsRef: E
    }), [h, b, L, m, E]),
    children: g
  });
}
function JL(d) {
  d === void 0 && (d = {});
  const {
    label: g
  } = d, {
    register: m,
    unregister: E,
    map: R,
    elementsRef: w,
    labelsRef: h
  } = W.useContext(ET), [b, L] = W.useState(null), k = W.useRef(null), U = W.useCallback((M) => {
    if (k.current = M, b !== null && (w.current[b] = M, h)) {
      var A;
      const D = g !== void 0;
      h.current[b] = D ? g : (A = M == null ? void 0 : M.textContent) != null ? A : null;
    }
  }, [b, w, h, g]);
  return an(() => {
    const M = k.current;
    if (M)
      return m(M), () => {
        E(M);
      };
  }, [m, E]), an(() => {
    const M = k.current ? R.get(k.current) : null;
    M != null && L(M);
  }, [R]), W.useMemo(() => ({
    ref: U,
    index: b ?? -1
  }), [b, U]);
}
let Aw = !1, yL = 0;
const Uw = () => (
  // Ensure the id is unique with multiple independent versions of Floating UI
  // on <React 18
  "floating-ui-" + Math.random().toString(36).slice(2, 6) + yL++
);
function gL() {
  const [d, g] = W.useState(() => Aw ? Uw() : void 0);
  return an(() => {
    d == null && g(Uw());
  }, []), W.useEffect(() => {
    Aw = !0;
  }, []), d;
}
const SL = ST.useId, Uy = SL || gL;
let fv;
process.env.NODE_ENV !== "production" && (fv = /* @__PURE__ */ new Set());
function Ty() {
  for (var d, g = arguments.length, m = new Array(g), E = 0; E < g; E++)
    m[E] = arguments[E];
  const R = "Floating UI: " + m.join(" ");
  if (!((d = fv) != null && d.has(R))) {
    var w;
    (w = fv) == null || w.add(R), console.warn(R);
  }
}
function EL() {
  for (var d, g = arguments.length, m = new Array(g), E = 0; E < g; E++)
    m[E] = arguments[E];
  const R = "Floating UI: " + m.join(" ");
  if (!((d = fv) != null && d.has(R))) {
    var w;
    (w = fv) == null || w.add(R), console.error(R);
  }
}
const e_ = /* @__PURE__ */ W.forwardRef(function(g, m) {
  const {
    context: {
      placement: E,
      elements: {
        floating: R
      },
      middlewareData: {
        arrow: w,
        shift: h
      }
    },
    width: b = 14,
    height: L = 7,
    tipRadius: k = 0,
    strokeWidth: U = 0,
    staticOffset: M,
    stroke: A,
    d: D,
    style: {
      transform: F,
      ...H
    } = {},
    ...ne
  } = g;
  process.env.NODE_ENV !== "production" && (m || Ty("The `ref` prop is required for `FloatingArrow`."));
  const J = Uy(), [re, K] = W.useState(!1);
  if (an(() => {
    if (!R) return;
    Ua(R).direction === "rtl" && K(!0);
  }, [R]), !R)
    return null;
  const [pe, fe] = E.split("-"), ke = pe === "top" || pe === "bottom";
  let ve = M;
  (ke && h != null && h.x || !ke && h != null && h.y) && (ve = null);
  const We = U * 2, Oe = We / 2, Ye = b / 2 * (k / -8 + 1), Ae = L / 2 * k / 4, de = !!D, te = ve && fe === "end" ? "bottom" : "top";
  let He = ve && fe === "end" ? "right" : "left";
  ve && re && (He = fe === "end" ? "left" : "right");
  const Ce = (w == null ? void 0 : w.x) != null ? ve || w.x : "", oe = (w == null ? void 0 : w.y) != null ? ve || w.y : "", ye = D || "M0,0" + (" H" + b) + (" L" + (b - Ye) + "," + (L - Ae)) + (" Q" + b / 2 + "," + L + " " + Ye + "," + (L - Ae)) + " Z", I = {
    top: de ? "rotate(180deg)" : "",
    left: de ? "rotate(90deg)" : "rotate(-90deg)",
    bottom: de ? "" : "rotate(180deg)",
    right: de ? "rotate(-90deg)" : "rotate(90deg)"
  }[pe];
  return /* @__PURE__ */ NE("svg", {
    ...ne,
    "aria-hidden": !0,
    ref: m,
    width: de ? b : b + We,
    height: b,
    viewBox: "0 0 " + b + " " + (L > b ? L : b),
    style: {
      position: "absolute",
      pointerEvents: "none",
      [He]: Ce,
      [te]: oe,
      [pe]: ke || de ? "100%" : "calc(100% - " + We / 2 + "px)",
      transform: [I, F].filter((X) => !!X).join(" "),
      ...H
    },
    children: [We > 0 && /* @__PURE__ */ Aa("path", {
      clipPath: "url(#" + J + ")",
      fill: "none",
      stroke: A,
      strokeWidth: We + (D ? 0 : 1),
      d: ye
    }), /* @__PURE__ */ Aa("path", {
      stroke: We && !D ? ne.fill : "none",
      d: ye
    }), /* @__PURE__ */ Aa("clipPath", {
      id: J,
      children: /* @__PURE__ */ Aa("rect", {
        x: -Oe,
        y: Oe * (de ? -1 : 1),
        width: b + We,
        height: b
      })
    })]
  });
});
function CL() {
  const d = /* @__PURE__ */ new Map();
  return {
    emit(g, m) {
      var E;
      (E = d.get(g)) == null || E.forEach((R) => R(m));
    },
    on(g, m) {
      d.set(g, [...d.get(g) || [], m]);
    },
    off(g, m) {
      var E;
      d.set(g, ((E = d.get(g)) == null ? void 0 : E.filter((R) => R !== m)) || []);
    }
  };
}
const RL = /* @__PURE__ */ W.createContext(null), xL = /* @__PURE__ */ W.createContext(null), Fy = () => {
  var d;
  return ((d = W.useContext(RL)) == null ? void 0 : d.id) || null;
}, vv = () => W.useContext(xL);
function Us(d) {
  return "data-floating-ui-" + d;
}
function ri(d) {
  d.current !== -1 && (clearTimeout(d.current), d.current = -1);
}
function Li(d) {
  const g = pM(d);
  return an(() => {
    g.current = d;
  }), g;
}
const Fw = /* @__PURE__ */ Us("safe-polygon");
function CE(d, g, m) {
  return m && !cv(m) ? 0 : typeof d == "number" ? d : d == null ? void 0 : d[g];
}
function t_(d, g) {
  g === void 0 && (g = {});
  const {
    open: m,
    onOpenChange: E,
    dataRef: R,
    events: w,
    elements: h
  } = d, {
    enabled: b = !0,
    delay: L = 0,
    handleClose: k = null,
    mouseOnly: U = !1,
    restMs: M = 0,
    move: A = !0
  } = g, D = vv(), F = Fy(), H = Li(k), ne = Li(L), J = Li(m), re = W.useRef(), K = W.useRef(-1), pe = W.useRef(), fe = W.useRef(-1), ke = W.useRef(!0), ve = W.useRef(!1), We = W.useRef(() => {
  }), Oe = W.useRef(!1), Ye = W.useCallback(() => {
    var ye;
    const I = (ye = R.current.openEvent) == null ? void 0 : ye.type;
    return (I == null ? void 0 : I.includes("mouse")) && I !== "mousedown";
  }, [R]);
  W.useEffect(() => {
    if (!b) return;
    function ye(I) {
      let {
        open: X
      } = I;
      X || (ri(K), ri(fe), ke.current = !0, Oe.current = !1);
    }
    return w.on("openchange", ye), () => {
      w.off("openchange", ye);
    };
  }, [b, w]), W.useEffect(() => {
    if (!b || !H.current || !m) return;
    function ye(X) {
      Ye() && E(!1, X, "hover");
    }
    const I = yr(h.floating).documentElement;
    return I.addEventListener("mouseleave", ye), () => {
      I.removeEventListener("mouseleave", ye);
    };
  }, [h.floating, m, E, b, H, Ye]);
  const Ae = W.useCallback(function(ye, I, X) {
    I === void 0 && (I = !0), X === void 0 && (X = "hover");
    const G = CE(ne.current, "close", re.current);
    G && !pe.current ? (ri(K), K.current = window.setTimeout(() => E(!1, ye, X), G)) : I && (ri(K), E(!1, ye, X));
  }, [ne, E]), de = Zr(() => {
    We.current(), pe.current = void 0;
  }), te = Zr(() => {
    if (ve.current) {
      const ye = yr(h.floating).body;
      ye.style.pointerEvents = "", ye.removeAttribute(Fw), ve.current = !1;
    }
  }), He = Zr(() => R.current.openEvent ? ["click", "mousedown"].includes(R.current.openEvent.type) : !1);
  W.useEffect(() => {
    if (!b) return;
    function ye(he) {
      if (ri(K), ke.current = !1, U && !cv(re.current) || M > 0 && !CE(ne.current, "open"))
        return;
      const Me = CE(ne.current, "open", re.current);
      Me ? K.current = window.setTimeout(() => {
        J.current || E(!0, he, "hover");
      }, Me) : m || E(!0, he, "hover");
    }
    function I(he) {
      if (He()) return;
      We.current();
      const Me = yr(h.floating);
      if (ri(fe), Oe.current = !1, H.current && R.current.floatingContext) {
        m || ri(K), pe.current = H.current({
          ...R.current.floatingContext,
          tree: D,
          x: he.clientX,
          y: he.clientY,
          onClose() {
            te(), de(), He() || Ae(he, !0, "safe-polygon");
          }
        });
        const Mt = pe.current;
        Me.addEventListener("mousemove", Mt), We.current = () => {
          Me.removeEventListener("mousemove", Mt);
        };
        return;
      }
      (re.current === "touch" ? !mr(h.floating, he.relatedTarget) : !0) && Ae(he);
    }
    function X(he) {
      He() || R.current.floatingContext && (H.current == null || H.current({
        ...R.current.floatingContext,
        tree: D,
        x: he.clientX,
        y: he.clientY,
        onClose() {
          te(), de(), He() || Ae(he);
        }
      })(he));
    }
    if (Wt(h.domReference)) {
      var G;
      const he = h.domReference;
      return m && he.addEventListener("mouseleave", X), (G = h.floating) == null || G.addEventListener("mouseleave", X), A && he.addEventListener("mousemove", ye, {
        once: !0
      }), he.addEventListener("mouseenter", ye), he.addEventListener("mouseleave", I), () => {
        var Me;
        m && he.removeEventListener("mouseleave", X), (Me = h.floating) == null || Me.removeEventListener("mouseleave", X), A && he.removeEventListener("mousemove", ye), he.removeEventListener("mouseenter", ye), he.removeEventListener("mouseleave", I);
      };
    }
  }, [h, b, d, U, M, A, Ae, de, te, E, m, J, D, ne, H, R, He]), an(() => {
    var ye;
    if (b && m && (ye = H.current) != null && ye.__options.blockPointerEvents && Ye()) {
      ve.current = !0;
      const X = h.floating;
      if (Wt(h.domReference) && X) {
        var I;
        const G = yr(h.floating).body;
        G.setAttribute(Fw, "");
        const he = h.domReference, Me = D == null || (I = D.nodesRef.current.find((Bt) => Bt.id === F)) == null || (I = I.context) == null ? void 0 : I.elements.floating;
        return Me && (Me.style.pointerEvents = ""), G.style.pointerEvents = "none", he.style.pointerEvents = "auto", X.style.pointerEvents = "auto", () => {
          G.style.pointerEvents = "", he.style.pointerEvents = "", X.style.pointerEvents = "";
        };
      }
    }
  }, [b, m, F, h, D, H, Ye]), an(() => {
    m || (re.current = void 0, Oe.current = !1, de(), te());
  }, [m, de, te]), W.useEffect(() => () => {
    de(), ri(K), ri(fe), te();
  }, [b, h.domReference, de, te]);
  const Ce = W.useMemo(() => {
    function ye(I) {
      re.current = I.pointerType;
    }
    return {
      onPointerDown: ye,
      onPointerEnter: ye,
      onMouseMove(I) {
        const {
          nativeEvent: X
        } = I;
        function G() {
          !ke.current && !J.current && E(!0, X, "hover");
        }
        U && !cv(re.current) || m || M === 0 || Oe.current && I.movementX ** 2 + I.movementY ** 2 < 2 || (ri(fe), re.current === "touch" ? G() : (Oe.current = !0, fe.current = window.setTimeout(G, M)));
      }
    };
  }, [U, E, m, J, M]), oe = W.useMemo(() => ({
    onMouseEnter() {
      ri(K);
    },
    onMouseLeave(ye) {
      He() || Ae(ye.nativeEvent, !1);
    }
  }), [Ae, He]);
  return W.useMemo(() => b ? {
    reference: Ce,
    floating: oe
  } : {}, [b, Ce, oe]);
}
let Hw = 0;
function _s(d, g) {
  g === void 0 && (g = {});
  const {
    preventScroll: m = !1,
    cancelPrevious: E = !0,
    sync: R = !1
  } = g;
  E && cancelAnimationFrame(Hw);
  const w = () => d == null ? void 0 : d.focus({
    preventScroll: m
  });
  R ? w() : Hw = requestAnimationFrame(w);
}
function Vw(d, g) {
  var m;
  let E = [], R = (m = d.find((w) => w.id === g)) == null ? void 0 : m.parentId;
  for (; R; ) {
    const w = d.find((h) => h.id === R);
    R = w == null ? void 0 : w.parentId, w && (E = E.concat(w));
  }
  return E;
}
function Ff(d, g) {
  let m = d.filter((R) => {
    var w;
    return R.parentId === g && ((w = R.context) == null ? void 0 : w.open);
  }), E = m;
  for (; E.length; )
    E = d.filter((R) => {
      var w;
      return (w = E) == null ? void 0 : w.some((h) => {
        var b;
        return R.parentId === h.id && ((b = R.context) == null ? void 0 : b.open);
      });
    }), m = m.concat(E);
  return m;
}
function wL(d, g) {
  let m, E = -1;
  function R(w, h) {
    h > E && (m = w, E = h), Ff(d, w).forEach((L) => {
      R(L.id, h + 1);
    });
  }
  return R(g, 0), d.find((w) => w.id === m);
}
let zf = /* @__PURE__ */ new WeakMap(), Cy = /* @__PURE__ */ new WeakSet(), Ry = {}, RE = 0;
const TL = () => typeof HTMLElement < "u" && "inert" in HTMLElement.prototype, CT = (d) => d && (d.host || CT(d.parentNode)), bL = (d, g) => g.map((m) => {
  if (d.contains(m))
    return m;
  const E = CT(m);
  return d.contains(E) ? E : null;
}).filter((m) => m != null);
function DL(d, g, m, E) {
  const R = "data-floating-ui-inert", w = E ? "inert" : m ? "aria-hidden" : null, h = bL(g, d), b = /* @__PURE__ */ new Set(), L = new Set(h), k = [];
  Ry[R] || (Ry[R] = /* @__PURE__ */ new WeakMap());
  const U = Ry[R];
  h.forEach(M), A(g), b.clear();
  function M(D) {
    !D || b.has(D) || (b.add(D), D.parentNode && M(D.parentNode));
  }
  function A(D) {
    !D || L.has(D) || [].forEach.call(D.children, (F) => {
      if (po(F) !== "script")
        if (b.has(F))
          A(F);
        else {
          const H = w ? F.getAttribute(w) : null, ne = H !== null && H !== "false", J = zf.get(F) || 0, re = w ? J + 1 : J, K = (U.get(F) || 0) + 1;
          zf.set(F, re), U.set(F, K), k.push(F), re === 1 && ne && Cy.add(F), K === 1 && F.setAttribute(R, ""), !ne && w && F.setAttribute(w, "true");
        }
    });
  }
  return RE++, () => {
    k.forEach((D) => {
      const F = zf.get(D) || 0, H = w ? F - 1 : F, ne = (U.get(D) || 0) - 1;
      zf.set(D, H), U.set(D, ne), H || (!Cy.has(D) && w && D.removeAttribute(w), Cy.delete(D)), ne || D.removeAttribute(R);
    }), RE--, RE || (zf = /* @__PURE__ */ new WeakMap(), zf = /* @__PURE__ */ new WeakMap(), Cy = /* @__PURE__ */ new WeakSet(), Ry = {});
  };
}
function Pw(d, g, m) {
  g === void 0 && (g = !1), m === void 0 && (m = !1);
  const E = yr(d[0]).body;
  return DL(d.concat(Array.from(E.querySelectorAll("[aria-live]"))), E, g, m);
}
const Hy = () => ({
  getShadowRoot: !0,
  displayCheck: (
    // JSDOM does not support the `tabbable` library. To solve this we can
    // check if `ResizeObserver` is a real function (not polyfilled), which
    // determines if the current environment is JSDOM-like.
    typeof ResizeObserver == "function" && ResizeObserver.toString().includes("[native code]") ? "full" : "none"
  )
});
function RT(d, g) {
  const m = Ly(d, Hy());
  g === "prev" && m.reverse();
  const E = m.indexOf(Mi(yr(d)));
  return m.slice(E + 1)[0];
}
function xT() {
  return RT(document.body, "next");
}
function wT() {
  return RT(document.body, "prev");
}
function sv(d, g) {
  const m = g || d.currentTarget, E = d.relatedTarget;
  return !E || !mr(m, E);
}
function kL(d) {
  Ly(d, Hy()).forEach((m) => {
    m.dataset.tabindex = m.getAttribute("tabindex") || "", m.setAttribute("tabindex", "-1");
  });
}
function jw(d) {
  d.querySelectorAll("[data-tabindex]").forEach((m) => {
    const E = m.dataset.tabindex;
    delete m.dataset.tabindex, E ? m.setAttribute("tabindex", E) : m.removeAttribute("tabindex");
  });
}
const Vy = {
  border: 0,
  clip: "rect(0 0 0 0)",
  height: "1px",
  margin: "-1px",
  overflow: "hidden",
  padding: 0,
  position: "fixed",
  whiteSpace: "nowrap",
  width: "1px",
  top: 0,
  left: 0
}, My = /* @__PURE__ */ W.forwardRef(function(g, m) {
  const [E, R] = W.useState();
  an(() => {
    lT() && R("button");
  }, []);
  const w = {
    ref: m,
    tabIndex: 0,
    // Role is only for VoiceOver
    role: E,
    "aria-hidden": E ? void 0 : !0,
    [Us("focus-guard")]: "",
    style: Vy
  };
  return /* @__PURE__ */ Aa("span", {
    ...g,
    ...w
  });
}), TT = /* @__PURE__ */ W.createContext(null), Bw = /* @__PURE__ */ Us("portal");
function OL(d) {
  d === void 0 && (d = {});
  const {
    id: g,
    root: m
  } = d, E = Uy(), R = bT(), [w, h] = W.useState(null), b = W.useRef(null);
  return an(() => () => {
    w == null || w.remove(), queueMicrotask(() => {
      b.current = null;
    });
  }, [w]), an(() => {
    if (!E || b.current) return;
    const L = g ? document.getElementById(g) : null;
    if (!L) return;
    const k = document.createElement("div");
    k.id = E, k.setAttribute(Bw, ""), L.appendChild(k), b.current = k, h(k);
  }, [g, E]), an(() => {
    if (m === null || !E || b.current) return;
    let L = m || (R == null ? void 0 : R.portalNode);
    L && !Wt(L) && (L = L.current), L = L || document.body;
    let k = null;
    g && (k = document.createElement("div"), k.id = g, L.appendChild(k));
    const U = document.createElement("div");
    U.id = E, U.setAttribute(Bw, ""), L = k || L, L.appendChild(U), b.current = U, h(U);
  }, [g, m, E, R]), w;
}
function n_(d) {
  const {
    children: g,
    id: m,
    root: E,
    preserveTabOrder: R = !0
  } = d, w = OL({
    id: m,
    root: E
  }), [h, b] = W.useState(null), L = W.useRef(null), k = W.useRef(null), U = W.useRef(null), M = W.useRef(null), A = h == null ? void 0 : h.modal, D = h == null ? void 0 : h.open, F = (
    // The FocusManager and therefore floating element are currently open/
    // rendered.
    !!h && // Guards are only for non-modal focus management.
    !h.modal && // Don't render if unmount is transitioning.
    h.open && R && !!(E || w)
  );
  return W.useEffect(() => {
    if (!w || !R || A)
      return;
    function H(ne) {
      w && sv(ne) && (ne.type === "focusin" ? jw : kL)(w);
    }
    return w.addEventListener("focusin", H, !0), w.addEventListener("focusout", H, !0), () => {
      w.removeEventListener("focusin", H, !0), w.removeEventListener("focusout", H, !0);
    };
  }, [w, R, A]), W.useEffect(() => {
    w && (D || jw(w));
  }, [D, w]), /* @__PURE__ */ NE(TT.Provider, {
    value: W.useMemo(() => ({
      preserveTabOrder: R,
      beforeOutsideRef: L,
      afterOutsideRef: k,
      beforeInsideRef: U,
      afterInsideRef: M,
      portalNode: w,
      setFocusManagerState: b
    }), [R, w]),
    children: [F && w && /* @__PURE__ */ Aa(My, {
      "data-type": "outside",
      ref: L,
      onFocus: (H) => {
        if (sv(H, w)) {
          var ne;
          (ne = U.current) == null || ne.focus();
        } else {
          const J = wT() || (h == null ? void 0 : h.domReference);
          J == null || J.focus();
        }
      }
    }), F && w && /* @__PURE__ */ Aa("span", {
      "aria-owns": w.id,
      style: Vy
    }), w && /* @__PURE__ */ fT.createPortal(g, w), F && w && /* @__PURE__ */ Aa(My, {
      "data-type": "outside",
      ref: k,
      onFocus: (H) => {
        if (sv(H, w)) {
          var ne;
          (ne = M.current) == null || ne.focus();
        } else {
          const J = xT() || (h == null ? void 0 : h.domReference);
          J == null || J.focus(), h != null && h.closeOnFocusOut && (h == null || h.onOpenChange(!1, H.nativeEvent, "focus-out"));
        }
      }
    })]
  });
}
const bT = () => W.useContext(TT), LE = "data-floating-ui-focusable";
function _E(d) {
  return d ? d.hasAttribute(LE) ? d : d.querySelector("[" + LE + "]") || d : null;
}
function Iw(d) {
  return W.useMemo(() => (g) => {
    d.forEach((m) => {
      m && (m.current = g);
    });
  }, d);
}
const ML = 20;
let Ns = [];
function LL(d) {
  Ns = Ns.filter((g) => g.isConnected), d && po(d) !== "body" && (Ns.push(d), Ns.length > ML && (Ns = Ns.slice(-20)));
}
function $w() {
  return Ns.slice().reverse().find((d) => d.isConnected);
}
function _L(d) {
  const g = Hy();
  return hM(d, g) ? d : Ly(d, g)[0] || d;
}
const NL = /* @__PURE__ */ W.forwardRef(function(g, m) {
  return /* @__PURE__ */ Aa("button", {
    ...g,
    type: "button",
    ref: m,
    tabIndex: -1,
    style: Vy
  });
});
function r_(d) {
  const {
    context: g,
    children: m,
    disabled: E = !1,
    order: R = ["content"],
    guards: w = !0,
    initialFocus: h = 0,
    returnFocus: b = !0,
    restoreFocus: L = !1,
    modal: k = !0,
    visuallyHiddenDismiss: U = !1,
    closeOnFocusOut: M = !0,
    outsideElementsInert: A = !1
  } = d, {
    open: D,
    onOpenChange: F,
    events: H,
    dataRef: ne,
    elements: {
      domReference: J,
      floating: re
    }
  } = g, K = Zr(() => {
    var Ke;
    return (Ke = ne.current.floatingContext) == null ? void 0 : Ke.nodeId;
  }), pe = typeof h == "number" && h < 0, fe = uT(J) && pe, ke = TL(), ve = ke ? w : !0, We = !ve || ke && A, Oe = Li(R), Ye = Li(h), Ae = Li(b), de = vv(), te = bT(), He = W.useRef(null), Ce = W.useRef(null), oe = W.useRef(!1), ye = W.useRef(!1), I = W.useRef(-1), X = te != null, G = _E(re), he = Zr(function(Ke) {
    return Ke === void 0 && (Ke = G), Ke ? Ly(Ke, Hy()) : [];
  }), Me = Zr((Ke) => {
    const rt = he(Ke);
    return Oe.current.map((Ue) => J && Ue === "reference" ? J : G && Ue === "floating" ? G : rt).filter(Boolean).flat();
  });
  W.useEffect(() => {
    if (E || !k) return;
    function Ke(Ue) {
      if (Ue.key === "Tab") {
        mr(G, Mi(yr(G))) && he().length === 0 && !fe && qr(Ue);
        const et = Me(), st = lo(Ue);
        Oe.current[0] === "reference" && st === J && (qr(Ue), Ue.shiftKey ? _s(et[et.length - 1]) : _s(et[1])), Oe.current[1] === "floating" && st === G && Ue.shiftKey && (qr(Ue), _s(et[0]));
      }
    }
    const rt = yr(G);
    return rt.addEventListener("keydown", Ke), () => {
      rt.removeEventListener("keydown", Ke);
    };
  }, [E, J, G, k, Oe, fe, he, Me]), W.useEffect(() => {
    if (E || !re) return;
    function Ke(rt) {
      const Ue = lo(rt), st = he().indexOf(Ue);
      st !== -1 && (I.current = st);
    }
    return re.addEventListener("focusin", Ke), () => {
      re.removeEventListener("focusin", Ke);
    };
  }, [E, re, he]), W.useEffect(() => {
    if (E || !M) return;
    function Ke() {
      ye.current = !0, setTimeout(() => {
        ye.current = !1;
      });
    }
    function rt(Ue) {
      const et = Ue.relatedTarget;
      queueMicrotask(() => {
        const st = K(), dt = !(mr(J, et) || mr(re, et) || mr(et, re) || mr(te == null ? void 0 : te.portalNode, et) || et != null && et.hasAttribute(Us("focus-guard")) || de && (Ff(de.nodesRef.current, st).find((pt) => {
          var gt, vn;
          return mr((gt = pt.context) == null ? void 0 : gt.elements.floating, et) || mr((vn = pt.context) == null ? void 0 : vn.elements.domReference, et);
        }) || Vw(de.nodesRef.current, st).find((pt) => {
          var gt, vn, Mn;
          return [(gt = pt.context) == null ? void 0 : gt.elements.floating, _E((vn = pt.context) == null ? void 0 : vn.elements.floating)].includes(et) || ((Mn = pt.context) == null ? void 0 : Mn.elements.domReference) === et;
        })));
        if (L && dt && Mi(yr(G)) === yr(G).body) {
          An(G) && G.focus();
          const pt = I.current, gt = he(), vn = gt[pt] || gt[gt.length - 1] || G;
          An(vn) && vn.focus();
        }
        (fe || !k) && et && dt && !ye.current && // Fix React 18 Strict Mode returnFocus due to double rendering.
        et !== $w() && (oe.current = !0, F(!1, Ue, "focus-out"));
      });
    }
    if (re && An(J))
      return J.addEventListener("focusout", rt), J.addEventListener("pointerdown", Ke), re.addEventListener("focusout", rt), () => {
        J.removeEventListener("focusout", rt), J.removeEventListener("pointerdown", Ke), re.removeEventListener("focusout", rt);
      };
  }, [E, J, re, G, k, de, te, F, M, L, he, fe, K]);
  const Bt = W.useRef(null), Mt = W.useRef(null), gr = Iw([Bt, te == null ? void 0 : te.beforeInsideRef]), Et = Iw([Mt, te == null ? void 0 : te.afterInsideRef]);
  W.useEffect(() => {
    var Ke;
    if (E || !re) return;
    const rt = Array.from((te == null || (Ke = te.portalNode) == null ? void 0 : Ke.querySelectorAll("[" + Us("portal") + "]")) || []), Ue = de && !k ? Vw(de == null ? void 0 : de.nodesRef.current, K()).map((dt) => {
      var pt;
      return (pt = dt.context) == null ? void 0 : pt.elements.floating;
    }) : [], et = [re, ...rt, ...Ue, He.current, Ce.current, Bt.current, Mt.current, te == null ? void 0 : te.beforeOutsideRef.current, te == null ? void 0 : te.afterOutsideRef.current, Oe.current.includes("reference") || fe ? J : null].filter((dt) => dt != null), st = k || fe ? Pw(et, !We, We) : Pw(et);
    return () => {
      st();
    };
  }, [E, J, re, k, Oe, te, fe, ve, We, de, K]), an(() => {
    if (E || !An(G)) return;
    const Ke = yr(G), rt = Mi(Ke);
    queueMicrotask(() => {
      const Ue = Me(G), et = Ye.current, st = (typeof et == "number" ? Ue[et] : et.current) || G, dt = mr(G, rt);
      !pe && !dt && D && _s(st, {
        preventScroll: st === G
      });
    });
  }, [E, D, G, pe, Me, Ye]), an(() => {
    if (E || !G) return;
    let Ke = !1, rt = !1;
    const Ue = yr(G), et = Mi(Ue);
    let dt = ne.current.openEvent;
    LL(et);
    function pt(Mn) {
      let {
        open: Xe,
        reason: lt,
        event: Re,
        nested: Ve
      } = Mn;
      if (Xe && (dt = Re), lt === "escape-key" && (rt = !0), ["hover", "safe-polygon"].includes(lt) && Re.type === "mouseleave" && (oe.current = !0), lt === "outside-press")
        if (Ve)
          oe.current = !1, Ke = !0;
        else if (iT(Re) || AE(Re))
          oe.current = !1;
        else {
          let Lt = !1;
          document.createElement("div").focus({
            get preventScroll() {
              return Lt = !0, !1;
            }
          }), Lt ? (oe.current = !1, Ke = !0) : oe.current = !0;
        }
    }
    H.on("openchange", pt);
    const gt = Ue.createElement("span");
    gt.setAttribute("tabindex", "-1"), gt.setAttribute("aria-hidden", "true"), Object.assign(gt.style, Vy), X && J && J.insertAdjacentElement("afterend", gt);
    function vn() {
      return typeof Ae.current == "boolean" ? rt && J ? J : $w() || gt : Ae.current.current || gt;
    }
    return () => {
      H.off("openchange", pt);
      const Mn = Mi(Ue), Xe = mr(re, Mn) || de && Ff(de.nodesRef.current, K()).some((Re) => {
        var Ve;
        return mr((Ve = Re.context) == null ? void 0 : Ve.elements.floating, Mn);
      });
      (Xe || dt && ["click", "mousedown"].includes(dt.type)) && (rt = !0);
      const lt = vn();
      queueMicrotask(() => {
        const Re = _L(lt);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        Ae.current && !oe.current && An(Re) && // If the focus moved somewhere else after mount, avoid returning focus
        // since it likely entered a different element which should be
        // respected: https://github.com/floating-ui/floating-ui/issues/2607
        (!(Re !== Mn && Mn !== Ue.body) || Xe) && Re.focus({
          preventScroll: Ke
        }), gt.remove();
      });
    };
  }, [E, re, G, Ae, ne, H, de, X, J, K]), W.useEffect(() => {
    queueMicrotask(() => {
      oe.current = !1;
    });
  }, [E]), an(() => {
    if (!E && te)
      return te.setFocusManagerState({
        modal: k,
        closeOnFocusOut: M,
        open: D,
        onOpenChange: F,
        domReference: J
      }), () => {
        te.setFocusManagerState(null);
      };
  }, [E, te, k, D, F, M, J]), an(() => {
    if (E || !G || typeof MutationObserver != "function" || pe) return;
    const Ke = () => {
      const Ue = G.getAttribute("tabindex"), et = he(), st = Mi(yr(re)), dt = et.indexOf(st);
      dt !== -1 && (I.current = dt), Oe.current.includes("floating") || st !== J && et.length === 0 ? Ue !== "0" && G.setAttribute("tabindex", "0") : Ue !== "-1" && G.setAttribute("tabindex", "-1");
    };
    Ke();
    const rt = new MutationObserver(Ke);
    return rt.observe(G, {
      childList: !0,
      subtree: !0,
      attributes: !0
    }), () => {
      rt.disconnect();
    };
  }, [E, re, G, J, Oe, he, pe]);
  function bt(Ke) {
    return E || !U || !k ? null : /* @__PURE__ */ Aa(NL, {
      ref: Ke === "start" ? He : Ce,
      onClick: (rt) => F(!1, rt.nativeEvent),
      children: typeof U == "string" ? U : "Dismiss"
    });
  }
  const Pt = !E && ve && (k ? !fe : !0) && (X || k);
  return /* @__PURE__ */ NE(vM, {
    children: [Pt && /* @__PURE__ */ Aa(My, {
      "data-type": "inside",
      ref: gr,
      onFocus: (Ke) => {
        if (k) {
          const Ue = Me();
          _s(R[0] === "reference" ? Ue[0] : Ue[Ue.length - 1]);
        } else if (te != null && te.preserveTabOrder && te.portalNode)
          if (oe.current = !1, sv(Ke, te.portalNode)) {
            const Ue = xT() || J;
            Ue == null || Ue.focus();
          } else {
            var rt;
            (rt = te.beforeOutsideRef.current) == null || rt.focus();
          }
      }
    }), !fe && bt("start"), m, bt("end"), Pt && /* @__PURE__ */ Aa(My, {
      "data-type": "inside",
      ref: Et,
      onFocus: (Ke) => {
        if (k)
          _s(Me()[0]);
        else if (te != null && te.preserveTabOrder && te.portalNode)
          if (M && (oe.current = !0), sv(Ke, te.portalNode)) {
            const Ue = wT() || J;
            Ue == null || Ue.focus();
          } else {
            var rt;
            (rt = te.afterOutsideRef.current) == null || rt.focus();
          }
      }
    })]
  });
}
function Yw(d) {
  return An(d.target) && d.target.tagName === "BUTTON";
}
function Qw(d) {
  return UE(d);
}
function a_(d, g) {
  g === void 0 && (g = {});
  const {
    open: m,
    onOpenChange: E,
    dataRef: R,
    elements: {
      domReference: w
    }
  } = d, {
    enabled: h = !0,
    event: b = "click",
    toggle: L = !0,
    ignoreMouse: k = !1,
    keyboardHandlers: U = !0,
    stickIfOpen: M = !0
  } = g, A = W.useRef(), D = W.useRef(!1), F = W.useMemo(() => ({
    onPointerDown(H) {
      A.current = H.pointerType;
    },
    onMouseDown(H) {
      const ne = A.current;
      H.button === 0 && b !== "click" && (cv(ne, !0) && k || (m && L && (!(R.current.openEvent && M) || R.current.openEvent.type === "mousedown") ? E(!1, H.nativeEvent, "click") : (H.preventDefault(), E(!0, H.nativeEvent, "click"))));
    },
    onClick(H) {
      const ne = A.current;
      if (b === "mousedown" && A.current) {
        A.current = void 0;
        return;
      }
      cv(ne, !0) && k || (m && L && (!(R.current.openEvent && M) || R.current.openEvent.type === "click") ? E(!1, H.nativeEvent, "click") : E(!0, H.nativeEvent, "click"));
    },
    onKeyDown(H) {
      A.current = void 0, !(H.defaultPrevented || !U || Yw(H)) && (H.key === " " && !Qw(w) && (H.preventDefault(), D.current = !0), H.key === "Enter" && E(!(m && L), H.nativeEvent, "click"));
    },
    onKeyUp(H) {
      H.defaultPrevented || !U || Yw(H) || Qw(w) || H.key === " " && D.current && (D.current = !1, E(!(m && L), H.nativeEvent, "click"));
    }
  }), [R, w, b, k, U, E, m, M, L]);
  return W.useMemo(() => h ? {
    reference: F
  } : {}, [h, F]);
}
const zL = {
  pointerdown: "onPointerDown",
  mousedown: "onMouseDown",
  click: "onClick"
}, AL = {
  pointerdown: "onPointerDownCapture",
  mousedown: "onMouseDownCapture",
  click: "onClickCapture"
}, Ww = (d) => {
  var g, m;
  return {
    escapeKey: typeof d == "boolean" ? d : (g = d == null ? void 0 : d.escapeKey) != null ? g : !1,
    outsidePress: typeof d == "boolean" ? d : (m = d == null ? void 0 : d.outsidePress) != null ? m : !0
  };
};
function i_(d, g) {
  g === void 0 && (g = {});
  const {
    open: m,
    onOpenChange: E,
    elements: R,
    dataRef: w
  } = d, {
    enabled: h = !0,
    escapeKey: b = !0,
    outsidePress: L = !0,
    outsidePressEvent: k = "pointerdown",
    referencePress: U = !1,
    referencePressEvent: M = "pointerdown",
    ancestorScroll: A = !1,
    bubbles: D,
    capture: F
  } = g, H = vv(), ne = Zr(typeof L == "function" ? L : () => !1), J = typeof L == "function" ? ne : L, re = W.useRef(!1), K = W.useRef(!1), {
    escapeKey: pe,
    outsidePress: fe
  } = Ww(D), {
    escapeKey: ke,
    outsidePress: ve
  } = Ww(F), We = W.useRef(!1), Oe = Zr((Ce) => {
    var oe;
    if (!m || !h || !b || Ce.key !== "Escape" || We.current)
      return;
    const ye = (oe = w.current.floatingContext) == null ? void 0 : oe.nodeId, I = H ? Ff(H.nodesRef.current, ye) : [];
    if (!pe && (Ce.stopPropagation(), I.length > 0)) {
      let X = !0;
      if (I.forEach((G) => {
        var he;
        if ((he = G.context) != null && he.open && !G.context.dataRef.current.__escapeKeyBubbles) {
          X = !1;
          return;
        }
      }), !X)
        return;
    }
    E(!1, EM(Ce) ? Ce.nativeEvent : Ce, "escape-key");
  }), Ye = Zr((Ce) => {
    var oe;
    const ye = () => {
      var I;
      Oe(Ce), (I = lo(Ce)) == null || I.removeEventListener("keydown", ye);
    };
    (oe = lo(Ce)) == null || oe.addEventListener("keydown", ye);
  }), Ae = Zr((Ce) => {
    var oe;
    const ye = re.current;
    re.current = !1;
    const I = K.current;
    if (K.current = !1, k === "click" && I || ye || typeof J == "function" && !J(Ce))
      return;
    const X = lo(Ce), G = "[" + Us("inert") + "]", he = yr(R.floating).querySelectorAll(G);
    let Me = Wt(X) ? X : null;
    for (; Me && !su(Me); ) {
      const Et = cu(Me);
      if (su(Et) || !Wt(Et))
        break;
      Me = Et;
    }
    if (he.length && Wt(X) && !CM(X) && // Clicked on a direct ancestor (e.g. FloatingOverlay).
    !mr(X, R.floating) && // If the target root element contains none of the markers, then the
    // element was injected after the floating element rendered.
    Array.from(he).every((Et) => !mr(Me, Et)))
      return;
    if (An(X) && He) {
      const Et = su(X), bt = Ua(X), Pt = /auto|scroll/, Ke = Et || Pt.test(bt.overflowX), rt = Et || Pt.test(bt.overflowY), Ue = Ke && X.clientWidth > 0 && X.scrollWidth > X.clientWidth, et = rt && X.clientHeight > 0 && X.scrollHeight > X.clientHeight, st = bt.direction === "rtl", dt = et && (st ? Ce.offsetX <= X.offsetWidth - X.clientWidth : Ce.offsetX > X.clientWidth), pt = Ue && Ce.offsetY > X.clientHeight;
      if (dt || pt)
        return;
    }
    const Bt = (oe = w.current.floatingContext) == null ? void 0 : oe.nodeId, Mt = H && Ff(H.nodesRef.current, Bt).some((Et) => {
      var bt;
      return hE(Ce, (bt = Et.context) == null ? void 0 : bt.elements.floating);
    });
    if (hE(Ce, R.floating) || hE(Ce, R.domReference) || Mt)
      return;
    const gr = H ? Ff(H.nodesRef.current, Bt) : [];
    if (gr.length > 0) {
      let Et = !0;
      if (gr.forEach((bt) => {
        var Pt;
        if ((Pt = bt.context) != null && Pt.open && !bt.context.dataRef.current.__outsidePressBubbles) {
          Et = !1;
          return;
        }
      }), !Et)
        return;
    }
    E(!1, Ce, "outside-press");
  }), de = Zr((Ce) => {
    var oe;
    const ye = () => {
      var I;
      Ae(Ce), (I = lo(Ce)) == null || I.removeEventListener(k, ye);
    };
    (oe = lo(Ce)) == null || oe.addEventListener(k, ye);
  });
  W.useEffect(() => {
    if (!m || !h)
      return;
    w.current.__escapeKeyBubbles = pe, w.current.__outsidePressBubbles = fe;
    let Ce = -1;
    function oe(he) {
      E(!1, he, "ancestor-scroll");
    }
    function ye() {
      window.clearTimeout(Ce), We.current = !0;
    }
    function I() {
      Ce = window.setTimeout(
        () => {
          We.current = !1;
        },
        // 0ms or 1ms don't work in Safari. 5ms appears to consistently work.
        // Only apply to WebKit for the test to remain 0ms.
        zy() ? 5 : 0
      );
    }
    const X = yr(R.floating);
    b && (X.addEventListener("keydown", ke ? Ye : Oe, ke), X.addEventListener("compositionstart", ye), X.addEventListener("compositionend", I)), J && X.addEventListener(k, ve ? de : Ae, ve);
    let G = [];
    return A && (Wt(R.domReference) && (G = uo(R.domReference)), Wt(R.floating) && (G = G.concat(uo(R.floating))), !Wt(R.reference) && R.reference && R.reference.contextElement && (G = G.concat(uo(R.reference.contextElement)))), G = G.filter((he) => {
      var Me;
      return he !== ((Me = X.defaultView) == null ? void 0 : Me.visualViewport);
    }), G.forEach((he) => {
      he.addEventListener("scroll", oe, {
        passive: !0
      });
    }), () => {
      b && (X.removeEventListener("keydown", ke ? Ye : Oe, ke), X.removeEventListener("compositionstart", ye), X.removeEventListener("compositionend", I)), J && X.removeEventListener(k, ve ? de : Ae, ve), G.forEach((he) => {
        he.removeEventListener("scroll", oe);
      }), window.clearTimeout(Ce);
    };
  }, [w, R, b, J, k, m, E, A, h, pe, fe, Oe, ke, Ye, Ae, ve, de]), W.useEffect(() => {
    re.current = !1;
  }, [J, k]);
  const te = W.useMemo(() => ({
    onKeyDown: Oe,
    ...U && {
      [zL[M]]: (Ce) => {
        E(!1, Ce.nativeEvent, "reference-press");
      },
      ...M !== "click" && {
        onClick(Ce) {
          E(!1, Ce.nativeEvent, "reference-press");
        }
      }
    }
  }), [Oe, E, U, M]), He = W.useMemo(() => ({
    onKeyDown: Oe,
    onMouseDown() {
      K.current = !0;
    },
    onMouseUp() {
      K.current = !0;
    },
    [AL[k]]: () => {
      re.current = !0;
    }
  }), [Oe, k]);
  return W.useMemo(() => h ? {
    reference: te,
    floating: He
  } : {}, [h, te, He]);
}
function UL(d) {
  const {
    open: g = !1,
    onOpenChange: m,
    elements: E
  } = d, R = Uy(), w = W.useRef({}), [h] = W.useState(() => CL()), b = Fy() != null;
  if (process.env.NODE_ENV !== "production") {
    const D = E.reference;
    D && !Wt(D) && EL("Cannot pass a virtual element to the `elements.reference` option,", "as it must be a real DOM element. Use `refs.setPositionReference()`", "instead.");
  }
  const [L, k] = W.useState(E.reference), U = Zr((D, F, H) => {
    w.current.openEvent = D ? F : void 0, h.emit("openchange", {
      open: D,
      event: F,
      reason: H,
      nested: b
    }), m == null || m(D, F, H);
  }), M = W.useMemo(() => ({
    setPositionReference: k
  }), []), A = W.useMemo(() => ({
    reference: L || E.reference || null,
    floating: E.floating || null,
    domReference: E.reference
  }), [L, E.reference, E.floating]);
  return W.useMemo(() => ({
    dataRef: w,
    open: g,
    onOpenChange: U,
    elements: A,
    events: h,
    floatingId: R,
    refs: M
  }), [g, U, A, h, R, M]);
}
function l_(d) {
  d === void 0 && (d = {});
  const {
    nodeId: g
  } = d, m = UL({
    ...d,
    elements: {
      reference: null,
      floating: null,
      ...d.elements
    }
  }), E = d.rootContext || m, R = E.elements, [w, h] = W.useState(null), [b, L] = W.useState(null), U = (R == null ? void 0 : R.domReference) || w, M = W.useRef(null), A = vv();
  an(() => {
    U && (M.current = U);
  }, [U]);
  const D = oL({
    ...d,
    elements: {
      ...R,
      ...b && {
        reference: b
      }
    }
  }), F = W.useCallback((K) => {
    const pe = Wt(K) ? {
      getBoundingClientRect: () => K.getBoundingClientRect(),
      contextElement: K
    } : K;
    L(pe), D.refs.setReference(pe);
  }, [D.refs]), H = W.useCallback((K) => {
    (Wt(K) || K === null) && (M.current = K, h(K)), (Wt(D.refs.reference.current) || D.refs.reference.current === null || // Don't allow setting virtual elements using the old technique back to
    // `null` to support `positionReference` + an unstable `reference`
    // callback ref.
    K !== null && !Wt(K)) && D.refs.setReference(K);
  }, [D.refs]), ne = W.useMemo(() => ({
    ...D.refs,
    setReference: H,
    setPositionReference: F,
    domReference: M
  }), [D.refs, H, F]), J = W.useMemo(() => ({
    ...D.elements,
    domReference: U
  }), [D.elements, U]), re = W.useMemo(() => ({
    ...D,
    ...E,
    refs: ne,
    elements: J,
    nodeId: g
  }), [D, ne, J, g, E]);
  return an(() => {
    E.dataRef.current.floatingContext = re;
    const K = A == null ? void 0 : A.nodesRef.current.find((pe) => pe.id === g);
    K && (K.context = re);
  }), W.useMemo(() => ({
    ...D,
    context: re,
    refs: ne,
    elements: J
  }), [D, ne, J, re]);
}
function u_(d, g) {
  g === void 0 && (g = {});
  const {
    open: m,
    onOpenChange: E,
    events: R,
    dataRef: w,
    elements: h
  } = d, {
    enabled: b = !0,
    visibleOnly: L = !0
  } = g, k = W.useRef(!1), U = W.useRef(-1), M = W.useRef(!0);
  W.useEffect(() => {
    if (!b) return;
    const D = Sa(h.domReference);
    function F() {
      !m && An(h.domReference) && h.domReference === Mi(yr(h.domReference)) && (k.current = !0);
    }
    function H() {
      M.current = !0;
    }
    return D.addEventListener("blur", F), D.addEventListener("keydown", H, !0), () => {
      D.removeEventListener("blur", F), D.removeEventListener("keydown", H, !0);
    };
  }, [h.domReference, m, b]), W.useEffect(() => {
    if (!b) return;
    function D(F) {
      let {
        reason: H
      } = F;
      (H === "reference-press" || H === "escape-key") && (k.current = !0);
    }
    return R.on("openchange", D), () => {
      R.off("openchange", D);
    };
  }, [R, b]), W.useEffect(() => () => {
    ri(U);
  }, []);
  const A = W.useMemo(() => ({
    onPointerDown(D) {
      AE(D.nativeEvent) || (M.current = !1);
    },
    onMouseLeave() {
      k.current = !1;
    },
    onFocus(D) {
      if (k.current) return;
      const F = lo(D.nativeEvent);
      if (L && Wt(F))
        try {
          if (lT() && gM()) throw Error();
          if (!F.matches(":focus-visible")) return;
        } catch {
          if (!M.current && !UE(F))
            return;
        }
      E(!0, D.nativeEvent, "focus");
    },
    onBlur(D) {
      k.current = !1;
      const F = D.relatedTarget, H = D.nativeEvent, ne = Wt(F) && F.hasAttribute(Us("focus-guard")) && F.getAttribute("data-type") === "outside";
      U.current = window.setTimeout(() => {
        var J;
        const re = Mi(h.domReference ? h.domReference.ownerDocument : document);
        !F && re === h.domReference || mr((J = w.current.floatingContext) == null ? void 0 : J.refs.floating.current, re) || mr(h.domReference, re) || ne || E(!1, H, "focus");
      });
    }
  }), [w, h.domReference, E, L]);
  return W.useMemo(() => b ? {
    reference: A
  } : {}, [b, A]);
}
const Gw = "active", Kw = "selected";
function xE(d, g, m) {
  const E = /* @__PURE__ */ new Map(), R = m === "item";
  let w = d;
  if (R && d) {
    const {
      [Gw]: h,
      [Kw]: b,
      ...L
    } = d;
    w = L;
  }
  return {
    ...m === "floating" && {
      tabIndex: -1,
      [LE]: ""
    },
    ...w,
    ...g.map((h) => {
      const b = h ? h[m] : null;
      return typeof b == "function" ? d ? b(d) : null : b;
    }).concat(d).reduce((h, b) => (b && Object.entries(b).forEach((L) => {
      let [k, U] = L;
      if (!(R && [Gw, Kw].includes(k)))
        if (k.indexOf("on") === 0) {
          if (E.has(k) || E.set(k, []), typeof U == "function") {
            var M;
            (M = E.get(k)) == null || M.push(U), h[k] = function() {
              for (var A, D = arguments.length, F = new Array(D), H = 0; H < D; H++)
                F[H] = arguments[H];
              return (A = E.get(k)) == null ? void 0 : A.map((ne) => ne(...F)).find((ne) => ne !== void 0);
            };
          }
        } else
          h[k] = U;
    }), h), {})
  };
}
function o_(d) {
  d === void 0 && (d = []);
  const g = d.map((b) => b == null ? void 0 : b.reference), m = d.map((b) => b == null ? void 0 : b.floating), E = d.map((b) => b == null ? void 0 : b.item), R = W.useCallback(
    (b) => xE(b, d, "reference"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    g
  ), w = W.useCallback(
    (b) => xE(b, d, "floating"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    m
  ), h = W.useCallback(
    (b) => xE(b, d, "item"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    E
  );
  return W.useMemo(() => ({
    getReferenceProps: R,
    getFloatingProps: w,
    getItemProps: h
  }), [R, w, h]);
}
const FL = "Escape";
function Py(d, g, m) {
  switch (d) {
    case "vertical":
      return g;
    case "horizontal":
      return m;
    default:
      return g || m;
  }
}
function wE(d, g) {
  return Py(g, d === BE || d === pv, d === oo || d === so);
}
function TE(d, g, m) {
  return Py(g, d === pv, m ? d === oo : d === so) || d === "Enter" || d === " " || d === "";
}
function Xw(d, g, m) {
  return Py(g, m ? d === oo : d === so, d === pv);
}
function qw(d, g, m, E) {
  const R = m ? d === so : d === oo, w = d === BE;
  return g === "both" || g === "horizontal" && E && E > 1 ? d === FL : Py(g, R, w);
}
function s_(d, g) {
  const {
    open: m,
    onOpenChange: E,
    elements: R
  } = d, {
    listRef: w,
    activeIndex: h,
    onNavigate: b = () => {
    },
    enabled: L = !0,
    selectedIndex: k = null,
    allowEscape: U = !1,
    loop: M = !1,
    nested: A = !1,
    rtl: D = !1,
    virtual: F = !1,
    focusItemOnOpen: H = "auto",
    focusItemOnHover: ne = !0,
    openOnArrowKeyDown: J = !0,
    disabledIndices: re = void 0,
    orientation: K = "vertical",
    cols: pe = 1,
    scrollItemIntoView: fe = !0,
    virtualItemRef: ke,
    itemSizes: ve,
    dense: We = !1
  } = g;
  process.env.NODE_ENV !== "production" && (U && (M || Ty("`useListNavigation` looping must be enabled to allow escaping."), F || Ty("`useListNavigation` must be virtual to allow escaping.")), K === "vertical" && pe > 1 && Ty("In grid list navigation mode (`cols` > 1), the `orientation` should", 'be either "horizontal" or "both".'));
  const Oe = _E(R.floating), Ye = Li(Oe), Ae = Fy(), de = vv();
  an(() => {
    d.dataRef.current.orientation = K;
  }, [d, K]);
  const te = Zr(() => {
    b(oe.current === -1 ? null : oe.current);
  }), He = uT(R.domReference), Ce = W.useRef(H), oe = W.useRef(k ?? -1), ye = W.useRef(null), I = W.useRef(!0), X = W.useRef(te), G = W.useRef(!!R.floating), he = W.useRef(m), Me = W.useRef(!1), Bt = W.useRef(!1), Mt = Li(re), gr = Li(m), Et = Li(fe), bt = Li(k), [Pt, Ke] = W.useState(), [rt, Ue] = W.useState(), et = Zr(() => {
    function Xe(Ve) {
      F ? (Ke(Ve.id), de == null || de.events.emit("virtualfocus", Ve), ke && (ke.current = Ve)) : _s(Ve, {
        sync: Me.current,
        preventScroll: !0
      });
    }
    const lt = w.current[oe.current];
    lt && Xe(lt), (Me.current ? (Ve) => Ve() : requestAnimationFrame)(() => {
      const Ve = w.current[oe.current] || lt;
      if (!Ve) return;
      lt || Xe(Ve);
      const Lt = Et.current;
      Lt && dt && (Bt.current || !I.current) && (Ve.scrollIntoView == null || Ve.scrollIntoView(typeof Lt == "boolean" ? {
        block: "nearest",
        inline: "nearest"
      } : Lt));
    });
  });
  an(() => {
    L && (m && R.floating ? Ce.current && k != null && (Bt.current = !0, oe.current = k, te()) : G.current && (oe.current = -1, X.current()));
  }, [L, m, R.floating, k, te]), an(() => {
    if (L && m && R.floating)
      if (h == null) {
        if (Me.current = !1, bt.current != null)
          return;
        if (G.current && (oe.current = -1, et()), (!he.current || !G.current) && Ce.current && (ye.current != null || Ce.current === !0 && ye.current == null)) {
          let Xe = 0;
          const lt = () => {
            w.current[0] == null ? (Xe < 2 && (Xe ? requestAnimationFrame : queueMicrotask)(lt), Xe++) : (oe.current = ye.current == null || TE(ye.current, K, D) || A ? EE(w, Mt.current) : zw(w, Mt.current), ye.current = null, te());
          };
          lt();
        }
      } else ov(w, h) || (oe.current = h, et(), Bt.current = !1);
  }, [L, m, R.floating, h, bt, A, w, K, D, te, et, Mt]), an(() => {
    var Xe;
    if (!L || R.floating || !de || F || !G.current)
      return;
    const lt = de.nodesRef.current, Re = (Xe = lt.find((Jt) => Jt.id === Ae)) == null || (Xe = Xe.context) == null ? void 0 : Xe.elements.floating, Ve = Mi(yr(R.floating)), Lt = lt.some((Jt) => Jt.context && mr(Jt.context.elements.floating, Ve));
    Re && !Lt && I.current && Re.focus({
      preventScroll: !0
    });
  }, [L, R.floating, de, Ae, F]), an(() => {
    if (!L || !de || !F || Ae) return;
    function Xe(lt) {
      Ue(lt.id), ke && (ke.current = lt);
    }
    return de.events.on("virtualfocus", Xe), () => {
      de.events.off("virtualfocus", Xe);
    };
  }, [L, de, F, Ae, ke]), an(() => {
    X.current = te, he.current = m, G.current = !!R.floating;
  }), an(() => {
    m || (ye.current = null);
  }, [m]);
  const st = h != null, dt = W.useMemo(() => {
    function Xe(Re) {
      if (!m) return;
      const Ve = w.current.indexOf(Re);
      Ve !== -1 && oe.current !== Ve && (oe.current = Ve, te());
    }
    return {
      onFocus(Re) {
        let {
          currentTarget: Ve
        } = Re;
        Me.current = !0, Xe(Ve);
      },
      onClick: (Re) => {
        let {
          currentTarget: Ve
        } = Re;
        return Ve.focus({
          preventScroll: !0
        });
      },
      // Safari
      ...ne && {
        onMouseMove(Re) {
          let {
            currentTarget: Ve
          } = Re;
          Me.current = !0, Bt.current = !1, Xe(Ve);
        },
        onPointerLeave(Re) {
          let {
            pointerType: Ve
          } = Re;
          if (!(!I.current || Ve === "touch") && (Me.current = !0, oe.current = -1, te(), !F)) {
            var Lt;
            (Lt = Ye.current) == null || Lt.focus({
              preventScroll: !0
            });
          }
        }
      }
    };
  }, [m, Ye, ne, w, te, F]), pt = Zr((Xe) => {
    if (I.current = !1, Me.current = !0, Xe.which === 229 || !gr.current && Xe.currentTarget === Ye.current)
      return;
    if (A && qw(Xe.key, K, D, pe)) {
      qr(Xe), E(!1, Xe.nativeEvent, "list-navigation"), An(R.domReference) && (F ? de == null || de.events.emit("virtualfocus", R.domReference) : R.domReference.focus());
      return;
    }
    const lt = oe.current, Re = EE(w, re), Ve = zw(w, re);
    if (He || (Xe.key === "Home" && (qr(Xe), oe.current = Re, te()), Xe.key === "End" && (qr(Xe), oe.current = Ve, te())), pe > 1) {
      const Lt = ve || Array.from({
        length: w.current.length
      }, () => ({
        width: 1,
        height: 1
      })), Jt = pL(Lt, pe, We), Un = Jt.findIndex((wn) => wn != null && !wy(w.current, wn, re)), tr = Jt.reduce((wn, Sr, me) => Sr != null && !wy(w.current, Sr, re) ? me : wn, -1), Hr = Jt[dL({
        current: Jt.map((wn) => wn != null ? w.current[wn] : null)
      }, {
        event: Xe,
        orientation: K,
        loop: M,
        rtl: D,
        cols: pe,
        // treat undefined (empty grid spaces) as disabled indices so we
        // don't end up in them
        disabledIndices: hL([...re || w.current.map((wn, Sr) => wy(w.current, Sr) ? Sr : void 0), void 0], Jt),
        minIndex: Un,
        maxIndex: tr,
        prevIndex: vL(
          oe.current > Ve ? Re : oe.current,
          Lt,
          Jt,
          pe,
          // use a corner matching the edge closest to the direction
          // we're moving in so we don't end up in the same item. Prefer
          // top/left over bottom/right.
          Xe.key === pv ? "bl" : Xe.key === (D ? oo : so) ? "tr" : "tl"
        ),
        stopEvent: !0
      })];
      if (Hr != null && (oe.current = Hr, te()), K === "both")
        return;
    }
    if (wE(Xe.key, K)) {
      if (qr(Xe), m && !F && Mi(Xe.currentTarget.ownerDocument) === Xe.currentTarget) {
        oe.current = TE(Xe.key, K, D) ? Re : Ve, te();
        return;
      }
      TE(Xe.key, K, D) ? M ? oe.current = lt >= Ve ? U && lt !== w.current.length ? -1 : Re : Fr(w, {
        startingIndex: lt,
        disabledIndices: re
      }) : oe.current = Math.min(Ve, Fr(w, {
        startingIndex: lt,
        disabledIndices: re
      })) : M ? oe.current = lt <= Re ? U && lt !== -1 ? w.current.length : Ve : Fr(w, {
        startingIndex: lt,
        decrement: !0,
        disabledIndices: re
      }) : oe.current = Math.max(Re, Fr(w, {
        startingIndex: lt,
        decrement: !0,
        disabledIndices: re
      })), ov(w, oe.current) && (oe.current = -1), te();
    }
  }), gt = W.useMemo(() => F && m && st && {
    "aria-activedescendant": rt || Pt
  }, [F, m, st, rt, Pt]), vn = W.useMemo(() => ({
    "aria-orientation": K === "both" ? void 0 : K,
    ...He ? {} : gt,
    onKeyDown: pt,
    onPointerMove() {
      I.current = !0;
    }
  }), [gt, pt, K, He]), Mn = W.useMemo(() => {
    function Xe(Re) {
      H === "auto" && iT(Re.nativeEvent) && (Ce.current = !0);
    }
    function lt(Re) {
      Ce.current = H, H === "auto" && AE(Re.nativeEvent) && (Ce.current = !0);
    }
    return {
      ...gt,
      onKeyDown(Re) {
        var Ve;
        I.current = !1;
        const Lt = Re.key.startsWith("Arrow"), Jt = ["Home", "End"].includes(Re.key), Un = Lt || Jt, tr = de == null || (Ve = de.nodesRef.current.find((ln) => ln.id === Ae)) == null || (Ve = Ve.context) == null || (Ve = Ve.dataRef) == null ? void 0 : Ve.current.orientation, Hr = Xw(Re.key, K, D), wn = qw(Re.key, K, D, pe), Sr = Xw(Re.key, tr, D), me = wE(Re.key, K), Ie = (A ? Sr : me) || Re.key === "Enter" || Re.key.trim() === "";
        if (F && m) {
          const ln = de == null ? void 0 : de.nodesRef.current.find((Tn) => Tn.parentId == null), _t = de && ln ? wL(de.nodesRef.current, ln.id) : null;
          if (Un && _t && ke) {
            const Tn = new KeyboardEvent("keydown", {
              key: Re.key,
              bubbles: !0
            });
            if (Hr || wn) {
              var ut, Dt;
              const en = ((ut = _t.context) == null ? void 0 : ut.elements.domReference) === Re.currentTarget, $t = wn && !en ? (Dt = _t.context) == null ? void 0 : Dt.elements.domReference : Hr ? w.current.find((tn) => (tn == null ? void 0 : tn.id) === Pt) : null;
              $t && (qr(Re), $t.dispatchEvent(Tn), Ue(void 0));
            }
            if ((me || Jt) && _t.context && _t.context.open && _t.parentId && Re.currentTarget !== _t.context.elements.domReference) {
              var It;
              qr(Re), (It = _t.context.elements.domReference) == null || It.dispatchEvent(Tn);
              return;
            }
          }
          return pt(Re);
        }
        if (!(!m && !J && Lt)) {
          if (Ie) {
            const ln = wE(Re.key, tr);
            ye.current = A && ln ? null : Re.key;
          }
          if (A) {
            Sr && (qr(Re), m ? (oe.current = EE(w, Mt.current), te()) : E(!0, Re.nativeEvent, "list-navigation"));
            return;
          }
          me && (k != null && (oe.current = k), qr(Re), !m && J ? E(!0, Re.nativeEvent, "list-navigation") : pt(Re), m && te());
        }
      },
      onFocus() {
        m && !F && (oe.current = -1, te());
      },
      onPointerDown: lt,
      onPointerEnter: lt,
      onMouseDown: Xe,
      onClick: Xe
    };
  }, [Pt, gt, pe, pt, Mt, H, w, A, te, E, m, J, K, Ae, D, k, de, F, ke]);
  return W.useMemo(() => L ? {
    reference: Mn,
    floating: vn,
    item: dt
  } : {}, [L, Mn, vn, dt]);
}
const HL = /* @__PURE__ */ new Map([["select", "listbox"], ["combobox", "listbox"], ["label", !1]]);
function c_(d, g) {
  var m;
  g === void 0 && (g = {});
  const {
    open: E,
    floatingId: R
  } = d, {
    enabled: w = !0,
    role: h = "dialog"
  } = g, b = (m = HL.get(h)) != null ? m : h, L = Uy(), U = Fy() != null, M = W.useMemo(() => b === "tooltip" || h === "label" ? {
    ["aria-" + (h === "label" ? "labelledby" : "describedby")]: E ? R : void 0
  } : {
    "aria-expanded": E ? "true" : "false",
    "aria-haspopup": b === "alertdialog" ? "dialog" : b,
    "aria-controls": E ? R : void 0,
    ...b === "listbox" && {
      role: "combobox"
    },
    ...b === "menu" && {
      id: L
    },
    ...b === "menu" && U && {
      role: "menuitem"
    },
    ...h === "select" && {
      "aria-autocomplete": "none"
    },
    ...h === "combobox" && {
      "aria-autocomplete": "list"
    }
  }, [b, R, U, E, L, h]), A = W.useMemo(() => {
    const F = {
      id: R,
      ...b && {
        role: b
      }
    };
    return b === "tooltip" || h === "label" ? F : {
      ...F,
      ...b === "menu" && {
        "aria-labelledby": L
      }
    };
  }, [b, R, L, h]), D = W.useCallback((F) => {
    let {
      active: H,
      selected: ne
    } = F;
    const J = {
      role: "option",
      ...H && {
        id: R + "-option"
      }
    };
    switch (h) {
      case "select":
        return {
          ...J,
          "aria-selected": H && ne
        };
      case "combobox":
        return {
          ...J,
          ...H && {
            "aria-selected": !0
          }
        };
    }
    return {};
  }, [R, h]);
  return W.useMemo(() => w ? {
    reference: M,
    floating: A,
    item: D
  } : {}, [w, M, A, D]);
}
export {
  n_ as F,
  l_ as a,
  YL as b,
  o_ as c,
  i_ as d,
  c_ as e,
  GL as f,
  a_ as g,
  s_ as h,
  r_ as i,
  ZL as j,
  t_ as k,
  u_ as l,
  qL as m,
  e_ as n,
  QL as o,
  WL as p,
  XL as q,
  fT as r,
  KL as s,
  JL as u
};
