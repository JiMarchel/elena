import { Link, useRouterState } from '@tanstack/react-router'
import {
  ChartBarIcon,
  LayoutDashboardIcon,
  NetworkIcon,
  PackageIcon,
  SettingsIcon,
  ShoppingBagIcon,
  StarIcon,
  TagsIcon,
  UsersIcon,
} from 'lucide-react'

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

const nav = [
  {
    label: 'Katalog',
    items: [
      { title: 'Dashboard', url: '/', icon: LayoutDashboardIcon },
      { title: 'Produk', url: '#', icon: PackageIcon },
      { title: 'Kategori', url: '#', icon: TagsIcon },
      { title: 'Ulasan', url: '#', icon: StarIcon },
    ],
  },
  {
    label: 'Penjualan',
    items: [
      { title: 'Pesanan', url: '#', icon: ShoppingBagIcon },
      { title: 'Pelanggan', url: '#', icon: UsersIcon },
      { title: 'Analitik', url: '#', icon: ChartBarIcon },
    ],
  },
  {
    label: 'Jaringan',
    items: [{ title: 'Jaringan Saya', url: '/network', icon: NetworkIcon }],
  },
  {
    label: 'Lainnya',
    items: [{ title: 'Pengaturan', url: '#', icon: SettingsIcon }],
  },
]

const routed = (url: string): url is '/' | '/network' =>
  url === '/' || url === '/network'

const isNavActive = (pathname: string, url: string) => {
  if (url === '/') return pathname === '/'
  return pathname === url || pathname.startsWith(`${url}/`)
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
                  Parfum Marketplace
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {nav.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      isActive={isNavActive(pathname, item.url)}
                      render={
                        routed(item.url) ? (
                          <Link to={item.url} />
                        ) : (
                          <a href={item.url} />
                        )
                      }
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
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
