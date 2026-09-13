import { useEffect, useState } from "react";


import DashboardHeader from "../components/admin/DashboardHeader";
import AIInsightCard from "../components/admin/AIInsightCard";
import FloatingVoiceButton from "../components/admin/FloatingVoiceButton";


import AnimatedCard from "../components/admin/AnimatedCard";
import StatCard from "../components/admin/StatCard";


import RevenueChart from "../components/admin/RevenueChart";
import TrendingProducts from "../components/admin/TrendingProducts";
import InventoryAlerts from "../components/admin/InventoryAlerts";
import TopCustomers from "../components/admin/TopCustomers";


import MetricDetailDrawer from "../components/admin/MetricDetailDrawer";


import {
  DollarSign,
  ShoppingCart,
  Users,
  AlertTriangle,
} from "lucide-react";


import {
  getRevenue,
  getTopCustomers,
  getLowStockItems,
  getSalesTrend,
  getTrendingProducts,
} from "../services/adminService";




function AdminDashboard() {


  const [revenue,setRevenue] = useState(null);

  const [customers,setCustomers] = useState([]);

  const [lowStock,setLowStock] = useState([]);

  const [salesTrend,setSalesTrend] = useState([]);

  const [trendingProducts,setTrendingProducts] = useState([]);


  const [selectedMetric,setSelectedMetric] = useState(null);





  useEffect(()=>{


    async function loadDashboard(){


      try{


        const [

          revenueData,
          customerData,
          inventoryData,
          salesData,
          trendingData,

        ] = await Promise.all([


          getRevenue(),

          getTopCustomers(),

          getLowStockItems(),

          getSalesTrend(),

          getTrendingProducts()


        ]);



        setRevenue(revenueData);

        setCustomers(customerData);

        setLowStock(inventoryData);

        setSalesTrend(salesData);

        setTrendingProducts(trendingData);



      }
      catch(error){


        console.error(
          "Dashboard error:",
          error
        );


      }


    }



    loadDashboard();


  },[]);







  return (

    <div

      className="
        min-h-screen
        bg-slate-50
        p-6
      "

    >




      {/* Header */}

      <DashboardHeader />






      {/* AI Admin Intelligence */}

      <div className="mt-6">

        <AIInsightCard

          revenue={revenue}

          products={trendingProducts}

          inventory={lowStock}

          customers={customers}

        />

      </div>







      {/* KPI Cards */}

      <div

        className="
          mt-8
          grid
          gap-6
          md:grid-cols-2
          xl:grid-cols-4
        "

      >




        <AnimatedCard delay={0.1}>

          <StatCard

            title="Revenue"

            value={
              revenue
              ?
              `$${revenue.totalRevenue.toLocaleString()}`
              :
              "$0"
            }

            change="+12.5% this month"

            icon={DollarSign}

            onClick={()=>setSelectedMetric({

              type:"Revenue",

              data:revenue

            })}

          />

        </AnimatedCard>






        <AnimatedCard delay={0.2}>

          <StatCard

            title="Orders"

            value={
              revenue?.totalOrders || 0
            }

            change="+8.2% this month"

            icon={ShoppingCart}

            onClick={()=>setSelectedMetric({

              type:"Orders",

              data:revenue

            })}

          />

        </AnimatedCard>






        <AnimatedCard delay={0.3}>

          <StatCard

            title="Customers"

            value={
              customers.length
            }

            change="+15% this month"

            icon={Users}

            onClick={()=>setSelectedMetric({

              type:"Customers",

              data:customers

            })}

          />

        </AnimatedCard>







        <AnimatedCard delay={0.4}>

          <StatCard

            title="Inventory Alerts"

            value={
              lowStock.length
            }

            change="Requires attention"

            positive={false}

            icon={AlertTriangle}

            onClick={()=>setSelectedMetric({

              type:"Inventory",

              data:lowStock

            })}

          />

        </AnimatedCard>



      </div>









      {/* Revenue Chart */}

      <AnimatedCard delay={0.5}>

        <div className="mt-8">

          <RevenueChart

            data={salesTrend}

          />

        </div>


      </AnimatedCard>









      {/* Tables */}

      <div

        className="
          mt-8
          grid
          gap-6
          xl:grid-cols-2
        "

      >


        <AnimatedCard delay={0.6}>

          <TrendingProducts

            products={trendingProducts}

          />

        </AnimatedCard>





        <AnimatedCard delay={0.7}>

          <InventoryAlerts

            items={lowStock}

          />

        </AnimatedCard>



      </div>









      <AnimatedCard delay={0.8}>

        <div className="mt-8">

          <TopCustomers

            customers={customers}

          />

        </div>


      </AnimatedCard>









      {/* Metric Details */}

      <MetricDetailDrawer

        open={!!selectedMetric}

        onClose={()=>setSelectedMetric(null)}

        type={selectedMetric?.type}

        data={selectedMetric?.data}

      />









      {/* AIROMOB Admin Voice */}

      <FloatingVoiceButton />





    </div>

  );

}



export default AdminDashboard;