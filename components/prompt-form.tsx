import * as React from 'react'
import Textarea from 'react-textarea-autosize'
import {type UseChatHelpers} from '../lib/hooks/use-chat'

import {useEnterSubmit} from '../lib/hooks/use-enter-submit'
import {cn} from '../lib/utils'
import {Button, buttonVariants} from './ui/button'
import {Tooltip, TooltipContent, TooltipTrigger} from './ui/tooltip'
import {IconArrowElbow, IconPlus} from './ui/icons'

export interface PromptProps
  extends Pick<UseChatHelpers, 'input' | 'setInput'> {
  onSubmit: (value: string) => Promise<void>
  isLoading: boolean,
  maxMessageLength: number,
}

export function PromptForm(
  {
    onSubmit,
    input,
    setInput,
    isLoading,
    maxMessageLength,
  }: PromptProps) {
  const {formRef, onKeyDown} = useEnterSubmit()
  const inputRef = React.useRef<HTMLTextAreaElement>(null)

  // React.useEffect(() => {
  //   if (inputRef.current) {
  //     inputRef.current.focus()
  //   }
  // }, [])

  return (
    <form
      onSubmit={async e => {
        e.preventDefault()
        if (!input?.trim()) {
          return
        }
        if (input.length > maxMessageLength) {
          return
        }
        setInput('')
        await onSubmit(input)
      }}
      ref={formRef}
    >
      <div
        className="oc-relative oc-flex oc-max-h-60 oc-w-full oc-grow oc-flex-col oc-overflow-hidden oc-bg-background oc-px-8 sm:oc-rounded-md sm:oc-border sm:oc-px-12">
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              onClick={() => {
                // A bit hacky solution to actually force reload immediately
                window.location.reload()
              }}
              className={cn(
                // buttonVariants({size: 'sm', variant: 'outline'}),
                "oc-inline-flex oc-items-center oc-justify-center oc-text-sm oc-font-medium oc-shadow oc-ring-offset-background oc-transition-colors focus-visible:oc-outline-none focus-visible:oc-ring-2 focus-visible:oc-ring-ring focus-visible:oc-ring-offset-2 disabled:oc-pointer-events-none disabled:oc-opacity-50",
                "oc-border oc-border-input hover:oc-bg-accent hover:oc-text-accent-foreground",
                'oc-absolute oc-left-0 oc-top-4 oc-h-8 oc-w-8 oc-rounded-full oc-bg-background oc-p-0 sm:oc-left-4'
              )}
            >
              <IconPlus/>
              <span className="oc-sr-only">New Chat</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>New Chat</TooltipContent>
        </Tooltip>

        <Textarea
          ref={inputRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          rows={1}
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Send a message."
          spellCheck={false}
          className="oc-min-h-[60px] oc-w-full oc-resize-none oc-bg-transparent oc-px-4 oc-py-[1.3rem] focus-within:oc-outline-none sm:oc-text-sm"
        />
        <div className="oc-absolute oc-right-0 oc-top-4 sm:oc-right-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || input === ''}
              >
                <IconArrowElbow/>
                <span className="oc-sr-only">Send message</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Send message</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </form>
  )
}
