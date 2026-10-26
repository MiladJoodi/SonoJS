import type { ComponentType, ReactNode } from "react"
import { notFound } from "next/navigation"

import { DirectionProvider } from "@/components/direction"
import { ModeSwitcher } from "@/components/site-header"
import { cn } from "@/lib/utils"
import type { Direction } from "@/lib/direction"
import LoginForm from "@/registry/blocks/authentication/login/login-01/login-form"
import SocialLoginForm from "@/registry/blocks/authentication/login/login-02/login-form"
import PasswordlessLoginForm from "@/registry/blocks/authentication/login/login-03/login-form"
import PhotoLoginForm from "@/registry/blocks/authentication/login/login-04/login-form"
import QuoteLoginForm from "@/registry/blocks/authentication/login/login-05/login-form"
import DarkLoginForm from "@/registry/blocks/authentication/login/login-06/login-form"
import GlassLoginForm from "@/registry/blocks/authentication/login/login-07/login-form"
import IllustrationLoginForm from "@/registry/blocks/authentication/login/login-08/login-form"
import SaasLoginForm from "@/registry/blocks/authentication/login/login-09/login-form"
import MinimalSignupForm from "@/registry/blocks/authentication/signup/signup-01/signup-form"
import SocialSignupForm from "@/registry/blocks/authentication/signup/signup-02/signup-form"
import SignupForm from "@/registry/blocks/authentication/signup/signup-03/signup-form"
import BrandedSignupForm from "@/registry/blocks/authentication/signup/signup-04/signup-form"
import TestimonialSignupForm from "@/registry/blocks/authentication/signup/signup-05/signup-form"
import DarkSignupForm from "@/registry/blocks/authentication/signup/signup-06/signup-form"
import MultiStepSignupForm from "@/registry/blocks/authentication/signup/signup-07/signup-form"
import SaasSignupForm from "@/registry/blocks/authentication/signup/signup-08/signup-form"
import MinimalForgotPasswordForm from "@/registry/blocks/authentication/forgot-password/forgot-password-01/forgot-password-form"
import SplitForgotPasswordForm from "@/registry/blocks/authentication/forgot-password/forgot-password-02/forgot-password-form"
import OtpForgotPasswordForm from "@/registry/blocks/authentication/forgot-password/forgot-password-03/forgot-password-form"
import MultiStepForgotPasswordForm from "@/registry/blocks/authentication/forgot-password/forgot-password-04/forgot-password-form"
import MinimalResetPasswordForm from "@/registry/blocks/authentication/reset-password/reset-password-01/reset-password-form"
import StrengthResetPasswordForm from "@/registry/blocks/authentication/reset-password/reset-password-02/reset-password-form"
import SplitResetPasswordForm from "@/registry/blocks/authentication/reset-password/reset-password-03/reset-password-form"
import SuccessResetPasswordForm from "@/registry/blocks/authentication/reset-password/reset-password-04/reset-password-form"
import OtpSixDigitForm from "@/registry/blocks/authentication/otp-verification/otp-verification-01/otp-verification-form"
import OtpAutoFocusForm from "@/registry/blocks/authentication/otp-verification/otp-verification-02/otp-verification-form"
import OtpEmailForm from "@/registry/blocks/authentication/otp-verification/otp-verification-03/otp-verification-form"
import OtpPhoneForm from "@/registry/blocks/authentication/otp-verification/otp-verification-04/otp-verification-form"
import AuthenticatorTwoFactorForm from "@/registry/blocks/authentication/two-factor/two-factor-01/two-factor-form"
import SmsTwoFactorForm from "@/registry/blocks/authentication/two-factor/two-factor-02/two-factor-form"
import BackupTwoFactorForm from "@/registry/blocks/authentication/two-factor/two-factor-03/two-factor-form"
import ChooseTwoFactorForm from "@/registry/blocks/authentication/two-factor/two-factor-04/two-factor-form"
import SocialOnlyForm from "@/registry/blocks/authentication/social-login/social-login-01/social-login-form"
import SocialEmailForm from "@/registry/blocks/authentication/social-login/social-login-02/social-login-form"
import SocialIconsForm from "@/registry/blocks/authentication/social-login/social-login-03/social-login-form"
import SocialSplitForm from "@/registry/blocks/authentication/social-login/social-login-04/social-login-form"
import PasskeyFirstForm from "@/registry/blocks/authentication/passkey/passkey-01/passkey-form"
import PasskeyPasswordForm from "@/registry/blocks/authentication/passkey/passkey-02/passkey-form"
import PasskeySetupForm from "@/registry/blocks/authentication/passkey/passkey-03/passkey-form"
import EmailRecoveryForm from "@/registry/blocks/authentication/account-recovery/account-recovery-01/account-recovery-form"
import PhoneRecoveryForm from "@/registry/blocks/authentication/account-recovery/account-recovery-02/account-recovery-form"
import IdentityRecoveryForm from "@/registry/blocks/authentication/account-recovery/account-recovery-03/account-recovery-form"
import CodesRecoveryForm from "@/registry/blocks/authentication/account-recovery/account-recovery-04/account-recovery-form"
import MinimalNavbar from "@/registry/blocks/navigation/navbar/navbar-01/navbar"
import SaasNavbar from "@/registry/blocks/navigation/navbar/navbar-02/navbar"
import CenteredNavbar from "@/registry/blocks/navigation/navbar/navbar-03/navbar"
import TransparentNavbar from "@/registry/blocks/navigation/navbar/navbar-04/navbar"
import MegaMenuNavbar from "@/registry/blocks/navigation/navbar/navbar-05/navbar"
import EcommerceNavbar from "@/registry/blocks/navigation/navbar/navbar-06/navbar"
import StickyNavbar from "@/registry/blocks/navigation/navbar/navbar-07/navbar"
import MobileFirstNavbar from "@/registry/blocks/navigation/navbar/navbar-08/navbar"

function CenteredCard({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-background px-10 py-10">
      <div className="w-full max-w-md">{children}</div>
    </div>
  )
}

function Login01View() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-background px-10 py-10">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  )
}

function Login02View() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-background px-10 py-10">
      <div className="w-full max-w-md">
        <SocialLoginForm />
      </div>
    </div>
  )
}

function Login03View() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-background px-10 py-10">
      <div className="w-full max-w-md">
        <PasswordlessLoginForm />
      </div>
    </div>
  )
}

const views: Record<string, ComponentType> = {
  "login-01": Login01View,
  "login-02": Login02View,
  "login-03": Login03View,
  "login-04": PhotoLoginForm,
  "login-05": QuoteLoginForm,
  "login-06": function Login06View() {
    return <DarkLoginForm className="min-h-svh" />
  },
  "login-07": function Login07View() {
    return <GlassLoginForm className="min-h-svh" />
  },
  "login-08": IllustrationLoginForm,
  "login-09": SaasLoginForm,
  "signup-01": MinimalSignupForm,
  "signup-02": SocialSignupForm,
  "signup-03": SignupForm,
  "signup-04": BrandedSignupForm,
  "signup-05": TestimonialSignupForm,
  "signup-06": function Signup06View() {
    return <DarkSignupForm className="min-h-svh" />
  },
  "signup-07": MultiStepSignupForm,
  "signup-08": SaasSignupForm,
  "forgot-password-01": function ForgotPassword01View() {
    return (
      <CenteredCard>
        <MinimalForgotPasswordForm />
      </CenteredCard>
    )
  },
  "forgot-password-02": SplitForgotPasswordForm,
  "forgot-password-03": function ForgotPassword03View() {
    return (
      <CenteredCard>
        <OtpForgotPasswordForm />
      </CenteredCard>
    )
  },
  "forgot-password-04": MultiStepForgotPasswordForm,
  "reset-password-01": function ResetPassword01View() {
    return (
      <CenteredCard>
        <MinimalResetPasswordForm />
      </CenteredCard>
    )
  },
  "reset-password-02": function ResetPassword02View() {
    return (
      <CenteredCard>
        <StrengthResetPasswordForm />
      </CenteredCard>
    )
  },
  "reset-password-03": SplitResetPasswordForm,
  "reset-password-04": function ResetPassword04View() {
    return (
      <CenteredCard>
        <SuccessResetPasswordForm />
      </CenteredCard>
    )
  },
  "otp-verification-01": function OtpVerification01View() {
    return (
      <CenteredCard>
        <OtpSixDigitForm />
      </CenteredCard>
    )
  },
  "otp-verification-02": function OtpVerification02View() {
    return (
      <CenteredCard>
        <OtpAutoFocusForm />
      </CenteredCard>
    )
  },
  "otp-verification-03": function OtpVerification03View() {
    return (
      <CenteredCard>
        <OtpEmailForm />
      </CenteredCard>
    )
  },
  "otp-verification-04": function OtpVerification04View() {
    return (
      <CenteredCard>
        <OtpPhoneForm />
      </CenteredCard>
    )
  },
  "two-factor-01": function TwoFactor01View() {
    return (
      <CenteredCard>
        <AuthenticatorTwoFactorForm />
      </CenteredCard>
    )
  },
  "two-factor-02": function TwoFactor02View() {
    return (
      <CenteredCard>
        <SmsTwoFactorForm />
      </CenteredCard>
    )
  },
  "two-factor-03": function TwoFactor03View() {
    return (
      <CenteredCard>
        <BackupTwoFactorForm />
      </CenteredCard>
    )
  },
  "two-factor-04": function TwoFactor04View() {
    return (
      <CenteredCard>
        <ChooseTwoFactorForm />
      </CenteredCard>
    )
  },
  "social-login-01": function SocialLogin01View() {
    return (
      <CenteredCard>
        <SocialOnlyForm />
      </CenteredCard>
    )
  },
  "social-login-02": function SocialLogin02View() {
    return (
      <CenteredCard>
        <SocialEmailForm />
      </CenteredCard>
    )
  },
  "social-login-03": function SocialLogin03View() {
    return (
      <CenteredCard>
        <SocialIconsForm />
      </CenteredCard>
    )
  },
  "social-login-04": SocialSplitForm,
  "passkey-01": function Passkey01View() {
    return (
      <CenteredCard>
        <PasskeyFirstForm />
      </CenteredCard>
    )
  },
  "passkey-02": function Passkey02View() {
    return (
      <CenteredCard>
        <PasskeyPasswordForm />
      </CenteredCard>
    )
  },
  "passkey-03": function Passkey03View() {
    return (
      <CenteredCard>
        <PasskeySetupForm />
      </CenteredCard>
    )
  },
  "account-recovery-01": function AccountRecovery01View() {
    return (
      <CenteredCard>
        <EmailRecoveryForm />
      </CenteredCard>
    )
  },
  "account-recovery-02": function AccountRecovery02View() {
    return (
      <CenteredCard>
        <PhoneRecoveryForm />
      </CenteredCard>
    )
  },
  "account-recovery-03": function AccountRecovery03View() {
    return (
      <CenteredCard>
        <IdentityRecoveryForm />
      </CenteredCard>
    )
  },
  "account-recovery-04": function AccountRecovery04View() {
    return (
      <CenteredCard>
        <CodesRecoveryForm />
      </CenteredCard>
    )
  },
  "navbar-01": MinimalNavbar,
  "navbar-02": SaasNavbar,
  "navbar-03": CenteredNavbar,
  "navbar-04": TransparentNavbar,
  "navbar-05": MegaMenuNavbar,
  "navbar-06": EcommerceNavbar,
  "navbar-07": function Navbar07View() {
    return <StickyNavbar className="max-h-svh" />
  },
  "navbar-08": MobileFirstNavbar,
}

export default async function BlockViewPage({
  params,
  searchParams,
}: {
  params: Promise<{ name: string }>
  searchParams: Promise<{ embed?: string; dir?: string }>
}) {
  const { name } = await params
  const { embed, dir: dirParam } = await searchParams
  const View = views[name]
  if (!View) notFound()
  const isEmbed = embed === "1" || embed === "true"
  const dir: Direction | undefined =
    dirParam === "rtl" ? "rtl" : dirParam === "ltr" ? "ltr" : undefined
  const fullBleed =
    name === "login-06" ||
    name === "login-07" ||
    name === "signup-06"
  const topAligned = name.startsWith("navbar-")

  const shellClass = fullBleed
    ? "relative min-h-svh w-full bg-background"
    : topAligned
      ? cn(
          "relative w-full bg-card",
          isEmbed ? "flex h-svh flex-col" : "min-h-svh"
        )
      : "relative flex min-h-svh w-full flex-col justify-center bg-background"

  const innerClass = fullBleed
    ? "min-h-svh w-full"
    : topAligned
      ? isEmbed
        ? "flex min-h-0 w-full flex-1 flex-col"
        : "min-h-svh w-full"
      : "w-full"

  const body = (
    <>
      {isEmbed ? null : (
        <div className="absolute end-4 top-4 z-50">
          <ModeSwitcher />
        </div>
      )}
      <div className={innerClass}>
        <View />
      </div>
    </>
  )

  // Embed/preview `dir` must reach DirectionContext so portaled Sheet /
  // NavigationMenu / Dropdown resolve start/end correctly in RTL.
  if (dir) {
    return (
      <DirectionProvider dir={dir} className={shellClass}>
        {body}
      </DirectionProvider>
    )
  }

  return <div className={shellClass}>{body}</div>
}
