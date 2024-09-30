import { defineComponent as v, computed as V, toRaw as i, unref as n, ref as b, onUnmounted as k, openBlock as l, createElementBlock as d, createElementVNode as t, toDisplayString as D, withDirectives as S, vModelCheckbox as y, pushScopeId as I, popScopeId as g } from "vue";
import { u as x } from "./initial-CNTmZXEc.js";
import { u as B } from "./SingleStep.vue_vue_type_script_setup_true_lang-7rfpuIek.js";
import { w as C } from "./lib-_zl_F4rU.js";
import { _ as E } from "./_plugin-vue_export-helper-CHgC5LLL.js";
const u = (a) => (I("data-v-38a06a0b"), a = a(), g(), a), F = { key: 0 }, L = /* @__PURE__ */ u(() => /* @__PURE__ */ t("p", null, "Switch data fetching", -1)), T = [
  L
], U = { key: 1 }, M = { class: "is-flex is-align-items-center gap-8" }, N = { for: "ac-switch" }, R = { class: "switch" }, j = /* @__PURE__ */ u(() => /* @__PURE__ */ t("span", { class: "slider round" }, null, -1)), q = /* @__PURE__ */ v({
  __name: "TheSwitch",
  props: {
    element: {},
    func: {},
    items: {},
    tempValue: {},
    parentData: {},
    setValue: { type: Function },
    deleteValue: { type: Function }
  },
  setup(a) {
    const e = a, { data: p, isLoading: m, loadData: r } = B();
    r(e.element.loader);
    const h = V(() => ({
      ...i(n(e.parentData)),
      input: i(n(p))
    })), { calculateInitValue: _ } = x(), f = e.items === void 0 ? _(e.element, h.value) : e.tempValue, o = b(f);
    return C(
      o,
      (s) => {
        e.setValue(e.element.schema, s, e.items);
      },
      { immediate: !0, debounce: 0 }
    ), k(() => {
      e.deleteValue && e.deleteValue(e.element.schema);
    }), (s, c) => n(m) ? (l(), d("div", F, T)) : (l(), d("div", U, [
      t("div", M, [
        t("label", N, D(s.element.label), 1),
        t("label", R, [
          S(t("input", {
            id: "ac-switch",
            name: "ac-switch",
            "onUpdate:modelValue": c[0] || (c[0] = (w) => o.value = w),
            type: "checkbox"
          }, null, 512), [
            [y, o.value]
          ]),
          j
        ])
      ])
    ]));
  }
}), K = /* @__PURE__ */ E(q, [["__scopeId", "data-v-38a06a0b"]]);
export {
  K as default
};
