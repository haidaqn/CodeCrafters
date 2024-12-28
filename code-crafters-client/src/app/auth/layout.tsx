'use client';

import React from "react";
import AuthLayoutView from "@/layouts/auth-layout.tsx";

//-----------------------------------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function AuthLayout({children}: Props) {

  return (<>
    <AuthLayoutView children={children}/>
  </>)

}