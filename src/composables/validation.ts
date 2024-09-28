import type { BaseElement } from '@/types'
import { computed, ref, watch, type Ref } from 'vue'
import { useGlobalValidate } from './global/valid'
import { requiredCheck } from '@/utils'

export const useValidate = (
  ui: BaseElement | undefined,
  val: Ref<any>,
  parentErr?: (val: number) => void
) => {
  const { showGblError } = useGlobalValidate()

  const showLocalErr = ref(false)
  const errMsg = ref('')
  const errCnt = ref(0)

  const showStar = computed(() => ui?.validation?.type === 'required')
  const err = computed(() => {
    if ((showGblError.value || showLocalErr.value) && errMsg.value) return errMsg.value
    else return ''
  })

  const updateErr = (val: number) => {
    errCnt.value += val
  }

  const isValid = () => {
    showGblError.value = true
    if (errCnt.value > 0) return false
    else return true
  }

  const calValidation = (n: unknown) => {
    if (ui?.validation?.type === 'required') {
      const res = requiredCheck(n)
      if (res) {
        //not valid
        if (!errMsg.value) {
          // previously it was valid
          if (parentErr) parentErr(1)
        }
        errMsg.value = res
      } else {
        // valid phase
        if (errMsg.value) {
          //previously it was not valid
          if (parentErr) parentErr(-1)
        }
        errMsg.value = ''
      }
    }
  }

  watch(val, (n) => calValidation(n), { immediate: true })
  watch(errCnt, (n, o) => {
    if (!parentErr) return
    if (n == 0 && o > 0) parentErr(-1)
    if (n > 0 && o == 0) parentErr(1)
  })
  return {
    err,
    calValidation,
    showStar,
    showGblError,
    errCnt,
    updateErr,
    isValid,
    showLocalErr
  }
}

export const useParentValidate = (parentErr?: (val: number) => void) => {
  const errCnt = ref(0)

  const { showGblError } = useGlobalValidate()

  const updateErr = (val: number) => {
    errCnt.value += val
  }

  watch(errCnt, (n, o) => {
    if (!parentErr) return
    if (n == 0 && o > 0) parentErr(-1)
    if (n > 0 && o == 0) parentErr(1)
  })

  const isValid = () => {
    showGblError.value = true
    if (errCnt.value > 0) return false
    else return true
  }

  return { errCnt, updateErr, isValid }
}
