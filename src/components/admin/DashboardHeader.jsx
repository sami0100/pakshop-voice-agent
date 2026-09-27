import {
  Bell,
  RefreshCw,
  Sparkles,
  Activity,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import NotificationPanel from "./NotificationPanel";

import {
  getDashboardSummary,
  getLowStockItems,
  getSupportOverview,
} from "../../services/adminService";


function DashboardHeader() {

  const [
    refreshing,
    setRefreshing,
  ] = useState(false);

  const [
    notificationsOpen,
    setNotificationsOpen,
  ] = useState(false);

  const [
    dashboardSummary,
    setDashboardSummary,
  ] = useState(null);

  const [
    supportOverview,
    setSupportOverview,
  ] = useState(null);

  const [
    inventoryAlerts,
    setInventoryAlerts,
  ] = useState([]);

  const [
    notificationLoading,
    setNotificationLoading,
  ] = useState(false);



  const loadHeaderData =
    async () => {

      try {

        setNotificationLoading(
          true
        );


        const [
          summaryData,
          inventoryData,
          supportData,
        ] = await Promise.all([

          getDashboardSummary(),

          getLowStockItems(),

          getSupportOverview(),

        ]);


        setDashboardSummary(
          summaryData
        );

        setInventoryAlerts(
          Array.isArray(
            inventoryData
          )
            ? inventoryData
            : []
        );

        setSupportOverview(
          supportData
        );


      } catch (error) {

        console.error(
          "DashboardHeader data error:",
          error
        );

      } finally {

        setNotificationLoading(
          false
        );

      }

    };



  useEffect(() => {

    loadHeaderData();

  }, []);



  const handleRefresh =
    async () => {

      try {

        setRefreshing(
          true
        );


        await loadHeaderData();


        window.location.reload();


      } finally {

        setTimeout(() => {

          setRefreshing(
            false
          );

        }, 500);

      }

    };



  const attentionCount =
    Number(
      supportOverview
        ?.attentionRequired || 0
    ) +
    inventoryAlerts.length;



  return (

    <>

      <header
        className="
          rounded-[28px]
          border
          border-emerald-900/10
          bg-[#10251d]
          px-6
          py-6
          text-white
          shadow-[0_28px_80px_rgba(16,37,29,0.18)]
          md:px-8
          md:py-7
        "
      >

        <div
          className="
            flex
            flex-col
            gap-7
            xl:flex-row
            xl:items-center
            xl:justify-between
          "
        >

          <div
            className="
              max-w-3xl
            "
          >

            <div
              className="
                mb-4
                flex
                flex-wrap
                items-center
                gap-2
              "
            >

              <span
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-white/10
                  bg-white/10
                  px-3
                  py-1.5
                  text-[11px]
                  font-semibold
                  tracking-wide
                  text-emerald-100
                "
              >
                <Activity
                  size={13}
                />

                LIVE BUSINESS INTELLIGENCE
              </span>


              <span
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-emerald-300/20
                  bg-emerald-300/10
                  px-3
                  py-1.5
                  text-[11px]
                  font-semibold
                  text-emerald-100
                "
              >
                <Sparkles
                  size={13}
                />

                AI ANALYST READY
              </span>

            </div>


            <p
              className="
                mb-2
                text-xs
                font-semibold
                uppercase
                tracking-[0.24em]
                text-emerald-200/70
              "
            >
              PakShop Command Center
            </p>


            <h1
              className="
                max-w-2xl
                text-3xl
                font-black
                tracking-tight
                text-white
                md:text-4xl
                xl:text-[42px]
              "
            >
              Business performance,
              operations and customer
              intelligence in one place.
            </h1>


            <p
              className="
                mt-3
                max-w-2xl
                text-sm
                leading-6
                text-emerald-50/65
                md:text-[15px]
              "
            >
              Monitor revenue, customer
              activity, inventory risks
              and support operations from
              a single executive
              workspace.
            </p>

          </div>


          <div
            className="
              flex
              items-center
              gap-3
              self-start
              xl:self-center
            "
          >

            <button

              type="button"

              onClick={
                handleRefresh
              }

              className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                border
                border-white/10
                bg-white/10
                px-4
                py-3
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-white/15
              "
            >

              <RefreshCw

                size={16}

                className={
                  refreshing
                    ? "animate-spin"
                    : ""
                }

              />

              Refresh

            </button>


            <button

              type="button"

              onClick={async () => {

                await loadHeaderData();

                setNotificationsOpen(
                  true
                );

              }}

              className="
                relative
                inline-flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                border
                border-white/10
                bg-white/10
                text-white
                transition
                hover:bg-white/15
              "

              aria-label="Open notifications"
            >

              <Bell
                size={18}
              />


              {attentionCount > 0 && (

                <span
                  className="
                    absolute
                    -right-1
                    -top-1
                    flex
                    min-h-[18px]
                    min-w-[18px]
                    items-center
                    justify-center
                    rounded-full
                    bg-amber-300
                    px-1
                    text-[9px]
                    font-black
                    text-[#10251d]
                    ring-2
                    ring-[#10251d]
                  "
                >
                  {
                    attentionCount >
                    9
                      ? "9+"
                      : attentionCount
                  }
                </span>

              )}

            </button>

          </div>

        </div>

      </header>


      <NotificationPanel

        open={
          notificationsOpen
        }

        onClose={() =>
          setNotificationsOpen(
            false
          )
        }

        dashboardSummary={
          dashboardSummary
        }

        supportOverview={
          supportOverview
        }

        inventoryAlerts={
          inventoryAlerts
        }

        loading={
          notificationLoading
        }

      />

    </>

  );

}


export default DashboardHeader;