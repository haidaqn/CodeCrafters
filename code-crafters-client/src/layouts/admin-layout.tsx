import React from "react";
import AdminProtect from "@/protect-route/admin-protect-route.tsx";
import {Footer, SideBar} from "@/components/shared";
import {cn} from "@/lib";
import useAppStore from "@/store/app-store.tsx";

//-----------------------------------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function AdminLayoutView({children}: Props) {

  const {collapseSidebar} = useAppStore();
  return <AdminProtect>
    <div className="overflow-hidden">
      <SideBar/>
      <main
        className={cn(
          'h-[calc(100vh_-_56px)] rounded-md flex flex-col bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] p-7 ease-in-out duration-300',
          !collapseSidebar ? 'lg:ml-[90px]' : 'lg:ml-72',
        )}
      >
        <div className="rounded-md h-screen bg-gray-[50] dark:bg-zinc-800 ">
          {children}
        </div>
      </main>
      <footer
        className={cn(
          'transition-[margin-left] ease-in-out duration-300',
          !collapseSidebar ? 'lg:ml-[90px]' : 'lg:ml-72',
        )}
      >
        <Footer/>
      </footer>
    </div>
  </AdminProtect>
}