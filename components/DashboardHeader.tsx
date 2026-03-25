"use client";

import { Bell, Search, User, LogOut, Menu, X, Sparkles, LayoutDashboard, Users, KanbanSquare, MessageSquare, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Contacts", icon: Users, href: "/contacts" },
  { label: "AI Nudges", icon: MessageSquare, href: "/nudges" },
  { label: "Settings", icon: Zap, href: "/settings" },
];

export function DashboardHeader({ onSearch }: { onSearch?: (q: string) => void }) {
  const [searchValue, setSearchValue] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    onSearch?.(e.target.value);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand & Desktop Nav */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 group transition-all cursor-pointer">
             <div className="w-8 h-8 rounded-lg bg-sage flex items-center justify-center shadow-lg transition-transform">
                <Sparkles className="h-4 w-4 text-cream" />
             </div>
             <span className="text-lg font-black tracking-tight text-sage hidden sm:inline-block">Safelance</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
             {NAV_ITEMS.map((item) => (
                <Link 
                  key={item.href} 
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-lg text-[13px] font-bold transition-all",
                    pathname === item.href 
                      ? "bg-sage text-white shadow-sm" 
                      : "text-olive/70 hover:bg-sage/10 hover:text-sage"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
             ))}
          </nav>
        </div>

        {/* Desktop Search & Controls */}
        <div className="flex items-center gap-3">
          <div className="relative hidden md:block group">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-olive/40 transition-colors group-focus-within:text-sage" />
            <Input
              type="text"
              placeholder="Quick search..."
              className="w-48 xl:w-64 pl-9 bg-cream border border-border transition-all focus:w-80 shadow-sm focus:ring-2 focus:ring-sage/20 rounded-xl"
              value={searchValue}
              onChange={handleSearch}
            />
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-sage text-white rounded-xl shadow-md font-black text-[10px] uppercase tracking-wider cursor-default">
            <div className="w-1.5 h-1.5 bg-cream rounded-full animate-pulse" />
            <span>AI Active</span>
          </div>

          <div className="flex items-center gap-1 border-l border-border pl-3 ml-2 h-8">
             <Button variant="ghost" size="icon" className="text-olive/60 hover:text-sage rounded-xl">
                <Bell className="h-5 w-5" />
             </Button>
              <Link href="/settings">
                <Button variant="ghost" size="icon" className="text-olive/60 hover:text-sage rounded-xl">
                    <User className="h-5 w-5" />
                </Button>
              </Link>
             <Button 
                variant="ghost" 
                size="icon" 
                className="lg:hidden text-olive/60 hover:text-sage rounded-xl"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
             >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
             </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full bg-background border-b border-border p-6 space-y-4 animate-in slide-in-from-top-4 duration-300">
          <nav className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => (
              <Link 
                key={item.href} 
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-2xl text-base font-bold transition-all",
                  pathname === item.href 
                    ? "bg-sage text-white shadow-lg" 
                    : "text-olive/70 active:bg-sage/10"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            ))}
          </nav>
          
          <div className="pt-4 border-t border-border space-y-4">
             <div className="relative group">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-olive/40" />
                <Input
                  type="text"
                  placeholder="Search contacts..."
                  className="w-full pl-12 bg-cream border border-border h-12 rounded-2xl"
                  value={searchValue}
                  onChange={handleSearch}
                />
             </div>
             <Button variant="outline" className="w-full justify-start h-12 rounded-2xl border-border text-olive font-bold">
               <LogOut className="h-5 w-5 mr-3" /> Log Out
             </Button>
          </div>
        </div>
      )}
    </header>
  );
}
