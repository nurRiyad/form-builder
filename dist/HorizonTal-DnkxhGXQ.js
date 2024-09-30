import { defineComponent as k, ref as y, openBlock as r, createElementBlock as a, createElementVNode as n, toDisplayString as s, unref as o, withDirectives as _, Fragment as u, renderList as c, createBlock as d, vShow as b } from "vue";
import { a as f } from "./SingleStep.vue_vue_type_script_setup_true_lang-7rfpuIek.js";
import { b as w } from "./lib-_zl_F4rU.js";
const D = { key: 0 }, E = { class: "is-flex is-justify-content-space-between p-4 bg-gray-400" }, g = { class: "flex space-x-3 is-fullwidth" }, B = { key: 1 }, C = { class: "flex space-x-3 w-full" }, V = /* @__PURE__ */ k({
  __name: "HorizonTal",
  props: {
    ui: {},
    parentData: {},
    parentErr: { type: Function }
  },
  setup(m) {
    const v = m, l = y(!0), { errCnt: h, updateErr: i } = w(v.parentErr);
    return (e, p) => e.ui.showLabels ? (r(), a("div", D, [
      n("div", E, [
        n("p", {
          onClick: p[0] || (p[0] = (t) => l.value = !l.value)
        }, s(e.ui.label), 1),
        n("p", null, s(o(h)), 1),
        n("p", null, s(e.ui.description), 1)
      ]),
      _(n("div", g, [
        (r(!0), a(u, null, c(e.ui.elements, (t) => (r(), d(f, {
          key: t.label,
          el: t,
          "c-data": e.parentData,
          "parent-err": o(i)
        }, null, 8, ["el", "c-data", "parent-err"]))), 128))
      ], 512), [
        [b, l.value]
      ])
    ])) : (r(), a("div", B, [
      n("div", C, [
        (r(!0), a(u, null, c(e.ui.elements, (t) => (r(), d(f, {
          key: t.label,
          el: t,
          "c-data": e.parentData,
          "parent-err": o(i)
        }, null, 8, ["el", "c-data", "parent-err"]))), 128))
      ])
    ]));
  }
});
export {
  V as default
};
