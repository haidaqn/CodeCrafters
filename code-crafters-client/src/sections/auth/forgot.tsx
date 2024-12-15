'use client'

//-----------------------------------------------------------------------------------------------

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {ForgotPasswordSchema} from "@/schema";
import {z} from 'zod'
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useState} from "react";
import {Icons} from "@/components/ui/icons.tsx";
import {toast} from "sonner";
import {useRouter} from "@/routes";
import {authApi} from "@/api/authApi.ts";

//-----------------------------------------------------------------------------------------------

export default function ForgotSection() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  type ForgotSchemaType = z.infer<typeof ForgotPasswordSchema>

  const form = useForm<ForgotSchemaType>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: '',
    }
  })

  const handleForgot: SubmitHandler<ForgotSchemaType> = async (data) => {
    setIsLoading(true)
    try {
      const res = await authApi.forgotPassword(data.email) as any
      toast.success(res?.data.message || "New password has been sent to your email please check!");
      form.reset();
      router.push('/auth/login');
    } catch
      (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  }


  return <div className="grid gap-4">
    <div className="flex flex-col space-y-2 text-center">
      <h1 className="text-2xl font-semibold tracking-tight">
        Forgot Your Password?
      </h1>
      <p className="text-sm text-muted-foreground">
        Enter your email to reset it and manage your extensions.
      </p>
    </div>

    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleForgot)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <FormField
              control={form.control}
              name="email"
              render={({field}) => (
                <FormItem className="px-1">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter a mail" {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
          </div>
          <div className="px-1 grid gap-2">
            <Button disabled={isLoading}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin"/>
              )}
              Forgot with Email
            </Button>
          </div>
        </div>
      </form>
    </Form>
  </div>
}