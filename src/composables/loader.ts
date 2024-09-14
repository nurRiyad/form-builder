import { ref } from 'vue'

export const useLoader = (fn: any) => {
  const data = ref<any>({})
  const isLoading = ref(false)
  const loadData = async (fName: string) => {
    try {
      isLoading.value = true
      data.value = await fn[fName]()
    } catch (error) {
      console.error(error)
    }
    isLoading.value = false
  }

  return { loadData, isLoading, data }
}
