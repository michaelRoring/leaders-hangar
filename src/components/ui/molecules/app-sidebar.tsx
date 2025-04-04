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
import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import { useAuth } from "@/app/(root)/providers";
import Link from "next/link";

const mainNavItems = [
  {
    id: "grandstand",
    icon: <Building2 strokeWidth={1.5} color="#030033" />,
    label: "Grand Stand",
    link: "/grandstand",
  },
  {
    id: "pinned",
    icon: <Pin strokeWidth={1.5} color="#030033" className="-rotate-90" />,
    label: "Pinned",
    badge: "2",
    link: "/grandstand",
  },
  {
    id: "deepwork",
    icon: <Focus strokeWidth={1.5} color="#030033" />,
    label: "Deep work zone",
    submenu: [
      {
        id: "courses",
        label: "Courses",
        icon: <MonitorPlay strokeWidth={1.5} color="#030033" />,
        link: "/courses",
      },
      {
        id: "guides",
        label: "Guides",
        icon: <ListOrdered strokeWidth={1.5} color="#030033" />,
        link: "/guides",
      },
      {
        id: "blueprint",
        label: "Blueprint",
        icon: <Map strokeWidth={1.5} color="#030033" />,
        link: "/blueprints",
      },
    ],
  },
  {
    id: "repository",
    icon: <Layers strokeWidth={1.5} color="#030033" />,
    label: "Repository",
    link: "/",
  },
  {
    id: "documents",
    icon: <FileText strokeWidth={1.5} color="#030033" />,
    label: "Documents",
    link: "/",
  },
  {
    id: "askAlfred",
    icon: <MessageCircleQuestion strokeWidth={1.5} color="#030033" />,
    label: "Ask Alfred",
    submenu: [
      {
        id: "plan",
        icon: <Sparkles strokeWidth={1.5} color="#030033" />,
        label: "Plan",
        link: "/plan",
      },
      {
        id: "forecast",
        icon: <TrendingUpDownIcon strokeWidth={1.5} color="#030033" />,
        label: "Forecast",
        active: true,
        link: "/",
      },
    ],
  },
  {
    id: "calculator",
    icon: <Calculator strokeWidth={1.5} color="#030033" />,
    label: "Calculator",
    submenu: [
      {
        id: "roiCalc",
        icon: <Calculator strokeWidth={1.5} color="#030033" />,
        label: "ROI calculator",
        link: "/roi-calculator",
      },
      {
        id: "runwayCalc",
        icon: <Calculator strokeWidth={1.5} color="#030033" />,
        label: "Runway calculator",
        link: "/runway-calculator",
      },
      {
        id: "advRoiCalc",
        icon: <Calculator strokeWidth={1.5} color="#030033" />,
        label: "Adv ROI calc.",
        link: "/advance-roi-calculator",
      },
      {
        id: "advRunwayCalc",
        icon: <Calculator strokeWidth={1.5} color="#030033" />,
        label: "Adv Runway calc.",
        link: "/advance-runway-calculator",
      },
    ],
  },
  {
    id: "leaderHangar",
    icon: <Warehouse strokeWidth={1.5} color="#030033" />,
    label: "Leader's Hangar",
    link: "/",
  },
];

export function AppSidebar() {
  const { user, loading, error } = useAuth();
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  // Load the open menu state from localStorage on component mount
  useEffect(() => {
    const savedOpenMenus = localStorage.getItem("openMenus");
    if (savedOpenMenus) {
      setOpenMenus(JSON.parse(savedOpenMenus));
    }
  }, []);

  // Save open menu state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("openMenus", JSON.stringify(openMenus));
  }, [openMenus]);

  const toggleMenu = (menuId: string) => {
    setOpenMenus((prev) =>
      prev.includes(menuId)
        ? prev.filter((id) => id !== menuId)
        : [...prev, menuId]
    );
  };

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
                <SidebarMenuItem key={item.id}>
                  {item.submenu ? (
                    <Collapsible
                      className="group"
                      open={openMenus.includes(item.id)}
                      onOpenChange={() => toggleMenu(item.id)}
                    >
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
                            <SidebarMenuSubItem key={subItem.id}>
                              <SidebarMenuSubButton className="flex items-center gap-2 h-full max-h-[100px] whitespace-normal break-words">
                                <Link
                                  href={subItem.link}
                                  className="flex items-center gap-2 w-full"
                                  onClick={(e) => {
                                    // Prevent toggling the menu when clicking on submenu items
                                    e.stopPropagation();
                                  }}
                                >
                                  <span className="text-lg mr-2">
                                    {subItem.icon}
                                  </span>
                                  {subItem.label}
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton className="gap-3">
                      <Link
                        href={item.link}
                        className="flex items-center gap-2 w-full"
                      >
                        <span className="text-lg">{item.icon}</span>
                        <span className="text-[#030033]">{item.label}</span>
                        {item.badge && (
                          <span className="ml-auto bg-primary/10 text-white px-2 py-0.5 rounded-md text-xs bg-[#000000]">
                            {item.badge}
                          </span>
                        )}
                      </Link>
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
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
