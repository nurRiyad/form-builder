import type { BaseElement } from '@/types'
import { createGlobalState } from '@vueuse/core'
import { computed, ref, watch, type Ref } from 'vue'

export const useValidate = (ui: BaseElement | undefined, val: Ref<any>) => {
  const errMsg = ref('')
  const showStar = computed(() => ui?.validation?.type === 'required')

  watch(val, (n) => calValidation(n))

  const { setInvalidInputs, showGblError } = useGlobalValidate()
  const requiredCheck = (val: unknown) => {
    if (typeof val === 'number') {
      if (val || val === 0) return false
      else return 'This field is required'
    } else if (val) return false
    else return 'This field is required'
  }

  const calValidation = (n: unknown) => {
    if (ui?.validation?.type === 'required') {
      const res = requiredCheck(n)
      if (res) {
        //not valid
        if (!errMsg.value) {
          // previously it was valid
          setInvalidInputs(1)
        }
        errMsg.value = res
      } else {
        // valid phase
        if (errMsg.value) {
          //previously it was not valid
          setInvalidInputs(-1)
        }
        errMsg.value = ''
      }
    }
  }

  return { requiredCheck, calValidation, errMsg, showStar, showGblError }
}

export const useGlobalValidate = createGlobalState(() => {
  // state
  const invalidInputs = ref<number>(0)
  const showGblError = ref(false)

  const setInvalidInputs = (val: number) => {
    invalidInputs.value += val
  }

  return { invalidInputs, setInvalidInputs, showGblError }
})
