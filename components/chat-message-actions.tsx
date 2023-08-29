'use client'
import * as React from 'react'

import { type Message } from '../lib/types'

import { Button } from './ui/button'
import { IconCheck, IconCopy } from './ui/icons'
import { useCopyToClipboard } from '../lib/hooks/use-copy-to-clipboard'
import { cn } from '../lib/utils'

interface ChatMessageActionsProps extends React.ComponentProps<'div'> {
  message: Message
}

export function ChatMessageActions({
  message,
  className,
  ...props
}: ChatMessageActionsProps) {
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 })

  const onCopy = () => {
    if (isCopied) return
    copyToClipboard(message.content)
  }

  return (
    <div
      className={cn(
        'oc-flex oc-items-center oc-justify-end oc-transition-opacity group-hover:oc-opacity-100 md:oc-absolute md:oc--right-10 md:oc--top-2 md:oc-opacity-0',
        className
      )}
      {...props}
    >
      <Button variant="ghost" size="icon" onClick={onCopy}>
        {isCopied ? <IconCheck /> : <IconCopy />}
        <span className="oc-sr-only">Copy message</span>
      </Button>
    </div>
  )
}
