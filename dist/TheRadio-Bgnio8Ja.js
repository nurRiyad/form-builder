import { defineComponent as D, computed as d, toRaw as c, unref as l, ref as b, onUnmounted as S, openBlock as o, createElementBlock as s, createElementVNode as r, toDisplayString as u, Fragment as w, renderList as E, withDirectives as F, vModelRadio as R, createCommentVNode as B } from "vue";
import { u as I } from "./initial-CNTmZXEc.js";
import { u as L } from "./SingleStep.vue_vue_type_script_setup_true_lang-7rfpuIek.js";
import { w as C, a as N } from "./lib-_zl_F4rU.js";
const U = { key: 0 }, M = /* @__PURE__ */ r("p", null, "Is Radio data fetching", -1), O = [
  M
], T = {
  key: 1,
  class: "mb-8"
}, j = ["id", "name", "value"], q = ["for"], z = {
  key: 0,
  class: "is-danger"
}, K = /* @__PURE__ */ D({
  __name: "TheRadio",
  props: {
    element: {},
    func: {},
    items: {},
    tempValue: {},
    parentData: {},
    setValue: { type: Function },
    deleteValue: { type: Function },
    parentErr: { type: Function }
  },
  setup(p) {
    const e = p, { data: f, isLoading: v, loadData: h } = L();
    h(e.element.loader);
    const _ = d(() => ({
      ...c(l(e.parentData)),
      input: c(l(f))
    })), { calculateInitValue: V } = I(), y = e.items === void 0 ? V(e.element, _.value) : e.tempValue, i = b(y);
    C(
      i,
      (t) => {
        e.setValue(e.element.schema, t, e.items);
      },
      { immediate: !0, debounce: 0 }
    );
    const { err: m } = N(e.element, i, e.parentErr);
    S(() => {
      e.deleteValue && e.deleteValue(e.element.schema);
    });
    const g = d(() => (e.element.options || []).map((n) => typeof n == "string" ? { name: n, value: n } : n));
    return (t, n) => l(v) ? (o(), s("div", U, O)) : (o(), s("div", T, [
      r("h6", null, u(t.element.label), 1),
      (o(!0), s(w, null, E(g.value, (a) => (o(), s("div", {
        key: a.value,
        class: "field"
      }, [
        F(r("input", {
          "onUpdate:modelValue": n[0] || (n[0] = (k) => i.value = k),
          type: "radio",
          class: "is-checkradio",
          id: String(a.value) + String(t.items),
          name: t.element.label,
          value: a.value
        }, null, 8, j), [
          [R, i.value]
        ]),
        r("label", {
          for: String(a.value) + String(t.items)
        }, u(a.name), 9, q)
      ]))), 128)),
      l(m) ? (o(), s("p", z, u(l(m)), 1)) : B("", !0)
    ]));
  }
});
export {
  K as default
};
