import {FooterText} from '@/components/footer'
import {NewCopilotForm} from "@/components/new-copilot-form";
import * as React from 'react'

export const runtime = 'edge'
export const preferredRegion = 'home'


export default async function NewCopilotPage() {

  return (
    <>
      <NewCopilotForm/>
      <FooterText className="py-8"/>
    </>
  )
}
