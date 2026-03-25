"use client";

import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { User, Bell, Shield, Zap, Palette, Globe, Save } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-4xl mx-auto w-full space-y-8">
        <div className="space-y-1 mt-4">
          <h1 className="text-2xl font-black tracking-tight text-olive uppercase leading-none">System Preferences</h1>
          <p className="text-olive/50 text-xs font-bold uppercase tracking-widest">Configure your autonomous workspace & AI identity.</p>
        </div>

        <div className="space-y-6">
          <Card className="border-border shadow-sm rounded-2xl overflow-hidden bg-white">
            <CardHeader className="border-b border-border/50 p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sage/10 text-sage flex items-center justify-center">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-base font-black text-olive uppercase tracking-tight">Profile Identity</CardTitle>
                  <CardDescription className="text-xs font-medium">How your AI persona identifies itself to clients.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-olive/40 uppercase tracking-widest">Display Name</label>
                  <Input defaultValue="Rounak Raj" className="h-10 rounded-xl bg-cream border-border focus:ring-sage/20 text-sm font-bold" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-olive/40 uppercase tracking-widest">Professional Title</label>
                  <Input defaultValue="High-Ticket Freelance Developer" className="h-10 rounded-xl bg-cream border-border focus:ring-sage/20 text-sm font-bold" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border shadow-sm rounded-2xl overflow-hidden bg-white">
            <CardHeader className="border-b border-border/50 p-6">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-taupe/10 text-taupe flex items-center justify-center">
                   <Zap className="h-5 w-5" />
                 </div>
                 <div>
                   <CardTitle className="text-base font-black text-olive uppercase tracking-tight">Intelligence Parameters</CardTitle>
                   <CardDescription className="text-xs font-medium">Calibrate the Llama 3.1 engine behavior.</CardDescription>
                 </div>
               </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-sm font-bold text-olive">Autonomous Nudges</p>
                  <p className="text-[11px] text-olive/50 font-medium tracking-tight">Allow AI to draft follow-ups automatically after 48h of silence.</p>
                </div>
                <Switch defaultChecked className="data-[state=checked]:bg-sage" />
              </div>
              <div className="flex items-center justify-between border-t border-border/30 pt-6">
                 <div className="space-y-0.5">
                   <p className="text-sm font-bold text-olive">Linguistic Mimicry</p>
                   <p className="text-[11px] text-olive/50 font-medium tracking-tight">Analyze sent messages to match your specific writing style.</p>
                 </div>
                 <Switch defaultChecked className="data-[state=checked]:bg-sage" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border shadow-sm rounded-2xl overflow-hidden bg-white">
            <CardHeader className="border-b border-border/50 p-6">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-olive/5 text-olive flex items-center justify-center">
                   <Bell className="h-5 w-5" />
                 </div>
                 <div>
                   <CardTitle className="text-base font-black text-olive uppercase tracking-tight">Alert Protocol</CardTitle>
                   <CardDescription className="text-xs font-medium">Control when the CRM demands your attention.</CardDescription>
                 </div>
               </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-sm font-bold text-olive">Urgent Lead Signal</p>
                  <p className="text-[11px] text-olive/50 font-medium tracking-tight">In-app and mobile alerts for leads with score &gt; 90.</p>
                </div>
                <Switch defaultChecked className="data-[state=checked]:bg-sage" />
              </div>
            </CardContent>
            <CardFooter className="bg-cream/30 p-4 border-t border-border/50 flex justify-end">
               <Button className="bg-sage hover:bg-olive text-white h-10 px-6 rounded-xl font-black text-xs shadow-md transition-all hover:-translate-y-px cursor-pointer">
                  <Save className="h-4 w-4 mr-2" /> SAVE PREFERENCES
               </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}