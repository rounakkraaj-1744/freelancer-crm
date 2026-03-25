export type Stage = "Lead" | "Proposal" | "Negotiation" | "Closed" | "Won";

export interface Contact {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  source: string | null;
  notes: string | null;
  score: number;
  stage: Stage;
  lastContact: Date | null;
  createdAt: Date;
}

export interface HistoryItem {
  id: string;
  contactId: string;
  type: "email" | "call" | "note" | "ai_nudge";
  content: string;
  direction: "inbound" | "outbound" | "system";
  createdAt: Date;
}

export interface PipelineData {
  stage: Stage;
  contacts: Contact[];
}
