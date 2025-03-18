"use client";

import {
  Search,
  ChevronRight,
  Pin,
  FileText,
  Map,
  TrendingUpDownIcon,
  HelpCircle,
  Building2,
  Focus,
  Layers,
  Warehouse,
  UserPlus,
  BellDot,
  MonitorPlay,
  ListOrdered,
  Sparkles,
  MessageCircleQuestion,
  Calculator,
  CalculatorIcon,
} from "lucide-react";
import { Input } from "@/components/ui/shadcn/input";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/shadcn/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/shadcn/collapsible";
import DevhausLogo from "@/assets/DevhausLogo";
import { NavUser } from "../atoms/nav-user";
import { createClient } from "@/lib/supabase/client";
import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import { UserInformation } from "@/types/user";
import { useAuth } from "@/app/(root)/providers";

const mainNavItems = [
  {
    icon: <Building2 strokeWidth={1.5} color="#030033" />,
    label: "Grand Stand",
    link: "/grandstand",
  },
  {
    icon: <Pin strokeWidth={1.5} color="#030033" className="-rotate-90" />,
    label: "Pinned",
    badge: "2",
    link: "/grandstand",
  },
  {
    icon: <Focus strokeWidth={1.5} color="#030033" />,
    label: "Deep work zone",
    submenu: [
      {
        label: "Courses",
        icon: <MonitorPlay strokeWidth={1.5} color="#030033" />,
        link: "/courses",
      },
      {
        label: "Guides",
        icon: <ListOrdered strokeWidth={1.5} color="#030033" />,
        link: "/guides",
      },
      {
        label: "Blueprint",
        icon: <Map strokeWidth={1.5} color="#030033" />,
        link: "/blueprints",
      },
    ],
  },
  {
    icon: <Layers strokeWidth={1.5} color="#030033" />,
    label: "Repository",
    link: "/",
  },
  {
    icon: <FileText strokeWidth={1.5} color="#030033" />,
    label: "Documents",
    link: "/",
  },
  {
    icon: <MessageCircleQuestion strokeWidth={1.5} color="#030033" />,
    label: "Ask Alfred",
    submenu: [
      {
        icon: <Sparkles strokeWidth={1.5} color="#030033" />,
        label: "Plan",
        link: "/",
      },
      {
        icon: <TrendingUpDownIcon strokeWidth={1.5} color="#030033" />,
        label: "Forecast",
        active: true,
        link: "/",
      },
    ],
  },
  {
    icon: <Calculator strokeWidth={1.5} color="#030033" />,
    label: "Calculator",
    submenu: [
      {
        icon: <Calculator strokeWidth={1.5} color="#030033" />,
        label: "ROI calculator",
        link: "/roi-calculator",
      },
      {
        icon: <Calculator strokeWidth={1.5} color="#030033" />,
        label: "Runway calculator",
        link: "/runway-calculator",
      },
      {
        icon: <Calculator strokeWidth={1.5} color="#030033" />,
        label: "Adv ROI calc.",
        link: "/advance-roi-calculator",
      },
      {
        icon: <Calculator strokeWidth={1.5} color="#030033" />,
        label: "Adv Runway calc.",
        link: "/advance-runway-calculator",
      },
    ],
  },
  {
    icon: <Warehouse strokeWidth={1.5} color="#030033" />,
    label: "Leader's Hangar",
    link: "/",
  },
];

export function AppSidebar() {
  const { user, loading, error, setUser } = useAuth();

  if (loading) {
    return (
      <Sidebar>
        <SidebarHeader>
          <div>Loading...</div>
        </SidebarHeader>
      </Sidebar>
    );
  }

  if (error) {
    return (
      <Sidebar>
        <SidebarHeader>
          <div>Error: {error.message}</div>
        </SidebarHeader>
      </Sidebar>
    );
  }

  if (!user) {
    redirect("/login");
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="p-4">
          <div className="text-xl font-semibold mb-4 flex items-center gap-2">
            <DevhausLogo width={120} />
          </div>
          <div className="relative">
            <Search
              color="#000000"
              className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground"
            />
            <Input placeholder="Search" className="pl-8 bg-white" />
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  {item.submenu ? (
                    <Collapsible className="group">
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton className="w-full gap-3 justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-lg">{item.icon}</span>
                            <span className="text-[#030033]">{item.label}</span>
                          </div>
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.submenu.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.label}>
                              <SidebarMenuSubButton className="flex items-center gap-2 h-full max-h-[100px] whitespace-normal break-words">
                                <a
                                  href={subItem.link}
                                  className="flex items-center gap-2"
                                >
                                  <span className="text-lg mr-2">
                                    {subItem.icon}
                                  </span>
                                  {subItem.label}
                                </a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton className="gap-3">
                      <a href={item.link} className="flex items-center gap-2">
                        <span className="text-lg">{item.icon}</span>
                        <span className="text-[#030033]">{item.label}</span>
                        {item.badge && (
                          <span className="ml-auto bg-primary/10 text-white px-2 py-0.5 rounded-md text-xs bg-[#000000]">
                            {item.badge}
                          </span>
                        )}
                      </a>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="gap-3">
                  <span className="text-lg">
                    <HelpCircle strokeWidth={1.5} color="#030033" />
                  </span>
                  <span>Support</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="gap-3">
                  <span className="text-lg">
                    <UserPlus strokeWidth={1.5} color="#030033" />
                  </span>
                  <span>Invite your team</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="gap-3">
                  <span className="text-lg">
                    <BellDot strokeWidth={1.5} color="#030033" />
                  </span>
                  <span>Notification</span>
                  <span className="ml-auto bg-primary/10 text-white px-2 py-0.5 rounded-md text-xs bg-[#000000]">
                    3
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarFooter>
          <NavUser user={user} />
        </SidebarFooter>
      </SidebarFooter>
    </Sidebar>
  );
}
