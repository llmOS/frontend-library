'use client'

import * as React from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'

import { cn } from '../../lib/utils'

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      'oc-z-50 oc-overflow-hidden oc-rounded-md oc-border oc-bg-popover oc-px-3 oc-py-1.5 oc-text-xs oc-font-medium oc-text-popover-foreground oc-shadow-md oc-animate-in oc-fade-in-50 data-[side=bottom]:oc-slide-in-from-top-1 data-[side=left]:oc-slide-in-from-right-1 data-[side=right]:oc-slide-in-from-left-1 data-[side=top]:oc-slide-in-from-bottom-1',
      className
    )}
    {...props}
  />
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
