const CUSTOMER_ID_KEY =
  "pakshop-customer-id";


export function getCustomerId() {

  let customerId =
    localStorage.getItem(
      CUSTOMER_ID_KEY
    );


  if (customerId) {
    return customerId;
  }


  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID ===
      "function"
  ) {

    customerId =
      `CUS-${crypto.randomUUID()}`;

  } else {

    customerId =
      `CUS-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 10)}`;

  }


  localStorage.setItem(
    CUSTOMER_ID_KEY,
    customerId
  );


  return customerId;
}


export default getCustomerId;