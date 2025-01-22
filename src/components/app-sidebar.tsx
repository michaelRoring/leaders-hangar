"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "Abbiyu",
    email: "abbiyu@devhaus.com.sg",
    avatar: "/avatars/shadcn.jpg",
  },
  // teams: [
  //   {
  //     name: "Acme Inc",
  //     logo: GalleryVerticalEnd,
  //     plan: "Enterprise",
  //   },
  //   {
  //     name: "Acme Corp.",
  //     logo: AudioWaveform,
  //     plan: "Startup",
  //   },
  //   {
  //     name: "Evil Corp.",
  //     logo: Command,
  //     plan: "Free",
  //   },
  // ],
  deepWorkZoneTemplate: [
    {
      title: "Deep work zone",
      url: "#",
      icon: SquareTerminal,
      isActive: false,
      items: [
        {
          title: "Courses",
          url: "#",
        },
        {
          title: "Blueprints",
          url: "/blueprints",
        },
        {
          title: "Guides",
          url: "#",
        },
      ],
    },
  ],
  askAlfredTemplate: [
    {
      title: "Ask Alred",
      url: "#",
      icon: Frame,
      isActive: false,
      items: [
        { title: "Plan", url: "#" },
        { title: "SEO calculator", url: "#" },
        { title: "ABM calculator", url: "#" },
        { title: "Paid ads calculator", url: "#" },
      ],
    },
  ],
  menu0: [
    {
      name: "Grand Stand",
      url: "/grandstand",
      icon: Frame,
    },
    {
      name: "Pinned",
      url: "#",
      icon: PieChart,
    },
  ],
  menu1: [
    {
      name: "Repository",
      url: "#",
      icon: Frame,
    },
    {
      name: "Documents",
      url: "#",
      icon: Frame,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>{/* <h1>Devhaus</h1> */}</SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.menu0} />
        <NavMain items={data.deepWorkZoneTemplate} />
        <NavProjects projects={data.menu1} />
        <NavMain items={data.askAlfredTemplate} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
