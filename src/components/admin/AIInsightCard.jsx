import {
  Sparkles,
  Mic,
  ArrowUpRight,
  TrendingUp,
  Package,
  Headphones,
  Activity,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";


function AIInsightCard({

  dashboardSummary,

  supportOverview,

  products = [],

  inventory = [],

  onAskAI,

}) {

  const topProduct =
    products[0];


  const revenue =
    Number(
      dashboardSummary
        ?.revenue
        ?.total || 0
    );


  const revenueChange =
    Number(
      dashboardSummary
        ?.revenue
        ?.changePercent || 0
    );


  const orderChange =
    Number(
      dashboardSummary
        ?.orders
        ?.changePercent || 0
    );


  const inventoryAlerts =
    Number(
      dashboardSummary
        ?.inventory
        ?.alerts ??
      inventory.length ??
      0
    );


  const supportAttention =
    Number(
      supportOverview
        ?.attentionRequired || 0
    );


  const totalAttention =
    inventoryAlerts +
    supportAttention;


  const openTickets =
    Number(
      supportOverview
        ?.tickets
        ?.open || 0
    );


  const pendingReturns =
    Number(
      supportOverview
        ?.returns
        ?.requested || 0
    );


  let businessHealth =
    "Healthy";

  let businessHealthText =
    "No critical operational issues detected.";

  let HealthIcon =
    CheckCircle2;


  if (totalAttention > 0) {

    businessHealth =
      "Needs Attention";

    businessHealthText =
      `${totalAttention} operational item${
        totalAttention === 1
          ? ""
          : "s"
      } currently require attention.`;

    HealthIcon =
      AlertTriangle;

  } else if (
    revenueChange < 0 ||
    orderChange < 0
  ) {

    businessHealth =
      "Monitor Performance";

    businessHealthText =
      "Commercial performance declined compared with the previous period.";

    HealthIcon =
      Activity;

  }


  const revenueDirection =
    revenueChange > 0
      ? "up"
      : revenueChange < 0
        ? "down"
        : "flat";


  const revenueChangeText =

    revenueChange === 0
      ? "No change vs previous 30 days"
      : `${
          revenueChange > 0
            ? "+"
            : ""
        }${revenueChange}% vs previous 30 days`;


  const operationalMessage = (() => {

    if (
      inventoryAlerts > 0 &&
      supportAttention > 0
    ) {

      return `${inventoryAlerts} inventory alert${
        inventoryAlerts === 1
          ? ""
          : "s"
      } and ${supportAttention} customer-service item${
        supportAttention === 1
          ? ""
          : "s"
      } currently need attention.`;

    }


    if (inventoryAlerts > 0) {

      return `${inventoryAlerts} low-stock product${
        inventoryAlerts === 1
          ? ""
          : "s"
      } currently require restocking attention.`;

    }


    if (supportAttention > 0) {

      return `${supportAttention} customer-service item${
        supportAttention === 1
          ? ""
          : "s"
      } currently require attention.`;

    }


    if (revenueChange < 0) {

      return `Revenue is down ${Math.abs(
        revenueChange
      )}% compared with the previous 30-day period.`;

    }


    if (revenueChange > 0) {

      return `Revenue is up ${revenueChange}% compared with the previous 30-day period.`;

    }


    return "AI monitoring is active. No critical operational issues are currently detected.";

  })();



  return (

    <div
      className="
        relative
        overflow-hidden
        rounded-[26px]
        border
        border-emerald-900/10
        bg-[#eaf0eb]
        p-5
        shadow-[0_20px_60px_rgba(15,35,27,0.08)]
        md:p-6
      "
    >

      <div
        className="
          pointer-events-none
          absolute
          -right-20
          -top-24
          h-64
          w-64
          rounded-full
          bg-emerald-200/30
          blur-3xl
        "
      />


      <div className="relative">

        {/* ================================================
            HEADER
        ================================================= */}

        <div
          className="
            flex
            flex-col
            gap-5
            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >

          <div
            className="
              flex
              items-center
              gap-4
            "
          >

            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                bg-[#15392b]
                text-emerald-100
                shadow-sm
              "
            >
              <Sparkles
                size={22}
              />
            </div>


            <div>

              <div
                className="
                  flex
                  flex-wrap
                  items-center
                  gap-2
                "
              >

                <h2
                  className="
                    text-xl
                    font-black
                    tracking-tight
                    text-[#17231d]
                    md:text-2xl
                  "
                >
                  PakShop AI Analyst
                </h2>


                <span
                  className="
                    inline-flex
                    items-center
                    gap-1.5
                    rounded-full
                    bg-[#d7e7dc]
                    px-2.5
                    py-1
                    text-[10px]
                    font-bold
                    text-[#176247]
                  "
                >

                  <span
                    className="
                      h-1.5
                      w-1.5
                      rounded-full
                      bg-emerald-500
                    "
                  />

                  AI Online

                </span>

              </div>


              <p
                className="
                  mt-1
                  text-sm
                  text-slate-600
                "
              >
                Live intelligence derived from PakShop operational data.
              </p>

            </div>

          </div>


          {onAskAI && (

            <button
              type="button"

              onClick={
                onAskAI
              }

              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-[#163a2c]
                px-4
                py-3
                text-sm
                font-semibold
                text-white
                transition
                hover:-translate-y-0.5
                hover:bg-[#102d22]
              "
            >

              <Mic
                size={16}
              />

              Ask AI

              <ArrowUpRight
                size={14}
              />

            </button>

          )}

        </div>


        {/* ================================================
            LIVE INTELLIGENCE CARDS
        ================================================= */}

        <div
          className="
            mt-6
            grid
            gap-3
            sm:grid-cols-2
            xl:grid-cols-4
          "
        >

          {/* BUSINESS HEALTH */}

          <div
            className="
              rounded-2xl
              border
              border-emerald-900/10
              bg-white/75
              p-4
            "
          >

            <div
              className="
                flex
                items-center
                justify-between
              "
            >

              <HealthIcon
                size={17}
                className={
                  totalAttention > 0
                    ? "text-amber-700"
                    : "text-[#176247]"
                }
              />


              <span
                className={`
                  h-2
                  w-2
                  rounded-full
                  ${
                    totalAttention > 0
                      ? "bg-amber-500"
                      : "bg-emerald-500"
                  }
                `}
              />

            </div>


            <p
              className="
                mt-4
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.14em]
                text-slate-500
              "
            >
              Business Health
            </p>


            <h3
              className="
                mt-1
                text-lg
                font-black
                text-[#17231d]
              "
            >
              {businessHealth}
            </h3>


            <p
              className="
                mt-1
                text-[10px]
                leading-4
                text-slate-500
              "
            >
              {businessHealthText}
            </p>

          </div>


          {/* REVENUE */}

          <div
            className="
              rounded-2xl
              border
              border-emerald-900/10
              bg-white/75
              p-4
            "
          >

            <TrendingUp
              size={17}
              className={
                revenueDirection ===
                "down"
                  ? "text-red-600"
                  : "text-[#176247]"
              }
            />


            <p
              className="
                mt-4
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.14em]
                text-slate-500
              "
            >
              Revenue
            </p>


            <h3
              className="
                mt-1
                text-lg
                font-black
                text-[#17231d]
              "
            >
              PKR{" "}
              {
                revenue.toLocaleString()
              }
            </h3>


            <p
              className={`
                mt-1
                text-xs
                font-semibold
                ${
                  revenueDirection ===
                  "down"
                    ? "text-red-600"
                    : revenueDirection ===
                        "up"
                      ? "text-emerald-700"
                      : "text-slate-500"
                }
              `}
            >
              {revenueChangeText}
            </p>

          </div>


          {/* CUSTOMER SERVICE */}

          <div
            className="
              rounded-2xl
              border
              border-emerald-900/10
              bg-white/75
              p-4
            "
          >

            <Headphones
              size={17}
              className="text-[#176247]"
            />


            <p
              className="
                mt-4
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.14em]
                text-slate-500
              "
            >
              Customer Service
            </p>


            <h3
              className="
                mt-1
                text-lg
                font-black
                text-[#17231d]
              "
            >
              {supportAttention}
              {" "}
              need attention
            </h3>


            <p
              className="
                mt-1
                text-[10px]
                leading-4
                text-slate-500
              "
            >
              {openTickets} open ticket
              {openTickets === 1
                ? ""
                : "s"}
              {" • "}
              {pendingReturns} pending return
              {pendingReturns === 1
                ? ""
                : "s"}
            </p>

          </div>


          {/* TOP PRODUCT */}

          <div
            className="
              rounded-2xl
              border
              border-emerald-900/10
              bg-white/75
              p-4
            "
          >

            <Package
              size={17}
              className="text-[#176247]"
            />


            <p
              className="
                mt-4
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.14em]
                text-slate-500
              "
            >
              Top Product
            </p>


            <h3
              className="
                mt-1
                line-clamp-2
                text-sm
                font-black
                leading-5
                text-[#17231d]
              "
            >
              {
                topProduct?.name ||
                topProduct?.productName ||
                "No sales data"
              }
            </h3>


            {topProduct && (

              <p
                className="
                  mt-1
                  text-[10px]
                  text-slate-500
                "
              >
                PKR{" "}
                {
                  Number(
                    topProduct.revenue ||
                    0
                  ).toLocaleString()
                }
                {" revenue"}
              </p>

            )}

          </div>

        </div>


        {/* ================================================
            LIVE AI SUMMARY
        ================================================= */}

        <div
          className="
            mt-4
            flex
            items-start
            gap-3
            rounded-2xl
            border
            border-emerald-900/10
            bg-[#163a2c]
            px-4
            py-3.5
            text-white
          "
        >

          {
            totalAttention > 0
              ? (
                <AlertTriangle
                  size={18}
                  className="
                    mt-0.5
                    shrink-0
                    text-amber-300
                  "
                />
              )
              : (
                <Sparkles
                  size={18}
                  className="
                    mt-0.5
                    shrink-0
                    text-emerald-200
                  "
                />
              )
          }


          <div>

            <p
              className="
                text-sm
                font-semibold
                leading-5
                text-emerald-50
              "
            >
              {operationalMessage}
            </p>


            {(revenueChange !== 0 ||
              orderChange !== 0) && (

              <p
                className="
                  mt-1
                  text-[10px]
                  leading-4
                  text-emerald-100/65
                "
              >
                Order volume is{" "}
                {
                  orderChange > 0
                    ? `up ${orderChange}%`
                    : orderChange < 0
                      ? `down ${Math.abs(
                          orderChange
                        )}%`
                      : "unchanged"
                }{" "}
                compared with the previous
                30-day period.
              </p>

            )}

          </div>

        </div>

      </div>

    </div>

  );

}


export default AIInsightCard;