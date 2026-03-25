"use client";

import { useState, useMemo } from "react";
import { Contact, Stage } from "@/lib/types";
import { ContactCard } from "./ContactCard";
import { motion, AnimatePresence } from "framer-motion";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useDroppable } from "@dnd-kit/core";

const STAGES: Stage[] = ["Lead", "Proposal", "Negotiation", "Closed", "Won"];

function DroppableColumn({ 
  stage, 
  contacts, 
  children 
}: { 
  stage: Stage; 
  contacts: Contact[]; 
  children: React.ReactNode 
}) {
  const { setNodeRef } = useDroppable({
    id: stage,
    data: { stage, type: 'Column' }
  });

  return (
    <div
      ref={setNodeRef}
      className="flex flex-col gap-3 min-h-[500px] p-3 rounded-2xl bg-white/50 border border-border shadow-sm hover:border-sage/30 transition-all group/column relative"
    >
      {/* Overlay to handle dropping into empty columns */}
      <div className="absolute inset-0 z-0" />
      {children}
    </div>
  );
}

interface SortableContactCardProps {
  contact: Contact;
}

function SortableContactCard({ contact }: SortableContactCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: contact.id, data: { contact, type: 'Contact' } });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="cursor-grab active:cursor-grabbing outline-none"
    >
      <ContactCard contact={contact} />
    </div>
  );
}

export function PipelineKanban({ 
  contacts, 
  onMoveContact 
}: { 
  contacts: Contact[], 
  onMoveContact: (id: string, stage: Stage) => void 
}) {
  const [activeContact, setActiveContact] = useState<Contact | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const contact = active.data.current?.contact as Contact;
    setActiveContact(contact);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    // Logic for moving between containers is handled by the data
    const activeData = active.data.current;
    const overData = over.data.current;

    if (!activeData || !overData) return;

    const overStage = overData.stage || (overData.contact?.stage as Stage);
    const activeStage = activeData.contact?.stage as Stage;

    if (activeStage !== overStage) {
      onMoveContact(activeId as string, overStage as Stage);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveContact(null);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory lg:snap-none scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
        {STAGES.map((stage) => (
          <div key={stage} className="shrink-0 w-[240px] sm:w-[280px] snap-center first:pl-4 last:pr-4 sm:first:pl-0 sm:last:pr-0 self-start">
            <div className="flex items-center justify-between mb-3 px-2">
              <h3 className="text-[10px] font-black text-cream bg-olive px-3 py-1.5 rounded-lg shadow-md uppercase tracking-wider">
                {stage}
              </h3>
              <span className="text-[10px] text-sage font-black italic mr-1 bg-sage/10 px-1.5 py-0.5 rounded-md">
                {contacts.filter((c) => c.stage === stage).length}
              </span>
            </div>

            <SortableContext
              id={stage}
              items={contacts.filter((c) => c.stage === stage).map(c => c.id)}
              strategy={verticalListSortingStrategy}
            >
              <DroppableColumn stage={stage} contacts={contacts}>
                <AnimatePresence mode="popLayout">
                  {contacts
                    .filter((c) => c.stage === stage)
                    .map((contact) => (
                      <SortableContactCard key={contact.id} contact={contact} />
                    ))}
                </AnimatePresence>
                
                {contacts.filter((c) => c.stage === stage).length === 0 && (
                  <div className="flex flex-col items-center justify-center flex-1 text-[9px] text-olive/20 font-black uppercase tracking-widest py-20 pointer-events-none border-2 border-dashed border-border/20 rounded-xl">
                    Drop Leads Here
                  </div>
                )}
                
                <button className="mt-auto py-3 border border-dashed border-border/50 rounded-xl text-[9px] font-black text-sage uppercase tracking-widest hover:bg-white hover:-translate-y-px transition-all group/add shadow-sm cursor-pointer z-10">
                   + Add New Target 
                </button>
              </DroppableColumn>
            </SortableContext>
          </div>
        ))}
      </div>

      <DragOverlay dropAnimation={{
          sideEffects: defaultDropAnimationSideEffects({
            styles: {
              active: {
                opacity: "0.5",
              },
            },
          }),
        }}>
        {activeContact ? (
          <div className="rotate-3 scale-105 shadow-2xl rounded-2xl overflow-hidden cursor-grabbing">
            <ContactCard contact={activeContact} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}