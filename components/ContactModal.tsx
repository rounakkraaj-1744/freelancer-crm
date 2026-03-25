"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Mail, Building2, Phone, MapPin, Plus } from "lucide-react";
import { useState } from "react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[450px] bg-white rounded-3xl border-border p-0 overflow-hidden shadow-2xl">
        <DialogHeader className="p-8 bg-cream/40 border-b border-border/40">
          <DialogTitle className="text-2xl font-black text-olive uppercase tracking-tight flex items-center gap-2">
            <Plus className="h-6 w-6 text-sage" /> New Client Target
          </DialogTitle>
          <DialogDescription className="text-xs font-bold text-olive/50 uppercase tracking-widest">
            Initialize a new relationship in the Safelance ecosystem.
          </DialogDescription>
        </DialogHeader>
        
        <div className="p-8 space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-olive/40 uppercase tracking-widest ml-1">Full Name</label>
              <div className="relative group">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-olive/30 group-focus-within:text-sage transition-colors" />
                <Input placeholder="e.g. Alex Rivera" className="pl-10 h-11 bg-cream border-border rounded-xl focus:ring-2 focus:ring-sage/20 font-bold" />
              </div>
            </div>
            
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-olive/40 uppercase tracking-widest ml-1">Email Collective</label>
              <div className="relative group">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-olive/30 group-focus-within:text-sage transition-colors" />
                <Input placeholder="alex@flow.io" className="pl-10 h-11 bg-cream border-border rounded-xl focus:ring-2 focus:ring-sage/20 font-bold" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-1.5">
                 <label className="text-[10px] font-black text-olive/40 uppercase tracking-widest ml-1">Intelligence Title</label>
                 <div className="relative group">
                    <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-olive/30 group-focus-within:text-sage transition-colors" />
                    <Input placeholder="Tech Lead" className="pl-10 h-11 bg-cream border-border rounded-xl focus:ring-2 focus:ring-sage/20 font-bold text-xs" />
                 </div>
               </div>
               <div className="space-y-1.5">
                 <label className="text-[10px] font-black text-olive/40 uppercase tracking-widest ml-1">Territory</label>
                 <div className="relative group">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-olive/30 group-focus-within:text-sage transition-colors" />
                    <Input placeholder="Austin, TX" className="pl-10 h-11 bg-cream border-border rounded-xl focus:ring-2 focus:ring-sage/20 font-bold text-xs" />
                 </div>
               </div>
            </div>
          </div>
        </div>

        <DialogFooter className="p-8 pt-0 flex flex-col sm:flex-row gap-3">
          <Button variant="ghost" onClick={onClose} className="flex-1 font-black text-xs uppercase tracking-widest text-olive/40 hover:bg-cream/50 rounded-xl h-12 order-2 sm:order-1">
            Discard
          </Button>
          <Button className="flex-1 bg-sage hover:bg-olive text-white font-black text-xs uppercase tracking-widest rounded-xl h-12 shadow-lg shadow-sage/20 hover:-translate-y-px transition-all cursor-pointer order-1 sm:order-2">
            Create Contact
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
