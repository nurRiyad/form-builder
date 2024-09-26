import type { Watchers } from '@/types'
import { computed, inject, watch, type ComputedRef, type Ref } from 'vue'
import { useGlobalModel } from './global/model'

export const useWatchers = (
  watcher: Watchers | undefined,
  cData: ComputedRef<any>,
  value: Ref<any>
) => {
  const func = inject<any>('func')
  const { getValue } = useGlobalModel()

  // create computed to watch the changes
  const watchedValue = computed(() => {
    if (watcher && watcher?.paths) {
      let val = ''
      watcher.paths.forEach((path) => {
        const tmp = getValue(path)
        if (tmp) val += String(tmp)
      })
      return val
    } else return ''
  })

  // fire when watch changes
  watch(watchedValue, () => {
    if (watcher && watcher?.func) {
      const fName = watcher.func
      if (func) {
        const val = func[fName](cData.value)
        value.value += val
      }
    }
  })
}
