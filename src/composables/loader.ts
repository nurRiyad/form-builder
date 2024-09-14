import { inject, ref } from 'vue'

export const useLoader = () => {
  const func = inject<Record<string, Function>>('func')
  const data = ref<any>(undefined)
  const isLoading = ref(false)
  const loadData = async (fName?: string) => {
    if (!fName || !func) return
    try {
      isLoading.value = true
      data.value = await func[fName]()
    } catch (error) {
      console.error(error)
    }
    isLoading.value = false
  }

  return { loadData, isLoading, data }
}
