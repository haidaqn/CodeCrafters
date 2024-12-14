'use client';

//-----------------------------------------------------------------------------------------------


import {VerifySchema} from "@/schema";
import {z} from 'zod'
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot} from "@/components/ui/input-otp.tsx";

//-----------------------------------------------------------------------------------------------


export default function VerifySection() {

  type VerifySchemaType = z.infer<typeof VerifySchema>
  const form = useForm<VerifySchemaType>({
    resolver: zodResolver(VerifySchema),
    defaultValues: {
      email: "",
      code: ""
    }
  })

  const handleVerify: SubmitHandler<VerifySchemaType> = async (data) => {

  }

  return <>
    <Form {...form}>
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          Verify account
        </h1>
        <p className="text-sm text-muted-foreground">
          Verify your account to continue...
        </p>
      </div>
      <form onSubmit={form.handleSubmit(handleVerify)}>
        <FormField
          control={form.control}
          name="email"
          render={({field}) => (
            <FormItem>
              <FormLabel>
                Email
              </FormLabel>
              <FormControl>
                <Input placeholder="example@gmail.com" {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="code"
          render={({field}) => (
            <FormItem>
              <FormLabel>
                Verification Code
              </FormLabel>
              <FormControl>
                <div className="flex items-center justify-center">
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0}/>
                      <InputOTPSlot index={1}/>
                      <InputOTPSlot index={2}/>
                    </InputOTPGroup>
                    <InputOTPSeparator/>
                    <InputOTPGroup>
                      <InputOTPSlot index={3}/>
                      <InputOTPSlot index={4}/>
                      <InputOTPSlot index={5}/>
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        {/*{showRecaptcha && (*/}
        {/*  <FormField*/}
        {/*    control={form.control}*/}
        {/*    name="captcha"*/}
        {/*    render={({field}) => (*/}
        {/*      <FormItem>*/}
        {/*        <FormLabel>*/}
        {/*          Human Verification*/}
        {/*        </FormLabel>*/}
        {/*        <FormControl>*/}
        {/*          <ReCAPTCHA*/}
        {/*            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}*/}
        {/*            onChange={value => {*/}
        {/*              field.onChange(value);*/}
        {/*            }}*/}
        {/*          />*/}
        {/*        </FormControl>*/}
        {/*        <FormMessage/>*/}
        {/*      </FormItem>*/}
        {/*    )}*/}
        {/*  />*/}
        {/*)}*/}
        <div className={'flex flex-row gap-2 mt-4'}>
          <Button type="button" className={'flex-1'} variant={'outline'}>
            Resend
          </Button>
          <Button type={'submit'} className={'flex-1'}>
            Verify
          </Button>
        </div>
      </form>
    </Form></>
}