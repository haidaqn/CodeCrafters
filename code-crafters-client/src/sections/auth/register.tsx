'use client';

//-----------------------------------------------------------------------------------------------

import {RegisterSchema} from "@/schema";
import {z} from 'zod'
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {InputPassword} from "@/components/ui/input-password.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ArrowRightIcon} from "@radix-ui/react-icons";
import useAuthStore from "@/store/auth-store.ts";
import {useRouter} from 'next/navigation';


//-----------------------------------------------------------------------------------------------

export default function RegisterSection() {
  const {loading, register} = useAuthStore();
  const router = useRouter()
  type RegisterSchemaType = z.infer<typeof RegisterSchema>
  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      username: ''
    }
  })

  const handleRegister: SubmitHandler<RegisterSchemaType> = async (data) => {
    await register(data, (path) => router.push(path));
  }

  return <Form {...form}>
    <form className="space-y-2" onSubmit={form.handleSubmit(handleRegister)}>
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          Create account
        </h1>
        <p className="text-sm text-muted-foreground">
          Stable helps you connect people moving on a same direction...
        </p>
      </div>
      <div className="grid gap-1 group">
        <FormField
          control={form.control}
          name="username"
          render={({field}) => (
            <FormItem className="px-1">
              <FormLabel>User name</FormLabel>
              <FormControl>
                <Input placeholder="user Name" {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
      </div>
      <div className="grid gap-1 group">
        <FormField
          control={form.control}
          name="fullName"
          render={({field}) => (
            <FormItem className="px-1">
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Full Name" {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
      </div>
      <div className="grid gap-1 group">
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
      <div className="grid gap-1 group">
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
      <div className={'pt-4'}>
        <Button className={'w-full'} disabled={loading}>
          Continue <ArrowRightIcon className={'ml-2 w-4 h-4'}/>
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">
        By clicking continue, you agree to our{" "}
        <a
          href='/legal/terms'
          target='_blank'
          className="underline underline-offset-4 hover:text-primary"
        >
          Terms of Service
        </a>{" "}
        and{" "}
        <a
          href='/legal/privacy'
          target='_blank'
          className="underline underline-offset-4 hover:text-primary"
        >
          Privacy Policy
        </a>
        .
      </p>
    </form>
  </Form>
}