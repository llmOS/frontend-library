import * as React from 'react'
import {type UseChatHelpers} from '../lib/hooks/use-chat'

import remarkGfm from 'remark-gfm'

import {Button} from './ui/button'
import {IconArrowRight} from './ui/icons'
import ReactMarkdown from 'react-markdown'
import {CopilotConfig, getCopilotConfig} from '../assets/config'
import {useEffect, useState} from "react";
import {useCopilot} from "../lib/hooks/copilot-provider";

export function EmptyScreen({setInput}: Pick<UseChatHelpers, 'setInput'>) {

  const {
    copilotName,
    title,
    exampleMessages,
    description,
    footer,
  } = useCopilot()

  const [config, setConfig] = useState<CopilotConfig | undefined>();
  useEffect(() => {
    // TODO:
    setConfig(getCopilotConfig("demo"))
    // setConfig(getCopilotConfig(process.env.NEXT_PUBLIC_COPILOT_NAME))
  }, []);
  if (!config) {
    // Returns null on first render, so the client and server match
    return null;
  }

  return (
    <>
      <div className="oc-mx-auto oc-max-w-2xl oc-px-4" style={{marginTop: `10%`}}>
        <div className="oc-rounded-lg oc-border oc-p-8 oc-bg-background">
          <h1 className="oc-mb-2 oc-text-lg" style={{fontSize: `25px`}}>
            {title || config.EMPTY_SCREEN_TITLE}
          </h1>
          <br/>
          {description ?
            <ReactMarkdown
              className="oc-prose oc-break-words dark:oc-prose-invert prose-p:oc-leading-relaxed prose-pre:oc-p-0"
              remarkPlugins={[remarkGfm]}
              linkTarget="_blank"
              components={{
                p({children}) {
                  return <p className="oc-mb-2 oc-leading-normal oc-text-muted-foreground last:oc-mb-0">{children}</p>
                }
              }}
            >
              {description}
            </ReactMarkdown>
            :
            <ReactMarkdown
              className="oc-prose oc-break-words dark:oc-prose-invert prose-p:oc-leading-relaxed prose-pre:oc-p-0"
              remarkPlugins={[remarkGfm]}
              linkTarget="_blank"
              components={{
                p({children}) {
                  return <p className="oc-mb-2 oc-leading-normal oc-text-muted-foreground last:oc-mb-0">{children}</p>
                }
              }}
            >
              {config.EMPTY_SCREEN_BODY || ""}
            </ReactMarkdown>
          }


          <br/>
          <p className="oc-leading-normal oc-text-muted-foreground">
            You can start a conversation below or try the following examples:
          </p>
          <div className="oc-mt-4 oc-flex oc-flex-col oc-items-start oc-space-y-2">
            {exampleMessages ? <>
                {(exampleMessages).map((message, index) => (
                  <Button
                    key={index}
                    variant="link"
                    className="oc-h-auto oc-p-0 oc-text-base"
                    onClick={() => setInput(message)}
                  >
                    <IconArrowRight className="oc-mr-2 oc-text-muted-foreground"/>
                    {message}
                  </Button>
                ))}
              </>
              :
              <>
                {(config.EXAMPLE_MESSAGES).map((message, index) => (
                  <Button
                    key={index}
                    variant="link"
                    className="oc-h-auto oc-p-0 oc-text-base"
                    onClick={() => setInput(message.message)}
                  >
                    <IconArrowRight className="oc-mr-2 oc-text-muted-foreground"/>
                    {message.heading}
                  </Button>
                ))}
              </>}

          </div>
        </div>
      </div>
    </>
  )
}
