"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ArrowRightLeft,
  CalendarDays,
  Wrench,
  ClipboardCheck,
  Building2,
  Settings
} from "lucide-react";
import clsx from "clsx";

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Assets", href: "/assets", icon: Package },
  { name: "Allocations", href: "/allocations", icon: ArrowRightLeft },
  { name: "Bookings", href: "/bookings", icon: CalendarDays },
  { name: "Maintenance", href: "/maintenance", icon: Wrench },
  { name: "Audit", href: "/audit", icon: ClipboardCheck },
  { name: "Organization", href: "/organization", icon: Building2 },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-border bg-card/80 backdrop-blur-md flex flex-col hidden md:flex">
      <div className="h-16 flex items-center px-6 border-b border-border">
        <div className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent-foreground">
          AssetFlow
        </div>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                isActive 
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className={clsx("w-5 h-5", isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-primary")} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-border">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-all duration-200 group"
        >
          <Settings className="w-5 h-5 group-hover:text-primary" />
          <span className="font-medium">Settings</span>
        </Link>
      </div>
    </aside>
  );
}
