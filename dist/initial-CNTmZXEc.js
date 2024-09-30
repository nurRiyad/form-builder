import { inject as v } from "vue";
import { g as F, c as l } from "./lib-_zl_F4rU.js";
var N = "Expected a function", w = "__lodash_hash_undefined__", x = 1 / 0, H = "[object Function]", A = "[object GeneratorFunction]", G = "[object Symbol]", M = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, R = /^\w*$/, V = /^\./, K = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, z = /[\\^$.*+?()[\]{}|]/g, L = /\\(\\)?/g, U = /^\[object .+?Constructor\]$/, q = typeof l == "object" && l && l.Object === Object && l, J = typeof self == "object" && self && self.Object === Object && self, y = q || J || Function("return this")();
function X(t, e) {
  return t == null ? void 0 : t[e];
}
function Y(t) {
  var e = !1;
  if (t != null && typeof t.toString != "function")
    try {
      e = !!(t + "");
    } catch {
    }
  return e;
}
var B = Array.prototype, Q = Function.prototype, I = Object.prototype, _ = y["__core-js_shared__"], C = function() {
  var t = /[^.]+$/.exec(_ && _.keys && _.keys.IE_PROTO || "");
  return t ? "Symbol(src)_1." + t : "";
}(), P = Q.toString, g = I.hasOwnProperty, T = I.toString, W = RegExp(
  "^" + P.call(g).replace(z, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
), S = y.Symbol, Z = B.splice, k = $(y, "Map"), f = $(Object, "create"), j = S ? S.prototype : void 0, O = j ? j.toString : void 0;
function c(t) {
  var e = -1, r = t ? t.length : 0;
  for (this.clear(); ++e < r; ) {
    var n = t[e];
    this.set(n[0], n[1]);
  }
}
function tt() {
  this.__data__ = f ? f(null) : {};
}
function et(t) {
  return this.has(t) && delete this.__data__[t];
}
function rt(t) {
  var e = this.__data__;
  if (f) {
    var r = e[t];
    return r === w ? void 0 : r;
  }
  return g.call(e, t) ? e[t] : void 0;
}
function nt(t) {
  var e = this.__data__;
  return f ? e[t] !== void 0 : g.call(e, t);
}
function at(t, e) {
  var r = this.__data__;
  return r[t] = f && e === void 0 ? w : e, this;
}
c.prototype.clear = tt;
c.prototype.delete = et;
c.prototype.get = rt;
c.prototype.has = nt;
c.prototype.set = at;
function u(t) {
  var e = -1, r = t ? t.length : 0;
  for (this.clear(); ++e < r; ) {
    var n = t[e];
    this.set(n[0], n[1]);
  }
}
function ot() {
  this.__data__ = [];
}
function it(t) {
  var e = this.__data__, r = p(e, t);
  if (r < 0)
    return !1;
  var n = e.length - 1;
  return r == n ? e.pop() : Z.call(e, r, 1), !0;
}
function ct(t) {
  var e = this.__data__, r = p(e, t);
  return r < 0 ? void 0 : e[r][1];
}
function st(t) {
  return p(this.__data__, t) > -1;
}
function ut(t, e) {
  var r = this.__data__, n = p(r, t);
  return n < 0 ? r.push([t, e]) : r[n][1] = e, this;
}
u.prototype.clear = ot;
u.prototype.delete = it;
u.prototype.get = ct;
u.prototype.has = st;
u.prototype.set = ut;
function s(t) {
  var e = -1, r = t ? t.length : 0;
  for (this.clear(); ++e < r; ) {
    var n = t[e];
    this.set(n[0], n[1]);
  }
}
function ft() {
  this.__data__ = {
    hash: new c(),
    map: new (k || u)(),
    string: new c()
  };
}
function lt(t) {
  return h(this, t).delete(t);
}
function pt(t) {
  return h(this, t).get(t);
}
function ht(t) {
  return h(this, t).has(t);
}
function dt(t, e) {
  return h(this, t).set(t, e), this;
}
s.prototype.clear = ft;
s.prototype.delete = lt;
s.prototype.get = pt;
s.prototype.has = ht;
s.prototype.set = dt;
function p(t, e) {
  for (var r = t.length; r--; )
    if (wt(t[r][0], e))
      return r;
  return -1;
}
function _t(t, e) {
  e = bt(e, t) ? [e] : mt(e);
  for (var r = 0, n = e.length; t != null && r < n; )
    t = t[jt(e[r++])];
  return r && r == n ? t : void 0;
}
function yt(t) {
  if (!D(t) || Ct(t))
    return !1;
  var e = xt(t) || Y(t) ? W : U;
  return e.test(Ot(t));
}
function gt(t) {
  if (typeof t == "string")
    return t;
  if (b(t))
    return O ? O.call(t) : "";
  var e = t + "";
  return e == "0" && 1 / t == -x ? "-0" : e;
}
function mt(t) {
  return E(t) ? t : St(t);
}
function h(t, e) {
  var r = t.__data__;
  return vt(e) ? r[typeof e == "string" ? "string" : "hash"] : r.map;
}
function $(t, e) {
  var r = X(t, e);
  return yt(r) ? r : void 0;
}
function bt(t, e) {
  if (E(t))
    return !1;
  var r = typeof t;
  return r == "number" || r == "symbol" || r == "boolean" || t == null || b(t) ? !0 : R.test(t) || !M.test(t) || e != null && t in Object(e);
}
function vt(t) {
  var e = typeof t;
  return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? t !== "__proto__" : t === null;
}
function Ct(t) {
  return !!C && C in t;
}
var St = m(function(t) {
  t = Pt(t);
  var e = [];
  return V.test(t) && e.push(""), t.replace(K, function(r, n, a, i) {
    e.push(a ? i.replace(L, "$1") : n || r);
  }), e;
});
function jt(t) {
  if (typeof t == "string" || b(t))
    return t;
  var e = t + "";
  return e == "0" && 1 / t == -x ? "-0" : e;
}
function Ot(t) {
  if (t != null) {
    try {
      return P.call(t);
    } catch {
    }
    try {
      return t + "";
    } catch {
    }
  }
  return "";
}
function m(t, e) {
  if (typeof t != "function" || e && typeof e != "function")
    throw new TypeError(N);
  var r = function() {
    var n = arguments, a = e ? e.apply(this, n) : n[0], i = r.cache;
    if (i.has(a))
      return i.get(a);
    var o = t.apply(this, n);
    return r.cache = i.set(a, o), o;
  };
  return r.cache = new (m.Cache || s)(), r;
}
m.Cache = s;
function wt(t, e) {
  return t === e || t !== t && e !== e;
}
var E = Array.isArray;
function xt(t) {
  var e = D(t) ? T.call(t) : "";
  return e == H || e == A;
}
function D(t) {
  var e = typeof t;
  return !!t && (e == "object" || e == "function");
}
function It(t) {
  return !!t && typeof t == "object";
}
function b(t) {
  return typeof t == "symbol" || It(t) && T.call(t) == G;
}
function Pt(t) {
  return t == null ? "" : gt(t);
}
function Tt(t, e, r) {
  var n = t == null ? void 0 : _t(t, e);
  return n === void 0 ? r : n;
}
var $t = Tt;
const Et = /* @__PURE__ */ F($t), Nt = () => {
  const t = v("initialValue"), e = v("func"), r = (a, i) => {
    let o = a.replaceAll("/properties", "");
    return o = o.replace("schema/", ""), o = o.replaceAll("/", "."), o.includes("items") && (o = o.replace(".items", `[${i}]`)), Et(t, o);
  };
  return { calculateInitValue: (a, i, o) => {
    if (!(a.type === "block-layout" || a.type === "horizontal-layout"))
      if (a != null && a.init) {
        if (a.init.type === "static") return a.init.value;
        {
          const d = a.init.value;
          return d && e ? e[d](i) : "";
        }
      } else
        return r(a.schema, o) || "";
  } };
};
export {
  Et as g,
  Nt as u
};
