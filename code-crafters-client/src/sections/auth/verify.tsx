'use client';

//-----------------------------------------------------------------------------------------------

import {useEffect, useState} from 'react';
import {VerifySchema} from "@/schema";
import {z} from 'zod'
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot} from "@/components/ui/input-otp";
import {CountdownTimer} from "@/components/ui/countdown-timer";
import ReCAPTCHA from "react-google-recaptcha";
import {appConfig} from "@/config";
import {AuthApi} from "@/api/auth.ts";
import {useRouter, useSearchParams} from "@/routes";
import {toast} from "sonner";

//-----------------------------------------------------------------------------------------------

export default function VerifySection() {
  const [isTimerEnded, setIsTimerEnded] = useState(false);
  const [showRecaptcha, setShowRecaptcha] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter()

  // @ts-ignore
  const email = searchParams.get('email');

  type VerifySchemaType = z.infer<typeof VerifySchema>
  const form = useForm<VerifySchemaType>({
    resolver: zodResolver(VerifySchema),
    defaultValues: {
      email: "",
      code: "",
      captcha: ""
    }
  })

  useEffect(() => {
    if (email) {
      form.setValue('email', email)
    }
  }, [email]);

  const handleVerify: SubmitHandler<VerifySchemaType> = async (data) => {
    const {email, code} = form.getValues();
    if (!code) return;
    await AuthApi.verifyEmail({email, code}).then((response: any) => {
      toast.success(response.data.message);
      router.push('/auth/login')
    }).catch((error: any) => {
      toast.error(error.message);
    })
  }

  const processResend = (e: any) => {
    e.preventDefault();
    if (!showRecaptcha) return setShowRecaptcha(true);
    const {email, captcha} = form.getValues();

    if (!captcha) return;

    AuthApi.resendEmail({email, captcha}).then((response: any) => {
      toast.success(response.data.message);
      setIsTimerEnded(false)
    }).catch((error: any) => {
      toast.error(error.message);
    })
  }


  return (
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
        <CountdownTimer isTimerEnded={isTimerEnded} setIsTimerEnded={setIsTimerEnded}/>
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
        {showRecaptcha && <FormField
          control={form.control}
          name="captcha"
          render={({field}) => (
            <FormItem>
              <FormLabel>
                Human Verification
              </FormLabel>
              <FormControl>
                <ReCAPTCHA
                  sitekey={appConfig.recaptcha.siteKey || ""}
                  onChange={value => {
                    field.onChange(value);
                  }}
                />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        }
        <div className={'flex flex-row gap-2 mt-4'}>
          <Button
            type="button"
            className={'flex-1'}
            variant={'outline'}
            onClick={processResend}
            disabled={!isTimerEnded}
          >
            Resend
          </Button>
          <Button
            type={'submit'}
            className={'flex-1'}
            disabled={isTimerEnded}
          >
            Verify
          </Button>
        </div>
      </form>
    </Form>
  )
}

