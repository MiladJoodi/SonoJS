import type { ComponentType, ReactNode } from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { DirectionProvider } from "@/components/direction"
import { ModeSwitcher } from "@/components/site-header"
import type { Direction } from "@/lib/direction"
import { noindexMetadata } from "@/lib/seo"
import { cn } from "@/lib/utils"
import LoginForm from "@/registry/blocks/authentication/login/login-01/login-form"
import SocialLoginForm from "@/registry/blocks/authentication/login/login-02/login-form"
import PasswordlessLoginForm from "@/registry/blocks/authentication/login/login-03/login-form"
import PhotoLoginForm from "@/registry/blocks/authentication/login/login-04/login-form"
import QuoteLoginForm from "@/registry/blocks/authentication/login/login-05/login-form"
import DarkLoginForm from "@/registry/blocks/authentication/login/login-06/login-form"
import GlassLoginForm from "@/registry/blocks/authentication/login/login-07/login-form"
import IllustrationLoginForm from "@/registry/blocks/authentication/login/login-08/login-form"
import SaasLoginForm from "@/registry/blocks/authentication/login/login-09/login-form"
import BrandMarkLoginForm from "@/registry/blocks/authentication/login/login-10/login-form"
import SplitIllustrationLoginForm from "@/registry/blocks/authentication/login/login-11/login-form"
import WelcomeBackLoginForm from "@/registry/blocks/authentication/login/login-12/login-form"
import SplitPhotoLoginForm from "@/registry/blocks/authentication/login/login-13/login-form"
import WelcomePhotoLoginForm from "@/registry/blocks/authentication/login/login-14/login-form"
import IllustratedBrandLoginForm from "@/registry/blocks/authentication/login/login-15/login-form"
import GradientAccessLoginForm from "@/registry/blocks/authentication/login/login-16/login-form"
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
import OtpTrustDeviceForm from "@/registry/blocks/authentication/otp-verification/otp-verification-05/otp-verification-form"
import OtpOnboardingForm from "@/registry/blocks/authentication/otp-verification/otp-verification-06/otp-verification-form"
import AuthenticatorTwoFactorForm from "@/registry/blocks/authentication/two-factor/two-factor-01/two-factor-form"
import SmsTwoFactorForm from "@/registry/blocks/authentication/two-factor/two-factor-02/two-factor-form"
import BackupTwoFactorForm from "@/registry/blocks/authentication/two-factor/two-factor-03/two-factor-form"
import ChooseTwoFactorForm from "@/registry/blocks/authentication/two-factor/two-factor-04/two-factor-form"
import PasskeyTwoFactorForm from "@/registry/blocks/authentication/two-factor/two-factor-05/two-factor-form"
import NewDeviceTwoFactorForm from "@/registry/blocks/authentication/two-factor/two-factor-06/two-factor-form"
import SocialOnlyForm from "@/registry/blocks/authentication/social-login/social-login-01/social-login-form"
import SocialEmailForm from "@/registry/blocks/authentication/social-login/social-login-02/social-login-form"
import SocialIconsForm from "@/registry/blocks/authentication/social-login/social-login-03/social-login-form"
import SocialSplitForm from "@/registry/blocks/authentication/social-login/social-login-04/social-login-form"
import SocialLastUsedForm from "@/registry/blocks/authentication/social-login/social-login-05/social-login-form"
import SocialBrandSplitForm from "@/registry/blocks/authentication/social-login/social-login-06/social-login-form"
import PasskeyFirstForm from "@/registry/blocks/authentication/passkey/passkey-01/passkey-form"
import PasskeyPasswordForm from "@/registry/blocks/authentication/passkey/passkey-02/passkey-form"
import PasskeySetupForm from "@/registry/blocks/authentication/passkey/passkey-03/passkey-form"
import PasskeyManageForm from "@/registry/blocks/authentication/passkey/passkey-04/passkey-form"
import PasskeyCrossDeviceForm from "@/registry/blocks/authentication/passkey/passkey-05/passkey-form"
import PasskeyBrandSplitForm from "@/registry/blocks/authentication/passkey/passkey-06/passkey-form"
import EmailRecoveryForm from "@/registry/blocks/authentication/account-recovery/account-recovery-01/account-recovery-form"
import PhoneRecoveryForm from "@/registry/blocks/authentication/account-recovery/account-recovery-02/account-recovery-form"
import CheckInboxRecoveryForm from "@/registry/blocks/authentication/account-recovery/account-recovery-03/account-recovery-form"
import CodesRecoveryForm from "@/registry/blocks/authentication/account-recovery/account-recovery-04/account-recovery-form"
import MethodRecoveryForm from "@/registry/blocks/authentication/account-recovery/account-recovery-05/account-recovery-form"
import BrandSplitRecoveryForm from "@/registry/blocks/authentication/account-recovery/account-recovery-06/account-recovery-form"
import MinimalNavbar from "@/registry/blocks/navigation/navbar/navbar-01/navbar"
import SaasNavbar from "@/registry/blocks/navigation/navbar/navbar-02/navbar"
import CenteredNavbar from "@/registry/blocks/navigation/navbar/navbar-03/navbar"
import TransparentNavbar from "@/registry/blocks/navigation/navbar/navbar-04/navbar"
import MegaMenuNavbar from "@/registry/blocks/navigation/navbar/navbar-05/navbar"
import EcommerceNavbar from "@/registry/blocks/navigation/navbar/navbar-06/navbar"
import StickyNavbar from "@/registry/blocks/navigation/navbar/navbar-07/navbar"
import ResourcesMegaNavbar from "@/registry/blocks/navigation/navbar/navbar-08/navbar"
import MediumResourcesNavbar from "@/registry/blocks/navigation/navbar/navbar-09/navbar"
import CompactResourcesNavbar from "@/registry/blocks/navigation/navbar/navbar-10/navbar"
import NestedDropdownNavbar from "@/registry/blocks/navigation/navbar/navbar-11/navbar"
import MenuOffcanvasNavbar from "@/registry/blocks/navigation/navbar/navbar-12/navbar"
import Banner01 from "@/registry/blocks/marketing/banner/banner-01/banner"
import Banner02 from "@/registry/blocks/marketing/banner/banner-02/banner"
import Banner03 from "@/registry/blocks/marketing/banner/banner-03/banner"
import Banner04 from "@/registry/blocks/marketing/banner/banner-04/banner"
import Banner05 from "@/registry/blocks/marketing/banner/banner-05/banner"
import Banner06 from "@/registry/blocks/marketing/banner/banner-06/banner"
import Banner07 from "@/registry/blocks/marketing/banner/banner-07/banner"
import Banner08 from "@/registry/blocks/marketing/banner/banner-08/banner"
import Banner09 from "@/registry/blocks/marketing/banner/banner-09/banner"
import Banner10 from "@/registry/blocks/marketing/banner/banner-10/banner"
import Banner11 from "@/registry/blocks/marketing/banner/banner-11/banner"
import Banner12 from "@/registry/blocks/marketing/banner/banner-12/banner"
import Banner13 from "@/registry/blocks/marketing/banner/banner-13/banner"
import Banner14 from "@/registry/blocks/marketing/banner/banner-14/banner"
import Banner15 from "@/registry/blocks/marketing/banner/banner-15/banner"
import CookieConsent01 from "@/registry/blocks/marketing/cookie-consent/cookie-consent-01/cookie-consent"
import CookieConsent02 from "@/registry/blocks/marketing/cookie-consent/cookie-consent-02/cookie-consent"
import CookieConsent03 from "@/registry/blocks/marketing/cookie-consent/cookie-consent-03/cookie-consent"
import CookieConsent04 from "@/registry/blocks/marketing/cookie-consent/cookie-consent-04/cookie-consent"
import Jumbotron01 from "@/registry/blocks/marketing/jumbotron/jumbotron-01/jumbotron"
import Jumbotron02 from "@/registry/blocks/marketing/jumbotron/jumbotron-02/jumbotron"
import Jumbotron03 from "@/registry/blocks/marketing/jumbotron/jumbotron-03/jumbotron"
import Jumbotron04 from "@/registry/blocks/marketing/jumbotron/jumbotron-04/jumbotron"
import Jumbotron05 from "@/registry/blocks/marketing/jumbotron/jumbotron-05/jumbotron"
import Jumbotron06 from "@/registry/blocks/marketing/jumbotron/jumbotron-06/jumbotron"
import Jumbotron07 from "@/registry/blocks/marketing/jumbotron/jumbotron-07/jumbotron"
import Jumbotron08 from "@/registry/blocks/marketing/jumbotron/jumbotron-08/jumbotron"
import Features01 from "@/registry/blocks/marketing/features/features-01/features"
import Features02 from "@/registry/blocks/marketing/features/features-02/features"
import Features03 from "@/registry/blocks/marketing/features/features-03/features"
import Features04 from "@/registry/blocks/marketing/features/features-04/features"
import Features05 from "@/registry/blocks/marketing/features/features-05/features"
import Features06 from "@/registry/blocks/marketing/features/features-06/features"
import Features07 from "@/registry/blocks/marketing/features/features-07/features"
import Features08 from "@/registry/blocks/marketing/features/features-08/features"
import Features09 from "@/registry/blocks/marketing/features/features-09/features"
import Features10 from "@/registry/blocks/marketing/features/features-10/features"
import Features11 from "@/registry/blocks/marketing/features/features-11/features"
import ArticleLayout01 from "@/registry/blocks/content-publishing/article-layout/article-layout-01/article-layout"
import AuthorProfile01 from "@/registry/blocks/content-publishing/author-profile/author-profile-01/author-profile"
import BlogGrid01 from "@/registry/blocks/content-publishing/blog-grid/blog-grid-01/blog-grid"
import Changelog01 from "@/registry/blocks/content-publishing/changelog/changelog-01/changelog"
import ReadingProgress01 from "@/registry/blocks/content-publishing/reading-progress/reading-progress-01/reading-progress"
import BentoGrid01 from "@/registry/blocks/marketing/bento-grid/bento-grid-01/bento-grid"
import BentoGrid02 from "@/registry/blocks/marketing/bento-grid/bento-grid-02/bento-grid"
import HowItWorks01 from "@/registry/blocks/marketing/how-it-works/how-it-works-01/how-it-works"
import HowItWorks02 from "@/registry/blocks/marketing/how-it-works/how-it-works-02/how-it-works"
import HowItWorks03 from "@/registry/blocks/marketing/how-it-works/how-it-works-03/how-it-works"
import HowItWorks04 from "@/registry/blocks/marketing/how-it-works/how-it-works-04/how-it-works"
import Cta01 from "@/registry/blocks/marketing/cta/cta-01/cta"
import Cta02 from "@/registry/blocks/marketing/cta/cta-02/cta"
import Cta03 from "@/registry/blocks/marketing/cta/cta-03/cta"
import Cta04 from "@/registry/blocks/marketing/cta/cta-04/cta"
import Cta05 from "@/registry/blocks/marketing/cta/cta-05/cta"
import Cta06 from "@/registry/blocks/marketing/cta/cta-06/cta"
import Cta07 from "@/registry/blocks/marketing/cta/cta-07/cta"
import Cta08 from "@/registry/blocks/marketing/cta/cta-08/cta"
import Cta09 from "@/registry/blocks/marketing/cta/cta-09/cta"
import Stats01 from "@/registry/blocks/marketing/stats/stats-01/stats"
import Stats02 from "@/registry/blocks/marketing/stats/stats-02/stats"
import Stats03 from "@/registry/blocks/marketing/stats/stats-03/stats"
import Stats04 from "@/registry/blocks/marketing/stats/stats-04/stats"
import Stats05 from "@/registry/blocks/marketing/stats/stats-05/stats"
import Stats06 from "@/registry/blocks/marketing/stats/stats-06/stats"
import Stats07 from "@/registry/blocks/marketing/stats/stats-07/stats"
import Stats08 from "@/registry/blocks/marketing/stats/stats-08/stats"
import Stats09 from "@/registry/blocks/marketing/stats/stats-09/stats"
import Stats10 from "@/registry/blocks/marketing/stats/stats-10/stats"
import Stats11 from "@/registry/blocks/marketing/stats/stats-11/stats"
import Stats12 from "@/registry/blocks/marketing/stats/stats-12/stats"
import Stats13 from "@/registry/blocks/marketing/stats/stats-13/stats"
import Stats14 from "@/registry/blocks/marketing/stats/stats-14/stats"
import Stats15 from "@/registry/blocks/marketing/stats/stats-15/stats"
import Stats16 from "@/registry/blocks/marketing/stats/stats-16/stats"
import Faq01 from "@/registry/blocks/marketing/faq/faq-01/faq"
import Faq02 from "@/registry/blocks/marketing/faq/faq-02/faq"
import Faq03 from "@/registry/blocks/marketing/faq/faq-03/faq"
import Faq04 from "@/registry/blocks/marketing/faq/faq-04/faq"
import Faq05 from "@/registry/blocks/marketing/faq/faq-05/faq"
import Faq06 from "@/registry/blocks/marketing/faq/faq-06/faq"
import Faq07 from "@/registry/blocks/marketing/faq/faq-07/faq"
import Faq08 from "@/registry/blocks/marketing/faq/faq-08/faq"
import Faq09 from "@/registry/blocks/marketing/faq/faq-09/faq"
import Faq10 from "@/registry/blocks/marketing/faq/faq-10/faq"
import Faq11 from "@/registry/blocks/marketing/faq/faq-11/faq"
import Faq12 from "@/registry/blocks/marketing/faq/faq-12/faq"
import Faq13 from "@/registry/blocks/marketing/faq/faq-13/faq"
import Faq14 from "@/registry/blocks/marketing/faq/faq-14/faq"
import Faq15 from "@/registry/blocks/marketing/faq/faq-15/faq"
import Faq16 from "@/registry/blocks/marketing/faq/faq-16/faq"
import Faq17 from "@/registry/blocks/marketing/faq/faq-17/faq"
import Faq18 from "@/registry/blocks/marketing/faq/faq-18/faq"
import Faq19 from "@/registry/blocks/marketing/faq/faq-19/faq"
import Faq20 from "@/registry/blocks/marketing/faq/faq-20/faq"
import DataTable01 from "@/registry/blocks/data-tables/data-table/data-table-01/table"
import DataTable02 from "@/registry/blocks/data-tables/data-table/data-table-02/table"
import DataTable03 from "@/registry/blocks/data-tables/data-table/data-table-03/table"
import AdvancedDataGrid01 from "@/registry/blocks/data-tables/advanced-data-grid/advanced-data-grid-01/table"
import AdvancedDataGrid02 from "@/registry/blocks/data-tables/advanced-data-grid/advanced-data-grid-02/table"
import AdvancedDataGrid03 from "@/registry/blocks/data-tables/advanced-data-grid/advanced-data-grid-03/table"
import AdvancedDataGrid04 from "@/registry/blocks/data-tables/advanced-data-grid/advanced-data-grid-04/table"
import RowActions01 from "@/registry/blocks/data-tables/row-actions/row-actions-01/table"
import RowActions02 from "@/registry/blocks/data-tables/row-actions/row-actions-02/table"
import RowActions03 from "@/registry/blocks/data-tables/row-actions/row-actions-03/table"
import ApiKeys01 from "@/registry/blocks/developer-tools/api-key-management/api-keys-01/api-keys"
import ApiKeys02 from "@/registry/blocks/developer-tools/api-key-management/api-keys-02/api-keys"
import WebhookManagement01 from "@/registry/blocks/developer-tools/webhook-management/webhook-management-01/webhook-management"
import Integrations01 from "@/registry/blocks/developer-tools/integrations/integrations-01/integrations"
import LogsViewer01 from "@/registry/blocks/developer-tools/logs-viewer/logs-viewer-01/logs-viewer"
import AccountSettings01 from "@/registry/blocks/user-account/account-settings/account-settings-01/account-settings"
import AccountSettings02 from "@/registry/blocks/user-account/account-settings/account-settings-02/account-settings"
import AccountSettings03 from "@/registry/blocks/user-account/account-settings/account-settings-03/account-settings"
import AccountSettings04 from "@/registry/blocks/user-account/account-settings/account-settings-04/account-settings"
import AccountSettings05 from "@/registry/blocks/user-account/account-settings/account-settings-05/account-settings"
import UserProfile01 from "@/registry/blocks/user-account/user-profile/user-profile-01/user-profile"
import UserProfile02 from "@/registry/blocks/user-account/user-profile/user-profile-02/user-profile"
import UserProfile03 from "@/registry/blocks/user-account/user-profile/user-profile-03/user-profile"
import UserProfile04 from "@/registry/blocks/user-account/user-profile/user-profile-04/user-profile"
import UserProfile05 from "@/registry/blocks/user-account/user-profile/user-profile-05/user-profile"
import UserProfile06 from "@/registry/blocks/user-account/user-profile/user-profile-06/user-profile"
import TeamMembers01 from "@/registry/blocks/user-account/team-members/team-members-01/team-members"
import TeamMembers02 from "@/registry/blocks/user-account/team-members/team-members-02/team-members"
import TeamMembers03 from "@/registry/blocks/user-account/team-members/team-members-03/team-members"
import TeamMembers04 from "@/registry/blocks/user-account/team-members/team-members-04/team-members"
import TeamMembers05 from "@/registry/blocks/user-account/team-members/team-members-05/team-members"
import TeamMembers06 from "@/registry/blocks/user-account/team-members/team-members-06/team-members"
import RolesAndPermissions01 from "@/registry/blocks/user-account/roles-and-permissions/roles-and-permissions-01/roles-and-permissions"
import RolesAndPermissions02 from "@/registry/blocks/user-account/roles-and-permissions/roles-and-permissions-02/roles-and-permissions"
import RolesAndPermissions03 from "@/registry/blocks/user-account/roles-and-permissions/roles-and-permissions-03/roles-and-permissions"
import BillingHistory01 from "@/registry/blocks/payments-billing/billing-history/billing-history-01/billing-history"
import BillingSettings01 from "@/registry/blocks/payments-billing/billing-settings/billing-settings-01/billing-settings"
import BillingSettings02 from "@/registry/blocks/payments-billing/billing-settings/billing-settings-02/billing-settings"
import UsageBasedBilling01 from "@/registry/blocks/payments-billing/usage-based-billing/usage-based-billing-01/usage-based-billing"
import UsageBasedBilling02 from "@/registry/blocks/payments-billing/usage-based-billing/usage-based-billing-02/usage-based-billing"
import UsageBasedBilling03 from "@/registry/blocks/payments-billing/usage-based-billing/usage-based-billing-03/usage-based-billing"
import UsageBasedBilling04 from "@/registry/blocks/payments-billing/usage-based-billing/usage-based-billing-04/usage-based-billing"
import UsageBasedBilling05 from "@/registry/blocks/payments-billing/usage-based-billing/usage-based-billing-05/usage-based-billing"
import UsageBasedBilling06 from "@/registry/blocks/payments-billing/usage-based-billing/usage-based-billing-06/usage-based-billing"
import UsageBasedBilling07 from "@/registry/blocks/payments-billing/usage-based-billing/usage-based-billing-07/usage-based-billing"
import PaymentMethods01 from "@/registry/blocks/payments-billing/payment-methods/payment-methods-01/payment-methods"
import TransferFunds01 from "@/registry/blocks/payments-billing/transfer-funds/transfer-funds-01/transfer-funds"
import Invoice01 from "@/registry/blocks/payments-billing/invoice/invoice-01/invoice"
import AccessDenied01 from "@/registry/blocks/feedback-states/access-denied/access-denied-01/access-denied"
import NotFound01 from "@/registry/blocks/feedback-states/not-found/not-found-01/not-found"
import ErrorState01 from "@/registry/blocks/feedback-states/error-state/error-state-01/error-state"
import RateLimit01 from "@/registry/blocks/feedback-states/rate-limit/rate-limit-01/rate-limit"
import Maintenance01 from "@/registry/blocks/feedback-states/maintenance/maintenance-01/maintenance"
import StatusPage01 from "@/registry/blocks/feedback-states/status-page/status-page-01/status-page"
import AiChat01 from "@/registry/blocks/ai-agents/ai-chat/ai-chat-01/ai-chat"
import AiChat02 from "@/registry/blocks/ai-agents/ai-chat/ai-chat-02/ai-chat"
import AiChat03 from "@/registry/blocks/ai-agents/ai-chat/ai-chat-03/ai-chat"
import AgentWorkspace01 from "@/registry/blocks/ai-agents/agent-workspace/agent-workspace-01/agent-workspace"
import { AgentRunTimeline } from "@/registry/blocks/ai-agents/agent-run-timeline/agent-run-timeline"
import ChatComposer01 from "@/registry/blocks/ai-agents/chat-composer/chat-composer-01/chat-composer"
import ChatComposer02 from "@/registry/blocks/ai-agents/chat-composer/chat-composer-02/chat-composer"
import ChatComposer03 from "@/registry/blocks/ai-agents/chat-composer/chat-composer-03/chat-composer"
import ChatComposer04 from "@/registry/blocks/ai-agents/chat-composer/chat-composer-04/chat-composer"
import EmptyState01 from "@/registry/blocks/feedback-states/empty-state/empty-state-01/empty-state"
import EmptyState02 from "@/registry/blocks/feedback-states/empty-state/empty-state-02/empty-state"
import EmptyState03 from "@/registry/blocks/feedback-states/empty-state/empty-state-03/empty-state"
import EmptyState04 from "@/registry/blocks/feedback-states/empty-state/empty-state-04/empty-state"
import EmptyState05 from "@/registry/blocks/feedback-states/empty-state/empty-state-05/empty-state"
import EmptyState06 from "@/registry/blocks/feedback-states/empty-state/empty-state-06/empty-state"
import EmptyState07 from "@/registry/blocks/feedback-states/empty-state/empty-state-07/empty-state"
import EmptyState08 from "@/registry/blocks/feedback-states/empty-state/empty-state-08/empty-state"
import EmptyState09 from "@/registry/blocks/feedback-states/empty-state/empty-state-09/empty-state"
import DataExport01 from "@/registry/blocks/files-media/data-export/data-export-01/data-export"
import DataExport02 from "@/registry/blocks/files-media/data-export/data-export-02/data-export"
import FileManager01 from "@/registry/blocks/files-media/file-manager/file-manager-01/file-manager"
import FileUpload01 from "@/registry/blocks/files-media/file-upload/file-upload-01/file-upload"
import MediaGallery01 from "@/registry/blocks/files-media/media-gallery/media-gallery-01/media-gallery"
import Comments01 from "@/registry/blocks/communication/comments/comments-01/comments"
import ActivityFeed01 from "@/registry/blocks/communication/activity-feed/activity-feed-01/activity-feed"
import ActivityFeed02 from "@/registry/blocks/communication/activity-feed/activity-feed-02/activity-feed"
import ActivityFeed03 from "@/registry/blocks/communication/activity-feed/activity-feed-03/activity-feed"
import ActivityFeed04 from "@/registry/blocks/communication/activity-feed/activity-feed-04/activity-feed"
import ActivityFeed05 from "@/registry/blocks/communication/activity-feed/activity-feed-05/activity-feed"
import NotificationCenter01 from "@/registry/blocks/communication/notification-center/notification-center-01/notification-center"
import AnalyticsDashboard01 from "@/registry/blocks/dashboards-analytics/analytics-dashboard/analytics-dashboard-01/analytics-dashboard"
import Calendar01 from "@/registry/blocks/calendar-scheduling/calendar/calendar-01/calendar"
import SetupWizard01 from "@/registry/blocks/onboarding/setup-wizard/setup-wizard-01/setup-wizard"
import SetupWizard02 from "@/registry/blocks/onboarding/setup-wizard/setup-wizard-02/setup-wizard"
import SetupWizard03 from "@/registry/blocks/onboarding/setup-wizard/setup-wizard-03/setup-wizard"
import WorkspaceSetup01 from "@/registry/blocks/onboarding/workspace-setup/workspace-setup-01/workspace-setup"
import WorkspaceSetup02 from "@/registry/blocks/onboarding/workspace-setup/workspace-setup-02/workspace-setup"
import WorkspaceSetup03 from "@/registry/blocks/onboarding/workspace-setup/workspace-setup-03/workspace-setup"
import WorkspaceSetup04 from "@/registry/blocks/onboarding/workspace-setup/workspace-setup-04/workspace-setup"
import ProgressChecklist01 from "@/registry/blocks/onboarding/progress-checklist/progress-checklist-01/progress-checklist"
import ProgressChecklist02 from "@/registry/blocks/onboarding/progress-checklist/progress-checklist-02/progress-checklist"
import ProgressChecklist03 from "@/registry/blocks/onboarding/progress-checklist/progress-checklist-03/progress-checklist"
import ProgressChecklist04 from "@/registry/blocks/onboarding/progress-checklist/progress-checklist-04/progress-checklist"
import ProgressChecklist05 from "@/registry/blocks/onboarding/progress-checklist/progress-checklist-05/progress-checklist"
import DataImport01 from "@/registry/blocks/onboarding/data-import/data-import-01/data-import"
import DataImport02 from "@/registry/blocks/onboarding/data-import/data-import-02/data-import"
import DataImport03 from "@/registry/blocks/onboarding/data-import/data-import-03/data-import"
import SearchResults01 from "@/registry/blocks/search-filtering/search-results/search-results-01/search-results"
import FilterPanel01 from "@/registry/blocks/search-filtering/filter-panel/filter-panel-01/filter-panel"
import PaymentForm01 from "@/registry/blocks/payments-billing/payment-form/payment-form-01/payment-form"
import PaymentForm02 from "@/registry/blocks/payments-billing/payment-form/payment-form-02/payment-form"
import PaymentForm03 from "@/registry/blocks/payments-billing/payment-form/payment-form-03/payment-form"
import PaymentForm04 from "@/registry/blocks/payments-billing/payment-form/payment-form-04/payment-form"
import ProductList01 from "@/registry/blocks/ecommerce/product-list/product-list-01/product-list"
import ProductList02 from "@/registry/blocks/ecommerce/product-list/product-list-02/product-list"
import ProductList03 from "@/registry/blocks/ecommerce/product-list/product-list-03/product-list"
import ProductList04 from "@/registry/blocks/ecommerce/product-list/product-list-04/product-list"
import ProductList05 from "@/registry/blocks/ecommerce/product-list/product-list-05/product-list"
import ProductList06 from "@/registry/blocks/ecommerce/product-list/product-list-06/product-list"
import ProductList07 from "@/registry/blocks/ecommerce/product-list/product-list-07/product-list"
import ProductList08 from "@/registry/blocks/ecommerce/product-list/product-list-08/product-list"
import ProductList09 from "@/registry/blocks/ecommerce/product-list/product-list-09/product-list"
import ProductList10 from "@/registry/blocks/ecommerce/product-list/product-list-10/product-list"
import ProductList11 from "@/registry/blocks/ecommerce/product-list/product-list-11/product-list"
import Checkout01 from "@/registry/blocks/ecommerce/checkout/checkout-01/checkout"
import Checkout02 from "@/registry/blocks/ecommerce/checkout/checkout-02/checkout"
import Checkout03 from "@/registry/blocks/ecommerce/checkout/checkout-03/checkout"
import Checkout04 from "@/registry/blocks/ecommerce/checkout/checkout-04/checkout"
import Checkout05 from "@/registry/blocks/ecommerce/checkout/checkout-05/checkout"
import Checkout06 from "@/registry/blocks/ecommerce/checkout/checkout-06/checkout"
import Checkout07 from "@/registry/blocks/ecommerce/checkout/checkout-07/checkout"
import Checkout08 from "@/registry/blocks/ecommerce/checkout/checkout-08/checkout"
import Checkout09 from "@/registry/blocks/ecommerce/checkout/checkout-09/checkout"
import OrderConfirmation01 from "@/registry/blocks/ecommerce/order-confirmation/order-confirmation-01/order-confirmation"
import OrderSummary01 from "@/registry/blocks/ecommerce/order-summary/order-summary-01/order-summary"
import OrderSummary02 from "@/registry/blocks/ecommerce/order-summary/order-summary-02/order-summary"
import OrderSummary03 from "@/registry/blocks/ecommerce/order-summary/order-summary-03/order-summary"
import OrderSummary04 from "@/registry/blocks/ecommerce/order-summary/order-summary-04/order-summary"
import OrderSummary05 from "@/registry/blocks/ecommerce/order-summary/order-summary-05/order-summary"
import OrderSummary06 from "@/registry/blocks/ecommerce/order-summary/order-summary-06/order-summary"
import ProductDetails01 from "@/registry/blocks/ecommerce/product-details/product-details-01/product-details"
import ProductDetails02 from "@/registry/blocks/ecommerce/product-details/product-details-02/product-details"
import ProductDetails03 from "@/registry/blocks/ecommerce/product-details/product-details-03/product-details"
import ProductDetails04 from "@/registry/blocks/ecommerce/product-details/product-details-04/product-details"
import ProductDetails05 from "@/registry/blocks/ecommerce/product-details/product-details-05/product-details"
import ProductDetails06 from "@/registry/blocks/ecommerce/product-details/product-details-06/product-details"
import ProductDetails07 from "@/registry/blocks/ecommerce/product-details/product-details-07/product-details"
import ProductDetails08 from "@/registry/blocks/ecommerce/product-details/product-details-08/product-details"
import ProductDetails09 from "@/registry/blocks/ecommerce/product-details/product-details-09/product-details"
import ShoppingCart01 from "@/registry/blocks/ecommerce/shopping-cart/shopping-cart-01/shopping-cart"
import ShoppingCart02 from "@/registry/blocks/ecommerce/shopping-cart/shopping-cart-02/shopping-cart"
import ShoppingCart03 from "@/registry/blocks/ecommerce/shopping-cart/shopping-cart-03/shopping-cart"
import ShoppingCart04 from "@/registry/blocks/ecommerce/shopping-cart/shopping-cart-04/shopping-cart"
import ShoppingCart05 from "@/registry/blocks/ecommerce/shopping-cart/shopping-cart-05/shopping-cart"
import ShoppingCart06 from "@/registry/blocks/ecommerce/shopping-cart/shopping-cart-06/shopping-cart"
import ShoppingCart07 from "@/registry/blocks/ecommerce/shopping-cart/shopping-cart-07/shopping-cart"
import ShoppingCart08 from "@/registry/blocks/ecommerce/shopping-cart/shopping-cart-08/shopping-cart"
import ShoppingCart09 from "@/registry/blocks/ecommerce/shopping-cart/shopping-cart-09/shopping-cart"
import ShoppingCart10 from "@/registry/blocks/ecommerce/shopping-cart/shopping-cart-10/shopping-cart"
import Wishlist01 from "@/registry/blocks/ecommerce/wishlist/wishlist-01/wishlist"
import OrderTracking01 from "@/registry/blocks/ecommerce/order-tracking/order-tracking-01/order-tracking"
import OrderTracking02 from "@/registry/blocks/ecommerce/order-tracking/order-tracking-02/order-tracking"
import OrderTracking03 from "@/registry/blocks/ecommerce/order-tracking/order-tracking-03/order-tracking"
import OrderTracking04 from "@/registry/blocks/ecommerce/order-tracking/order-tracking-04/order-tracking"
import OrderTracking05 from "@/registry/blocks/ecommerce/order-tracking/order-tracking-05/order-tracking"
import OrderTracking06 from "@/registry/blocks/ecommerce/order-tracking/order-tracking-06/order-tracking"
import OrderTracking07 from "@/registry/blocks/ecommerce/order-tracking/order-tracking-07/order-tracking"
import OrderHistory01 from "@/registry/blocks/ecommerce/order-history/order-history-01/order-history"
import OrderHistory02 from "@/registry/blocks/ecommerce/order-history/order-history-02/order-history"
import OrderHistory03 from "@/registry/blocks/ecommerce/order-history/order-history-03/order-history"
import OrderHistory04 from "@/registry/blocks/ecommerce/order-history/order-history-04/order-history"
import OrderHistory05 from "@/registry/blocks/ecommerce/order-history/order-history-05/order-history"
import OrderHistory06 from "@/registry/blocks/ecommerce/order-history/order-history-06/order-history"
import OrderHistory07 from "@/registry/blocks/ecommerce/order-history/order-history-07/order-history"
import OrderHistory08 from "@/registry/blocks/ecommerce/order-history/order-history-08/order-history"
import ProductFilter01 from "@/registry/blocks/ecommerce/product-filter/product-filter-01/product-filter"
import ProductFilter02 from "@/registry/blocks/ecommerce/product-filter/product-filter-02/product-filter"
import ProductFilter03 from "@/registry/blocks/ecommerce/product-filter/product-filter-03/product-filter"
import ProductFilter04 from "@/registry/blocks/ecommerce/product-filter/product-filter-04/product-filter"
import ProductReview01 from "@/registry/blocks/ecommerce/product-review/product-review-01/product-review"
import ProductReview02 from "@/registry/blocks/ecommerce/product-review/product-review-02/product-review"
import ProductReview03 from "@/registry/blocks/ecommerce/product-review/product-review-03/product-review"
import ProductReview04 from "@/registry/blocks/ecommerce/product-review/product-review-04/product-review"
import ProductReview05 from "@/registry/blocks/ecommerce/product-review/product-review-05/product-review"
import ProductCategories01 from "@/registry/blocks/ecommerce/product-categories/product-categories-01/product-categories"
import ProductCategories02 from "@/registry/blocks/ecommerce/product-categories/product-categories-02/product-categories"
import ProductCategories03 from "@/registry/blocks/ecommerce/product-categories/product-categories-03/product-categories"
import ProductCategories04 from "@/registry/blocks/ecommerce/product-categories/product-categories-04/product-categories"
import ProductCategories05 from "@/registry/blocks/ecommerce/product-categories/product-categories-05/product-categories"
import ProductCategories06 from "@/registry/blocks/ecommerce/product-categories/product-categories-06/product-categories"
import ProductCategories07 from "@/registry/blocks/ecommerce/product-categories/product-categories-07/product-categories"
import ProductCategories08 from "@/registry/blocks/ecommerce/product-categories/product-categories-08/product-categories"
import Gallery01 from "@/registry/blocks/files-media/image-gallery/gallery-01/gallery"
import Gallery02 from "@/registry/blocks/files-media/image-gallery/gallery-02/gallery"
import Gallery03 from "@/registry/blocks/files-media/image-gallery/gallery-03/gallery"
import Gallery04 from "@/registry/blocks/files-media/image-gallery/gallery-04/gallery"
import Gallery05 from "@/registry/blocks/files-media/image-gallery/gallery-05/gallery"
import Gallery06 from "@/registry/blocks/files-media/image-gallery/gallery-06/gallery"
import Gallery07 from "@/registry/blocks/files-media/image-gallery/gallery-07/gallery"
import Gallery08 from "@/registry/blocks/files-media/image-gallery/gallery-08/gallery"
import Gallery09 from "@/registry/blocks/files-media/image-gallery/gallery-09/gallery"
import Gallery10 from "@/registry/blocks/files-media/image-gallery/gallery-10/gallery"
import Hero01 from "@/registry/blocks/marketing/hero/hero-01/hero"
import Hero02 from "@/registry/blocks/marketing/hero/hero-02/hero"
import Hero03 from "@/registry/blocks/marketing/hero/hero-03/hero"
import Hero04 from "@/registry/blocks/marketing/hero/hero-04/hero"
import Hero05 from "@/registry/blocks/marketing/hero/hero-05/hero"
import Hero06 from "@/registry/blocks/marketing/hero/hero-06/hero"
import Hero07 from "@/registry/blocks/marketing/hero/hero-07/hero"
import Hero08 from "@/registry/blocks/marketing/hero/hero-08/hero"
import Hero09 from "@/registry/blocks/marketing/hero/hero-09/hero"
import Hero10 from "@/registry/blocks/marketing/hero/hero-10/hero"
import Hero11 from "@/registry/blocks/marketing/hero/hero-11/hero"
import Hero12 from "@/registry/blocks/marketing/hero/hero-12/hero"
import Newsletter01 from "@/registry/blocks/marketing/newsletter/newsletter-01/newsletter"
import Newsletter02 from "@/registry/blocks/marketing/newsletter/newsletter-02/newsletter"
import Newsletter03 from "@/registry/blocks/marketing/newsletter/newsletter-03/newsletter"
import Newsletter04 from "@/registry/blocks/marketing/newsletter/newsletter-04/newsletter"
import Newsletter05 from "@/registry/blocks/marketing/newsletter/newsletter-05/newsletter"
import Newsletter06 from "@/registry/blocks/marketing/newsletter/newsletter-06/newsletter"
import Newsletter07 from "@/registry/blocks/marketing/newsletter/newsletter-07/newsletter"
import Newsletter08 from "@/registry/blocks/marketing/newsletter/newsletter-08/newsletter"
import Newsletter09 from "@/registry/blocks/marketing/newsletter/newsletter-09/newsletter"
import Newsletter10 from "@/registry/blocks/marketing/newsletter/newsletter-10/newsletter"
import Portfolio01 from "@/registry/blocks/marketing/portfolio/portfolio-01/portfolio"
import Portfolio02 from "@/registry/blocks/marketing/portfolio/portfolio-02/portfolio"
import Portfolio03 from "@/registry/blocks/marketing/portfolio/portfolio-03/portfolio"
import Portfolio04 from "@/registry/blocks/marketing/portfolio/portfolio-04/portfolio"
import SocialLinks01 from "@/registry/blocks/marketing/social-links/social-links-01/social-links"
import SocialLinks02 from "@/registry/blocks/marketing/social-links/social-links-02/social-links"
import SocialLinks03 from "@/registry/blocks/marketing/social-links/social-links-03/social-links"
import SocialLinks04 from "@/registry/blocks/marketing/social-links/social-links-04/social-links"
import MediaPlayer01 from "@/registry/blocks/files-media/media-player/media-player-01/media-player"
import CryptoPortfolio01 from "@/registry/blocks/dashboards-analytics/crypto-portfolio/crypto-portfolio-01/crypto-portfolio"
import CryptoPortfolio02 from "@/registry/blocks/dashboards-analytics/crypto-portfolio/crypto-portfolio-02/crypto-portfolio"
import CryptoPortfolio03 from "@/registry/blocks/dashboards-analytics/crypto-portfolio/crypto-portfolio-03/crypto-portfolio"
import CryptoPortfolio04 from "@/registry/blocks/dashboards-analytics/crypto-portfolio/crypto-portfolio-04/crypto-portfolio"
import KpiCards01 from "@/registry/blocks/dashboards-analytics/kpi-cards/kpi-cards-01/kpi-cards"
import KpiCards02 from "@/registry/blocks/dashboards-analytics/kpi-cards/kpi-cards-02/kpi-cards"
import KpiCards03 from "@/registry/blocks/dashboards-analytics/kpi-cards/kpi-cards-03/kpi-cards"
import KpiCards04 from "@/registry/blocks/dashboards-analytics/kpi-cards/kpi-cards-04/kpi-cards"
import Blog01 from "@/registry/blocks/marketing/blog/blog-01/blog"
import Blog02 from "@/registry/blocks/marketing/blog/blog-02/blog"
import Blog03 from "@/registry/blocks/marketing/blog/blog-03/blog"
import Blog04 from "@/registry/blocks/marketing/blog/blog-04/blog"
import Blog05 from "@/registry/blocks/marketing/blog/blog-05/blog"
import Blog06 from "@/registry/blocks/marketing/blog/blog-06/blog"
import Blog07 from "@/registry/blocks/marketing/blog/blog-07/blog"
import Blog08 from "@/registry/blocks/marketing/blog/blog-08/blog"
import Blog09 from "@/registry/blocks/marketing/blog/blog-09/blog"
import Blog10 from "@/registry/blocks/marketing/blog/blog-10/blog"
import ContentSection01 from "@/registry/blocks/marketing/content-section/content-section-01/content-section"
import ContentSection02 from "@/registry/blocks/marketing/content-section/content-section-02/content-section"
import ContentSection03 from "@/registry/blocks/marketing/content-section/content-section-03/content-section"
import ContentSection04 from "@/registry/blocks/marketing/content-section/content-section-04/content-section"
import ContentSection05 from "@/registry/blocks/marketing/content-section/content-section-05/content-section"
import ContentSection06 from "@/registry/blocks/marketing/content-section/content-section-06/content-section"
import ContentSection07 from "@/registry/blocks/marketing/content-section/content-section-07/content-section"
import ContentSection08 from "@/registry/blocks/marketing/content-section/content-section-08/content-section"
import ContentSection09 from "@/registry/blocks/marketing/content-section/content-section-09/content-section"
import ContentSection10 from "@/registry/blocks/marketing/content-section/content-section-10/content-section"
import ContentSection11 from "@/registry/blocks/marketing/content-section/content-section-11/content-section"
import ContentSection12 from "@/registry/blocks/marketing/content-section/content-section-12/content-section"
import DashboardLayout01 from "@/registry/blocks/application-layouts/dashboard-layout/dashboard-layout-01/dashboard-layout"
import DashboardLayout02 from "@/registry/blocks/application-layouts/dashboard-layout/dashboard-layout-02/dashboard-layout"
import DashboardLayout03 from "@/registry/blocks/application-layouts/dashboard-layout/dashboard-layout-03/dashboard-layout"
import Team01 from "@/registry/blocks/marketing/team/team-01/team"
import Team02 from "@/registry/blocks/marketing/team/team-02/team"
import Team03 from "@/registry/blocks/marketing/team/team-03/team"
import Team04 from "@/registry/blocks/marketing/team/team-04/team"
import Team05 from "@/registry/blocks/marketing/team/team-05/team"
import Team06 from "@/registry/blocks/marketing/team/team-06/team"
import Team07 from "@/registry/blocks/marketing/team/team-07/team"
import Team08 from "@/registry/blocks/marketing/team/team-08/team"
import Team09 from "@/registry/blocks/marketing/team/team-09/team"
import Team10 from "@/registry/blocks/marketing/team/team-10/team"
import Pricing01 from "@/registry/blocks/marketing/pricing/pricing-01/pricing"
import Pricing02 from "@/registry/blocks/marketing/pricing/pricing-02/pricing"
import Pricing03 from "@/registry/blocks/marketing/pricing/pricing-03/pricing"
import Pricing04 from "@/registry/blocks/marketing/pricing/pricing-04/pricing"
import Pricing05 from "@/registry/blocks/marketing/pricing/pricing-05/pricing"
import Pricing06 from "@/registry/blocks/marketing/pricing/pricing-06/pricing"
import Pricing07 from "@/registry/blocks/marketing/pricing/pricing-07/pricing"
import Pricing08 from "@/registry/blocks/marketing/pricing/pricing-08/pricing"
import Pricing09 from "@/registry/blocks/marketing/pricing/pricing-09/pricing"
import Pricing10 from "@/registry/blocks/marketing/pricing/pricing-10/pricing"
import Testimonials01 from "@/registry/blocks/marketing/testimonials/testimonials-01/testimonial"
import Testimonials02 from "@/registry/blocks/marketing/testimonials/testimonials-02/testimonial"
import Testimonials03 from "@/registry/blocks/marketing/testimonials/testimonials-03/testimonial"
import Testimonials04 from "@/registry/blocks/marketing/testimonials/testimonials-04/testimonial"
import Testimonials05 from "@/registry/blocks/marketing/testimonials/testimonials-05/testimonial"
import Testimonials06 from "@/registry/blocks/marketing/testimonials/testimonials-06/testimonial"
import Testimonials07 from "@/registry/blocks/marketing/testimonials/testimonials-07/testimonial"
import Testimonials08 from "@/registry/blocks/marketing/testimonials/testimonials-08/testimonial"
import Testimonials09 from "@/registry/blocks/marketing/testimonials/testimonials-09/testimonial"
import Testimonials10 from "@/registry/blocks/marketing/testimonials/testimonials-10/testimonial"
import Testimonials11 from "@/registry/blocks/marketing/testimonials/testimonials-11/testimonial"
import Testimonials12 from "@/registry/blocks/marketing/testimonials/testimonials-12/testimonial"
import Testimonials13 from "@/registry/blocks/marketing/testimonials/testimonials-13/testimonial"
import Testimonials14 from "@/registry/blocks/marketing/testimonials/testimonials-14/testimonial"
import ApplicationForm01 from "@/registry/blocks/forms/application-form/application-form-01/application-form"
import ApplicationForm02 from "@/registry/blocks/forms/application-form/application-form-02/application-form"
import ApplicationForm03 from "@/registry/blocks/forms/application-form/application-form-03/application-form"
import ApplicationForm04 from "@/registry/blocks/forms/application-form/application-form-04/application-form"
import ContactForm01 from "@/registry/blocks/forms/contact-form/contact-form-01/contact-form"
import ContactForm02 from "@/registry/blocks/forms/contact-form/contact-form-02/contact-form"
import ContactForm03 from "@/registry/blocks/forms/contact-form/contact-form-03/contact-form"
import ContactForm04 from "@/registry/blocks/forms/contact-form/contact-form-04/contact-form"
import ContactForm05 from "@/registry/blocks/forms/contact-form/contact-form-05/contact-form"
import ContactForm06 from "@/registry/blocks/forms/contact-form/contact-form-06/contact-form"
import ContactForm07 from "@/registry/blocks/forms/contact-form/contact-form-07/contact-form"
import ContactForm08 from "@/registry/blocks/forms/contact-form/contact-form-08/contact-form"
import ContactForm09 from "@/registry/blocks/forms/contact-form/contact-form-09/contact-form"
import ContactForm10 from "@/registry/blocks/forms/contact-form/contact-form-10/contact-form"
import ContactForm11 from "@/registry/blocks/forms/contact-form/contact-form-11/contact-form"
import ContactForm12 from "@/registry/blocks/forms/contact-form/contact-form-12/contact-form"
import SimpleColumnsFooter from "@/registry/blocks/marketing/footer/footer-01/footer"
import LogoSocialFooter from "@/registry/blocks/marketing/footer/footer-02/footer"
import DarkColumnsFooter from "@/registry/blocks/marketing/footer/footer-03/footer"
import BrandBlurbFooter from "@/registry/blocks/marketing/footer/footer-04/footer"
import GradientDarkFooter from "@/registry/blocks/marketing/footer/footer-05/footer"
import StoreColumnsFooter from "@/registry/blocks/marketing/footer/footer-06/footer"
import ContactNewsletterFooter from "@/registry/blocks/marketing/footer/footer-07/footer"
import CenteredSocialFooter from "@/registry/blocks/marketing/footer/footer-08/footer"
import MinimalBrandFooter from "@/registry/blocks/marketing/footer/footer-09/footer"
import NewsletterColumnsFooter from "@/registry/blocks/marketing/footer/footer-10/footer"
import PhotoSplitFooter from "@/registry/blocks/marketing/footer/footer-11/footer"
import NewsletterPillFooter from "@/registry/blocks/marketing/footer/footer-12/footer"
import CenteredMutedFooter from "@/registry/blocks/marketing/footer/footer-13/footer"
import ContactColumnsFooter from "@/registry/blocks/marketing/footer/footer-14/footer"
import Rating01 from "@/registry/blocks/ecommerce/reviews-and-ratings/rating-01/rating"
import Rating02 from "@/registry/blocks/ecommerce/reviews-and-ratings/rating-02/rating"
import Rating03 from "@/registry/blocks/ecommerce/reviews-and-ratings/rating-03/rating"
import Rating04 from "@/registry/blocks/ecommerce/reviews-and-ratings/rating-04/rating"
import Rating05 from "@/registry/blocks/ecommerce/reviews-and-ratings/rating-05/rating"
import Rating06 from "@/registry/blocks/ecommerce/reviews-and-ratings/rating-06/rating"
import Rating07 from "@/registry/blocks/ecommerce/reviews-and-ratings/rating-07/rating"
import Rating08 from "@/registry/blocks/ecommerce/reviews-and-ratings/rating-08/rating"
import CareerCtaFooter from "@/registry/blocks/marketing/footer/footer-15/footer"
import NewsletterLegalFooter from "@/registry/blocks/marketing/footer/footer-16/footer"
import ServicesMegaMenu from "@/registry/blocks/navigation/mega-menu/mega-menu-01/mega-menu"
import InstituteMegaMenu from "@/registry/blocks/navigation/mega-menu/mega-menu-02/mega-menu"
import ProductsMegaMenu from "@/registry/blocks/navigation/mega-menu/mega-menu-03/mega-menu"
import FeaturesMegaMenu from "@/registry/blocks/navigation/mega-menu/mega-menu-04/mega-menu"
import ToolsMegaMenu from "@/registry/blocks/navigation/mega-menu/mega-menu-05/mega-menu"
import CompanyIconsMegaMenu from "@/registry/blocks/navigation/mega-menu/mega-menu-06/mega-menu"
import SimpleSidebar from "@/registry/blocks/navigation/sidebar/sidebar-01/sidebar"
import IconSidebar from "@/registry/blocks/navigation/sidebar/sidebar-02/sidebar"
import UserSidebar from "@/registry/blocks/navigation/sidebar/sidebar-03/sidebar"
import CollapsibleSidebar from "@/registry/blocks/navigation/sidebar/sidebar-04/sidebar"
import InsightsSidebar from "@/registry/blocks/navigation/sidebar/sidebar-05/sidebar"
import AccentSidebar from "@/registry/blocks/navigation/sidebar/sidebar-06/sidebar"
import SearchSidebar from "@/registry/blocks/navigation/sidebar/sidebar-07/sidebar"
import ChatSidebar from "@/registry/blocks/navigation/sidebar/sidebar-08/sidebar"
import DualRailSidebar from "@/registry/blocks/navigation/sidebar/sidebar-09/sidebar"
import BasicBreadcrumbs from "@/registry/blocks/navigation/breadcrumbs/breadcrumbs-01/breadcrumbs"
import HomeIconBreadcrumbs from "@/registry/blocks/navigation/breadcrumbs/breadcrumbs-02/breadcrumbs"
import IconTrailBreadcrumbs from "@/registry/blocks/navigation/breadcrumbs/breadcrumbs-03/breadcrumbs"
import SlashIconBreadcrumbs from "@/registry/blocks/navigation/breadcrumbs/breadcrumbs-04/breadcrumbs"
import SlashHomeBreadcrumbs from "@/registry/blocks/navigation/breadcrumbs/breadcrumbs-05/breadcrumbs"
import PillIconBreadcrumbs from "@/registry/blocks/navigation/breadcrumbs/breadcrumbs-06/breadcrumbs"
import BoxedHomeBreadcrumbs from "@/registry/blocks/navigation/breadcrumbs/breadcrumbs-07/breadcrumbs"
import EllipsisBreadcrumbs from "@/registry/blocks/navigation/breadcrumbs/breadcrumbs-08/breadcrumbs"
import SegmentBreadcrumbs from "@/registry/blocks/navigation/breadcrumbs/breadcrumbs-09/breadcrumbs"
import Tabs01 from "@/registry/blocks/navigation/tabs/tabs-01/tabs"
import Tabs02 from "@/registry/blocks/navigation/tabs/tabs-02/tabs"
import Tabs03 from "@/registry/blocks/navigation/tabs/tabs-03/tabs"
import Tabs04 from "@/registry/blocks/navigation/tabs/tabs-04/tabs"
import Tabs05 from "@/registry/blocks/navigation/tabs/tabs-05/tabs"
import Tabs06 from "@/registry/blocks/navigation/tabs/tabs-06/tabs"
import Tabs07 from "@/registry/blocks/navigation/tabs/tabs-07/tabs"
import Tabs08 from "@/registry/blocks/navigation/tabs/tabs-08/tabs"
import Tabs09 from "@/registry/blocks/navigation/tabs/tabs-09/tabs"
import Tabs10 from "@/registry/blocks/navigation/tabs/tabs-10/tabs"
import Tabs11 from "@/registry/blocks/navigation/tabs/tabs-11/tabs"
import Tabs12 from "@/registry/blocks/navigation/tabs/tabs-12/tabs"
import MobileNavigation01 from "@/registry/blocks/navigation/mobile-navigation/mobile-navigation-01/mobile-navigation"
import MobileNavigation02 from "@/registry/blocks/navigation/mobile-navigation/mobile-navigation-02/mobile-navigation"
import MobileNavigation03 from "@/registry/blocks/navigation/mobile-navigation/mobile-navigation-03/mobile-navigation"
import MobileNavigation04 from "@/registry/blocks/navigation/mobile-navigation/mobile-navigation-04/mobile-navigation"
import MobileNavigation05 from "@/registry/blocks/navigation/mobile-navigation/mobile-navigation-05/mobile-navigation"
import MobileNavigation06 from "@/registry/blocks/navigation/mobile-navigation/mobile-navigation-06/mobile-navigation"
import MobileNavigation07 from "@/registry/blocks/navigation/mobile-navigation/mobile-navigation-07/mobile-navigation"
import MobileNavigation08 from "@/registry/blocks/navigation/mobile-navigation/mobile-navigation-08/mobile-navigation"
import MobileNavigation09 from "@/registry/blocks/navigation/mobile-navigation/mobile-navigation-09/mobile-navigation"
import MobileNavigation10 from "@/registry/blocks/navigation/mobile-navigation/mobile-navigation-10/mobile-navigation"
import MobileNavigation11 from "@/registry/blocks/navigation/mobile-navigation/mobile-navigation-11/mobile-navigation"
import MobileNavigation12 from "@/registry/blocks/navigation/mobile-navigation/mobile-navigation-12/mobile-navigation"
import MobileNavigation13 from "@/registry/blocks/navigation/mobile-navigation/mobile-navigation-13/mobile-navigation"
import MobileNavigation14 from "@/registry/blocks/navigation/mobile-navigation/mobile-navigation-14/mobile-navigation"

function CenteredCard({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-3 py-6 sm:px-4 md:px-10 md:py-10">
      <div className="w-full max-w-md">{children}</div>
    </div>
  )
}

function Login01View() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-3 py-6 sm:px-4 md:px-10 md:py-10">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  )
}

function Login02View() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-3 py-6 sm:px-4 md:px-10 md:py-10">
      <div className="w-full max-w-md">
        <SocialLoginForm />
      </div>
    </div>
  )
}

function Login03View() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-3 py-6 sm:px-4 md:px-10 md:py-10">
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
  "login-10": function Login10View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-3 py-6 sm:px-4 md:px-10 md:py-10">
        <BrandMarkLoginForm />
      </div>
    )
  },
  "login-11": function Login11View() {
    return <SplitIllustrationLoginForm className="min-h-svh" />
  },
  "login-12": function Login12View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-3 py-6 sm:px-4 md:px-10 md:py-10">
        <WelcomeBackLoginForm />
      </div>
    )
  },
  "login-13": function Login13View() {
    return <SplitPhotoLoginForm className="min-h-svh" />
  },
  "login-14": function Login14View() {
    return <WelcomePhotoLoginForm className="min-h-svh" />
  },
  "login-15": function Login15View() {
    return <IllustratedBrandLoginForm className="min-h-svh" />
  },
  "login-16": function Login16View() {
    return <GradientAccessLoginForm className="min-h-svh" />
  },
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
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-4 py-10">
        <div className="w-full max-w-4xl">
          <OtpEmailForm />
        </div>
      </div>
    )
  },
  "otp-verification-04": function OtpVerification04View() {
    return (
      <CenteredCard>
        <OtpPhoneForm />
      </CenteredCard>
    )
  },
  "otp-verification-05": function OtpVerification05View() {
    return (
      <CenteredCard>
        <OtpTrustDeviceForm />
      </CenteredCard>
    )
  },
  "otp-verification-06": function OtpVerification06View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-white px-6 py-10 dark:bg-background">
        <div className="w-full max-w-md">
          <OtpOnboardingForm />
        </div>
      </div>
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
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-6 py-10">
        <div className="w-full max-w-lg">
          <ChooseTwoFactorForm />
        </div>
      </div>
    )
  },
  "two-factor-05": function TwoFactor05View() {
    return (
      <CenteredCard>
        <PasskeyTwoFactorForm />
      </CenteredCard>
    )
  },
  "two-factor-06": function TwoFactor06View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-4 py-10">
        <div className="w-full max-w-4xl">
          <NewDeviceTwoFactorForm />
        </div>
      </div>
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
  "social-login-04": function SocialLogin04View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-4 py-10">
        <div className="w-full max-w-4xl">
          <SocialSplitForm />
        </div>
      </div>
    )
  },
  "social-login-05": function SocialLogin05View() {
    return (
      <CenteredCard>
        <SocialLastUsedForm />
      </CenteredCard>
    )
  },
  "social-login-06": function SocialLogin06View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-4 py-10">
        <div className="w-full max-w-4xl">
          <SocialBrandSplitForm />
        </div>
      </div>
    )
  },
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
  "passkey-04": function Passkey04View() {
    return (
      <CenteredCard>
        <PasskeyManageForm />
      </CenteredCard>
    )
  },
  "passkey-05": function Passkey05View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-4 py-10">
        <div className="w-full max-w-4xl">
          <PasskeyCrossDeviceForm />
        </div>
      </div>
    )
  },
  "passkey-06": function Passkey06View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-4 py-10">
        <div className="w-full max-w-4xl">
          <PasskeyBrandSplitForm />
        </div>
      </div>
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
        <CheckInboxRecoveryForm />
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
  "account-recovery-05": function AccountRecovery05View() {
    return (
      <CenteredCard>
        <MethodRecoveryForm />
      </CenteredCard>
    )
  },
  "account-recovery-06": function AccountRecovery06View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-4 py-10">
        <div className="w-full max-w-4xl">
          <BrandSplitRecoveryForm />
        </div>
      </div>
    )
  },
  "banner-01": function Banner01View() {
    return (
      <div className="flex min-h-svh w-full flex-col bg-canvas">
        <Banner01 />
        <div className="flex flex-1 items-center justify-center px-6 py-10">
          <p className="text-sm text-muted-foreground">
            Place above your navbar or page chrome.
          </p>
        </div>
      </div>
    )
  },
  "banner-02": function Banner02View() {
    return (
      <div className="flex min-h-svh w-full flex-col bg-canvas">
        <Banner02 />
        <div className="flex flex-1 items-center justify-center px-6 py-10">
          <p className="text-sm text-muted-foreground">
            Place above your navbar or page chrome.
          </p>
        </div>
      </div>
    )
  },
  "banner-03": function Banner03View() {
    return (
      <div className="flex min-h-svh w-full flex-col bg-canvas">
        <Banner03 />
        <div className="flex flex-1 items-center justify-center px-6 py-10">
          <p className="text-sm text-muted-foreground">
            Place above your navbar or page chrome.
          </p>
        </div>
      </div>
    )
  },
  "banner-04": function Banner04View() {
    return (
      <div className="flex min-h-svh w-full flex-col bg-canvas">
        <Banner04 />
        <div className="flex flex-1 items-center justify-center px-6 py-10">
          <p className="text-sm text-muted-foreground">
            Place above your navbar or page chrome.
          </p>
        </div>
      </div>
    )
  },
  "banner-05": function Banner05View() {
    return (
      <div className="flex min-h-svh w-full flex-col justify-center bg-canvas px-6 py-10">
        <Banner05 />
      </div>
    )
  },
  "banner-06": function Banner06View() {
    return (
      <div className="flex min-h-svh w-full flex-col justify-center bg-canvas px-6 py-10">
        <Banner06 />
      </div>
    )
  },
  "banner-07": function Banner07View() {
    return (
      <div className="flex min-h-svh w-full flex-col bg-canvas">
        <Banner07 />
        <div className="flex flex-1 items-center justify-center px-6 py-10">
          <p className="text-sm text-muted-foreground">
            Place above your navbar or page chrome.
          </p>
        </div>
      </div>
    )
  },
  "banner-08": function Banner08View() {
    return (
      <div className="flex min-h-svh w-full flex-col bg-canvas">
        <Banner08 />
        <div className="flex flex-1 items-center justify-center px-6 py-10">
          <p className="text-sm text-muted-foreground">
            Place above your navbar or page chrome.
          </p>
        </div>
      </div>
    )
  },
  "banner-09": function Banner09View() {
    return (
      <div className="flex min-h-svh w-full flex-col bg-canvas">
        <Banner09 />
        <div className="flex flex-1 items-center justify-center px-6 py-10">
          <p className="text-sm text-muted-foreground">
            Place above your navbar or page chrome.
          </p>
        </div>
      </div>
    )
  },
  "banner-10": function Banner10View() {
    return (
      <div className="flex min-h-svh w-full flex-col bg-canvas">
        <Banner10 />
        <div className="flex flex-1 items-center justify-center px-6 py-10">
          <p className="text-sm text-muted-foreground">
            Place above your navbar or page chrome.
          </p>
        </div>
      </div>
    )
  },
  "banner-11": function Banner11View() {
    return (
      <div className="flex min-h-svh w-full flex-col bg-canvas">
        <Banner11 />
        <div className="flex flex-1 items-center justify-center px-6 py-10">
          <p className="text-sm text-muted-foreground">
            Place above your navbar or page chrome.
          </p>
        </div>
      </div>
    )
  },
  "banner-12": function Banner12View() {
    return (
      <div className="flex min-h-svh w-full flex-col bg-canvas">
        <Banner12 />
        <div className="flex flex-1 items-center justify-center px-6 py-10">
          <p className="text-sm text-muted-foreground">
            Place above your navbar or page chrome.
          </p>
        </div>
      </div>
    )
  },
  "banner-13": function Banner13View() {
    return (
      <div className="flex min-h-svh w-full flex-col bg-canvas">
        <Banner13 />
        <div className="flex flex-1 items-center justify-center px-6 py-10">
          <p className="text-sm text-muted-foreground">
            Place above your navbar or page chrome.
          </p>
        </div>
      </div>
    )
  },
  "banner-14": function Banner14View() {
    return (
      <div className="flex min-h-svh w-full flex-col bg-canvas">
        <Banner14 />
        <div className="flex flex-1 items-center justify-center px-6 py-10">
          <p className="text-sm text-muted-foreground">
            Place above your navbar or page chrome.
          </p>
        </div>
      </div>
    )
  },
  "banner-15": function Banner15View() {
    return (
      <div className="flex min-h-svh w-full flex-col bg-canvas">
        <Banner15 />
        <div className="flex flex-1 items-center justify-center px-6 py-10">
          <p className="text-sm text-muted-foreground">
            Place above your navbar or page chrome.
          </p>
        </div>
      </div>
    )
  },
  "cookie-consent-01": function CookieConsent01View() {
    return (
      <div className="flex min-h-svh w-full items-stretch justify-center bg-canvas">
        <div className="w-full">
          <CookieConsent01 />
        </div>
      </div>
    )
  },
  "cookie-consent-02": function CookieConsent02View() {
    return (
      <div className="flex min-h-svh w-full items-stretch justify-center bg-canvas">
        <div className="w-full">
          <CookieConsent02 />
        </div>
      </div>
    )
  },
  "cookie-consent-03": function CookieConsent03View() {
    return (
      <div className="flex min-h-svh w-full items-stretch justify-center bg-canvas">
        <div className="w-full">
          <CookieConsent03 />
        </div>
      </div>
    )
  },
  "cookie-consent-04": function CookieConsent04View() {
    return (
      <div className="flex min-h-svh w-full items-stretch justify-center bg-canvas">
        <div className="w-full">
          <CookieConsent04 />
        </div>
      </div>
    )
  },
  "bento-grid-01": function BentoGrid01View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas">
        <div className="w-full">
          <BentoGrid01 />
        </div>
      </div>
    )
  },
  "bento-grid-02": function BentoGrid02View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-white dark:bg-background">
        <div className="w-full">
          <BentoGrid02 />
        </div>
      </div>
    )
  },
  "how-it-works-01": function HowItWorks01View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-white px-0 py-0 dark:bg-background">
        <div className="w-full">
          <HowItWorks01 />
        </div>
      </div>
    )
  },
  "how-it-works-02": function HowItWorks02View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <HowItWorks02 />
        </div>
      </div>
    )
  },
  "how-it-works-03": function HowItWorks03View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-zinc-950 px-0 py-0">
        <div className="w-full">
          <HowItWorks03 />
        </div>
      </div>
    )
  },
  "how-it-works-04": function HowItWorks04View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-white px-0 py-0 dark:bg-background">
        <div className="w-full">
          <HowItWorks04 />
        </div>
      </div>
    )
  },
  "author-profile-01": function AuthorProfile01View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <AuthorProfile01 />
        </div>
      </div>
    )
  },
  "blog-grid-01": function BlogGrid01View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <BlogGrid01 />
        </div>
      </div>
    )
  },
  "changelog-01": function Changelog01View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <Changelog01 />
        </div>
      </div>
    )
  },
  "reading-progress-01": function ReadingProgress01View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <ReadingProgress01 />
        </div>
      </div>
    )
  },
  "article-layout-01": function ArticleLayout01View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <ArticleLayout01 />
        </div>
      </div>
    )
  },
  "cta-01": function Cta01View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-0 py-8 md:px-8 md:py-12">
        <div className="w-full max-w-5xl">
          <Cta01 />
        </div>
      </div>
    )
  },
  "cta-02": function Cta02View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-0 py-8 md:py-12">
        <div className="w-full max-w-3xl">
          <Cta02 />
        </div>
      </div>
    )
  },
  "cta-03": function Cta03View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-0 py-8 md:px-8 md:py-12">
        <div className="w-full max-w-7xl">
          <Cta03 />
        </div>
      </div>
    )
  },
  "cta-04": function Cta04View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-0 py-8 md:px-8 md:py-12">
        <div className="w-full max-w-6xl">
          <Cta04 />
        </div>
      </div>
    )
  },
  "cta-05": function Cta05View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-0 py-8 md:px-8 md:py-12">
        <div className="w-full max-w-4xl">
          <Cta05 />
        </div>
      </div>
    )
  },
  "cta-06": function Cta06View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center overflow-visible bg-canvas px-0 pb-12 pt-0">
        <div className="w-full overflow-visible">
          <Cta06 />
        </div>
      </div>
    )
  },
  "cta-07": function Cta07View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-0 py-8 md:px-8 md:py-12">
        <div className="w-full max-w-6xl">
          <Cta07 />
        </div>
      </div>
    )
  },
  "cta-08": function Cta08View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-0 py-8 md:px-8 md:py-12">
        <div className="w-full max-w-3xl">
          <Cta08 />
        </div>
      </div>
    )
  },
  "cta-09": function Cta09View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-0 py-8 md:px-8 md:py-12">
        <div className="w-full max-w-6xl">
          <Cta09 />
        </div>
      </div>
    )
  },
  "stats-01": function Stats01View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <Stats01 />
        </div>
      </div>
    )
  },
  "stats-02": function Stats02View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <Stats02 />
        </div>
      </div>
    )
  },
  "stats-03": function Stats03View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <Stats03 />
        </div>
      </div>
    )
  },
  "stats-04": function Stats04View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-0 py-0">
        <div className="w-full max-w-6xl">
          <Stats04 />
        </div>
      </div>
    )
  },
  "stats-05": function Stats05View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <Stats05 />
        </div>
      </div>
    )
  },
  "stats-06": function Stats06View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <Stats06 />
        </div>
      </div>
    )
  },
  "stats-07": function Stats07View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <Stats07 />
        </div>
      </div>
    )
  },
  "stats-08": function Stats08View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <Stats08 />
        </div>
      </div>
    )
  },
  "stats-09": function Stats09View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <Stats09 />
        </div>
      </div>
    )
  },
  "stats-10": function Stats10View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-0 py-0">
        <div className="w-full max-w-6xl">
          <Stats10 />
        </div>
      </div>
    )
  },
  "stats-11": function Stats11View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-0 py-0">
        <div className="w-full max-w-3xl">
          <Stats11 />
        </div>
      </div>
    )
  },
  "stats-12": function Stats12View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-0 py-0">
        <div className="w-full max-w-5xl">
          <Stats12 />
        </div>
      </div>
    )
  },
  "stats-13": function Stats13View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-0 py-0">
        <div className="w-full max-w-6xl">
          <Stats13 />
        </div>
      </div>
    )
  },
  "stats-14": function Stats14View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-0 py-0">
        <div className="w-full max-w-6xl">
          <Stats14 />
        </div>
      </div>
    )
  },
  "stats-15": function Stats15View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <Stats15 />
        </div>
      </div>
    )
  },
  "stats-16": function Stats16View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-0 py-0">
        <div className="w-full max-w-6xl">
          <Stats16 />
        </div>
      </div>
    )
  },
  "faq-01": function Faq01View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <Faq01 />
        </div>
      </div>
    )
  },
  "faq-02": function Faq02View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <Faq02 />
        </div>
      </div>
    )
  },
  "faq-03": function Faq03View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <Faq03 />
        </div>
      </div>
    )
  },
  "faq-04": function Faq04View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <Faq04 />
        </div>
      </div>
    )
  },
  "faq-05": function Faq05View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <Faq05 />
        </div>
      </div>
    )
  },
  "faq-06": function Faq06View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <Faq06 />
        </div>
      </div>
    )
  },
  "faq-07": function Faq07View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <Faq07 />
        </div>
      </div>
    )
  },
  "faq-08": function Faq08View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <Faq08 />
        </div>
      </div>
    )
  },
  "faq-09": function Faq09View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <Faq09 />
        </div>
      </div>
    )
  },
  "faq-10": function Faq10View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <Faq10 />
        </div>
      </div>
    )
  },
  "faq-11": function Faq11View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <Faq11 />
        </div>
      </div>
    )
  },
  "faq-12": function Faq12View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <Faq12 />
        </div>
      </div>
    )
  },
  "faq-13": function Faq13View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <Faq13 />
        </div>
      </div>
    )
  },
  "faq-14": function Faq14View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <Faq14 />
        </div>
      </div>
    )
  },
  "faq-15": function Faq15View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <Faq15 />
        </div>
      </div>
    )
  },
  "faq-16": function Faq16View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <Faq16 />
        </div>
      </div>
    )
  },
  "faq-17": function Faq17View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <Faq17 />
        </div>
      </div>
    )
  },
  "faq-18": function Faq18View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <Faq18 />
        </div>
      </div>
    )
  },
  "faq-19": function Faq19View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <Faq19 />
        </div>
      </div>
    )
  },
  "faq-20": function Faq20View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <Faq20 />
        </div>
      </div>
    )
  },
  "data-table-01": function DataTable01View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-3 py-6 sm:px-6 sm:py-10">
        <div className="w-full min-w-0 max-w-5xl">
          <DataTable01 />
        </div>
      </div>
    )
  },
  "data-table-02": function DataTable02View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-3 py-6 sm:px-6 sm:py-10">
        <div className="w-full min-w-0 max-w-5xl">
          <DataTable02 />
        </div>
      </div>
    )
  },
  "data-table-03": function DataTable03View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-3 py-6 sm:px-6 sm:py-10">
        <div className="w-full min-w-0 max-w-5xl">
          <DataTable03 />
        </div>
      </div>
    )
  },
  "advanced-data-grid-01": function AdvancedDataGrid01View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <AdvancedDataGrid01 />
        </div>
      </div>
    )
  },
  "advanced-data-grid-02": function AdvancedDataGrid02View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <AdvancedDataGrid02 />
        </div>
      </div>
    )
  },
  "advanced-data-grid-03": function AdvancedDataGrid03View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <AdvancedDataGrid03 />
        </div>
      </div>
    )
  },
  "advanced-data-grid-04": function AdvancedDataGrid04View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <AdvancedDataGrid04 />
        </div>
      </div>
    )
  },
  "row-actions-01": function RowActions01View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-3 py-6 sm:px-6 sm:py-10">
        <div className="w-full min-w-0 max-w-6xl">
          <RowActions01 />
        </div>
      </div>
    )
  },
  "row-actions-02": function RowActions02View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-3 py-6 sm:px-6 sm:py-10">
        <div className="w-full min-w-0 max-w-6xl">
          <RowActions02 />
        </div>
      </div>
    )
  },
  "row-actions-03": function RowActions03View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-3 py-6 sm:px-6 sm:py-10">
        <div className="w-full min-w-0 max-w-6xl">
          <RowActions03 />
        </div>
      </div>
    )
  },
  "api-keys-01": function ApiKeys01View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <ApiKeys01 />
        </div>
      </div>
    )
  },
  "webhook-management-01": function WebhookManagement01View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <WebhookManagement01 />
        </div>
      </div>
    )
  },
  "integrations-01": function Integrations01View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <Integrations01 />
        </div>
      </div>
    )
  },
  "logs-viewer-01": function LogsViewer01View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <LogsViewer01 />
        </div>
      </div>
    )
  },
  "api-keys-02": function ApiKeys02View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <ApiKeys02 />
        </div>
      </div>
    )
  },
  "account-settings-01": function AccountSettings01View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <AccountSettings01 />
        </div>
      </div>
    )
  },
  "account-settings-02": function AccountSettings02View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <AccountSettings02 />
        </div>
      </div>
    )
  },
  "account-settings-03": function AccountSettings03View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <AccountSettings03 />
        </div>
      </div>
    )
  },
  "account-settings-04": function AccountSettings04View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <AccountSettings04 />
        </div>
      </div>
    )
  },
  "account-settings-05": function AccountSettings05View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <AccountSettings05 />
        </div>
      </div>
    )
  },
  "user-profile-01": function UserProfile01View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-white px-0 py-0 dark:bg-background">
        <div className="w-full">
          <UserProfile01 />
        </div>
      </div>
    )
  },
  "user-profile-02": function UserProfile02View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-white px-0 py-0 dark:bg-background">
        <div className="w-full">
          <UserProfile02 />
        </div>
      </div>
    )
  },
  "user-profile-03": function UserProfile03View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-white px-0 py-0 dark:bg-background">
        <div className="w-full">
          <UserProfile03 />
        </div>
      </div>
    )
  },
  "user-profile-04": function UserProfile04View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-white px-0 py-0 dark:bg-background">
        <div className="w-full">
          <UserProfile04 />
        </div>
      </div>
    )
  },
  "user-profile-05": function UserProfile05View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-white px-0 py-0 dark:bg-background">
        <div className="w-full">
          <UserProfile05 />
        </div>
      </div>
    )
  },
  "user-profile-06": function UserProfile06View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-white px-0 py-0 dark:bg-background">
        <div className="w-full">
          <UserProfile06 />
        </div>
      </div>
    )
  },
  "team-members-01": function TeamMembers01View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <TeamMembers01 />
        </div>
      </div>
    )
  },
  "team-members-02": function TeamMembers02View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <TeamMembers02 />
        </div>
      </div>
    )
  },
  "team-members-03": function TeamMembers03View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <TeamMembers03 />
        </div>
      </div>
    )
  },
  "team-members-04": function TeamMembers04View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <TeamMembers04 />
        </div>
      </div>
    )
  },
  "team-members-05": function TeamMembers05View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <TeamMembers05 />
        </div>
      </div>
    )
  },
  "team-members-06": function TeamMembers06View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <TeamMembers06 />
        </div>
      </div>
    )
  },
  "roles-and-permissions-01": function RolesAndPermissions01View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <RolesAndPermissions01 />
        </div>
      </div>
    )
  },
  "roles-and-permissions-02": function RolesAndPermissions02View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <RolesAndPermissions02 />
        </div>
      </div>
    )
  },
  "roles-and-permissions-03": function RolesAndPermissions03View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <RolesAndPermissions03 />
        </div>
      </div>
    )
  },
  "billing-history-01": function BillingHistory01View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-white px-0 py-0 dark:bg-background">
        <div className="w-full">
          <BillingHistory01 />
        </div>
      </div>
    )
  },
  "billing-settings-01": function BillingSettings01View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <BillingSettings01 />
        </div>
      </div>
    )
  },
  "billing-settings-02": function BillingSettings02View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <BillingSettings02 />
        </div>
      </div>
    )
  },
  "usage-based-billing-01": function UsageBasedBilling01View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-white px-0 py-0 dark:bg-background">
        <div className="w-full">
          <UsageBasedBilling01 />
        </div>
      </div>
    )
  },
  "usage-based-billing-02": function UsageBasedBilling02View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-white px-0 py-0 dark:bg-background">
        <div className="w-full">
          <UsageBasedBilling02 />
        </div>
      </div>
    )
  },
  "usage-based-billing-03": function UsageBasedBilling03View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-white px-0 py-0 dark:bg-background">
        <div className="w-full">
          <UsageBasedBilling03 />
        </div>
      </div>
    )
  },
  "usage-based-billing-04": function UsageBasedBilling04View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-white px-0 py-0 dark:bg-background">
        <div className="w-full">
          <UsageBasedBilling04 />
        </div>
      </div>
    )
  },
  "usage-based-billing-05": function UsageBasedBilling05View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-white px-0 py-0 dark:bg-background">
        <div className="w-full">
          <UsageBasedBilling05 />
        </div>
      </div>
    )
  },
  "usage-based-billing-06": function UsageBasedBilling06View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-white px-0 py-0 dark:bg-background">
        <div className="w-full">
          <UsageBasedBilling06 />
        </div>
      </div>
    )
  },
  "usage-based-billing-07": function UsageBasedBilling07View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-white px-0 py-0 dark:bg-background">
        <div className="w-full">
          <UsageBasedBilling07 />
        </div>
      </div>
    )
  },
  "payment-methods-01": function PaymentMethods01View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <PaymentMethods01 />
        </div>
      </div>
    )
  },
  "transfer-funds-01": function TransferFunds01View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <TransferFunds01 />
        </div>
      </div>
    )
  },
  "invoice-01": function Invoice01View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <Invoice01 />
        </div>
      </div>
    )
  },
  "access-denied-01": function AccessDenied01View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <AccessDenied01 />
        </div>
      </div>
    )
  },
  "not-found-01": function NotFound01View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <NotFound01 />
        </div>
      </div>
    )
  },
  "error-state-01": function ErrorState01View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <ErrorState01 />
        </div>
      </div>
    )
  },
  "rate-limit-01": function RateLimit01View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <RateLimit01 />
        </div>
      </div>
    )
  },
  "maintenance-01": function Maintenance01View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <Maintenance01 />
        </div>
      </div>
    )
  },
  "empty-state-01": function EmptyState01View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <EmptyState01 />
        </div>
      </div>
    )
  },
  "empty-state-02": function EmptyState02View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <EmptyState02 />
        </div>
      </div>
    )
  },
  "empty-state-03": function EmptyState03View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <EmptyState03 />
        </div>
      </div>
    )
  },
  "empty-state-04": function EmptyState04View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <EmptyState04 />
        </div>
      </div>
    )
  },
  "empty-state-05": function EmptyState05View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <EmptyState05 />
        </div>
      </div>
    )
  },
  "empty-state-06": function EmptyState06View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <EmptyState06 />
        </div>
      </div>
    )
  },
  "empty-state-07": function EmptyState07View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <EmptyState07 />
        </div>
      </div>
    )
  },
  "empty-state-08": function EmptyState08View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <EmptyState08 />
        </div>
      </div>
    )
  },
  "empty-state-09": function EmptyState09View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <EmptyState09 />
        </div>
      </div>
    )
  },
  "status-page-01": function StatusPage01View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <StatusPage01 />
        </div>
      </div>
    )
  },
  "ai-chat-01": function AiChat01View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-white dark:bg-background">
        <div className="w-full">
          <AiChat01 />
        </div>
      </div>
    )
  },
  "ai-chat-02": function AiChat02View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-white dark:bg-background">
        <div className="w-full">
          <AiChat02 />
        </div>
      </div>
    )
  },
  "ai-chat-03": function AiChat03View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-white dark:bg-background">
        <div className="w-full">
          <AiChat03 />
        </div>
      </div>
    )
  },
  "agent-workspace-01": function AgentWorkspace01View() {
    return (
      <div className="h-dvh w-full bg-white dark:bg-background">
        <AgentWorkspace01 />
      </div>
    )
  },
  "agent-run-timeline": function AgentRunTimelineView() {
    return (
      <div className="h-dvh w-full bg-white dark:bg-background">
        <AgentRunTimeline />
      </div>
    )
  },
  "chat-composer-01": function ChatComposer01View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-white dark:bg-background">
        <div className="w-full">
          <ChatComposer01 />
        </div>
      </div>
    )
  },
  "chat-composer-02": function ChatComposer02View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-white dark:bg-background">
        <div className="w-full">
          <ChatComposer02 />
        </div>
      </div>
    )
  },
  "chat-composer-03": function ChatComposer03View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-white dark:bg-background">
        <div className="w-full">
          <ChatComposer03 />
        </div>
      </div>
    )
  },
  "chat-composer-04": function ChatComposer04View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-white dark:bg-background">
        <div className="w-full">
          <ChatComposer04 />
        </div>
      </div>
    )
  },
  "data-export-01": function DataExport01View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <DataExport01 />
        </div>
      </div>
    )
  },
  "data-export-02": function DataExport02View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <DataExport02 />
        </div>
      </div>
    )
  },
  "file-manager-01": function FileManager01View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <FileManager01 />
        </div>
      </div>
    )
  },
  "file-upload-01": function FileUpload01View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <FileUpload01 />
        </div>
      </div>
    )
  },
  "media-gallery-01": function MediaGallery01View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <MediaGallery01 />
        </div>
      </div>
    )
  },
  "media-player-01": function MediaPlayer01View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <MediaPlayer01 />
        </div>
      </div>
    )
  },
  "comments-01": function Comments01View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <Comments01 />
        </div>
      </div>
    )
  },
  "activity-feed-01": function ActivityFeed01View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <ActivityFeed01 />
        </div>
      </div>
    )
  },
  "activity-feed-02": function ActivityFeed02View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <ActivityFeed02 />
        </div>
      </div>
    )
  },
  "activity-feed-03": function ActivityFeed03View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <ActivityFeed03 />
        </div>
      </div>
    )
  },
  "activity-feed-04": function ActivityFeed04View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <ActivityFeed04 />
        </div>
      </div>
    )
  },
  "activity-feed-05": function ActivityFeed05View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <ActivityFeed05 />
        </div>
      </div>
    )
  },
  "analytics-dashboard-01": function AnalyticsDashboard01View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <AnalyticsDashboard01 />
        </div>
      </div>
    )
  },
  "crypto-portfolio-01": function CryptoPortfolio01View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <CryptoPortfolio01 />
        </div>
      </div>
    )
  },
  "crypto-portfolio-02": function CryptoPortfolio02View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-[#05070d] px-0 py-0">
        <div className="w-full">
          <CryptoPortfolio02 />
        </div>
      </div>
    )
  },
  "crypto-portfolio-03": function CryptoPortfolio03View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-[#05070d] px-0 py-0">
        <div className="w-full">
          <CryptoPortfolio03 />
        </div>
      </div>
    )
  },
  "crypto-portfolio-04": function CryptoPortfolio04View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-[#F7F0E6] px-0 py-0 dark:bg-[#120c09]">
        <div className="w-full">
          <CryptoPortfolio04 />
        </div>
      </div>
    )
  },
  "kpi-cards-01": function KpiCards01View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas">
        <div className="w-full">
          <KpiCards01 />
        </div>
      </div>
    )
  },
  "kpi-cards-02": function KpiCards02View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas">
        <div className="w-full">
          <KpiCards02 />
        </div>
      </div>
    )
  },
  "kpi-cards-03": function KpiCards03View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas">
        <div className="w-full">
          <KpiCards03 />
        </div>
      </div>
    )
  },
  "kpi-cards-04": function KpiCards04View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas">
        <div className="w-full">
          <KpiCards04 />
        </div>
      </div>
    )
  },
  "calendar-01": function Calendar01View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <Calendar01 />
        </div>
      </div>
    )
  },
  "notification-center-01": function NotificationCenter01View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <NotificationCenter01 />
        </div>
      </div>
    )
  },
  "setup-wizard-01": function SetupWizard01View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <SetupWizard01 />
        </div>
      </div>
    )
  },
  "setup-wizard-02": function SetupWizard02View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <SetupWizard02 />
        </div>
      </div>
    )
  },
  "setup-wizard-03": function SetupWizard03View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <SetupWizard03 />
        </div>
      </div>
    )
  },
  "workspace-setup-01": function WorkspaceSetup01View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <WorkspaceSetup01 />
        </div>
      </div>
    )
  },
  "workspace-setup-02": function WorkspaceSetup02View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <WorkspaceSetup02 />
        </div>
      </div>
    )
  },
  "workspace-setup-03": function WorkspaceSetup03View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <WorkspaceSetup03 />
        </div>
      </div>
    )
  },
  "workspace-setup-04": function WorkspaceSetup04View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <WorkspaceSetup04 />
        </div>
      </div>
    )
  },
  "progress-checklist-01": function ProgressChecklist01View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-white px-0 py-0 dark:bg-background">
        <div className="w-full">
          <ProgressChecklist01 />
        </div>
      </div>
    )
  },
  "progress-checklist-02": function ProgressChecklist02View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-white px-0 py-0 dark:bg-background">
        <div className="w-full">
          <ProgressChecklist02 />
        </div>
      </div>
    )
  },
  "progress-checklist-03": function ProgressChecklist03View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-white px-0 py-0 dark:bg-background">
        <div className="w-full">
          <ProgressChecklist03 />
        </div>
      </div>
    )
  },
  "progress-checklist-04": function ProgressChecklist04View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-white px-0 py-0 dark:bg-background">
        <div className="w-full">
          <ProgressChecklist04 />
        </div>
      </div>
    )
  },
  "progress-checklist-05": function ProgressChecklist05View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-white px-0 py-0 dark:bg-background">
        <div className="w-full">
          <ProgressChecklist05 />
        </div>
      </div>
    )
  },
  "data-import-01": function DataImport01View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-white px-0 py-0 dark:bg-background">
        <div className="w-full">
          <DataImport01 />
        </div>
      </div>
    )
  },
  "data-import-02": function DataImport02View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-white px-0 py-0 dark:bg-background">
        <div className="w-full">
          <DataImport02 />
        </div>
      </div>
    )
  },
  "data-import-03": function DataImport03View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-white px-0 py-0 dark:bg-background">
        <div className="w-full">
          <DataImport03 />
        </div>
      </div>
    )
  },
  "search-results-01": function SearchResults01View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <SearchResults01 />
        </div>
      </div>
    )
  },
  "filter-panel-01": function FilterPanel01View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <FilterPanel01 />
        </div>
      </div>
    )
  },
  "payment-form-01": function PaymentForm01View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <PaymentForm01 />
        </div>
      </div>
    )
  },
  "payment-form-02": function PaymentForm02View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <PaymentForm02 />
        </div>
      </div>
    )
  },
  "payment-form-03": function PaymentForm03View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <PaymentForm03 />
        </div>
      </div>
    )
  },
  "payment-form-04": function PaymentForm04View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <PaymentForm04 />
        </div>
      </div>
    )
  },
  "product-list-01": function ProductList01View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <ProductList01 />
        </div>
      </div>
    )
  },
  "product-list-02": function ProductList02View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <ProductList02 />
        </div>
      </div>
    )
  },
  "product-list-03": function ProductList03View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <ProductList03 />
        </div>
      </div>
    )
  },
  "product-list-04": function ProductList04View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <ProductList04 />
        </div>
      </div>
    )
  },
  "product-list-05": function ProductList05View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <ProductList05 />
        </div>
      </div>
    )
  },
  "product-list-06": function ProductList06View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <ProductList06 />
        </div>
      </div>
    )
  },
  "product-list-07": function ProductList07View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <ProductList07 />
        </div>
      </div>
    )
  },
  "product-list-08": function ProductList08View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <ProductList08 />
        </div>
      </div>
    )
  },
  "product-list-09": function ProductList09View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <ProductList09 />
        </div>
      </div>
    )
  },
  "product-list-10": function ProductList10View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <ProductList10 />
        </div>
      </div>
    )
  },
  "product-list-11": function ProductList11View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <ProductList11 />
        </div>
      </div>
    )
  },
  "checkout-01": function Checkout01View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-white px-0 py-0 dark:bg-background">
        <div className="w-full">
          <Checkout01 />
        </div>
      </div>
    )
  },
  "checkout-02": function Checkout02View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-white px-0 py-0 dark:bg-background">
        <div className="w-full">
          <Checkout02 />
        </div>
      </div>
    )
  },
  "checkout-03": function Checkout03View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-white px-0 py-0 dark:bg-background">
        <div className="w-full">
          <Checkout03 />
        </div>
      </div>
    )
  },
  "checkout-04": function Checkout04View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-white px-0 py-0 dark:bg-background">
        <div className="w-full">
          <Checkout04 />
        </div>
      </div>
    )
  },
  "checkout-05": function Checkout05View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-white px-0 py-0 dark:bg-background">
        <div className="w-full">
          <Checkout05 />
        </div>
      </div>
    )
  },
  "checkout-06": function Checkout06View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-white px-0 py-0 dark:bg-background">
        <div className="w-full">
          <Checkout06 />
        </div>
      </div>
    )
  },
  "checkout-07": function Checkout07View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <Checkout07 />
        </div>
      </div>
    )
  },
  "checkout-08": function Checkout08View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <Checkout08 />
        </div>
      </div>
    )
  },
  "checkout-09": function Checkout09View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <Checkout09 />
        </div>
      </div>
    )
  },
  "order-confirmation-01": function OrderConfirmation01View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <OrderConfirmation01 />
        </div>
      </div>
    )
  },
  "order-summary-01": function OrderSummary01View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <OrderSummary01 />
        </div>
      </div>
    )
  },
  "order-summary-02": function OrderSummary02View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <OrderSummary02 />
        </div>
      </div>
    )
  },
  "order-summary-03": function OrderSummary03View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <OrderSummary03 />
        </div>
      </div>
    )
  },
  "order-summary-04": function OrderSummary04View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <OrderSummary04 />
        </div>
      </div>
    )
  },
  "order-summary-05": function OrderSummary05View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <OrderSummary05 />
        </div>
      </div>
    )
  },
  "order-summary-06": function OrderSummary06View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <OrderSummary06 />
        </div>
      </div>
    )
  },
  "product-details-01": function ProductDetails01View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-white px-0 py-0">
        <div className="w-full">
          <ProductDetails01 />
        </div>
      </div>
    )
  },
  "product-details-02": function ProductDetails02View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-white px-0 py-0">
        <div className="w-full">
          <ProductDetails02 />
        </div>
      </div>
    )
  },
  "product-details-03": function ProductDetails03View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-white px-0 py-0">
        <div className="w-full">
          <ProductDetails03 />
        </div>
      </div>
    )
  },
  "product-details-04": function ProductDetails04View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-white px-0 py-0">
        <div className="w-full">
          <ProductDetails04 />
        </div>
      </div>
    )
  },
  "product-details-05": function ProductDetails05View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-white px-0 py-0">
        <div className="w-full">
          <ProductDetails05 />
        </div>
      </div>
    )
  },
  "product-details-06": function ProductDetails06View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-white px-0 py-0">
        <div className="w-full">
          <ProductDetails06 />
        </div>
      </div>
    )
  },
  "product-details-07": function ProductDetails07View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-white px-0 py-0">
        <div className="w-full">
          <ProductDetails07 />
        </div>
      </div>
    )
  },
  "product-details-08": function ProductDetails08View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-white px-0 py-0">
        <div className="w-full">
          <ProductDetails08 />
        </div>
      </div>
    )
  },
  "product-details-09": function ProductDetails09View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <ProductDetails09 />
        </div>
      </div>
    )
  },
  "shopping-cart-01": function ShoppingCart01View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-white px-0 py-0 dark:bg-background">
        <div className="w-full">
          <ShoppingCart01 />
        </div>
      </div>
    )
  },
  "shopping-cart-02": function ShoppingCart02View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-white px-0 py-0 dark:bg-background">
        <div className="w-full">
          <ShoppingCart02 />
        </div>
      </div>
    )
  },
  "shopping-cart-03": function ShoppingCart03View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-white px-0 py-0 dark:bg-background">
        <div className="w-full">
          <ShoppingCart03 />
        </div>
      </div>
    )
  },
  "shopping-cart-04": function ShoppingCart04View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-white px-0 py-0 dark:bg-background">
        <div className="w-full">
          <ShoppingCart04 />
        </div>
      </div>
    )
  },
  "shopping-cart-05": function ShoppingCart05View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-white px-0 py-0 dark:bg-background">
        <div className="w-full">
          <ShoppingCart05 />
        </div>
      </div>
    )
  },
  "shopping-cart-06": function ShoppingCart06View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-white px-0 py-0 dark:bg-background">
        <div className="w-full">
          <ShoppingCart06 />
        </div>
      </div>
    )
  },
  "shopping-cart-07": function ShoppingCart07View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-white px-0 py-0 dark:bg-background">
        <div className="w-full">
          <ShoppingCart07 />
        </div>
      </div>
    )
  },
  "shopping-cart-08": function ShoppingCart08View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-white px-0 py-0 dark:bg-background">
        <div className="w-full">
          <ShoppingCart08 />
        </div>
      </div>
    )
  },
  "shopping-cart-09": function ShoppingCart09View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-white px-0 py-0 dark:bg-background">
        <div className="w-full">
          <ShoppingCart09 />
        </div>
      </div>
    )
  },
  "shopping-cart-10": function ShoppingCart10View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <ShoppingCart10 />
        </div>
      </div>
    )
  },
  "wishlist-01": function Wishlist01View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <Wishlist01 />
        </div>
      </div>
    )
  },
  "order-tracking-01": function OrderTracking01View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-white px-0 py-0 dark:bg-background">
        <div className="w-full">
          <OrderTracking01 />
        </div>
      </div>
    )
  },
  "order-tracking-02": function OrderTracking02View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-white px-0 py-0 dark:bg-background">
        <div className="w-full">
          <OrderTracking02 />
        </div>
      </div>
    )
  },
  "order-tracking-03": function OrderTracking03View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-white px-0 py-0 dark:bg-background">
        <div className="w-full">
          <OrderTracking03 />
        </div>
      </div>
    )
  },
  "order-tracking-04": function OrderTracking04View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-white px-0 py-0 dark:bg-background">
        <div className="w-full">
          <OrderTracking04 />
        </div>
      </div>
    )
  },
  "order-tracking-05": function OrderTracking05View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-white px-0 py-0 dark:bg-background">
        <div className="w-full">
          <OrderTracking05 />
        </div>
      </div>
    )
  },
  "order-tracking-06": function OrderTracking06View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-white px-0 py-0 dark:bg-background">
        <div className="w-full">
          <OrderTracking06 />
        </div>
      </div>
    )
  },
  "order-tracking-07": function OrderTracking07View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-white px-0 py-0 dark:bg-background">
        <div className="w-full">
          <OrderTracking07 />
        </div>
      </div>
    )
  },
  "order-history-01": function OrderHistory01View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <OrderHistory01 />
        </div>
      </div>
    )
  },
  "order-history-02": function OrderHistory02View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-white px-0 py-0 dark:bg-background">
        <div className="w-full">
          <OrderHistory02 />
        </div>
      </div>
    )
  },
  "order-history-03": function OrderHistory03View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <OrderHistory03 />
        </div>
      </div>
    )
  },
  "order-history-04": function OrderHistory04View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-white px-0 py-0 dark:bg-background">
        <div className="w-full">
          <OrderHistory04 />
        </div>
      </div>
    )
  },
  "order-history-05": function OrderHistory05View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <OrderHistory05 />
        </div>
      </div>
    )
  },
  "order-history-06": function OrderHistory06View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <OrderHistory06 />
        </div>
      </div>
    )
  },
  "order-history-07": function OrderHistory07View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <OrderHistory07 />
        </div>
      </div>
    )
  },
  "order-history-08": function OrderHistory08View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <OrderHistory08 />
        </div>
      </div>
    )
  },
  "product-filter-01": function ProductFilter01View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-white px-0 py-0 dark:bg-background">
        <div className="w-full">
          <ProductFilter01 />
        </div>
      </div>
    )
  },
  "product-filter-02": function ProductFilter02View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-white px-0 py-0 dark:bg-background">
        <div className="w-full">
          <ProductFilter02 />
        </div>
      </div>
    )
  },
  "product-filter-03": function ProductFilter03View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-white px-0 py-0 dark:bg-background">
        <div className="w-full">
          <ProductFilter03 />
        </div>
      </div>
    )
  },
  "product-filter-04": function ProductFilter04View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-white px-0 py-0 dark:bg-background">
        <div className="w-full">
          <ProductFilter04 />
        </div>
      </div>
    )
  },
  "product-review-01": function ProductReview01View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-white px-0 py-0 dark:bg-background">
        <div className="w-full">
          <ProductReview01 />
        </div>
      </div>
    )
  },
  "product-review-02": function ProductReview02View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-white px-0 py-0 dark:bg-background">
        <div className="w-full">
          <ProductReview02 />
        </div>
      </div>
    )
  },
  "product-review-03": function ProductReview03View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-white px-0 py-0 dark:bg-background">
        <div className="w-full">
          <ProductReview03 />
        </div>
      </div>
    )
  },
  "product-review-04": function ProductReview04View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-white px-0 py-0 dark:bg-background">
        <div className="w-full">
          <ProductReview04 />
        </div>
      </div>
    )
  },
  "product-review-05": function ProductReview05View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-white px-0 py-0 dark:bg-background">
        <div className="w-full">
          <ProductReview05 />
        </div>
      </div>
    )
  },
  "product-categories-01": function ProductCategories01View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-white px-0 py-0 dark:bg-background">
        <div className="w-full">
          <ProductCategories01 />
        </div>
      </div>
    )
  },
  "product-categories-02": function ProductCategories02View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-zinc-950 px-0 py-0">
        <div className="w-full">
          <ProductCategories02 />
        </div>
      </div>
    )
  },
  "product-categories-03": function ProductCategories03View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-white px-0 py-0 dark:bg-background">
        <div className="w-full">
          <ProductCategories03 />
        </div>
      </div>
    )
  },
  "product-categories-04": function ProductCategories04View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-white px-0 py-0 dark:bg-background">
        <div className="w-full">
          <ProductCategories04 />
        </div>
      </div>
    )
  },
  "product-categories-05": function ProductCategories05View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-white px-0 py-0 dark:bg-background">
        <div className="w-full">
          <ProductCategories05 />
        </div>
      </div>
    )
  },
  "product-categories-06": function ProductCategories06View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-white px-0 py-0 dark:bg-background">
        <div className="w-full">
          <ProductCategories06 />
        </div>
      </div>
    )
  },
  "product-categories-07": function ProductCategories07View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-white px-0 py-0 dark:bg-background">
        <div className="w-full">
          <ProductCategories07 />
        </div>
      </div>
    )
  },
  "product-categories-08": function ProductCategories08View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-muted px-0 py-0 dark:bg-background">
        <div className="w-full">
          <ProductCategories08 />
        </div>
      </div>
    )
  },
  "gallery-01": function Gallery01View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <Gallery01 />
        </div>
      </div>
    )
  },
  "gallery-02": function Gallery02View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <Gallery02 />
        </div>
      </div>
    )
  },
  "gallery-03": function Gallery03View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <Gallery03 />
        </div>
      </div>
    )
  },
  "gallery-04": function Gallery04View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <Gallery04 />
        </div>
      </div>
    )
  },
  "gallery-05": function Gallery05View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <Gallery05 />
        </div>
      </div>
    )
  },
  "gallery-06": function Gallery06View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <Gallery06 />
        </div>
      </div>
    )
  },
  "gallery-07": function Gallery07View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <Gallery07 />
        </div>
      </div>
    )
  },
  "gallery-08": function Gallery08View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <Gallery08 />
        </div>
      </div>
    )
  },
  "gallery-09": function Gallery09View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <Gallery09 />
        </div>
      </div>
    )
  },
  "gallery-10": function Gallery10View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <Gallery10 />
        </div>
      </div>
    )
  },
  "features-01": function Features01View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-8 py-12">
        <div className="w-full max-w-7xl">
          <Features01 />
        </div>
      </div>
    )
  },
  "features-02": function Features02View() {
    return (
      <div className="flex min-h-svh w-full bg-canvas">
        <Features02 className="min-h-svh" />
      </div>
    )
  },
  "features-03": function Features03View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas">
        <div className="w-full">
          <Features03 />
        </div>
      </div>
    )
  },
  "features-04": function Features04View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas">
        <div className="w-full">
          <Features04 />
        </div>
      </div>
    )
  },
  "features-05": function Features05View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas">
        <div className="w-full">
          <Features05 />
        </div>
      </div>
    )
  },
  "features-06": function Features06View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-8 py-12">
        <div className="w-full max-w-7xl">
          <Features06 />
        </div>
      </div>
    )
  },
  "features-07": function Features07View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas">
        <div className="w-full">
          <Features07 />
        </div>
      </div>
    )
  },
  "features-08": function Features08View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas">
        <div className="w-full">
          <Features08 />
        </div>
      </div>
    )
  },
  "features-09": function Features09View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-8 py-12">
        <div className="w-full max-w-7xl">
          <Features09 />
        </div>
      </div>
    )
  },
  "features-10": function Features10View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-8 py-12">
        <div className="w-full max-w-7xl">
          <Features10 />
        </div>
      </div>
    )
  },
  "features-11": function Features11View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-8 py-12">
        <div className="w-full max-w-7xl">
          <Features11 />
        </div>
      </div>
    )
  },
  "jumbotron-01": function Jumbotron01View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-8 py-12">
        <div className="w-full max-w-4xl">
          <Jumbotron01 />
        </div>
      </div>
    )
  },
  "jumbotron-02": function Jumbotron02View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-8 py-12">
        <div className="w-full max-w-7xl">
          <Jumbotron02 />
        </div>
      </div>
    )
  },
  "jumbotron-03": function Jumbotron03View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-8 py-12">
        <div className="w-full max-w-6xl">
          <Jumbotron03 />
        </div>
      </div>
    )
  },
  "jumbotron-04": function Jumbotron04View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-8 py-12">
        <div className="w-full max-w-6xl">
          <Jumbotron04 />
        </div>
      </div>
    )
  },
  "jumbotron-05": function Jumbotron05View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-8 py-12">
        <div className="w-full max-w-7xl">
          <Jumbotron05 />
        </div>
      </div>
    )
  },
  "jumbotron-06": function Jumbotron06View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-8 py-12">
        <div className="w-full max-w-6xl">
          <Jumbotron06 />
        </div>
      </div>
    )
  },
  "jumbotron-07": function Jumbotron07View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-8 py-12">
        <div className="w-full max-w-2xl">
          <Jumbotron07 />
        </div>
      </div>
    )
  },
  "jumbotron-08": function Jumbotron08View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-8 py-12">
        <div className="w-full max-w-4xl">
          <Jumbotron08 />
        </div>
      </div>
    )
  },
  "hero-01": function Hero01View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas">
        <div className="w-full">
          <Hero01 />
        </div>
      </div>
    )
  },
  "hero-02": function Hero02View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas">
        <div className="w-full">
          <Hero02 />
        </div>
      </div>
    )
  },
  "hero-03": function Hero03View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas">
        <div className="w-full">
          <Hero03 />
        </div>
      </div>
    )
  },
  "hero-04": function Hero04View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas">
        <div className="w-full">
          <Hero04 />
        </div>
      </div>
    )
  },
  "hero-05": function Hero05View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas">
        <div className="w-full">
          <Hero05 />
        </div>
      </div>
    )
  },
  "hero-06": function Hero06View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas">
        <div className="w-full">
          <Hero06 />
        </div>
      </div>
    )
  },
  "hero-07": function Hero07View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas">
        <div className="w-full">
          <Hero07 />
        </div>
      </div>
    )
  },
  "hero-08": function Hero08View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas">
        <div className="w-full">
          <Hero08 />
        </div>
      </div>
    )
  },
  "hero-09": function Hero09View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas">
        <div className="w-full">
          <Hero09 />
        </div>
      </div>
    )
  },
  "hero-10": function Hero10View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas">
        <div className="w-full">
          <Hero10 />
        </div>
      </div>
    )
  },
  "hero-11": function Hero11View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <Hero11 />
        </div>
      </div>
    )
  },
  "hero-12": function Hero12View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <Hero12 />
        </div>
      </div>
    )
  },
  "newsletter-01": function Newsletter01View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-0 py-12 md:px-8">
        <div className="w-full max-w-3xl">
          <Newsletter01 />
        </div>
      </div>
    )
  },
  "newsletter-02": function Newsletter02View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-0 py-12 md:px-8">
        <div className="w-full max-w-xl">
          <Newsletter02 />
        </div>
      </div>
    )
  },
  "newsletter-03": function Newsletter03View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas">
        <div className="w-full">
          <Newsletter03 />
        </div>
      </div>
    )
  },
  "newsletter-04": function Newsletter04View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-0 py-12 md:px-8">
        <div className="w-full max-w-6xl">
          <Newsletter04 />
        </div>
      </div>
    )
  },
  "newsletter-05": function Newsletter05View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-0 py-12 md:px-8">
        <div className="w-full max-w-3xl">
          <Newsletter05 />
        </div>
      </div>
    )
  },
  "newsletter-06": function Newsletter06View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas">
        <div className="w-full">
          <Newsletter06 />
        </div>
      </div>
    )
  },
  "newsletter-07": function Newsletter07View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas">
        <div className="w-full">
          <Newsletter07 />
        </div>
      </div>
    )
  },
  "newsletter-08": function Newsletter08View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 pb-16 pt-0">
        <div className="w-full">
          <Newsletter08 />
        </div>
      </div>
    )
  },
  "newsletter-09": function Newsletter09View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-0 py-12 md:px-8">
        <div className="w-full max-w-6xl">
          <Newsletter09 />
        </div>
      </div>
    )
  },
  "newsletter-10": function Newsletter10View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <Newsletter10 />
        </div>
      </div>
    )
  },
  "portfolio-01": function Portfolio01View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <Portfolio01 />
        </div>
      </div>
    )
  },
  "portfolio-02": function Portfolio02View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <Portfolio02 />
        </div>
      </div>
    )
  },
  "portfolio-03": function Portfolio03View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <Portfolio03 />
        </div>
      </div>
    )
  },
  "portfolio-04": function Portfolio04View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <Portfolio04 />
        </div>
      </div>
    )
  },
  "social-links-01": function SocialLinks01View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas">
        <div className="w-full">
          <SocialLinks01 />
        </div>
      </div>
    )
  },
  "social-links-02": function SocialLinks02View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-zinc-950">
        <div className="w-full">
          <SocialLinks02 />
        </div>
      </div>
    )
  },
  "social-links-03": function SocialLinks03View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas">
        <div className="w-full">
          <SocialLinks03 />
        </div>
      </div>
    )
  },
  "social-links-04": function SocialLinks04View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas">
        <div className="w-full">
          <SocialLinks04 />
        </div>
      </div>
    )
  },
  "blog-01": function Blog01View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-12 md:px-8">
        <div className="w-full max-w-6xl">
          <Blog01 />
        </div>
      </div>
    )
  },
  "blog-02": function Blog02View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-12 md:px-8">
        <div className="w-full max-w-7xl">
          <Blog02 />
        </div>
      </div>
    )
  },
  "blog-03": function Blog03View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-12 md:px-8">
        <div className="w-full max-w-2xl">
          <Blog03 />
        </div>
      </div>
    )
  },
  "blog-04": function Blog04View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-12 md:px-8">
        <div className="w-full max-w-6xl">
          <Blog04 />
        </div>
      </div>
    )
  },
  "blog-05": function Blog05View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-12 md:px-8">
        <div className="w-full max-w-6xl">
          <Blog05 />
        </div>
      </div>
    )
  },
  "blog-06": function Blog06View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-12 md:px-8">
        <div className="w-full max-w-6xl">
          <Blog06 />
        </div>
      </div>
    )
  },
  "blog-07": function Blog07View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-12 md:px-8">
        <div className="w-full max-w-6xl">
          <Blog07 />
        </div>
      </div>
    )
  },
  "blog-08": function Blog08View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-12 md:px-8">
        <div className="w-full max-w-7xl">
          <Blog08 />
        </div>
      </div>
    )
  },
  "blog-09": function Blog09View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-12 md:px-8">
        <div className="w-full max-w-6xl">
          <Blog09 />
        </div>
      </div>
    )
  },
  "blog-10": function Blog10View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-12 md:px-8">
        <div className="w-full max-w-6xl">
          <Blog10 />
        </div>
      </div>
    )
  },
  "content-section-01": function ContentSection01View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <ContentSection01 />
        </div>
      </div>
    )
  },
  "content-section-02": function ContentSection02View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <ContentSection02 />
        </div>
      </div>
    )
  },
  "content-section-03": function ContentSection03View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <ContentSection03 />
        </div>
      </div>
    )
  },
  "content-section-04": function ContentSection04View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <ContentSection04 />
        </div>
      </div>
    )
  },
  "content-section-05": function ContentSection05View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <ContentSection05 />
        </div>
      </div>
    )
  },
  "content-section-06": function ContentSection06View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <ContentSection06 />
        </div>
      </div>
    )
  },
  "content-section-07": function ContentSection07View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <ContentSection07 />
        </div>
      </div>
    )
  },
  "content-section-08": function ContentSection08View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <ContentSection08 />
        </div>
      </div>
    )
  },
  "content-section-09": function ContentSection09View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-zinc-950 px-0 py-0">
        <div className="w-full">
          <ContentSection09 />
        </div>
      </div>
    )
  },
  "content-section-10": function ContentSection10View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <ContentSection10 />
        </div>
      </div>
    )
  },
  "content-section-11": function ContentSection11View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-zinc-950 px-0 py-0">
        <div className="w-full">
          <ContentSection11 />
        </div>
      </div>
    )
  },
  "content-section-12": function ContentSection12View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-violet-50 px-0 py-0 dark:bg-violet-950/40">
        <div className="w-full">
          <ContentSection12 />
        </div>
      </div>
    )
  },
  "dashboard-layout-01": function DashboardLayout01View() {
    return (
      <div className="h-svh w-full overflow-hidden bg-canvas">
        <DashboardLayout01 />
      </div>
    )
  },
  "dashboard-layout-02": function DashboardLayout02View() {
    return (
      <div className="h-svh w-full overflow-hidden bg-canvas">
        <DashboardLayout02 />
      </div>
    )
  },
  "dashboard-layout-03": function DashboardLayout03View() {
    return (
      <div className="h-svh w-full overflow-hidden bg-canvas">
        <DashboardLayout03 />
      </div>
    )
  },
  "team-01": function Team01View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-4 py-12 md:px-8">
        <div className="w-full max-w-4xl">
          <Team01 />
        </div>
      </div>
    )
  },
  "team-02": function Team02View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-4 py-12 md:px-8">
        <div className="w-full max-w-5xl">
          <Team02 />
        </div>
      </div>
    )
  },
  "team-03": function Team03View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-4 py-12 md:px-8">
        <div className="w-full max-w-5xl">
          <Team03 />
        </div>
      </div>
    )
  },
  "team-04": function Team04View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-4 py-12 md:px-8">
        <div className="w-full max-w-6xl">
          <Team04 />
        </div>
      </div>
    )
  },
  "team-05": function Team05View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-4 py-12 md:px-8">
        <div className="w-full max-w-5xl">
          <Team05 />
        </div>
      </div>
    )
  },
  "team-06": function Team06View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-4 py-16 md:px-8">
        <div className="w-full max-w-5xl">
          <Team06 />
        </div>
      </div>
    )
  },
  "team-07": function Team07View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas">
        <div className="w-full">
          <Team07 />
        </div>
      </div>
    )
  },
  "team-08": function Team08View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-4 py-12 md:px-6">
        <div className="w-full max-w-5xl">
          <Team08 />
        </div>
      </div>
    )
  },
  "team-09": function Team09View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-4 py-12 md:px-6">
        <div className="w-full max-w-6xl">
          <Team09 />
        </div>
      </div>
    )
  },
  "team-10": function Team10View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-4 py-12 md:px-6">
        <div className="w-full max-w-5xl">
          <Team10 />
        </div>
      </div>
    )
  },
  "pricing-01": function Pricing01View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-0 py-12 md:px-8">
        <div className="w-full max-w-6xl">
          <Pricing01 />
        </div>
      </div>
    )
  },
  "pricing-02": function Pricing02View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-12 md:px-8">
        <div className="w-full">
          <Pricing02 />
        </div>
      </div>
    )
  },
  "pricing-03": function Pricing03View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-12 md:px-8">
        <div className="w-full">
          <Pricing03 />
        </div>
      </div>
    )
  },
  "pricing-04": function Pricing04View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-0 py-12 md:px-8">
        <div className="w-full max-w-4xl">
          <Pricing04 />
        </div>
      </div>
    )
  },
  "pricing-05": function Pricing05View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-0 py-12 md:px-8">
        <div className="w-full max-w-6xl">
          <Pricing05 />
        </div>
      </div>
    )
  },
  "pricing-06": function Pricing06View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center overflow-visible bg-canvas px-0 py-14 md:px-8">
        <div className="w-full max-w-5xl overflow-visible">
          <Pricing06 />
        </div>
      </div>
    )
  },
  "pricing-07": function Pricing07View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-0 py-12 md:px-8">
        <div className="w-full max-w-5xl">
          <Pricing07 />
        </div>
      </div>
    )
  },
  "pricing-08": function Pricing08View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-12 md:px-8">
        <div className="w-full max-w-6xl">
          <Pricing08 />
        </div>
      </div>
    )
  },
  "pricing-09": function Pricing09View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-0 py-12 md:px-8">
        <div className="w-full max-w-6xl">
          <Pricing09 />
        </div>
      </div>
    )
  },
  "pricing-10": function Pricing10View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-0 py-12 md:px-8">
        <div className="w-full max-w-6xl">
          <Pricing10 />
        </div>
      </div>
    )
  },
  "testimonials-01": function Testimonials01View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-8 py-12">
        <div className="w-full max-w-2xl">
          <Testimonials01 />
        </div>
      </div>
    )
  },
  "testimonials-02": function Testimonials02View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-8 py-12">
        <div className="w-full max-w-7xl">
          <Testimonials02 />
        </div>
      </div>
    )
  },
  "testimonials-03": function Testimonials03View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-8 py-12">
        <div className="w-full max-w-3xl">
          <Testimonials03 />
        </div>
      </div>
    )
  },
  "testimonials-04": function Testimonials04View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-8 py-12">
        <div className="w-full max-w-7xl">
          <Testimonials04 />
        </div>
      </div>
    )
  },
  "testimonials-05": function Testimonials05View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-8 py-12">
        <div className="w-full max-w-6xl">
          <Testimonials05 />
        </div>
      </div>
    )
  },
  "testimonials-06": function Testimonials06View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-8 py-12">
        <div className="w-full max-w-7xl">
          <Testimonials06 />
        </div>
      </div>
    )
  },
  "testimonials-07": function Testimonials07View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-8 py-12">
        <div className="w-full max-w-7xl">
          <Testimonials07 />
        </div>
      </div>
    )
  },
  "testimonials-08": function Testimonials08View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-8 py-12">
        <div className="w-full max-w-6xl">
          <Testimonials08 />
        </div>
      </div>
    )
  },
  "testimonials-09": function Testimonials09View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-8 pb-12 pt-16">
        <div className="w-full max-w-7xl">
          <Testimonials09 />
        </div>
      </div>
    )
  },
  "testimonials-10": function Testimonials10View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-8 py-12">
        <div className="w-full max-w-7xl">
          <Testimonials10 />
        </div>
      </div>
    )
  },
  "testimonials-11": function Testimonials11View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-8 py-12">
        <div className="w-full max-w-5xl">
          <Testimonials11 />
        </div>
      </div>
    )
  },
  "testimonials-12": function Testimonials12View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-8 py-12">
        <div className="w-full max-w-4xl">
          <Testimonials12 />
        </div>
      </div>
    )
  },
  "testimonials-13": function Testimonials13View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-8 py-12">
        <div className="w-full max-w-4xl">
          <Testimonials13 />
        </div>
      </div>
    )
  },
  "testimonials-14": function Testimonials14View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <Testimonials14 />
        </div>
      </div>
    )
  },
  "application-form-01": function ApplicationForm01View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <ApplicationForm01 />
        </div>
      </div>
    )
  },
  "application-form-02": function ApplicationForm02View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <ApplicationForm02 />
        </div>
      </div>
    )
  },
  "application-form-03": function ApplicationForm03View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <ApplicationForm03 />
        </div>
      </div>
    )
  },
  "application-form-04": function ApplicationForm04View() {
    return (
      <div className="flex min-h-svh w-full items-start justify-center bg-canvas px-0 py-0">
        <div className="w-full">
          <ApplicationForm04 />
        </div>
      </div>
    )
  },
  "contact-form-01": function ContactForm01View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-8 py-12">
        <div className="w-full max-w-xl">
          <ContactForm01 />
        </div>
      </div>
    )
  },
  "contact-form-02": function ContactForm02View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-8 py-12">
        <div className="w-full max-w-6xl">
          <ContactForm02 />
        </div>
      </div>
    )
  },
  "contact-form-03": function ContactForm03View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-8 py-12">
        <div className="w-full max-w-4xl">
          <ContactForm03 />
        </div>
      </div>
    )
  },
  "contact-form-04": function ContactForm04View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-8 py-12">
        <div className="w-full max-w-5xl">
          <ContactForm04 />
        </div>
      </div>
    )
  },
  "contact-form-05": function ContactForm05View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-8 py-12">
        <div className="w-full max-w-5xl">
          <ContactForm05 />
        </div>
      </div>
    )
  },
  "contact-form-06": ContactForm06,
  "contact-form-07": function ContactForm07View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-8 py-12">
        <div className="w-full max-w-5xl">
          <ContactForm07 />
        </div>
      </div>
    )
  },
  "contact-form-08": function ContactForm08View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-8 py-12">
        <div className="w-full max-w-6xl">
          <ContactForm08 />
        </div>
      </div>
    )
  },
  "contact-form-09": function ContactForm09View() {
    return (
      <div className="flex min-h-svh w-full bg-canvas">
        <ContactForm09 className="min-h-svh py-12" />
      </div>
    )
  },
  "contact-form-10": function ContactForm10View() {
    return (
      <div className="flex min-h-svh w-full bg-canvas">
        <ContactForm10 className="min-h-svh" />
      </div>
    )
  },
  "contact-form-11": function ContactForm11View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-8 py-12">
        <div className="w-full max-w-6xl">
          <ContactForm11 />
        </div>
      </div>
    )
  },
  "contact-form-12": function ContactForm12View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-8 py-12">
        <div className="w-full max-w-7xl">
          <ContactForm12 />
        </div>
      </div>
    )
  },
  "footer-01": function Footer01View() {
    return (
      <div className="flex min-h-svh w-full flex-col bg-canvas">
        <div className="flex flex-1 items-center justify-center px-6 py-10">
          <p className="text-sm text-muted-foreground">
            Page content above the footer.
          </p>
        </div>
        <SimpleColumnsFooter className="border-t border-border" />
      </div>
    )
  },
  "footer-02": function Footer02View() {
    return (
      <div className="flex min-h-svh w-full flex-col bg-canvas">
        <div className="flex flex-1 items-center justify-center px-6 py-10">
          <p className="text-sm text-muted-foreground">
            Page content above the footer.
          </p>
        </div>
        <LogoSocialFooter className="border-t border-border" />
      </div>
    )
  },
  "footer-03": function Footer03View() {
    return (
      <div className="flex min-h-svh w-full flex-col bg-canvas">
        <div className="flex flex-1 items-center justify-center px-6 py-10">
          <p className="text-sm text-muted-foreground">
            Page content above the footer.
          </p>
        </div>
        <DarkColumnsFooter />
      </div>
    )
  },
  "footer-04": function Footer04View() {
    return (
      <div className="flex min-h-svh w-full flex-col bg-canvas">
        <div className="flex flex-1 items-center justify-center px-6 py-10">
          <p className="text-sm text-muted-foreground">
            Page content above the footer.
          </p>
        </div>
        <BrandBlurbFooter />
      </div>
    )
  },
  "footer-05": function Footer05View() {
    return (
      <div className="flex min-h-svh w-full flex-col bg-canvas">
        <div className="flex flex-1 items-center justify-center px-6 py-10">
          <p className="text-sm text-muted-foreground">
            Page content above the footer.
          </p>
        </div>
        <GradientDarkFooter />
      </div>
    )
  },
  "footer-06": function Footer06View() {
    return (
      <div className="flex min-h-svh w-full flex-col bg-canvas">
        <div className="flex flex-1 items-center justify-center px-6 py-10">
          <p className="text-sm text-muted-foreground">
            Page content above the footer.
          </p>
        </div>
        <StoreColumnsFooter />
      </div>
    )
  },
  "footer-07": function Footer07View() {
    return (
      <div className="flex min-h-svh w-full flex-col bg-canvas">
        <div className="flex flex-1 items-center justify-center px-6 py-10">
          <p className="text-sm text-muted-foreground">
            Page content above the footer.
          </p>
        </div>
        <ContactNewsletterFooter />
      </div>
    )
  },
  "footer-08": function Footer08View() {
    return (
      <div className="flex min-h-svh w-full flex-col bg-canvas">
        <div className="flex flex-1 items-center justify-center px-6 py-10">
          <p className="text-sm text-muted-foreground">
            Page content above the footer.
          </p>
        </div>
        <CenteredSocialFooter />
      </div>
    )
  },
  "footer-09": function Footer09View() {
    return (
      <div className="flex min-h-svh w-full flex-col bg-canvas">
        <div className="flex flex-1 items-center justify-center px-6 py-10">
          <p className="text-sm text-muted-foreground">
            Page content above the footer.
          </p>
        </div>
        <MinimalBrandFooter />
      </div>
    )
  },
  "footer-10": function Footer10View() {
    return (
      <div className="flex min-h-svh w-full flex-col bg-canvas">
        <div className="flex flex-1 items-center justify-center px-6 py-10">
          <p className="text-sm text-muted-foreground">
            Page content above the footer.
          </p>
        </div>
        <NewsletterColumnsFooter />
      </div>
    )
  },
  "footer-11": function Footer11View() {
    return (
      <div className="flex min-h-svh w-full flex-col justify-end bg-canvas">
        <PhotoSplitFooter />
      </div>
    )
  },
  "footer-12": function Footer12View() {
    return (
      <div className="flex min-h-svh w-full flex-col bg-canvas">
        <div className="flex flex-1 items-center justify-center px-6 py-10">
          <p className="text-sm text-muted-foreground">
            Page content above the footer.
          </p>
        </div>
        <NewsletterPillFooter />
      </div>
    )
  },
  "footer-13": function Footer13View() {
    return (
      <div className="flex min-h-svh w-full flex-col bg-canvas">
        <div className="flex flex-1 items-center justify-center px-6 py-10">
          <p className="text-sm text-muted-foreground">
            Page content above the footer.
          </p>
        </div>
        <CenteredMutedFooter />
      </div>
    )
  },
  "footer-14": function Footer14View() {
    return (
      <div className="flex min-h-svh w-full flex-col bg-canvas">
        <div className="flex flex-1 items-center justify-center px-6 py-10">
          <p className="text-sm text-muted-foreground">
            Page content above the footer.
          </p>
        </div>
        <ContactColumnsFooter />
      </div>
    )
  },
  "footer-15": function Footer15View() {
    return (
      <div className="flex min-h-svh w-full flex-col bg-canvas">
        <div className="flex flex-1 items-center justify-center px-6 py-10">
          <p className="text-sm text-muted-foreground">
            Page content above the footer.
          </p>
        </div>
        <CareerCtaFooter />
      </div>
    )
  },
  "footer-16": function Footer16View() {
    return (
      <div className="flex min-h-svh w-full flex-col bg-canvas">
        <div className="flex flex-1 items-center justify-center px-6 py-10">
          <p className="text-sm text-muted-foreground">
            Page content above the footer.
          </p>
        </div>
        <NewsletterLegalFooter />
      </div>
    )
  },
  "mega-menu-01": ServicesMegaMenu,
  "mega-menu-02": InstituteMegaMenu,
  "mega-menu-03": ProductsMegaMenu,
  "mega-menu-04": FeaturesMegaMenu,
  "mega-menu-05": ToolsMegaMenu,
  "mega-menu-06": CompanyIconsMegaMenu,
  "sidebar-01": SimpleSidebar,
  "sidebar-02": IconSidebar,
  "sidebar-03": UserSidebar,
  "sidebar-04": CollapsibleSidebar,
  "sidebar-05": InsightsSidebar,
  "sidebar-06": AccentSidebar,
  "sidebar-07": SearchSidebar,
  "sidebar-08": ChatSidebar,
  "sidebar-09": function DualRailSidebarView() {
    return (
      <div className="h-svh w-full bg-white dark:bg-background">
        <DualRailSidebar className="h-svh min-h-0" />
      </div>
    )
  },
  "rating-01": function Rating01View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-10 py-10">
        <Rating01 />
      </div>
    )
  },
  "rating-02": function Rating02View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-10 py-10">
        <Rating02 />
      </div>
    )
  },
  "rating-03": function Rating03View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-10 py-10">
        <Rating03 />
      </div>
    )
  },
  "rating-04": function Rating04View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-10 py-10">
        <Rating04 />
      </div>
    )
  },
  "rating-05": function Rating05View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-10 py-10">
        <Rating05 />
      </div>
    )
  },
  "rating-06": function Rating06View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-10 py-10">
        <Rating06 />
      </div>
    )
  },
  "rating-07": function Rating07View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-10 py-10">
        <Rating07 />
      </div>
    )
  },
  "rating-08": function Rating08View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-10 py-10">
        <Rating08 />
      </div>
    )
  },
  "breadcrumbs-01": function Breadcrumbs01View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-10 py-10">
        <BasicBreadcrumbs />
      </div>
    )
  },
  "breadcrumbs-02": function Breadcrumbs02View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-10 py-10">
        <HomeIconBreadcrumbs />
      </div>
    )
  },
  "breadcrumbs-03": function Breadcrumbs03View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-10 py-10">
        <IconTrailBreadcrumbs />
      </div>
    )
  },
  "breadcrumbs-04": function Breadcrumbs04View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-10 py-10">
        <SlashIconBreadcrumbs />
      </div>
    )
  },
  "breadcrumbs-05": function Breadcrumbs05View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-10 py-10">
        <SlashHomeBreadcrumbs />
      </div>
    )
  },
  "breadcrumbs-06": function Breadcrumbs06View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-10 py-10">
        <PillIconBreadcrumbs />
      </div>
    )
  },
  "breadcrumbs-07": function Breadcrumbs07View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-10 py-10">
        <BoxedHomeBreadcrumbs />
      </div>
    )
  },
  "breadcrumbs-08": function Breadcrumbs08View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-10 py-10">
        <EllipsisBreadcrumbs />
      </div>
    )
  },
  "breadcrumbs-09": function Breadcrumbs09View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-10 py-10">
        <SegmentBreadcrumbs />
      </div>
    )
  },
  "tabs-01": function Tabs01View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-8 py-12">
        <div className="w-full min-w-0 max-w-full">
          <Tabs01 />
        </div>
      </div>
    )
  },
  "tabs-02": function Tabs02View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-8 py-12">
        <div className="w-full min-w-0 max-w-full">
          <Tabs02 />
        </div>
      </div>
    )
  },
  "tabs-03": function Tabs03View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-8 py-12">
        <div className="w-full min-w-0 max-w-full">
          <Tabs03 />
        </div>
      </div>
    )
  },
  "tabs-04": function Tabs04View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-8 py-12">
        <div className="w-full min-w-0 max-w-full">
          <Tabs04 />
        </div>
      </div>
    )
  },
  "tabs-05": function Tabs05View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-8 py-12">
        <div className="w-full min-w-0 max-w-full">
          <Tabs05 />
        </div>
      </div>
    )
  },
  "tabs-06": function Tabs06View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-8 py-12">
        <div className="w-full min-w-0 max-w-full">
          <Tabs06 />
        </div>
      </div>
    )
  },
  "tabs-07": function Tabs07View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-8 py-12">
        <div className="w-full min-w-0 max-w-full">
          <Tabs07 />
        </div>
      </div>
    )
  },
  "tabs-08": function Tabs08View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-8 py-12">
        <div className="w-full min-w-0 max-w-full">
          <Tabs08 />
        </div>
      </div>
    )
  },
  "tabs-09": function Tabs09View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-8 py-12">
        <div className="w-full min-w-0 max-w-full">
          <Tabs09 />
        </div>
      </div>
    )
  },
  "tabs-10": function Tabs10View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-8 py-12">
        <div className="w-full min-w-0 max-w-full">
          <Tabs10 />
        </div>
      </div>
    )
  },
  "tabs-11": function Tabs11View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-8 py-12">
        <div className="w-full min-w-0 max-w-full">
          <Tabs11 />
        </div>
      </div>
    )
  },
  "tabs-12": function Tabs12View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas px-8 py-12">
        <div className="w-full min-w-0 max-w-full">
          <Tabs12 />
        </div>
      </div>
    )
  },
  "mobile-navigation-01": function MobileNavigation01View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas p-6">
        <div className="w-full max-w-md">
          <MobileNavigation01 className="min-h-[min(32rem,calc(100svh-3rem))]" />
        </div>
      </div>
    )
  },
  "mobile-navigation-02": function MobileNavigation02View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas p-6">
        <div className="w-full max-w-md">
          <MobileNavigation02 className="min-h-[min(32rem,calc(100svh-3rem))]" />
        </div>
      </div>
    )
  },
  "mobile-navigation-03": function MobileNavigation03View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas p-6">
        <div className="w-full max-w-md">
          <MobileNavigation03 className="min-h-[min(32rem,calc(100svh-3rem))]" />
        </div>
      </div>
    )
  },
  "mobile-navigation-04": function MobileNavigation04View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas p-6">
        <div className="w-full max-w-md">
          <MobileNavigation04 className="min-h-[min(32rem,calc(100svh-3rem))]" />
        </div>
      </div>
    )
  },
  "mobile-navigation-05": function MobileNavigation05View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas p-6">
        <div className="w-full max-w-md">
          <MobileNavigation05 className="min-h-[min(32rem,calc(100svh-3rem))]" />
        </div>
      </div>
    )
  },
  "mobile-navigation-06": function MobileNavigation06View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas p-6">
        <div className="w-full max-w-md">
          <MobileNavigation06 className="min-h-[min(32rem,calc(100svh-3rem))]" />
        </div>
      </div>
    )
  },
  "mobile-navigation-07": function MobileNavigation07View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas p-6">
        <div className="w-full max-w-md">
          <MobileNavigation07 className="min-h-[min(32rem,calc(100svh-3rem))]" />
        </div>
      </div>
    )
  },
  "mobile-navigation-08": function MobileNavigation08View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas p-6">
        <div className="w-full max-w-md">
          <MobileNavigation08 className="min-h-[min(32rem,calc(100svh-3rem))]" />
        </div>
      </div>
    )
  },
  "mobile-navigation-09": function MobileNavigation09View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas p-6">
        <div className="w-full max-w-md">
          <MobileNavigation09 className="min-h-[min(32rem,calc(100svh-3rem))]" />
        </div>
      </div>
    )
  },
  "mobile-navigation-10": function MobileNavigation10View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas p-6">
        <div className="w-full max-w-md">
          <MobileNavigation10 className="min-h-[min(32rem,calc(100svh-3rem))]" />
        </div>
      </div>
    )
  },
  "mobile-navigation-11": function MobileNavigation11View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas p-6">
        <div className="w-full max-w-md">
          <MobileNavigation11 className="min-h-[min(32rem,calc(100svh-3rem))]" />
        </div>
      </div>
    )
  },
  "mobile-navigation-12": function MobileNavigation12View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas p-6">
        <div className="w-full max-w-md">
          <MobileNavigation12 className="min-h-[min(32rem,calc(100svh-3rem))]" />
        </div>
      </div>
    )
  },
  "mobile-navigation-13": function MobileNavigation13View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas p-6">
        <div className="w-full max-w-md">
          <MobileNavigation13 className="min-h-[min(32rem,calc(100svh-3rem))]" />
        </div>
      </div>
    )
  },
  "mobile-navigation-14": function MobileNavigation14View() {
    return (
      <div className="flex min-h-svh w-full items-center justify-center bg-canvas p-6">
        <div className="w-full max-w-md">
          <MobileNavigation14 className="min-h-[min(32rem,calc(100svh-3rem))]" />
        </div>
      </div>
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
  "navbar-08": ResourcesMegaNavbar,
  "navbar-09": MediumResourcesNavbar,
  "navbar-10": CompactResourcesNavbar,
  "navbar-11": NestedDropdownNavbar,
  "navbar-12": MenuOffcanvasNavbar,
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>
}): Promise<Metadata> {
  const { name } = await params
  if (!views[name]) {
    return noindexMetadata({ title: "Block preview" })
  }
  return noindexMetadata({
    title: `${name} preview`,
    description: `Live preview for ${name}. Prefer the blocks catalog for documentation and install commands.`,
    path: `/view/${name}`,
  })
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
  const mobileNav = name.startsWith("mobile-navigation-")
  const topAligned =
    name.startsWith("navbar-") ||
    name.startsWith("mega-menu-") ||
    name.startsWith("command-menu-")

  const shellClass = fullBleed || mobileNav
    ? cn(
        "relative w-full bg-canvas",
        isEmbed ? "h-svh overflow-hidden" : "min-h-svh"
      )
    : topAligned
      ? cn(
          "relative w-full bg-canvas",
          isEmbed
            ? "scrollbar-soft flex h-svh flex-col overflow-y-auto"
            : "min-h-svh"
        )
      : cn(
          "relative w-full bg-canvas",
          isEmbed
            ? "scrollbar-soft h-svh overflow-y-auto"
            : "flex min-h-svh flex-col justify-center"
        )

  const innerClass = fullBleed || mobileNav
    ? isEmbed
      ? "relative h-full w-full"
      : "min-h-svh w-full"
    : topAligned
      ? isEmbed
        ? "flex min-h-0 w-full flex-1 flex-col"
        : "min-h-svh w-full"
      : "w-full"

  const body = (
    <>
      {isEmbed ? null : (
        <div className="absolute inset-e-4 top-4 z-50">
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
      <div
        className={shellClass}
        {...(isEmbed ? { "data-block-embed": "" } : {})}
      >
        <DirectionProvider dir={dir} className="min-h-full w-full">
          {body}
        </DirectionProvider>
      </div>
    )
  }

  return (
    <div
      className={shellClass}
      {...(isEmbed ? { "data-block-embed": "" } : {})}
    >
      {body}
    </div>
  )
}
