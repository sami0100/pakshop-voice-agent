/*
 * customerAgent/tools.js
 *
 * PURE EXTRACTION from src/App.jsx (previously inline AIROMOB tool
 * definitions, lines ~2396-3582). No execute logic, tool names,
 * parameter schemas, or return messages were changed.
 *
 * All 18 tools depend on state, refs, and business-logic functions
 * that live in App.jsx. They are passed in here as explicit
 * dependencies so this module has no hidden coupling to App.jsx.
 */

export function createCustomerTools({
  // data
  products,
  paymentLabels,

  // refs (kept in sync with state in App.jsx to avoid stale closures)
  cartRef,
  wishlistRef,
  ordersRef,

  // state setters
  setSelectedCategory,
  setSearchTerm,
  setSortOption,
  setIsMobileMenuOpen,
  setSelectedProduct,
  setSelectedOrder,
  setIsCartOpen,
  setIsWishlistOpen,
  setIsCheckoutOpen,
  setIsOrdersOpen,

  // business-logic functions (unchanged, still defined in App.jsx)
  goToHome,
  navigateToCategory,
  productMatchesSearchQuery,
  scrollToProducts,
  getStatusConfig,
  openCartDrawer,
  openWishlist,
  openOrders,
  openCheckout,
  addItemsToCart,
  removeItemsFromCart,
  setCartProductQuantity,
  applyPromoCode,
  setCheckoutFields,
  addToWishlist,
  removeFromWishlist,
  moveWishlistItemToCart,
  submitOrder,
}) {
  /*
   * AI NAVIGATION TOOL
   *
   * Provides a real client-side action for requests such as
   * "go home", "return to the main website", "back to the store",
   * or equivalent requests in a language the assistant understands.
   *
   * Without this tool, the assistant might understand the request
   * conversationally but have no deterministic React action to run.
   */
  const goToHomeTool = {
    type: "function",

    name: "go_to_home",

    description:
      "Returns the customer to the main PakShop storefront/home page. Use this whenever the customer asks to go home, return to the main website, return to the main page, go back to the store/storefront, or close the current product quick view and return to PakShop. Use it for equivalent requests in any language the assistant understands. This action must be used instead of only saying that navigation happened.",

    parameters: {
      type: "object",
      properties: {},
    },

    execute: async () => {
      goToHome();

      return {
        success: true,

        message:
          "Returned to the main PakShop storefront.",
      };
    },
  };

  /*
   * AI DISCOVERY TOOL #1
   *
   * This uses the exact same navigateToCategory()
   * function as the manually working navbar.
   */
  const filterByCategoryTool = {
    type: "function",

    name: "filter_by_category",

    description:
      "Filters the visible PakShop storefront by product category. Use this when the customer asks to show, view, browse, shop, or display Fashion, Electronics, Home, Beauty, Gaming, Sports & Fitness, Books, Accessories, or all products. This action changes the visible website instead of only describing products.",

    parameters: {
      type: "object",

      properties: {
        category: {
          type: "string",

          enum: [
            "All",
            "Fashion",
            "Electronics",
            "Home",
            "Beauty",
            "Gaming",
            "Sports & Fitness",
            "Books",
            "Accessories",
          ],

          description:
            "The exact PakShop product category to display on the storefront.",
        },
      },

      required: [
        "category",
      ],
    },

    execute: async (
      args
    ) => {
      const allowedCategories = [
        "All",
        "Fashion",
        "Electronics",
        "Home",
        "Beauty",
        "Gaming",
        "Sports & Fitness",
        "Books",
        "Accessories",
      ];

      const requestedCategory =
        allowedCategories.find(
          (category) =>
            category.toLowerCase() ===
            String(
              args.category || ""
            )
              .trim()
              .toLowerCase()
        );

      if (
        !requestedCategory
      ) {
        return {
          success: false,

          availableCategories:
            allowedCategories,

          message:
            "That product category is not available on PakShop.",
        };
      }

      navigateToCategory(
        requestedCategory
      );

      const matchingProducts =
        requestedCategory ===
        "All"
          ? products
          : products.filter(
              (product) =>
                product.category ===
                requestedCategory
            );

      return {
        success: true,

        category:
          requestedCategory,

        productCount:
          matchingProducts.length,

        products:
          matchingProducts.map(
            (product) => ({
              id: String(
                product.id
              ),

              name:
                product.name,

              price:
                product.price,

              category:
                product.category,
            })
          ),

        message:
          requestedCategory ===
          "All"
            ? `Showing all ${matchingProducts.length} PakShop products.`
            : `Showing ${matchingProducts.length} ${requestedCategory} products on the storefront.`,
      };
    },
  };

  /*
   * AI DISCOVERY TOOL #2
   *
   * This uses the same search state and matching logic
   * as the manually working storefront search.
   */
  const searchProductsTool = {
    type: "function",

    name: "search_products",

    description:
      "Searches and visually filters the PakShop storefront. Use this when the customer asks to find, search for, look for, or show products by product name, product type, collection, color, category, subcategory, or descriptive keyword. Examples include black kurta, iPhone, gaming headset, air fryer, skincare, running shoes, business books, laptop backpack, or charger. This action changes the visible website instead of only describing products.",

    parameters: {
      type: "object",

      properties: {
        query: {
          type: "string",

          description:
            "A concise PakShop product search phrase such as black kurta, iPhone, headphones, air fryer, skincare, gaming mouse, running shoes, books, charger, or laptop backpack.",
        },
      },

      required: [
        "query",
      ],
    },

    execute: async (
      args
    ) => {
      const query = String(
        args.query || ""
      ).trim();

      if (!query) {
        return {
          success: false,

          message:
            "Please provide something to search for.",
        };
      }

      const matchingProducts =
        products.filter(
          (product) =>
            productMatchesSearchQuery(
              product,
              query
            )
        );

      setSelectedCategory("All");
      setSearchTerm(query);
      setSortOption("featured");
      setIsMobileMenuOpen(false);
      setSelectedProduct(null);
      setIsCartOpen(false);
      setIsWishlistOpen(false);
      setIsCheckoutOpen(false);
      setIsOrdersOpen(false);

      scrollToProducts();

      return {
        success: true,

        query,

        productCount:
          matchingProducts.length,

        products:
          matchingProducts.map(
            (product) => ({
              id: String(
                product.id
              ),

              name:
                product.name,

              price:
                product.price,

              category:
                product.category,

              collection:
                product.collection,

              color:
                product.color,

              sizes:
                product.sizes,

              stock:
                product.stock,
            })
          ),

        message:
          matchingProducts.length === 0
            ? `No PakShop products matched "${query}".`
            : `Found ${matchingProducts.length} PakShop product${
                matchingProducts.length === 1
                  ? ""
                  : "s"
              } matching "${query}" and displayed ${
                matchingProducts.length === 1
                  ? "it"
                  : "them"
              } on the storefront.`,
      };
    },
  };
    const addToCartTool = {
    type: "function",

    name: "add_to_cart",

    description:
      "Adds a product from the PakShop catalog to the customer's shopping cart.",

    parameters: {
      type: "object",

      properties: {
        productId: {
          type: "string",
          description:
            "Exact PakShop product ID.",
        },

        quantity: {
          type: "number",
          description:
            "Number of units to add.",
          default: 1,
        },

        size: {
          type: "string",
          description:
            "Optional product size.",
        },
      },

      required: [
        "productId",
      ],
    },

    execute: async (
      args
    ) => {
      const product =
        products.find(
          (item) =>
            String(item.id) ===
            String(
              args.productId
            )
        );

      if (!product) {
        return {
          success: false,

          message:
            "The requested product could not be found.",
        };
      }

      const requestedSize =
        args.size ||
        product.sizes?.[0];

      if (
        requestedSize &&
        !product.sizes.includes(
          requestedSize
        )
      ) {
        return {
          success: false,

          productName:
            product.name,

          availableSizes:
            product.sizes,

          message: `Size ${requestedSize} is not available for ${product.name}.`,
        };
      }

      const result =
        addItemsToCart(
          product,

          Math.max(
            1,
            Number(
              args.quantity
            ) || 1
          ),

          requestedSize
        );

      if (!result.success) {
        return {
          success: false,

          message:
            result.message,
        };
      }

      return {
        success: true,

        productId:
          String(product.id),

        productName:
          product.name,

        quantity:
          result.quantityAdded,

        size:
          requestedSize,

        message: `${result.quantityAdded} ${product.name} added to the cart${
          requestedSize
            ? ` in size ${requestedSize}`
            : ""
        }.`,
      };
    },
  };

  const removeFromCartTool = {
    type: "function",

    name: "remove_from_cart",

    description:
      "Removes a product from the customer's current PakShop shopping cart.",

    parameters: {
      type: "object",

      properties: {
        productId: {
          type: "string",
        },

        quantity: {
          type: "number",
          default: 1,
        },

        size: {
          type: "string",
        },
      },

      required: [
        "productId",
      ],
    },

    execute: async (
      args
    ) => {
      const product =
        products.find(
          (item) =>
            String(item.id) ===
            String(
              args.productId
            )
        );

      if (!product) {
        return {
          success: false,

          message:
            "The requested product could not be found.",
        };
      }

      const result =
        removeItemsFromCart(
          product.id,

          Math.max(
            1,
            Number(
              args.quantity
            ) || 1
          ),

          args.size || null
        );

      if (!result.success) {
        return {
          success: false,

          message: `${product.name} is not currently in the cart.`,
        };
      }

      setIsCheckoutOpen(false);
      setIsOrdersOpen(false);
      setIsWishlistOpen(false);

      setIsCartOpen(true);

      return {
        success: true,

        quantityRemoved:
          result.quantityRemoved,

        message: `${result.quantityRemoved} ${product.name} removed from the cart.`,
      };
    },
  };

  const openCartTool = {
    type: "function",

    name: "open_cart",

    description:
      "Opens the PakShop shopping cart drawer.",

    parameters: {
      type: "object",
      properties: {},
    },

    execute: async () => {
      openCartDrawer();

      return {
        success: true,

        itemCount:
          cartRef.current.length,

        message:
          "The shopping cart is now open.",
      };
    },
  };

  const updateCartQuantityTool = {
    type: "function",

    name:
      "update_cart_quantity",

    description:
      "Sets the desired quantity of a PakShop product in the customer's cart.",

    parameters: {
      type: "object",

      properties: {
        productId: {
          type: "string",
        },

        quantity: {
          type: "number",
        },

        size: {
          type: "string",
        },
      },

      required: [
        "productId",
        "quantity",
      ],
    },

    execute: async (
      args
    ) => {
      const result =
        setCartProductQuantity(
          args.productId,
          args.quantity,
          args.size || null
        );

      return {
        ...result,

        message:
          result.success
            ? `Cart quantity updated to ${result.quantity}.`
            : result.message ||
              "The cart quantity could not be updated.",
      };
    },
  };

  const applyPromoTool = {
    type: "function",

    name: "apply_coupon",

    description:
      "Applies a PakShop promotional coupon code.",

    parameters: {
      type: "object",

      properties: {
        code: {
          type: "string",
        },
      },

      required: ["code"],
    },

    execute: async (
      args
    ) => {
      setIsCheckoutOpen(false);
      setIsOrdersOpen(false);
      setIsWishlistOpen(false);

      setIsCartOpen(true);

      return applyPromoCode(
        args.code
      );
    },
  };

  const proceedToCheckoutTool = {
    type: "function",

    name:
      "proceed_to_checkout",

    description:
      "Opens PakShop checkout.",

    parameters: {
      type: "object",
      properties: {},
    },

    execute: async () => {
      if (
        cartRef.current.length ===
        0
      ) {
        return {
          success: false,

          message:
            "The cart is empty.",
        };
      }

      openCheckout();

      return {
        success: true,

        itemCount:
          cartRef.current.length,

        message:
          "Checkout is now open.",
      };
    },
  };

  const updateCheckoutTool = {
    type: "function",

    name:
      "update_checkout_details",

    description:
      "Updates customer delivery information during PakShop checkout.",

    parameters: {
      type: "object",

      properties: {
        fullName: {
          type: "string",
        },

        email: {
          type: "string",
        },

        phone: {
          type: "string",
        },

        province: {
          type: "string",
        },

        city: {
          type: "string",
        },

        address: {
          type: "string",
        },

        postalCode: {
          type: "string",
        },

        notes: {
          type: "string",
        },
      },
    },

    execute: async (
      args
    ) => {
      const allowedFields = [
        "fullName",
        "email",
        "phone",
        "province",
        "city",
        "address",
        "postalCode",
        "notes",
      ];

      const updates = {};

      allowedFields.forEach(
        (field) => {
          if (
            args[field] !==
            undefined
          ) {
            updates[field] =
              args[field];
          }
        }
      );

      if (
        Object.keys(updates)
          .length === 0
      ) {
        return {
          success: false,

          message:
            "No checkout information was provided.",
        };
      }

      setCheckoutFields(
        updates
      );

      setIsCartOpen(false);
      setIsOrdersOpen(false);
      setIsWishlistOpen(false);

      setIsCheckoutOpen(true);

      return {
        success: true,

        updatedFields:
          Object.keys(updates),

        message:
          "Checkout details have been updated.",
      };
    },
  };

  const selectPaymentMethodTool = {
    type: "function",

    name:
      "select_payment_method",

    description:
      "Selects the payment method for the PakShop order.",

    parameters: {
      type: "object",

      properties: {
        method: {
          type: "string",

          enum: [
            "cod",
            "easypaisa",
            "jazzcash",
            "card",
          ],
        },
      },

      required: ["method"],
    },
        execute: async (
      args
    ) => {
      const method =
        String(
          args.method || ""
        ).toLowerCase();

      if (
        !paymentLabels[
          method
        ]
      ) {
        return {
          success: false,

          message:
            "That payment method is not supported.",
        };
      }

      setCheckoutFields({
        paymentMethod:
          method,
      });

      setIsCartOpen(false);
      setIsOrdersOpen(false);
      setIsWishlistOpen(false);

      setIsCheckoutOpen(true);

      return {
        success: true,

        method,

        paymentMethod:
          paymentLabels[
            method
          ],

        message: `${paymentLabels[method]} selected.`,
      };
    },
  };

  const placeOrderTool = {
    type: "function",

    name: "place_order",

    description:
      "Places the current PakShop order only after explicit customer confirmation.",

    parameters: {
      type: "object",

      properties: {
        confirmed: {
          type: "boolean",
        },
      },

      required: [
        "confirmed",
      ],
    },

    execute: async (
      args
    ) => {
      if (
        args.confirmed !== true
      ) {
        return {
          success: false,

          requiresConfirmation:
            true,

          message:
            "Please confirm that you want to place the order.",
        };
      }

      return submitOrder();
    },
  };

  const openWishlistTool = {
    type: "function",

    name: "open_wishlist",

    description:
      "Opens the customer's saved PakShop wishlist.",

    parameters: {
      type: "object",
      properties: {},
    },

    execute: async () => {
      openWishlist();

      return {
        success: true,

        itemCount:
          wishlistRef.current.length,

        message:
          wishlistRef.current.length ===
          0
            ? "Your wishlist is currently empty."
            : `Your wishlist is open with ${wishlistRef.current.length} saved item${
                wishlistRef.current.length ===
                1
                  ? ""
                  : "s"
              }.`,
      };
    },
  };

  const addToWishlistTool = {
    type: "function",

    name:
      "add_to_wishlist",

    description:
      "Saves a PakShop product to the customer's wishlist.",

    parameters: {
      type: "object",

      properties: {
        productId: {
          type: "string",
        },
      },

      required: [
        "productId",
      ],
    },

    execute: async (
      args
    ) => {
      const result =
        addToWishlist(
          args.productId
        );

      if (result.success) {
        setIsCartOpen(false);
        setIsCheckoutOpen(false);
        setIsOrdersOpen(false);

        setIsWishlistOpen(true);
      }

      return result;
    },
  };

  const removeFromWishlistTool = {
    type: "function",

    name:
      "remove_from_wishlist",

    description:
      "Removes a saved product from the customer's PakShop wishlist.",

    parameters: {
      type: "object",

      properties: {
        productId: {
          type: "string",
        },
      },

      required: [
        "productId",
      ],
    },

    execute: async (
      args
    ) => {
      const result =
        removeFromWishlist(
          args.productId
        );

      setIsWishlistOpen(true);

      return result;
    },
  };

  const moveWishlistToCartTool = {
    type: "function",

    name:
      "move_wishlist_to_cart",

    description:
      "Moves a saved PakShop wishlist product into the customer's cart.",

    parameters: {
      type: "object",

      properties: {
        productId: {
          type: "string",
        },

        size: {
          type: "string",
        },

        quantity: {
          type: "number",
          default: 1,
        },
      },

      required: [
        "productId",
      ],
    },

    execute: async (
      args
    ) =>
      moveWishlistItemToCart(
        args.productId,
        args.size || null,

        Math.max(
          1,
          Number(
            args.quantity
          ) || 1
        )
      ),
  };
    const openOrderHistoryTool = {
    type: "function",

    name:
      "open_order_history",

    description:
      "Opens the customer's PakShop order history.",

    parameters: {
      type: "object",
      properties: {},
    },

    execute: async () => {
      openOrders();

      return {
        success: true,

        orderCount:
          ordersRef.current.length,

        message:
          ordersRef.current.length >
          0
            ? `You have ${ordersRef.current.length} PakShop order${
                ordersRef.current
                  .length === 1
                  ? ""
                  : "s"
              }.`
            : "You do not have any PakShop orders yet.",
      };
    },
  };

  const trackOrderTool = {
    type: "function",

    name: "track_order",

    description:
      "Tracks a previous PakShop order. If no order number is given, use the most recent order.",

    parameters: {
      type: "object",

      properties: {
        orderNumber: {
          type: "string",
        },
      },
    },

    execute: async (
      args
    ) => {
      if (
        ordersRef.current.length ===
        0
      ) {
        return {
          success: false,

          message:
            "There are no previous orders to track.",
        };
      }

      let order;

      if (args.orderNumber) {
        order =
          ordersRef.current.find(
            (item) =>
              item.orderNumber.toLowerCase() ===
              String(
                args.orderNumber
              ).toLowerCase()
          );
      } else {
        order =
          ordersRef.current[0];
      }

      if (!order) {
        return {
          success: false,

          message:
            "I could not find that PakShop order number.",
        };
      }

      setSelectedProduct(null);
      setIsCartOpen(false);
      setIsCheckoutOpen(false);
      setIsWishlistOpen(false);

      setSelectedOrder(order);
      setIsOrdersOpen(true);

      const status =
        getStatusConfig(
          order.trackingStatus
        );

      return {
        success: true,

        orderNumber:
          order.orderNumber,

        status:
          status.label,

        city:
          order.delivery.city,

        estimatedDelivery:
          order.delivery.estimate,

        paymentMethod:
          order.paymentLabel,

        total:
          order.total,

        message: `Order ${order.orderNumber} is currently ${status.label}. Estimated delivery is ${order.delivery.estimate}.`,
      };
    },
  };

  return [
    goToHomeTool,
    filterByCategoryTool,
    searchProductsTool,
    addToCartTool,
    removeFromCartTool,
    openCartTool,
    updateCartQuantityTool,
    applyPromoTool,
    openWishlistTool,
    addToWishlistTool,
    removeFromWishlistTool,
    moveWishlistToCartTool,
    proceedToCheckoutTool,
    updateCheckoutTool,
    selectPaymentMethodTool,
    placeOrderTool,
    openOrderHistoryTool,
    trackOrderTool,
  ];
}