"use client"

import type { ReactNode } from "react"

import { AiAgentsBlockWireframe } from "./ai-agents"
import { ApplicationLayoutsBlockWireframe } from "./application-layouts"
import { AuthenticationBlockWireframe } from "./authentication"
import { CalendarSchedulingBlockWireframe } from "./calendar-scheduling"
import { CommunicationBlockWireframe } from "./communication"
import { ContentPublishingBlockWireframe } from "./content-publishing"
import { DashboardsAnalyticsBlockWireframe } from "./dashboards-analytics"
import { DataTablesBlockWireframe } from "./data-tables"
import { DeveloperToolsBlockWireframe } from "./developer-tools"
import { EcommerceBlockWireframe } from "./ecommerce"
import { FeedbackStatesBlockWireframe } from "./feedback-states"
import { FilesMediaBlockWireframe } from "./files-media"
import { FormsBlockWireframe } from "./forms"
import { MarketingBlockWireframe } from "./marketing"
import { NavigationBlockWireframe } from "./navigation"
import { OnboardingBlockWireframe } from "./onboarding"
import { PaymentsBillingBlockWireframe } from "./payments-billing"
import { SearchFilteringBlockWireframe } from "./search-filtering"
import { UserAccountBlockWireframe } from "./user-account"

/** Per-category block catalog marks. */
export function getBlockCategoryWireframe(category: string): ReactNode | null {
  switch (category) {
    case "ai-agents":
      return <AiAgentsBlockWireframe />
    case "application-layouts":
      return <ApplicationLayoutsBlockWireframe />
    case "navigation":
      return <NavigationBlockWireframe />
    case "dashboards-analytics":
      return <DashboardsAnalyticsBlockWireframe />
    case "data-tables":
      return <DataTablesBlockWireframe />
    case "marketing":
      return <MarketingBlockWireframe />
    case "authentication":
      return <AuthenticationBlockWireframe />
    case "forms":
      return <FormsBlockWireframe />
    case "feedback-states":
      return <FeedbackStatesBlockWireframe />
    case "user-account":
      return <UserAccountBlockWireframe />
    case "onboarding":
      return <OnboardingBlockWireframe />
    case "communication":
      return <CommunicationBlockWireframe />
    case "developer-tools":
      return <DeveloperToolsBlockWireframe />
    case "ecommerce":
      return <EcommerceBlockWireframe />
    case "payments-billing":
      return <PaymentsBillingBlockWireframe />
    case "search-filtering":
      return <SearchFilteringBlockWireframe />
    case "files-media":
      return <FilesMediaBlockWireframe />
    case "calendar-scheduling":
      return <CalendarSchedulingBlockWireframe />
    case "content-publishing":
      return <ContentPublishingBlockWireframe />
    default:
      return null
  }
}

export { AiAgentsBlockWireframe } from "./ai-agents"
