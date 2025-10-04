import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogOverlay, // 1. Import DialogOverlay
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTicketStore } from "../store/ticketStore";
import { PlusCircle } from "lucide-react";

export const AddTicketDialog = () => {
  const [id, setId] = useState("");
  const [caller, setCaller] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [priority, setPriority] = useState("P3");
  const [sla, setSla] = useState(100);
  const [isOpen, setIsOpen] = useState(false);
  const addTicket = useTicketStore((state) => state.addTicket);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!id) return;

    addTicket({
      id,
      caller,
      shortDescription,
      priority,
      sla,
      lastUpdate: "",
      findings: "",
      actionPlan: "",
    });

    setId("");
    setCaller("");
    setShortDescription("");
    setPriority("P3");
    setSla(100);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">
          <PlusCircle className="mr-2 h-4 w-4" /> Add Ticket
        </Button>
      </DialogTrigger>

      {/* The DialogOverlay creates the background. backdrop-blur-sm adds the effect. */}
      {/* The default bg-background/80 on the overlay provides the dark tint. */}
      <DialogOverlay className="backdrop-blur-sm" />

      <DialogContent className="sm:max-w-[425px] bg-yellow-100">
        <DialogHeader>
          <DialogTitle>Add New Ticket</DialogTitle>
          <DialogDescription>
            Enter the details for the new ticket. It will be added to the
            'Backlog'.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="id" className="text-right">
                Ticket ID
              </Label>
              <Input
                id="id"
                value={id}
                onChange={(e) => setId(e.target.value.toUpperCase())}
                className="col-span-3"
                placeholder="e.g., INC123456"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="caller" className="text-right">
                Caller
              </Label>
              <Input
                id="caller"
                value={caller}
                onChange={(e) => setCaller(e.target.value)}
                className="col-span-3"
                placeholder="John Doe"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="shortDescription" className="text-right">
                Description
              </Label>
              <Input
                id="shortDescription"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                className="col-span-3"
                placeholder="A brief summary..."
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="priority" className="text-right">
                Priority
              </Label>
              <Select onValueChange={setPriority} defaultValue={priority}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a priority" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem
                    value="P1"
                    className="cursor-pointer hover:bg-blue-200"
                  >
                    P1
                  </SelectItem>
                  <SelectItem
                    value="P2"
                    className="cursor-pointer hover:bg-blue-200"
                  >
                    P2
                  </SelectItem>
                  <SelectItem
                    value="P3"
                    className="cursor-pointer hover:bg-blue-200"
                  >
                    P3
                  </SelectItem>
                  <SelectItem
                    value="P4"
                    className="cursor-pointer hover:bg-blue-200"
                  >
                    P4
                  </SelectItem>
                  <SelectItem
                    value="P5"
                    className="cursor-pointer hover:bg-blue-200"
                  >
                    P5
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="sla" className="text-right">
                SLA %
              </Label>
              <Input
                id="sla"
                type="number"
                value={sla}
                onChange={(e) => setSla(parseInt(e.target.value))}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="cursor-pointer">
              Add Ticket
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
