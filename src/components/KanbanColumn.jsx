import React from "react";
import { TicketCard } from "./TicketCard";

export const KanbanColumn = ({ title, tickets }) => {
  return (
    <div className="bg-muted/50 rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4 text-center">
        {title} ({tickets.length})
      </h2>
      <div className="space-y-4">
        {tickets.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
};
