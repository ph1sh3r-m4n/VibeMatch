import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";

const DashboardLayout = ({ children }: { children: ReactNode }) => (
  <SidebarProvider>
    <div className="min-h-screen flex w-full gradient-bg">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col">
        <header className="h-14 flex items-center border-b border-border/50 glass px-4">
          <SidebarTrigger className="mr-4" />
          <h1 className="font-bold text-foreground">Dashboard</h1>
        </header>
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  </SidebarProvider>
);

export default DashboardLayout;
