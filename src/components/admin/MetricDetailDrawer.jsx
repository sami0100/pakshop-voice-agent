import {
  X,
  DollarSign,
  ShoppingCart,
  Users,
  AlertTriangle,
  TrendingUp,
  Package,
  Warehouse,
  User,
  Mail,
  MapPin,
} from "lucide-react";


function MetricDetailDrawer({
  open,
  onClose,
  type,
  data,
}) {

  if (!open) {
    return null;
  }


  const formatPKR = (
    value
  ) =>
    `PKR ${Number(
      value || 0
    ).toLocaleString()}`;


  const renderRevenue = () => {

    const revenue =
      data || {};


    return (

      <div className="space-y-4">

        <div
          className="
            grid
            gap-3
            sm:grid-cols-2
          "
        >

          <DetailMetric
            label="Total Revenue"
            value={
              formatPKR(
                revenue.total
              )
            }
            icon={
              DollarSign
            }
          />


          <DetailMetric
            label="Last 30 Days"
            value={
              formatPKR(
                revenue.last30Days
              )
            }
            icon={
              TrendingUp
            }
          />


          <DetailMetric
            label="Previous 30 Days"
            value={
              formatPKR(
                revenue.previous30Days
              )
            }
            icon={
              DollarSign
            }
          />


          <DetailMetric
            label="30-Day Change"
            value={
              `${
                Number(
                  revenue.changePercent ||
                  0
                ) > 0
                  ? "+"
                  : ""
              }${Number(
                revenue.changePercent ||
                0
              )}%`
            }
            icon={
              TrendingUp
            }
          />

        </div>


        <InsightBox>

          {Number(
            revenue.changePercent ||
            0
          ) > 0
            ? "Revenue increased compared with the previous 30-day period."
            : Number(
                revenue.changePercent ||
                0
              ) < 0
              ? "Revenue declined compared with the previous 30-day period."
              : "Revenue is unchanged compared with the previous period."}

        </InsightBox>

      </div>

    );

  };


  const renderOrders = () => {

    const orders =
      data || {};


    return (

      <div className="space-y-4">

        <div
          className="
            grid
            gap-3
            sm:grid-cols-2
          "
        >

          <DetailMetric
            label="Total Orders"
            value={
              orders.total || 0
            }
            icon={
              ShoppingCart
            }
          />


          <DetailMetric
            label="Last 30 Days"
            value={
              orders.last30Days ||
              0
            }
            icon={
              ShoppingCart
            }
          />


          <DetailMetric
            label="Previous 30 Days"
            value={
              orders.previous30Days ||
              0
            }
            icon={
              ShoppingCart
            }
          />


          <DetailMetric
            label="Order Change"
            value={
              `${
                Number(
                  orders.changePercent ||
                  0
                ) > 0
                  ? "+"
                  : ""
              }${Number(
                orders.changePercent ||
                0
              )}%`
            }
            icon={
              TrendingUp
            }
          />

        </div>


        <InsightBox>

          {
            Number(
              orders.last30Days ||
              0
            )
          }{" "}
          orders were placed during the
          latest 30-day period.

        </InsightBox>

      </div>

    );

  };


  const renderCustomers = () => {

    const unique =
      data?.summary?.unique ||
      0;

    const customers =
      data?.customers || [];


    return (

      <div className="space-y-5">

        <DetailMetric
          label="Unique Purchasing Customers"
          value={
            unique
          }
          icon={
            Users
          }
        />


        <section
          className="
            rounded-2xl
            border
            border-[#dfe5df]
            bg-white
            p-4
          "
        >

          <div
            className="
              flex
              items-end
              justify-between
              gap-3
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
                Customer Ranking
              </p>

              <h3
                className="
                  mt-1
                  text-lg
                  font-black
                  text-[#17231d]
                "
              >
                Highest Value Customers
              </h3>

            </div>


            <span
              className="
                text-[10px]
                font-semibold
                text-slate-400
              "
            >
              Top {customers.length}
            </span>

          </div>


          <div
            className="
              mt-4
              space-y-2
            "
          >

            {customers.length ===
            0 ? (

              <EmptyState
                text="No customer data available."
              />

            ) : (

              customers.map(
                (
                  customer,
                  index
                ) => (

                  <div
                    key={
                      customer.id ||
                      customer.email ||
                      index
                    }
                    className="
                      rounded-xl
                      border
                      border-[#e4e8e4]
                      bg-[#fafbfa]
                      p-3
                    "
                  >

                    <div
                      className="
                        flex
                        items-center
                        gap-3
                      "
                    >

                      <div
                        className="
                          flex
                          h-9
                          w-9
                          shrink-0
                          items-center
                          justify-center
                          rounded-xl
                          bg-[#e7f0e9]
                          text-[#176247]
                        "
                      >
                        <User
                          size={15}
                        />
                      </div>


                      <div
                        className="
                          min-w-0
                          flex-1
                        "
                      >

                        <strong
                          className="
                            block
                            truncate
                            text-sm
                            text-[#17231d]
                          "
                        >
                          {
                            customer.name
                          }
                        </strong>

                        <span
                          className="
                            block
                            truncate
                            text-[10px]
                            text-slate-400
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
                          text-right
                        "
                      >

                        <strong
                          className="
                            block
                            text-xs
                            text-[#17231d]
                          "
                        >
                          {
                            formatPKR(
                              customer.totalSpent
                            )
                          }
                        </strong>

                        <span
                          className="
                            text-[9px]
                            text-slate-400
                          "
                        >
                          {
                            customer.totalOrders ||
                            0
                          }{" "}
                          orders
                        </span>

                      </div>

                    </div>

                  </div>

                )
              )

            )}

          </div>

        </section>


        <InsightBox>
          Customer count is calculated
          from unique customer IDs in
          actual MongoDB orders, not from
          the seeded customer list.
        </InsightBox>

      </div>

    );

  };


  const renderInventory = () => {

    const alerts =
      data?.summary?.alerts ||
      0;

    const items =
      data?.items || [];


    return (

      <div className="space-y-5">

        <DetailMetric
          label="Low Stock Alerts"
          value={
            alerts
          }
          icon={
            AlertTriangle
          }
          warning={
            alerts > 0
          }
        />


        <section
          className="
            rounded-2xl
            border
            border-[#dfe5df]
            bg-white
            p-4
          "
        >

          <div>

            <p
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.14em]
                text-amber-700
              "
            >
              Inventory Risk
            </p>

            <h3
              className="
                mt-1
                text-lg
                font-black
                text-[#17231d]
              "
            >
              Products Requiring Attention
            </h3>

          </div>


          <div
            className="
              mt-4
              space-y-3
            "
          >

            {items.length ===
            0 ? (

              <EmptyState
                text="No inventory alerts."
              />

            ) : (

              items.map(
                (
                  item,
                  index
                ) => (

                  <div
                    key={
                      item.id ||
                      item.productId ||
                      index
                    }
                    className="
                      rounded-xl
                      border
                      border-amber-200
                      bg-amber-50/60
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

                        <strong
                          className="
                            text-sm
                            text-[#17231d]
                          "
                        >
                          {
                            item.name ||
                            item.productName ||
                            "Inventory Item"
                          }
                        </strong>


                        <p
                          className="
                            mt-1
                            text-[10px]
                            uppercase
                            tracking-[0.1em]
                            text-slate-400
                          "
                        >
                          {
                            item.category ||
                            "Inventory"
                          }
                        </p>

                      </div>


                      <span
                        className="
                          rounded-full
                          bg-amber-100
                          px-2
                          py-1
                          text-[9px]
                          font-bold
                          text-amber-700
                        "
                      >
                        Restock
                      </span>

                    </div>


                    <div
                      className="
                        mt-4
                        grid
                        grid-cols-3
                        gap-2
                      "
                    >

                      <MiniMetric
                        label="Stock"
                        value={
                          item.stock ||
                          0
                        }
                      />

                      <MiniMetric
                        label="Threshold"
                        value={
                          item.lowStockThreshold ||
                          item.threshold ||
                          0
                        }
                      />


                      <div
                        className="
                          rounded-lg
                          bg-white/70
                          p-2.5
                        "
                      >

                        <div
                          className="
                            flex
                            items-center
                            gap-1
                            text-[8px]
                            font-bold
                            uppercase
                            text-slate-400
                          "
                        >
                          <Warehouse
                            size={10}
                          />

                          Warehouse
                        </div>

                        <strong
                          className="
                            mt-1
                            block
                            truncate
                            text-xs
                            text-[#17231d]
                          "
                        >
                          {
                            item.warehouse ||
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

    );

  };


  const renderContent = () => {

    switch (type) {

      case "Revenue":
        return renderRevenue();

      case "Orders":
        return renderOrders();

      case "Customers":
        return renderCustomers();

      case "Inventory":
        return renderInventory();

      default:
        return (
          <EmptyState
            text="No detail view is available."
          />
        );

    }

  };


  const iconMap = {
    Revenue:
      DollarSign,

    Orders:
      ShoppingCart,

    Customers:
      Users,

    Inventory:
      AlertTriangle,
  };


  const HeaderIcon =
    iconMap[type] ||
    Package;


  return (

    <div
      className="
        fixed
        inset-0
        z-[2900]
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
          max-w-[540px]
          overflow-y-auto
          bg-[#f4f6f3]
          shadow-2xl
        "
        onClick={(event) =>
          event.stopPropagation()
        }
      >

        <header
          className="
            sticky
            top-0
            z-10
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

            <div
              className="
                flex
                items-center
                gap-3
              "
            >

              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  bg-white/10
                  text-emerald-100
                "
              >
                <HeaderIcon
                  size={19}
                />
              </div>


              <div>

                <p
                  className="
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.16em]
                    text-emerald-200/70
                  "
                >
                  PakShop Intelligence
                </p>


                <h2
                  className="
                    mt-1
                    text-2xl
                    font-black
                  "
                >
                  {type} Details
                </h2>

              </div>

            </div>


            <button
              type="button"
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
              aria-label="Close details"
            >
              <X size={18} />
            </button>

          </div>

        </header>


        <div
          className="
            p-5
            md:p-6
          "
        >
          {renderContent()}
        </div>

      </aside>

    </div>

  );

}


function DetailMetric({
  label,
  value,
  icon: Icon,
  warning = false,
}) {

  return (

    <div
      className={`
        rounded-2xl
        border
        p-4
        ${
          warning
            ? "border-amber-200 bg-amber-50"
            : "border-[#dfe5df] bg-white"
        }
      `}
    >

      <Icon
        size={17}
        className={
          warning
            ? "text-amber-700"
            : "text-[#176247]"
        }
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
        {label}
      </p>


      <strong
        className="
          mt-1
          block
          text-xl
          font-black
          text-[#17231d]
        "
      >
        {value}
      </strong>

    </div>

  );

}


function MiniMetric({
  label,
  value,
}) {

  return (

    <div
      className="
        rounded-lg
        bg-white/70
        p-2.5
      "
    >

      <p
        className="
          text-[8px]
          font-bold
          uppercase
          text-slate-400
        "
      >
        {label}
      </p>

      <strong
        className="
          mt-1
          block
          text-xs
          text-[#17231d]
        "
      >
        {value}
      </strong>

    </div>

  );

}


function InsightBox({
  children,
}) {

  return (

    <div
      className="
        rounded-2xl
        border
        border-emerald-900/10
        bg-[#eaf0eb]
        p-4
        text-sm
        leading-6
        text-[#355145]
      "
    >
      {children}
    </div>

  );

}


function EmptyState({
  text,
}) {

  return (

    <div
      className="
        rounded-2xl
        border
        border-dashed
        border-[#dce2dc]
        bg-[#f8faf8]
        px-4
        py-8
        text-center
        text-sm
        text-slate-400
      "
    >
      {text}
    </div>

  );

}


export default MetricDetailDrawer;