"use client";

import { Command } from "lucide-react";
import * as React from "react";

import { User } from "@prisma/client";

import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { sidebarMenu } from "@/lib/configs";

interface Props extends React.ComponentProps<typeof Sidebar> {
  user: User | undefined;
}

export function AppSidebar({ user, ...props }: Props) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Acme Inc</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavProjects projects={sidebarMenu.projects} />
        {/* <NavMain items={sidebarMenu.navMain} /> */}
        {/* <NavSecondary items={sidebarMenu.navSecondary} className="mt-auto" /> */}
      </SidebarContent>

      <SidebarFooter>
        <NavUser
          user={{
            name: user?.name ?? sidebarMenu.user.name,
            email: user?.email ?? sidebarMenu.user.email,
            avatar: sidebarMenu.user.avatar,
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
