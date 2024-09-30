import { defineComponent as f, computed as h, toRaw as n, unref as t, ref as v, openBlock as o, createElementBlock as a, createElementVNode as s, toDisplayString as k } from "vue";
import { u as D } from "./initial-CNTmZXEc.js";
import { u as V } from "./SingleStep.vue_vue_type_script_setup_true_lang-7rfpuIek.js";
const g = { key: 0 }, y = /* @__PURE__ */ s("p", null, "Anchor data fetching", -1), b = [
  y
], A = { key: 1 }, B = ["href"], x = /* @__PURE__ */ f({
  __name: "TheAnchor",
  props: {
    element: {},
    func: {},
    items: {},
    tempValue: {},
    parentData: {}
  },
  setup(c) {
    const e = c, { data: l, isLoading: r, loadData: i } = V();
    i(e.element.loader);
    const u = h(() => ({
      ...n(t(e.parentData)),
      input: n(t(l))
    })), { calculateInitValue: m } = D(), p = e.items === void 0 ? m(e.element, u.value) : e.tempValue, d = v(p);
    return (_, E) => t(r) ? (o(), a("div", g, b)) : (o(), a("div", A, [
      s("a", {
        class: "p-2 block underline",
        href: d.value
      }, k(_.element.label), 9, B)
    ]));
  }
});
export {
  x as default
};
