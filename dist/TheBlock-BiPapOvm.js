import { defineComponent as k, openBlock as r, createElementBlock as a, normalizeStyle as v, createElementVNode as e, ref as b, toDisplayString as i, unref as l, createVNode as y, withDirectives as g, Fragment as p, renderList as m, createBlock as h, vShow as w } from "vue";
import { a as _ } from "./SingleStep.vue_vue_type_script_setup_true_lang-7rfpuIek.js";
import { b as B } from "./lib-_zl_F4rU.js";
const D = /* @__PURE__ */ e("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "m19.5 8.25-7.5 7.5-7.5-7.5"
}, null, -1), E = [
  D
], $ = /* @__PURE__ */ k({
  __name: "TheArrow",
  props: {
    direction: { default: "up" }
  },
  setup(c) {
    return (s, o) => (r(), a("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      "stroke-width": "1.5",
      stroke: "currentColor",
      class: "size-4",
      style: v(s.direction === "up" ? "transform: rotate(0deg)" : "transform: rotate(-180deg)")
    }, E, 4));
  }
}), C = {
  key: 0,
  class: "single-accordion-item"
}, x = { class: "accordion-right is-flex is-align-items-center" }, S = { class: "icon" }, V = {
  class: "accordion-body pt-16 b-1 p-20 b-t-n",
  style: { "max-height": "100%", display: "block", "border-radius": "0 0 4px 4px" }
}, z = { key: 1 }, T = /* @__PURE__ */ k({
  __name: "TheBlock",
  props: {
    ui: {},
    parentData: {},
    parentErr: { type: Function }
  },
  setup(c) {
    const s = c, o = b(!0), { updateErr: d, errCnt: f } = B(s.parentErr);
    return (t, u) => t.ui.showLabels ? (r(), a("div", C, [
      e("div", {
        class: "accordion-heading is-clickable",
        style: { "border-radius": "4px 4px 0 0" },
        onClick: u[0] || (u[0] = (n) => o.value = !o.value)
      }, [
        e("h5", null, i(t.ui.label), 1),
        e("div", x, [
          e("p", null, i(t.ui.description), 1),
          e("p", null, i(l(f)), 1),
          e("button", S, [
            y($, {
              direction: o.value ? "up" : "down"
            }, null, 8, ["direction"])
          ])
        ])
      ]),
      g(e("div", V, [
        (r(!0), a(p, null, m(t.ui.elements, (n) => (r(), h(_, {
          key: n.label,
          el: n,
          "c-data": t.parentData,
          "parent-err": l(d)
        }, null, 8, ["el", "c-data", "parent-err"]))), 128))
      ], 512), [
        [w, o.value]
      ])
    ])) : (r(), a("div", z, [
      (r(!0), a(p, null, m(t.ui.elements, (n) => (r(), h(_, {
        key: n.label,
        el: n,
        "c-data": t.parentData,
        "parent-err": l(d)
      }, null, 8, ["el", "c-data", "parent-err"]))), 128))
    ]));
  }
});
export {
  T as default
};
