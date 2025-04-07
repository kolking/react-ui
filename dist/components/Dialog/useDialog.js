import { useRef as k, useState as u, useCallback as f, useEffect as m } from "react";
function b(a) {
  const s = k(null), o = k(a), [d, L] = u(!1), [l, v] = u((a == null ? void 0 : a.defaultOpen) ?? !1), [w, E] = u();
  o.current = a;
  const p = f((e) => {
    var n, t;
    E(e), v(!0), (t = (n = o.current) == null ? void 0 : n.onShow) == null || t.call(n, e);
  }, []), c = f(
    (e) => {
      var n;
      l && (v(!1), (n = s.current) == null || n.addEventListener(
        "transitionend",
        () => {
          var t, i, r, h;
          e !== void 0 ? (i = (t = o.current) == null ? void 0 : t.onConfirm) == null || i.call(t, e) : (h = (r = o.current) == null ? void 0 : r.onCancel) == null || h.call(r), E(void 0);
        },
        { once: !0 }
      ));
    },
    [l]
  );
  return m(() => {
    var e, n;
    l ? (e = s.current) == null || e.showModal() : (n = s.current) == null || n.close();
  }, [l]), m(() => {
    const e = s.current;
    function n(r) {
      r.target === r.currentTarget && !d && c();
    }
    function t(r) {
      r.key === "Escape" && d && r.preventDefault();
    }
    function i() {
      c();
    }
    if (e)
      return e.addEventListener("click", n), e.addEventListener("cancel", i), e.addEventListener("keydown", t), () => {
        e.removeEventListener("click", n), e.removeEventListener("cancel", i), e.removeEventListener("keydown", t);
      };
  }, [d, c]), {
    props: { ref: s, open: l },
    data: w,
    disabled: d,
    show: p,
    disable: L,
    confirm: f((e) => c(e), [c]),
    cancel: f(() => c(), [c])
  };
}
export {
  b as useDialog
};
