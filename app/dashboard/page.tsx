"use client";

import { useState, useEffect } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { PipelineKanban } from "@/components/PipelineKanban";
import { NudgeModal } from "@/components/NudgeModal";
import { ContactModal } from "@/components/ContactModal";
import { Button } from "@/components/ui/button";
import { Plus, Sparkles, Users, Clock, Zap, Target, Search, Brain, History, TrendingUp, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Contact } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useCRMStore } from "@/stores/useCRMStore";

// Enhanced Mock Data
const MOCK_CONTACTS: Contact[] = [
  { id: "1", name: "Alex Rivera", email: "alex@example.com", phone: null, company: "TechFlow", source: "Upwork", notes: null, score: 92, stage: "Lead", lastContact: new Date(), createdAt: new Date() },
  { id: "2", name: "Jordan Smith", email: "jordan@design.co", phone: null, company: "Studio J", source: "Referral", notes: null, score: 78, stage: "Proposal", lastContact: new Date(Date.now() - 86400000), createdAt: new Date() },
  { id: "3", name: "Sarah Chen", email: "sarah@api.io", phone: null, company: "API Labs", source: "LinkedIn", notes: null, score: 54, stage: "Negotiation", lastContact: new Date(Date.now() - 172800000), createdAt: new Date() },
  { id: "4", name: "Mike Ross", email: "mike@legal.com", phone: null, company: "Zane Specter", source: "Cold Email", notes: null, score: 32, stage: "Lead", lastContact: null, createdAt: new Date() },
  { id: "5", name: "Emma Wilson", email: "emma@growth.com", phone: null, company: "GrowthX", source: "Twitter", notes: null, score: 95, stage: "Won", lastContact: new Date(), createdAt: new Date() },
];

export default function Dashboard() {
  const { contacts, setContacts, updateContactStage } = useCRMStore();
  const [isNudgeOpen, setIsNudgeOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    if (contacts.length === 0) {
      setContacts(MOCK_CONTACTS);
    }
  }, [contacts.length, setContacts]);

  const handleMoveContact = (contactId: string, newStage: any) => {
    updateContactStage(contactId, newStage);
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <DashboardHeader onSearch={(q) => console.log('Searching:', q)} />
      
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8 max-w-[1400px] mx-auto w-full">
        {/* Stats Row - Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-white border-border shadow-sm rounded-xl overflow-hidden group hover:shadow-md transition-all">
            <CardHeader className="pb-2 p-5 flex flex-row items-center justify-between">
              <div className="space-y-1">
                <CardDescription className="text-olive/50 font-black uppercase text-[9px] tracking-widest leading-none">Pipeline Value</CardDescription>
                <CardTitle className="text-2xl font-black text-olive tracking-tight">$12,450</CardTitle>
              </div>
              <div className="w-10 h-10 rounded-lg bg-sage/10 flex items-center justify-center text-sage">
                <Target className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <div className="flex items-center gap-1.5 text-[10px] font-black text-sage bg-sage/10 px-2 py-1 rounded-md w-fit">
                <TrendingUp className="h-3 w-3" />
                <span>+12.4% MONTHLY GROWTH</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-border shadow-sm rounded-xl overflow-hidden group hover:shadow-md transition-all">
            <CardHeader className="pb-2 p-5 flex flex-row items-center justify-between">
              <div className="space-y-1">
                <CardDescription className="text-olive/50 font-black uppercase text-[9px] tracking-widest leading-none">Active Relationships</CardDescription>
                <CardTitle className="text-2xl font-black text-olive tracking-tight">24</CardTitle>
              </div>
              <div className="w-10 h-10 rounded-lg bg-taupe/10 flex items-center justify-center text-taupe">
                <Users className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <div className="flex items-center gap-1.5 text-[10px] font-black text-taupe bg-taupe/10 px-2 py-1 rounded-md w-fit">
                <Zap className="h-3 w-3" />
                <span>4 URGENT LEADS</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-olive border-olive shadow-sm rounded-xl overflow-hidden group hover:shadow-md transition-all sm:col-span-2 lg:col-span-1">
            <CardHeader className="pb-2 p-5 flex flex-row items-center justify-between text-cream">
              <div className="space-y-1">
                <CardDescription className="text-white/50 font-black uppercase text-[9px] tracking-widest leading-none">AI Intelligence</CardDescription>
                <CardTitle className="text-2xl font-black tracking-tight">156</CardTitle>
              </div>
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-sage">
                <Sparkles className="h-5 w-5 animate-pulse" />
              </div>
            </CardHeader>
            <CardContent className="px-5 pb-5 text-cream">
              <div className="flex items-center gap-1.5 text-[10px] font-black text-white bg-white/10 px-2 py-1 rounded-md w-fit">
                <Clock className="h-3 w-3" />
                <span>85% RESPONSE RATE</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pipeline Section */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-0.5">
              <h2 className="text-2xl font-black tracking-tight text-olive uppercase leading-none">Global Pipeline</h2>
              <p className="text-olive/50 text-xs font-bold uppercase tracking-widest">Master your relationship velocity across all stages.</p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
               <Button 
                onClick={() => setIsContactOpen(true)}
                className="flex-1 sm:flex-none h-10 px-5 bg-sage hover:bg-olive text-cream rounded-xl font-black text-xs shadow-md transition-all hover:-translate-y-px cursor-pointer"
               >
                  <Plus className="h-4 w-4 mr-2" /> New Target
               </Button>
            </div>
          </div>
          
          <PipelineKanban contacts={contacts} onMoveContact={handleMoveContact} />
        </section>

        {/* Bottom Detailed Insight Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
           <Card className="xl:col-span-2 border-border shadow-sm bg-white rounded-2xl overflow-hidden">
             <CardHeader className="bg-background/50 border-b border-border/30 p-6">
                <div className="flex items-center justify-between">
                   <div>
                      <CardTitle className="text-xl font-black text-olive">Lead Activity</CardTitle>
                      <CardDescription className="font-bold text-[10px] text-olive/50 uppercase tracking-widest">Deep dive into recent engagement.</CardDescription>
                   </div>
                   <Button variant="ghost" className="text-sage font-black text-[10px] uppercase hover:bg-sage/10 rounded-lg px-3 py-1.5 h-auto">
                     Full Ledger <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                   </Button>
                </div>
             </CardHeader>
             <CardContent className="p-6 space-y-3">
                {contacts.slice(0, 4).map(contact => (
                  <div key={contact.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-2xl hover:bg-cream transition-all border border-transparent hover:border-border/30 group cursor-grab active:cursor-grabbing"
                    draggable
                    onDragStart={(e: React.DragEvent) => {
                      (e.target as HTMLElement).classList.add("opacity-50");
                      e.dataTransfer.setData("contactId", contact.id);
                    }}
                    onDragEnd={(e: React.DragEvent) => {
                      (e.target as HTMLElement).classList.remove("opacity-50");
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-olive text-white flex items-center justify-center font-black text-base shadow-md transform group-hover:scale-110 transition-transform">
                        {contact.name[0]}
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-sm font-bold text-olive">{contact.name}</p>
                        <p className="text-[10px] text-olive/40 font-black uppercase tracking-tight">{contact.company || contact.email || 'Independent'}</p>
                      </div>
                    </div>
                    <div className="mt-2 sm:mt-0 text-left sm:text-right flex items-center sm:block gap-4 font-black">
                      <p className="text-[9px] text-white bg-sage px-2 py-0.5 rounded-md inline-block leading-none uppercase cursor-default">{contact.stage}</p>
                      <p className="text-[9px] text-olive/40 mt-1 flex items-center justify-end gap-1 font-bold">
                        <Clock className="h-2.5 w-2.5" />
                        {contact.lastContact ? contact.lastContact.toLocaleDateString() : 'NEVER'}
                      </p>
                    </div>
                  </div>
                ))}
             </CardContent>
           </Card>

           <Card className="border-border shadow-sm bg-olive text-white rounded-2xl overflow-hidden relative group">
             <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-3xl -z-10" />
             <div className="absolute bottom-0 left-0 w-32 h-32 bg-sage/5 rounded-full blur-[60px] -z-10" />

             <CardHeader className="p-8">
                <CardTitle className="text-xl font-black flex items-center gap-3 tracking-tight uppercase">
                  <Sparkles className="h-6 w-6 text-sage" />
                  Neural Nudges
                </CardTitle>
                <CardDescription className="text-white/60 font-bold uppercase tracking-widest text-[9px]">Recent autopilot communications.</CardDescription>
             </CardHeader>
             <CardContent className="p-8 pt-0 space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all cursor-pointer">
                    <div className="flex items-center justify-between font-black text-sage text-[9px] uppercase tracking-widest mb-2">
                      <span>Alex Rivera</span>
                      <span className="opacity-40">2h ago</span>
                    </div>
                    <p className="italic text-white/90 text-[12px] leading-relaxed font-medium">"Hi Alex, following our Upwork chat about Rust APIs, I've drafted a proposal..."</p>
                  </div>
                ))}
                <Button className="w-full bg-sage text-white font-black h-11 rounded-xl shadow-lg hover:-translate-y-px transition-all text-xs cursor-pointer">
                   Generate Bulk Nudges
                </Button>
             </CardContent>
           </Card>
        </div>
      </main>

      {/* Hero FAB */}
      <Button 
        onClick={() => setIsContactOpen(true)}
        className="fixed bottom-6 right-6 h-12 w-12 rounded-xl bg-sage shadow-xl hover:bg-olive transition-all hover:-translate-y-1 active:translate-y-0 z-40 border-2 border-white cursor-pointer"
      >
        <Plus className="h-6 w-6 text-white stroke-3" />
      </Button>

      <ContactModal 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
      />
    </div>
  );
}
