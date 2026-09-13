const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";


export function createAdminTools() {

  return [

    {
      type: "function",

      name: "get_revenue",

      description:
        "Get total store revenue and order count.",

      parameters: {
        type: "object",
        properties: {},
      },


      execute: async () => {

        const response = await fetch(
          `${API_URL}/analytics/revenue`
        );


        return await response.json();

      },

    },


    {
      type: "function",

      name: "get_revenue_by_period",

      description:
        "Get revenue for a specific number of days.",


      parameters: {

        type: "object",

        properties: {

          days: {
            type: "number",
            description:
              "Number of days to analyze",
          },

        },

        required: ["days"],

      },


      execute: async ({ days }) => {

        const response = await fetch(
          `${API_URL}/analytics/revenue-period?days=${days}`
        );


        return await response.json();

      },

    },


    {
      type: "function",

      name: "get_top_customers",

      description:
        "Get customers with highest spending.",


      parameters: {
        type: "object",
        properties: {},
      },


      execute: async () => {

        const response = await fetch(
          `${API_URL}/analytics/top-customers`
        );


        return await response.json();

      },

    },


    {
      type: "function",

      name: "get_trending_products",

      description:
        "Get products with highest sales.",


      parameters: {
        type: "object",
        properties: {},
      },


      execute: async () => {

        const response = await fetch(
          `${API_URL}/analytics/trending-products`
        );


        return await response.json();

      },

    },


    {
      type: "function",

      name: "get_sales_trend",

      description:
        "Get daily sales trend.",


      parameters: {
        type: "object",
        properties: {},
      },


      execute: async () => {

        const response = await fetch(
          `${API_URL}/analytics/sales-trend`
        );


        return await response.json();

      },

    },

  ];

}