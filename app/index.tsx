import './globals.css'
import {v4} from "uuid";
import React from 'react';
import ReactDOM from 'react-dom';

import {UserProvider} from "../lib/hooks/user-provider";
import {Chat} from "../components/chat";
import {UserProvider as Auth0UserProvider} from "@auth0/nextjs-auth0/client";
import {TooltipProvider} from "../components/ui/tooltip";
import {CopilotProvider} from "../lib/hooks/copilot-provider";
import {SidebarProvider} from "../lib/hooks/sidebar-provider";

interface Props {
  elementId: string
  theme?: "light" | "dark"
  apiUrl?: string
  authToken?: string
}

export const initialize = ({elementId, theme, apiUrl, authToken}: Props) => {
  ReactDOM.render(
    <OpenCopilot
      elementId={elementId}
      theme={theme || "light"}
      apiUrl={apiUrl}
      authToken={authToken}
    />,
    document.getElementById(elementId)
  );
}


const OpenCopilot = ({theme, apiUrl, authToken}: Props) => {
  const id = v4()
  return <>
    <div className={theme === "light" ? "oc-light" : "oc-dark"} style={{height: "100%", position: "relative"}}>
      <div style={{height: "100%", width: "100%"}} className={"oc-base"}>
        {Providers(<Chat id={id} apiUrl={apiUrl} authToken={authToken}/>)}
      </div>
    </div>
  </>
}

const Providers = (children: React.ReactNode) => {
  return <TooltipProvider>
    <CopilotProvider>
      <UserProvider>
        <Auth0UserProvider>
          <SidebarProvider>
            {children}
          </SidebarProvider>
        </Auth0UserProvider>
      </UserProvider>
    </CopilotProvider>
  </TooltipProvider>
}
