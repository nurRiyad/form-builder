<script lang="ts" setup>
import type { Switch } from '@/types/schema'
import { onUnmounted, ref, watch } from 'vue'
import lodash from 'lodash'

const props = defineProps<{
  element: Switch
  initialValue: any
  wholeSchema: any
  func?: any
  items?: string
  parentData?: any
  setValue: (path: string, val: any) => void
  deleteValue?: (key: string) => void
}>()

const getValueFromModel = () => {
  let path = props.element.schema
  path = path.replaceAll('/properties', '')
  path = path.replace('schema/', '')
  path = path.replaceAll('/', '.')

  if (path.includes('items')) {
    path = path.replace('.items', `[${props.items}]`)
  }

  const value = lodash.get(props.initialValue, path)
  return value
}

const calculateInitValue = () => {
  if (props?.element?.init) {
    const valType = props.element.init?.type
    if (valType === 'static') return props.element.init.value
    else {
      const fName = props.element.init.value
      return props.func[fName]()
    }
  } else {
    return getValueFromModel()
  }
}

const checked = ref(calculateInitValue())

watch(
  checked,
  (n) => {
    props.setValue(props.element.schema, n)
  },
  { immediate: true }
)

onUnmounted(() => {
  if (props.deleteValue) {
    props.deleteValue(props.element.schema)
  }
})
</script>

<template>
  <div class="flex items-center space-x-5">
    <label for="ac-switch">{{ element.label }}</label>
    <label class="switch">
      <input id="ac-switch" name="ac-switch" v-model="checked" type="checkbox" />
      <span class="slider round"></span>
    </label>
  </div>
</template>

<style lang="css" scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
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
  height: 26px;
  width: 26px;
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
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
