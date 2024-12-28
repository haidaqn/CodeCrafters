import UserAuthForm from "@/sections/auth/components/UserAuthForm.tsx";

//-----------------------------------------------------------------------------------------------

export default function LoginSection() {
  return <>
    <div className="flex flex-col space-y-2 text-center">
      <h1 className="text-2xl font-semibold tracking-tight">Login to CodeCraft</h1>
      <p className="text-sm text-muted-foreground">Login to manage connected extension and explore a lot of social
        network utilities...</p>
    </div>
    <UserAuthForm/>
    <p className="px-8 text-center text-sm text-muted-foreground">
      By clicking continue, you agree to our{' '}
      <a
        href="/legal/terms"
        target="_blank"
        className="hover:text-primary"
      >
        Terms of Service
      </a>{' '}
      and{' '}
      <a
        href="/legal/privacy"
        target="_blank"
        className="hover:text-primary"
      >
        Privacy Policy
      </a>
      .
    </p>
  </>
}