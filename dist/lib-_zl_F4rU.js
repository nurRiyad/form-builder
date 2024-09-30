import { effectScope as ue, watch as G, unref as h, ref as S, computed as W, defineComponent as Z, defineAsyncComponent as q, provide as N, openBlock as p, createElementBlock as m, createElementVNode as u, createBlock as L, renderSlot as fe, Fragment as de, toDisplayString as T, createCommentVNode as pe, toRaw as he } from "vue";
var O = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function me(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var _e = "Expected a function", ee = "__lodash_hash_undefined__", te = 1 / 0, ye = 9007199254740991, ge = "[object Function]", be = "[object GeneratorFunction]", ve = "[object Symbol]", Se = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Ce = /^\w*$/, we = /^\./, Fe = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Oe = /[\\^$.*+?()[\]{}|]/g, Te = /\\(\\)?/g, Pe = /^\[object .+?Constructor\]$/, xe = /^(?:0|[1-9]\d*)$/, Ve = typeof O == "object" && O && O.Object === Object && O, je = typeof self == "object" && self && self.Object === Object && self, D = Ve || je || Function("return this")();
function $e(e, t) {
  return e == null ? void 0 : e[t];
}
function Ee(e) {
  var t = !1;
  if (e != null && typeof e.toString != "function")
    try {
      t = !!(e + "");
    } catch {
    }
  return t;
}
var Ie = Array.prototype, Ne = Function.prototype, ne = Object.prototype, A = D["__core-js_shared__"], z = function() {
  var e = /[^.]+$/.exec(A && A.keys && A.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}(), re = Ne.toString, x = ne.hasOwnProperty, oe = ne.toString, Ae = RegExp(
  "^" + re.call(x).replace(Oe, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
), U = D.Symbol, Ge = Ie.splice, De = ie(D, "Map"), w = ie(Object, "create"), X = U ? U.prototype : void 0, J = X ? X.toString : void 0;
function g(e) {
  var t = -1, n = e ? e.length : 0;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
function Me() {
  this.__data__ = w ? w(null) : {};
}
function ke(e) {
  return this.has(e) && delete this.__data__[e];
}
function He(e) {
  var t = this.__data__;
  if (w) {
    var n = t[e];
    return n === ee ? void 0 : n;
  }
  return x.call(t, e) ? t[e] : void 0;
}
function Re(e) {
  var t = this.__data__;
  return w ? t[e] !== void 0 : x.call(t, e);
}
function Be(e, t) {
  var n = this.__data__;
  return n[e] = w && t === void 0 ? ee : t, this;
}
g.prototype.clear = Me;
g.prototype.delete = ke;
g.prototype.get = He;
g.prototype.has = Re;
g.prototype.set = Be;
function C(e) {
  var t = -1, n = e ? e.length : 0;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
function Ke() {
  this.__data__ = [];
}
function We(e) {
  var t = this.__data__, n = V(t, e);
  if (n < 0)
    return !1;
  var r = t.length - 1;
  return n == r ? t.pop() : Ge.call(t, n, 1), !0;
}
function qe(e) {
  var t = this.__data__, n = V(t, e);
  return n < 0 ? void 0 : t[n][1];
}
function Le(e) {
  return V(this.__data__, e) > -1;
}
function ze(e, t) {
  var n = this.__data__, r = V(n, e);
  return r < 0 ? n.push([e, t]) : n[r][1] = t, this;
}
C.prototype.clear = Ke;
C.prototype.delete = We;
C.prototype.get = qe;
C.prototype.has = Le;
C.prototype.set = ze;
function b(e) {
  var t = -1, n = e ? e.length : 0;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
function Ue() {
  this.__data__ = {
    hash: new g(),
    map: new (De || C)(),
    string: new g()
  };
}
function Xe(e) {
  return j(this, e).delete(e);
}
function Je(e) {
  return j(this, e).get(e);
}
function Ye(e) {
  return j(this, e).has(e);
}
function Qe(e, t) {
  return j(this, e).set(e, t), this;
}
b.prototype.clear = Ue;
b.prototype.delete = Xe;
b.prototype.get = Je;
b.prototype.has = Ye;
b.prototype.set = Qe;
function Ze(e, t, n) {
  var r = e[t];
  (!(x.call(e, t) && se(r, n)) || n === void 0 && !(t in e)) && (e[t] = n);
}
function V(e, t) {
  for (var n = e.length; n--; )
    if (se(e[n][0], t))
      return n;
  return -1;
}
function et(e) {
  if (!P(e) || at(e))
    return !1;
  var t = ft(e) || Ee(e) ? Ae : Pe;
  return t.test(ut(e));
}
function tt(e, t, n, r) {
  if (!P(e))
    return e;
  t = it(t, e) ? [t] : rt(t);
  for (var i = -1, o = t.length, a = o - 1, s = e; s != null && ++i < o; ) {
    var d = ct(t[i]), l = n;
    if (i != a) {
      var f = s[d];
      l = void 0, l === void 0 && (l = P(f) ? f : ot(t[i + 1]) ? [] : {});
    }
    Ze(s, d, l), s = s[d];
  }
  return e;
}
function nt(e) {
  if (typeof e == "string")
    return e;
  if (k(e))
    return J ? J.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -te ? "-0" : t;
}
function rt(e) {
  return ae(e) ? e : lt(e);
}
function j(e, t) {
  var n = e.__data__;
  return st(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
}
function ie(e, t) {
  var n = $e(e, t);
  return et(n) ? n : void 0;
}
function ot(e, t) {
  return t = t ?? ye, !!t && (typeof e == "number" || xe.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
function it(e, t) {
  if (ae(e))
    return !1;
  var n = typeof e;
  return n == "number" || n == "symbol" || n == "boolean" || e == null || k(e) ? !0 : Ce.test(e) || !Se.test(e) || t != null && e in Object(t);
}
function st(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
function at(e) {
  return !!z && z in e;
}
var lt = M(function(e) {
  e = pt(e);
  var t = [];
  return we.test(e) && t.push(""), e.replace(Fe, function(n, r, i, o) {
    t.push(i ? o.replace(Te, "$1") : r || n);
  }), t;
});
function ct(e) {
  if (typeof e == "string" || k(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -te ? "-0" : t;
}
function ut(e) {
  if (e != null) {
    try {
      return re.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
function M(e, t) {
  if (typeof e != "function" || t && typeof t != "function")
    throw new TypeError(_e);
  var n = function() {
    var r = arguments, i = t ? t.apply(this, r) : r[0], o = n.cache;
    if (o.has(i))
      return o.get(i);
    var a = e.apply(this, r);
    return n.cache = o.set(i, a), a;
  };
  return n.cache = new (M.Cache || b)(), n;
}
M.Cache = b;
function se(e, t) {
  return e === t || e !== e && t !== t;
}
var ae = Array.isArray;
function ft(e) {
  var t = P(e) ? oe.call(e) : "";
  return t == ge || t == be;
}
function P(e) {
  var t = typeof e;
  return !!e && (t == "object" || t == "function");
}
function dt(e) {
  return !!e && typeof e == "object";
}
function k(e) {
  return typeof e == "symbol" || dt(e) && oe.call(e) == ve;
}
function pt(e) {
  return e == null ? "" : nt(e);
}
function ht(e, t, n) {
  return e == null ? e : tt(e, t, n);
}
var mt = ht;
const _t = /* @__PURE__ */ me(mt);
function le(e) {
  let t = !1, n;
  const r = ue(!0);
  return (...i) => (t || (n = r.run(() => e(...i)), t = !0), n);
}
function Y(e) {
  return typeof e == "function" ? e() : h(e);
}
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const Q = () => {
};
function yt(e, t) {
  function n(...r) {
    return new Promise((i, o) => {
      Promise.resolve(e(() => t.apply(this, r), { fn: t, thisArg: this, args: r })).then(i).catch(o);
    });
  }
  return n;
}
const gt = (e) => e();
function bt(e, t = {}) {
  let n, r, i = Q;
  const o = (s) => {
    clearTimeout(s), i(), i = Q;
  };
  return (s) => {
    const d = Y(e), l = Y(t.maxWait);
    return n && o(n), d <= 0 || l !== void 0 && l <= 0 ? (r && (o(r), r = null), Promise.resolve(s())) : new Promise((f, v) => {
      i = t.rejectOnCancel ? v : f, l && !r && (r = setTimeout(() => {
        n && o(n), r = null, f(s());
      }, l)), n = setTimeout(() => {
        r && o(r), r = null, f(s());
      }, d);
    });
  };
}
function vt(e, t, n = {}) {
  const {
    eventFilter: r = gt,
    ...i
  } = n;
  return G(
    e,
    yt(
      r,
      t
    ),
    i
  );
}
function Rt(e, t, n = {}) {
  const {
    debounce: r = 0,
    maxWait: i = void 0,
    ...o
  } = n;
  return vt(
    e,
    t,
    {
      ...o,
      eventFilter: bt(r, { maxWait: i })
    }
  );
}
const St = le(() => {
  const e = S({});
  return { model: e, setValue: (o, a) => {
    const s = o.replaceAll("/properties", "");
    e.value[s] = a;
  }, getValue: (o) => {
    const a = o.replaceAll("/properties", "");
    return e.value[a];
  }, deleteValue: (o) => {
    const a = o.replaceAll("/properties", "");
    delete e.value[a];
  }, clearModel: () => e.value = {} };
}), H = le(() => {
  const e = S(!1);
  return { showGblError: e, clearValidation: () => {
    e.value = !1;
  } };
}), Ct = (e) => typeof e == "number" ? e || e === 0 ? !1 : "This field is required" : e ? !1 : "This field is required", Bt = (e, t, n) => {
  const { showGblError: r } = H(), i = S(!1), o = S(""), a = W(() => {
    var l;
    return ((l = e == null ? void 0 : e.validation) == null ? void 0 : l.type) === "required";
  }), s = W(() => (r.value || i.value) && o.value ? o.value : ""), d = (l) => {
    var v;
    let f = !1;
    ((v = e == null ? void 0 : e.validation) == null ? void 0 : v.type) === "required" && (f = Ct(l)), f ? (o.value || n && n(1), o.value = f) : (o.value && n && n(-1), o.value = "");
  };
  return G(t, (l) => d(l), { immediate: !0 }), {
    err: s,
    calValidation: d,
    showStar: a,
    showGblError: r,
    showLocalErr: i
  };
}, wt = (e) => {
  const t = S(0), n = (o) => {
    t.value += o;
  };
  G(t, (o, a) => {
    e && (o == 0 && a > 0 && e(-1), o > 0 && a == 0 && e(1));
  });
  const { showGblError: r } = H();
  return { errCnt: t, updateErr: n, isValid: () => t.value > 0 ? (r.value = !0, !1) : !0 };
}, Ft = { class: "mt-70" }, Ot = {
  key: 0,
  class: "container"
}, Tt = /* @__PURE__ */ u("div", { class: "columns" }, [
  /* @__PURE__ */ u("div", { class: "column is-8" }, [
    /* @__PURE__ */ u("h1", null, "Form file loading")
  ])
], -1), Pt = [
  Tt
], xt = {
  key: 1,
  class: "container"
}, Vt = { class: "columns is-centered" }, jt = { class: "column is-8" }, $t = { key: 2 }, Et = {
  key: 0,
  class: "is-flex is-justify-content-space-between my-4"
}, It = {
  key: 1,
  class: "is-flex is-justify-content-space-between my-4"
}, Nt = { class: "p-4 bg-gray-300 mt-4" }, Kt = /* @__PURE__ */ Z({
  __name: "FormBuilder",
  props: {
    ui: {},
    schema: { default: {} },
    initialValue: { default: {} },
    logic: { default: null },
    isLoading: { type: Boolean, default: !1 },
    hideFormAction: { type: Boolean, default: !1 }
  },
  emits: ["onSubmit"],
  setup(e, { expose: t, emit: n }) {
    const r = q(() => import("./SingleStep-D7S02AZG.js")), i = q(() => import("./MultiStep-eurHGEqd.js")), o = e, a = n, { model: s, clearModel: d } = St();
    d();
    const l = o != null && o.logic ? o.logic(s) : null;
    N("func", l), N("schema", o.schema), N("initialValue", o.initialValue);
    const f = () => {
      const c = he(h(s)), y = {};
      return Object.keys(c).forEach((F) => {
        const ce = F.replaceAll("/", ".");
        _t(y, ce, c[F]);
      }), y;
    }, { clearValidation: v } = H();
    v();
    const { updateErr: R, isValid: B } = wt(), $ = () => {
      if (!B()) return;
      const c = f();
      a("onSubmit", c);
    }, E = () => {
      console.log("Form cancel clicked");
    }, _ = S(0), K = o.ui.type === "single-step-from" ? 0 : o.ui.step.length, I = (c) => {
      o.ui.type !== "single-step-from" && B() && (c === "Next" ? _.value + 1 >= K ? $() : _.value += 1 : _.value <= 0 ? E() : _.value -= 1);
    };
    return t({
      handleSubmit: $,
      handleCancel: E,
      handleStep: I,
      model: s
    }), (c, y) => (p(), m("div", Ft, [
      c.isLoading ? (p(), m("div", Ot, Pt)) : (p(), m("div", xt, [
        u("div", Vt, [
          u("div", jt, [
            c.ui.type === "single-step-from" ? (p(), L(h(r), {
              key: 0,
              "is-active": !0,
              ui: c.ui,
              "parent-err": h(R)
            }, null, 8, ["ui", "parent-err"])) : c.ui.type === "multi-step-form" ? (p(), L(h(i), {
              key: 1,
              "active-step": _.value,
              ui: c.ui,
              "parent-err": h(R)
            }, null, 8, ["active-step", "ui", "parent-err"])) : (p(), m("h1", $t, "No Proper Form type found")),
            fe(c.$slots, "custom-form"),
            c.hideFormAction ? pe("", !0) : (p(), m(de, { key: 3 }, [
              c.ui.type === "single-step-from" ? (p(), m("div", Et, [
                u("button", {
                  onClick: E,
                  class: "button ac-button"
                }, "Cancel"),
                u("button", {
                  onClick: $,
                  class: "button ac-button is-primary"
                }, "Submit")
              ])) : (p(), m("div", It, [
                u("button", {
                  onClick: y[0] || (y[0] = (F) => I("Prev")),
                  class: "button ac-button"
                }, T(_.value <= 0 ? "Cancel" : "Previous"), 1),
                u("button", {
                  onClick: y[1] || (y[1] = (F) => I("Next")),
                  class: "button ac-button is-primary"
                }, T(_.value + 1 >= h(K) ? "Submit" : "Next"), 1)
              ]))
            ], 64)),
            u("pre", Nt, T(h(s)), 1)
          ])
        ])
      ]))
    ]));
  }
}), At = "/form.svg", Gt = { class: "hero is-fullheight" }, Dt = { class: "hero-body is-flex is-flex-direction-column is-justify-content-center" }, Mt = /* @__PURE__ */ u("img", {
  src: At,
  alt: "form",
  width: "300"
}, null, -1), kt = { class: "font-bold text-3xl text-center" }, Wt = /* @__PURE__ */ Z({
  __name: "HelloWorld",
  props: {
    msg: {}
  },
  setup(e) {
    return (t, n) => (p(), m("div", Gt, [
      u("div", Dt, [
        Mt,
        u("h1", kt, T(t.msg), 1)
      ])
    ]));
  }
});
export {
  Kt as _,
  Bt as a,
  wt as b,
  O as c,
  Wt as d,
  me as g,
  St as u,
  Rt as w
};
