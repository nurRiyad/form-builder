import type { BaseElement } from '@/types'
import { computed, inject, ref, toRaw, watch, type Ref } from 'vue'
import { useGlobalValidate } from './global/valid'
import { isRequiredFromSchema, requiredCheck } from '@/utils'

export const useBaseValidity = (
  ui: BaseElement | undefined,
  val: Ref<any>,
  parentErr?: (val: number) => void
) => {
  const { showGblError } = useGlobalValidate()
  const showLocalErr = ref(false)
  const errMsg = ref('')

  const wholeSchema = inject('schema')
  const schemaRequired = isRequiredFromSchema(ui?.schema, toRaw(wholeSchema))

  const showStar = computed(() => ui?.validation?.type === 'required' || schemaRequired)
  const err = computed(() => {
    if ((showGblError.value || showLocalErr.value) && errMsg.value) return errMsg.value
    else return ''
  })

  const calValidation = (n: unknown) => {
    let res: string | false = false
    if (ui?.validation?.type === 'required') res = requiredCheck(n)
    else if (schemaRequired) res = requiredCheck(n)
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

  watch(val, (n) => calValidation(n), { immediate: true })

  return {
    err,
    calValidation,
    showStar,
    showGblError,
    showLocalErr
  }
}

export const useBlockValidity = (parentErr?: (val: number) => void) => {
  const errCnt = ref(0)
  const updateErr = (val: number) => {
    errCnt.value += val
  }
  watch(errCnt, (n, o) => {
    if (!parentErr) return
    if (n == 0 && o > 0) parentErr(-1)
    if (n > 0 && o == 0) parentErr(1)
  })

  const { showGblError } = useGlobalValidate()
  const isValid = () => {
    if (errCnt.value > 0) {
      showGblError.value = true
      return false
    } else return true
  }

  return { errCnt, updateErr, isValid }
}
