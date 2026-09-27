import {
  X,
  Bell,
  AlertTriangle,
  Package,
  Headphones,
  RotateCcw,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";


function NotificationPanel({

  open,

  onClose,

  dashboardSummary,

  supportOverview,

  inventoryAlerts = [],

  loading = false,

}) {

  if (!open) {
    return null;
  }



  const notifications = [];


  const inventoryCount =
    inventoryAlerts.length;


  if (
    inventoryCount > 0
  ) {

    notifications.push({

      id:
        "inventory-alert",

      type:
        "warning",

      icon:
        Package,

      title:
        "Inventory requires attention",

      message:
        `${inventoryCount} product${
          inventoryCount === 1
            ? ""
            : "s"
        } currently ${
          inventoryCount === 1
            ? "requires"
            : "require"
        } restocking attention.`,

      meta:
        inventoryAlerts[0]
          ?.name
          ? `Highest priority: ${inventoryAlerts[0].name}`
          : "Review low-stock inventory.",

    });

  }



  const openTickets =
    Number(
      supportOverview
        ?.tickets
        ?.open || 0
    );


  if (
    openTickets > 0
  ) {

    notifications.push({

      id:
        "support-tickets",

      type:
        "support",

      icon:
        Headphones,

      title:
        "Open customer issues",

      message:
        `${openTickets} support ticket${
          openTickets === 1
            ? ""
            : "s"
        } ${
          openTickets === 1
            ? "is"
            : "are"
        } currently open.`,

      meta:
        "Customer-service workload requires review.",

    });

  }



  const pendingReturns =
    Number(
      supportOverview
        ?.returns
        ?.requested || 0
    );


  if (
    pendingReturns > 0
  ) {

    notifications.push({

      id:
        "return-requests",

      type:
        "return",

      icon:
        RotateCcw,

      title:
        "Pending return requests",

      message:
        `${pendingReturns} return request${
          pendingReturns === 1
            ? ""
            : "s"
        } ${
          pendingReturns === 1
            ? "is"
            : "are"
        } waiting for processing.`,

      meta:
        "Review return activity in Customer Operations.",

    });

  }



  const revenueChange =
    Number(
      dashboardSummary
        ?.revenue
        ?.changePercent || 0
    );


  if (
    revenueChange !== 0
  ) {

    notifications.push({

      id:
        "revenue-change",

      type:
        revenueChange > 0
          ? "positive"
          : "warning",

      icon:
        TrendingUp,

      title:
        revenueChange > 0
          ? "Revenue momentum improved"
          : "Revenue declined",

      message:
        `Revenue is ${
          revenueChange > 0
            ? "up"
            : "down"
        } ${Math.abs(
          revenueChange
        )}% compared with the previous 30-day period.`,

      meta:
        "Calculated from live order data.",

    });

  }



  const noIssues =
    notifications.length === 0;



  return (

    <div
      className="
        fixed
        inset-0
        z-[3200]
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
          max-w-[430px]
          overflow-y-auto
          bg-[#f4f6f3]
          shadow-2xl
        "

        onClick={(event) =>
          event.stopPropagation()
        }
      >

        {/* ================================================
            HEADER
        ================================================= */}

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
                <Bell
                  size={19}
                />
              </div>


              <div>

                <p
                  className="
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.17em]
                    text-emerald-200/70
                  "
                >
                  Live Operations
                </p>


                <h2
                  className="
                    mt-1
                    text-2xl
                    font-black
                  "
                >
                  Notifications
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

              aria-label="Close notifications"
            >
              <X
                size={18}
              />
            </button>

          </div>

        </header>


        {/* ================================================
            CONTENT
        ================================================= */}

        <div
          className="
            space-y-4
            p-5
          "
        >

          {loading ? (

            <div
              className="
                rounded-2xl
                border
                border-[#dfe5df]
                bg-white
                p-8
                text-center
                text-sm
                text-slate-400
              "
            >
              Loading live notifications...
            </div>

          ) : noIssues ? (

            <div
              className="
                rounded-[22px]
                border
                border-[#dfe5df]
                bg-white
                p-8
                text-center
              "
            >

              <div
                className="
                  mx-auto
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  bg-[#e7f0e9]
                  text-[#176247]
                "
              >
                <CheckCircle2
                  size={25}
                />
              </div>


              <h3
                className="
                  mt-4
                  text-lg
                  font-black
                  text-[#17231d]
                "
              >
                Everything looks healthy
              </h3>


              <p
                className="
                  mt-2
                  text-sm
                  leading-6
                  text-slate-500
                "
              >
                There are currently no
                operational alerts requiring
                your attention.
              </p>

            </div>

          ) : (

            notifications.map(
              (notification) => {

                const Icon =
                  notification.icon;


                const styleMap = {

                  warning: {
                    container:
                      "border-amber-200 bg-amber-50/70",

                    icon:
                      "bg-amber-100 text-amber-700",
                  },


                  support: {
                    container:
                      "border-[#dfe5df] bg-white",

                    icon:
                      "bg-[#e7f0e9] text-[#176247]",
                  },


                  return: {
                    container:
                      "border-[#dfe5df] bg-white",

                    icon:
                      "bg-[#e7f0e9] text-[#176247]",
                  },


                  positive: {
                    container:
                      "border-emerald-200 bg-emerald-50/60",

                    icon:
                      "bg-emerald-100 text-emerald-700",
                  },

                };


                const styles =
                  styleMap[
                    notification.type
                  ] ||
                  styleMap.support;


                return (

                  <article
                    key={
                      notification.id
                    }

                    className={`
                      rounded-[20px]
                      border
                      p-4
                      ${styles.container}
                    `}
                  >

                    <div
                      className="
                        flex
                        items-start
                        gap-3
                      "
                    >

                      <div
                        className={`
                          flex
                          h-10
                          w-10
                          shrink-0
                          items-center
                          justify-center
                          rounded-xl
                          ${styles.icon}
                        `}
                      >
                        <Icon
                          size={17}
                        />
                      </div>


                      <div
                        className="
                          min-w-0
                          flex-1
                        "
                      >

                        <h3
                          className="
                            text-sm
                            font-black
                            text-[#17231d]
                          "
                        >
                          {
                            notification.title
                          }
                        </h3>


                        <p
                          className="
                            mt-1
                            text-xs
                            leading-5
                            text-slate-600
                          "
                        >
                          {
                            notification.message
                          }
                        </p>


                        <p
                          className="
                            mt-3
                            border-t
                            border-black/5
                            pt-2
                            text-[10px]
                            font-semibold
                            text-slate-400
                          "
                        >
                          {
                            notification.meta
                          }
                        </p>

                      </div>

                    </div>

                  </article>

                );

              }
            )

          )}


          {!loading &&
            !noIssues && (

            <div
              className="
                rounded-2xl
                bg-[#10251d]
                p-4
                text-white
              "
            >

              <div
                className="
                  flex
                  items-start
                  gap-3
                "
              >

                <AlertTriangle
                  size={18}
                  className="
                    mt-0.5
                    shrink-0
                    text-amber-300
                  "
                />


                <div>

                  <strong
                    className="
                      text-sm
                    "
                  >
                    {
                      Number(
                        supportOverview
                          ?.attentionRequired ||
                        0
                      ) +
                      inventoryCount
                    }{" "}
                    operational items
                    need attention
                  </strong>


                  <p
                    className="
                      mt-1
                      text-xs
                      leading-5
                      text-emerald-50/70
                    "
                  >
                    Prioritize customer issues
                    and inventory risks before
                    reviewing lower-priority
                    metrics.
                  </p>

                </div>

              </div>

            </div>

          )}

        </div>

      </aside>

    </div>

  );

}


export default NotificationPanel;