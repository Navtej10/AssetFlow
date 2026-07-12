"use client";

import { Bell, Menu, Search, UserCircle } from "lucide-react";

export default function TopBar() {
  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <button className="md:hidden p-2 text-muted-foreground hover:bg-muted rounded-md transition-colors">
          <Menu className="w-5 h-5" />
        </button>
        <div className="relative hidden sm:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search assets..."
            className="w-64 pl-10 pr-4 py-2 rounded-full border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="p-2 text-muted-foreground hover:bg-muted rounded-full relative transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full ring-2 ring-card"></span>
        </button>
        
        <div className="h-8 w-px bg-border mx-1"></div>
        
        <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <UserCircle className="w-6 h-6" />
          </div>
          <div className="hidden md:block text-sm text-left">
            <p className="font-medium leading-none text-foreground">John Doe</p>
            <p className="text-xs text-muted-foreground mt-1">Admin</p>
          </div>
        </button>
      </div>
    </header>
  );
}
