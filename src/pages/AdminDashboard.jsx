import {
  useEffect,
  useState,
} from "react";


import DashboardHeader from "../components/admin/DashboardHeader";
import AIInsightCard from "../components/admin/AIInsightCard";
import FloatingVoiceButton from "../components/admin/FloatingVoiceButton";

import AnimatedCard from "../components/admin/AnimatedCard";
import StatCard from "../components/admin/StatCard";

import RevenueChart from "../components/admin/RevenueChart";
import TrendingProducts from "../components/admin/TrendingProducts";
import InventoryAlerts from "../components/admin/InventoryAlerts";
import TopCustomers from "../components/admin/TopCustomers";
import CustomerServiceOverview from "../components/admin/CustomerServiceOverview";

import MetricDetailDrawer from "../components/admin/MetricDetailDrawer";
import CustomerDetailDrawer from "../components/admin/CustomerDetailDrawer";


import {
  DollarSign,
  ShoppingCart,
  Users,
  AlertTriangle,
} from "lucide-react";


import {
  getRevenue,
  getDashboardSummary,
  getTopCustomers,
  getLowStockItems,
  getSalesTrend,
  getTrendingProducts,
  getSupportOverview,
} from "../services/adminService";



function AdminDashboard() {

  const [
    revenue,
    setRevenue,
  ] = useState(null);

  const [
    dashboardSummary,
    setDashboardSummary,
  ] = useState(null);

  const [
    customers,
    setCustomers,
  ] = useState([]);

  const [
    lowStock,
    setLowStock,
  ] = useState([]);

  const [
    salesTrend,
    setSalesTrend,
  ] = useState([]);

  const [
    trendingProducts,
    setTrendingProducts,
  ] = useState([]);

  const [
    supportOverview,
    setSupportOverview,
  ] = useState(null);

  const [
    selectedMetric,
    setSelectedMetric,
  ] = useState(null);

  const [
    selectedCustomer,
    setSelectedCustomer,
  ] = useState(null);



  useEffect(() => {

    async function loadDashboard() {

      try {

        const results =
          await Promise.allSettled([

            getRevenue(),

            getDashboardSummary(),

            getTopCustomers(),

            getLowStockItems(),

            getSalesTrend(),

            getTrendingProducts(),

            getSupportOverview(),

          ]);


        const [
          revenueResult,
          summaryResult,
          customerResult,
          inventoryResult,
          salesResult,
          trendingResult,
          supportResult,
        ] = results;


        if (revenueResult.status === "fulfilled") {
          setRevenue(revenueResult.value);
        } else {
          console.error("Revenue widget failed:", revenueResult.reason);
        }


        if (summaryResult.status === "fulfilled") {
          setDashboardSummary(summaryResult.value);
        } else {
          console.error("Dashboard summary failed:", summaryResult.reason);
        }


        if (customerResult.status === "fulfilled") {
          setCustomers(customerResult.value);
        } else {
          console.error("Top customers failed:", customerResult.reason);
        }


        if (inventoryResult.status === "fulfilled") {
          setLowStock(inventoryResult.value);
        } else {
          console.error("Inventory widget failed:", inventoryResult.reason);
        }


        if (salesResult.status === "fulfilled") {
          setSalesTrend(salesResult.value);
        } else {
          console.error("Sales trend failed:", salesResult.reason);
        }


        if (trendingResult.status === "fulfilled") {
          setTrendingProducts(trendingResult.value);
        } else {
          console.error("Trending products failed:", trendingResult.reason);
        }


        if (supportResult.status === "fulfilled") {
          setSupportOverview(supportResult.value);
        } else {
          console.error("Support overview failed:", supportResult.reason);
        }


      } catch (error) {

        console.error(
          "Dashboard error:",
          error
        );

      }

    }


    loadDashboard();

  }, []);



  const formatPKR = (
    amount
  ) => {

    return `PKR ${Number(
      amount || 0
    ).toLocaleString()}`;

  };



  const formatChange = (
    value,
    label = "last 30 days"
  ) => {

    const change =
      Number(value || 0);


    if (change > 0) {

      return `+${change}% ${label}`;

    }


    if (change < 0) {

      return `${change}% ${label}`;

    }


    return `0% ${label}`;

  };



  const revenueChange =
    dashboardSummary?.revenue
      ?.changePercent || 0;


  const orderChange =
    dashboardSummary?.orders
      ?.changePercent || 0;



  return (

    <div
      className="
        min-h-screen
        bg-[#f3f5f1]
      "
    >

      <main
        className="
          mx-auto
          w-full
          max-w-[1600px]
          px-4
          py-4
          sm:px-6
          sm:py-6
          xl:px-8
          xl:py-8
        "
      >

        <DashboardHeader />


        {/* =================================================
            AI ANALYST OVERVIEW
        ================================================== */}

        <section
          className="
            mt-6
          "
        >

          <AIInsightCard

            dashboardSummary={
              dashboardSummary
            }

            supportOverview={
              supportOverview
            }

            products={
              trendingProducts
            }

            inventory={
              lowStock
            }

          />

        </section>


        {/* =================================================
            STORE HEALTH
        ================================================== */}

        <section
          className="
            mt-6
          "
        >

          <div
            className="
              mb-3
              flex
              flex-col
              gap-1
              sm:flex-row
              sm:items-end
              sm:justify-between
            "
          >

            <div>

              <p
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-emerald-700
                "
              >
                Store Health
              </p>


              <h2
                className="
                  mt-1
                  text-xl
                  font-black
                  tracking-tight
                  text-[#16221c]
                "
              >
                Key performance metrics
              </h2>

            </div>


            <p
              className="
                text-xs
                text-slate-500
              "
            >
              Live MongoDB operational snapshot
            </p>

          </div>


          <div
            className="
              grid
              gap-4
              sm:grid-cols-2
              xl:grid-cols-4
            "
          >

            <AnimatedCard
              delay={0.1}
            >

              <StatCard

                title="Revenue"

                value={
                  dashboardSummary
                    ? formatPKR(
                        dashboardSummary
                          .revenue
                          .total
                      )
                    : "PKR 0"
                }

                change={
                  formatChange(
                    revenueChange
                  )
                }

                positive={
                  revenueChange >= 0
                }

                icon={
                  DollarSign
                }

                onClick={() =>
                  setSelectedMetric({

                    type:
                      "Revenue",

                    data:
                      dashboardSummary
                        ?.revenue,

                  })
                }

              />

            </AnimatedCard>


            <AnimatedCard
              delay={0.2}
            >

              <StatCard

                title="Orders"

                value={
                  dashboardSummary
                    ?.orders
                    ?.total || 0
                }

                change={
                  formatChange(
                    orderChange
                  )
                }

                positive={
                  orderChange >= 0
                }

                icon={
                  ShoppingCart
                }

                onClick={() =>
                  setSelectedMetric({

                    type:
                      "Orders",

                    data:
                      dashboardSummary
                        ?.orders,

                  })
                }

              />

            </AnimatedCard>


            <AnimatedCard
              delay={0.3}
            >

              <StatCard

                title="Customers"

                value={
                  dashboardSummary
                    ?.customers
                    ?.unique || 0
                }

                change={
                  "Unique purchasing customers"
                }

                positive={
                  true
                }

                icon={
                  Users
                }

                onClick={() =>
                  setSelectedMetric({

                    type:
                      "Customers",

                    data: {
                      summary:
                        dashboardSummary
                          ?.customers,

                      customers,
                    },

                  })
                }

              />

            </AnimatedCard>


            <AnimatedCard
              delay={0.4}
            >

              <StatCard

                title="Inventory Alerts"

                value={
                  dashboardSummary
                    ?.inventory
                    ?.alerts || 0
                }

                change={
                  dashboardSummary
                    ?.inventory
                    ?.alerts > 0
                    ? "Requires attention"
                    : "Inventory healthy"
                }

                positive={
                  dashboardSummary
                    ?.inventory
                    ?.alerts === 0
                }

                icon={
                  AlertTriangle
                }

                onClick={() =>
                  setSelectedMetric({

                    type:
                      "Inventory",

                    data: {
                      summary:
                        dashboardSummary
                          ?.inventory,

                      items:
                        lowStock,
                    },

                  })
                }

              />

            </AnimatedCard>

          </div>

        </section>


        {/* =================================================
            CUSTOMER SERVICE OPERATIONS
        ================================================== */}

        <section
          className="
            mt-6
          "
        >

          <div
            className="
              mb-3
              flex
              flex-col
              gap-1
              sm:flex-row
              sm:items-end
              sm:justify-between
            "
          >

            <div>

              <p
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-emerald-700
                "
              >
                Customer Operations
              </p>


              <h2
                className="
                  mt-1
                  text-xl
                  font-black
                  tracking-tight
                  text-[#16221c]
                "
              >
                Support & return activity
              </h2>

            </div>


            <p
              className="
                text-xs
                text-slate-500
              "
            >
              Live customer-service workload
            </p>

          </div>


          <AnimatedCard
            delay={0.5}
          >

            <CustomerServiceOverview
              data={
                supportOverview
              }
            />

          </AnimatedCard>

        </section>


        {/* =================================================
            SALES PERFORMANCE
        ================================================== */}

        <section
          className="
            mt-6
          "
        >

          <AnimatedCard
            delay={0.6}
          >

            <RevenueChart
              data={
                salesTrend
              }
            />

          </AnimatedCard>

        </section>


        {/* =================================================
            TRENDING PRODUCTS
        ================================================== */}

        <section
          className="
            mt-5
          "
        >

          <AnimatedCard
            delay={0.7}
          >

            <TrendingProducts
              products={
                trendingProducts
              }
            />

          </AnimatedCard>

        </section>


        {/* =================================================
            INVENTORY RISK
        ================================================== */}

        <section
          className="
            mt-5
          "
        >

          <AnimatedCard
            delay={0.8}
          >

            <InventoryAlerts
              items={
                lowStock
              }
            />

          </AnimatedCard>

        </section>


        {/* =================================================
            CUSTOMER INTELLIGENCE
        ================================================== */}

        <section
          className="
            mt-5
          "
        >

          <AnimatedCard
            delay={0.9}
          >

            <TopCustomers

              customers={
                customers
              }

              onSelectCustomer={
                setSelectedCustomer
              }

            />

          </AnimatedCard>

        </section>


        {/* =================================================
            GENERAL METRIC DETAIL DRAWER
        ================================================== */}

        <MetricDetailDrawer

          open={
            !!selectedMetric
          }

          onClose={() =>
            setSelectedMetric(
              null
            )
          }

          type={
            selectedMetric?.type
          }

          data={
            selectedMetric?.data
          }

        />


        {/* =================================================
            CUSTOMER DETAIL DRAWER
        ================================================== */}

        <CustomerDetailDrawer

          open={
            !!selectedCustomer
          }

          onClose={() =>
            setSelectedCustomer(
              null
            )
          }

          customer={
            selectedCustomer
          }

        />


        <FloatingVoiceButton />

      </main>

    </div>

  );

}


export default AdminDashboard;