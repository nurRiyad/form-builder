import { defineComponent as S, inject as E, computed as p, toRaw as f, unref as a, ref as B, onUnmounted as C, openBlock as o, createElementBlock as s, createElementVNode as u, normalizeClass as N, createTextVNode as x, toDisplayString as r, createCommentVNode as h, withDirectives as H, Fragment as I, renderList as M, vModelSelect as U } from "vue";
import { u as $, g as j } from "./initial-CNTmZXEc.js";
import { u as q } from "./SingleStep.vue_vue_type_script_setup_true_lang-7rfpuIek.js";
import { w as z, a as A } from "./lib-_zl_F4rU.js";
import { u as O } from "./label-D7zNFZnk.js";
const P = { key: 0 }, R = /* @__PURE__ */ u("p", null, "Data fetching", -1), T = [
  R
], G = {
  key: 1,
  class: "is-flex is-flex-direction-column gap-8"
}, J = ["for"], K = {
  key: 0,
  class: "is-required"
}, Q = ["name", "id"], W = ["value"], X = {
  key: 0,
  class: "has-text-danger"
}, ae = /* @__PURE__ */ S({
  __name: "SelectMultiple",
  props: {
    element: {},
    items: {},
    tempValue: {},
    parentData: {},
    setValue: { type: Function },
    deleteValue: { type: Function },
    parentErr: { type: Function }
  },
  setup(V) {
    const t = V, _ = E("schema"), { data: v, isLoading: b, loadData: y } = q();
    y(t.element.loader);
    const g = p(() => ({
      ...f(a(t.parentData)),
      input: f(a(v))
    })), { calculateInitValue: D } = $(), k = t.items === void 0 ? D(t.element, g.value) : t.tempValue, i = B(k || []);
    z(
      i,
      (l) => {
        t.setValue(t.element.schema, l, t.items);
      },
      { immediate: !0, debounce: 0 }
    );
    const { isLabelHoisted: w, hoist: m, unHoist: c } = O(i), { err: d, showStar: F } = A(t.element, i, t.parentErr), L = p(() => {
      let l = [];
      if (t.element.options)
        l = t.element.options;
      else {
        let e = t.element.schema;
        e = `${e.replace("schema/", "")}`, e = e.replaceAll("/", ".");
        const n = `${e}.enum`;
        l = j(_, n) || [];
      }
      return l.map((e) => typeof e == "string" ? { name: e, value: e } : e);
    });
    return C(() => {
      t.deleteValue && t.deleteValue(t.element.schema);
    }), (l, e) => a(b) ? (o(), s("div", P, T)) : (o(), s("div", G, [
      u("label", {
        for: l.element.label,
        class: N(["ac-label", { "show-label": a(w) }])
      }, [
        x(r(l.element.label), 1),
        a(F) ? (o(), s("span", K, " * ")) : h("", !0)
      ], 10, J),
      H(u("select", {
        "onUpdate:modelValue": e[0] || (e[0] = (n) => i.value = n),
        name: l.element.label,
        id: l.element.label,
        onFocusout: e[1] || (e[1] = //@ts-ignore
        (...n) => a(c) && a(c)(...n)),
        onFocus: e[2] || (e[2] = //@ts-ignore
        (...n) => a(m) && a(m)(...n)),
        multiple: ""
      }, [
        (o(!0), s(I, null, M(L.value, (n) => (o(), s("option", {
          key: n.value,
          value: n.value
        }, r(n.name), 9, W))), 128))
      ], 40, Q), [
        [U, i.value]
      ]),
      a(d) ? (o(), s("p", X, r(a(d)), 1)) : h("", !0)
    ]));
  }
});
export {
  ae as default
};
