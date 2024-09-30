import { defineComponent as D, defineAsyncComponent as d, openBlock as s, createElementBlock as o, createElementVNode as i, Fragment as v, renderList as C, createBlock as c, unref as l, createCommentVNode as F, computed as I, toRaw as g, ref as j, watch as w, toDisplayString as B } from "vue";
import { u as E } from "./lib-_zl_F4rU.js";
import { u as S } from "./SingleStep.vue_vue_type_script_setup_true_lang-7rfpuIek.js";
import { u as $ } from "./initial-CNTmZXEc.js";
const L = { class: "b-1 p-16 space-y-2 is-rounded-4" }, M = { class: "is-flex is-flex-direction-column gap-8" }, N = /* @__PURE__ */ D({
  __name: "EachObject",
  props: {
    elements: {},
    items: {},
    setValue: { type: Function },
    deleteValue: { type: Function },
    getValue: { type: Function }
  },
  setup(y) {
    const m = d(() => import("./TheInput--MELEI5o.js")), h = d(() => import("./SelectSingle-BMzk1s10.js")), f = d(() => import("./TextArea-JLIl0IB5.js")), V = d(() => import("./CheckBox-BZNMH_WF.js")), k = d(() => import("./TheRadio-Bgnio8Ja.js")), u = y, b = () => {
      u.items && u.deleteValue(u.items);
    }, n = (t) => u.getValue(t, u.items);
    return (t, _) => (s(), o("div", L, [
      i("div", M, [
        (s(!0), o(v, null, C(t.elements, (e) => (s(), o(v, { key: e }, [
          e.type === "input" ? (s(), c(l(m), {
            key: 0,
            element: e,
            items: t.items,
            "temp-value": n(e.schema),
            "set-value": t.setValue
          }, null, 8, ["element", "items", "temp-value", "set-value"])) : e.type === "select" ? (s(), c(l(h), {
            key: 1,
            element: e,
            items: t.items,
            "temp-value": n(e.schema),
            "set-value": t.setValue
          }, null, 8, ["element", "items", "temp-value", "set-value"])) : e.type === "radio" ? (s(), c(l(k), {
            key: 2,
            element: e,
            items: t.items,
            "temp-value": n(e.schema),
            "set-value": t.setValue
          }, null, 8, ["element", "items", "temp-value", "set-value"])) : e.type === "checkbox" ? (s(), c(l(V), {
            key: 3,
            element: e,
            "set-value": t.setValue
          }, null, 8, ["element", "set-value"])) : e.type === "textarea" ? (s(), c(l(f), {
            key: 4,
            element: e,
            items: t.items,
            "temp-value": n(e.schema),
            "set-value": t.setValue
          }, null, 8, ["element", "items", "temp-value", "set-value"])) : F("", !0)
        ], 64))), 128))
      ]),
      i("button", {
        onClick: b,
        class: "button ac-button is-danger"
      }, "Delete")
    ]));
  }
}), O = { key: 0 }, R = /* @__PURE__ */ i("p", null, "Array object form loading", -1), G = [
  R
], q = { class: "is-flex is-justify-content-space-between my-2" }, x = { class: "is-flex is-flex-direction-column gap-16" }, P = /* @__PURE__ */ D({
  __name: "ArrayObject",
  props: {
    ui: {},
    parentData: {},
    parentError: { type: Function }
  },
  setup(y) {
    const m = y, { data: h, isLoading: f, loadData: V } = S();
    V(m.ui.loader);
    const k = I(() => ({
      ...g(l(m.parentData)),
      input: g(l(h))
    })), { calculateInitValue: u } = $(), b = u(m.ui, k.value), n = j(b), t = (a, r, p) => {
      p && (n.value[parseInt(p)][a] = r);
    }, _ = (a, r) => n.value[r][a], e = (a) => {
      n.value.splice(parseInt(a), 1);
    }, { setValue: T } = E();
    return w(
      n,
      (a) => {
        T(m.ui.schema, g(a));
      },
      { immediate: !0 }
    ), (a, r) => (s(), o("div", null, [
      l(f) ? (s(), o("div", O, G)) : (s(), o(v, { key: 1 }, [
        i("div", q, [
          i("h4", null, B(a.ui.label), 1),
          i("button", {
            onClick: r[0] || (r[0] = (p) => n.value.push({})),
            class: "button ac-button is-primary"
          }, "Add new")
        ]),
        i("div", x, [
          (s(!0), o(v, null, C(n.value, (p, A) => (s(), c(N, {
            key: p,
            elements: a.ui.elements,
            items: String(A),
            "set-value": t,
            "get-value": _,
            "delete-value": e
          }, null, 8, ["elements", "items"]))), 128))
        ])
      ], 64))
    ]));
  }
});
export {
  P as default
};
