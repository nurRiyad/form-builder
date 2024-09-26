import { ref } from 'vue'
import { createGlobalState } from '@vueuse/core'

export const useGlobalModel = createGlobalState(() => {
  // state
  const model = ref<Record<string, unknown>>({})

  // mutation
  const setValue = (key: string, val: any) => {
    const fKey = key.replaceAll('/properties', '')
    model.value[fKey] = val
  }
  const getValue = (key: string) => {
    const fKey = key.replaceAll('/properties', '')
    return model.value[fKey]
  }
  const deleteValue = (key: string) => {
    const fKey = key.replaceAll('/properties', '')
    delete model.value[fKey]
  }

  const clearModel = () => (model.value = {})

  return { model, setValue, getValue, deleteValue, clearModel }
})
