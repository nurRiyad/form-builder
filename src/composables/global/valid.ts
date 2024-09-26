import { createGlobalState } from '@vueuse/core'
import { ref } from 'vue'

export const useGlobalValidate = createGlobalState(() => {
  // state
  const invalidInputs = ref<number>(0)
  const showGblError = ref(false)

  const setInvalidInputs = (val: number) => {
    invalidInputs.value += val
  }

  const clearValidation = () => {
    invalidInputs.value = 0
    showGblError.value = false
  }

  return { invalidInputs, setInvalidInputs, showGblError, clearValidation }
})
