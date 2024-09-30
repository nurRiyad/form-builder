import { defineComponent as u, unref as o, openBlock as t, createElementBlock as a, toDisplayString as d, createCommentVNode as m, Fragment as _, renderList as h, withDirectives as f, createBlock as v, vShow as k, createElementVNode as S } from "vue";
import { u as y, _ as b } from "./SingleStep.vue_vue_type_script_setup_true_lang-7rfpuIek.js";
const g = { key: 0 }, E = /* @__PURE__ */ S("h1", null, "MultiStepForm data fetching", -1), B = [
  E
], D = { key: 1 }, F = {
  key: 0,
  class: "font-semibold text-xl text-center"
}, M = /* @__PURE__ */ u({
  __name: "MultiStep",
  props: {
    activeStep: {},
    ui: {},
    parentErr: { type: Function }
  },
  setup(i) {
    const s = i, { loadData: l, data: p, isLoading: c } = y();
    return l(s.ui.loader), (e, L) => o(c) ? (t(), a("div", g, B)) : (t(), a("div", D, [
      e.ui.label ? (t(), a("p", F, d(e.ui.label), 1)) : m("", !0),
      (t(!0), a(_, null, h(e.ui.step, (n, r) => f((t(), v(b, {
        key: r + n.label,
        ui: n,
        "parent-data": o(p),
        "is-active": r === e.activeStep,
        "parent-err": e.parentErr
      }, null, 8, ["ui", "parent-data", "is-active", "parent-err"])), [
        [k, r === e.activeStep]
      ])), 128))
    ]));
  }
});
export {
  M as default
};
