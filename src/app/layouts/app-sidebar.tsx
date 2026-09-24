import { Link } from '@tanstack/react-router'
import {
  ChartBarIcon,
  LayoutDashboardIcon,
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
    label: 'Lainnya',
    items: [{ title: 'Pengaturan', url: '#', icon: SettingsIcon }],
  },
]

export function AppSidebar() {
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
                      isActive={item.url === '/'}
                      render={
                        item.url === '/' ? (
                          <Link to="/" />
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
