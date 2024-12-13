'use client';

import React from "react";
import {LogoIcon} from "@/components/icons/Logo.tsx";
import {usePathname} from "@/routes";
import {cn} from "@/lib";
import {buttonVariants} from "@/components/ui/button.tsx";

//-----------------------------------------------------------------------------------------------


type Props = {
  children: React.ReactNode;
};

export default function AuthLayout({children}: Props) {

  const pathname = usePathname()

  return (
    <div
      className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      {pathname !== '/auth/register' ? (
        <a
          href="/auth/register"
          className={cn(
            buttonVariants({variant: 'ghost'}),
            'absolute right-4 top-4 md:right-8 md:top-8'
          )}
        >
          Create Account
        </a>
      ) : <a
        href="/auth/login"
        className={cn(
          buttonVariants({variant: 'ghost'}),
          'absolute right-4 top-4 md:right-8 md:top-8'
        )}
      >
        Login
      </a>}
      <div className="relative hidden h-full flex-col bg-muted p-10 lg:flex dark:border-r">
        <div className="absolute inset-0"/>
        <div className="relative z-20 flex items-center gap-2 text-xl font-medium">
          <LogoIcon/> CodeCraft
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              Simplified Product Development
            </p>
            <footer className="text-sm">
              Centralize all your team abilities and manage your product development at ease.
            </footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          {children}
        </div>
      </div>
    </div>)
}