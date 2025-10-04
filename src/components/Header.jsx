import React from "react";
import { AddTicketDialog } from "./AddTicketDialog";
import { CopyNotesButton } from "./CopyNotesButton";
import { Input } from "./ui/input";

export const Header = ({ setSearchTerm }) => {
  return (
    <header className="flex flex-col md:flex-row justify-between items-center p-4 border-b gap-4">
      {/* --- THIS IS THE UPDATED SECTION --- */}
      <div className="flex items-center gap-3">
        <img src="/logo.png" alt="App Logo" className="h-10 w-10" />
        <h1 className="text-2xl font-bold">Plan..Action..Repeat 🔄</h1>
      </div>
      {/* ------------------------------------ */}
      <div className="w-full md:w-1/3">
        <Input
          type="search"
          placeholder="Search by Ticket ID, Caller, or Description..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-2">
        <CopyNotesButton />
        <AddTicketDialog />
      </div>
    </header>
  );
};
