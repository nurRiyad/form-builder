import { defineComponent as D, defineAsyncComponent as o, openBlock as t, createElementBlock as r, createBlock as u, unref as s, createCommentVNode as m, createElementVNode as a, createVNode as E, computed as L, toRaw as k, ref as w, watch as N, Fragment as T, toDisplayString as $, renderList as j } from "vue";
import { T as M } from "./TheTrash-JRYUvJcg.js";
import { u as R } from "./SingleStep.vue_vue_type_script_setup_true_lang-7rfpuIek.js";
import { u as G } from "./initial-CNTmZXEc.js";
import { u as q } from "./lib-_zl_F4rU.js";
const z = { class: "is-flex is-fullwidth gap-16" }, H = { class: "icon is-small" }, J = /* @__PURE__ */ D({
  __name: "EachItem",
  props: {
    element: {},
    fn: {},
    items: {},
    setValue: { type: Function },
    deleteValue: { type: Function },
    getValue: { type: Function }
  },
  setup(p) {
    const n = o(() => import("./TheInput--MELEI5o.js")), c = o(() => import("./SelectSingle-BMzk1s10.js")), d = o(() => import("./TextArea-JLIl0IB5.js")), v = o(() => import("./CheckBox-BZNMH_WF.js")), h = o(() => import("./TheRadio-Bgnio8Ja.js")), i = p, f = () => {
      i.items && i.deleteValue(i.items);
    };
    return (e, b) => (t(), r("div", z, [
      e.element.type === "input" ? (t(), u(s(n), {
        key: 0,
        class: "is-fullwidth",
        element: e.element,
        items: e.items,
        "temp-value": e.getValue(e.items),
        "set-value": e.setValue
      }, null, 8, ["element", "items", "temp-value", "set-value"])) : m("", !0),
      e.element.type === "select" ? (t(), u(s(c), {
        key: 1,
        class: "is-fullwidth",
        element: e.element,
        items: e.items,
        "temp-value": e.getValue(e.items),
        "set-value": e.setValue
      }, null, 8, ["element", "items", "temp-value", "set-value"])) : m("", !0),
      e.element.type === "radio" ? (t(), u(s(h), {
        key: 2,
        class: "is-fullwidth",
        element: e.element,
        items: e.items,
        "temp-value": e.getValue(e.items),
        "set-value": e.setValue
      }, null, 8, ["element", "items", "temp-value", "set-value"])) : m("", !0),
      e.element.type === "checkbox" ? (t(), u(s(v), {
        key: 3,
        class: "is-fullwidth",
        element: e.element,
        items: e.items,
        "temp-value": e.getValue(e.items),
        "set-value": e.setValue
      }, null, 8, ["element", "items", "temp-value", "set-value"])) : m("", !0),
      e.element.type === "textarea" ? (t(), u(s(d), {
        key: 4,
        class: "is-fullwidth",
        element: e.element,
        items: e.items,
        "temp-value": e.getValue(e.items),
        "set-value": e.setValue
      }, null, 8, ["element", "items", "temp-value", "set-value"])) : m("", !0),
      a("button", {
        onClick: f,
        class: "button ac-button is-danger is-light",
        title: "Delete"
      }, [
        a("span", H, [
          E(M)
        ])
      ])
    ]));
  }
}), K = { key: 0 }, O = /* @__PURE__ */ a("p", null, "Array object form loading", -1), P = [
  O
], Q = { class: "is-flex is-justify-content-space-between my-2" }, U = { class: "is-flex is-flex-direction-column gap-8" }, x = /* @__PURE__ */ D({
  __name: "ArrayItem",
  props: {
    ui: {},
    parentData: {},
    parentError: { type: Function }
  },
  setup(p) {
    const n = p, { data: c, isLoading: d, loadData: v } = R();
    v(n.ui.loader);
    const h = L(() => ({
      ...k(s(n.parentData)),
      input: k(s(c))
    })), { calculateInitValue: i } = G(), f = i(n.ui, h.value) || [], e = w(f), b = (l, I, V) => {
      V && (e.value[parseInt(V)] = I);
    }, C = (l) => e.value[parseInt(l)], S = (l) => {
      e.value.splice(parseInt(l), 1), y.value.splice(parseInt(l));
    }, { setValue: A } = q();
    N(
      e,
      (l) => {
        A(n.ui.schema, k(l));
      },
      { immediate: !0 }
    );
    let y = w([]), F = w(1);
    const B = () => {
      y.value.push(++F.value), e.value.push("");
    };
    return (l, I) => (t(), r("div", null, [
      s(d) ? (t(), r("div", K, P)) : (t(), r(T, { key: 1 }, [
        a("div", Q, [
          a("h4", null, $(l.ui.label), 1),
          a("button", {
            onClick: B,
            class: "button ac-button is-primary"
          }, "Add new")
        ]),
        a("div", U, [
          (t(!0), r(T, null, j(e.value, (V, g) => (t(), u(J, {
            key: String(g) + String(s(y)[g]),
            element: l.ui.element,
            items: String(g),
            "set-value": b,
            "get-value": C,
            "delete-value": S
          }, null, 8, ["element", "items"]))), 128))
        ])
      ], 64))
    ]));
  }
});
export {
  x as default
};
