import React from "react";
import AuthProtect from "@/protect-route/auth-protect-route.tsx";


//-----------------------------------------------------------------------------------------------


type Props = {
  children: React.ReactNode;
};

export default function HomeLayoutView({children}: Props) {
  return <AuthProtect>
    <div>
      home layout
    </div>
    <div>
      {children}
    </div>
  </AuthProtect>
}