import type { BaseElement } from '@/types'
import { onClickOutside, useFocus } from '@vueuse/core'
import { inject, ref, toRaw, unref, watch, type Ref } from 'vue'
import { useGlobalModel } from './global/model'

export const useLabel = (selectedValue: Ref<string | undefined>, ui: BaseElement) => {
  const { model } = useGlobalModel()
  const isOpen = ref(false)
  const searchText = ref('')
  const isLabelHoisted = ref(false)
  const isDisable = ref(false)
  const func = inject<any>('func')

  // disable calculation
  if (ui.disable) {
    if (typeof ui.disable === 'boolean') isDisable.value = ui.disable
    else {
      const fName = ui.disable
      const val = func[fName](toRaw(unref(model)))
      isDisable.value = !!val
    }
  }

  // handle outside box
  const selectBox = ref(null)
  onClickOutside(selectBox, () => (isOpen.value = false))

  // handle input click
  const searchInput = ref(null)
  const { focused } = useFocus(searchInput, { initialValue: true })

  // handle selection
  const onLabelClick = (op: string) => {
    selectedValue.value = op
    isOpen.value = false
  }

  // handle label click
  const selectClick = () => {
    isOpen.value = true
    focused.value = true
  }

  // handle clear btn
  const handleClear = () => {
    selectedValue.value = undefined
    searchText.value = ''
  }

  // handle depend on selected data
  watch(
    selectedValue,
    (n) => {
      if (n) isLabelHoisted.value = true
      else isLabelHoisted.value = false
    },
    { immediate: true }
  )

  // open close of select box
  watch(isOpen, (n) => {
    if (n) searchText.value = ''
    else {
      if (!selectedValue.value) isLabelHoisted.value = false
    }
  })

  return {
    isOpen,
    isDisable,
    isLabelHoisted,
    searchText,
    focused,
    searchInput,
    selectBox,
    handleClear,
    selectClick,
    onLabelClick
  }
}
