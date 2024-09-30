import { defineComponent as C, ref as f, watch as h, openBlock as c, createElementBlock as d, createElementVNode as s, normalizeClass as w, unref as l, withDirectives as F, vModelText as H, createVNode as L, computed as j, toRaw as g, initCustomFormatter as E, Fragment as T, toDisplayString as U, renderList as B, createBlock as M } from "vue";
import { u as N } from "./SingleStep.vue_vue_type_script_setup_true_lang-7rfpuIek.js";
import { u as O } from "./initial-CNTmZXEc.js";
import { u as S } from "./lib-_zl_F4rU.js";
import { T as I } from "./TheTrash-JRYUvJcg.js";
import { u as $ } from "./label-D7zNFZnk.js";
const z = { class: "is-flex is-fullwidth items-baseline gap-16" }, A = { class: "ac-single-input is-extra-small is-fullwidth" }, G = { class: "ac-single-input is-extra-small is-fullwidth" }, R = { class: "icon is-small" }, q = /* @__PURE__ */ C({
  __name: "EachKey",
  props: {
    obKey: {},
    obValue: {},
    setValue: { type: Function },
    deleteValue: { type: Function },
    getValue: { type: Function }
  },
  setup(k) {
    const o = k, V = () => {
      o.deleteValue(o.obKey);
    }, u = f(o.obKey), i = f(o.obValue);
    h(i, (r) => {
      o.setValue(u.value, r);
    }), h(u, (r, e) => {
      o.deleteValue(e), o.setValue(r, i.value);
    });
    const { isLabelHoisted: p, hoist: m, unHoist: v } = $(u), { isLabelHoisted: a, hoist: b, unHoist: y } = $(i);
    return (r, e) => (c(), d("div", z, [
      s("div", A, [
        s("label", {
          for: "key",
          class: w(["ac-label", { "show-label": l(p) }]),
          onClick: e[0] || (e[0] = (t) => p.value = !0)
        }, " Key ", 2),
        F(s("input", {
          "onUpdate:modelValue": e[1] || (e[1] = (t) => u.value = t),
          type: "text",
          name: "key",
          id: "key",
          class: "border border-black",
          onFocus: e[2] || (e[2] = //@ts-ignore
          (...t) => l(m) && l(m)(...t)),
          onFocusout: e[3] || (e[3] = //@ts-ignore
          (...t) => l(v) && l(v)(...t))
        }, null, 544), [
          [H, u.value]
        ])
      ]),
      s("div", G, [
        s("label", {
          class: w(["ac-label", { "show-label": l(a) }]),
          for: "value",
          onClick: e[4] || (e[4] = (t) => a.value = !0)
        }, " Value ", 2),
        F(s("input", {
          "onUpdate:modelValue": e[5] || (e[5] = (t) => i.value = t),
          type: "text",
          name: "value",
          id: "value",
          class: "border border-black",
          onFocusout: e[6] || (e[6] = //@ts-ignore
          (...t) => l(y) && l(y)(...t)),
          onFocus: e[7] || (e[7] = //@ts-ignore
          (...t) => l(b) && l(b)(...t))
        }, null, 544), [
          [H, i.value]
        ])
      ]),
      s("button", {
        onClick: V,
        class: "button ac-button is-danger is-light"
      }, [
        s("span", R, [
          L(I)
        ])
      ])
    ]));
  }
}), J = { key: 0 }, P = /* @__PURE__ */ s("p", null, "object form loading", -1), Q = [
  P
], W = { class: "is-flex is-justify-content-space-between my-2" }, X = { class: "is-flex is-flex-direction-column space-y-2" }, oe = /* @__PURE__ */ C({
  __name: "TheObject",
  props: {
    ui: {},
    parentData: {},
    parentError: { type: Function }
  },
  setup(k) {
    const o = k, { data: V, isLoading: u, loadData: i } = N();
    i(o.ui.loader);
    const p = j(() => ({
      ...g(l(o.parentData)),
      input: g(l(V))
    })), { calculateInitValue: m } = O(), v = m(o.ui, p.value) || {}, a = f(v), b = (n, x) => {
      a.value[n] = x;
    }, y = (n) => a.value[n], r = (n) => {
      delete a.value[n];
    }, { setValue: e } = S();
    h(
      a,
      (n) => {
        e(o.ui.schema, g(n));
      },
      { immediate: !0 }
    );
    const t = f(Object.keys(E).length || 1), D = () => {
      t.value += 1, a.value[`temp${t.value}`] = "";
    };
    return (n, x) => (c(), d("div", null, [
      l(u) ? (c(), d("div", J, Q)) : (c(), d(T, { key: 1 }, [
        s("div", W, [
          s("h4", null, U(n.ui.label), 1),
          s("button", {
            onClick: D,
            class: "button ac-button is-primary"
          }, "Add new")
        ]),
        s("div", X, [
          (c(!0), d(T, null, B(Object.keys(a.value), (_, K) => (c(), M(q, {
            key: String(K) + String(t.value),
            "ob-key": _,
            "ob-value": a.value[_],
            "set-value": b,
            "get-value": y,
            "delete-value": r
          }, null, 8, ["ob-key", "ob-value"]))), 128))
        ])
      ], 64))
    ]));
  }
});
export {
  oe as default
};
