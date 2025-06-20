import { NotebookPen, Settings, SidebarIcon } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { NavLink } from "react-router-dom";

// Menu items.
const items = [
  {
    title: "All",
    url: "/",
  },
  {
    title: "Important",
    url: "/imp",
  },
  {
    title: "Completed",
    url: "/complete",
  },
];

export function AppSidebar() {
  const isMobile = useIsMobile();
  return (
    <Sidebar defaultOpen={true}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/">
                <NotebookPen />
                <span>Note Fusion</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>My Notes</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={window.location.pathname === item.url}
                  >
                    <NavLink to={item.url}>{item.title}</NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {/* <SidebarSeparator /> */}
        <SidebarGroup>
          <SidebarGroupLabel>Sort</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new-first">Newest First</SelectItem>
                  <SelectItem value="old-first">Oldest First</SelectItem>
                </SelectContent>
              </Select>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              {!isMobile && (
                <Button
                  variant="default"
                  className="hover: h-10 duration-200"
                >
                  Add a Note
                </Button>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
