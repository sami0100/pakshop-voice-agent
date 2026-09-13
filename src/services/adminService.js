const API_URL = import.meta.env.VITE_API_URL;


export async function getRevenue() {

  const response = await fetch(
    `${API_URL}/analytics/revenue`
  );

  return await response.json();

}


export async function getTopCustomers() {

  const response = await fetch(
    `${API_URL}/analytics/top-customers`
  );

  return await response.json();

}


export async function getTrendingProducts() {

  const response = await fetch(
    `${API_URL}/analytics/trending-products`
  );

  return await response.json();

}


export async function getSalesTrend() {

  const response = await fetch(
    `${API_URL}/analytics/sales-trend`
  );

  return await response.json();

}


export async function getLowStockItems() {

  const response = await fetch(
    `${API_URL}/inventory/low-stock`
  );

  return await response.json();

}