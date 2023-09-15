import * as React from 'react'
import {type UseChatHelpers} from '../lib/hooks/use-chat'

import {Separator} from './ui/separator'
import {ChatMessage} from './chat-message'
// import {FeedbackForm} from './feedback-form';
import {useUser} from "../lib/hooks/user-provider";

export interface ChatListWithFeedbackProps
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
  isDebug?: boolean
  onDebugMessage: (messageId: string) => void
  debugMessageId: string | undefined
  apiBaseUrl: string | null,
  copilotIconSource?: string | undefined
}

export function ChatListWithFeedback(
  {isLoading, id, messages, isDebug, onDebugMessage, debugMessageId, apiBaseUrl, copilotIconSource}: ChatListWithFeedbackProps
) {
  const {email, jwt} = useUser()

  if (!messages.length) {
    return null
  }
  const isLastMessageByAssistant = messages[messages.length - 1].role == 'assistant' && !isLoading;

  return (
    <div className="oc-relative oc-mx-auto oc-max-w-2xl oc-px-4">
      {messages.map((message, index) => (
        <div key={index}>
          <ChatMessage
            message={message}
            isDebug={isDebug}
            onDebugMessage={onDebugMessage}
            debugMessageId={debugMessageId}
            copilotIconSource={copilotIconSource}
          />
          {index < messages.length - 1 && (
            <Separator className="oc-my-4 md:oc-my-8"/>
          )}
        </div>
      ))}

      {/*{isLastMessageByAssistant ?*/}
      {/*  <FeedbackForm*/}
      {/*    onSubmit={async (value) => {*/}
      {/*      try {*/}
      {/*        const feedback: any = {*/}
      {/*          id: value.id,*/}
      {/*          correctness: value.correctness,*/}
      {/*          helpfulness: value.helpfulness,*/}
      {/*          easy_to_understand: value.easy_to_understand,*/}
      {/*          free_form_feedback: value.free_form_feedback,*/}
      {/*        };*/}
      {/*        Object.keys(feedback).forEach(key => {*/}
      {/*          if (feedback[key] === null) {*/}
      {/*            delete feedback[key];*/}
      {/*          }*/}
      {/*        });*/}
      {/*        const response = await fetch(*/}
      {/*          (new URL(`/v0/conversation/${id}/feedback`, apiBaseUrl)).toString(),*/}
      {/*          {*/}
      {/*            method: "POST",*/}
      {/*            headers: {*/}
      {/*              "accept": "application/json",*/}
      {/*              "Content-Type": "application/json",*/}
      {/*              // "email": email || "",*/}
      {/*              "Authorization": `Bearer ${jwt || ""}`*/}
      {/*            },*/}
      {/*            body: JSON.stringify(feedback)*/}
      {/*          });*/}

      {/*      } catch (error) {*/}
      {/*        console.error('There has been a problem with your fetch operation:', error);*/}
      {/*      }*/}
      {/*    }}*/}
      {/*    id={id || ""}*/}
      {/*  />*/}
      {/*  : <></>}*/}


    </div>
  )
}
