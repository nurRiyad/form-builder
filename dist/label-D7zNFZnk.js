import { ref as u, watch as a } from "vue";
const l = (t) => {
  const e = u(!1);
  return a(
    t,
    (s) => {
      s && (e.value = !0);
    },
    { immediate: !0 }
  ), {
    isLabelHoisted: e,
    hoist: () => e.value = !0,
    unHoist: () => {
      t.value || (e.value = !1);
    }
  };
};
export {
  l as u
};
