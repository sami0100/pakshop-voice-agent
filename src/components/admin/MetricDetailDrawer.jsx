import {
  X,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Users,
  AlertTriangle,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";



function MetricDetailDrawer({

  open,

  onClose,

  type,

  data,

}) {



  if (!open) return null;




  const metrics = {


    Revenue: {

      icon: DollarSign,

      title: "Revenue Analytics",

      subtitle:
        "Track your store income and growth performance.",

      recommendation:
        "Electronics are currently driving strong revenue. Consider increasing inventory for high-performing products.",

    },



    Orders: {

      icon: ShoppingCart,

      title: "Orders Overview",

      subtitle:
        "Analyze order activity and customer purchases.",

      recommendation:
        "Monitor order trends to identify peak buying periods.",

    },



    Customers: {

      icon: Users,

      title: "Customer Intelligence",

      subtitle:
        "Understand your customer activity and value.",

      recommendation:
        "Focus on repeat customers to increase lifetime value.",

    },



    "Inventory Alerts": {

      icon: AlertTriangle,

      title: "Inventory Intelligence",

      subtitle:
        "Monitor products that require attention.",

      recommendation:
        "Restock low inventory products before they affect sales.",

    },


  };



  const current = metrics[type];

  const Icon = current.icon;





  return (

    <>

      {/* Overlay */}

      <div

        className="
          fixed
          inset-0
          z-40
          bg-black/30
          backdrop-blur-sm
        "

        onClick={onClose}

      />





      {/* Drawer */}

      <div

        className="
          fixed
          right-0
          top-0
          z-50
          h-full
          w-full
          max-w-lg
          overflow-y-auto
          bg-white
          p-8
          shadow-2xl
        "

      >



        {/* Header */}

        <div
          className="
            flex
            items-center
            justify-between
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
                rounded-2xl
                bg-indigo-100
                p-3
              "
            >

              <Icon
                className="
                  text-indigo-600
                "
              />

            </div>




            <div>

              <h2
                className="
                  text-2xl
                  font-bold
                  text-slate-900
                "
              >
                {current.title}
              </h2>


              <p
                className="
                  text-sm
                  text-slate-500
                "
              >
                {current.subtitle}
              </p>


            </div>



          </div>




          <button

            onClick={onClose}

            className="
              rounded-xl
              p-2
              hover:bg-slate-100
            "

          >

            <X />

          </button>


        </div>







        {/* Main Metric */}


        <div
          className="
            mt-8
            rounded-3xl
            bg-gradient-to-r
            from-indigo-600
            to-purple-600
            p-6
            text-white
          "
        >



          {
            type === "Revenue" && (

              <>

                <p className="text-white/70">
                  Total Revenue
                </p>


                <h3
                  className="
                    mt-3
                    text-4xl
                    font-bold
                  "
                >
                  ${
                    data?.totalRevenue
                    ?
                    data.totalRevenue.toLocaleString()
                    :
                    0
                  }
                </h3>



                <div
                  className="
                    mt-4
                    flex
                    items-center
                    gap-2
                    text-sm
                  "
                >

                  <TrendingUp size={16}/>

                  +12.5% compared to previous period

                </div>


              </>

            )
          }





          {
            type === "Orders" && (

              <>

                <p className="text-white/70">
                  Total Orders
                </p>


                <h3
                  className="
                    mt-3
                    text-4xl
                    font-bold
                  "
                >
                  {data?.totalOrders || 0}
                </h3>


                <p className="mt-4 text-sm">
                  Orders processed successfully
                </p>


              </>

            )
          }






          {
            type === "Customers" && (

              <>

                <p className="text-white/70">
                  Active Customers
                </p>


                <h3
                  className="
                    mt-3
                    text-4xl
                    font-bold
                  "
                >
                  {data || 0}
                </h3>


                <p className="mt-4 text-sm">
                  Customers tracked by AI analytics
                </p>


              </>

            )
          }







          {
            type === "Inventory Alerts" && (

              <>

                <p className="text-white/70">
                  Items Requiring Attention
                </p>


                <h3
                  className="
                    mt-3
                    text-4xl
                    font-bold
                  "
                >
                  {data || 0}
                </h3>


                <p className="mt-4 text-sm">
                  Low stock products detected
                </p>


              </>

            )
          }



        </div>









        {/* AI Recommendation */}


        <div

          className="
            mt-8
            rounded-3xl
            border
            border-indigo-100
            bg-indigo-50
            p-6
          "

        >



          <div
            className="
              flex
              items-center
              gap-3
            "
          >

            <Sparkles
              className="
                text-indigo-600
              "
            />


            <h3
              className="
                font-bold
                text-slate-900
              "
            >
              AI Recommendation
            </h3>


          </div>





          <p
            className="
              mt-4
              text-slate-700
            "
          >

            {current.recommendation}

          </p>




        </div>









        {/* Future Actions */}


        <div
          className="
            mt-8
            grid
            gap-4
          "
        >


          <button

            className="
              flex
              items-center
              justify-center
              gap-2
              rounded-2xl
              bg-slate-900
              px-5
              py-4
              font-semibold
              text-white
              transition
              hover:scale-[1.02]
            "

          >

            Ask AI About This

            <ArrowUpRight size={18}/>

          </button>





          <button

            onClick={onClose}

            className="
              rounded-2xl
              border
              px-5
              py-4
              font-semibold
              text-slate-700
            "

          >

            Close

          </button>



        </div>





      </div>



    </>

  );

}


export default MetricDetailDrawer;