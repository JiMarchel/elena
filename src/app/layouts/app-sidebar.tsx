import { Link, useRouterState } from '@tanstack/react-router'
import { SettingsIcon } from 'lucide-react'

import {
  appNavGroups,
  isAppRoutePath,
  isNavActive,
} from '@/app/layouts/app-nav'
import type { AppRoutePath } from '@/shared/config/app-routes'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/shared/ui'

const settingsNav = {
  title: 'Pengaturan',
  url: '/settings' as const satisfies AppRoutePath,
  icon: SettingsIcon,
}

export function AppSidebar() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<Link to="/" />}>
              <img
                src="/enela.png"
                alt=""
                className="size-8 shrink-0 rounded-lg"
              />
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">Enela</span>
                <span className="truncate text-xs text-muted-foreground">
                  Affiliate Program
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {appNavGroups.map((group) => (
          <SidebarGroup key={group.id}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      isActive={isNavActive(pathname, item.url)}
                      render={<Link to={item.url} />}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
        <SidebarGroup>
          <SidebarGroupLabel>Akun</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip={settingsNav.title}
                  isActive={isNavActive(pathname, settingsNav.url)}
                  render={<Link to={settingsNav.url} />}
                >
                  <settingsNav.icon />
                  <span>{settingsNav.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

// Dipertahankan untuk kompatibilitas jika dipakai di tempat lain.
export { isAppRoutePath, isNavActive }
