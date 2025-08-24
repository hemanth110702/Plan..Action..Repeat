import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useTicketStore = create(
  persist(
    (set, get) => ({
      // We will store tickets in an object, keyed by tab name
      tickets: {
        Incidents: [
          {
            id: 'INC123456',
            shortDescription: 'User cannot access shared drive.',
            priority: 'P3',
            sla: 98,
            lastUpdate: '',
            findings: '',
            actionPlan: '',
            status: 'backlog'
          },
          { id: 'INC987654', shortDescription: 'User cannot access email.', priority: 'P5', sla: 99, lastUpdate: '', findings: '', actionPlan: '', status: 'plan' },
        ],
        Tasks: [],
        SR: [],
      },
      activeTab: 'Incidents',

      setActiveTab: (tabName) => set({ activeTab: tabName }),

      addTicket: (newTicket) => {
        const activeTab = get().activeTab;
        set((state) => ({
          tickets: {
            ...state.tickets,
            [activeTab]: [...state.tickets[activeTab], { ...newTicket, status: 'backlog' }],
          },
        }));
      },

      updateTicket: (ticketId, updatedFields) => {
        const activeTab = get().activeTab;
        set((state) => ({
          tickets: {
            ...state.tickets,
            [activeTab]: state.tickets[activeTab].map((t) =>
              t.id === ticketId ? { ...t, ...updatedFields } : t
            ),
          },
        }));
      },

      deleteTicket: (ticketId) => {
        const activeTab = get().activeTab;
        set((state) => ({
          tickets: {
            ...state.tickets,
            [activeTab]: state.tickets[activeTab].filter((t) => t.id !== ticketId),
          }
        }))
      },

      moveTicket: (ticketId, newStatus) => {
        const activeTab = get().activeTab;
        set((state) => ({
          tickets: {
            ...state.tickets,
            [activeTab]: state.tickets[activeTab].map((t) =>
              t.id === ticketId ? { ...t, status: newStatus } : t
            ),
          },
        }));
      },

      moveAllToPlan: () => {
        const activeTab = get().activeTab;
        set((state) => ({
          tickets: {
            ...state.tickets,
            [activeTab]: state.tickets[activeTab].map((t) =>
              t.status === 'backlog' ? { ...t, status: 'plan' } : t
            ),
          }
        }))
      }

    }),
    {
      name: 'ticket-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);