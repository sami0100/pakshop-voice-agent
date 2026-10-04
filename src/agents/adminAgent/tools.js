const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api/v1";


export function createAdminTools({
  onResult,
} = {}) {

  const runTool = async (
    path,
    resultType
  ) => {

    try {

      const response =
        await fetch(
          `${API_URL}${path}`
        );

      const data =
        await response.json();

      if (!response.ok) {
        return {
          success: false,
          message:
            data?.message ||
            "Unable to retrieve live admin data.",
        };
      }

      if (
        typeof onResult ===
        "function"
      ) {
        await onResult(
          resultType,
          data
        );
      }

      return data;

    } catch (error) {

      console.error(
        `${resultType} admin tool error:`,
        error
      );

      return {
        success: false,
        message:
          "Unable to retrieve live admin data right now.",
      };

    }

  };


  return [

    {
      type: "function",
      name: "get_revenue",
      description:
        "Get total store revenue and order count from live PakShop order data.",
      parameters: {
        type: "object",
        properties: {},
      },
      execute: async () =>
        runTool(
          "/analytics/revenue",
          "revenue"
        ),
    },

    {
      type: "function",
      name: "get_revenue_by_period",
      description:
        "Get live revenue and orders for a specific number of days.",
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
      execute: async ({ days }) =>
        runTool(
          `/analytics/revenue-period?days=${encodeURIComponent(days)}`,
          "revenue-period"
        ),
    },

    {
      type: "function",
      name: "get_top_customers",
      description:
        "Get the current highest-spending customers calculated from live PakShop orders.",
      parameters: {
        type: "object",
        properties: {},
      },
      execute: async () =>
        runTool(
          "/analytics/top-customers",
          "top-customers"
        ),
    },

    {
      type: "function",
      name: "get_trending_products",
      description:
        "Get products with the highest live sales activity.",
      parameters: {
        type: "object",
        properties: {},
      },
      execute: async () =>
        runTool(
          "/analytics/trending-products",
          "trending-products"
        ),
    },

    {
      type: "function",
      name: "get_sales_trend",
      description:
        "Get the current daily sales trend from live order data.",
      parameters: {
        type: "object",
        properties: {},
      },
      execute: async () =>
        runTool(
          "/analytics/sales-trend",
          "sales-trend"
        ),
    },

    {
      type: "function",
      name: "get_low_stock_items",
      description:
        "Get current products that have low inventory and require restocking.",
      parameters: {
        type: "object",
        properties: {},
      },
      execute: async () =>
        runTool(
          "/inventory/low-stock",
          "low-stock"
        ),
    },

    {
      type: "function",
      name: "get_business_overview",
      description:
        "Get a live executive overview of PakShop including revenue, orders, average order value, current top customers calculated from orders, trending products, and low-stock inventory risks. Use this for a store summary or general business-health question.",
      parameters: {
        type: "object",
        properties: {},
      },
      execute: async () =>
        runTool(
          "/analytics/business-overview",
          "business-overview"
        ),
    },

    {
      type: "function",
      name: "get_support_overview",
      description:
        "Get live customer-service analytics including support tickets, open issues, return requests, pending returns, and recent support activity.",
      parameters: {
        type: "object",
        properties: {},
      },
      execute: async () =>
        runTool(
          "/analytics/support-overview",
          "support-overview"
        ),
    },

  ];

}
