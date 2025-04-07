import { jsx as ie } from "react/jsx-runtime";
import oe from "react";
import { a as ae } from "../../_commonjsHelpers-B52_cu2H.js";
import { t as ue, f as se, i as A, g as B, a as J, b as ce } from "../../index.esm-Dkuk1b-q.js";
var U = { exports: {} };
/*!
* focus-trap 7.6.4
* @license MIT, https://github.com/focus-trap/focus-trap/blob/master/LICENSE
*/
function Q(i, t) {
  (t == null || t > i.length) && (t = i.length);
  for (var s = 0, l = Array(t); s < t; s++) l[s] = i[s];
  return l;
}
function le(i) {
  if (Array.isArray(i)) return Q(i);
}
function fe(i, t, s) {
  return (t = he(t)) in i ? Object.defineProperty(i, t, {
    value: s,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : i[t] = s, i;
}
function de(i) {
  if (typeof Symbol < "u" && i[Symbol.iterator] != null || i["@@iterator"] != null) return Array.from(i);
}
function ve() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Z(i, t) {
  var s = Object.keys(i);
  if (Object.getOwnPropertySymbols) {
    var l = Object.getOwnPropertySymbols(i);
    t && (l = l.filter(function(F) {
      return Object.getOwnPropertyDescriptor(i, F).enumerable;
    })), s.push.apply(s, l);
  }
  return s;
}
function ee(i) {
  for (var t = 1; t < arguments.length; t++) {
    var s = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Z(Object(s), !0).forEach(function(l) {
      fe(i, l, s[l]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(i, Object.getOwnPropertyDescriptors(s)) : Z(Object(s)).forEach(function(l) {
      Object.defineProperty(i, l, Object.getOwnPropertyDescriptor(s, l));
    });
  }
  return i;
}
function pe(i) {
  return le(i) || de(i) || ye(i) || ve();
}
function be(i, t) {
  if (typeof i != "object" || !i) return i;
  var s = i[Symbol.toPrimitive];
  if (s !== void 0) {
    var l = s.call(i, t);
    if (typeof l != "object") return l;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(i);
}
function he(i) {
  var t = be(i, "string");
  return typeof t == "symbol" ? t : t + "";
}
function ye(i, t) {
  if (i) {
    if (typeof i == "string") return Q(i, t);
    var s = {}.toString.call(i).slice(8, -1);
    return s === "Object" && i.constructor && (s = i.constructor.name), s === "Map" || s === "Set" ? Array.from(i) : s === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(s) ? Q(i, t) : void 0;
  }
}
var te = {
  activateTrap: function(t, s) {
    if (t.length > 0) {
      var l = t[t.length - 1];
      l !== s && l._setPausedState(!0);
    }
    var F = t.indexOf(s);
    F === -1 || t.splice(F, 1), t.push(s);
  },
  deactivateTrap: function(t, s) {
    var l = t.indexOf(s);
    l !== -1 && t.splice(l, 1), t.length > 0 && !t[t.length - 1]._isManuallyPaused() && t[t.length - 1]._setPausedState(!1);
  }
}, me = function(t) {
  return t.tagName && t.tagName.toLowerCase() === "input" && typeof t.select == "function";
}, ge = function(t) {
  return (t == null ? void 0 : t.key) === "Escape" || (t == null ? void 0 : t.key) === "Esc" || (t == null ? void 0 : t.keyCode) === 27;
}, L = function(t) {
  return (t == null ? void 0 : t.key) === "Tab" || (t == null ? void 0 : t.keyCode) === 9;
}, Te = function(t) {
  return L(t) && !t.shiftKey;
}, Fe = function(t) {
  return L(t) && t.shiftKey;
}, ne = function(t) {
  return setTimeout(t, 0);
}, I = function(t) {
  for (var s = arguments.length, l = new Array(s > 1 ? s - 1 : 0), F = 1; F < s; F++)
    l[F - 1] = arguments[F];
  return typeof t == "function" ? t.apply(void 0, l) : t;
}, V = function(t) {
  return t.target.shadowRoot && typeof t.composedPath == "function" ? t.composedPath()[0] : t.target;
}, we = [], Oe = function(t, s) {
  var l = (s == null ? void 0 : s.document) || document, F = (s == null ? void 0 : s.trapStack) || we, m = ee({
    returnFocusOnDeactivate: !0,
    escapeDeactivates: !0,
    delayInitialFocus: !0,
    isKeyForward: Te,
    isKeyBackward: Fe
  }, s), o = {
    // containers given to createFocusTrap()
    // @type {Array<HTMLElement>}
    containers: [],
    // list of objects identifying tabbable nodes in `containers` in the trap
    // NOTE: it's possible that a group has no tabbable nodes if nodes get removed while the trap
    //  is active, but the trap should never get to a state where there isn't at least one group
    //  with at least one tabbable node in it (that would lead to an error condition that would
    //  result in an error being thrown)
    // @type {Array<{
    //   container: HTMLElement,
    //   tabbableNodes: Array<HTMLElement>, // empty if none
    //   focusableNodes: Array<HTMLElement>, // empty if none
    //   posTabIndexesFound: boolean,
    //   firstTabbableNode: HTMLElement|undefined,
    //   lastTabbableNode: HTMLElement|undefined,
    //   firstDomTabbableNode: HTMLElement|undefined,
    //   lastDomTabbableNode: HTMLElement|undefined,
    //   nextTabbableNode: (node: HTMLElement, forward: boolean) => HTMLElement|undefined
    // }>}
    containerGroups: [],
    // same order/length as `containers` list
    // references to objects in `containerGroups`, but only those that actually have
    //  tabbable nodes in them
    // NOTE: same order as `containers` and `containerGroups`, but __not necessarily__
    //  the same length
    tabbableGroups: [],
    nodeFocusedBeforeActivation: null,
    mostRecentlyFocusedNode: null,
    active: !1,
    paused: !1,
    manuallyPaused: !1,
    // timer ID for when delayInitialFocus is true and initial focus in this trap
    //  has been delayed during activation
    delayInitialFocusTimer: void 0,
    // the most recent KeyboardEvent for the configured nav key (typically [SHIFT+]TAB), if any
    recentNavEvent: void 0
  }, O, w = function(e, n, a) {
    return e && e[n] !== void 0 ? e[n] : m[a || n];
  }, E = function(e, n) {
    var a = typeof (n == null ? void 0 : n.composedPath) == "function" ? n.composedPath() : void 0;
    return o.containerGroups.findIndex(function(d) {
      var h = d.container, y = d.tabbableNodes;
      return h.contains(e) || // fall back to explicit tabbable search which will take into consideration any
      //  web components if the `tabbableOptions.getShadowRoot` option was used for
      //  the trap, enabling shadow DOM support in tabbable (`Node.contains()` doesn't
      //  look inside web components even if open)
      (a == null ? void 0 : a.includes(h)) || y.find(function(v) {
        return v === e;
      });
    });
  }, D = function(e) {
    var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, a = n.hasFallback, d = a === void 0 ? !1 : a, h = n.params, y = h === void 0 ? [] : h, v = m[e];
    if (typeof v == "function" && (v = v.apply(void 0, pe(y))), v === !0 && (v = void 0), !v) {
      if (v === void 0 || v === !1)
        return v;
      throw new Error("`".concat(e, "` was specified but was not a node, or did not return a node"));
    }
    var g = v;
    if (typeof v == "string") {
      try {
        g = l.querySelector(v);
      } catch (T) {
        throw new Error("`".concat(e, '` appears to be an invalid selector; error="').concat(T.message, '"'));
      }
      if (!g && !d)
        throw new Error("`".concat(e, "` as selector refers to no known node"));
    }
    return g;
  }, _ = function() {
    var e = D("initialFocus", {
      hasFallback: !0
    });
    if (e === !1)
      return !1;
    if (e === void 0 || e && !J(e, m.tabbableOptions))
      if (E(l.activeElement) >= 0)
        e = l.activeElement;
      else {
        var n = o.tabbableGroups[0], a = n && n.firstTabbableNode;
        e = a || D("fallbackFocus");
      }
    else e === null && (e = D("fallbackFocus"));
    if (!e)
      throw new Error("Your focus-trap needs to have at least one focusable element");
    return e;
  }, P = function() {
    if (o.containerGroups = o.containers.map(function(e) {
      var n = ue(e, m.tabbableOptions), a = se(e, m.tabbableOptions), d = n.length > 0 ? n[0] : void 0, h = n.length > 0 ? n[n.length - 1] : void 0, y = a.find(function(T) {
        return A(T);
      }), v = a.slice().reverse().find(function(T) {
        return A(T);
      }), g = !!n.find(function(T) {
        return B(T) > 0;
      });
      return {
        container: e,
        tabbableNodes: n,
        focusableNodes: a,
        /** True if at least one node with positive `tabindex` was found in this container. */
        posTabIndexesFound: g,
        /** First tabbable node in container, __tabindex__ order; `undefined` if none. */
        firstTabbableNode: d,
        /** Last tabbable node in container, __tabindex__ order; `undefined` if none. */
        lastTabbableNode: h,
        // NOTE: DOM order is NOT NECESSARILY "document position" order, but figuring that out
        //  would require more than just https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition
        //  because that API doesn't work with Shadow DOM as well as it should (@see
        //  https://github.com/whatwg/dom/issues/320) and since this first/last is only needed, so far,
        //  to address an edge case related to positive tabindex support, this seems like a much easier,
        //  "close enough most of the time" alternative for positive tabindexes which should generally
        //  be avoided anyway...
        /** First tabbable node in container, __DOM__ order; `undefined` if none. */
        firstDomTabbableNode: y,
        /** Last tabbable node in container, __DOM__ order; `undefined` if none. */
        lastDomTabbableNode: v,
        /**
         * Finds the __tabbable__ node that follows the given node in the specified direction,
         *  in this container, if any.
         * @param {HTMLElement} node
         * @param {boolean} [forward] True if going in forward tab order; false if going
         *  in reverse.
         * @returns {HTMLElement|undefined} The next tabbable node, if any.
         */
        nextTabbableNode: function(C) {
          var K = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, R = n.indexOf(C);
          return R < 0 ? K ? a.slice(a.indexOf(C) + 1).find(function(x) {
            return A(x);
          }) : a.slice(0, a.indexOf(C)).reverse().find(function(x) {
            return A(x);
          }) : n[R + (K ? 1 : -1)];
        }
      };
    }), o.tabbableGroups = o.containerGroups.filter(function(e) {
      return e.tabbableNodes.length > 0;
    }), o.tabbableGroups.length <= 0 && !D("fallbackFocus"))
      throw new Error("Your focus-trap must have at least one container with at least one tabbable node in it at all times");
    if (o.containerGroups.find(function(e) {
      return e.posTabIndexesFound;
    }) && o.containerGroups.length > 1)
      throw new Error("At least one node with a positive tabindex was found in one of your focus-trap's multiple containers. Positive tabindexes are only supported in single-container focus-traps.");
  }, q = function(e) {
    var n = e.activeElement;
    if (n)
      return n.shadowRoot && n.shadowRoot.activeElement !== null ? q(n.shadowRoot) : n;
  }, k = function(e) {
    if (e !== !1 && e !== q(document)) {
      if (!e || !e.focus) {
        k(_());
        return;
      }
      e.focus({
        preventScroll: !!m.preventScroll
      }), o.mostRecentlyFocusedNode = e, me(e) && e.select();
    }
  }, M = function(e) {
    var n = D("setReturnFocus", {
      params: [e]
    });
    return n || (n === !1 ? !1 : e);
  }, N = function(e) {
    var n = e.target, a = e.event, d = e.isBackward, h = d === void 0 ? !1 : d;
    n = n || V(a), P();
    var y = null;
    if (o.tabbableGroups.length > 0) {
      var v = E(n, a), g = v >= 0 ? o.containerGroups[v] : void 0;
      if (v < 0)
        h ? y = o.tabbableGroups[o.tabbableGroups.length - 1].lastTabbableNode : y = o.tabbableGroups[0].firstTabbableNode;
      else if (h) {
        var T = o.tabbableGroups.findIndex(function(z) {
          var Y = z.firstTabbableNode;
          return n === Y;
        });
        if (T < 0 && (g.container === n || J(n, m.tabbableOptions) && !A(n, m.tabbableOptions) && !g.nextTabbableNode(n, !1)) && (T = v), T >= 0) {
          var C = T === 0 ? o.tabbableGroups.length - 1 : T - 1, K = o.tabbableGroups[C];
          y = B(n) >= 0 ? K.lastTabbableNode : K.lastDomTabbableNode;
        } else L(a) || (y = g.nextTabbableNode(n, !1));
      } else {
        var R = o.tabbableGroups.findIndex(function(z) {
          var Y = z.lastTabbableNode;
          return n === Y;
        });
        if (R < 0 && (g.container === n || J(n, m.tabbableOptions) && !A(n, m.tabbableOptions) && !g.nextTabbableNode(n)) && (R = v), R >= 0) {
          var x = R === o.tabbableGroups.length - 1 ? 0 : R + 1, X = o.tabbableGroups[x];
          y = B(n) >= 0 ? X.firstTabbableNode : X.firstDomTabbableNode;
        } else L(a) || (y = g.nextTabbableNode(n));
      }
    } else
      y = D("fallbackFocus");
    return y;
  }, j = function(e) {
    var n = V(e);
    if (!(E(n, e) >= 0)) {
      if (I(m.clickOutsideDeactivates, e)) {
        O.deactivate({
          // NOTE: by setting `returnFocus: false`, deactivate() will do nothing,
          //  which will result in the outside click setting focus to the node
          //  that was clicked (and if not focusable, to "nothing"); by setting
          //  `returnFocus: true`, we'll attempt to re-focus the node originally-focused
          //  on activation (or the configured `setReturnFocus` node), whether the
          //  outside click was on a focusable node or not
          returnFocus: m.returnFocusOnDeactivate
        });
        return;
      }
      I(m.allowOutsideClick, e) || e.preventDefault();
    }
  }, $ = function(e) {
    var n = V(e), a = E(n, e) >= 0;
    if (a || n instanceof Document)
      a && (o.mostRecentlyFocusedNode = n);
    else {
      e.stopImmediatePropagation();
      var d, h = !0;
      if (o.mostRecentlyFocusedNode)
        if (B(o.mostRecentlyFocusedNode) > 0) {
          var y = E(o.mostRecentlyFocusedNode), v = o.containerGroups[y].tabbableNodes;
          if (v.length > 0) {
            var g = v.findIndex(function(T) {
              return T === o.mostRecentlyFocusedNode;
            });
            g >= 0 && (m.isKeyForward(o.recentNavEvent) ? g + 1 < v.length && (d = v[g + 1], h = !1) : g - 1 >= 0 && (d = v[g - 1], h = !1));
          }
        } else
          o.containerGroups.some(function(T) {
            return T.tabbableNodes.some(function(C) {
              return B(C) > 0;
            });
          }) || (h = !1);
      else
        h = !1;
      h && (d = N({
        // move FROM the MRU node, not event-related node (which will be the node that is
        //  outside the trap causing the focus escape we're trying to fix)
        target: o.mostRecentlyFocusedNode,
        isBackward: m.isKeyBackward(o.recentNavEvent)
      })), k(d || o.mostRecentlyFocusedNode || _());
    }
    o.recentNavEvent = void 0;
  }, W = function(e) {
    var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    o.recentNavEvent = e;
    var a = N({
      event: e,
      isBackward: n
    });
    a && (L(e) && e.preventDefault(), k(a));
  }, G = function(e) {
    (m.isKeyForward(e) || m.isKeyBackward(e)) && W(e, m.isKeyBackward(e));
  }, H = function(e) {
    ge(e) && I(m.escapeDeactivates, e) !== !1 && (e.preventDefault(), O.deactivate());
  }, S = function(e) {
    var n = V(e);
    E(n, e) >= 0 || I(m.clickOutsideDeactivates, e) || I(m.allowOutsideClick, e) || (e.preventDefault(), e.stopImmediatePropagation());
  }, c = function() {
    if (o.active)
      return te.activateTrap(F, O), o.delayInitialFocusTimer = m.delayInitialFocus ? ne(function() {
        k(_());
      }) : k(_()), l.addEventListener("focusin", $, !0), l.addEventListener("mousedown", j, {
        capture: !0,
        passive: !1
      }), l.addEventListener("touchstart", j, {
        capture: !0,
        passive: !1
      }), l.addEventListener("click", S, {
        capture: !0,
        passive: !1
      }), l.addEventListener("keydown", G, {
        capture: !0,
        passive: !1
      }), l.addEventListener("keydown", H), O;
  }, u = function() {
    if (o.active)
      return l.removeEventListener("focusin", $, !0), l.removeEventListener("mousedown", j, !0), l.removeEventListener("touchstart", j, !0), l.removeEventListener("click", S, !0), l.removeEventListener("keydown", G, !0), l.removeEventListener("keydown", H), O;
  }, p = function(e) {
    var n = e.some(function(a) {
      var d = Array.from(a.removedNodes);
      return d.some(function(h) {
        return h === o.mostRecentlyFocusedNode;
      });
    });
    n && k(_());
  }, r = typeof window < "u" && "MutationObserver" in window ? new MutationObserver(p) : void 0, b = function() {
    r && (r.disconnect(), o.active && !o.paused && o.containers.map(function(e) {
      r.observe(e, {
        subtree: !0,
        childList: !0
      });
    }));
  };
  return O = {
    get active() {
      return o.active;
    },
    get paused() {
      return o.paused;
    },
    activate: function(e) {
      if (o.active)
        return this;
      var n = w(e, "onActivate"), a = w(e, "onPostActivate"), d = w(e, "checkCanFocusTrap");
      d || P(), o.active = !0, o.paused = !1, o.nodeFocusedBeforeActivation = l.activeElement, n == null || n();
      var h = function() {
        d && P(), c(), b(), a == null || a();
      };
      return d ? (d(o.containers.concat()).then(h, h), this) : (h(), this);
    },
    deactivate: function(e) {
      if (!o.active)
        return this;
      var n = ee({
        onDeactivate: m.onDeactivate,
        onPostDeactivate: m.onPostDeactivate,
        checkCanReturnFocus: m.checkCanReturnFocus
      }, e);
      clearTimeout(o.delayInitialFocusTimer), o.delayInitialFocusTimer = void 0, u(), o.active = !1, o.paused = !1, b(), te.deactivateTrap(F, O);
      var a = w(n, "onDeactivate"), d = w(n, "onPostDeactivate"), h = w(n, "checkCanReturnFocus"), y = w(n, "returnFocus", "returnFocusOnDeactivate");
      a == null || a();
      var v = function() {
        ne(function() {
          y && k(M(o.nodeFocusedBeforeActivation)), d == null || d();
        });
      };
      return y && h ? (h(M(o.nodeFocusedBeforeActivation)).then(v, v), this) : (v(), this);
    },
    pause: function(e) {
      return o.active ? (o.manuallyPaused = !0, this._setPausedState(!0, e)) : this;
    },
    unpause: function(e) {
      return o.active ? (o.manuallyPaused = !1, F[F.length - 1] !== this ? this : this._setPausedState(!1, e)) : this;
    },
    updateContainerElements: function(e) {
      var n = [].concat(e).filter(Boolean);
      return o.containers = n.map(function(a) {
        return typeof a == "string" ? l.querySelector(a) : a;
      }), o.active && P(), b(), this;
    }
  }, Object.defineProperties(O, {
    _isManuallyPaused: {
      value: function() {
        return o.manuallyPaused;
      }
    },
    _setPausedState: {
      value: function(e, n) {
        if (o.paused === e)
          return this;
        if (o.paused = e, e) {
          var a = w(n, "onPause"), d = w(n, "onPostPause");
          a == null || a(), u(), b(), d == null || d();
        } else {
          var h = w(n, "onUnpause"), y = w(n, "onPostUnpause");
          h == null || h(), P(), c(), b(), y == null || y();
        }
        return this;
      }
    }
  }), O.updateContainerElements(t), O;
};
const De = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createFocusTrap: Oe
}, Symbol.toStringTag, { value: "Module" })), ke = /* @__PURE__ */ ae(De), Ee = /* @__PURE__ */ ae(ce);
var re;
function Pe() {
  if (re) return U.exports;
  re = 1;
  function i(c) {
    "@babel/helpers - typeof";
    return i = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(u) {
      return typeof u;
    } : function(u) {
      return u && typeof Symbol == "function" && u.constructor === Symbol && u !== Symbol.prototype ? "symbol" : typeof u;
    }, i(c);
  }
  var t, s;
  function l(c, u) {
    if (!(c instanceof u)) throw new TypeError("Cannot call a class as a function");
  }
  function F(c, u) {
    for (var p = 0; p < u.length; p++) {
      var r = u[p];
      r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(c, k(r.key), r);
    }
  }
  function m(c, u, p) {
    return u && F(c.prototype, u), Object.defineProperty(c, "prototype", { writable: !1 }), c;
  }
  function o(c, u, p) {
    return u = D(u), O(c, E() ? Reflect.construct(u, p || [], D(c).constructor) : u.apply(c, p));
  }
  function O(c, u) {
    if (u && (i(u) == "object" || typeof u == "function")) return u;
    if (u !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
    return w(c);
  }
  function w(c) {
    if (c === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return c;
  }
  function E() {
    try {
      var c = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
      }));
    } catch {
    }
    return (E = function() {
      return !!c;
    })();
  }
  function D(c) {
    return D = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(u) {
      return u.__proto__ || Object.getPrototypeOf(u);
    }, D(c);
  }
  function _(c, u) {
    if (typeof u != "function" && u !== null) throw new TypeError("Super expression must either be null or a function");
    c.prototype = Object.create(u && u.prototype, { constructor: { value: c, writable: !0, configurable: !0 } }), Object.defineProperty(c, "prototype", { writable: !1 }), u && P(c, u);
  }
  function P(c, u) {
    return P = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(p, r) {
      return p.__proto__ = r, p;
    }, P(c, u);
  }
  function q(c, u, p) {
    return (u = k(u)) in c ? Object.defineProperty(c, u, { value: p, enumerable: !0, configurable: !0, writable: !0 }) : c[u] = p, c;
  }
  function k(c) {
    var u = M(c, "string");
    return i(u) == "symbol" ? u : u + "";
  }
  function M(c, u) {
    if (i(c) != "object" || !c) return c;
    var p = c[Symbol.toPrimitive];
    if (p !== void 0) {
      var r = p.call(c, u);
      if (i(r) != "object") return r;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (u === "string" ? String : Number)(c);
  }
  var N = oe, j = ke, $ = j.createFocusTrap, W = Ee, G = W.isFocusable, H = parseInt((t = (s = /^(\d+)\./.exec(N.version)) === null || s === void 0 ? void 0 : s[1]) !== null && t !== void 0 ? t : 0, 10), S = /* @__PURE__ */ function(c) {
    function u(p) {
      var r;
      l(this, u), r = o(this, u, [p]), q(r, "getNodeForOption", function(e) {
        var n, a = (n = this.internalOptions[e]) !== null && n !== void 0 ? n : this.originalOptions[e];
        if (typeof a == "function") {
          for (var d = arguments.length, h = new Array(d > 1 ? d - 1 : 0), y = 1; y < d; y++)
            h[y - 1] = arguments[y];
          a = a.apply(void 0, h);
        }
        if (a === !0 && (a = void 0), !a) {
          if (a === void 0 || a === !1)
            return a;
          throw new Error("`".concat(e, "` was specified but was not a node, or did not return a node"));
        }
        var v = a;
        if (typeof a == "string") {
          var g;
          if (v = (g = this.getDocument()) === null || g === void 0 ? void 0 : g.querySelector(a), !v)
            throw new Error("`".concat(e, "` as selector refers to no known node"));
        }
        return v;
      }), r.handleDeactivate = r.handleDeactivate.bind(r), r.handlePostDeactivate = r.handlePostDeactivate.bind(r), r.handleClickOutsideDeactivates = r.handleClickOutsideDeactivates.bind(r), r.internalOptions = {
        // We need to hijack the returnFocusOnDeactivate option,
        // because React can move focus into the element before we arrived at
        // this lifecycle hook (e.g. with autoFocus inputs). So the component
        // captures the previouslyFocusedElement in componentWillMount,
        // then (optionally) returns focus to it in componentWillUnmount.
        returnFocusOnDeactivate: !1,
        // the rest of these are also related to deactivation of the trap, and we
        //  need to use them and control them as well
        checkCanReturnFocus: null,
        onDeactivate: r.handleDeactivate,
        onPostDeactivate: r.handlePostDeactivate,
        // we need to special-case this setting as well so that we can know if we should
        //  NOT return focus if the trap gets auto-deactivated as the result of an
        //  outside click (otherwise, we'll always think we should return focus because
        //  of how we manage that flag internally here)
        clickOutsideDeactivates: r.handleClickOutsideDeactivates
      }, r.originalOptions = {
        // because of the above `internalOptions`, we maintain our own flag for
        //  this option, and default it to `true` because that's focus-trap's default
        returnFocusOnDeactivate: !0,
        // because of the above `internalOptions`, we keep these separate since
        //  they're part of the deactivation process which we configure (internally) to
        //  be shared between focus-trap and focus-trap-react
        onDeactivate: null,
        onPostDeactivate: null,
        checkCanReturnFocus: null,
        // the user's setting, defaulted to false since focus-trap defaults this to false
        clickOutsideDeactivates: !1
      };
      var b = p.focusTrapOptions;
      for (var f in b)
        if (Object.prototype.hasOwnProperty.call(b, f)) {
          if (f === "returnFocusOnDeactivate" || f === "onDeactivate" || f === "onPostDeactivate" || f === "checkCanReturnFocus" || f === "clickOutsideDeactivates") {
            r.originalOptions[f] = b[f];
            continue;
          }
          r.internalOptions[f] = b[f];
        }
      return r.outsideClick = null, r.focusTrapElements = p.containerElements || [], r.updatePreviousElement(), r;
    }
    return _(u, c), m(u, [{
      key: "getDocument",
      value: function() {
        return this.props.focusTrapOptions.document || (typeof document < "u" ? document : void 0);
      }
    }, {
      key: "getReturnFocusNode",
      value: function() {
        var r = this.getNodeForOption("setReturnFocus", this.previouslyFocusedElement);
        return r || (r === !1 ? !1 : this.previouslyFocusedElement);
      }
      /** Update the previously focused element with the currently focused element. */
    }, {
      key: "updatePreviousElement",
      value: function() {
        var r = this.getDocument();
        r && (this.previouslyFocusedElement = r.activeElement);
      }
    }, {
      key: "deactivateTrap",
      value: function() {
        !this.focusTrap || !this.focusTrap.active || this.focusTrap.deactivate({
          // NOTE: we never let the trap return the focus since we do that ourselves
          returnFocus: !1,
          // we'll call this in our own post deactivate handler so make sure the trap doesn't
          //  do it prematurely
          checkCanReturnFocus: null,
          // let it call the user's original deactivate handler, if any, instead of
          //  our own which calls back into this function
          onDeactivate: this.originalOptions.onDeactivate
          // NOTE: for post deactivate, don't specify anything so that it calls the
          //  onPostDeactivate handler specified on `this.internalOptions`
          //  which will always be our own `handlePostDeactivate()` handler, which
          //  will finish things off by calling the user's provided onPostDeactivate
          //  handler, if any, at the right time
          // onPostDeactivate: NOTHING
        });
      }
    }, {
      key: "handleClickOutsideDeactivates",
      value: function(r) {
        var b = typeof this.originalOptions.clickOutsideDeactivates == "function" ? this.originalOptions.clickOutsideDeactivates.call(null, r) : this.originalOptions.clickOutsideDeactivates;
        return b && (this.outsideClick = {
          target: r.target,
          allowDeactivation: b
        }), b;
      }
    }, {
      key: "handleDeactivate",
      value: function() {
        this.originalOptions.onDeactivate && this.originalOptions.onDeactivate.call(null), this.deactivateTrap();
      }
    }, {
      key: "handlePostDeactivate",
      value: function() {
        var r = this, b = function() {
          var e = r.getReturnFocusNode(), n = !!// did the consumer allow it?
          (r.originalOptions.returnFocusOnDeactivate && // can we actually focus the node?
          e !== null && e !== void 0 && e.focus && // was there an outside click that allowed deactivation?
          (!r.outsideClick || // did the consumer allow deactivation when the outside node was clicked?
          r.outsideClick.allowDeactivation && // is the outside node NOT focusable (implying that it did NOT receive focus
          //  as a result of the click-through) -- in which case do NOT restore focus
          //  to `returnFocusNode` because focus should remain on the outside node
          !G(r.outsideClick.target, r.internalOptions.tabbableOptions))), a = r.internalOptions.preventScroll, d = a === void 0 ? !1 : a;
          n && e.focus({
            preventScroll: d
          }), r.originalOptions.onPostDeactivate && r.originalOptions.onPostDeactivate.call(null), r.outsideClick = null;
        };
        this.originalOptions.checkCanReturnFocus ? this.originalOptions.checkCanReturnFocus.call(null, this.getReturnFocusNode()).then(b, b) : b();
      }
    }, {
      key: "setupFocusTrap",
      value: function() {
        if (this.focusTrap)
          this.props.active && !this.focusTrap.active && (this.focusTrap.activate(), this.props.paused && this.focusTrap.pause());
        else {
          var r = this.focusTrapElements.some(Boolean);
          r && (this.focusTrap = this.props._createFocusTrap(this.focusTrapElements, this.internalOptions), this.props.active && this.focusTrap.activate(), this.props.paused && this.focusTrap.pause());
        }
      }
    }, {
      key: "componentDidMount",
      value: function() {
        this.props.active && this.setupFocusTrap();
      }
    }, {
      key: "componentDidUpdate",
      value: function(r) {
        if (this.focusTrap) {
          r.containerElements !== this.props.containerElements && this.focusTrap.updateContainerElements(this.props.containerElements);
          var b = !r.active && this.props.active, f = r.active && !this.props.active, e = !r.paused && this.props.paused, n = r.paused && !this.props.paused;
          if (b && (this.updatePreviousElement(), this.focusTrap.activate()), f) {
            this.deactivateTrap();
            return;
          }
          e && this.focusTrap.pause(), n && this.focusTrap.unpause();
        } else
          r.containerElements !== this.props.containerElements && (this.focusTrapElements = this.props.containerElements), this.props.active && (this.updatePreviousElement(), this.setupFocusTrap());
      }
    }, {
      key: "componentWillUnmount",
      value: function() {
        this.deactivateTrap();
      }
    }, {
      key: "render",
      value: function() {
        var r = this, b = this.props.children ? N.Children.only(this.props.children) : void 0;
        if (b) {
          if (b.type && b.type === N.Fragment)
            throw new Error("A focus-trap cannot use a Fragment as its child container. Try replacing it with a <div> element.");
          var f = function(a) {
            var d = r.props.containerElements;
            b && (H >= 19 ? typeof b.props.ref == "function" ? b.props.ref(a) : b.props.ref && (b.props.ref.current = a) : typeof b.ref == "function" ? b.ref(a) : b.ref && (b.ref.current = a)), r.focusTrapElements = d || [a];
          }, e = N.cloneElement(b, {
            ref: f
          });
          return e;
        }
        return null;
      }
    }]);
  }(N.Component);
  return S.defaultProps = {
    active: !0,
    paused: !1,
    focusTrapOptions: {},
    _createFocusTrap: $
  }, U.exports = S, U.exports.FocusTrap = S, U.exports;
}
var Ne = Pe();
const Re = {
  escapeDeactivates: !1,
  checkCanFocusTrap: async (i) => {
    await Promise.all(
      i.map((t) => new Promise((s) => {
        const l = setInterval(() => {
          getComputedStyle(t).visibility !== "hidden" && (s(), clearInterval(l));
        }, 5);
      }))
    );
  }
}, Ae = (i) => /* @__PURE__ */ ie(Ne.FocusTrap, { ...i, focusTrapOptions: Re });
export {
  Ae as DialogFocusTrap
};
