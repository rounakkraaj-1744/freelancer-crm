"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, Clock } from "lucide-react";
import { formatDate, getScoreColor } from "@/lib/utils";
import { Contact } from "@/lib/types";
import Link from "next/link";

export function ContactCard({ contact }: { contact: Contact }) {
  return (
    <Link href={`/contacts/${contact.id}`}>
      <Card className="hover-lift border border-border overflow-hidden bg-white/95 backdrop-blur-sm cursor-pointer group shadow-sm hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3 pb-1.5">
          <CardTitle className="text-sm font-bold text-olive group-hover:text-sage transition-colors">
            {contact.name}
          </CardTitle>
          <Badge className={`${getScoreColor(contact.score)} border-none`}>
            {contact.score}
          </Badge>
        </CardHeader>
        <CardContent className="p-3 pt-0">
          <div className="flex flex-col gap-1.5 text-[11px] text-muted-foreground mt-1.5">
            {contact.email && (
              <div className="flex items-center gap-2">
                <Mail className="h-3 w-3" />
                <span>{contact.email}</span>
              </div>
            )}
            {contact.phone && (
              <div className="flex items-center gap-2">
                <Phone className="h-3 w-3" />
                <span>{contact.phone}</span>
              </div>
            )}
            <div className="flex items-center gap-2 mt-auto pt-2 border-t border-border/30">
              <Clock className="h-3 w-3" />
              <span>{formatDate(contact.lastContact)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
