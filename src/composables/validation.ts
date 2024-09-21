import type { BaseElement } from '@/types'
import { createGlobalState } from '@vueuse/core'
import { ref, type Ref } from 'vue'

export const useValidate = createGlobalState(() => {
  // state
  const invalidInputs = ref<number>(0)
  const showGblError = ref(false)

  const setInvalidInputs = (val: number) => {
    invalidInputs.value += val
  }

  const requiredCheck = (val: unknown) => {
    if (typeof val === 'number') {
      if (val || val === 0) return false
      else return 'This field is required 1'
    } else if (val) return false
    else return 'This field is required 2'
  }

  const calValidation = (vd: BaseElement | undefined, n: unknown, errMsg: Ref<string>) => {
    if (vd?.validation?.type === 'required') {
      const res = requiredCheck(n)
      if (res) {
        //not valid
        if (!errMsg.value) {
          // previously it was valid
          invalidInputs.value += 1
        }
        errMsg.value = res
      } else {
        // valid phase
        if (errMsg.value) {
          //previously it was not valid
          invalidInputs.value -= 1
        }
        errMsg.value = ''
      }
    }
  }

  return { invalidInputs, setInvalidInputs, requiredCheck, calValidation, showGblError }
})
