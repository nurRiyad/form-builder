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

  const onFocus = () => (isLabelHoisted.value = true)

  const onFocusOut = () => {
    if (!model.value) isLabelHoisted.value = false
  }

  return {
    isLabelHoisted,
    onFocus,
    onFocusOut
  }
}
