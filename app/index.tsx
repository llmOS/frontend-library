import './globals.css'
import {v4} from "uuid";
import React from 'react';
import ReactDOM from 'react-dom';

import {UserProvider} from "../lib/hooks/user-provider";
import {Chat} from "../components/chat";
import {TooltipProvider} from "../components/ui/tooltip";
import {CopilotProvider} from "../lib/hooks/copilot-provider";
import {SidebarProvider} from "../lib/hooks/sidebar-provider";

interface Props {
  elementId: string
  theme?: "light" | "dark"
  apiUrl?: string
  authToken?: string
  isDebug?: boolean
  copilotIcon?: string
}

export const initialize = ({elementId, theme, apiUrl, authToken, isDebug, copilotIcon}: Props) => {
  ReactDOM.render(
    <OpenCopilot
      elementId={elementId}
      theme={theme || "light"}
      apiUrl={apiUrl}
      authToken={authToken}
      isDebug={isDebug}
      copilotIcon={copilotIcon}
    />,
    document.getElementById(elementId)
  );
}


const OpenCopilot = ({theme, apiUrl, authToken, isDebug, copilotIcon}: Props) => {
  const id = v4()
  return <>
    <div className={theme === "light" ? "oc-light" : "oc-dark"} style={{height: "100%", position: "relative"}}>
      <div style={{height: "100%", width: "100%"}} className={"oc-base"}>
        {Providers(
          <Chat
            id={id}
            apiUrl={apiUrl}
            authToken={authToken}
            isDebug={!!isDebug}
            copilotIconSource={copilotIcon}
          />
        )}
      </div>
    </div>
  </>
}

const Providers = (children: React.ReactNode) => {
  return <TooltipProvider>
    <CopilotProvider>
      <UserProvider>
        <SidebarProvider>
          {children}
        </SidebarProvider>
      </UserProvider>
    </CopilotProvider>
  </TooltipProvider>
}
