'use client';

import React from "react";
import HomeLayoutView from "@/layouts/home-layout.tsx";

//-----------------------------------------------------------------------------------------------


type Props = {
  children: React.ReactNode;
};

export default function HomeLayout({children}: Props) {

  return (<>
    <HomeLayoutView children={children}/>
  </>)

}