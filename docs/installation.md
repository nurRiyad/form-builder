# Installation

Make sure you have an up-to-date version of Node.js installed and your current working directory is the one where you intend to create a project. Run the following command in your command line

## Load from npm

```sh
npm i @nurriyad/form-builder
```

## Import inside vue component

Import the form builder component

```vue
<script lang="ts" setup>
import { FormBuilder } from '@nurriyad/form-builder'
</script>

<template>
  <div>
    <FormBuilder />
  </div>
</template>
```

## Add basic CSS

For basic css add this css file to you project
::: code-group

```js [vue.js]
// inside main.ts
import '@nurriyad/form-builder/css'

export default config
```

```js [nuxt.js]
// inside nuxt.config.ts
export default defineNuxtConfig({
  css: ['@nurriyad/form-builder/css']
})
```

:::
