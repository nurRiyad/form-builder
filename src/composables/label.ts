import { ref, watch, type Ref } from 'vue'

export const useLabel = (model: Ref<any>) => {
  const isLabelHoisted = ref(false)

  watch(
    model,
    (n) => {
      if (n) isLabelHoisted.value = true
    },
    { immediate: true }
  )

  const hoist = () => (isLabelHoisted.value = true)

  const unHoist = () => {
    if (!model.value) isLabelHoisted.value = false
  }

  return {
    isLabelHoisted,
    hoist,
    unHoist
  }
}
