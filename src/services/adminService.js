const API_URL =
  import.meta.env.VITE_API_URL;


export async function getRevenue() {

  const response = await fetch(
    `${API_URL}/analytics/revenue`
  );

  if (!response.ok) {
    throw new Error(
      "Failed to load revenue."
    );
  }

  return await response.json();

}


export async function getDashboardSummary() {

  const response = await fetch(
    `${API_URL}/analytics/dashboard-summary`
  );

  if (!response.ok) {
    throw new Error(
      "Failed to load dashboard summary."
    );
  }

  return await response.json();

}


export async function getTopCustomers() {

  const response = await fetch(
    `${API_URL}/analytics/top-customers`
  );

  if (!response.ok) {
    throw new Error(
      "Failed to load top customers."
    );
  }

  return await response.json();

}


export async function getTrendingProducts() {

  const response = await fetch(
    `${API_URL}/analytics/trending-products`
  );

  if (!response.ok) {
    throw new Error(
      "Failed to load trending products."
    );
  }

  return await response.json();

}


export async function getSalesTrend() {

  const response = await fetch(
    `${API_URL}/analytics/sales-trend`
  );

  if (!response.ok) {
    throw new Error(
      "Failed to load sales trend."
    );
  }

  return await response.json();

}


export async function getLowStockItems() {

  const response = await fetch(
    `${API_URL}/inventory/low-stock`
  );

  if (!response.ok) {
    throw new Error(
      "Failed to load low-stock inventory."
    );
  }

  return await response.json();

}


export async function getSupportOverview() {

  const response = await fetch(
    `${API_URL}/analytics/support-overview`
  );

  if (!response.ok) {
    throw new Error(
      "Failed to load customer service analytics."
    );
  }

  return await response.json();

}