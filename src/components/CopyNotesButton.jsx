import React from "react";
import { Button } from "./ui/button";
import { ClipboardCheck } from "lucide-react";
import { useTicketStore } from "../store/ticketStore";

export const CopyNotesButton = () => {
  const activeTab = useTicketStore((state) => state.activeTab);
  const tickets = useTicketStore((state) => state.tickets[activeTab] || []);

  const handleCopy = () => {
    const planTickets = tickets.filter((t) => t.status === "plan");

    if (planTickets.length === 0) {
      navigator.clipboard.writeText("No items in the 'Plan' column to report.");
      return;
    }

    const formattedNotes = planTickets
      .map((ticket) => {
        return `
Ticket:
    ${ticket.id} (${ticket.priority}, ${ticket.sla}% SLA)

Description: 
    ${ticket.shortDescription}

Last Update: 
    ${ticket.lastUpdate || "N/A"}
    
My Findings: 
    ${ticket.findings || "N/A"}
    
--------------------------------------
            `.trim();
      })
      .join("\n\n");

    const finalReport = `=== Daily Review: ${activeTab} ===\n\n${formattedNotes}`;

    navigator.clipboard.writeText(finalReport);
    // You could add a toast notification here to confirm the copy
    alert("Plan notes copied to clipboard!");
  };

  return (
    <Button onClick={handleCopy} variant="outline">
      <ClipboardCheck className="mr-2 h-4 w-4" /> Copy Plan Notes
    </Button>
  );
};
