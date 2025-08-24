import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Copy, Check, ArrowRight, Trash2, Loader2 } from "lucide-react";
import { useTicketStore } from "../store/ticketStore";

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

const getSlaColor = (sla) => {
  if (sla >= 80) return "bg-red-500 text-white";
  if (sla >= 60) return "bg-yellow-400 text-black";
  return "bg-green-500 text-white";
};

export const TicketCard = ({ ticket }) => {
  // Get global loading state and the action to update it from the store
  const loadingTicketId = useTicketStore((state) => state.loadingTicketId);
  const setLoadingTicketId = useTicketStore(
    (state) => state.setLoadingTicketId
  );

  const updateTicket = useTicketStore((state) => state.updateTicket);
  const moveTicket = useTicketStore((state) => state.moveTicket);
  const deleteTicket = useTicketStore((state) => state.deleteTicket);

  const handleDelayedAction = (action) => {
    // Set the global loading state with this ticket's ID
    setLoadingTicketId(ticket.id);
    action();
    // After 2 seconds, clear the global loading state
    setTimeout(() => {
      setLoadingTicketId(null);
    }, 2000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(ticket.id);
  };

  const handleInputChange = (e) => {
    updateTicket(ticket.id, { [e.target.name]: e.target.value });
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
            {details.text} {details.icon}
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
            <span
              className={`px-2 py-1 rounded-md ${getPriorityColor(
                ticket.priority
              )}`}
            >
              {ticket.priority}
            </span>
            <span className={`px-2 py-1 rounded-md ${getSlaColor(ticket.sla)}`}>
              {ticket.sla}% SLA
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="pt-2 pb-1 border-b">
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
          />
        </div>
        <div>
          <label className="text-sm font-medium">Action Plan</label>
          <Textarea
            name="actionPlan"
            value={ticket.actionPlan}
            onChange={handleInputChange}
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
                <Trash2 className="h-4 w-4 text-red-600" />
              </Button>
            )}
          </div>
          {renderMoveButton()}
        </div>
      </CardContent>
    </Card>
  );
};
