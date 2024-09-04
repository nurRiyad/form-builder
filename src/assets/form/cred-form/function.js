import { computed, unref } from 'vue'

export const useFunc = (model) => {
  const raw = unref(model)
  const isCredAws = () => {
    if (raw['schema/type'] === 'Aws') return true
    else return false
  }

  const isCredAzure = computed(() => {
    if (raw['schema/type'] === 'Azure') return true
    else return false
  })

  return { isCredAws, isCredAzure }
}
