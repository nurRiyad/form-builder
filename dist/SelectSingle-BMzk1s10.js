import { defineComponent as g, inject as D, computed as m, toRaw as u, unref as n, ref as b, onUnmounted as k, openBlock as s, createElementBlock as r, createVNode as w, toDisplayString as S, createCommentVNode as x, createElementVNode as E } from "vue";
import { u as B, g as F } from "./initial-CNTmZXEc.js";
import { u as L } from "./SingleStep.vue_vue_type_script_setup_true_lang-7rfpuIek.js";
import { w as N, a as C } from "./lib-_zl_F4rU.js";
import { u as I } from "./label-D7zNFZnk.js";
import U from "vue-multiselect";
const $ = { key: 0 }, j = /* @__PURE__ */ E("p", null, "Data fetching", -1), A = [
  j
], M = {
  key: 1,
  class: "ac-single-input is-extra-small"
}, O = {
  key: 0,
  class: "has-text-danger"
}, K = /* @__PURE__ */ g({
  __name: "SelectSingle",
  props: {
    element: {},
    items: {},
    tempValue: {},
    parentData: {},
    setValue: { type: Function },
    deleteValue: { type: Function },
    parentErr: { type: Function }
  },
  setup(c) {
    const e = c, p = D("schema"), { data: d, isLoading: f, loadData: h } = L();
    h(e.element.loader);
    const V = m(() => ({
      ...u(n(e.parentData)),
      input: u(n(d))
    })), { calculateInitValue: _ } = B(), v = e.items === void 0 ? _(e.element, V.value) : e.tempValue, o = b(v);
    N(
      o,
      (a) => {
        e.setValue(e.element.schema, a, e.items);
      },
      { immediate: !0, debounce: 0 }
    ), I(o);
    const { err: i, showStar: P } = C(e.element, o, e.parentErr), y = m(() => {
      let a = [];
      if (e.element.options)
        a = e.element.options;
      else {
        let t = e.element.schema;
        t = `${t.replace("schema/", "")}`, t = t.replaceAll("/", ".");
        const l = `${t}.enum`;
        a = F(p, l) || [];
      }
      return a.map((t) => typeof t == "string" ? { name: t, value: t } : t);
    });
    return k(() => {
      e.deleteValue && e.deleteValue(e.element.schema);
    }), (a, t) => n(f) ? (s(), r("div", $, A)) : (s(), r("div", M, [
      w(n(U), {
        modelValue: o.value,
        "onUpdate:modelValue": t[0] || (t[0] = (l) => o.value = l),
        options: y.value,
        label: "value",
        "track-by": "name",
        searchable: !1
      }, null, 8, ["modelValue", "options"]),
      n(i) ? (s(), r("p", O, S(n(i)), 1)) : x("", !0)
    ]));
  }
});
export {
  K as default
};
