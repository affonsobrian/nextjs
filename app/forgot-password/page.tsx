import { ForgotPasswordForm } from "../../components/forgot-password-form"

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-md">
        <ForgotPasswordForm />
      </div>
    </div>
  )
}
