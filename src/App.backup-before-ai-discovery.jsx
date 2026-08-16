import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { VoiceAIButton } from "vtk-voice-ai-sdk";
import { products } from "./products";

/* =========================================================
   CHECKOUT CONFIG
========================================================= */

const initialCheckoutForm = {
  fullName: "",
  email: "",
  phone: "",
  province: "",
  city: "",
  address: "",
  postalCode: "",
  notes: "",
  paymentMethod: "cod",
};

const pakistanProvinces = [
  "Punjab",
  "Sindh",
  "Khyber Pakhtunkhwa",
  "Balochistan",
  "Islamabad Capital Territory",
  "Gilgit-Baltistan",
  "Azad Jammu & Kashmir",
];

const pakistanCities = [
  "Lahore",
  "Karachi",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Multan",
  "Peshawar",
  "Quetta",
  "Sialkot",
  "Gujranwala",
  "Hyderabad",
  "Bahawalpur",
  "Abbottabad",
];

const paymentLabels = {
  cod: "Cash on Delivery",
  easypaisa: "EasyPaisa",
  jazzcash: "JazzCash",
  card: "Debit / Credit Card",
};

/* =========================================================
   ORDER TRACKING
========================================================= */

const orderStatuses = [
  {
    key: "confirmed",
    label: "Confirmed",
    icon: "✓",
    description:
      "Your order has been received successfully.",
  },
  {
    key: "processing",
    label: "Processing",
    icon: "📦",
    description:
      "PakShop is preparing your items for shipment.",
  },
  {
    key: "shipped",
    label: "Shipped",
    icon: "🚚",
    description:
      "Your order has left our fulfillment center.",
  },
  {
    key: "out_for_delivery",
    label: "Out for Delivery",
    icon: "🛵",
    description:
      "Your rider is bringing the order to you.",
  },
  {
    key: "delivered",
    label: "Delivered",
    icon: "🏠",
    description:
      "Your order has been delivered.",
  },
];

/* =========================================================
   COLLECTION CARDS
========================================================= */

const collectionCards = [
  {
    category: "Men",
    eyebrow: "TIMELESS MENSWEAR",
    title: "Men's Collection",
    description:
      "Classic kurtas, waistcoats and traditional silhouettes.",
    image:
      "/products/black-cotton-kurta.webp",
  },
  {
    category: "Women",
    eyebrow: "ELEVATED EASTERN WEAR",
    title: "Women's Collection",
    description:
      "Lawn, formal and seasonal Pakistani fashion.",
    image:
      "/products/emerald-lawn-3-piece-suit.webp",
  },
  {
    category: "Kids",
    eyebrow: "LITTLE CELEBRATIONS",
    title: "Kids' Collection",
    description:
      "Festive Pakistani styles made for younger wardrobes.",
    image:
      "/products/girls-peach-festive-dress.webp",
  },
  {
    category: "Footwear",
    eyebrow: "TRADITIONAL FINISH",
    title: "Footwear",
    description:
      "Complete your look with traditional Pakistani footwear.",
    image:
      "/products/classic-peshawari-chappal.webp",
  },
];

function App() {
  /* =========================================================
     CART
  ========================================================= */

  const [cart, setCart] = useState([]);
  const cartRef = useRef([]);

  /* =========================================================
     WISHLIST
  ========================================================= */

  const [wishlist, setWishlist] = useState(
    () => {
      try {
        const saved =
          localStorage.getItem(
            "pakshop-wishlist"
          );

        return saved
          ? JSON.parse(saved)
          : [];
      } catch {
        return [];
      }
    }
  );

  const wishlistRef =
    useRef(wishlist);

  const [
    isWishlistOpen,
    setIsWishlistOpen,
  ] = useState(false);

  const [
    wishlistSizes,
    setWishlistSizes,
  ] = useState({});

  /* =========================================================
     SHOP
  ========================================================= */

  const [searchTerm, setSearchTerm] =
    useState("");

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("All");

  const [sortOption, setSortOption] =
    useState("featured");

  /* =========================================================
     STOREFRONT
  ========================================================= */

  const [
    isMobileMenuOpen,
    setIsMobileMenuOpen,
  ] = useState(false);

  const [
    newsletterEmail,
    setNewsletterEmail,
  ] = useState("");

  const [
    newsletterMessage,
    setNewsletterMessage,
  ] = useState("");

  /* =========================================================
     PRODUCT MODAL
  ========================================================= */

  const [
    selectedProduct,
    setSelectedProduct,
  ] = useState(null);

  const [
    selectedSize,
    setSelectedSize,
  ] = useState("");

  const [
    selectedQuantity,
    setSelectedQuantity,
  ] = useState(1);

  /* =========================================================
     CART DRAWER
  ========================================================= */

  const [
    isCartOpen,
    setIsCartOpen,
  ] = useState(false);

  /* =========================================================
     PROMO
  ========================================================= */

  const [
    promoInput,
    setPromoInput,
  ] = useState("");

  const [
    appliedPromo,
    setAppliedPromo,
  ] = useState(null);

  const appliedPromoRef =
    useRef(null);

  const [
    promoMessage,
    setPromoMessage,
  ] = useState({
    text: "",
    type: "",
  });

  /* =========================================================
     CHECKOUT
  ========================================================= */

  const [
    isCheckoutOpen,
    setIsCheckoutOpen,
  ] = useState(false);

  const [
    checkoutForm,
    setCheckoutForm,
  ] = useState(initialCheckoutForm);

  const checkoutRef = useRef(
    initialCheckoutForm
  );

  const [
    checkoutErrors,
    setCheckoutErrors,
  ] = useState({});

  const [
    orderConfirmation,
    setOrderConfirmation,
  ] = useState(null);

  /* =========================================================
     ORDER HISTORY
  ========================================================= */

  const [orders, setOrders] =
    useState(() => {
      try {
        const saved =
          localStorage.getItem(
            "pakshop-orders"
          );

        return saved
          ? JSON.parse(saved)
          : [];
      } catch {
        return [];
      }
    });

  const ordersRef = useRef(orders);

  const [
    isOrdersOpen,
    setIsOrdersOpen,
  ] = useState(false);

  const [
    selectedOrder,
    setSelectedOrder,
  ] = useState(null);

  /* =========================================================
     FORMATTERS
  ========================================================= */

  const formatPKR = (amount) =>
    `PKR ${Math.round(
      Number(amount) || 0
    ).toLocaleString()}`;

  const getDeliveryEstimate = (
    city
  ) => {
    const normalized = String(
      city || ""
    )
      .trim()
      .toLowerCase();

    if (
      normalized === "lahore" ||
      normalized === "islamabad"
    ) {
      return "2–3 working days";
    }

    if (
      normalized === "karachi"
    ) {
      return "3–4 working days";
    }

    return "3–5 working days";
  };

  const getStatusIndex = (
    status
  ) =>
    orderStatuses.findIndex(
      (item) =>
        item.key === status
    );

  const getStatusConfig = (
    status
  ) =>
    orderStatuses.find(
      (item) =>
        item.key === status
    ) || orderStatuses[0];

  /* =========================================================
     STOREFRONT NAVIGATION
  ========================================================= */

  const scrollToProducts = () => {
    setTimeout(() => {
      document
        .querySelector(
          ".products-section"
        )
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 50);
  };

  const navigateToCategory = (
    category
  ) => {
    setSelectedCategory(category);
    setSearchTerm("");
    setIsMobileMenuOpen(false);

    scrollToProducts();
  };

  const showBestSellers = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSortOption("rating");
    setIsMobileMenuOpen(false);

    scrollToProducts();
  };

  const handleNewsletterSubmit = (
    event
  ) => {
    event.preventDefault();

    const email =
      newsletterEmail.trim();

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email
      )
    ) {
      setNewsletterMessage(
        "Please enter a valid email address."
      );

      return;
    }

    setNewsletterMessage(
      "Shukriya! You're now on the PakShop list."
    );

    setNewsletterEmail("");
  };

  /* =========================================================
     ORDER PERSISTENCE
  ========================================================= */

  const saveOrders = (
    nextOrders
  ) => {
    ordersRef.current =
      nextOrders;

    setOrders(nextOrders);

    try {
      localStorage.setItem(
        "pakshop-orders",
        JSON.stringify(
          nextOrders
        )
      );
    } catch {
      // Storage unavailable.
    }
  };

  /* =========================================================
     WISHLIST PERSISTENCE
  ========================================================= */

  const saveWishlist = (
    nextWishlist
  ) => {
    wishlistRef.current =
      nextWishlist;

    setWishlist(nextWishlist);

    try {
      localStorage.setItem(
        "pakshop-wishlist",
        JSON.stringify(
          nextWishlist
        )
      );
    } catch {
      // Storage unavailable.
    }
  };

  const wishlistProducts =
    useMemo(() => {
      return wishlist
        .map((productId) =>
          products.find(
            (product) =>
              String(
                product.id
              ) ===
              String(productId)
          )
        )
        .filter(Boolean);
    }, [wishlist]);

  /* =========================================================
     PRODUCT MODAL
  ========================================================= */

  const openProductDetails = (
    product
  ) => {
    setIsCartOpen(false);
    setIsCheckoutOpen(false);
    setIsOrdersOpen(false);
    setIsWishlistOpen(false);
    setIsMobileMenuOpen(false);

    setSelectedProduct(product);

    setSelectedSize(
      product.sizes?.[0] || ""
    );

    setSelectedQuantity(1);
  };

  const closeProductDetails =
    () => {
      setSelectedProduct(null);
      setSelectedSize("");
      setSelectedQuantity(1);
    };

  /* =========================================================
     CART DRAWER
  ========================================================= */

  const openCartDrawer = () => {
    setSelectedProduct(null);
    setIsCheckoutOpen(false);
    setIsOrdersOpen(false);
    setIsWishlistOpen(false);
    setIsMobileMenuOpen(false);

    setIsCartOpen(true);
  };

  const closeCartDrawer = () => {
    setIsCartOpen(false);
  };

  /* =========================================================
     WISHLIST DRAWER
  ========================================================= */

  const openWishlist = () => {
    setSelectedProduct(null);
    setIsCartOpen(false);
    setIsCheckoutOpen(false);
    setIsOrdersOpen(false);
    setIsMobileMenuOpen(false);

    setIsWishlistOpen(true);
  };

  const closeWishlist = () => {
    setIsWishlistOpen(false);
  };

  /* =========================================================
     CONTINUE SHOPPING
  ========================================================= */

  const continueShopping = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(false);
    setIsOrdersOpen(false);
    setIsWishlistOpen(false);
    setIsMobileMenuOpen(false);

    scrollToProducts();
  };

  /* =========================================================
     ORDERS
  ========================================================= */

  const openOrders = () => {
    setSelectedProduct(null);
    setIsCartOpen(false);
    setIsCheckoutOpen(false);
    setIsWishlistOpen(false);
    setIsMobileMenuOpen(false);

    setSelectedOrder(null);
    setIsOrdersOpen(true);
  };

  const closeOrders = () => {
    setIsOrdersOpen(false);
    setSelectedOrder(null);
  };

  const openOrderDetails = (
    order
  ) => {
    setSelectedOrder(order);
    setIsOrdersOpen(true);
  };

  const trackOrderFromConfirmation =
    () => {
      if (!orderConfirmation) {
        return;
      }

      setSelectedOrder(
        orderConfirmation
      );

      setIsCheckoutOpen(false);
      setIsWishlistOpen(false);

      setIsOrdersOpen(true);
    };

  /* =========================================================
     ORDER DEMO STATUS
  ========================================================= */

  const advanceOrderStatus = (
    orderNumber
  ) => {
    const current =
      ordersRef.current.find(
        (order) =>
          order.orderNumber ===
          orderNumber
      );

    if (!current) {
      return;
    }

    const currentIndex =
      getStatusIndex(
        current.trackingStatus
      );

    if (
      currentIndex >=
      orderStatuses.length - 1
    ) {
      return;
    }

    const nextStatus =
      orderStatuses[
        currentIndex + 1
      ];

    const updatedOrder = {
      ...current,

      trackingStatus:
        nextStatus.key,

      status:
        nextStatus.label,

      trackingUpdatedAt:
        new Date().toLocaleString(),

      trackingHistory: [
        ...(current.trackingHistory ||
          []),

        {
          status:
            nextStatus.key,

          label:
            nextStatus.label,

          at: new Date().toLocaleString(),
        },
      ],
    };

    const nextOrders =
      ordersRef.current.map(
        (order) =>
          order.orderNumber ===
          orderNumber
            ? updatedOrder
            : order
      );

    saveOrders(nextOrders);

    if (
      selectedOrder?.orderNumber ===
      orderNumber
    ) {
      setSelectedOrder(
        updatedOrder
      );
    }

    if (
      orderConfirmation?.orderNumber ===
      orderNumber
    ) {
      setOrderConfirmation(
        updatedOrder
      );
    }
  };

  /* =========================================================
     CHECKOUT
  ========================================================= */

  const openCheckout = () => {
    if (
      cartRef.current.length === 0
    ) {
      return false;
    }

    setSelectedProduct(null);
    setIsCartOpen(false);
    setIsOrdersOpen(false);
    setIsWishlistOpen(false);
    setIsMobileMenuOpen(false);

    setCheckoutErrors({});
    setOrderConfirmation(null);

    setIsCheckoutOpen(true);

    return true;
  };

  const closeCheckout = () => {
    setIsCheckoutOpen(false);
    setCheckoutErrors({});
  };

  const editCartFromCheckout =
    () => {
      setIsCheckoutOpen(false);
      setIsCartOpen(true);
    };

  /* =========================================================
     BODY LOCK + ESCAPE
  ========================================================= */

  useEffect(() => {
    const shouldLock =
      Boolean(selectedProduct) ||
      isCartOpen ||
      isCheckoutOpen ||
      isOrdersOpen ||
      isWishlistOpen ||
      isMobileMenuOpen;

    if (!shouldLock) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    const handleEscape = (
      event
    ) => {
      if (
        event.key !== "Escape"
      ) {
        return;
      }

      if (selectedProduct) {
        closeProductDetails();
        return;
      }

      if (isCartOpen) {
        closeCartDrawer();
        return;
      }

      if (isWishlistOpen) {
        closeWishlist();
        return;
      }

      if (isCheckoutOpen) {
        closeCheckout();
        return;
      }

      if (isOrdersOpen) {
        closeOrders();
        return;
      }

      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [
    selectedProduct,
    isCartOpen,
    isWishlistOpen,
    isCheckoutOpen,
    isOrdersOpen,
    isMobileMenuOpen,
  ]);

  /* =========================================================
     WISHLIST HELPERS
  ========================================================= */

  const isProductWishlisted = (
    productId
  ) =>
    wishlistRef.current.some(
      (id) =>
        String(id) ===
        String(productId)
    );

  const addToWishlist = (
    productId
  ) => {
    const product =
      products.find(
        (item) =>
          String(item.id) ===
          String(productId)
      );

    if (!product) {
      return {
        success: false,
        message:
          "Product could not be found.",
      };
    }

    if (
      isProductWishlisted(
        product.id
      )
    ) {
      return {
        success: true,
        alreadySaved: true,

        message: `${product.name} is already in your wishlist.`,
      };
    }

    const nextWishlist = [
      ...wishlistRef.current,
      product.id,
    ];

    saveWishlist(nextWishlist);

    setWishlistSizes(
      (current) => ({
        ...current,

        [product.id]:
          current[product.id] ||
          product.sizes?.[0] ||
          "",
      })
    );

    return {
      success: true,

      productName:
        product.name,

      message: `${product.name} has been saved to your wishlist.`,
    };
  };

  const removeFromWishlist = (
    productId
  ) => {
    const product =
      products.find(
        (item) =>
          String(item.id) ===
          String(productId)
      );

    if (
      !isProductWishlisted(
        productId
      )
    ) {
      return {
        success: false,

        message:
          product
            ? `${product.name} is not in your wishlist.`
            : "That product is not in your wishlist.",
      };
    }

    const nextWishlist =
      wishlistRef.current.filter(
        (id) =>
          String(id) !==
          String(productId)
      );

    saveWishlist(nextWishlist);

    setWishlistSizes(
      (current) => {
        const next = {
          ...current,
        };

        delete next[
          productId
        ];

        return next;
      }
    );

    return {
      success: true,

      productName:
        product?.name,

      message:
        product
          ? `${product.name} was removed from your wishlist.`
          : "Product removed from your wishlist.",
    };
  };

  const toggleWishlist = (
    productId
  ) => {
    if (
      isProductWishlisted(
        productId
      )
    ) {
      return removeFromWishlist(
        productId
      );
    }

    return addToWishlist(
      productId
    );
  };

  const clearWishlist = () => {
    saveWishlist([]);
    setWishlistSizes({});

    return {
      success: true,

      message:
        "Your wishlist has been cleared.",
    };
  };

  const setWishlistProductSize = (
    productId,
    size
  ) => {
    setWishlistSizes(
      (current) => ({
        ...current,
        [productId]: size,
      })
    );
  };

  /* =========================================================
     CART HELPERS
  ========================================================= */

  const addItemsToCart = (
    product,
    quantity = 1,
    size = null,
    options = {}
  ) => {
    const {
      openDrawer = true,
    } = options;

    const requestedQuantity =
      Math.max(
        1,
        Number(quantity) || 1
      );

    const finalSize =
      size ||
      product.sizes?.[0] ||
      null;

    const existingProductQuantity =
      cartRef.current.filter(
        (item) =>
          String(item.id) ===
          String(product.id)
      ).length;

    const remainingStock =
      Math.max(
        0,
        product.stock -
          existingProductQuantity
      );

    const quantityToAdd =
      Math.min(
        requestedQuantity,
        remainingStock
      );

    if (quantityToAdd <= 0) {
      return {
        success: false,

        quantityAdded: 0,

        message: `${product.name} has reached the available stock limit in your cart.`,
      };
    }

    const newItems =
      Array.from(
        {
          length:
            quantityToAdd,
        },

        (_, index) => ({
          ...product,

          selectedSize:
            finalSize,

          cartItemId: `${
            product.id
          }-${Date.now()}-${index}-${Math.random()}`,
        })
      );

    const nextCart = [
      ...cartRef.current,
      ...newItems,
    ];

    cartRef.current =
      nextCart;

    setCart(nextCart);

    if (openDrawer) {
      setSelectedProduct(null);
      setIsCheckoutOpen(false);
      setIsOrdersOpen(false);
      setIsWishlistOpen(false);
      setIsMobileMenuOpen(false);

      setIsCartOpen(true);
    }

    return {
      success: true,

      quantityAdded:
        quantityToAdd,
    };
  };

  const removeItemsFromCart = (
    productId,
    quantity = 1,
    size = null
  ) => {
    const currentCart =
      cartRef.current;

    const matchingItems =
      currentCart.filter(
        (item) => {
          const sameProduct =
            String(item.id) ===
            String(productId);

          const sameSize =
            !size ||
            item.selectedSize ===
              size;

          return (
            sameProduct &&
            sameSize
          );
        }
      );

    if (
      matchingItems.length === 0
    ) {
      return {
        success: false,
        quantityRemoved: 0,
      };
    }

    const quantityToRemove =
      Math.min(
        Math.max(
          1,
          Number(quantity) || 1
        ),

        matchingItems.length
      );

    let removed = 0;

    const nextCart =
      currentCart.filter(
        (item) => {
          const sameProduct =
            String(item.id) ===
            String(productId);

          const sameSize =
            !size ||
            item.selectedSize ===
              size;

          if (
            sameProduct &&
            sameSize &&
            removed <
              quantityToRemove
          ) {
            removed += 1;
            return false;
          }

          return true;
        }
      );

    cartRef.current =
      nextCart;

    setCart(nextCart);

    return {
      success: true,

      quantityRemoved:
        removed,
    };
  };

  const removeCartItem = (
    cartItemId
  ) => {
    const nextCart =
      cartRef.current.filter(
        (item) =>
          item.cartItemId !==
          cartItemId
      );

    cartRef.current =
      nextCart;

    setCart(nextCart);
  };

  const removeCartGroup = (
    productId,
    size
  ) => {
    const nextCart =
      cartRef.current.filter(
        (item) =>
          !(
            String(item.id) ===
              String(productId) &&
            item.selectedSize ===
              size
          )
      );

    cartRef.current =
      nextCart;

    setCart(nextCart);
  };

  const addProductToCart = (
    product
  ) => {
    addItemsToCart(
      product,
      1,
      product.sizes?.[0]
    );
  };

  const addSelectedProductToCart =
    () => {
      if (!selectedProduct) {
        return;
      }

      const result =
        addItemsToCart(
          selectedProduct,
          selectedQuantity,
          selectedSize
        );

      if (result.success) {
        closeProductDetails();
      }
    };

  const handleBuyNow = () => {
    if (!selectedProduct) {
      return;
    }

    const result =
      addItemsToCart(
        selectedProduct,
        selectedQuantity,
        selectedSize,
        {
          openDrawer: false,
        }
      );

    if (!result.success) {
      return;
    }

    closeProductDetails();

    setTimeout(() => {
      openCheckout();
    }, 0);
  };

  /* =========================================================
     MOVE WISHLIST TO CART
  ========================================================= */

  const moveWishlistItemToCart = (
    productId,
    requestedSize = null,
    quantity = 1
  ) => {
    const product =
      products.find(
        (item) =>
          String(item.id) ===
          String(productId)
      );

    if (!product) {
      return {
        success: false,

        message:
          "Product could not be found.",
      };
    }

    const size =
      requestedSize ||
      wishlistSizes[
        product.id
      ] ||
      product.sizes?.[0] ||
      null;

    if (
      size &&
      !product.sizes.includes(
        size
      )
    ) {
      return {
        success: false,

        availableSizes:
          product.sizes,

        message: `Size ${size} is not available for ${product.name}.`,
      };
    }

    const result =
      addItemsToCart(
        product,
        quantity,
        size,
        {
          openDrawer: false,
        }
      );

    if (!result.success) {
      return result;
    }

    removeFromWishlist(
      product.id
    );

    setIsWishlistOpen(false);
    setIsCartOpen(true);

    return {
      success: true,

      productName:
        product.name,

      quantity:
        result.quantityAdded,

      size,

      message: `${product.name} was moved from your wishlist to your cart.`,
    };
  };

  /* =========================================================
     GROUP CART
  ========================================================= */

  const createGroupedCart = (
    items
  ) => {
    const groups = new Map();

    items.forEach((item) => {
      const key = `${
        item.id
      }::${
        item.selectedSize ||
        "default"
      }`;

      if (!groups.has(key)) {
        groups.set(key, {
          ...item,
          quantity: 0,
          cartItemIds: [],
        });
      }

      const group =
        groups.get(key);

      group.quantity += 1;

      group.cartItemIds.push(
        item.cartItemId
      );
    });

    return Array.from(
      groups.values()
    );
  };

  const groupedCart = useMemo(
    () =>
      createGroupedCart(cart),
    [cart]
  );

  const increaseCartQuantity = (
    group
  ) => {
    addItemsToCart(
      group,
      1,
      group.selectedSize,
      {
        openDrawer: false,
      }
    );
  };

  const decreaseCartQuantity = (
    group
  ) => {
    if (
      group.quantity <= 1
    ) {
      removeCartGroup(
        group.id,
        group.selectedSize
      );

      return;
    }

    const itemToRemove =
      group.cartItemIds[
        group.cartItemIds
          .length - 1
      ];

    removeCartItem(
      itemToRemove
    );
  };

  const setCartProductQuantity = (
    productId,
    requestedQuantity,
    size = null
  ) => {
    const product =
      products.find(
        (item) =>
          String(item.id) ===
          String(productId)
      );

    if (!product) {
      return {
        success: false,

        message:
          "Product could not be found.",
      };
    }

    const targetQuantity =
      Math.max(
        0,
        Number(
          requestedQuantity
        ) || 0
      );

    const currentQuantity =
      cartRef.current.filter(
        (item) =>
          String(item.id) ===
            String(productId) &&
          (!size ||
            item.selectedSize ===
              size)
      ).length;

    if (
      targetQuantity ===
      currentQuantity
    ) {
      return {
        success: true,

        quantity:
          currentQuantity,
      };
    }

    if (
      targetQuantity >
      currentQuantity
    ) {
      const difference =
        targetQuantity -
        currentQuantity;

      const result =
        addItemsToCart(
          product,
          difference,
          size ||
            product.sizes?.[0],
          {
            openDrawer: true,
          }
        );

      return {
        success:
          result.success,

        quantity:
          currentQuantity +
          (result.quantityAdded ||
            0),
      };
    }

    const difference =
      currentQuantity -
      targetQuantity;

    removeItemsFromCart(
      productId,
      difference,
      size
    );

    setIsCartOpen(true);

    return {
      success: true,

      quantity:
        targetQuantity,
    };
  };

  /* =========================================================
     FINANCIALS
  ========================================================= */

  const calculateCartFinancials = (
    cartItems,
    promo
  ) => {
    const subtotal =
      cartItems.reduce(
        (total, item) =>
          total + item.price,
        0
      );

    const originalTotal =
      cartItems.reduce(
        (total, item) =>
          total +
          (item.originalPrice ||
            item.price),
        0
      );

    const productSavings =
      Math.max(
        0,
        originalTotal -
          subtotal
      );

    const freeShippingThreshold =
      10000;

    const shippingFee =
      cartItems.length === 0 ||
      subtotal >=
        freeShippingThreshold
        ? 0
        : 250;

    const freeShippingRemaining =
      Math.max(
        0,
        freeShippingThreshold -
          subtotal
      );

    const freeShippingProgress =
      Math.min(
        100,
        (subtotal /
          freeShippingThreshold) *
          100
      );

    const promoDiscount =
      promo?.type ===
      "percent"
        ? subtotal *
          (promo.value / 100)
        : promo?.type ===
          "fixed"
        ? Math.min(
            promo.value,
            subtotal
          )
        : 0;

    const totalSavings =
      productSavings +
      promoDiscount;

    const finalTotal =
      Math.max(
        0,
        subtotal -
          promoDiscount +
          shippingFee
      );

    return {
      subtotal,
      originalTotal,
      productSavings,
      shippingFee,
      freeShippingRemaining,
      freeShippingProgress,
      promoDiscount,
      totalSavings,
      finalTotal,
    };
  };

  const cartFinancials =
    calculateCartFinancials(
      cart,
      appliedPromo
    );

  const {
    subtotal: cartSubtotal,
    productSavings,
    shippingFee,
    freeShippingRemaining,
    freeShippingProgress,
    promoDiscount,
    totalSavings,
    finalTotal:
      finalCartTotal,
  } = cartFinancials;

  /* =========================================================
     PROMO
  ========================================================= */

  const applyPromoCode = (
    codeValue = promoInput
  ) => {
    const code = String(
      codeValue || ""
    )
      .trim()
      .toUpperCase();

    const liveSubtotal =
      cartRef.current.reduce(
        (total, item) =>
          total + item.price,
        0
      );

    if (liveSubtotal <= 0) {
      const result = {
        success: false,

        message:
          "Add something to your cart before applying a promo code.",
      };

      setPromoMessage({
        text: result.message,
        type: "error",
      });

      return result;
    }

    if (code === "PAK10") {
      if (
        liveSubtotal < 3000
      ) {
        const result = {
          success: false,

          message:
            "PAK10 requires a minimum order of PKR 3,000.",
        };

        setPromoMessage({
          text: result.message,
          type: "error",
        });

        return result;
      }

      const promo = {
        code: "PAK10",
        type: "percent",
        value: 10,
      };

      appliedPromoRef.current =
        promo;

      setAppliedPromo(promo);
      setPromoInput("PAK10");

      setPromoMessage({
        text:
          "PAK10 applied — you saved an extra 10%.",

        type: "success",
      });

      return {
        success: true,

        code: "PAK10",

        message:
          "PAK10 applied successfully.",
      };
    }

    if (
      code === "WELCOME500"
    ) {
      if (
        liveSubtotal < 5000
      ) {
        const result = {
          success: false,

          message:
            "WELCOME500 requires a minimum order of PKR 5,000.",
        };

        setPromoMessage({
          text: result.message,
          type: "error",
        });

        return result;
      }

      const promo = {
        code: "WELCOME500",
        type: "fixed",
        value: 500,
      };

      appliedPromoRef.current =
        promo;

      setAppliedPromo(promo);

      setPromoInput(
        "WELCOME500"
      );

      setPromoMessage({
        text:
          "WELCOME500 applied — PKR 500 off your order.",

        type: "success",
      });

      return {
        success: true,

        code: "WELCOME500",

        message:
          "WELCOME500 applied successfully.",
      };
    }

    const result = {
      success: false,

      message:
        "That promo code is not valid.",
    };

    setPromoMessage({
      text: result.message,
      type: "error",
    });

    return result;
  };

  const removePromoCode = () => {
    appliedPromoRef.current =
      null;

    setAppliedPromo(null);
    setPromoInput("");

    setPromoMessage({
      text: "",
      type: "",
    });
  };

  useEffect(() => {
    if (
      cart.length !== 0
    ) {
      return;
    }

    appliedPromoRef.current =
      null;

    setAppliedPromo(null);
    setPromoInput("");

    setPromoMessage({
      text: "",
      type: "",
    });
  }, [cart.length]);

  /* =========================================================
     CHECKOUT FORM
  ========================================================= */

  const setCheckoutFields = (
    updates
  ) => {
    const nextForm = {
      ...checkoutRef.current,
      ...updates,
    };

    checkoutRef.current =
      nextForm;

    setCheckoutForm(nextForm);

    setCheckoutErrors(
      (currentErrors) => {
        const nextErrors = {
          ...currentErrors,
        };

        Object.keys(
          updates
        ).forEach((key) => {
          delete nextErrors[
            key
          ];
        });

        return nextErrors;
      }
    );

    return nextForm;
  };

  const handleCheckoutChange = (
    event
  ) => {
    const {
      name,
      value,
    } = event.target;

    setCheckoutFields({
      [name]: value,
    });
  };

  /* =========================================================
     CHECKOUT VALIDATION
  ========================================================= */

  const validateCheckout = (
    form
  ) => {
    const errors = {};

    if (
      !form.fullName.trim()
    ) {
      errors.fullName =
        "Please enter your full name.";
    }

    if (!form.email.trim()) {
      errors.email =
        "Please enter your email.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        form.email.trim()
      )
    ) {
      errors.email =
        "Enter a valid email address.";
    }

    const phoneDigits =
      form.phone.replace(
        /\D/g,
        ""
      );

    if (!form.phone.trim()) {
      errors.phone =
        "Please enter your phone number.";
    } else if (
      phoneDigits.length < 10
    ) {
      errors.phone =
        "Enter a valid Pakistani phone number.";
    }

    if (!form.province) {
      errors.province =
        "Select your province.";
    }

    if (!form.city.trim()) {
      errors.city =
        "Please enter your city.";
    }

    if (
      !form.address.trim()
    ) {
      errors.address =
        "Please enter your delivery address.";
    }

    if (
      !form.paymentMethod
    ) {
      errors.paymentMethod =
        "Select a payment method.";
    }

    return errors;
  };

  /* =========================================================
     PLACE ORDER
  ========================================================= */

  const submitOrder = (
    optionalFormOverrides = {}
  ) => {
    if (
      cartRef.current.length ===
      0
    ) {
      return {
        success: false,

        message:
          "Your cart is empty.",
      };
    }

    const finalForm = {
      ...checkoutRef.current,
      ...optionalFormOverrides,
    };

    checkoutRef.current =
      finalForm;

    setCheckoutForm(finalForm);

    const errors =
      validateCheckout(
        finalForm
      );

    if (
      Object.keys(errors)
        .length > 0
    ) {
      setCheckoutErrors(
        errors
      );

      setIsCartOpen(false);
      setIsWishlistOpen(false);
      setIsCheckoutOpen(true);

      return {
        success: false,

        message:
          "Some checkout information is missing or invalid.",
      };
    }

    const cartSnapshot = [
      ...cartRef.current,
    ];

    const groupedSnapshot =
      createGroupedCart(
        cartSnapshot
      );

    const financials =
      calculateCartFinancials(
        cartSnapshot,
        appliedPromoRef.current
      );

    const timestamp =
      Date.now();

    const orderNumber = `PKS-${String(
      timestamp
    ).slice(-6)}`;

    const placedAt =
      new Date().toLocaleString();

    const order = {
      orderNumber,
      placedAt,

      createdTimestamp:
        timestamp,

      status: "Confirmed",

      trackingStatus:
        "confirmed",

      trackingUpdatedAt:
        placedAt,

      trackingHistory: [
        {
          status:
            "confirmed",

          label:
            "Confirmed",

          at: placedAt,
        },
      ],

      customer: {
        fullName:
          finalForm.fullName,

        email:
          finalForm.email,

        phone:
          finalForm.phone,
      },

      delivery: {
        province:
          finalForm.province,

        city:
          finalForm.city,

        address:
          finalForm.address,

        postalCode:
          finalForm.postalCode,

        notes:
          finalForm.notes,

        estimate:
          getDeliveryEstimate(
            finalForm.city
          ),
      },

      paymentMethod:
        finalForm.paymentMethod,

      paymentLabel:
        paymentLabels[
          finalForm.paymentMethod
        ],

      items:
        groupedSnapshot,

      promo:
        appliedPromoRef.current,

      subtotal:
        financials.subtotal,

      promoDiscount:
        financials.promoDiscount,

      shippingFee:
        financials.shippingFee,

      total:
        financials.finalTotal,
    };

    const nextOrders = [
      order,
      ...ordersRef.current,
    ];

    saveOrders(nextOrders);

    setOrderConfirmation(
      order
    );

    setCheckoutErrors({});

    cartRef.current = [];
    setCart([]);

    appliedPromoRef.current =
      null;

    setAppliedPromo(null);
    setPromoInput("");

    setPromoMessage({
      text: "",
      type: "",
    });

    setIsCartOpen(false);
    setIsWishlistOpen(false);
    setIsCheckoutOpen(true);

    return {
      success: true,

      orderNumber,

      status:
        order.status,

      total:
        order.total,

      city:
        order.delivery.city,

      deliveryEstimate:
        order.delivery.estimate,

      paymentMethod:
        order.paymentLabel,

      message: `Order ${orderNumber} has been confirmed.`,
    };
  };

  const handlePlaceOrder = (
    event
  ) => {
    event.preventDefault();
    submitOrder();
  };

  const finishOrderFlow = () => {
    setOrderConfirmation(
      null
    );

    setIsCheckoutOpen(
      false
    );

    checkoutRef.current = {
      ...initialCheckoutForm,
    };

    setCheckoutForm({
      ...initialCheckoutForm,
    });

    scrollToProducts();
  };

  /* =========================================================
     AIROMOB TOOLS
  ========================================================= */

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

  /* =========================================================
     SEARCH / FILTER / SORT
  ========================================================= */

  const categories = [
    "All",

    ...new Set(
      products.map(
        (product) =>
          product.category
      )
    ),
  ];

  const filteredProducts =
    products
      .filter((product) => {
        const searchValue =
          searchTerm
            .toLowerCase()
            .trim();

        const matchesSearch =
          searchValue === "" ||
          product.name
            .toLowerCase()
            .includes(
              searchValue
            ) ||
          product.category
            .toLowerCase()
            .includes(
              searchValue
            ) ||
          product.collection
            .toLowerCase()
            .includes(
              searchValue
            ) ||
          product.color
            .toLowerCase()
            .includes(
              searchValue
            ) ||
          product.description
            .toLowerCase()
            .includes(
              searchValue
            );

        const matchesCategory =
          selectedCategory ===
            "All" ||
          product.category ===
            selectedCategory;

        return (
          matchesSearch &&
          matchesCategory
        );
      })
      .sort((a, b) => {
        switch (sortOption) {
          case "price-low":
            return (
              a.price -
              b.price
            );

          case "price-high":
            return (
              b.price -
              a.price
            );

          case "rating":
            return (
              b.rating -
              a.rating
            );

          case "newest":
            return (
              b.id -
              a.id
            );

          default:
            return (
              a.id -
              b.id
            );
        }
      });

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSortOption(
      "featured"
    );
  };

  const filtersActive =
    searchTerm !== "" ||
    selectedCategory !==
      "All" ||
    sortOption !==
      "featured";

  /* =========================================================
     AI CONTEXT
  ========================================================= */

  const productCatalog =
    products
      .map(
        (product) =>
          `ID: ${product.id} | ${product.name} | Category: ${product.category} | Collection: ${product.collection} | Price: PKR ${product.price} | Color: ${product.color} | Sizes: ${product.sizes.join(
            ", "
          )} | Stock: ${product.stock} | Rating: ${product.rating}`
      )
      .join("\n");

  const cartContext =
    groupedCart.length === 0
      ? "Cart is currently empty."
      : groupedCart
          .map(
            (item) =>
              `${item.name} | Product ID: ${item.id} | Size: ${
                item.selectedSize ||
                "Default"
              } | Quantity: ${
                item.quantity
              }`
          )
          .join("\n");

  const wishlistContext =
    wishlistProducts.length ===
    0
      ? "Wishlist is currently empty."
      : wishlistProducts
          .map(
            (product) =>
              `${product.name} | Product ID: ${product.id} | Price: PKR ${product.price} | Sizes: ${product.sizes.join(
                ", "
              )}`
          )
          .join("\n");

  const ordersContext =
    orders.length === 0
      ? "No previous orders."
      : orders
          .slice(0, 5)
          .map(
            (order) =>
              `${order.orderNumber} | Status: ${order.status} | City: ${order.delivery.city} | Total: PKR ${order.total}`
          )
          .join("\n");

  const pakShopContext = `
You are PakShop's AI shopping assistant for a premium Pakistani e-commerce store.

You help customers:
- discover and compare products
- check prices, colors, sizes and stock
- save products to a wishlist
- remove products from the wishlist
- move wishlist products into the cart
- add and remove cart items
- update quantities
- apply promo codes
- proceed to checkout
- collect delivery details
- select payment methods
- place orders after explicit confirmation
- view previous orders
- track order status

IMPORTANT:
- Prices are in Pakistani Rupees (PKR).
- Speak naturally in English or Roman Urdu depending on the customer.
- Be friendly, concise and conversational.
- Recommend only products from the provided catalog.
- Never invent products, prices, sizes, stock or order information.
- Never claim that an action succeeded unless its tool reports success.

AVAILABLE PRODUCTS:

${productCatalog}

CURRENT CART:

${cartContext}

CURRENT WISHLIST:

${wishlistContext}

RECENT ORDERS:

${ordersContext}

STORE INFORMATION:

- Cash on Delivery is available across Pakistan.
- Lahore and Islamabad delivery takes 2-3 working days.
- Karachi delivery takes 3-4 working days.
- Other Pakistani cities take 3-5 working days.
- Standard delivery costs PKR 250.
- Delivery is free for cart subtotals of PKR 10,000 or more.
- Eligible unused products may be returned within 7 days.

ORDER TRACKING:

Confirmed -> Processing -> Shipped -> Out for Delivery -> Delivered

PROMO CODES:

- PAK10 gives 10% off on orders of at least PKR 3,000.
- WELCOME500 gives PKR 500 off on orders of at least PKR 5,000.

PAYMENT METHODS:

- Cash on Delivery
- EasyPaisa
- JazzCash
- Debit / Credit Card

TOOL RULES:

- add_to_wishlist: save a product.
- remove_from_wishlist: remove a saved product.
- open_wishlist: show wishlist.
- move_wishlist_to_cart: move saved item into cart.
- add_to_cart: add product to cart.
- remove_from_cart: remove product from cart.
- open_cart: open shopping cart.
- update_cart_quantity: update cart quantity.
- apply_coupon: apply promo codes.
- proceed_to_checkout: open checkout.
- update_checkout_details: update delivery information.
- select_payment_method: select payment.
- place_order: only after explicit customer confirmation.
- open_order_history: show previous orders.
- track_order: track a specific or latest order.
`;

  /* =========================================================
     UI
  ========================================================= */

  return (
    <div className="shop-page">
      {/* =====================================================
          ANNOUNCEMENT BAR
      ====================================================== */}

      <div className="announcement-bar">
        <div className="announcement-inner">
          <span>
            🇵🇰 Proudly serving Pakistan
          </span>

          <span className="announcement-separator">
            •
          </span>

          <span>
            Free delivery over PKR 10,000
          </span>

          <span className="announcement-separator">
            •
          </span>

          <span>
            Cash on Delivery available
          </span>

          <span className="announcement-separator">
            •
          </span>

          <span>
            7-day eligible returns
          </span>
        </div>
      </div>

      {/* =====================================================
          PREMIUM NAVBAR
      ====================================================== */}

      <header className="shop-header premium-navbar">
        <div className="navbar-left">
          <button
            className="mobile-menu-button"
            onClick={() =>
              setIsMobileMenuOpen(
                true
              )
            }
            aria-label="Open navigation"
          >
            ☰
          </button>

          <button
            className="brand-area brand-button"
            onClick={() => {
              setSelectedCategory(
                "All"
              );

              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            <div className="brand-mark">
              P
            </div>

            <div>
              <h1>
                PakShop
              </h1>

              <p>
                Pakistani Fashion
              </p>
            </div>
          </button>
        </div>

        <nav className="desktop-navigation">
          <button
            className={
              selectedCategory ===
              "All"
                ? "active"
                : ""
            }
            onClick={() =>
              navigateToCategory(
                "All"
              )
            }
          >
            Shop
          </button>

          <button
            className={
              selectedCategory ===
              "Men"
                ? "active"
                : ""
            }
            onClick={() =>
              navigateToCategory(
                "Men"
              )
            }
          >
            Men
          </button>

          <button
            className={
              selectedCategory ===
              "Women"
                ? "active"
                : ""
            }
            onClick={() =>
              navigateToCategory(
                "Women"
              )
            }
          >
            Women
          </button>

          <button
            className={
              selectedCategory ===
              "Kids"
                ? "active"
                : ""
            }
            onClick={() =>
              navigateToCategory(
                "Kids"
              )
            }
          >
            Kids
          </button>

          <button
            className={
              selectedCategory ===
              "Footwear"
                ? "active"
                : ""
            }
            onClick={() =>
              navigateToCategory(
                "Footwear"
              )
            }
          >
            Footwear
          </button>

          <button
            onClick={
              showBestSellers
            }
          >
            Best Sellers
          </button>
        </nav>

        <div className="header-actions premium-header-actions">
          <button
            className="header-icon-action wishlist-header-badge"
            onClick={
              openWishlist
            }
          >
            <span className="header-action-icon">
              ♡
            </span>

            <span className="header-action-label">
              Wishlist
            </span>

            {wishlist.length >
              0 && (
              <b>
                {
                  wishlist.length
                }
              </b>
            )}
          </button>

          <button
            className="header-icon-action orders-header-badge"
            onClick={
              openOrders
            }
          >
            <span className="header-action-icon">
              📦
            </span>

            <span className="header-action-label">
              Orders
            </span>

            {orders.length >
              0 && (
              <b>
                {
                  orders.length
                }
              </b>
            )}
          </button>

          <button
            className="header-icon-action cart-badge cart-trigger"
            onClick={
              openCartDrawer
            }
          >
            <span className="header-action-icon">
              🛒
            </span>

            <span className="header-action-label">
              Cart
            </span>

            {cart.length > 0 && (
              <b>
                {
                  cart.length
                }
              </b>
            )}
          </button>
        </div>
      </header>

      {/* =====================================================
          MOBILE NAVIGATION
      ====================================================== */}

      {isMobileMenuOpen && (
        <div className="mobile-nav-layer">
          <button
            className="mobile-nav-backdrop"
            onClick={() =>
              setIsMobileMenuOpen(
                false
              )
            }
            aria-label="Close menu"
          />

          <aside className="mobile-navigation">
            <div className="mobile-nav-header">
              <div className="brand-area">
                <div className="brand-mark">
                  P
                </div>

                <div>
                  <h1>
                    PakShop
                  </h1>

                  <p>
                    Pakistani Fashion
                  </p>
                </div>
              </div>

              <button
                className="mobile-nav-close"
                onClick={() =>
                  setIsMobileMenuOpen(
                    false
                  )
                }
              >
                ×
              </button>
            </div>

            <div className="mobile-nav-promo">
              <span>✨</span>

              <p>
                <strong>
                  Welcome to PakShop
                </strong>

                Premium Pakistani
                fashion with
                voice-powered shopping.
              </p>
            </div>

            <nav className="mobile-nav-links">
              <button
                onClick={() =>
                  navigateToCategory(
                    "All"
                  )
                }
              >
                <span>
                  Shop All
                </span>
                <b>→</b>
              </button>

              <button
                onClick={() =>
                  navigateToCategory(
                    "Men"
                  )
                }
              >
                <span>
                  Men's Collection
                </span>
                <b>→</b>
              </button>

              <button
                onClick={() =>
                  navigateToCategory(
                    "Women"
                  )
                }
              >
                <span>
                  Women's Collection
                </span>
                <b>→</b>
              </button>

              <button
                onClick={() =>
                  navigateToCategory(
                    "Kids"
                  )
                }
              >
                <span>
                  Kids' Collection
                </span>
                <b>→</b>
              </button>

              <button
                onClick={() =>
                  navigateToCategory(
                    "Footwear"
                  )
                }
              >
                <span>
                  Footwear
                </span>
                <b>→</b>
              </button>

              <button
                onClick={
                  showBestSellers
                }
              >
                <span>
                  Best Sellers
                </span>
                <b>→</b>
              </button>
            </nav>

            <div className="mobile-nav-account">
              <button
                onClick={
                  openWishlist
                }
              >
                ♡ Wishlist
                <span>
                  {
                    wishlist.length
                  }
                </span>
              </button>

              <button
                onClick={
                  openOrders
                }
              >
                📦 My Orders
                <span>
                  {
                    orders.length
                  }
                </span>
              </button>

              <button
                onClick={
                  openCartDrawer
                }
              >
                🛒 Shopping Cart
                <span>
                  {
                    cart.length
                  }
                </span>
              </button>
            </div>

            <div className="mobile-nav-footer">
              🇵🇰 Delivery across Pakistan
            </div>
          </aside>
        </div>
      )}

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="hero premium-hero">
        <div className="premium-hero-content">
          <div className="hero-kicker">
            <span />
            THE PAKSHOP EDIT
          </div>

          <h2>
            Pakistani Fashion,
            <span>
              Reimagined.
            </span>
          </h2>

          <p>
            Discover timeless eastern
            wear, festive collections
            and traditional essentials
            — with an AI shopping
            assistant ready to help
            throughout your journey.
          </p>

          <div className="hero-actions">
            <button
              className="hero-primary-button"
              onClick={() =>
                navigateToCategory(
                  "All"
                )
              }
            >
              Shop the Collection
              <span>→</span>
            </button>

            <button
              className="hero-secondary-button"
              onClick={
                showBestSellers
              }
            >
              Explore Best Sellers
            </button>
          </div>

          <div className="hero-store-highlights">
            <div>
              <strong>
                12+
              </strong>

              <span>
                Curated Styles
              </span>
            </div>

            <div>
              <strong>
                4.8★
              </strong>

              <span>
                Customer Rating
              </span>
            </div>

            <div>
              <strong>
                2–5
              </strong>

              <span>
                Day Delivery
              </span>
            </div>
          </div>
        </div>

        <div className="premium-hero-visual">
          <div className="hero-main-image">
            <img
              src="/products/emerald-lawn-3-piece-suit.webp"
              alt="Premium Pakistani fashion"
            />

            <div className="hero-image-badge">
              <span>
                NEW SEASON
              </span>

              <strong>
                Summer Lawn
              </strong>
            </div>
          </div>

          <div className="hero-secondary-image">
            <img
              src="/products/black-cotton-kurta.webp"
              alt="Pakistani men's kurta"
            />
          </div>

          <div className="hero-ai-card">
            <span className="hero-ai-icon">
              ✦
            </span>

            <div>
              <small>
                AI SHOPPING
              </small>

              <strong>
                Ask PakShop
              </strong>

              <p>
                Shop naturally with
                your voice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          TRUST STRIP
      ====================================================== */}

      <section className="store-trust-strip">
        <div>
          <span>
            🚚
          </span>

          <div>
            <strong>
              Nationwide Delivery
            </strong>

            <p>
              2–5 working days
            </p>
          </div>
        </div>

        <div>
          <span>
            💵
          </span>

          <div>
            <strong>
              Cash on Delivery
            </strong>

            <p>
              Available across Pakistan
            </p>
          </div>
        </div>

        <div>
          <span>
            ↩
          </span>

          <div>
            <strong>
              Easy Returns
            </strong>

            <p>
              7-day eligible returns
            </p>
          </div>
        </div>

        <div>
          <span>
            ✦
          </span>

          <div>
            <strong>
              AI Shopping
            </strong>

            <p>
              Voice-powered assistance
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          COLLECTIONS
      ====================================================== */}

      <section className="collections-showcase">
        <div className="storefront-section-heading">
          <div>
            <p>
              SHOP BY CATEGORY
            </p>

            <h2>
              Find Your
              <span>
                Signature Style
              </span>
            </h2>
          </div>

          <button
            onClick={() =>
              navigateToCategory(
                "All"
              )
            }
          >
            View All Products →
          </button>
        </div>

        <div className="collection-card-grid">
          {collectionCards.map(
            (collection) => (
              <button
                key={
                  collection.category
                }
                className="collection-showcase-card"
                onClick={() =>
                  navigateToCategory(
                    collection.category
                  )
                }
              >
                <img
                  src={
                    collection.image
                  }
                  alt={
                    collection.title
                  }
                />

                <div className="collection-card-overlay" />

                <div className="collection-card-content">
                  <small>
                    {
                      collection.eyebrow
                    }
                  </small>

                  <h3>
                    {
                      collection.title
                    }
                  </h3>

                  <p>
                    {
                      collection.description
                    }
                  </p>

                  <span>
                    Explore Collection
                    →
                  </span>
                </div>
              </button>
            )
          )}
        </div>
      </section>

      {/* =====================================================
          PRODUCTS
      ====================================================== */}

      <section className="products-section">
        <div className="section-heading">
          <div>
            <p className="section-label">
              SHOP THE COLLECTION
            </p>

            <h2>
              Discover Our Products
            </h2>
          </div>

          <span>
            {
              filteredProducts.length
            }{" "}
            of {products.length}{" "}
            Products
          </span>
        </div>

        <div className="shop-controls">
          <div className="product-search">
            <span className="search-icon">
              🔍
            </span>

            <input
              type="text"
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(
                  event.target.value
                )
              }
              placeholder="Search kurtas, lawn suits, footwear..."
            />

            {searchTerm && (
              <button
                className="search-clear"
                onClick={() =>
                  setSearchTerm("")
                }
              >
                ×
              </button>
            )}
          </div>

          <div className="category-filters">
            {categories.map(
              (category) => (
                <button
                  key={category}
                  className={`category-filter-button ${
                    selectedCategory ===
                    category
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setSelectedCategory(
                      category
                    )
                  }
                >
                  {category}
                </button>
              )
            )}
          </div>

          <div className="sort-wrapper">
            <label htmlFor="product-sort">
              Sort:
            </label>

            <select
              id="product-sort"
              value={sortOption}
              onChange={(event) =>
                setSortOption(
                  event.target.value
                )
              }
              className="sort-select"
            >
              <option value="featured">
                Featured
              </option>

              <option value="price-low">
                Price: Low to High
              </option>

              <option value="price-high">
                Price: High to Low
              </option>

              <option value="rating">
                Highest Rated
              </option>

              <option value="newest">
                Newest
              </option>
            </select>
          </div>
        </div>

        <div className="results-bar">
          <p>
            Showing{" "}
            <strong>
              {
                filteredProducts.length
              }
            </strong>{" "}
            products
          </p>

          {filtersActive && (
            <button
              className="clear-filters-button"
              onClick={
                clearFilters
              }
            >
              Clear Filters
            </button>
          )}
        </div>

        {filteredProducts.length >
        0 ? (
          <div className="product-grid">
            {filteredProducts.map(
              (
                product,
                index
              ) => {
                const discountPercentage =
                  Math.round(
                    ((product.originalPrice -
                      product.price) /
                      product.originalPrice) *
                      100
                  );

                const isWishlisted =
                  wishlist.some(
                    (id) =>
                      String(id) ===
                      String(
                        product.id
                      )
                  );

                return (
                  <article
                    className="product-card"
                    key={
                      product.id
                    }
                  >
                    <div
                      className="product-image-wrapper"
                      onClick={() =>
                        openProductDetails(
                          product
                        )
                      }
                    >
                      <img
                        src={
                          product.image
                        }
                        alt={
                          product.name
                        }
                        className="product-image"
                        loading={
                          index < 4
                            ? "eager"
                            : "lazy"
                        }
                        fetchPriority={
                          index < 4
                            ? "high"
                            : "auto"
                        }
                      />

                      {product.badge && (
                        <span className="product-badge">
                          {
                            product.badge
                          }
                        </span>
                      )}

                      {product.originalPrice >
                        product.price && (
                        <span className="discount-badge">
                          -
                          {
                            discountPercentage
                          }
                          %
                        </span>
                      )}

                      <button
                        className={`product-wishlist-button ${
                          isWishlisted
                            ? "active"
                            : ""
                        }`}
                        onClick={(
                          event
                        ) => {
                          event.stopPropagation();

                          toggleWishlist(
                            product.id
                          );
                        }}
                      >
                        {isWishlisted
                          ? "♥"
                          : "♡"}
                      </button>

                      <button
                        className="quick-view-button"
                        onClick={(
                          event
                        ) => {
                          event.stopPropagation();

                          openProductDetails(
                            product
                          );
                        }}
                      >
                        Quick View
                      </button>
                    </div>

                    <div className="product-content">
                      <div className="product-meta">
                        <p className="product-category">
                          {
                            product.category
                          }
                        </p>

                        <span className="product-rating">
                          ★{" "}
                          {
                            product.rating
                          }
                        </span>
                      </div>

                      <h3
                        className="product-title-link"
                        onClick={() =>
                          openProductDetails(
                            product
                          )
                        }
                      >
                        {product.name}
                      </h3>

                      <p className="product-collection">
                        {
                          product.collection
                        }
                      </p>

                      <div className="product-price-row">
                        <p className="product-price">
                          {formatPKR(
                            product.price
                          )}
                        </p>

                        {product.originalPrice >
                          product.price && (
                          <span className="original-price">
                            {formatPKR(
                              product.originalPrice
                            )}
                          </span>
                        )}
                      </div>

                      <div className="product-info">
                        <span>
                          Color:{" "}
                          {
                            product.color
                          }
                        </span>

                        <span>
                          Sizes:{" "}
                          {product.sizes.join(
                            ", "
                          )}
                        </span>

                        <span>
                          {
                            product.stock
                          }{" "}
                          in stock
                        </span>
                      </div>

                      <div className="product-rating-details">
                        <span>
                          ★★★★★
                        </span>

                        <small>
                          {
                            product.reviews
                          }{" "}
                          reviews
                        </small>
                      </div>

                      <div className="product-card-actions">
                        <button
                          className="view-product-button"
                          onClick={() =>
                            openProductDetails(
                              product
                            )
                          }
                        >
                          View Details
                        </button>

                        <button
                          className="add-cart-button"
                          onClick={() =>
                            addProductToCart(
                              product
                            )
                          }
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </article>
                );
              }
            )}
          </div>
        ) : (
          <div className="no-products">
            <div className="no-products-icon">
              🔍
            </div>

            <h3>
              No products found
            </h3>

            <p>
              Try changing your
              search or filters.
            </p>

            <button
              onClick={
                clearFilters
              }
            >
              View All Products
            </button>
          </div>
        )}
      </section>

      {/* =====================================================
          BRAND STORY
      ====================================================== */}

      <section className="brand-story-section">
        <div className="brand-story-image">
          <img
            src="/products/midnight-blue-formal-suit.webp"
            alt="PakShop premium formal wear"
          />

          <div className="brand-story-floating-card">
            <strong>
              Pakistani Roots
            </strong>

            <span>
              Modern Experience
            </span>
          </div>
        </div>

        <div className="brand-story-content">
          <p className="brand-story-label">
            OUR APPROACH
          </p>

          <h2>
            Tradition meets
            <span>
              intelligent shopping.
            </span>
          </h2>

          <p className="brand-story-description">
            PakShop brings together
            familiar Pakistani
            silhouettes and a modern
            digital shopping
            experience. Browse,
            compare, save favorites,
            checkout and track your
            order — all from one
            premium storefront.
          </p>

          <div className="brand-story-features">
            <div>
              <span>01</span>

              <div>
                <strong>
                  Curated Fashion
                </strong>

                <p>
                  Eastern wear selected
                  across men, women,
                  kids and traditional
                  footwear.
                </p>
              </div>
            </div>

            <div>
              <span>02</span>

              <div>
                <strong>
                  Voice Commerce
                </strong>

                <p>
                  AIROMOB-powered
                  shopping actions
                  connect conversation
                  directly to the store.
                </p>
              </div>
            </div>

            <div>
              <span>03</span>

              <div>
                <strong>
                  Pakistan First
                </strong>

                <p>
                  PKR pricing, COD,
                  Pakistani delivery
                  cities and local
                  shopping behavior.
                </p>
              </div>
            </div>
          </div>

          <button
            className="brand-story-button"
            onClick={() =>
              navigateToCategory(
                "All"
              )
            }
          >
            Discover PakShop
            <span>→</span>
          </button>
        </div>
      </section>

      {/* =====================================================
          NEWSLETTER
      ====================================================== */}

      <section className="newsletter-section">
        <div className="newsletter-copy">
          <span className="newsletter-icon">
            ✦
          </span>

          <div>
            <p>
              THE PAKSHOP LIST
            </p>

            <h2>
              New drops.
              <span>
                Better style.
              </span>
            </h2>

            <p className="newsletter-description">
              Join our demo mailing
              list for new collections,
              seasonal edits and
              exclusive PakShop
              promotions.
            </p>
          </div>
        </div>

        <form
          className="newsletter-form"
          onSubmit={
            handleNewsletterSubmit
          }
        >
          <div className="newsletter-input-row">
            <input
              type="email"
              value={
                newsletterEmail
              }
              onChange={(event) => {
                setNewsletterEmail(
                  event.target.value
                );

                setNewsletterMessage(
                  ""
                );
              }}
              placeholder="Enter your email address"
            />

            <button type="submit">
              Join the List
              <span>→</span>
            </button>
          </div>

          {newsletterMessage && (
            <p className="newsletter-message">
              {
                newsletterMessage
              }
            </p>
          )}

          <small>
            Demo newsletter only. No
            marketing email is
            actually sent.
          </small>
        </form>
      </section>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer className="store-footer">
        <div className="footer-main">
          <div className="footer-brand-column">
            <div className="footer-brand">
              <div className="brand-mark">
                P
              </div>

              <div>
                <h2>
                  PakShop
                </h2>

                <p>
                  Pakistani Fashion
                </p>
              </div>
            </div>

            <p className="footer-brand-description">
              A premium Pakistani
              e-commerce experience
              combining eastern fashion
              with AI-powered voice
              shopping.
            </p>

            <div className="footer-country">
              <span>
                🇵🇰
              </span>

              <div>
                <strong>
                  Made for Pakistan
                </strong>

                <p>
                  PKR • COD • Nationwide
                  delivery
                </p>
              </div>
            </div>
          </div>

          <div className="footer-links-column">
            <h3>
              Shop
            </h3>

            <button
              onClick={() =>
                navigateToCategory(
                  "Men"
                )
              }
            >
              Men
            </button>

            <button
              onClick={() =>
                navigateToCategory(
                  "Women"
                )
              }
            >
              Women
            </button>

            <button
              onClick={() =>
                navigateToCategory(
                  "Kids"
                )
              }
            >
              Kids
            </button>

            <button
              onClick={() =>
                navigateToCategory(
                  "Footwear"
                )
              }
            >
              Footwear
            </button>

            <button
              onClick={
                showBestSellers
              }
            >
              Best Sellers
            </button>
          </div>

          <div className="footer-links-column">
            <h3>
              My PakShop
            </h3>

            <button
              onClick={
                openWishlist
              }
            >
              Wishlist
            </button>

            <button
              onClick={
                openCartDrawer
              }
            >
              Shopping Cart
            </button>

            <button
              onClick={
                openOrders
              }
            >
              My Orders
            </button>

            <button
              onClick={() => {
                if (
                  orders.length >
                  0
                ) {
                  setSelectedOrder(
                    orders[0]
                  );

                  setIsOrdersOpen(
                    true
                  );
                } else {
                  openOrders();
                }
              }}
            >
              Track an Order
            </button>
          </div>

          <div className="footer-links-column footer-help-column">
            <h3>
              Customer Care
            </h3>

            <span>
              🚚 Delivery: 2–5 days
            </span>

            <span>
              ↩ Returns: 7 days
            </span>

            <span>
              💵 Cash on Delivery
            </span>

            <span>
              ✦ AI Shopping Assistant
            </span>

            <span>
              📍 Delivery across
              Pakistan
            </span>
          </div>
        </div>

        <div className="footer-payment-strip">
          <div>
            <span>
              Secure Demo Payments
            </span>

            <strong>
              COD
            </strong>

            <strong>
              EasyPaisa
            </strong>

            <strong>
              JazzCash
            </strong>

            <strong>
              Visa
            </strong>

            <strong>
              Mastercard
            </strong>
          </div>

          <div>
            🔒 Secure shopping
            experience
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © 2026 PakShop. Technical
            demonstration storefront.
          </p>

          <p>
            Voice shopping powered by
            <strong>
              AIROMOB
            </strong>
          </p>
        </div>
      </footer>

      {/* =====================================================
          PRODUCT MODAL
      ====================================================== */}

      {selectedProduct && (
        <div
          className="product-modal-overlay"
          onClick={
            closeProductDetails
          }
        >
          <div
            className="product-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <button
              className="product-modal-close"
              onClick={
                closeProductDetails
              }
            >
              ×
            </button>

            <div className="product-modal-image-section">
              <img
                src={
                  selectedProduct.image
                }
                alt={
                  selectedProduct.name
                }
                className="product-modal-image"
              />

              {selectedProduct.badge && (
                <span className="modal-product-badge">
                  {
                    selectedProduct.badge
                  }
                </span>
              )}

              <button
                className={`modal-wishlist-button ${
                  isProductWishlisted(
                    selectedProduct.id
                  )
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  toggleWishlist(
                    selectedProduct.id
                  )
                }
              >
                {isProductWishlisted(
                  selectedProduct.id
                )
                  ? "♥"
                  : "♡"}
              </button>
            </div>

            <div className="product-modal-details">
              <p className="modal-category">
                {
                  selectedProduct.category
                }{" "}
                /{" "}
                {
                  selectedProduct.collection
                }
              </p>

              <h2>
                {
                  selectedProduct.name
                }
              </h2>

              <div className="modal-rating-row">
                <span>
                  ★{" "}
                  {
                    selectedProduct.rating
                  }
                </span>

                <span>
                  {
                    selectedProduct.reviews
                  }{" "}
                  verified reviews
                </span>
              </div>

              <div className="modal-price-row">
                <strong>
                  {formatPKR(
                    selectedProduct.price
                  )}
                </strong>

                <span>
                  {formatPKR(
                    selectedProduct.originalPrice
                  )}
                </span>

                <small>
                  Save{" "}
                  {formatPKR(
                    selectedProduct.originalPrice -
                      selectedProduct.price
                  )}
                </small>
              </div>

              <p className="modal-description">
                {
                  selectedProduct.description
                }
              </p>

              <div className="modal-option-group">
                <div className="modal-option-heading">
                  <span>
                    Color
                  </span>

                  <strong>
                    {
                      selectedProduct.color
                    }
                  </strong>
                </div>
              </div>

              <div className="modal-option-group">
                <div className="modal-option-heading">
                  <span>
                    Select Size
                  </span>
                </div>

                <div className="modal-size-options">
                  {selectedProduct.sizes.map(
                    (size) => (
                      <button
                        key={size}
                        className={`modal-size-button ${
                          selectedSize ===
                          size
                            ? "active"
                            : ""
                        }`}
                        onClick={() =>
                          setSelectedSize(
                            size
                          )
                        }
                      >
                        {size}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div className="modal-option-group">
                <div className="modal-option-heading">
                  <span>
                    Quantity
                  </span>

                  <small className="modal-stock">
                    {
                      selectedProduct.stock
                    }{" "}
                    available
                  </small>
                </div>

                <div className="quantity-selector">
                  <button
                    onClick={() =>
                      setSelectedQuantity(
                        (
                          quantity
                        ) =>
                          Math.max(
                            1,
                            quantity -
                              1
                          )
                      )
                    }
                  >
                    −
                  </button>

                  <span>
                    {
                      selectedQuantity
                    }
                  </span>

                  <button
                    onClick={() =>
                      setSelectedQuantity(
                        (
                          quantity
                        ) =>
                          Math.min(
                            selectedProduct.stock,
                            quantity +
                              1
                          )
                      )
                    }
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="modal-primary-actions">
                <button
                  className="modal-add-cart-button"
                  onClick={
                    addSelectedProductToCart
                  }
                >
                  Add to Cart
                </button>

                <button
                  className="modal-buy-now-button"
                  onClick={
                    handleBuyNow
                  }
                >
                  Buy Now
                </button>
              </div>

              <button
                className={`modal-wishlist-action ${
                  isProductWishlisted(
                    selectedProduct.id
                  )
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  toggleWishlist(
                    selectedProduct.id
                  )
                }
              >
                {isProductWishlisted(
                  selectedProduct.id
                )
                  ? "♥ Saved to Wishlist"
                  : "♡ Add to Wishlist"}
              </button>

              <div className="modal-store-benefits">
                <div>
                  <span>🚚</span>

                  <div>
                    <strong>
                      Fast Delivery
                    </strong>

                    <p>
                      2–5 working days.
                    </p>
                  </div>
                </div>

                <div>
                  <span>💵</span>

                  <div>
                    <strong>
                      Cash on Delivery
                    </strong>

                    <p>
                      Available nationwide.
                    </p>
                  </div>
                </div>

                <div>
                  <span>↩</span>

                  <div>
                    <strong>
                      7-Day Returns
                    </strong>

                    <p>
                      Easy eligible returns.
                    </p>
                  </div>
                </div>

                <div>
                  <span>🔒</span>

                  <div>
                    <strong>
                      Secure Shopping
                    </strong>

                    <p>
                      Protected checkout.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          WISHLIST
      ====================================================== */}

      {isWishlistOpen && (
        <div className="wishlist-drawer-layer">
          <button
            className="wishlist-drawer-backdrop"
            onClick={
              closeWishlist
            }
          />

          <aside className="wishlist-drawer">
            <header className="wishlist-drawer-header">
              <div>
                <p>
                  YOUR FAVORITES
                </p>

                <h2>
                  Wishlist{" "}
                  <span>
                    (
                    {
                      wishlistProducts.length
                    }
                    )
                  </span>
                </h2>
              </div>

              <button
                className="wishlist-drawer-close"
                onClick={
                  closeWishlist
                }
              >
                ×
              </button>
            </header>

            {wishlistProducts.length ===
            0 ? (
              <div className="wishlist-empty">
                <div className="wishlist-empty-icon">
                  ♡
                </div>

                <h3>
                  Your wishlist is
                  empty
                </h3>

                <p>
                  Save your favorite
                  Pakistani styles and
                  come back to them
                  anytime.
                </p>

                <button
                  onClick={
                    continueShopping
                  }
                >
                  Discover Products
                </button>
              </div>
            ) : (
              <>
                <div className="wishlist-intro">
                  <div>
                    <span>♡</span>

                    <p>
                      <strong>
                        Saved for you
                      </strong>

                      Choose your size
                      and move an item
                      directly into your
                      cart.
                    </p>
                  </div>

                  <button
                    onClick={
                      clearWishlist
                    }
                  >
                    Clear Wishlist
                  </button>
                </div>

                <div className="wishlist-items">
                  {wishlistProducts.map(
                    (product) => {
                      const selectedWishlistSize =
                        wishlistSizes[
                          product.id
                        ] ||
                        product.sizes?.[0] ||
                        "";

                      const discount =
                        Math.max(
                          0,
                          product.originalPrice -
                            product.price
                        );

                      return (
                        <article
                          className="wishlist-item"
                          key={
                            product.id
                          }
                        >
                          <button
                            className="wishlist-item-image"
                            onClick={() =>
                              openProductDetails(
                                product
                              )
                            }
                          >
                            <img
                              src={
                                product.image
                              }
                              alt={
                                product.name
                              }
                            />

                            {product.badge && (
                              <span>
                                {
                                  product.badge
                                }
                              </span>
                            )}
                          </button>

                          <div className="wishlist-item-content">
                            <div className="wishlist-item-heading">
                              <div>
                                <p>
                                  {
                                    product.category
                                  }{" "}
                                  •{" "}
                                  {
                                    product.collection
                                  }
                                </p>

                                <button
                                  onClick={() =>
                                    openProductDetails(
                                      product
                                    )
                                  }
                                >
                                  {
                                    product.name
                                  }
                                </button>
                              </div>

                              <button
                                className="wishlist-remove-button"
                                onClick={() =>
                                  removeFromWishlist(
                                    product.id
                                  )
                                }
                              >
                                ×
                              </button>
                            </div>

                            <div className="wishlist-rating-row">
                              <span>
                                ★{" "}
                                {
                                  product.rating
                                }
                              </span>

                              <small>
                                {
                                  product.reviews
                                }{" "}
                                reviews
                              </small>

                              <small>
                                {
                                  product.stock
                                }{" "}
                                in stock
                              </small>
                            </div>

                            <div className="wishlist-price-row">
                              <strong>
                                {formatPKR(
                                  product.price
                                )}
                              </strong>

                              {product.originalPrice >
                                product.price && (
                                <>
                                  <span>
                                    {formatPKR(
                                      product.originalPrice
                                    )}
                                  </span>

                                  <small>
                                    Save{" "}
                                    {formatPKR(
                                      discount
                                    )}
                                  </small>
                                </>
                              )}
                            </div>

                            <div className="wishlist-item-meta">
                              <span>
                                Color:{" "}
                                <strong>
                                  {
                                    product.color
                                  }
                                </strong>
                              </span>
                            </div>

                            <div className="wishlist-size-section">
                              <label>
                                Select Size
                              </label>

                              <select
                                value={
                                  selectedWishlistSize
                                }
                                onChange={(
                                  event
                                ) =>
                                  setWishlistProductSize(
                                    product.id,
                                    event.target.value
                                  )
                                }
                              >
                                {product.sizes.map(
                                  (
                                    size
                                  ) => (
                                    <option
                                      key={
                                        size
                                      }
                                      value={
                                        size
                                      }
                                    >
                                      {
                                        size
                                      }
                                    </option>
                                  )
                                )}
                              </select>
                            </div>

                            <div className="wishlist-item-actions">
                              <button
                                className="wishlist-move-cart-button"
                                onClick={() =>
                                  moveWishlistItemToCart(
                                    product.id,
                                    selectedWishlistSize
                                  )
                                }
                              >
                                🛒 Move to Cart
                              </button>

                              <button
                                className="wishlist-view-button"
                                onClick={() =>
                                  openProductDetails(
                                    product
                                  )
                                }
                              >
                                View Details
                              </button>
                            </div>
                          </div>
                        </article>
                      );
                    }
                  )}
                </div>

                <footer className="wishlist-footer">
                  <div>
                    <span>
                      {
                        wishlistProducts.length
                      }
                    </span>

                    <p>
                      <strong>
                        Saved Items
                      </strong>

                      Stored on this
                      device.
                    </p>
                  </div>

                  <button
                    onClick={
                      continueShopping
                    }
                  >
                    Continue Shopping
                  </button>
                </footer>
              </>
            )}
          </aside>
        </div>
      )}

      {/* =====================================================
          CART DRAWER
      ====================================================== */}

      {isCartOpen && (
        <div className="cart-drawer-layer">
          <button
            className="cart-drawer-backdrop"
            onClick={
              closeCartDrawer
            }
          />

          <aside className="cart-drawer">
            <div className="cart-drawer-header">
              <div>
                <p>
                  YOUR SHOPPING CART
                </p>

                <h2>
                  Cart{" "}
                  <span>
                    (
                    {
                      cart.length
                    }
                    )
                  </span>
                </h2>
              </div>

              <button
                className="cart-drawer-close"
                onClick={
                  closeCartDrawer
                }
              >
                ×
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="cart-drawer-empty">
                <div className="empty-cart-icon">
                  🛍️
                </div>

                <h3>
                  Your cart is empty
                </h3>

                <p>
                  Discover premium
                  Pakistani fashion.
                </p>

                <button
                  onClick={
                    continueShopping
                  }
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="shipping-progress-card">
                  {freeShippingRemaining >
                  0 ? (
                    <p>
                      Add{" "}
                      <strong>
                        {formatPKR(
                          freeShippingRemaining
                        )}
                      </strong>{" "}
                      more for free
                      delivery.
                    </p>
                  ) : (
                    <p>
                      🎉 Free delivery
                      unlocked!
                    </p>
                  )}

                  <div className="shipping-progress-track">
                    <div
                      className="shipping-progress-fill"
                      style={{
                        width: `${freeShippingProgress}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="cart-drawer-items">
                  {groupedCart.map(
                    (item) => (
                      <div
                        key={`${item.id}-${item.selectedSize}`}
                        className="cart-drawer-item"
                      >
                        <button
                          className="drawer-product-image-button"
                          onClick={() =>
                            openProductDetails(
                              item
                            )
                          }
                        >
                          <img
                            src={
                              item.image
                            }
                            alt={
                              item.name
                            }
                          />
                        </button>

                        <div className="drawer-item-content">
                          <div className="drawer-item-top">
                            <div>
                              <p>
                                {
                                  item.category
                                }
                              </p>

                              <h3>
                                {
                                  item.name
                                }
                              </h3>
                            </div>

                            <button
                              className="drawer-remove-item"
                              onClick={() =>
                                removeCartGroup(
                                  item.id,
                                  item.selectedSize
                                )
                              }
                            >
                              ×
                            </button>
                          </div>

                          <div className="drawer-item-options">
                            <span>
                              Size:{" "}
                              <strong>
                                {
                                  item.selectedSize
                                }
                              </strong>
                            </span>

                            <span>
                              Color:{" "}
                              <strong>
                                {
                                  item.color
                                }
                              </strong>
                            </span>
                          </div>

                          <div className="drawer-item-bottom">
                            <div className="drawer-quantity-selector">
                              <button
                                onClick={() =>
                                  decreaseCartQuantity(
                                    item
                                  )
                                }
                              >
                                −
                              </button>

                              <span>
                                {
                                  item.quantity
                                }
                              </span>

                              <button
                                onClick={() =>
                                  increaseCartQuantity(
                                    item
                                  )
                                }
                                disabled={
                                  cart.filter(
                                    (
                                      cartItem
                                    ) =>
                                      String(
                                        cartItem.id
                                      ) ===
                                      String(
                                        item.id
                                      )
                                  )
                                    .length >=
                                  item.stock
                                }
                              >
                                +
                              </button>
                            </div>

                            <div className="drawer-item-price">
                              <strong>
                                {formatPKR(
                                  item.price *
                                    item.quantity
                                )}
                              </strong>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>

                <div className="cart-promo-section">
                  <div className="cart-section-heading">
                    <span>
                      Promo Code
                    </span>

                    <small>
                      Try PAK10
                    </small>
                  </div>

                  <div className="promo-input-row">
                    <input
                      value={
                        promoInput
                      }
                      onChange={(
                        event
                      ) => {
                        setPromoInput(
                          event.target.value.toUpperCase()
                        );

                        setPromoMessage(
                          {
                            text: "",
                            type: "",
                          }
                        );
                      }}
                      placeholder="Enter promo code"
                    />

                    {appliedPromo ? (
                      <button
                        className="remove-promo-button"
                        onClick={
                          removePromoCode
                        }
                      >
                        Remove
                      </button>
                    ) : (
                      <button
                        className="apply-promo-button"
                        onClick={() =>
                          applyPromoCode()
                        }
                      >
                        Apply
                      </button>
                    )}
                  </div>

                  {promoMessage.text && (
                    <p
                      className={`promo-message ${promoMessage.type}`}
                    >
                      {
                        promoMessage.text
                      }
                    </p>
                  )}
                </div>

                <div className="cart-order-summary">
                  <div>
                    <span>
                      Subtotal
                    </span>

                    <strong>
                      {formatPKR(
                        cartSubtotal
                      )}
                    </strong>
                  </div>

                  {productSavings >
                    0 && (
                    <div className="summary-savings">
                      <span>
                        Product Savings
                      </span>

                      <strong>
                        -
                        {formatPKR(
                          productSavings
                        )}
                      </strong>
                    </div>
                  )}

                  {promoDiscount >
                    0 && (
                    <div className="summary-savings">
                      <span>
                        Promo{" "}
                        {
                          appliedPromo?.code
                        }
                      </span>

                      <strong>
                        -
                        {formatPKR(
                          promoDiscount
                        )}
                      </strong>
                    </div>
                  )}

                  <div>
                    <span>
                      Delivery
                    </span>

                    <strong>
                      {shippingFee ===
                      0
                        ? "FREE"
                        : formatPKR(
                            shippingFee
                          )}
                    </strong>
                  </div>

                  <div className="cart-summary-total">
                    <span>
                      Total
                    </span>

                    <strong>
                      {formatPKR(
                        finalCartTotal
                      )}
                    </strong>
                  </div>

                  {totalSavings >
                    0 && (
                    <p className="total-savings-message">
                      🎉 You're saving{" "}
                      <strong>
                        {formatPKR(
                          totalSavings
                        )}
                      </strong>
                    </p>
                  )}
                </div>

                <div className="cart-drawer-actions">
                  <button
                    className="checkout-button"
                    onClick={
                      openCheckout
                    }
                  >
                    <span>
                      Proceed to Checkout
                    </span>

                    <strong>
                      {formatPKR(
                        finalCartTotal
                      )}
                    </strong>
                  </button>

                  <button
                    className="continue-shopping-button"
                    onClick={
                      continueShopping
                    }
                  >
                    Continue Shopping
                  </button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}

      {/* =====================================================
          CHECKOUT
      ====================================================== */}

      {isCheckoutOpen && (
        <div className="checkout-overlay">
          <div className="checkout-shell">
            {!orderConfirmation ? (
              <>
                <header className="checkout-header">
                  <div>
                    <p>
                      PAKSHOP
                    </p>

                    <h2>
                      Secure Checkout
                    </h2>
                  </div>

                  <div className="checkout-header-actions">
                    <span>
                      🔒 Secure
                    </span>

                    <button
                      onClick={
                        closeCheckout
                      }
                    >
                      ×
                    </button>
                  </div>
                </header>

                <div className="checkout-progress">
                  <div className="active">
                    <span>1</span>
                    Delivery
                  </div>

                  <div className="checkout-progress-line" />

                  <div className="active">
                    <span>2</span>
                    Payment
                  </div>

                  <div className="checkout-progress-line" />

                  <div>
                    <span>3</span>
                    Confirmation
                  </div>
                </div>

                <div className="checkout-layout">
                  <form
                    className="checkout-form"
                    onSubmit={
                      handlePlaceOrder
                    }
                  >
                    <section className="checkout-section">
                      <div className="checkout-section-title">
                        <div className="checkout-section-icon">
                          👤
                        </div>

                        <div>
                          <p>
                            CUSTOMER INFORMATION
                          </p>

                          <h3>
                            Contact Details
                          </h3>
                        </div>
                      </div>

                      <div className="checkout-fields-grid">
                        <div className="checkout-field checkout-field-full">
                          <label>
                            Full Name *
                          </label>

                          <input
                            name="fullName"
                            value={
                              checkoutForm.fullName
                            }
                            onChange={
                              handleCheckoutChange
                            }
                            placeholder="Ahmed Khan"
                          />

                          {checkoutErrors.fullName && (
                            <small className="checkout-error">
                              {
                                checkoutErrors.fullName
                              }
                            </small>
                          )}
                        </div>

                        <div className="checkout-field">
                          <label>
                            Email *
                          </label>

                          <input
                            name="email"
                            type="email"
                            value={
                              checkoutForm.email
                            }
                            onChange={
                              handleCheckoutChange
                            }
                            placeholder="ahmed@example.com"
                          />

                          {checkoutErrors.email && (
                            <small className="checkout-error">
                              {
                                checkoutErrors.email
                              }
                            </small>
                          )}
                        </div>

                        <div className="checkout-field">
                          <label>
                            Mobile Number *
                          </label>

                          <input
                            name="phone"
                            value={
                              checkoutForm.phone
                            }
                            onChange={
                              handleCheckoutChange
                            }
                            placeholder="+92 300 1234567"
                          />

                          {checkoutErrors.phone && (
                            <small className="checkout-error">
                              {
                                checkoutErrors.phone
                              }
                            </small>
                          )}
                        </div>
                      </div>
                    </section>

                    <section className="checkout-section">
                      <div className="checkout-section-title">
                        <div className="checkout-section-icon">
                          📍
                        </div>

                        <div>
                          <p>
                            DELIVERY
                          </p>

                          <h3>
                            Shipping Address
                          </h3>
                        </div>
                      </div>

                      <div className="checkout-fields-grid">
                        <div className="checkout-field">
                          <label>
                            Province *
                          </label>

                          <select
                            name="province"
                            value={
                              checkoutForm.province
                            }
                            onChange={
                              handleCheckoutChange
                            }
                          >
                            <option value="">
                              Select Province
                            </option>

                            {pakistanProvinces.map(
                              (
                                province
                              ) => (
                                <option
                                  key={
                                    province
                                  }
                                  value={
                                    province
                                  }
                                >
                                  {
                                    province
                                  }
                                </option>
                              )
                            )}
                          </select>

                          {checkoutErrors.province && (
                            <small className="checkout-error">
                              {
                                checkoutErrors.province
                              }
                            </small>
                          )}
                        </div>

                        <div className="checkout-field">
                          <label>
                            City *
                          </label>

                          <input
                            name="city"
                            list="pakistan-cities"
                            value={
                              checkoutForm.city
                            }
                            onChange={
                              handleCheckoutChange
                            }
                            placeholder="Lahore"
                          />

                          <datalist id="pakistan-cities">
                            {pakistanCities.map(
                              (city) => (
                                <option
                                  key={
                                    city
                                  }
                                  value={
                                    city
                                  }
                                />
                              )
                            )}
                          </datalist>

                          {checkoutErrors.city && (
                            <small className="checkout-error">
                              {
                                checkoutErrors.city
                              }
                            </small>
                          )}
                        </div>

                        <div className="checkout-field checkout-field-full">
                          <label>
                            Complete Address *
                          </label>

                          <textarea
                            name="address"
                            rows="3"
                            value={
                              checkoutForm.address
                            }
                            onChange={
                              handleCheckoutChange
                            }
                            placeholder="House, street, area..."
                          />

                          {checkoutErrors.address && (
                            <small className="checkout-error">
                              {
                                checkoutErrors.address
                              }
                            </small>
                          )}
                        </div>

                        <div className="checkout-field">
                          <label>
                            Postal Code
                          </label>

                          <input
                            name="postalCode"
                            value={
                              checkoutForm.postalCode
                            }
                            onChange={
                              handleCheckoutChange
                            }
                          />
                        </div>

                        <div className="checkout-field">
                          <label>
                            Estimated Delivery
                          </label>

                          <div className="checkout-delivery-estimate">
                            🚚{" "}
                            {getDeliveryEstimate(
                              checkoutForm.city
                            )}
                          </div>
                        </div>
                      </div>
                    </section>

                    <section className="checkout-section">
                      <div className="checkout-section-title">
                        <div className="checkout-section-icon">
                          💳
                        </div>

                        <div>
                          <p>
                            PAYMENT
                          </p>

                          <h3>
                            Choose Payment Method
                          </h3>
                        </div>
                      </div>

                      <div className="payment-methods">
                        {[
                          [
                            "cod",
                            "💵",
                            "Cash on Delivery",
                          ],
                          [
                            "easypaisa",
                            "📱",
                            "EasyPaisa",
                          ],
                          [
                            "jazzcash",
                            "📲",
                            "JazzCash",
                          ],
                          [
                            "card",
                            "💳",
                            "Debit / Credit Card",
                          ],
                        ].map(
                          ([
                            method,
                            icon,
                            label,
                          ]) => (
                            <label
                              key={
                                method
                              }
                              className={`payment-method ${
                                checkoutForm.paymentMethod ===
                                method
                                  ? "active"
                                  : ""
                              }`}
                            >
                              <input
                                type="radio"
                                name="paymentMethod"
                                value={
                                  method
                                }
                                checked={
                                  checkoutForm.paymentMethod ===
                                  method
                                }
                                onChange={
                                  handleCheckoutChange
                                }
                              />

                              <span className="payment-method-icon">
                                {
                                  icon
                                }
                              </span>

                              <span>
                                <strong>
                                  {
                                    label
                                  }
                                </strong>

                                <small>
                                  Demo payment method
                                </small>
                              </span>

                              <b>
                                ✓
                              </b>
                            </label>
                          )
                        )}
                      </div>

                      <p className="checkout-demo-note">
                        Demo checkout only.
                        No real payment is charged.
                      </p>
                    </section>
                  </form>

                  <aside className="checkout-summary">
                    <div className="checkout-summary-heading">
                      <div>
                        <p>
                          ORDER SUMMARY
                        </p>

                        <h3>
                          Your Order
                        </h3>
                      </div>

                      <button
                        onClick={
                          editCartFromCheckout
                        }
                      >
                        Edit Cart
                      </button>
                    </div>

                    <div className="checkout-summary-items">
                      {groupedCart.map(
                        (item) => (
                          <div
                            key={`checkout-${item.id}-${item.selectedSize}`}
                            className="checkout-summary-item"
                          >
                            <div className="checkout-summary-image">
                              <img
                                src={
                                  item.image
                                }
                                alt={
                                  item.name
                                }
                              />

                              <span>
                                {
                                  item.quantity
                                }
                              </span>
                            </div>

                            <div className="checkout-summary-product">
                              <strong>
                                {
                                  item.name
                                }
                              </strong>

                              <small>
                                Size{" "}
                                {
                                  item.selectedSize
                                }
                              </small>
                            </div>

                            <span className="checkout-summary-price">
                              {formatPKR(
                                item.price *
                                  item.quantity
                              )}
                            </span>
                          </div>
                        )
                      )}
                    </div>

                    <div className="checkout-summary-totals">
                      <div>
                        <span>
                          Subtotal
                        </span>

                        <strong>
                          {formatPKR(
                            cartSubtotal
                          )}
                        </strong>
                      </div>

                      {promoDiscount >
                        0 && (
                        <div className="checkout-saving-row">
                          <span>
                            Promo
                          </span>

                          <strong>
                            -
                            {formatPKR(
                              promoDiscount
                            )}
                          </strong>
                        </div>
                      )}

                      <div>
                        <span>
                          Delivery
                        </span>

                        <strong>
                          {shippingFee ===
                          0
                            ? "FREE"
                            : formatPKR(
                                shippingFee
                              )}
                        </strong>
                      </div>

                      <div className="checkout-total-row">
                        <span>
                          Total
                        </span>

                        <strong>
                          {formatPKR(
                            finalCartTotal
                          )}
                        </strong>
                      </div>
                    </div>

                    <button
                      className="place-order-button"
                      type="button"
                      onClick={() =>
                        submitOrder()
                      }
                    >
                      <span>
                        Place Order
                      </span>

                      <strong>
                        {formatPKR(
                          finalCartTotal
                        )}
                      </strong>
                    </button>
                  </aside>
                </div>
              </>
            ) : (
              <div className="order-confirmation">
                <div className="order-success-icon">
                  ✓
                </div>

                <p className="order-success-label">
                  ORDER CONFIRMED
                </p>

                <h2>
                  Shukriya! Your
                  order is confirmed.
                </h2>

                <p className="order-confirmation-intro">
                  Your order has been
                  saved and can be
                  tracked from My
                  Orders.
                </p>

                <div className="order-number-card">
                  <span>
                    Order Number
                  </span>

                  <strong>
                    {
                      orderConfirmation.orderNumber
                    }
                  </strong>
                </div>

                <div className="order-confirmation-grid">
                  <div>
                    <span>
                      Status
                    </span>

                    <strong className="confirmed-status">
                      ●{" "}
                      {
                        orderConfirmation.status
                      }
                    </strong>
                  </div>

                  <div>
                    <span>
                      Payment
                    </span>

                    <strong>
                      {
                        orderConfirmation.paymentLabel
                      }
                    </strong>
                  </div>

                  <div>
                    <span>
                      Delivery City
                    </span>

                    <strong>
                      {
                        orderConfirmation.delivery.city
                      }
                    </strong>
                  </div>

                  <div>
                    <span>
                      Estimated Delivery
                    </span>

                    <strong>
                      {
                        orderConfirmation.delivery.estimate
                      }
                    </strong>
                  </div>
                </div>

                <div className="order-confirmation-total">
                  <span>
                    Order Total
                  </span>

                  <strong>
                    {formatPKR(
                      orderConfirmation.total
                    )}
                  </strong>
                </div>

                <div className="order-confirmation-actions">
                  <button
                    className="track-confirmed-order-button"
                    onClick={
                      trackOrderFromConfirmation
                    }
                  >
                    📦 Track This Order
                  </button>

                  <button
                    className="confirmation-shopping-button"
                    onClick={
                      finishOrderFlow
                    }
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =====================================================
          ORDERS
      ====================================================== */}

      {isOrdersOpen && (
        <div className="orders-overlay">
          <div className="orders-shell">
            <header className="orders-header">
              <div>
                <p>
                  PAKSHOP ACCOUNT
                </p>

                <h2>
                  My Orders
                </h2>
              </div>

              <div className="orders-header-right">
                <span>
                  {orders.length}{" "}
                  {orders.length ===
                  1
                    ? "Order"
                    : "Orders"}
                </span>

                <button
                  onClick={
                    closeOrders
                  }
                >
                  ×
                </button>
              </div>
            </header>

            {orders.length ===
            0 ? (
              <div className="orders-empty">
                <div className="orders-empty-icon">
                  📦
                </div>

                <h3>
                  No orders yet
                </h3>

                <p>
                  Once you place an
                  order, you'll be able
                  to track it here.
                </p>

                <button
                  onClick={
                    continueShopping
                  }
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="orders-layout">
                <aside className="orders-list">
                  <div className="orders-list-heading">
                    <p>
                      ORDER HISTORY
                    </p>

                    <h3>
                      Recent Orders
                    </h3>
                  </div>

                  {orders.map(
                    (order) => {
                      const status =
                        getStatusConfig(
                          order.trackingStatus
                        );

                      return (
                        <button
                          key={
                            order.orderNumber
                          }
                          className={`order-history-card ${
                            selectedOrder?.orderNumber ===
                            order.orderNumber
                              ? "active"
                              : ""
                          }`}
                          onClick={() =>
                            openOrderDetails(
                              order
                            )
                          }
                        >
                          <div className="order-history-top">
                            <div>
                              <span>
                                Order
                              </span>

                              <strong>
                                {
                                  order.orderNumber
                                }
                              </strong>
                            </div>

                            <span
                              className={`order-status-badge status-${order.trackingStatus}`}
                            >
                              {
                                status.icon
                              }{" "}
                              {
                                status.label
                              }
                            </span>
                          </div>

                          <div className="order-history-images">
                            {order.items
                              .slice(
                                0,
                                3
                              )
                              .map(
                                (
                                  item
                                ) => (
                                  <img
                                    key={`${order.orderNumber}-${item.id}-${item.selectedSize}`}
                                    src={
                                      item.image
                                    }
                                    alt={
                                      item.name
                                    }
                                  />
                                )
                              )}
                          </div>

                          <div className="order-history-meta">
                            <span>
                              {
                                order.placedAt
                              }
                            </span>

                            <strong>
                              {formatPKR(
                                order.total
                              )}
                            </strong>
                          </div>

                          <div className="order-history-footer">
                            <span>
                              📍{" "}
                              {
                                order.delivery.city
                              }
                            </span>

                            <span>
                              View Tracking →
                            </span>
                          </div>
                        </button>
                      );
                    }
                  )}
                </aside>

                <main className="order-tracking-detail">
                  {!selectedOrder ? (
                    <div className="tracking-placeholder">
                      <div>
                        📦
                      </div>

                      <h3>
                        Select an order
                      </h3>

                      <p>
                        Choose an order
                        from your history
                        to view tracking
                        details.
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="tracking-detail-heading">
                        <div>
                          <p>
                            ORDER TRACKING
                          </p>

                          <h3>
                            {
                              selectedOrder.orderNumber
                            }
                          </h3>

                          <span>
                            Ordered{" "}
                            {
                              selectedOrder.placedAt
                            }
                          </span>
                        </div>

                        <div className="tracking-current-status">
                          <span>
                            {
                              getStatusConfig(
                                selectedOrder.trackingStatus
                              ).icon
                            }
                          </span>

                          <div>
                            <small>
                              CURRENT STATUS
                            </small>

                            <strong>
                              {
                                getStatusConfig(
                                  selectedOrder.trackingStatus
                                ).label
                              }
                            </strong>
                          </div>
                        </div>
                      </div>

                      <div className="order-tracking-timeline">
                        {orderStatuses.map(
                          (
                            status,
                            index
                          ) => {
                            const currentIndex =
                              getStatusIndex(
                                selectedOrder.trackingStatus
                              );

                            const completed =
                              index <=
                              currentIndex;

                            const current =
                              index ===
                              currentIndex;

                            return (
                              <div
                                key={
                                  status.key
                                }
                                className={`tracking-step ${
                                  completed
                                    ? "completed"
                                    : ""
                                } ${
                                  current
                                    ? "current"
                                    : ""
                                }`}
                              >
                                <div className="tracking-step-marker">
                                  <span>
                                    {completed
                                      ? "✓"
                                      : status.icon}
                                  </span>
                                </div>

                                <div className="tracking-step-content">
                                  <strong>
                                    {
                                      status.label
                                    }
                                  </strong>

                                  <p>
                                    {
                                      status.description
                                    }
                                  </p>

                                  {current && (
                                    <small>
                                      Updated{" "}
                                      {
                                        selectedOrder.trackingUpdatedAt
                                      }
                                    </small>
                                  )}
                                </div>
                              </div>
                            );
                          }
                        )}
                      </div>

                      <div className="tracking-demo-control">
                        <div>
                          <span>
                            DEMO CONTROL
                          </span>

                          <p>
                            Simulate the
                            next logistics
                            update.
                          </p>
                        </div>

                        <button
                          disabled={
                            selectedOrder.trackingStatus ===
                            "delivered"
                          }
                          onClick={() =>
                            advanceOrderStatus(
                              selectedOrder.orderNumber
                            )
                          }
                        >
                          {selectedOrder.trackingStatus ===
                          "delivered"
                            ? "Order Delivered ✓"
                            : "Advance Demo Status →"}
                        </button>
                      </div>

                      <div className="tracking-info-grid">
                        <div>
                          <span>
                            🚚 Estimated Delivery
                          </span>

                          <strong>
                            {
                              selectedOrder.delivery.estimate
                            }
                          </strong>
                        </div>

                        <div>
                          <span>
                            💳 Payment
                          </span>

                          <strong>
                            {
                              selectedOrder.paymentLabel
                            }
                          </strong>
                        </div>

                        <div>
                          <span>
                            📍 Destination
                          </span>

                          <strong>
                            {
                              selectedOrder.delivery.city
                            }
                          </strong>
                        </div>

                        <div>
                          <span>
                            💰 Order Total
                          </span>

                          <strong>
                            {formatPKR(
                              selectedOrder.total
                            )}
                          </strong>
                        </div>
                      </div>

                      <div className="tracking-address-card">
                        <p>
                          DELIVERY ADDRESS
                        </p>

                        <strong>
                          {
                            selectedOrder.customer.fullName
                          }
                        </strong>

                        <span>
                          {
                            selectedOrder.delivery.address
                          }
                          ,{" "}
                          {
                            selectedOrder.delivery.city
                          }
                          ,{" "}
                          {
                            selectedOrder.delivery.province
                          }
                        </span>

                        <small>
                          {
                            selectedOrder.customer.phone
                          }
                        </small>
                      </div>

                      <div className="tracking-order-items">
                        <div className="tracking-items-heading">
                          <h3>
                            Order Items
                          </h3>

                          <span>
                            {
                              selectedOrder.items.reduce(
                                (
                                  total,
                                  item
                                ) =>
                                  total +
                                  item.quantity,
                                0
                              )
                            }{" "}
                            items
                          </span>
                        </div>

                        {selectedOrder.items.map(
                          (item) => (
                            <div
                              className="tracking-order-item"
                              key={`${selectedOrder.orderNumber}-${item.id}-${item.selectedSize}`}
                            >
                              <img
                                src={
                                  item.image
                                }
                                alt={
                                  item.name
                                }
                              />

                              <div>
                                <strong>
                                  {
                                    item.name
                                  }
                                </strong>

                                <span>
                                  Size{" "}
                                  {
                                    item.selectedSize
                                  }{" "}
                                  •{" "}
                                  {
                                    item.color
                                  }{" "}
                                  • Qty{" "}
                                  {
                                    item.quantity
                                  }
                                </span>
                              </div>

                              <strong>
                                {formatPKR(
                                  item.price *
                                    item.quantity
                                )}
                              </strong>
                            </div>
                          )
                        )}
                      </div>
                    </>
                  )}
                </main>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =====================================================
          AIROMOB
      ====================================================== */}

      <VoiceAIButton
        buttonType="pill"
        title="PakShop Assistant"
        initialContext={
          pakShopContext
        }
        tools={[
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
        ]}
      />
    </div>
  );
}

export default App;