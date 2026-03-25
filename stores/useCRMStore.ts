import { create } from "zustand";
import { Contact, Stage } from "@/lib/types";

interface CRMState {
  contacts: Contact[];
  isLoading: boolean;
  setContacts: (contacts: Contact[]) => void;
  updateContactStage: (id: string, newStage: Stage) => void;
  addContact: (contact: Contact) => void;
  setLoading: (loading: boolean) => void;
}

export const useCRMStore = create<CRMState>((set) => ({
  contacts: [],
  isLoading: false,
  setContacts: (contacts) => set({ contacts }),
  setLoading: (isLoading) => set({ isLoading }),
  updateContactStage: (id, newStage) => 
    set((state) => ({
      contacts: state.contacts.map((c) => 
        c.id === id ? { ...c, stage: newStage } : c
      )
    })),
  addContact: (contact) => 
    set((state) => ({
      contacts: [contact, ...state.contacts]
    })),
}));
