"use client";

import { DashboardHeader } from "@/components/DashboardHeader";
import { ContactModal } from "@/components/ContactModal";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MoreHorizontal, Search, Filter, Plus, Mail, Phone, Calendar, ArrowRight, UserPlus, FileText } from "lucide-react";
import { formatDate, getScoreColor, cn } from "@/lib/utils";
import { useState } from "react";
import Link from "next/link";

// Mock data
const MOCK_CONTACTS = [
  { id: "1", name: "Alex Rivera", email: "alex@example.com", phone: "+1 234 567 890", company: "TechFlow", score: 92, lastContact: new Date(), stage: "Lead" },
  { id: "2", name: "Jordan Smith", email: "jordan@design.co", phone: "+1 098 765 432", company: "Studio J", score: 78, lastContact: new Date(Date.now() - 86400000), stage: "Proposal" },
  { id: "3", name: "Sarah Chen", email: "sarah@api.io", phone: "+1 555 123 456", company: "API Labs", score: 54, lastContact: new Date(Date.now() - 172800000), stage: "Negotiation" },
  { id: "4", name: "Mike Ross", email: "mike@legal.com", phone: "+1 888 999 000", company: "Zane Specter", score: 32, lastContact: null, stage: "Lead" },
];

export default function ContactsPage() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-2xl font-black tracking-tight text-olive uppercase leading-none">Global Roster</h1>
            <p className="text-olive/50 text-xs font-bold uppercase tracking-widest px-1">Managing {MOCK_CONTACTS.length} active relationships.</p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Button variant="outline" className="flex-1 md:flex-none border-border h-10 rounded-xl text-olive font-black bg-white hover:bg-cream shadow-sm px-4 text-xs hover:-translate-y-px transition-all cursor-pointer">
              <Filter className="h-4 w-4 mr-2" /> FILTER
            </Button>
            <Button 
              onClick={() => setIsContactOpen(true)}
              className="flex-1 md:flex-none bg-sage hover:bg-olive text-cream h-10 rounded-xl shadow-md transition-all font-black px-4 text-xs hover:-translate-y-px cursor-pointer"
            >
              <UserPlus className="h-4 w-4 mr-2" /> NEW CONTACT
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-border shadow-lg overflow-hidden p-1 sm:p-2">
          <div className="p-4 border-b border-border/50 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-80 group">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-olive/30 group-focus-within:text-sage transition-colors" />
              <Input placeholder="Search name, company, or email..." className="w-full pl-10 h-10 bg-cream border border-border rounded-lg focus:ring-2 focus:ring-sage/20 transition-all font-bold placeholder:font-medium text-sm" />
            </div>
            <div className="flex items-center gap-6 text-[11px] font-black text-olive/40 uppercase tracking-widest whitespace-nowrap">
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-sage" /> Active</div>
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-taupe" /> Cold</div>
            </div>
          </div>

          <div className="overflow-x-auto scrollbar-hide">
            <Table>
              <TableHeader className="bg-background/80">
                <TableRow className="hover:bg-transparent border-border/30">
                  <TableHead className="w-[260px] text-olive font-black uppercase text-[9px] tracking-widest py-4 px-6">Name & Collective</TableHead>
                  <TableHead className="text-olive font-black uppercase text-[9px] tracking-widest py-4">Intelligence</TableHead>
                  <TableHead className="text-olive font-black uppercase text-[9px] tracking-widest py-4">Engagement</TableHead>
                  <TableHead className="text-olive font-black uppercase text-[9px] tracking-widest py-4">Velocity</TableHead>
                  <TableHead className="text-right py-4 px-6"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_CONTACTS.map((contact) => (
                  <TableRow key={contact.id} className="group border-border/30 transition-all hover:bg-cream/40 cursor-pointer">
                    <TableCell className="py-5 px-6">
                      <Link href={`/contacts/${contact.id}`} className="block">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-olive text-white flex items-center justify-center font-black text-base shadow-md group-hover:bg-sage transition-colors">
                            {contact.name[0]}
                          </div>
                          <div className="space-y-0.5">
                            <p className="font-black text-base text-olive group-hover:text-sage transition-colors tracking-tight">{contact.name}</p>
                            <p className="text-[10px] text-olive/40 font-bold uppercase tracking-widest flex items-center gap-1.5">
                               <ArrowRight className="h-2.5 w-2.5 text-sage" /> {contact.company}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1.5 font-bold">
                        <div className="flex items-center gap-2.5 text-xs text-olive/60">
                          <Mail className="h-4 w-4 text-sage" /> {contact.email}
                        </div>
                        {contact.phone && (
                          <div className="flex items-center gap-2.5 text-xs text-olive/60">
                            <Phone className="h-4 w-4 text-sage" /> {contact.phone}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getScoreColor(contact.score)} px-4 py-1.5 rounded-xl border-none font-black text-[11px] shadow-sm`}>
                        {contact.score} SCORE
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2.5 text-xs text-olive/60 font-black uppercase tracking-widest">
                        <Calendar className="h-4 w-4 text-taupe" />
                        {formatDate(contact.lastContact)}
                      </div>
                    </TableCell>
                    <TableCell className="text-right px-10">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/contacts/${contact.id}`}>
                           <Button variant="ghost" size="icon" className="text-olive/40 hover:text-sage rounded-xl hover:bg-sage/10 h-10 w-10">
                             <FileText className="h-5 w-5" />
                           </Button>
                        </Link>
                        <Button variant="ghost" size="icon" className="text-olive/40 hover:text-sage rounded-xl hover:bg-sage/10 h-10 w-10">
                          <MoreHorizontal className="h-5 w-5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="p-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Button variant="ghost" size="sm" className="text-[10px] font-black uppercase tracking-widest text-olive/40 disabled:opacity-30" disabled>PREVIOUS</Button>
            <div className="flex items-center gap-2">
              {[1, 2, 3].map(i => (
                <Button key={i} size="sm" className={cn("h-8 w-8 p-0 rounded-lg font-black text-xs transition-all", i === 1 ? "bg-olive text-cream shadow-md" : "bg-transparent text-olive hover:bg-cream")}>{i}</Button>
              ))}
            </div>
            <Button variant="ghost" size="sm" className="text-[10px] font-black uppercase tracking-widest text-sage hover:bg-sage/10 px-3 rounded-lg">NEXT PAGE</Button>
          </div>
        </div>
      </main>

      <ContactModal 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
      />
    </div>
  );
}
