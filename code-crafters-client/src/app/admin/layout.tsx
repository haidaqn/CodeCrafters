'use client';

import React from "react";
import AdminLayoutView from "@/layouts/admin-layout.tsx";

//-----------------------------------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function AdminLayout({children}: Props) {

  return (<>
    <AdminLayoutView children={children}/>
  </>)

}