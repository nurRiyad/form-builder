import { createGlobalState } from '@vueuse/core'
import { ref } from 'vue'

export const useGlobalValidate = createGlobalState(() => {
  // state
  const showGblError = ref(false)

  const clearValidation = () => {
    showGblError.value = false
  }

  return { showGblError, clearValidation }
})
