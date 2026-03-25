"use client";

import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Send, Clock, History, Brain, MessageSquare, Filter, ChevronRight, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const PENDING_NUDGES = [
  { id: "1", name: "Alex Rivera", reason: "Follow up on Rust API proposal", score: 92, time: "2h ago" },
  { id: "2", name: "Jordan Smith", reason: "Check in on Studio J design brief", score: 78, time: "5h ago" },
  { id: "3", name: "Sarah Chen", reason: "Re-engage regarding Next.js audit", score: 54, time: "1d ago" },
];

const NUDGE_HISTORY = [
  { id: "h1", name: "Emma Wilson", content: "Great lead! Following up on the growth metrics we discussed.", status: "sent", date: "Mar 25, 2024" },
  { id: "h2", name: "Mike Ross", content: "Hi Mike, wanted to circle back on the legal tech integration.", status: "sent", date: "Mar 24, 2024" },
];

export default function NudgesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8 max-w-[1400px] mx-auto w-full">
        <div className="flex flex-col md:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
             <h1 className="text-2xl font-black tracking-tight text-olive uppercase leading-none flex items-center gap-3">
               <Sparkles className="h-6 w-6 text-sage" />
               AI Intelligence Hub
             </h1>
             <p className="text-olive/50 text-xs font-bold uppercase tracking-widest">Autonomous follow-ups and relationship velocity.</p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
             <Button variant="outline" className="flex-1 sm:flex-none h-10 px-4 rounded-xl border-border text-olive font-bold text-xs hover:bg-cream hover:-translate-y-px transition-all cursor-pointer">
                <Filter className="h-4 w-4 mr-2" /> Refine Model
             </Button>
             <Button className="flex-1 sm:flex-none h-10 px-5 bg-sage hover:bg-olive text-white rounded-xl font-bold text-xs shadow-md hover:-translate-y-px transition-all cursor-pointer">
                <Zap className="h-4 w-4 mr-2" /> Run Autopilot
             </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {/* Active Suggestions */}
           <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between px-2">
                 <h2 className="text-sm font-black text-olive uppercase tracking-[0.2em] flex items-center gap-2">
                    <Brain className="h-4 w-4 text-sage" /> Technical Suggestions
                 </h2>
                 <span className="text-[10px] bg-sage/10 text-sage font-black px-2 py-0.5 rounded-full uppercase">3 PRIORITY</span>
              </div>
              
              <div className="space-y-4">
                 {PENDING_NUDGES.map((nudge) => (
                   <Card key={nudge.id} className="border-border shadow-sm hover:shadow-md bg-white rounded-2xl overflow-hidden transition-all hover:-translate-y-px cursor-pointer group">
                      <CardContent className="p-5 flex items-center justify-between">
                         <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-cream text-olive flex items-center justify-center font-black text-sm">
                               {nudge.name[0]}
                            </div>
                            <div className="space-y-0.5">
                               <h3 className="font-bold text-olive text-sm flex items-center gap-2">
                                 {nudge.name}
                                 <Badge variant="taupe" className="text-[9px] font-black h-4 px-1.5">{nudge.score}</Badge>
                               </h3>
                               <p className="text-xs text-olive/60 font-medium">{nudge.reason}</p>
                            </div>
                         </div>
                         <div className="flex items-center gap-3">
                            <span className="text-[10px] text-olive/30 font-bold uppercase tracking-tighter">{nudge.time}</span>
                            <Button className="bg-sage/10 hover:bg-sage text-sage hover:text-white h-8 w-8 rounded-lg p-0 transition-all">
                               <Send className="h-4 w-4" />
                            </Button>
                         </div>
                      </CardContent>
                   </Card>
                 ))}
              </div>

              {/* Stats / Insights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div className="p-6 bg-olive text-white rounded-3xl space-y-4 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                       <History className="h-20 w-20" />
                    </div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-white/50">Engagement Yield</h4>
                    <p className="text-3xl font-black tracking-tighter">84.2%</p>
                    <p className="text-[10px] font-bold text-sage">+12% from last cycle</p>
                 </div>
                 <div className="p-6 bg-cream border border-border/50 rounded-3xl space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-olive/40">Model Confidence</h4>
                    <p className="text-3xl font-black tracking-tighter text-olive">High</p>
                    <p className="text-[10px] font-bold text-olive/40">CALIBRATED ON 1.2K MSGS</p>
                 </div>
              </div>
           </div>

           {/* Activity History Sidebar */}
           <div className="space-y-6">
              <h2 className="text-sm font-black text-olive uppercase tracking-[0.2em] flex items-center gap-2 px-2">
                 <History className="h-4 w-4 text-taupe" /> Recent Actions
              </h2>
              <div className="bg-white border border-border/50 rounded-3xl p-6 space-y-6">
                 {NUDGE_HISTORY.map((item) => (
                   <div key={item.id} className="space-y-2 relative pl-6 before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-sage before:rounded-full">
                      <div className="flex items-center justify-between">
                         <span className="text-[10px] font-black text-olive uppercase tracking-wider">{item.name}</span>
                         <span className="text-[9px] text-olive/30 font-bold">{item.date}</span>
                      </div>
                      <p className="text-xs text-olive/70 italic leading-relaxed line-clamp-2">"{item.content}"</p>
                   </div>
                 ))}
                 <Button variant="ghost" className="w-full text-sage font-black text-[10px] uppercase hover:bg-sage/5 tracking-widest rounded-xl">
                    Full Communication Ledger <ChevronRight className="h-3 w-3 ml-1" />
                 </Button>
              </div>

              {/* Tip Card */}
              <div className="p-6 bg-taupe/10 border border-taupe/20 rounded-3xl space-y-3">
                 <div className="flex items-center gap-2 text-taupe">
                    <Zap className="h-4 w-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">AI Tip</span>
                 </div>
                 <p className="text-xs text-olive/80 font-medium leading-relaxed">
                    Personalized nudges for "High Score" leads typically result in 3x higher response rates when sent between 9-10 AM.
                 </p>
              </div>
           </div>
        </div>
      </main>
    </div>
  );
}
