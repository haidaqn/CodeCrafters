'use client'

import GoogleOAuthProvider from "@/components/providers/google-oauth.tsx";
import {useState} from "react";
import {useGoogleLogin, useGoogleOneTapLogin} from "@react-oauth/google";
import {AuthApi} from "@/api/auth.ts";
import {toast} from "sonner";
import {Button} from "@/components/ui/button.tsx";
import {Icons} from "@/components/ui/icons.tsx";
import {location} from "@/config";


//-----------------------------------------------------------------------------------------------

interface GoogleSignInButtonProps {
  finalizeLogin: (value: any) => void,
}


export default function GoogleSignInButtonWrapper(props: GoogleSignInButtonProps) {
  return <GoogleOAuthProvider>
    <GoogleSignInButton {...props}/>
  </GoogleOAuthProvider>;
}

function GoogleSignInButton(props: GoogleSignInButtonProps) {

  const [loading, setLoading] = useState<boolean>(false);
  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    redirect_uri: location + '/oauth/google',
    onSuccess: tokenResponse => {
      const code = tokenResponse.code;
      setLoading(true);
      AuthApi.authSso('google', {
        code,
        redirect_uri: 'postmessage'
      }).then(props.finalizeLogin).catch(err => {
        toast?.error(err.message || "AN_ERROR_HAS_OCCURRED")
      }).finally(() => {
        setLoading(false);
      })
    },
    onError() {
      setLoading(false)
    },
    onNonOAuthError() {
      setLoading(false)
    }
  })

  useGoogleOneTapLogin({
    onSuccess: credentialResponse => {
      const {credential} = credentialResponse;
      AuthApi.authSso('google', {
        access_token: credential,
        redirect_uri: location + '/oauth/google',
      }).then(props.finalizeLogin).catch(err => {
        toast?.error(err?.message || 'AN_ERROR_HAS_OCCURRED')
      }).finally(() => {
        setLoading(false);
      })
    },
    onError: () => {
      console.log("Login Failed")
    }
  })


  return <Button
    icon={<Icons.google className="mr-2 h-4 w-4"/>}
    variant="outline" type="button"
    onClick={() => {
      setLoading(true);
      googleLogin();
    }}
    loading={loading}
  >
    Continue with Google
  </Button>
}