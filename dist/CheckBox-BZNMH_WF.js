import { defineComponent as g, computed as w, toRaw as s, unref as a, ref as d, onUnmounted as C, openBlock as r, createElementBlock as i, createElementVNode as l, withDirectives as E, vModelCheckbox as S, toDisplayString as p, createCommentVNode as B } from "vue";
import { u as F } from "./initial-CNTmZXEc.js";
import { u as I } from "./SingleStep.vue_vue_type_script_setup_true_lang-7rfpuIek.js";
import { a as L, w as N } from "./lib-_zl_F4rU.js";
const U = { key: 0 }, x = /* @__PURE__ */ l("p", null, "Check is fetching", -1), M = [
  x
], R = { key: 1 }, $ = { class: "field" }, j = ["id", "name"], q = ["for"], z = {
  key: 0,
  class: "is-danger"
}, O = /* @__PURE__ */ g({
  __name: "CheckBox",
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
  setup(h) {
    const e = h, { data: f, isLoading: k, loadData: v } = I();
    v(e.element.loader);
    const V = w(() => ({
      ...s(a(e.parentData)),
      input: s(a(f))
    })), { calculateInitValue: b } = F(), y = e.items === void 0 ? b(e.element, V.value) : e.tempValue, o = d(y), { err: c, showLocalErr: _ } = L(e.element, o, e.parentErr);
    N(
      o,
      (t) => {
        e.setValue(e.element.schema, t, e.items);
      },
      { immediate: !0, debounce: 0 }
    );
    const u = d(!1), D = { ...s(a(e.parentData)) };
    return (async () => {
      var t;
      if ((t = e == null ? void 0 : e.element) != null && t.loader) {
        try {
          u.value = !0;
          const n = e.element.loader;
          D.checkbox = await e.func[n]();
        } catch (n) {
          console.error(n);
        }
        u.value = !1;
      }
    })(), C(() => {
      e.deleteValue && e.deleteValue(e.element.schema);
    }), (t, n) => a(k) ? (r(), i("div", U, M)) : (r(), i("div", R, [
      l("div", $, [
        E(l("input", {
          class: "is-checkradio has-background-color is-primary",
          type: "checkbox",
          id: String(t.element.label) + String(t.items),
          name: t.element.label,
          "onUpdate:modelValue": n[0] || (n[0] = (m) => o.value = m),
          onInput: n[1] || (n[1] = (m) => _.value = !0)
        }, null, 40, j), [
          [S, o.value]
        ]),
        l("label", {
          for: String(t.element.label) + String(t.items)
        }, p(t.element.label), 9, q)
      ]),
      a(c) ? (r(), i("p", z, p(a(c)), 1)) : B("", !0)
    ]));
  }
});
export {
  O as default
};
