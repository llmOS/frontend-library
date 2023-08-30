'use client'

import * as React from 'react'

import {cn} from '../lib/utils'
import {useAtBottom} from '../lib/hooks/use-at-bottom'
import {Button, type ButtonProps} from './ui/button'
import {IconArrowDown} from './ui/icons'

export function ButtonScrollToBottom({className, ...props}: ButtonProps) {
  const isAtBottom = useAtBottom()

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(
        'oc-absolute oc-right-4 oc-top-1 oc-z-10 oc-bg-background oc-transition-opacity oc-duration-300 oc-sm:right-8 oc-md:top-2',
        isAtBottom ? 'oc-opacity-0' : 'oc-opacity-100',
        className
      )}
      onClick={() => {
        const objDiv = document.getElementById("oc-chat-messages-wrapper");
        if (objDiv)
        objDiv.scrollTop = objDiv.scrollHeight;
      }}
      {...props}
    >
      <IconArrowDown/>
      <span className="sr-only">Scroll to bottom</span>
    </Button>
  )
}
