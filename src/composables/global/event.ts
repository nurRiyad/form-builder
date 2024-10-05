import { createEventHook, createGlobalState } from '@vueuse/core'

export const useGlobalEvent = createGlobalState(() => {
  const validateEvent = createEventHook()
  const pageChangeEvent = createEventHook()
  return {
    validateEvent,
    onValidate: validateEvent.on,
    pageChangeEvent,
    onPageChange: pageChangeEvent.on
  }
})
