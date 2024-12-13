import {GoogleOAuthProvider as Provider} from "@react-oauth/google";
import {ReactNode} from "react";
import {appConfig} from "@/config/app.config.ts";

interface GoogleOAuthProviderProps {
  children: ReactNode;
}

export default function GoogleOAuthProvider({children}: GoogleOAuthProviderProps) {
  return <Provider
    clientId={appConfig.auth.googleClientId || ""}
  >
    {children}
  </Provider>
}
