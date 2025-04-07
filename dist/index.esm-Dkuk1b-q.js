/*!
* tabbable 6.2.0
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/
var T = ["input:not([inert])", "select:not([inert])", "textarea:not([inert])", "a[href]:not([inert])", "button:not([inert])", "[tabindex]:not(slot):not([inert])", "audio[controls]:not([inert])", "video[controls]:not([inert])", '[contenteditable]:not([contenteditable="false"]):not([inert])', "details>summary:first-of-type:not([inert])", "details:not([inert])"], v = /* @__PURE__ */ T.join(","), m = typeof Element > "u", d = m ? function() {
} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector, b = !m && Element.prototype.getRootNode ? function(i) {
  var t;
  return i == null || (t = i.getRootNode) === null || t === void 0 ? void 0 : t.call(i);
} : function(i) {
  return i == null ? void 0 : i.ownerDocument;
}, h = function i(t, e) {
  var r;
  e === void 0 && (e = !0);
  var a = t == null || (r = t.getAttribute) === null || r === void 0 ? void 0 : r.call(t, "inert"), l = a === "" || a === "true", n = l || e && t && i(t.parentNode);
  return n;
}, x = function(t) {
  var e, r = t == null || (e = t.getAttribute) === null || e === void 0 ? void 0 : e.call(t, "contenteditable");
  return r === "" || r === "true";
}, I = function(t, e, r) {
  if (h(t))
    return [];
  var a = Array.prototype.slice.apply(t.querySelectorAll(v));
  return e && d.call(t, v) && a.unshift(t), a = a.filter(r), a;
}, N = function i(t, e, r) {
  for (var a = [], l = Array.from(t); l.length; ) {
    var n = l.shift();
    if (!h(n, !1))
      if (n.tagName === "SLOT") {
        var u = n.assignedElements(), c = u.length ? u : n.children, s = i(c, !0, r);
        r.flatten ? a.push.apply(a, s) : a.push({
          scopeParent: n,
          candidates: s
        });
      } else {
        var f = d.call(n, v);
        f && r.filter(n) && (e || !t.includes(n)) && a.push(n);
        var o = n.shadowRoot || // check for an undisclosed shadow
        typeof r.getShadowRoot == "function" && r.getShadowRoot(n), E = !h(o, !1) && (!r.shadowRootFilter || r.shadowRootFilter(n));
        if (o && E) {
          var p = i(o === !0 ? n.children : o.children, !0, r);
          r.flatten ? a.push.apply(a, p) : a.push({
            scopeParent: n,
            candidates: p
          });
        } else
          l.unshift.apply(l, n.children);
      }
  }
  return a;
}, R = function(t) {
  return !isNaN(parseInt(t.getAttribute("tabindex"), 10));
}, y = function(t) {
  if (!t)
    throw new Error("No node provided");
  return t.tabIndex < 0 && (/^(AUDIO|VIDEO|DETAILS)$/.test(t.tagName) || x(t)) && !R(t) ? 0 : t.tabIndex;
}, A = function(t, e) {
  var r = y(t);
  return r < 0 && e && !R(t) ? 0 : r;
}, O = function(t, e) {
  return t.tabIndex === e.tabIndex ? t.documentOrder - e.documentOrder : t.tabIndex - e.tabIndex;
}, C = function(t) {
  return t.tagName === "INPUT";
}, F = function(t) {
  return C(t) && t.type === "hidden";
}, D = function(t) {
  var e = t.tagName === "DETAILS" && Array.prototype.slice.apply(t.children).some(function(r) {
    return r.tagName === "SUMMARY";
  });
  return e;
}, M = function(t, e) {
  for (var r = 0; r < t.length; r++)
    if (t[r].checked && t[r].form === e)
      return t[r];
}, k = function(t) {
  if (!t.name)
    return !0;
  var e = t.form || b(t), r = function(u) {
    return e.querySelectorAll('input[type="radio"][name="' + u + '"]');
  }, a;
  if (typeof window < "u" && typeof window.CSS < "u" && typeof window.CSS.escape == "function")
    a = r(window.CSS.escape(t.name));
  else
    try {
      a = r(t.name);
    } catch (n) {
      return console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s", n.message), !1;
    }
  var l = M(a, t.form);
  return !l || l === t;
}, L = function(t) {
  return C(t) && t.type === "radio";
}, P = function(t) {
  return L(t) && !k(t);
}, B = function(t) {
  var e, r = t && b(t), a = (e = r) === null || e === void 0 ? void 0 : e.host, l = !1;
  if (r && r !== t) {
    var n, u, c;
    for (l = !!((n = a) !== null && n !== void 0 && (u = n.ownerDocument) !== null && u !== void 0 && u.contains(a) || t != null && (c = t.ownerDocument) !== null && c !== void 0 && c.contains(t)); !l && a; ) {
      var s, f, o;
      r = b(a), a = (s = r) === null || s === void 0 ? void 0 : s.host, l = !!((f = a) !== null && f !== void 0 && (o = f.ownerDocument) !== null && o !== void 0 && o.contains(a));
    }
  }
  return l;
}, w = function(t) {
  var e = t.getBoundingClientRect(), r = e.width, a = e.height;
  return r === 0 && a === 0;
}, j = function(t, e) {
  var r = e.displayCheck, a = e.getShadowRoot;
  if (getComputedStyle(t).visibility === "hidden")
    return !0;
  var l = d.call(t, "details>summary:first-of-type"), n = l ? t.parentElement : t;
  if (d.call(n, "details:not([open]) *"))
    return !0;
  if (!r || r === "full" || r === "legacy-full") {
    if (typeof a == "function") {
      for (var u = t; t; ) {
        var c = t.parentElement, s = b(t);
        if (c && !c.shadowRoot && a(c) === !0)
          return w(t);
        t.assignedSlot ? t = t.assignedSlot : !c && s !== t.ownerDocument ? t = s.host : t = c;
      }
      t = u;
    }
    if (B(t))
      return !t.getClientRects().length;
    if (r !== "legacy-full")
      return !0;
  } else if (r === "non-zero-area")
    return w(t);
  return !1;
}, q = function(t) {
  if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(t.tagName))
    for (var e = t.parentElement; e; ) {
      if (e.tagName === "FIELDSET" && e.disabled) {
        for (var r = 0; r < e.children.length; r++) {
          var a = e.children.item(r);
          if (a.tagName === "LEGEND")
            return d.call(e, "fieldset[disabled] *") ? !0 : !a.contains(t);
        }
        return !0;
      }
      e = e.parentElement;
    }
  return !1;
}, g = function(t, e) {
  return !(e.disabled || // we must do an inert look up to filter out any elements inside an inert ancestor
  //  because we're limited in the type of selectors we can use in JSDom (see related
  //  note related to `candidateSelectors`)
  h(e) || F(e) || j(e, t) || // For a details element with a summary, the summary element gets the focus
  D(e) || q(e));
}, S = function(t, e) {
  return !(P(e) || y(e) < 0 || !g(t, e));
}, U = function(t) {
  var e = parseInt(t.getAttribute("tabindex"), 10);
  return !!(isNaN(e) || e >= 0);
}, V = function i(t) {
  var e = [], r = [];
  return t.forEach(function(a, l) {
    var n = !!a.scopeParent, u = n ? a.scopeParent : a, c = A(u, n), s = n ? i(a.candidates) : u;
    c === 0 ? n ? e.push.apply(e, s) : e.push(u) : r.push({
      documentOrder: l,
      tabIndex: c,
      item: a,
      isScope: n,
      content: s
    });
  }), r.sort(O).reduce(function(a, l) {
    return l.isScope ? a.push.apply(a, l.content) : a.push(l.content), a;
  }, []).concat(e);
}, z = function(t, e) {
  e = e || {};
  var r;
  return e.getShadowRoot ? r = N([t], e.includeContainer, {
    filter: S.bind(null, e),
    flatten: !1,
    getShadowRoot: e.getShadowRoot,
    shadowRootFilter: U
  }) : r = I(t, e.includeContainer, S.bind(null, e)), V(r);
}, W = function(t, e) {
  e = e || {};
  var r;
  return e.getShadowRoot ? r = N([t], e.includeContainer, {
    filter: g.bind(null, e),
    flatten: !0,
    getShadowRoot: e.getShadowRoot
  }) : r = I(t, e.includeContainer, g.bind(null, e)), r;
}, Z = function(t, e) {
  if (e = e || {}, !t)
    throw new Error("No node provided");
  return d.call(t, v) === !1 ? !1 : S(e, t);
}, G = /* @__PURE__ */ T.concat("iframe").join(","), X = function(t, e) {
  if (e = e || {}, !t)
    throw new Error("No node provided");
  return d.call(t, G) === !1 ? !1 : g(e, t);
};
const Y = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  focusable: W,
  getTabIndex: y,
  isFocusable: X,
  isTabbable: Z,
  tabbable: z
}, Symbol.toStringTag, { value: "Module" }));
export {
  X as a,
  Y as b,
  W as f,
  y as g,
  Z as i,
  z as t
};
