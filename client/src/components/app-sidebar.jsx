import { NotebookPen } from "lucide-react";
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

const navigationOptions = [
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

const sortingOptions = [
  {
    title: "Newest first",
    value: "new-first",
  },
  {
    title: "Oldest first",
    value: "old-first",
  },
];

export function AppSidebar() {
  const isMobile = useIsMobile();
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenuButton asChild>
          <NavLink to="/">
            <NotebookPen />
            <span>Note Fusion</span>
          </NavLink>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Notes</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationOptions.map((option) => (
                <SidebarMenuItem key={option.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={window.location.pathname === option.url}
                  >
                    <NavLink to={option.url}>{option.title}</NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Sort</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortingOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.title}
                    </SelectItem>
                  ))}
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
                <Button variant="default" className="hover: h-10 duration-200">
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
