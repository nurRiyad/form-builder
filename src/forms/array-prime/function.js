import { unref } from 'vue'

export const useFunc = (model) => {
  const raw = unref(model)

  return { raw }
}
