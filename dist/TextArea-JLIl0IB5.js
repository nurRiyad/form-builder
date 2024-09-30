import { defineComponent as E, computed as F, toRaw as f, unref as t, ref as L, onUnmounted as B, openBlock as l, createElementBlock as r, createElementVNode as i, normalizeClass as C, toDisplayString as v, createCommentVNode as V, withDirectives as x, vModelText as I } from "vue";
import { u as S } from "./initial-CNTmZXEc.js";
import { u as T } from "./SingleStep.vue_vue_type_script_setup_true_lang-7rfpuIek.js";
import { w as q, a as H } from "./lib-_zl_F4rU.js";
import { u as N } from "./label-D7zNFZnk.js";
const U = { key: 0 }, $ = /* @__PURE__ */ i("p", null, "Textarea data fetching", -1), z = [
  $
], A = {
  key: 1,
  class: "ac-single-input"
}, M = ["for"], R = {
  key: 0,
  class: "is-required"
}, j = ["id", "name"], G = {
  key: 0,
  class: "has-text-danger"
}, W = /* @__PURE__ */ E({
  __name: "TextArea",
  props: {
    element: {},
    func: {},
    items: {},
    tempValue: {},
    parentData: {},
    setValue: { type: Function },
    deleteValue: { type: Function },
    showStar: { type: Boolean },
    parentErr: { type: Function }
  },
  setup(b) {
    const e = b, { data: h, isLoading: y, loadData: w } = T();
    w(e.element.loader);
    const _ = F(() => ({
      ...f(t(e.parentData)),
      input: f(t(h))
    })), { calculateInitValue: k } = S(), D = e.items === void 0 ? k(e.element, _.value) : e.tempValue, s = L(D);
    q(
      s,
      (n) => {
        e.setValue(e.element.schema, n, e.items);
      },
      { immediate: !0, debounce: 0 }
    );
    const { isLabelHoisted: u, hoist: m, unHoist: d } = N(s), { err: p, showStar: c, showLocalErr: g } = H(e.element, s, e.parentErr);
    return B(() => {
      e.deleteValue && e.deleteValue(e.element.schema);
    }), (n, a) => t(y) ? (l(), r("div", U, z)) : (l(), r("div", A, [
      i("label", {
        class: C(["ac-label", { "is-required": t(c), "show-label": t(u) }]),
        for: n.element.label,
        onClick: a[0] || (a[0] = (o) => u.value = !0)
      }, [
        i("span", null, v(n.element.label), 1),
        t(c) ? (l(), r("span", R, " * ")) : V("", !0)
      ], 10, M),
      x(i("textarea", {
        "onUpdate:modelValue": a[1] || (a[1] = (o) => s.value = o),
        class: "ac-input",
        rows: "4",
        cols: "50",
        id: n.element.label,
        name: n.element.label,
        onInput: a[2] || (a[2] = (o) => g.value = !0),
        onFocus: a[3] || (a[3] = //@ts-ignore
        (...o) => t(m) && t(m)(...o)),
        onFocusout: a[4] || (a[4] = //@ts-ignore
        (...o) => t(d) && t(d)(...o))
      }, null, 40, j), [
        [I, s.value]
      ]),
      t(p) ? (l(), r("p", G, v(t(p)), 1)) : V("", !0)
    ]));
  }
});
export {
  W as default
};
