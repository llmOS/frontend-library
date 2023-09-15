import {LoadingMessage as LoadingMessageType, Message} from '../lib/types'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

import {cn} from '../lib/utils'
import {CodeBlock} from './ui/codeblock'
import {MemoizedReactMarkdown} from './markdown'
import {IconCopilot, IconDebug, IconError, IconSpinner, IconUser} from './ui/icons'
import {ChatMessageActions} from './chat-message-actions'
import * as React from "react";
import {useEffect, useState} from "react";
import {Tooltip, TooltipContent, TooltipTrigger} from "./ui/tooltip";

export interface ChatMessageProps {
  message: Message
  isDebug?: boolean
  onDebugMessage: (messageId: string) => void
  debugMessageId?: string | undefined
  copilotIconSource?: string | undefined
}

export function ChatMessage(
  {message, isDebug, onDebugMessage, debugMessageId, copilotIconSource, ...props}: ChatMessageProps) {
  // This should only be done once I guess and not duplicated
  const [copilotName, setCopilotName] = useState<string | undefined>();
  useEffect(() => {
    // TODO:
    setCopilotName("demo")
    // if (process.env.NEXT_PUBLIC_COPILOT_NAME) {
    //   setCopilotName(process.env.NEXT_PUBLIC_COPILOT_NAME)
    // }
  }, []);
  if (!copilotName) {
    // Returns null on first render, so the client and server match
    return <></>;
  }

  return (
    <div
      className={cn('oc-group oc-relative oc-mb-4 oc-flex oc-items-start md:oc--ml-12')}
      {...props}
    >
      {(message.loadingMessage && !message.content && !message.error) ?
        <LoadingMessage loadingMessage={message.loadingMessage} copilotIconSource={copilotIconSource}/>
        :
        <>
          <div className="oc-flex oc-flex-col">
            <div
              className={cn(
                'oc-flex oc-h-8 oc-w-8 oc-shrink-0 oc-select-none oc-items-center oc-justify-center oc-rounded-md oc-border oc-shadow',
                message.role === 'user'
                  ? 'oc-bg-background'
                  : 'oc-bg-primary oc-text-primary-foreground'
              )}
            >
              {message.role === 'user' ? <IconUser/> : <IconCopilot source={copilotIconSource}/>}
              {message.error &&
                  <IconError className={"oc-absolute oc-w-4 oc-h-4"} style={{top: "1.2rem", left: "1.2rem"}}/>}
            </div>
            {(isDebug && message.role !== "user") &&
                <div className="oc-pt-4">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div
                                className="oc-cursor-pointer"
                                style={{display: "flex", justifyContent: "center"}}
                                onClick={() => {
                                  onDebugMessage(message.id)
                                }}
                            >
                              {(debugMessageId && debugMessageId == message.id) ?
                                <IconDebug isActive={true}/>
                                :
                                <IconDebug isActive={false}/>
                              }
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>Debug this message</TooltipContent>
                    </Tooltip>
                </div>
            }
          </div>
          <div className="oc-ml-4 oc-flex-1 oc-space-y-2 oc-overflow-hidden oc-px-1">
            {message.error ?
              <div
                className="oc-py-4 oc-pl-2 oc-border-red-500 oc-border-2 oc-bg-red-300 oc-text-black"
                style={{borderRadius: "8px"}}
              >
                {message.error}
              </div>
              :
              <MemoizedReactMarkdown
                className="oc-prose oc-break-words dark:oc-prose-invert prose-p:oc-leading-relaxed prose-pre:oc-p-0"
                remarkPlugins={[remarkGfm, remarkMath]}
                linkTarget="_blank"
                components={{
                  p({children}) {
                    return <p className="oc-mb-2 last:oc-mb-0">{children}</p>
                  },
                  code({node, inline, className, children, ...props}) {
                    if (children.length) {
                      if (children[0] == '▍') {
                        return (
                          <span className="oc-mt-1 oc-animate-pulse oc-cursor-default">▍</span>
                        )
                      }

                      children[0] = (children[0] as string).replace('`▍`', '▍')
                    }

                    const match = /language-(\w+)/.exec(className || '')

                    if (inline) {
                      return (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      )
                    }

                    return (
                      <CodeBlock
                        key={Math.random()}
                        language={(match && match[1]) || ''}
                        value={String(children).replace(/\n$/, '')}
                        {...props}
                      />
                    )
                  }
                }}
              >
                {message.content || ""}
              </MemoizedReactMarkdown>
            }
            <ChatMessageActions message={message}/>
          </div>
        </>
      }
    </div>
  )
}


function LoadingMessage({loadingMessage, copilotIconSource}: {
  loadingMessage: LoadingMessageType,
  copilotIconSource: string | undefined
}) {
  return <>
    <div
      className={cn(
        'oc-flex oc-h-8 oc-w-8 oc-shrink-0 oc-select-none oc-items-center oc-justify-center oc-rounded-md oc-border oc-shadow',
        'oc-bg-white oc-text-primary-foreground'
      )}
    >
      <IconCopilot source={copilotIconSource}/>
    </div>
    <div className="oc-ml-4 oc-h-8 oc-flex-1 oc-space-y-2 oc-overflow-hidden oc-px-1">
        <span
          className="oc-bg-green-300 oc-px-8 oc-font-bold oc-text-black"
          style={{
            height: "100%",
            width: "max-content",
            alignItems: "center",
            display: "flex",
            borderRadius: "5px"
          }}
        >
          {loadingMessage.message || ""}
          <IconSpinner className="oc-ml-2 oc-animate-spin"/>
        </span>
    </div>
  </>
}