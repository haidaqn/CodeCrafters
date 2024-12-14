'use client';
//-----------------------------------------------------------------------------------------------

import React, {useEffect, useState} from "react";
import {cn} from "@/lib";
import GoogleSignInButtonWrapper from "@/sections/auth/components/google-sign-in-button.tsx";
import {SubmitHandler, useForm} from "react-hook-form";
import {LoginSchema} from "@/schema";
import {z} from 'zod'
import {zodResolver} from "@hookform/resolvers/zod";
import {LoginForm} from "@/interfaces";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {InputPassword} from "@/components/ui/input-password.tsx";
import {Button} from "@/components/ui/button.tsx";

//-----------------------------------------------------------------------------------------------


interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
}

export default function UserAuthForm({className, ...props}: UserAuthFormProps) {
  const [loading, setLoading] = useState<boolean>(false)

  type LoginSchemaType = z.infer<typeof LoginSchema>;

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const handleLogin: SubmitHandler<LoginForm> = (data) => {
    setLoading(true);

  }

  const finalizeLogin = async (response: any) => {



  }


  useEffect(() => {
  }, [])

  return <div className={cn('grid gap-6', className)} {...props}>
    <div className={"grid gap-2"}>
      <GoogleSignInButtonWrapper finalizeLogin={finalizeLogin}/>
    </div>
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t"/>
      </div>
      <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or
          </span>
      </div>
    </div>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleLogin)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <FormField
              control={form.control}
              name="email"
              render={({field}) => (
                <FormItem className="px-1">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-1">
            <FormField
              control={form.control}
              name="password"
              render={({field}) => (
                <FormItem className="px-1">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <InputPassword placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
          </div>
          <div className='px-1'>
            <Button type='button' className="w-full" variant={'outline'}>
              Forgot your password?
            </Button>
          </div>
          <div className="px-1 grid gap-2">
            <Button
              className='w-full'
              loading={loading}
              disabled={loading}
            >
              Sign In with Email
            </Button>
          </div>
        </div>
      </form>
    </Form>
  </div>
}