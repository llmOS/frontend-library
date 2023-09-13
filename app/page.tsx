"use client"
import * as React from 'react'

import {Chat} from '@/components/chat'
import {v4} from 'uuid'
import {useEffect} from "react";
import {redirect} from "next/navigation";
import {useUser} from "@/lib/hooks/user-provider";

export const runtime = 'edge'

export default function IndexPage() {

  const {jwt, setJwt, setJwtFromStorage} = useUser()

  // To ensure its only ran once
  let isJwtSet: boolean = false;

  // This will run on every render :/
  useEffect(() => {
    // Maybe should look for expiration too, depending on how long expiration is, but unlikely its necessary right now
    if (!isJwtSet) {
      isJwtSet = true
      const newJwt = getJwtFromUrl()
      if (newJwt) {
        if (!setJwt(newJwt)) {
          redirect('/sign-in')
        }
      } else if (!setJwtFromStorage()) {
        if (process.env.NEXT_PUBLIC_LOGIN_REQUIRED === "true") {
          // sign-in page should handle log in with auth0
          redirect('/sign-in')
        }
      }
    }
  }, [jwt])

  function getJwtFromUrl(): string | null {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('jwt_token');
  }

  const id = v4()
  return (
    <>
      {(jwt || process.env.NEXT_PUBLIC_LOGIN_REQUIRED !== "true") ?
        <Chat id={id} isDebug={process.env.NEXT_PUBLIC_DEBUG_ENABLED === "true"}/>
        :
        <></>
      }
    </>
  )
}
