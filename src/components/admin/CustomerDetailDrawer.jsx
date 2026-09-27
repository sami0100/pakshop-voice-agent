import {
  X,
  User,
  Mail,
  MapPin,
  ShoppingBag,
  DollarSign,
  TrendingUp,
} from "lucide-react";

import {
  useEffect,
  useMemo,
  useState,
} from "react";


const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api/v1";


function CustomerDetailDrawer({
  open,
  onClose,
  customer,
}) {

  const [
    orders,
    setOrders,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(false);


  useEffect(() => {

    if (
      !open ||
      !customer?.id
    ) {
      return;
    }


    async function loadOrders() {

      try {

        setLoading(true);


        const response =
          await fetch(
            `${API_URL}/orders/customer/${customer.id}`
          );


        if (!response.ok) {
          throw new Error(
            "Failed to load customer orders."
          );
        }


        const data =
          await response.json();


        setOrders(
          Array.isArray(data)
            ? data
            : []
        );


      } catch (error) {

        console.error(
          "CustomerDetailDrawer error:",
          error
        );

        setOrders([]);

      } finally {

        setLoading(false);

      }

    }


    loadOrders();

  }, [
    open,
    customer,
  ]);


  const averageOrderValue =
    useMemo(() => {

      if (!orders.length) {
        return 0;
      }


      const total =
        orders.reduce(
          (sum, order) =>
            sum +
            Number(
              order.totalAmount ||
              0
            ),
          0
        );


      return (
        total /
        orders.length
      );

    }, [orders]);


  if (!open || !customer) {
    return null;
  }


  return (

    <div
      className="
        fixed
        inset-0
        z-[3000]
        flex
        justify-end
        bg-black/30
        backdrop-blur-[2px]
      "
      onClick={
        onClose
      }
    >

      <aside
        className="
          h-full
          w-full
          max-w-[520px]
          overflow-y-auto
          bg-[#f5f7f4]
          shadow-2xl
        "
        onClick={(event) =>
          event.stopPropagation()
        }
      >

        {/* HEADER */}

        <div
          className="
            sticky
            top-0
            z-10
            border-b
            border-[#dfe5df]
            bg-[#10251d]
            px-6
            py-5
            text-white
          "
        >

          <div
            className="
              flex
              items-start
              justify-between
              gap-4
            "
          >

            <div>

              <p
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-emerald-200/70
                "
              >
                Customer Intelligence
              </p>


              <h2
                className="
                  mt-1
                  text-2xl
                  font-black
                "
              >
                Customer Detail
              </h2>

            </div>


            <button
              onClick={
                onClose
              }
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                border
                border-white/10
                bg-white/10
                transition
                hover:bg-white/15
              "
              aria-label="Close customer detail"
            >
              <X size={18} />
            </button>

          </div>

        </div>


        <div
          className="
            space-y-5
            p-5
            md:p-6
          "
        >

          {/* CUSTOMER PROFILE */}

          <section
            className="
              rounded-[22px]
              border
              border-[#dfe5df]
              bg-white
              p-5
            "
          >

            <div
              className="
                flex
                items-start
                gap-4
              "
            >

              <div
                className="
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  bg-[#e7f0e9]
                  text-[#176247]
                "
              >
                <User size={21} />
              </div>


              <div
                className="
                  min-w-0
                  flex-1
                "
              >

                <h3
                  className="
                    text-xl
                    font-black
                    text-[#17231d]
                  "
                >
                  {
                    customer.name ||
                    "Unknown Customer"
                  }
                </h3>


                <div
                  className="
                    mt-3
                    space-y-2
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      text-xs
                      text-slate-500
                    "
                  >
                    <Mail size={14} />

                    <span
                      className="
                        truncate
                      "
                    >
                      {
                        customer.email ||
                        "No email"
                      }
                    </span>
                  </div>


                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      text-xs
                      text-slate-500
                    "
                  >
                    <MapPin size={14} />

                    <span>
                      {
                        customer.city ||
                        "Location unavailable"
                      }
                    </span>
                  </div>

                </div>

              </div>

            </div>

          </section>


          {/* METRICS */}

          <section
            className="
              grid
              gap-3
              sm:grid-cols-3
            "
          >

            <div
              className="
                rounded-2xl
                border
                border-[#dfe5df]
                bg-white
                p-4
              "
            >

              <DollarSign
                size={17}
                className="
                  text-[#176247]
                "
              />

              <p
                className="
                  mt-3
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.12em]
                  text-slate-400
                "
              >
                Lifetime Value
              </p>

              <strong
                className="
                  mt-1
                  block
                  text-lg
                  font-black
                  text-[#17231d]
                "
              >
                $
                {
                  Number(
                    customer.totalSpent ||
                    0
                  ).toLocaleString()
                }
              </strong>

            </div>


            <div
              className="
                rounded-2xl
                border
                border-[#dfe5df]
                bg-white
                p-4
              "
            >

              <ShoppingBag
                size={17}
                className="
                  text-[#176247]
                "
              />

              <p
                className="
                  mt-3
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.12em]
                  text-slate-400
                "
              >
                Orders
              </p>

              <strong
                className="
                  mt-1
                  block
                  text-lg
                  font-black
                  text-[#17231d]
                "
              >
                {
                  customer.totalOrders ||
                  orders.length ||
                  0
                }
              </strong>

            </div>


            <div
              className="
                rounded-2xl
                border
                border-[#dfe5df]
                bg-white
                p-4
              "
            >

              <TrendingUp
                size={17}
                className="
                  text-[#176247]
                "
              />

              <p
                className="
                  mt-3
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.12em]
                  text-slate-400
                "
              >
                Avg. Order
              </p>

              <strong
                className="
                  mt-1
                  block
                  text-lg
                  font-black
                  text-[#17231d]
                "
              >
                $
                {
                  Math.round(
                    averageOrderValue
                  ).toLocaleString()
                }
              </strong>

            </div>

          </section>


          {/* RECENT ORDERS */}

          <section
            className="
              rounded-[22px]
              border
              border-[#dfe5df]
              bg-white
              p-5
            "
          >

            <div
              className="
                flex
                items-end
                justify-between
                gap-4
              "
            >

              <div>

                <p
                  className="
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.14em]
                    text-emerald-700
                  "
                >
                  Purchase History
                </p>

                <h3
                  className="
                    mt-1
                    text-lg
                    font-black
                    text-[#17231d]
                  "
                >
                  Recent Orders
                </h3>

              </div>


              <span
                className="
                  text-[10px]
                  font-semibold
                  text-slate-400
                "
              >
                {orders.length}
                {" "}
                total
              </span>

            </div>


            <div
              className="
                mt-4
                space-y-3
              "
            >

              {loading ? (

                <div
                  className="
                    rounded-xl
                    bg-[#f6f8f6]
                    px-4
                    py-6
                    text-center
                    text-xs
                    text-slate-400
                  "
                >
                  Loading customer orders...
                </div>

              ) : orders.length === 0 ? (

                <div
                  className="
                    rounded-xl
                    border
                    border-dashed
                    border-[#dce2dc]
                    bg-[#f8faf8]
                    px-4
                    py-6
                    text-center
                    text-xs
                    text-slate-400
                  "
                >
                  No orders found for this customer.
                </div>

              ) : (

                orders
                  .slice(0, 6)
                  .map(
                    (order) => (

                      <div
                        key={
                          order.orderNumber ||
                          order.id
                        }
                        className="
                          rounded-xl
                          border
                          border-[#e4e8e4]
                          bg-[#fafbfa]
                          p-4
                        "
                      >

                        <div
                          className="
                            flex
                            items-start
                            justify-between
                            gap-3
                          "
                        >

                          <div>

                            <p
                              className="
                                text-[9px]
                                font-semibold
                                uppercase
                                tracking-[0.12em]
                                text-slate-400
                              "
                            >
                              Order
                            </p>

                            <strong
                              className="
                                mt-1
                                block
                                text-sm
                                font-black
                                text-[#17231d]
                              "
                            >
                              {
                                order.orderNumber ||
                                order.id
                              }
                            </strong>

                          </div>


                          <span
                            className="
                              rounded-full
                              bg-[#e7f0e9]
                              px-2.5
                              py-1
                              text-[9px]
                              font-bold
                              text-[#176247]
                            "
                          >
                            {
                              order.status ||
                              "Unknown"
                            }
                          </span>

                        </div>


                        <div
                          className="
                            mt-4
                            grid
                            grid-cols-2
                            gap-3
                          "
                        >

                          <div
                            className="
                              rounded-lg
                              bg-[#f0f5f1]
                              px-3
                              py-2
                            "
                          >
                            <p
                              className="
                                text-[8px]
                                font-bold
                                uppercase
                                tracking-[0.1em]
                                text-slate-400
                              "
                            >
                              Total
                            </p>

                            <strong
                              className="
                                mt-1
                                block
                                text-xs
                                font-black
                                text-[#17231d]
                              "
                            >
                              $
                              {
                                Number(
                                  order.totalAmount ||
                                  0
                                ).toLocaleString()
                              }
                            </strong>
                          </div>


                          <div
                            className="
                              rounded-lg
                              bg-[#f0f5f1]
                              px-3
                              py-2
                            "
                          >
                            <p
                              className="
                                text-[8px]
                                font-bold
                                uppercase
                                tracking-[0.1em]
                                text-slate-400
                              "
                            >
                              Payment
                            </p>

                            <strong
                              className="
                                mt-1
                                block
                                text-xs
                                font-black
                                capitalize
                                text-[#17231d]
                              "
                            >
                              {
                                order.paymentMethod ||
                                "N/A"
                              }
                            </strong>
                          </div>

                        </div>

                      </div>

                    )
                  )

              )}

            </div>

          </section>

        </div>

      </aside>

    </div>

  );

}


export default CustomerDetailDrawer;