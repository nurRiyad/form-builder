import { inject as L, ref as b, defineComponent as B, defineAsyncComponent as l, openBlock as a, createBlock as n, unref as t, createElementBlock as c, computed as w, toRaw as g, watch as A, createElementVNode as T, toDisplayString as C, Fragment as S, renderList as F, createCommentVNode as V } from "vue";
import { u as I } from "./lib-_zl_F4rU.js";
const z = () => {
  const y = L("func"), o = b(void 0), p = b(!1);
  return { loadData: async (m) => {
    if (!(!m || !y)) {
      try {
        p.value = !0, o.value = await y[m]();
      } catch (v) {
        console.error(v);
      }
      p.value = !1;
    }
  }, isLoading: p, data: o };
}, M = { key: 13 }, N = /* @__PURE__ */ B({
  __name: "AllElement",
  props: {
    el: {},
    cData: {},
    parentErr: { type: Function }
  },
  setup(y) {
    const o = l(() => import("./TheInput--MELEI5o.js")), p = l(() => import("./SelectSingle-BMzk1s10.js")), k = l(() => import("./SelectMultiple-C1rRkIu_.js")), m = l(() => import("./TextArea-JLIl0IB5.js")), v = l(() => import("./CheckBox-BZNMH_WF.js")), h = l(() => import("./TheRadio-Bgnio8Ja.js")), E = l(() => import("./TheSwitch-BgMHWtsI.js")), f = l(() => import("./TheAnchor-C75R3iD-.js")), D = l(() => import("./ArrayObject-jDg9vO9g.js")), r = l(() => import("./ArrayItem-CUzFIkfB.js")), u = l(() => import("./TheObject-B1T17UxI.js")), s = l(() => import("./TheBlock-BiPapOvm.js")), j = l(() => import("./HorizonTal-DnkxhGXQ.js")), { setValue: i, deleteValue: d } = I();
    return (e, q) => e.el.type === "block-layout" ? (a(), n(t(s), {
      key: 0,
      ui: e.el,
      "c-data": e.cData,
      "parent-err": e.parentErr
    }, null, 8, ["ui", "c-data", "parent-err"])) : e.el.type === "horizontal-layout" ? (a(), n(t(j), {
      key: 1,
      ui: e.el,
      "c-data": e.cData,
      "parent-err": e.parentErr
    }, null, 8, ["ui", "c-data", "parent-err"])) : e.el.type === "input" ? (a(), n(t(o), {
      key: 2,
      element: e.el,
      "parent-data": e.cData,
      "set-value": t(i),
      "delete-value": t(d),
      "parent-err": e.parentErr
    }, null, 8, ["element", "parent-data", "set-value", "delete-value", "parent-err"])) : e.el.type === "select" ? (a(), n(t(p), {
      key: 3,
      element: e.el,
      "parent-data": e.cData,
      "set-value": t(i),
      "delete-value": t(d),
      "parent-err": e.parentErr
    }, null, 8, ["element", "parent-data", "set-value", "delete-value", "parent-err"])) : e.el.type === "multi-select" ? (a(), n(t(k), {
      key: 4,
      element: e.el,
      "parent-data": e.cData,
      "set-value": t(i),
      "delete-value": t(d),
      "parent-err": e.parentErr
    }, null, 8, ["element", "parent-data", "set-value", "delete-value", "parent-err"])) : e.el.type === "radio" ? (a(), n(t(h), {
      key: 5,
      element: e.el,
      "parent-data": e.cData,
      "set-value": t(i),
      "delete-value": t(d),
      "parent-err": e.parentErr
    }, null, 8, ["element", "parent-data", "set-value", "delete-value", "parent-err"])) : e.el.type === "switch" ? (a(), n(t(E), {
      key: 6,
      element: e.el,
      "parent-data": e.cData,
      "set-value": t(i),
      "delete-value": t(d)
    }, null, 8, ["element", "parent-data", "set-value", "delete-value"])) : e.el.type === "checkbox" ? (a(), n(t(v), {
      key: 7,
      element: e.el,
      "parent-data": e.cData,
      "set-value": t(i),
      "delete-value": t(d),
      "parent-err": e.parentErr
    }, null, 8, ["element", "parent-data", "set-value", "delete-value", "parent-err"])) : e.el.type === "anchor" ? (a(), n(t(f), {
      key: 8,
      element: e.el,
      "parent-data": e.cData
    }, null, 8, ["element", "parent-data"])) : e.el.type === "textarea" ? (a(), n(t(m), {
      key: 9,
      element: e.el,
      "parent-data": e.cData,
      "set-value": t(i),
      "delete-value": t(d),
      "parent-err": e.parentErr
    }, null, 8, ["element", "parent-data", "set-value", "delete-value", "parent-err"])) : e.el.type === "array-object-form" ? (a(), n(t(D), {
      key: 10,
      ui: e.el,
      "parent-data": e.cData,
      "parent-error": e.parentErr
    }, null, 8, ["ui", "parent-data", "parent-error"])) : e.el.type === "array-item-form" ? (a(), n(t(r), {
      key: 11,
      ui: e.el,
      "parent-data": e.cData,
      "parent-error": e.parentErr
    }, null, 8, ["ui", "parent-data", "parent-error"])) : e.el.type === "object-item" ? (a(), n(t(u), {
      key: 12,
      ui: e.el,
      "parent-data": e.cData,
      "parent-error": e.parentErr
    }, null, 8, ["ui", "parent-data", "parent-error"])) : (a(), c("p", M, "Element type not found"));
  }
}), O = { key: 0 }, R = /* @__PURE__ */ T("h1", null, "Single Step Form Loading", -1), $ = [
  R
], G = {
  key: 1,
  class: "is-flex is-flex-direction-column gap-8"
}, H = { class: "font-semibold text-xl text-center" }, P = /* @__PURE__ */ B({
  __name: "SingleStep",
  props: {
    ui: {},
    isActive: { type: Boolean },
    parentData: {},
    parentErr: { type: Function }
  },
  setup(y) {
    const o = y, p = L("func"), { data: k, isLoading: m, loadData: v } = z();
    v(o.ui.loader);
    const h = w(() => ({
      multi: g(t(o.parentData)),
      single: g(t(k))
    })), E = (r) => {
      if (!r || !p) return !0;
      if (r.type === "computed")
        return p[r.name].value;
      {
        const u = r.name.split("|"), s = u[0];
        return p[s]({ cdata: h.value, params: u });
      }
    }, f = b(0), D = (r) => {
      f.value += r;
    };
    return A(
      () => o.isActive,
      (r) => {
        r && o.parentErr(f.value);
      },
      { immediate: !0 }
    ), A(f, (r, u) => {
      o.isActive && (r == 0 && u > 0 && o.parentErr(-1), r > 0 && u == 0 && o.parentErr(1));
    }), (r, u) => (a(), c("div", null, [
      t(m) ? (a(), c("div", O, $)) : (a(), c("div", G, [
        T("h6", H, C(r.ui.label), 1),
        (a(!0), c(S, null, F(r.ui.elements, (s) => (a(), c(S, {
          key: s.label
        }, [
          E(s.if) ? (a(), n(N, {
            key: 0,
            "c-data": h.value,
            el: s,
            "parent-err": D
          }, null, 8, ["c-data", "el"])) : V("", !0)
        ], 64))), 128))
      ]))
    ]));
  }
});
export {
  P as _,
  N as a,
  z as u
};
