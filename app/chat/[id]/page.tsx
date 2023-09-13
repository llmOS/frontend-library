"use client"
import * as React from 'react'

import {notFound, redirect} from 'next/navigation'

import {getChat} from '@/app/actions'
import {Chat} from '@/components/chat'
import {useUser} from "@/lib/hooks/user-provider";
import {useEffect, useState} from "react";

export interface ChatPageProps {
  params: {
    id: string
  }
}

export default function ChatPage({params}: ChatPageProps) {
  let {userId} = useUser()

  const [currentChat, setChat] = useState<any | undefined>()

  if (!userId) {
    redirect(`/sign-in?next=/chat/${params.id}`)
  }

  let isQueried: boolean = false
  useEffect(() => {
    if (!isQueried) {
      isQueried = true
      getChat(params.id, userId || "").then(chat => {
        if (chat) {
          if ((chat?.userId !== userId)
            && process.env.VERCEL_ENV !== 'preview') {
            notFound()
          } else {
            setChat(chat)
          }
        } else {
          notFound()
        }
      })
    }
  }, [])

  return (<>
      {currentChat ?
        <Chat id={currentChat.id} initialMessages={currentChat.messages}/>
        :
        <></>
      }
    </>
  )
}
