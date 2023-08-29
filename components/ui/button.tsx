import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../../lib/utils'

const buttonVariants = cva(
  'oc-inline-flex oc-items-center oc-justify-center oc-rounded-md oc-text-sm oc-font-medium oc-shadow oc-ring-offset-background oc-transition-colors focus-visible:oc-outline-none focus-visible:oc-ring-2 focus-visible:oc-ring-ring focus-visible:oc-ring-offset-2 disabled:oc-pointer-events-none disabled:oc-opacity-50',
  {
    variants: {
      variant: {
        default:
          'oc-bg-primary oc-text-primary-foreground oc-shadow-md hover:oc-bg-primary/90',
        destructive:
          'oc-bg-destructive oc-text-destructive-foreground hover:oc-bg-destructive/90',
        outline:
          'oc-border oc-border-input hover:oc-bg-accent hover:oc-text-accent-foreground',
        secondary:
          'oc-bg-secondary oc-text-secondary-foreground hover:oc-bg-secondary/80',
        ghost: 'oc-shadow-none hover:oc-bg-accent hover:oc-text-accent-foreground',
        link: 'oc-text-primary oc-underline-offset-4 oc-shadow-none hover:oc-underline'
      },
      size: {
        default: 'oc-h-8 oc-px-4 oc-py-2',
        sm: 'oc-h-8 oc-rounded-md oc-px-3',
        lg: 'oc-h-11 oc-rounded-md oc-px-8',
        icon: 'oc-h-8 oc-w-8 oc-p-0'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    // const Comp = asChild ? Slot : 'button'
    const Comp = "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
