import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Copy, Check, ArrowRight, Trash2, Loader2 } from "lucide-react";
import { useTicketStore } from "../store/ticketStore";

// Helper function for Priority background color
const getPriorityColor = (priority) => {
  switch (priority) {
    case "P1":
    case "P2":
      return "bg-red-500 text-white";
    case "P3":
      return "bg-yellow-400 text-black";
    case "P4":
    case "P5":
      return "bg-green-500 text-white";
    default:
      return "bg-gray-400 text-white";
  }
};

// Helper function for SLA background color
const getSlaColor = (sla) => {
  if (sla === "" || sla === null) return "bg-gray-400 text-white";
  if (sla >= 80) return "bg-red-500 text-white";
  if (sla >= 60) return "bg-yellow-400 text-black";
  return "bg-green-500 text-white";
};

export const TicketCard = ({ ticket }) => {
  const loadingTicketId = useTicketStore((state) => state.loadingTicketId);
  const setLoadingTicketId = useTicketStore(
    (state) => state.setLoadingTicketId
  );
  const updateTicket = useTicketStore((state) => state.updateTicket);
  const moveTicket = useTicketStore((state) => state.moveTicket);
  const deleteTicket = useTicketStore((state) => state.deleteTicket);

  const handleDelayedAction = (action) => {
    setLoadingTicketId(ticket.id);
    action();
    setTimeout(() => {
      setLoadingTicketId(null);
    }, 2000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(ticket.id);
  };

  // This updates the value as the user types
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedValue =
      name === "sla" ? (value === "" ? "" : parseInt(value, 10)) : value;
    updateTicket(ticket.id, { [name]: updatedValue });
  };

  // NEW: This function handles the logic for when the SLA input loses focus
  const handleSlaBlur = () => {
    if (ticket.sla === "" || ticket.sla === null || ticket.sla === 0) {
      updateTicket(ticket.id, { sla: 1 });
    }
  };

  const handlePriorityChange = (newPriority) => {
    updateTicket(ticket.id, { priority: newPriority });
  };

  const handleDelete = () => {
    if (
      window.confirm(`Are you sure you want to delete ticket ${ticket.id}?`)
    ) {
      deleteTicket(ticket.id);
    }
  };

  const renderMoveButton = () => {
    const buttonDetails = {
      plan: {
        text: "Mark as Reviewed",
        icon: <ArrowRight className="ml-2 h-4 w-4" />,
        nextStatus: "action",
        variant: "outline",
      },
      action: {
        text: "Mark as Complete",
        icon: <Check className="ml-2 h-4 w-4" />,
        nextStatus: "backlog",
        variant: "secondary",
      },
      backlog: {
        text: "Move to Plan",
        icon: <ArrowRight className="ml-2 h-4 w-4" />,
        nextStatus: "plan",
        variant: "outline",
      },
    };
    const details = buttonDetails[ticket.status];
    if (!details) return null;
    const isAnyButtonLoading = loadingTicketId !== null;
    const isThisButtonLoading = loadingTicketId === ticket.id;
    return (
      <Button
        onClick={() =>
          handleDelayedAction(() => moveTicket(ticket.id, details.nextStatus))
        }
        disabled={isAnyButtonLoading}
        size="sm"
        variant={details.variant}
        className="cursor-pointer w-40"
      >
        {isThisButtonLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            {" "}
            {details.text} {details.icon}{" "}
          </>
        )}
      </Button>
    );
  };

  const isAnyButtonLoading = loadingTicketId !== null;

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span>{ticket.id}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCopy}
              className="cursor-pointer"
              disabled={isAnyButtonLoading}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold">
            <Select
              value={ticket.priority}
              onValueChange={handlePriorityChange}
              disabled={isAnyButtonLoading}
            >
              <SelectTrigger
                className={`w-[60px] px-2 py-1 rounded-md focus:ring-0 focus:ring-offset-0 ${getPriorityColor(
                  ticket.priority
                )}`}
              >
                <SelectValue placeholder="P" />
              </SelectTrigger>
              {/* UPDATED: Added a solid background and border to the dropdown content */}
              <SelectContent className="bg-cyan-200 border">
                <SelectItem
                  value="P1"
                  className="cursor-pointer hover:bg-blue-100"
                >
                  P1
                </SelectItem>
                <SelectItem
                  value="P2"
                  className="cursor-pointer hover:bg-blue-100"
                >
                  P2
                </SelectItem>
                <SelectItem
                  value="P3"
                  className="cursor-pointer hover:bg-blue-100"
                >
                  P3
                </SelectItem>
                <SelectItem
                  value="P4"
                  className="cursor-pointer hover:bg-blue-100"
                >
                  P4
                </SelectItem>
                <SelectItem
                  value="P5"
                  className="cursor-pointer hover:bg-blue-100"
                >
                  P5
                </SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center">
              <Input
                type="number"
                name="sla"
                value={ticket.sla}
                onChange={handleInputChange}
                onBlur={handleSlaBlur} // UPDATED: Added the onBlur handler
                disabled={isAnyButtonLoading}
                className={`w-[50px] text-center px-1 py-1 h-auto rounded-l-md rounded-r-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${getSlaColor(
                  ticket.sla
                )}`}
              />
              <span
                className={`px-2 py-1 rounded-r-md ${getSlaColor(ticket.sla)}`}
              >
                % SLA
              </span>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        <div className="pb-1 border-b">
          <p className="text-sm text-muted-foreground italic">
            {ticket.shortDescription || "No description provided."}
          </p>
        </div>
        <div>
          <label className="text-sm font-medium">Last Update</label>
          <Textarea
            name="lastUpdate"
            value={ticket.lastUpdate}
            onChange={handleInputChange}
            disabled={isAnyButtonLoading}
          />
        </div>
        <div>
          <label className="text-sm font-medium">
            My Findings (for discussion)
          </label>
          <Textarea
            name="findings"
            value={ticket.findings}
            onChange={handleInputChange}
            disabled={isAnyButtonLoading}
          />
        </div>
        <div>
          <label className="text-sm font-medium">Action Plan</label>
          <Textarea
            name="actionPlan"
            value={ticket.actionPlan}
            onChange={handleInputChange}
            disabled={isAnyButtonLoading}
          />
        </div>
        <div className="flex justify-between items-center pt-2">
          <div>
            {(ticket.status === "backlog" || ticket.status === "action") && (
              <Button
                onClick={handleDelete}
                variant="destructive"
                size="icon"
                className="cursor-pointer"
                disabled={isAnyButtonLoading}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            )}
          </div>
          {renderMoveButton()}
        </div>
      </CardContent>
    </Card>
  );
};
