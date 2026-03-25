"use client";

import { DashboardHeader } from "@/components/DashboardHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { NudgeModal } from "@/components/NudgeModal";
import { Mail, Phone, Calendar, MapPin, Building2, Sparkles, MessageSquare, PhoneCall, Info, Clock, ChevronRight } from "lucide-react";
import { useState, use } from "react";
import { formatDate, getScoreColor } from "@/lib/utils";
import { HistoryItem } from "@/lib/types";

// Mock contact function
const getContact = (id: string) => ({
  id,
  name: "Alex Rivera",
  email: "alex@example.com",
  phone: "+1 234 567 890",
  company: "TechFlow Solutions",
  source: "Upwork",
  stage: "Proposal",
  score: 92,
  notes: "Interested in a long-term Rust API development project. Previously worked on cloud infrastructure.",
  location: "Austin, TX",
  lastContact: new Date(Date.now() - 3600000 * 5),
});

const MOCK_HISTORY: HistoryItem[] = [
  { id: "1", contactId: "1", type: "email", content: "Sent introductory proposal for the Rust API project.", direction: "outbound", createdAt: new Date(Date.now() - 86400000) },
  { id: "2", contactId: "1", type: "call", content: "Quick sync call to discuss technical requirements. Very impressed with the cloud stack.", direction: "inbound", createdAt: new Date(Date.now() - 172800000) },
  { id: "3", contactId: "1", type: "note", content: "Lead seems highly technical. Focus on performance metrics in next chat.", direction: "system", createdAt: new Date(Date.now() - 259200000) },
  { id: "4", contactId: "1", type: "ai_nudge", content: "Followed up regarding the API documentation review.", direction: "outbound", createdAt: new Date(Date.now() - 345600000) },
];

export default function ContactDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const contact = getContact(id);
  const [isNudgeOpen, setIsNudgeOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-cream/30">
      <DashboardHeader />
      
      <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-6xl mx-auto w-full space-y-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium mb-2">
            <a href="/contacts" className="hover:text-sage transition-colors">Contacts</a>
            <ChevronRight className="h-4 w-4" />
            <span className="text-olive">{contact.name}</span>
        </div>

        <div className="bg-white/70 backdrop-blur-md rounded-2xl border border-border/40 p-6 shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-start gap-5">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-xl bg-sage/20 text-olive flex items-center justify-center font-bold text-2xl shadow-inner">
                {contact.name[0]}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-black tracking-tight text-olive uppercase leading-none">{contact.name}</h1>
                  <Badge className={`${getScoreColor(contact.score)} py-0.5 px-2 border-none text-[10px] font-black`}>{contact.score}</Badge>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground font-medium">
                  <div className="flex items-center gap-1.5"><Building2 className="h-4 w-4 text-sage/70" /> {contact.company}</div>
                  <div className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-sage/70" /> {contact.location}</div>
                  <div className="flex items-center gap-1.5"><Calendar className="h-4 w-4 text-sage/70" /> Since {contact.lastContact.toLocaleDateString()}</div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 w-full md:w-auto mt-2 sm:mt-0">
              <Button 
                onClick={() => setIsNudgeOpen(true)}
                className="flex-1 md:flex-none bg-sage hover:bg-olive text-cream rounded-xl px-4 h-10 shadow-md transition-all hover:-translate-y-px cursor-pointer font-black text-xs"
              >
                <Sparkles className="h-4 w-4 mr-2" /> GENERATE NUDGE
              </Button>
              <Button variant="outline" className="flex-1 md:flex-none border-border text-olive hover:bg-cream px-4 h-10 rounded-xl font-black text-xs hover:-translate-y-px transition-all cursor-pointer">
                EDIT DETAIL
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 pt-8 border-t border-border/30">
            <div className="p-4 bg-cream/40 rounded-2xl space-y-3">
              <div className="text-[10px] font-bold text-sage uppercase tracking-widest flex items-center gap-1"><Mail className="h-3 w-3" /> Email</div>
              <p className="text-sm font-semibold text-olive truncate">{contact.email}</p>
            </div>
            <div className="p-4 bg-cream/40 rounded-2xl space-y-3">
              <div className="text-[10px] font-bold text-sage uppercase tracking-widest flex items-center gap-1"><Phone className="h-3 w-3" /> Phone</div>
              <p className="text-sm font-semibold text-olive">{contact.phone}</p>
            </div>
            <div className="p-4 bg-cream/40 rounded-2xl space-y-3">
              <div className="text-[10px] font-bold text-sage uppercase tracking-widest flex items-center gap-1"><Info className="h-3 w-3" /> Status</div>
              <Badge variant="taupe" className="text-xs font-bold">{contact.stage}</Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* History Timeline */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold tracking-tight text-olive px-2 flex items-center gap-2">
              <Clock className="h-5 w-5 text-sage" />
              Interaction Timeline
            </h2>
            
            <div className="space-y-4 relative before:absolute before:inset-0 before:left-4 before:h-full before:w-0.5 before:bg-linear-to-b before:from-sage/40 before:to-taupe/20 before:rounded-full">
              {MOCK_HISTORY.map((item) => (
                <div key={item.id} className="relative pl-10 animate-in fade-in slide-in-from-left-2 transition-all">
                  <div className={`absolute left-2.5 top-0.5 w-3.5 h-3.5 rounded-full border-2 border-white ring-4 ${item.type === 'ai_nudge' ? 'bg-sage ring-sage/10' : item.direction === 'outbound' ? 'bg-taupe ring-taupe/10' : 'bg-olive ring-olive/10'}`} />
                  <div className="bg-white/60 p-5 rounded-2xl border border-border/30 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                         {item.type === 'email' && <Mail className="h-3.5 w-3.5 text-sage" />}
                         {item.type === 'call' && <PhoneCall className="h-3.5 w-3.5 text-olive" />}
                         {item.type === 'note' && <MessageSquare className="h-3.5 w-3.5 text-taupe" />}
                         {item.type === 'ai_nudge' && <Sparkles className="h-3.5 w-3.5 text-sage" />}
                        <span className="text-xs font-bold uppercase tracking-wider text-olive/70">{item.type.replace('_', ' ')}</span>
                      </div>
                      <span className="text-[10px] font-medium text-muted-foreground">{formatDate(item.createdAt)}</span>
                    </div>
                    <p className="text-sm text-olive/90 leading-relaxed font-normal">{item.content}</p>
                    <div className="mt-3 flex gap-2">
                       <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md uppercase ${item.direction === 'outbound' ? 'bg-taupe/20 text-olive' : 'bg-cream/50 text-muted-foreground'}`}>
                        {item.direction}
                       </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight text-olive px-2 flex items-center gap-2">
              <Info className="h-5 w-5 text-taupe" />
              Intelligence
            </h2>
            <div className="bg-taupe/10 rounded-3xl p-6 border border-taupe/20 space-y-6 h-fit sticky top-24">
               <div>
                  <h3 className="text-xs font-bold text-olive/60 uppercase tracking-widest mb-3">CRM NOTES</h3>
                  <p className="text-sm text-olive/80 italic leading-relaxed">
                    "{contact.notes}"
                  </p>
               </div>
               
               <div className="space-y-3 pt-6 border-t border-taupe/20">
                  <h3 className="text-xs font-bold text-olive/60 uppercase tracking-widest">KEY INSIGHTS</h3>
                  <div className="flex items-center gap-3 text-xs font-bold text-olive bg-white/40 p-2.5 rounded-xl border border-white/60">
                     <span className="text-xl">🚀</span>
                     Urgent: Technical review needed
                  </div>
                  <div className="flex items-center gap-3 text-xs font-bold text-olive bg-white/40 p-2.5 rounded-xl border border-white/60">
                     <span className="text-xl">💰</span>
                     High Budget Potential
                  </div>
               </div>

                <Button className="w-full bg-olive text-cream hover:bg-sage rounded-xl h-11 font-black text-xs hover:-translate-y-px transition-all cursor-pointer">
                  ADD NEW NOTE
                </Button>
            </div>
          </div>
        </div>
      </main>

      <NudgeModal
        isOpen={isNudgeOpen}
        onClose={() => setIsNudgeOpen(false)}
        contact={{ id: contact.id, name: contact.name }}
      />
    </div>
  );
}