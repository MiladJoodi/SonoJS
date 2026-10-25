import type { ComponentType } from "react"
import { notFound } from "next/navigation"

import LoginForm from "@/registry/blocks/authentication/login-01/components/login-form"
import SocialLoginForm from "@/registry/blocks/authentication/login-02/components/login-form"
import SignupForm from "@/registry/blocks/authentication/signup-03/components/signup-form"
import BrandedSignupForm from "@/registry/blocks/authentication/signup-04/components/signup-form"
import TestimonialSignupForm from "@/registry/blocks/authentication/signup-05/components/signup-form"
import PasswordlessLoginForm from "@/registry/blocks/authentication/login-03/components/login-form"

function Login01View() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-background px-6 py-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}

function Login02View() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-background px-6 py-10">
      <div className="w-full max-w-sm">
        <SocialLoginForm />
      </div>
    </div>
  )
}

function Login03View() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-background px-6 py-10">
      <div className="w-full max-w-sm">
        <PasswordlessLoginForm />
      </div>
    </div>
  )
}

const views: Record<string, ComponentType> = {
  "login-01": Login01View,
  "login-02": Login02View,
  "login-03": Login03View,
  "signup-03": SignupForm,
  "signup-04": BrandedSignupForm,
  "signup-05": TestimonialSignupForm,
}

export default async function BlockViewPage({
  params,
}: {
  params: Promise<{ name: string }>
}) {
  const { name } = await params
  const View = views[name]
  if (!View) notFound()
  return (
    <div className="flex min-h-svh w-full flex-col justify-center bg-background">
      <div className="w-full">
        <View />
      </div>
    </div>
  )
}
