import type { BaseElement } from '@/types'
import { inject, ref, toRaw, unref, watch, type Ref } from 'vue'
import { useGlobalModel } from './global/model'

export const useLabel = (model: Ref<any>, ui?: BaseElement) => {
  const { model: values } = useGlobalModel()
  const isLabelHoisted = ref(false)
  const isDisable = ref(false)
  const func = inject<any>('func')

  // disable calculation
  if (ui?.disable) {
    if (typeof ui.disable === 'boolean') isDisable.value = ui.disable
    else {
      const fName = ui.disable
      const val = func[fName](toRaw(unref(values)))
      isDisable.value = !!val
    }
  }

  watch(
    model,
    (n) => {
      if (n) isLabelHoisted.value = true
    },
    { immediate: true }
  )

  const hoist = () => {
    if (!isDisable?.value) isLabelHoisted.value = true
  }

  const unHoist = () => {
    if (!model.value) isLabelHoisted.value = false
  }

  return {
    isLabelHoisted,
    isDisable,
    hoist,
    unHoist
  }
}
