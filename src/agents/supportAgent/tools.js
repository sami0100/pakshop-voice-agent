import {
  getCustomerId,
} from "../../utils/customerIdentity";


const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api/v1";



export function createSupportTools() {


  const trackOrder = {

    type: "function",

    name: "track_order",

    description:
      "Find the customer's latest order status, delivery information, and tracking details.",


    parameters: {
      type: "object",
      properties: {},
      required: [],
    },


    execute: async () => {

      try {

        const customerId =
          getCustomerId();


        const response =
          await fetch(
            `${API_URL}/orders/customer/${customerId}`
          );


        if (!response.ok) {

          return {
            success: false,
            message:
              "Unable to retrieve order information.",
          };

        }


        const orders =
          await response.json();


        if (!orders || orders.length === 0) {

          return {
            success: false,
            message:
              "No orders found for this customer.",
          };

        }


        const latestOrder =
          orders[orders.length - 1];


        return {

          success: true,

          order: {

            orderNumber:
              latestOrder.orderNumber ||
              latestOrder.id,


            status:
              latestOrder.status,


            trackingStatus:
              latestOrder.trackingStatus,


            delivery:
              latestOrder.delivery,


            paymentMethod:
              latestOrder.paymentMethod,


            totalAmount:
              latestOrder.totalAmount,

          },

        };


      } catch (error) {

        console.error(
          "track_order error:",
          error
        );


        return {
          success: false,
          message:
            "Could not retrieve order details.",
        };

      }

    },

  };





  const getMyOrders = {

    type: "function",

    name: "get_my_orders",

    description:
      "Retrieve the customer's previous orders and order history.",


    parameters: {
      type: "object",
      properties: {},
      required: [],
    },


    execute: async () => {

      try {

        const customerId =
          getCustomerId();


        const response =
          await fetch(
            `${API_URL}/orders/customer/${customerId}`
          );


        if (!response.ok) {

          return {
            success: false,
            message:
              "Unable to retrieve order history.",
          };

        }


        const orders =
          await response.json();


        if (!orders || orders.length === 0) {

          return {
            success: false,
            message:
              "No orders found.",
          };

        }


        return {

          success: true,

          orders:
            orders.map((order) => ({

              orderNumber:
                order.orderNumber ||
                order.id,


              status:
                order.status,


              totalAmount:
                order.totalAmount,


              paymentMethod:
                order.paymentMethod,


              deliveryCity:
                order.delivery?.city,

            })),

        };


      } catch (error) {

        console.error(
          "get_my_orders error:",
          error
        );


        return {
          success: false,
          message:
            "Could not retrieve order history.",
        };

      }

    },

  };





  const createSupportTicket = {

    type: "function",

    name: "create_support_ticket",

    description:
      "Create a customer support ticket for an order issue.",


    parameters: {

      type: "object",

      properties: {

        orderNumber: {
          type: "string",
        },

        issue: {
          type: "string",
        },

        priority: {
          type: "string",
        },

      },


      required: [
        "orderNumber",
        "issue",
      ],

    },


    execute: async ({
      orderNumber,
      issue,
      priority = "Medium",
    }) => {

      try {

        const customerId =
          getCustomerId();


        const response =
          await fetch(
            `${API_URL}/support/tickets`,
            {

              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },


              body: JSON.stringify({

                ticketId:
                  `TKT-${Date.now()}`,

                customerId,

                orderNumber,

                issue,

                priority,

              }),

            }
          );


        if (!response.ok) {

          return {
            success: false,
            message:
              "Unable to create support ticket.",
          };

        }


        const ticket =
          await response.json();


        return {

          success: true,

          ticket: {

            ticketId:
              ticket.ticketId,


            status:
              ticket.status,

          },

        };


      } catch (error) {

        console.error(
          "create_support_ticket error:",
          error
        );


        return {
          success: false,
          message:
            "Could not create ticket.",
        };

      }

    },

  };





  const getTicketStatus = {

    type: "function",

    name: "get_ticket_status",

    description:
      "Retrieve support ticket status.",


    parameters: {

      type: "object",

      properties: {

        ticketId: {
          type: "string",
        },

      },

      required: [
        "ticketId",
      ],

    },


    execute: async ({
      ticketId,
    }) => {

      try {

        const response =
          await fetch(
            `${API_URL}/support/tickets/${ticketId}`
          );


        if (!response.ok) {

          return {
            success: false,
            message:
              "Support ticket not found.",
          };

        }


        const ticket =
          await response.json();


        return {

          success: true,

          ticket,

        };


      } catch (error) {

        console.error(
          "get_ticket_status error:",
          error
        );


        return {
          success: false,
          message:
            "Could not retrieve ticket.",
        };

      }

    },

  };





  const requestReturn = {

    type: "function",

    name: "request_return",

    description:
      "Create a return request for a customer's order.",


    parameters: {

      type: "object",

      properties: {

        orderNumber: {
          type: "string",
        },


        reason: {
          type: "string",
        },

      },


      required: [
        "orderNumber",
        "reason",
      ],

    },


    execute: async ({
      orderNumber,
      reason,
    }) => {

      try {

        const customerId =
          getCustomerId();


        const response =
          await fetch(
            `${API_URL}/returns`,
            {

              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },


              body: JSON.stringify({

                returnId:
                  `RET-${Date.now()}`,

                customerId,

                orderNumber,

                reason,

                status:
                  "Requested",

              }),

            }
          );


        if (!response.ok) {

          return {
            success: false,
            message:
              "Unable to create return request.",
          };

        }


        const returnRequest =
          await response.json();


        return {

          success: true,

          returnRequest,

          message:
            "Return request created successfully.",

        };


      } catch (error) {

        console.error(
          "request_return error:",
          error
        );


        return {
          success: false,
          message:
            "Could not create return request.",
        };

      }

    },

  };





  const getReturnStatus = {

    type: "function",

    name: "get_return_status",

    description:
      "Retrieve the status of a customer's return request.",


    parameters: {

      type: "object",

      properties: {

        returnId: {
          type: "string",
        },

      },

      required: [
        "returnId",
      ],

    },


    execute: async ({
      returnId,
    }) => {

      try {

        const response =
          await fetch(
            `${API_URL}/returns/${returnId}`
          );


        if (!response.ok) {

          return {
            success: false,
            message:
              "Return request not found.",
          };

        }


        const returnRequest =
          await response.json();


        return {

          success: true,

          returnRequest,

        };


      } catch (error) {

        console.error(
          "get_return_status error:",
          error
        );


        return {
          success: false,
          message:
            "Could not retrieve return status.",
        };

      }

    },

  };





  return [

    trackOrder,

    getMyOrders,

    createSupportTicket,

    getTicketStatus,

    requestReturn,

    getReturnStatus,

  ];

}