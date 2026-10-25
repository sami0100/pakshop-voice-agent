import { products as storefrontProducts } from "../products";

const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  console.error(
    "VITE_API_URL is not configured. Admin dashboard API calls will fail."
  );
}


function enrichTrendingProducts(items = []) {
  return items.map((item) => {
    const storefrontProduct = storefrontProducts.find(
      (product) => String(product.id) === String(item.productId)
    );

    return {
      ...item,
      name:
        item.name ||
        storefrontProduct?.name ||
        `Product ${item.productId}`,
      category:
        item.category ||
        storefrontProduct?.category ||
        "",
      image:
        item.image ||
        storefrontProduct?.image ||
        "",
    };
  });
}

async function getJson(path, label) {
  if (!API_URL) {
    throw new Error("VITE_API_URL is not configured.");
  }

  const response = await fetch(`${API_URL}${path}`);

  if (!response.ok) {
    const body = await response
      .json()
      .catch(() => ({}));

    throw new Error(
      body.message ||
        `${label} failed with status ${response.status}.`
    );
  }

  return response.json();
}

export function getRevenue() {
  return getJson(
    "/analytics/revenue",
    "Revenue request"
  );
}

export function getDashboardSummary() {
  return getJson(
    "/analytics/dashboard-summary",
    "Dashboard summary request"
  );
}

export function getTopCustomers() {
  return getJson(
    "/analytics/top-customers",
    "Top customers request"
  );
}

export async function getTrendingProducts() {
  const items = await getJson(
    "/analytics/trending-products",
    "Trending products request"
  );

  return enrichTrendingProducts(items);
}

export function getSalesTrend() {
  return getJson(
    "/analytics/sales-trend",
    "Sales trend request"
  );
}

export function getLowStockItems() {
  return getJson(
    "/inventory/low-stock",
    "Low-stock inventory request"
  );
}

export function getSupportOverview() {
  return getJson(
    "/analytics/support-overview",
    "Customer service analytics request"
  );
}
