<template>
  <div>
    <UPageHero
      title="30 Seconds"
      description="A game where you have 30 seconds to guess as many words as possible. (duh!)"
      :links="[
        {
          label: 'Start game',
          to: '/game',
          trailingIcon: 'i-lucide-arrow-right',
          size: 'xl',
        },
        {
          label: 'Settings',
          to: '/settings',
          trailingIcon: 'i-lucide-settings',
          size: 'xl',
          color: 'neutral',
          variant: 'subtle',
        },
      ]"
    />
  </div>
</template>
