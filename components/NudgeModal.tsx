"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, Sparkles, Wand2, Check, RefreshCw, Send, Save } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function NudgeModal({
  isOpen,
  onClose,
  contact,
}: {
  isOpen: boolean;
  onClose: () => void;
  contact: { id: string; name: string };
}) {
  const [nudge, setNudge] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateNudge = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/nudges", {
        method: "POST",
        body: JSON.stringify({ contactId: contact.id }),
      });
      const data = await res.json();
      setNudge(data.message);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(nudge);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl bg-background border-border shadow-2xl p-0 overflow-hidden rounded-[32px]">
        <div className="bg-olive p-10 text-cream relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -z-10" />
            <DialogHeader className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-sage rounded-2xl flex items-center justify-center shadow-lg">
                   <Sparkles className="h-6 w-6 text-cream" />
                </div>
                <div className="space-y-0.5">
                   <span className="text-[10px] font-black text-white/50 uppercase tracking-widest">AI Intelligence</span>
                   <DialogTitle className="text-3xl font-black tracking-tight text-white leading-none">Drafting for {contact.name}</DialogTitle>
                </div>
              </div>
              <DialogDescription className="text-white/60 font-medium text-base text-balance leading-relaxed">
                Analyzing relationship history to generate a high-conversion follow-up using Llama 3.1.
              </DialogDescription>
            </DialogHeader>
        </div>

        <div className="p-10 space-y-8">
          {!nudge ? (
            <div className="p-12 border-4 border-dashed border-border rounded-[32px] flex flex-col items-center justify-center bg-cream/40 text-center space-y-6">
              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-xl border border-border">
                 <Wand2 className="h-10 w-10 text-sage animate-pulse" />
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-black text-olive uppercase tracking-tight">No draft generated</h4>
                <p className="text-sm font-bold text-olive/40 uppercase tracking-widest">Ready to initiate neural engagement?</p>
              </div>
              <Button 
                onClick={generateNudge} 
                className="w-full h-16 bg-sage hover:bg-olive text-white shadow-2xl transition-all active:scale-95 font-black text-lg rounded-2xl"
                disabled={loading}
              >
                {loading ? (
                   <div className="flex items-center gap-3">
                      <RefreshCw className="h-5 w-5 animate-spin" /> GENERATING...
                   </div>
                ) : "GENERATE WITH LLAMA 3.1"}
              </Button>
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="relative p-8 bg-cream border border-border rounded-[32px] shadow-inner group overflow-hidden">
                <div className="absolute top-0 right-0">
                   <Badge className="bg-olive text-white/80 rounded-bl-3xl border-none font-black text-[10px] py-2 px-6 tracking-widest uppercase">Draft</Badge>
                </div>
                <p className="text-lg font-bold leading-relaxed text-olive italic whitespace-pre-wrap pt-4">"{nudge}"</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={copyToClipboard} 
                  variant="outline" 
                  className="w-full h-14 border-border text-olive font-black bg-white shadow-lg hover:bg-cream rounded-2xl"
                >
                  {copied ? <Check className="h-5 w-5 mr-3 text-sage" /> : <Copy className="h-5 w-5 mr-3" />}
                  {copied ? "COPIED TO CLIPBOARD" : "COPY TEXT"}
                </Button>
                <Button 
                  onClick={generateNudge}
                  variant="outline"
                  className="w-full h-14 border-border text-olive font-black bg-white shadow-lg hover:bg-cream rounded-2xl"
                  disabled={loading}
                >
                  <RefreshCw className={cn("h-5 w-5 mr-3", loading && "animate-spin")} /> REGENERATE
                </Button>
              </div>
              
              <div className="pt-6 border-t border-border flex gap-4">
                 <Button className="flex-1 h-14 bg-olive hover:bg-sage text-cream font-black rounded-2xl shadow-xl transition-all">
                    <Save className="h-5 w-5 mr-3" /> SAVE DRAFT
                 </Button>
                 <Button className="flex-1 h-14 bg-sage hover:bg-olive text-cream font-black rounded-2xl shadow-xl transition-all">
                    <Send className="h-5 w-5 mr-3" /> SEND NOW
                 </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
