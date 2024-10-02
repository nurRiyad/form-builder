# Form-Builder 🏗️(under rapid construction)

Generate from in a minutes

## Todo

#### Overall

- [x] Initiate a basic vue project with vitest cypress vue pinia and router
- [x] Create some base element like input, select,radio
- [x] Some derived from like single-step form & multi-step-form
- [x] Add proper if condition for base element that read if logic from fun and apply proper reactivity
- [x] Remove key from form when element is unmounted
- [x] Merge model value with the generated value
- [x] Multi step from process
- [x] Add function and computed both feature for if conditions
- [x] Add other other basic property in select radio checkbox text area
- [x] Check if create-ui, initial-value and fun can load from api call
- [x] Add watcher fo watch some components value
- [x] Rerun when watcher changes
- [x] Component level fetch
  - [x] Extract the function and call properly
  - [x] Save the value somewhere to properly use this
- [x] From Level fetch
  - [x] Extract the function and call properly
  - [x] Save the value somewhere to properly use this
- [x] Add slots for form actions
- [x] Remove lodash from dependency
- [x] Remove same type of code from base components
- [x] Basic Validation
- [ ] Validation for derived element
- [ ] Show list of multi step form
- [ ] Show proper loader when loading
- [x] Remove lodash.get and lodash.set
- [ ] Create Platform UI Credential create form
- [ ] Create Platform UI Credential Edit form

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

#### Compile and Hot-Reload for Development

```sh
npm run dev
```

#### Type-Check, Compile and Minify for Production

```sh
npm run build
```

#### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

#### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

#### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
