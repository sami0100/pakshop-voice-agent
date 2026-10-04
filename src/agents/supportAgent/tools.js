import { getCustomerId } from "../../utils/customerIdentity";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api/v1";

async function fetchJson(url, options) {
  const response = await fetch(url, options);
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.message ||
      `Request failed with status ${response.status}`
    );
  }

  return data;
}

export function createSupportTools({
  setIsSupportOpen,
  setIsSupportFormOpen,
  setIsReturnFormOpen,
  loadSupportTickets,
  loadReturnRequests,
} = {}) {
  const customerId = () => getCustomerId();

  const openSupportCenter = async ({
    refreshTickets = false,
    refreshReturns = false,
  } = {}) => {
    if (refreshTickets && typeof loadSupportTickets === "function") {
      await loadSupportTickets();
    }

    if (refreshReturns && typeof loadReturnRequests === "function") {
      await loadReturnRequests();
    }

    if (typeof setIsSupportFormOpen === "function") {
      setIsSupportFormOpen(false);
    }

    if (typeof setIsReturnFormOpen === "function") {
      setIsReturnFormOpen(false);
    }

    if (typeof setIsSupportOpen === "function") {
      setIsSupportOpen(true);
    }
  };

  const getCustomerOrders = async () => {
    const orders = await fetchJson(
      `${API_URL}/orders/customer/${customerId()}`
    );

    return Array.isArray(orders) ? orders : [];
  };

  const resolveOrder = async ({
    orderNumber,
    orderPosition = 1,
  } = {}) => {
    const orders = await getCustomerOrders();

    if (orders.length === 0) {
      return {
        success: false,
        message: "No orders were found for this customer.",
      };
    }

    if (orderNumber) {
      const normalized = String(orderNumber).trim().toLowerCase();
      const match = orders.find((order) =>
        String(order.orderNumber || order.id || "")
          .trim()
          .toLowerCase() === normalized
      );

      if (!match) {
        return {
          success: false,
          message: `Order ${orderNumber} was not found for this customer.`,
        };
      }

      return { success: true, order: match };
    }

    const requestedPosition = Math.max(
      1,
      Number(orderPosition) || 1
    );

    const selected = orders[requestedPosition - 1];

    if (!selected) {
      return {
        success: false,
        message:
          `This customer has only ${orders.length} order${orders.length === 1 ? "" : "s"}, so order position ${requestedPosition} is unavailable.`,
      };
    }

    return { success: true, order: selected };
  };

  const trackOrder = {
    type: "function",
    name: "track_order",
    description:
      "Track one of the customer's orders. Use orderPosition 1 for latest, 2 for second latest/second last, 3 for third latest, or provide an exact orderNumber.",
    parameters: {
      type: "object",
      properties: {
        orderNumber: {
          type: "string",
          description: "Exact PakShop order number when the customer gives one.",
        },
        orderPosition: {
          type: "number",
          description:
            "Position in newest-first order history: 1 = latest, 2 = second latest/second last, 3 = third latest.",
        },
      },
    },
    execute: async (args = {}) => {
      try {
        const resolved = await resolveOrder(args);
        if (!resolved.success) return resolved;

        const order = resolved.order;

        return {
          success: true,
          order: {
            orderNumber: order.orderNumber || order.id,
            status: order.status,
            trackingStatus: order.trackingStatus,
            delivery: order.delivery,
            paymentMethod: order.paymentMethod,
            totalAmount: order.totalAmount,
            date: order.date,
          },
        };
      } catch (error) {
        console.error("track_order error:", error);
        return {
          success: false,
          message: "Could not retrieve order details.",
        };
      }
    },
  };

  const getMyOrders = {
    type: "function",
    name: "get_my_orders",
    description:
      "Retrieve the customer's order history in newest-first order. Use this when the customer asks to see orders or when you need to identify latest, second latest, or older orders.",
    parameters: {
      type: "object",
      properties: {},
    },
    execute: async () => {
      try {
        const orders = await getCustomerOrders();

        if (orders.length === 0) {
          return {
            success: false,
            message: "No orders found.",
          };
        }

        return {
          success: true,
          orders: orders.map((order, index) => ({
            position: index + 1,
            orderNumber: order.orderNumber || order.id,
            status: order.status,
            totalAmount: order.totalAmount,
            paymentMethod: order.paymentMethod,
            deliveryCity: order.delivery?.city,
            date: order.date,
          })),
        };
      } catch (error) {
        console.error("get_my_orders error:", error);
        return {
          success: false,
          message: "Could not retrieve order history.",
        };
      }
    },
  };

  const getMyTickets = {
    type: "function",
    name: "get_my_tickets",
    description:
      "Show the customer's support tickets and open the PakShop Support Center on screen. Use this when the customer asks to see, list, show, or open their support tickets or complaints.",
    parameters: {
      type: "object",
      properties: {},
    },
    execute: async () => {
      try {
        const tickets = await fetchJson(
          `${API_URL}/support/tickets/customer/${customerId()}`
        );

        await openSupportCenter({ refreshTickets: true });

        return {
          success: true,
          tickets: Array.isArray(tickets) ? tickets : [],
          count: Array.isArray(tickets) ? tickets.length : 0,
          message:
            Array.isArray(tickets) && tickets.length > 0
              ? `You have ${tickets.length} support ticket${tickets.length === 1 ? "" : "s"}. The Support Center is open on screen.`
              : "You do not have any support tickets yet. The Support Center is open on screen.",
        };
      } catch (error) {
        console.error("get_my_tickets error:", error);
        return {
          success: false,
          message: "Could not retrieve support tickets.",
        };
      }
    },
  };

  const createSupportTicket = {
    type: "function",
    name: "create_support_ticket",
    description:
      "Create a support ticket for one of the customer's orders. You can use an exact orderNumber, or orderPosition where 1 is latest, 2 is second latest/second last, and 3 is third latest. After creation the Support Center opens and refreshes on screen.",
    parameters: {
      type: "object",
      properties: {
        orderNumber: {
          type: "string",
          description: "Exact order number if the customer supplied it.",
        },
        orderPosition: {
          type: "number",
          description:
            "Newest-first order position: 1 = latest, 2 = second latest/second last, 3 = third latest.",
        },
        issue: {
          type: "string",
        },
        priority: {
          type: "string",
          enum: ["Low", "Medium", "High"],
        },
      },
      required: ["issue"],
    },
    execute: async ({
      orderNumber,
      orderPosition = 1,
      issue,
      priority = "Medium",
    }) => {
      try {
        const resolved = await resolveOrder({ orderNumber, orderPosition });
        if (!resolved.success) return resolved;

        const selectedOrderNumber =
          resolved.order.orderNumber || resolved.order.id;

        const ticket = await fetchJson(
          `${API_URL}/support/tickets`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ticketId: `TKT-${Date.now()}`,
              customerId: customerId(),
              orderNumber: selectedOrderNumber,
              issue,
              priority,
            }),
          }
        );

        await openSupportCenter({ refreshTickets: true });

        return {
          success: true,
          ticket,
          message:
            `Support ticket ${ticket.ticketId} was created for order ${selectedOrderNumber}. The Support Center is open and refreshed on screen.`,
        };
      } catch (error) {
        console.error("create_support_ticket error:", error);
        return {
          success: false,
          message: "Could not create the support ticket.",
        };
      }
    },
  };

  const getTicketStatus = {
    type: "function",
    name: "get_ticket_status",
    description:
      "Retrieve a support ticket by ticket ID and open the Support Center on screen.",
    parameters: {
      type: "object",
      properties: {
        ticketId: { type: "string" },
      },
      required: ["ticketId"],
    },
    execute: async ({ ticketId }) => {
      try {
        const ticket = await fetchJson(
          `${API_URL}/support/tickets/${ticketId}`
        );

        await openSupportCenter({ refreshTickets: true });

        return {
          success: true,
          ticket,
          message: `Ticket ${ticketId} is ${ticket.status}. The Support Center is open on screen.`,
        };
      } catch (error) {
        console.error("get_ticket_status error:", error);
        return {
          success: false,
          message: "Support ticket not found.",
        };
      }
    },
  };

  const getMyReturns = {
    type: "function",
    name: "get_my_returns",
    description:
      "Show the customer's return requests and open the PakShop Support Center on screen.",
    parameters: {
      type: "object",
      properties: {},
    },
    execute: async () => {
      try {
        const returns = await fetchJson(
          `${API_URL}/returns/customer/${customerId()}`
        );

        await openSupportCenter({ refreshReturns: true });

        return {
          success: true,
          returns: Array.isArray(returns) ? returns : [],
          count: Array.isArray(returns) ? returns.length : 0,
          message:
            Array.isArray(returns) && returns.length > 0
              ? `You have ${returns.length} return request${returns.length === 1 ? "" : "s"}. The Support Center is open on screen.`
              : "You do not have any return requests yet. The Support Center is open on screen.",
        };
      } catch (error) {
        console.error("get_my_returns error:", error);
        return {
          success: false,
          message: "Could not retrieve return requests.",
        };
      }
    },
  };

  const requestReturn = {
    type: "function",
    name: "request_return",
    description:
      "Create a return request for one of the customer's orders. Use orderPosition 1 for latest, 2 for second latest/second last, or provide an exact orderNumber. The Support Center opens and refreshes after creation.",
    parameters: {
      type: "object",
      properties: {
        orderNumber: {
          type: "string",
        },
        orderPosition: {
          type: "number",
          description:
            "Newest-first order position: 1 = latest, 2 = second latest/second last, 3 = third latest.",
        },
        reason: {
          type: "string",
        },
      },
      required: ["reason"],
    },
    execute: async ({
      orderNumber,
      orderPosition = 1,
      reason,
    }) => {
      try {
        const resolved = await resolveOrder({ orderNumber, orderPosition });
        if (!resolved.success) return resolved;

        const selectedOrderNumber =
          resolved.order.orderNumber || resolved.order.id;

        const returnRequest = await fetchJson(
          `${API_URL}/returns`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              returnId: `RET-${Date.now()}`,
              customerId: customerId(),
              orderNumber: selectedOrderNumber,
              reason,
              status: "Requested",
            }),
          }
        );

        await openSupportCenter({ refreshReturns: true });

        return {
          success: true,
          returnRequest,
          message:
            `Return request ${returnRequest.returnId} was created for order ${selectedOrderNumber}. The Support Center is open and refreshed on screen.`,
        };
      } catch (error) {
        console.error("request_return error:", error);
        return {
          success: false,
          message: "Could not create the return request.",
        };
      }
    },
  };

  const getReturnStatus = {
    type: "function",
    name: "get_return_status",
    description:
      "Retrieve one return request by return ID and open the Support Center on screen.",
    parameters: {
      type: "object",
      properties: {
        returnId: { type: "string" },
      },
      required: ["returnId"],
    },
    execute: async ({ returnId }) => {
      try {
        const returnRequest = await fetchJson(
          `${API_URL}/returns/${returnId}`
        );

        await openSupportCenter({ refreshReturns: true });

        return {
          success: true,
          returnRequest,
          message:
            `Return request ${returnId} is ${returnRequest.status}. The Support Center is open on screen.`,
        };
      } catch (error) {
        console.error("get_return_status error:", error);
        return {
          success: false,
          message: "Return request not found.",
        };
      }
    },
  };

  return [
    trackOrder,
    getMyOrders,
    getMyTickets,
    createSupportTicket,
    getTicketStatus,
    getMyReturns,
    requestReturn,
    getReturnStatus,
  ];
}
