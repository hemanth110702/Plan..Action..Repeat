import React from "react";
import { KanbanColumn } from "./KanbanColumn";
import { useTicketStore } from "../store/ticketStore";
import { Button } from "./ui/button"; // from shadcn

// The component now accepts 'tickets' as a prop
export const KanbanBoard = ({ tickets }) => {
  const moveAllToPlan = useTicketStore((state) => state.moveAllToPlan);

  // The filtering logic now works on the 'tickets' prop
  const backlogTickets = tickets.filter((t) => t.status === "backlog");
  const planTickets = tickets.filter((t) => t.status === "plan");
  const actionTickets = tickets.filter((t) => t.status === "action");

  return (
    <div className="p-4">
      <div className="flex justify-end mb-4">
        <Button onClick={moveAllToPlan}>Move All Backlog to Plan</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KanbanColumn title="Backlog" tickets={backlogTickets} />
        <KanbanColumn title="Plan" tickets={planTickets} />
        <KanbanColumn title="Action" tickets={actionTickets} />
      </div>
    </div>
  );
};
