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
    return currentTabTickets.filter((ticket) =>
      ticket.id.toLowerCase().includes(lowercasedFilter)
    );
  }, [searchTerm, tickets, activeTab]);

  const tabNames = Object.keys(tickets);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header setSearchTerm={setSearchTerm} />
      <main>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="p-4">
          <TabsList>
            {tabNames.map((name) => (
              // --- THIS IS THE UPDATED LINE ---
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
