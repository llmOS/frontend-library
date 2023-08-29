'use client'
import * as React from 'react'
import {useState} from 'react'

import {cn} from '../lib/utils'
import {EmptyScreen} from './empty-screen'
import {ChatScrollAnchor} from './chat-scroll-anchor'
import {ChatListWithFeedback} from "./chat-list-with-feedback";
import {toast} from 'react-hot-toast'
import {Message} from "../lib/types";
import {useChat} from "../lib/hooks/use-chat";
import {Debug, DebugMetric, DebugMetrics} from "./debug";
import {Button} from "./ui/button";
import {useUser} from "../lib/hooks/user-provider";
import {ChatPanel} from "./chat-panel";

export interface ChatProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[]
  id?: string
  isDebug?: boolean
  apiUrl?: string
  authToken?: string
}

export function Chat(
  {
    id,
    initialMessages,
    className,
    isDebug,
    apiUrl,
    authToken,
  }: ChatProps) {
  const apiBaseUrl = apiUrl || "http://localhost:3000/"
  const {userId, jwt, email, setJwt} = useUser()

  if (authToken) {
    setJwt(authToken)
  }

  const [userIdentified, setUserIdentified] = useState(false);

  // Ideally cache message metrics, so we would not have to query them again every time
  const cache: any = {}
  const [isDebugOpen, setIsDebugOpen] = useState<boolean>(false);
  const [debugMetrics, setDebugMetrics] = useState<DebugMetrics | undefined>()
  const [isDebugLoading, setIsDebugLoading] = useState<boolean>(false)
  const [debugMessageNumber, setDebugMessageNumber] = useState<number | undefined>()
  const [debugMessageId, setDebugMessageId] = useState<string | undefined>()


  // @ts-ignore
  if (!userIdentified && typeof window !== `undefined` && window.heap) {
    // @ts-ignore
    window.heap.identify(userId);
    setUserIdentified(true);
  }
  const {messages, append, reload, stop, isLoading, input, setInput} =
    useChat({
      initialMessages,
      id,
      body: {
        id
      },
      onResponse(response) {
        if (response.status === 401) {
          toast.error(response.statusText)
        }
      },
      onFinish(message: Message) {
        getDebugMetrics(message.id, true)
      },
      api: (new URL("/v0/conversation_stream/", apiBaseUrl)).toString() + id
    })

  async function getDebugMetrics(messageId: string, isAutomatic: boolean) {
    return
    // TODO
    // setIsDebugLoading(true)
    // try {
    //   const response = await fetch(`${window.location.origin}/api/debug`, {
    //     method: "POST",
    //     headers: {
    //       "accept": "application/json",
    //       "Content-Type": "application/json",
    //       "Authorization": `Bearer ${jwt || ""}`,
    //       "email": email || ""
    //     },
    //     body: JSON.stringify({
    //       conversationId: id,
    //       messageId
    //     })
    //   });
    //   const responseJson = await response.json()
    //   const metrics: DebugMetrics = {
    //     promptTemplate: getFormattedValueWithTokens(responseJson.prompt_template),
    //     dataSources: responseJson.data_sources || "",
    //     userQuestion: getFormattedValueWithTokens(responseJson.user_question),
    //     citations: getFormattedValueWithTokens(responseJson.citations),
    //     context: getFormattedValueWithTokens(responseJson.context),
    //     chatHistory: getFormattedValueWithTokens(responseJson.chat_history),
    //     fullPrompt: getFormattedValueWithTokens(responseJson.full_prompt),
    //     llmResponse: getFormattedValueWithTokens(responseJson.llm_response),
    //   }
    //   // TODO: add to some kind of basic cache as well
    //   setDebugMetrics(metrics)
    //   setDebugMessageId(messageId)
    //   if (isAutomatic) {
    //     // messages.length not updated here yet
    //     setDebugMessageNumber(Math.trunc((messages.length + 2) / 2))
    //   } else {
    //     setDebugMessageNumber(Math.trunc((messages.findIndex(m => m.id === messageId) + 1) / 2))
    //   }
    // } catch (error) {
    //   console.error('There has been a problem with your fetch operation:', error);
    // }
    // setIsDebugLoading(false)
  }

  function getFormattedValueWithTokens(valueWithTokens: any): DebugMetric {
    if (!valueWithTokens) {
      return {
        value: "",
        tokenCount: null,
      }
    }
    return {
      value: valueWithTokens.value,
      tokenCount: valueWithTokens.token_count || null,
    }
  }

  function onDebugMessage(messageId: string) {
    setIsDebugOpen(true)
    if (debugMessageId && debugMessageId !== messageId && !isDebugLoading) {
      getDebugMetrics(messageId, false)
    }
  }

  return (
    <>
      <div
        className="oc-flex oc-flex-row"
        style={{height: "100%"}}
      >
        <div style={{width: "100%"}}>
          {isDebug && <DebugTrigger isDebugOpen={isDebugOpen} onClick={() => {
            setIsDebugOpen(!isDebugOpen)
          }}/>}
          <div
            className={cn('oc-pb-[200px] oc-pt-4 oc-md:pt-10', className)}
            style={{overflow: "auto", height: "100%"}}
          >
            {messages.length ? (
              <>
                <ChatListWithFeedback
                  id={id}
                  isLoading={isLoading}
                  stop={stop}
                  append={append}
                  reload={reload}
                  messages={messages}
                  input={input}
                  setInput={setInput}
                  isDebug={isDebug}
                  onDebugMessage={onDebugMessage}
                  debugMessageId={debugMessageId}
                  apiBaseUrl={apiBaseUrl}
                />
                <ChatScrollAnchor trackVisibility={isLoading}/>
              </>
            ) : (
              <EmptyScreen setInput={setInput}/>
            )}
          </div>
          <ChatPanel
            id={id}
            isLoading={isLoading}
            stop={stop}
            append={append}
            reload={reload}
            messages={messages}
            input={input}
            setInput={setInput}
          />
        </div>
        {isDebugOpen &&
            <div
                role="dialog"
                className="oc-border-r oc-bg-background oc-opacity-100 oc-shadow-lg oc-inset-y-0 oc-flex oc-h-auto oc-w-[400px] oc-flex-col oc-p-0 oc-z-10"
                style={{
                  overflowY: "auto",
                  height: "calc(100vh - 4rem)",
                  position: "fixed",
                  top: "4rem",
                  bottom: 0,
                  right: 0,
                  minWidth: "400px"
                }}>
                <Debug
                    isLoading={isDebugLoading}
                    metrics={debugMetrics}
                    messageNumber={debugMessageNumber}
                />
            </div>
        }
      </div>
    </>
  )
}

const DebugTrigger = ({isDebugOpen, onClick}: { isDebugOpen: boolean, onClick: () => void }) => {
  return <Button
    variant="outline"
    className="oc-mx-2 oc-mt-2 oc-bg-background"
    style={
      isDebugOpen ? {
        position: "fixed",
        top: "4rem",
        right: "400px",
        zIndex: 2,
      } : {
        position: "fixed",
        top: "4rem",
        right: "0",
        zIndex: 2,
      }}
    onClick={onClick}
  >
    Debug
  </Button>
}