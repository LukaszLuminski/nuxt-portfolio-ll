<script setup lang="ts">
import { cva, type VariantProps } from 'class-variance-authority'
import type { ClassValue } from 'clsx'
import { cn } from '~/utils/cn'

defineOptions({
  inheritAttrs: false
})

const buttonVariants = cva(
  'group inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-full px-5 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-white text-slate-950 shadow-glow hover:-translate-y-0.5 hover:bg-slate-100',
        secondary:
          'border border-white/[0.12] bg-white/[0.055] text-white hover:-translate-y-0.5 hover:bg-white/[0.09]',
        ghost: 'text-muted-foreground hover:bg-white/[0.06] hover:text-white'
      },
      size: {
        default: 'h-11 px-5',
        lg: 'h-12 px-6 text-[15px]',
        icon: 'h-10 w-10 px-0'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

type ButtonVariants = VariantProps<typeof buttonVariants>

const props = withDefaults(
  defineProps<{
    variant?: ButtonVariants['variant']
    size?: ButtonVariants['size']
    href?: string
  }>(),
  {
    variant: 'default',
    size: 'default',
    href: undefined
  }
)

const attrs = useAttrs()

const delegatedAttrs = computed(() => {
  const { class: _class, ...rest } = attrs
  return rest
})

const buttonClass = computed(() =>
  cn(buttonVariants({ variant: props.variant, size: props.size }), attrs.class as ClassValue)
)
</script>

<template>
  <NuxtLink
    v-if="href"
    v-bind="delegatedAttrs"
    :to="href"
    :class="buttonClass"
  >
    <slot />
  </NuxtLink>
  <button
    v-else
    v-bind="delegatedAttrs"
    type="button"
    :class="buttonClass"
  >
    <slot />
  </button>
</template>
