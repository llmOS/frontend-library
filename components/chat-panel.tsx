import {type UseChatHelpers} from '../lib/hooks/use-chat'

import {Button} from './ui/button'
import {PromptForm} from './prompt-form'
import {ButtonScrollToBottom} from './button-scroll-to-bottom'
import {IconRefresh, IconStop} from './ui/icons'
import {FooterText} from './footer'
import * as React from "react";
import {Tooltip, TooltipContent, TooltipTrigger} from "./ui/tooltip";
import {useSidebar} from "../lib/hooks/sidebar-provider";


export interface ChatPanelProps
  extends Pick<
    UseChatHelpers,
    | 'append'
    | 'isLoading'
    | 'reload'
    | 'messages'
    | 'stop'
    | 'input'
    | 'setInput'
  > {
  id?: string
}

const MAX_MESSAGE_LENGTH: number = 10000


export function ChatPanel({
                            id,
                            isLoading,
                            stop,
                            append,
                            reload,
                            input,
                            setInput,
                            messages
                          }: ChatPanelProps) {
  
                            const { isSidebarOpen } = useSidebar();

  return (
    <div className="oc-absolute oc-inset-x-0 oc-bottom-0" style={{ right: isSidebarOpen ? '320px' : '0px', transition: "right 0.2s ease-in-out"}}>
      <ButtonScrollToBottom/>
      <div className="oc-mx-auto sm:oc-max-w-2xl sm:oc-px-4">
        <div className="oc-flex oc-h-10 oc-items-center oc-justify-center">
          {isLoading ? (
            <Button
              variant="outline"
              onClick={() => stop()}
              className="oc-bg-background"
            >
              <IconStop className="oc-mr-2"/>
              Stop generating
            </Button>
          ) : (
            messages?.length > 0 && (
              <Button
                variant="outline"
                onClick={() => reload()}
                className="oc-bg-background"
              >
                <IconRefresh className="oc-mr-2"/>
                Regenerate response
              </Button>
            )
          )}
        </div>
        <div className="oc-space-y-4 oc-border-t oc-bg-background oc-px-4 oc-py-2 oc-shadow-lg sm:oc-rounded-xl sm:oc-border md:oc-py-4">
          <PromptForm
            onSubmit={async value => {
              if (value.length > MAX_MESSAGE_LENGTH) {
                return
              }
              await append({
                id,
                content: value,
                role: 'user'
              })
            }}
            input={input}
            setInput={setInput}
            isLoading={isLoading}
            maxMessageLength={MAX_MESSAGE_LENGTH}
          />
          <div className="oc-hidden oc-flex-row sm:oc-flex md:oc-h-4 sm:oc-h-6 md:oc-pb-0 sm:oc-pb-2">
            <div style={{width: "10%"}}/>
            <FooterText className="sm:oc-block"/>
            <div style={{width: "10%", position: "relative"}}>
              <CharacterLimitCounter input={input}/>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

const CharacterLimitCounter = ({input}: { input: string }) => {

  const getColor = () => {
    if (input.length < (MAX_MESSAGE_LENGTH - 1000)) {
      return "#4982f8"
    }
    if (input.length < MAX_MESSAGE_LENGTH) {
      return "#d3ad1b"
    }
    return "#d50c0c"
  }

  const getRemainingCount = () => {
    if (input.length >= (MAX_MESSAGE_LENGTH - 1000)) {
      return MAX_MESSAGE_LENGTH - input.length
    }
  }

  const getDescription = () => {
    if (input.length > MAX_MESSAGE_LENGTH) {
      return "Character limit exceeded. LLMs have a limited context length."
    }
    return "Characters left. LLMs have a limited context length."
  }


  if (input.length < (MAX_MESSAGE_LENGTH - 1000)) {
    return <></>
  }
  return <Tooltip delayDuration={1000}>
    <TooltipTrigger
      tabIndex={-1}
      className="focus:oc-bg-muted focus:oc-ring-1 focus:oc-ring-ring"
    >
      <div
        style={{
          height: "30px",
          width: "30px",
          marginLeft: "auto",
          position: "absolute",
          bottom: "-6px",
          right: "5px"
        }}>
        <span style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "30px",
          textAlign: "center",
          paddingTop: "2px",
          color: getColor(),
        }}>
      {getRemainingCount()}
    </span>
      </div>
    </TooltipTrigger>
    <TooltipContent>{getDescription()}</TooltipContent>
  </Tooltip>
}
