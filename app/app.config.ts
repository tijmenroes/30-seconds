export default defineAppConfig({
  ui: {
    colors: {
      primary: 'pink',
      secondary: 'purple',
      neutral: 'slate',
      error: 'red'
    },
    button: {
      variants: {
        xl: {
          base: 'px-3 py-3 text-lg gap-2',
          leadingIcon: 'size-6',
          leadingAvatarSize: 'xs',
          trailingIcon: 'size-6'
        }
      },
      sizes: {
        xl: 'px-3 py-3 text-lg gap-2'
      }
    }
  }
})
