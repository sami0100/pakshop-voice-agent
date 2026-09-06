export function createCustomerTools({
  goToHome,
}) {
  return [
    {
      type: "function",
      name: "go_to_home",
      description:
        "Return the customer to the main PakShop storefront/home page. Use when the customer asks to go back to the main website, home page, storefront, or leave a product view.",

      parameters: {
        type: "object",
        properties: {},
      },

      execute: async () => {
        goToHome();

        return {
          success: true,
          message: "Returned customer to PakShop home page.",
        };
      },
    },
  ];
}