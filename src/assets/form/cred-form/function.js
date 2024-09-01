import { computed, unref } from 'vue'

export const useFunc = (model) => {
  const isCredAws = computed(() => {
    const raw = unref(model)
    if (raw['schema/type'] === 'Aws') return true
    else return false
  })

  const isCredAzure = computed(() => {
    const raw = unref(model)
    if (raw['schema/type'] === 'Azure') return true
    else return false
  })

  return { isCredAws, isCredAzure }
}
