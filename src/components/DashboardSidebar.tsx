import { Home, Compass, Calendar, Users, MessageCircle, Settings } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "Home", url: "/dashboard", icon: Home },
  { title: "Explore Vibes", url: "/map", icon: Compass },
  { title: "My Events", url: "/create-event", icon: Calendar },
  { title: "Friends", url: "/profile", icon: Users },
  { title: "Messages", url: "/chat", icon: MessageCircle },
  { title: "Settings", url: "/profile", icon: Settings },
];

export function DashboardSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="pt-4">
        <SidebarGroup>
          {!collapsed && <SidebarGroupLabel className="text-lg font-extrabold gradient-text px-4 mb-4">VibeMatch</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className="hover:bg-muted/50 rounded-xl" activeClassName="bg-primary/10 text-primary font-semibold">
                      <item.icon className="mr-2 h-5 w-5" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
