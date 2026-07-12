"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bell,
  Menu,
  Search,
  UserCircle,
  Plus,
  MessageSquare,
  PackagePlus,
  ArrowRightLeft,
  CalendarPlus,
  Wrench,
  ClipboardCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  Building,
  Car,
  User,
  Laptop,
  X,
  ChevronRight
} from "lucide-react";
import clsx from "clsx";

export default function TopBar() {
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isQuickActionsOpen, setIsQuickActionsOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const quickActionsRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  // Close popovers on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (quickActionsRef.current && !quickActionsRef.current.contains(event.target as Node)) {
        setIsQuickActionsOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Ctrl+K / Cmd+K shortcut
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (event.key === "Escape" && isSearchOpen) {
        setIsSearchOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen]);

  // Mock Universal Search Results
  const searchResults = [
    { id: "asset-1", tag: "AF-0021", title: "MacBook Pro M3 Max", type: "Asset Tag", category: "Laptop", holder: "Raj Kumar", status: "Allocated", href: "/assets/1" },
    { id: "asset-2", tag: "AF-0145", title: "Dell XPS 15 (2025)", type: "Asset Tag", category: "Laptop", holder: "IT Room A", status: "Available", href: "/assets/2" },
    { id: "emp-1", tag: "EMP-104", title: "Raj Kumar", type: "Employee", category: "Engineering Dept", holder: "14 Assets Assigned", status: "Active", href: "/employees" },
    { id: "emp-2", tag: "EMP-210", title: "Priya Sharma", type: "Employee", category: "Design Dept", holder: "6 Assets Assigned", status: "Active", href: "/employees" },
    { id: "dept-1", tag: "DEPT-ENG", title: "Engineering Department", type: "Department", category: "HQ 4th Floor", holder: "420 Assets", status: "Active", href: "/organization" },
    { id: "room-1", tag: "ROOM-B2", title: "Conference Room B2", type: "Room", category: "HQ 2nd Floor", holder: "Fully Booked Today", status: "Reserved", href: "/bookings" },
    { id: "veh-1", tag: "AF-0003", title: "Company Car - Honda Civic", type: "Vehicle", category: "Fleet", holder: "Parking Lot A", status: "Available", href: "/bookings" }
  ].filter(item => 
    searchQuery === "" || 
    item.tag.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <header className="h-16 flex items-center justify-between px-6 border-b border-[#E2E6ED] bg-white/95 backdrop-blur-md sticky top-0 z-30 shadow-xs">
        {/* Left section: Mobile menu + Universal Search */}
        <div className="flex items-center gap-4 flex-1 max-w-xl">
          <button className="md:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors">
            <Menu className="w-5 h-5" />
          </button>

          {/* Search Bar Trigger */}
          <div
            onClick={() => setIsSearchOpen(true)}
            className="flex-1 max-w-md relative cursor-pointer group"
          >
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-[#2563EB] transition-colors" />
            <div className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50/70 text-slate-500 text-sm flex items-center justify-between group-hover:border-[#2563EB]/50 group-hover:bg-white transition-all shadow-2xs">
              <span className="truncate text-slate-500 text-xs sm:text-sm">
                Search assets, employee, room, vehicle...
              </span>
              <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[11px] font-mono font-medium text-slate-500 bg-white border border-slate-200 rounded-md shadow-2xs">
                <span className="text-xs">⌘</span>K
              </kbd>
            </div>
          </div>
        </div>

        {/* Right section: Quick Actions, Notifications, Messages, Profile */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* + Quick Action Dropdown */}
          <div className="relative" ref={quickActionsRef}>
            <button
              onClick={() => setIsQuickActionsOpen(!isQuickActionsOpen)}
              className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-2 shadow-sm shadow-[#2563EB]/20 transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Quick Action</span>
            </button>

            {isQuickActionsOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-50 animate-fade-in divide-y divide-slate-100">
                <div className="px-3.5 py-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Create New
                </div>
                <div className="py-1">
                  <Link
                    href="/assets/new"
                    onClick={() => setIsQuickActionsOpen(false)}
                    className="flex items-center gap-3 px-3.5 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-[#2563EB] transition-colors"
                  >
                    <PackagePlus className="w-4 h-4 text-[#2563EB]" />
                    <span className="font-medium">Register Asset</span>
                  </Link>
                  <Link
                    href="/allocations"
                    onClick={() => setIsQuickActionsOpen(false)}
                    className="flex items-center gap-3 px-3.5 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-[#2563EB] transition-colors"
                  >
                    <ArrowRightLeft className="w-4 h-4 text-emerald-600" />
                    <span className="font-medium">Allocate Asset</span>
                  </Link>
                  <Link
                    href="/bookings"
                    onClick={() => setIsQuickActionsOpen(false)}
                    className="flex items-center gap-3 px-3.5 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-[#2563EB] transition-colors"
                  >
                    <CalendarPlus className="w-4 h-4 text-purple-600" />
                    <span className="font-medium">Book Resource</span>
                  </Link>
                  <Link
                    href="/maintenance"
                    onClick={() => setIsQuickActionsOpen(false)}
                    className="flex items-center gap-3 px-3.5 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-[#2563EB] transition-colors"
                  >
                    <Wrench className="w-4 h-4 text-amber-600" />
                    <span className="font-medium">Raise Maintenance</span>
                  </Link>
                  <Link
                    href="/audit"
                    onClick={() => setIsQuickActionsOpen(false)}
                    className="flex items-center gap-3 px-3.5 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-[#2563EB] transition-colors"
                  >
                    <ClipboardCheck className="w-4 h-4 text-slate-600" />
                    <span className="font-medium">Start Audit</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="h-6 w-px bg-slate-200 hidden sm:block" />

          {/* Notification Bell */}
          <div className="relative" ref={notificationsRef}>
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-xl relative transition-colors"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white animate-pulse" />
            </button>

            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-slate-200 rounded-2xl shadow-2xl py-3 z-50 animate-fade-in">
                <div className="px-4 pb-2.5 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-slate-900">Notifications</span>
                    <span className="text-xs bg-rose-100 text-rose-600 font-bold px-2 py-0.5 rounded-full">
                      5 Unread
                    </span>
                  </div>
                  <button className="text-xs text-[#2563EB] hover:underline font-medium">
                    Mark all as read
                  </button>
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                  <div className="p-3.5 bg-rose-50/50 hover:bg-rose-50 border-l-4 border-l-rose-500 transition-colors cursor-pointer">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-slate-900">⚠ Laptop Overdue</p>
                        <p className="text-xs text-slate-600 mt-0.5">
                          MacBook Pro (AF-0018) allocated to Priya Sharma is 2 days overdue.
                        </p>
                        <p className="text-[10px] text-slate-400 mt-1">10 minutes ago</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 bg-purple-50/40 hover:bg-purple-50 border-l-4 border-l-purple-500 transition-colors cursor-pointer">
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-slate-900">Meeting Room Reminder</p>
                        <p className="text-xs text-slate-600 mt-0.5">
                          Conference Room B2 booked for &quot;Executive Sync&quot; at 2:00 PM.
                        </p>
                        <p className="text-[10px] text-slate-400 mt-1">45 minutes ago</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 bg-emerald-50/40 hover:bg-emerald-50 border-l-4 border-l-emerald-500 transition-colors cursor-pointer">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-slate-900">Maintenance Approved</p>
                        <p className="text-xs text-slate-600 mt-0.5">
                          Screen repair for Dell XPS (AF-0002) approved. Tech assigned.
                        </p>
                        <p className="text-[10px] text-slate-400 mt-1">2 hours ago</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-2.5 px-4 border-t border-slate-100 text-center">
                  <Link
                    href="/notifications"
                    onClick={() => setIsNotificationsOpen(false)}
                    className="text-xs font-medium text-[#2563EB] hover:underline"
                  >
                    View all notifications
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Messages Button */}
          <button
            onClick={() => router.push("/notifications")}
            className="p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-xl relative transition-colors"
            title="Messages"
          >
            <MessageSquare className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#2563EB] rounded-full ring-2 ring-white" />
          </button>

          <div className="h-6 w-px bg-slate-200 hidden sm:block" />

          {/* Profile Badge */}
          <div className="flex items-center gap-2.5 pl-1 hover:opacity-90 transition-opacity cursor-pointer">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#1D4ED8] to-[#3B82F6] flex items-center justify-center text-white font-bold text-sm shadow-xs ring-2 ring-blue-50">
              KJ
            </div>
            <div className="hidden md:block text-left">
              <p className="font-semibold text-xs text-[#111418] leading-none">Kushal Joshi</p>
              <p className="text-[11px] text-slate-500 mt-1 font-medium">Head of Asset Operations</p>
            </div>
          </div>
        </div>
      </header>

      {/* Universal Search Modal (Command Palette) */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in">
          <div
            className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Input Header */}
            <div className="p-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50/50">
              <Search className="w-5 h-5 text-[#2563EB] shrink-0" />
              <input
                type="text"
                autoFocus
                placeholder="Search Asset Tag (e.g. AF-0021), Employee (e.g. Raj), Department, Room, Vehicle..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setIsSearchOpen(false)}
                className="px-2 py-1 text-xs font-semibold text-slate-500 bg-slate-200/70 hover:bg-slate-200 rounded-lg transition-colors"
              >
                ESC
              </button>
            </div>

            {/* Quick Filter Tabs */}
            <div className="px-4 py-2 border-b border-slate-100 bg-white flex items-center gap-2 overflow-x-auto">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">
                Filter:
              </span>
              {["All", "Asset Tag", "Employee", "Department", "Room", "Vehicle"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSearchQuery(filter === "All" ? "" : filter === "Asset Tag" ? "AF-" : filter)}
                  className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors whitespace-nowrap"
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Search Results */}
            <div className="max-h-[400px] overflow-y-auto p-2 space-y-1 divide-y divide-slate-100">
              {searchResults.length > 0 ? (
                searchResults.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setIsSearchOpen(false);
                      router.push(item.href);
                    }}
                    className="p-3 hover:bg-blue-50/60 rounded-xl cursor-pointer transition-colors flex items-center justify-between group pt-3 first:pt-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className={clsx(
                        "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs shadow-xs",
                        item.type === "Asset Tag" ? "bg-[#2563EB]/10 text-[#2563EB]" :
                        item.type === "Employee" ? "bg-emerald-100 text-emerald-700" :
                        item.type === "Department" ? "bg-purple-100 text-purple-700" :
                        item.type === "Room" ? "bg-amber-100 text-amber-700" :
                        "bg-slate-100 text-slate-700"
                      )}>
                        {item.type === "Asset Tag" && <Laptop className="w-5 h-5" />}
                        {item.type === "Employee" && <User className="w-5 h-5" />}
                        {item.type === "Department" && <Building className="w-5 h-5" />}
                        {item.type === "Room" && <Sparkles className="w-5 h-5" />}
                        {item.type === "Vehicle" && <Car className="w-5 h-5" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-slate-900 group-hover:text-[#2563EB] transition-colors">
                            {item.tag}
                          </span>
                          <span className="text-xs px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium">
                            {item.type}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-0.5">
                          {item.title} • <span className="font-semibold">{item.category}</span> ({item.holder})
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={clsx(
                        "text-xs font-medium px-2.5 py-1 rounded-full border",
                        item.status === "Available" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                        item.status === "Allocated" ? "bg-blue-50 text-blue-700 border-blue-200" :
                        item.status === "Reserved" ? "bg-purple-50 text-purple-700 border-purple-200" :
                        "bg-slate-100 text-slate-700 border-slate-200"
                      )}>
                        {item.status}
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#2563EB] group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-12 text-center text-slate-500">
                  <p className="text-sm font-medium">No results matching &quot;{searchQuery}&quot;</p>
                  <p className="text-xs text-slate-400 mt-1">Try searching by asset tag (AF-0021), employee name (Raj), or room</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-3 bg-slate-50 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-3">
                <span><kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded">↑↓</kbd> to navigate</span>
                <span><kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded">ENTER</kbd> to select</span>
              </div>
              <span>AssetFlow Universal Search</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
