import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut } from "lucide-react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const { username, logout } = useAuth();
  
  return (
  <SidebarProvider>
    <div className="min-h-screen flex w-full gradient-bg">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col">
        <header className="h-14 flex items-center justify-between border-b border-border/50 glass px-4">
          <div className="flex items-center">
            <SidebarTrigger className="mr-4" />
            <h1 className="font-bold text-foreground">Dashboard</h1>
          </div>
          {username && (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">Hi, {username}</span>
              <Button variant="ghost" size="icon" onClick={logout} title="Logout">
                <LogOut size={16} />
              </Button>
            </div>
          )}
        </header>
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  </SidebarProvider>
)};

export default DashboardLayout;
