import { AuthGate } from "@/components/auth-gate";
import { FirstVisitOnboarding } from "@/components/digital-employee-onboarding";
import { NewEmailDrawer } from "@/components/new-email-drawer";
import { NewTaskDrawer } from "@/components/new-task-drawer";
import { PlusTrialInitializer } from "@/components/plus-trial-initializer";
import { ShareSubmissionDialog } from "@/components/share-submission-dialog";
import { BusinessSidebar } from "@/components/sidebar/business-sidebar";
import { BusinessTopbar } from "@/components/sidebar/business-topbar";

export default function BusinessLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGate>
      <div className="flex h-screen overflow-hidden bg-page">
        <BusinessSidebar />
        <div className="flex h-full min-w-0 flex-1 flex-col">
          <BusinessTopbar />
          <div className="flex min-h-0 min-w-0 flex-1">
            <main className="min-h-0 min-w-0 flex-1 overflow-y-auto">{children}</main>
          <NewTaskDrawer />
          </div>
        </div>
        <NewEmailDrawer />
        <ShareSubmissionDialog />
        <FirstVisitOnboarding />
        <PlusTrialInitializer />
      </div>
    </AuthGate>
  );
}
