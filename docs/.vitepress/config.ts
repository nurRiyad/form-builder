import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Form Builder',
  description: 'Build complex with json',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/introduction' }
    ],

    sidebar: [
      {
        text: 'Overview',
        items: [
          { text: 'Introduction', link: '/introduction' },
          { text: 'Installation', link: '/installation' }
        ]
      },
      {
        text: 'Base Element',
        items: [
          { text: 'Input', link: '/base/input' },
          { text: 'Textarea', link: '/base/textarea' },
          { text: 'Single Select', link: '/base/simple-select' },
          { text: 'Multiple Select', link: '/base/multi-select' },
          { text: 'Checkbox', link: '/base/checkbox' },
          { text: 'Radio', link: '/base/radio' },
          { text: 'Switch', link: '/base/switch' },
          { text: 'Anchor', link: '/base/anchor' }
        ]
      },
      {
        text: 'Derived Element',
        items: [
          { text: 'Array Item', link: '/derived/array-item' },
          { text: 'Array Object', link: '/derived/array-object' },
          { text: 'Object Item', link: '/derived/object-item' }
        ]
      },
      {
        text: 'Layout Element',
        items: [
          { text: 'Block Layout', link: '/layout/block-layout' },
          { text: 'Horizontal Layout', link: '/layout/horizontal-layout' }
        ]
      },
      {
        text: 'Others',
        items: [
          { text: 'Types', link: '/other/types' },
          { text: 'Validation', link: '/other/validation' },
          { text: 'Project Goals', link: '/other/goals' }
        ]
      }
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/nurRiyad/form-builder' }]
  }
})
