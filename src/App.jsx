import React, { useState, useMemo } from "react";
import { Header } from "./components/Header";
import { KanbanBoard } from "./components/KanbanBoard";
import { useTicketStore } from "./store/ticketStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function App() {
  const { tickets, activeTab, setActiveTab } = useTicketStore();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTicketsForActiveTab = useMemo(() => {
    const currentTabTickets = tickets[activeTab] || [];

    if (!searchTerm) {
      return currentTabTickets;
    }

    const lowercasedFilter = searchTerm.toLowerCase();

    return currentTabTickets.filter((ticket) => {
      // Check against multiple fields
      const idMatch = ticket.id.toLowerCase().includes(lowercasedFilter);
      const priorityMatch = ticket.priority
        .toLowerCase()
        .includes(lowercasedFilter);
      const descriptionMatch = (ticket.shortDescription || "")
        .toLowerCase()
        .includes(lowercasedFilter);
      const updateMatch = (ticket.lastUpdate || "")
        .toLowerCase()
        .includes(lowercasedFilter);
      const findingsMatch = (ticket.findings || "")
        .toLowerCase()
        .includes(lowercasedFilter);
      const actionPlanMatch = (ticket.actionPlan || "")
        .toLowerCase()
        .includes(lowercasedFilter);

      return (
        idMatch ||
        priorityMatch ||
        descriptionMatch ||
        updateMatch ||
        findingsMatch ||
        actionPlanMatch
      );
    });
  }, [searchTerm, tickets, activeTab]);

  const tabNames = Object.keys(tickets);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header setSearchTerm={setSearchTerm} />
      <main>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="p-4">
          <TabsList>
            {tabNames.map((name) => (
              <TabsTrigger key={name} value={name} className="cursor-pointer">
                {name} ({tickets[name].length})
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeTab} forceMount={true} className="mt-4">
            <KanbanBoard tickets={filteredTicketsForActiveTab} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

export default App;
