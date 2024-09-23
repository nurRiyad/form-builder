<script lang="ts" setup>
import type { Switch } from '@/types/schema'
import { computed, onUnmounted, ref, toRaw, unref } from 'vue'
import { useInitial } from '@/composables/initial'
import { useLoader } from '@/composables/loader'
import { watchDebounced } from '@vueuse/core'
import { useValidate } from '@/composables/validation'

const props = defineProps<{
  element: Switch
  func?: any
  items?: string
  tempValue?: any
  parentData?: any
  setValue: (path: string, val: any, items?: string) => void
  deleteValue?: (key: string) => void
}>()

//element level data fetching
const { data, isLoading, loadData } = useLoader()
loadData(props.element.loader)
const cData = computed(() => {
  return {
    ...toRaw(unref(props.parentData)),
    input: toRaw(unref(data))
  }
})

// calculate initial value
const { calculateInitValue } = useInitial()
const initValue =
  props.items === undefined ? calculateInitValue(props.element, cData.value) : props.tempValue
const checked = ref(initValue)

//validation
const { calValidation, showGblError } = useValidate()
const errMsg = ref('')
const showErr = ref(false)

// update model value
watchDebounced(
  checked,
  (n) => {
    //update the model value
    props.setValue(props.element.schema, n, props.items)

    // validation fire
    calValidation(props.element, n, errMsg)
  },
  { immediate: true, debounce: 0 }
)

onUnmounted(() => {
  if (props.deleteValue) {
    props.deleteValue(props.element.schema)
  }
})
</script>

<template>
  <div v-if="isLoading">
    <p>Switch data fetching</p>
  </div>
  <div v-else>
    <div class="flex items-center space-x-5">
      <label for="ac-switch">{{ element.label }}</label>
      <label class="switch">
        <input id="ac-switch" name="ac-switch" v-model="checked" type="checkbox" />
        <span class="slider round"></span>
      </label>
    </div>
    <p v-if="(showGblError || showErr) && errMsg" class="text-red-600 pb-3">{{ errMsg }}</p>
  </div>
</template>

<style lang="css" scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: '';
  height: 16px;
  width: 16px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(20px);
  -ms-transform: translateX(20px);
  transform: translateX(20px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
