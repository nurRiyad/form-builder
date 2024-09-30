import { inject as _, computed as y, watch as B, defineComponent as H, toRaw as E, unref as a, ref as M, onUnmounted as P, openBlock as c, createElementBlock as d, normalizeClass as $, createElementVNode as V, createTextVNode as U, toDisplayString as F, createCommentVNode as I, withDirectives as j, vModelDynamic as q } from "vue";
import { u as x, g as L } from "./initial-CNTmZXEc.js";
import { u as z } from "./SingleStep.vue_vue_type_script_setup_true_lang-7rfpuIek.js";
import { u as A, w as G, a as R } from "./lib-_zl_F4rU.js";
import { u as W } from "./label-D7zNFZnk.js";
const w = (n, e, r) => {
  const m = _("func"), { getValue: f } = A(), v = y(() => {
    if (n && (n != null && n.paths)) {
      let l = "";
      return n.paths.forEach((i) => {
        const p = f(i);
        p && (l += String(p));
      }), l;
    } else return "";
  });
  B(v, () => {
    if (n && (n != null && n.func)) {
      const l = n.func;
      if (m) {
        const i = m[l](e.value);
        r.value += i;
      }
    }
  });
}, J = { key: 0 }, K = /* @__PURE__ */ V("h1", null, "This input element is loading...", -1), O = [
  K
], Q = ["for"], X = {
  key: 0,
  class: "is-required"
}, Y = ["id", "name", "type"], Z = {
  key: 0,
  class: "has-text-danger"
}, oe = /* @__PURE__ */ H({
  __name: "TheInput",
  props: {
    element: {},
    items: {},
    tempValue: {},
    parentData: {},
    setValue: { type: Function },
    deleteValue: { type: Function },
    parentErr: { type: Function }
  },
  setup(n) {
    const e = n, r = _("schema"), { data: m, isLoading: f, loadData: v } = z();
    v(e.element.loader);
    const l = y(() => ({
      ...E(a(e.parentData)),
      input: E(a(m))
    })), { calculateInitValue: i } = x(), p = e.items === void 0 ? i(e.element, l.value) : e.tempValue, u = M(p);
    G(
      u,
      (t) => {
        e.setValue(e.element.schema, t, e.items);
      },
      { immediate: !0, debounce: 0 }
    ), w(e.element.watcher, l, u);
    const { isLabelHoisted: b, hoist: h, unHoist: g } = W(u), { err: D, showStar: C, showLocalErr: N } = R(e.element, u, e.parentErr), S = y(() => {
      let t = e.element.schema;
      t = `${t.replace("schema/", "")}`, t = t.replaceAll("/", ".");
      const s = `${t}.type`, o = `${t}.format`, k = L(r, s), T = L(r, o);
      return k === "integer" ? "number" : k === "string" && T === "password" ? "password" : "text";
    });
    return P(() => {
      e.deleteValue && e.deleteValue(e.element.schema);
    }), (t, s) => a(f) ? (c(), d("div", J, O)) : (c(), d("div", {
      key: 1,
      class: $(["ac-single-input is-extra-small", t.$attrs.class])
    }, [
      V("label", {
        class: $(["ac-label", { "show-label": a(b) }]),
        for: t.element.label,
        onClick: s[0] || (s[0] = (o) => b.value = !0)
      }, [
        U(F(t.element.label) + " ", 1),
        a(C) ? (c(), d("span", X, " * ")) : I("", !0)
      ], 10, Q),
      j(V("input", {
        "onUpdate:modelValue": s[1] || (s[1] = (o) => u.value = o),
        class: "ac-input",
        id: t.element.label,
        name: t.element.label,
        type: S.value,
        onInput: s[2] || (s[2] = (o) => N.value = !0),
        onFocus: s[3] || (s[3] = //@ts-ignore
        (...o) => a(h) && a(h)(...o)),
        onFocusout: s[4] || (s[4] = //@ts-ignore
        (...o) => a(g) && a(g)(...o))
      }, null, 40, Y), [
        [q, u.value]
      ]),
      a(D) ? (c(), d("p", Z, F(a(D)), 1)) : I("", !0)
    ], 2));
  }
});
export {
  oe as default
};
