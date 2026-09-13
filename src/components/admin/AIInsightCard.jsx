import {
  Sparkles,
  Mic,
  ArrowUpRight,
  TrendingUp,
  Package,
  Users,
  Activity,
  AlertTriangle,
} from "lucide-react";


function AIInsightCard({

  revenue,

  products = [],

  inventory = [],

  customers = [],

  onAskAI,

}) {


  const topProduct = products[0];

  const topCustomer = customers[0];

  const hasInventoryRisk = inventory.length > 0;



  return (

    <div

      className="
        relative
        z-0
        overflow-hidden
        rounded-3xl
        bg-gradient-to-br
        from-indigo-700
        via-purple-700
        to-blue-700
        p-6
        text-white
        shadow-xl
      "

    >



      {/* background glow */}

      <div

        className="
          pointer-events-none
          absolute
          -right-20
          -top-20
          h-64
          w-64
          rounded-full
          bg-white
          opacity-10
        "

      />





      <div className="relative">





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
                bg-white/20
                p-3
              "

            >

              <Sparkles size={26}/>

            </div>




            <div>


              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >

                <h2
                  className="
                    text-2xl
                    font-bold
                  "
                >
                  PakShop AI Analyst
                </h2>


                <span
                  className="
                    rounded-full
                    bg-green-400/20
                    px-3
                    py-1
                    text-xs
                    text-green-200
                  "
                >
                  AI Online
                </span>


              </div>



              <p
                className="
                  mt-1
                  text-sm
                  text-white/70
                "
              >
                Your intelligent commerce assistant.
              </p>


            </div>


          </div>






          <button

            onClick={onAskAI}

            className="
              flex
              items-center
              gap-2
              rounded-xl
              bg-white
              px-5
              py-3
              text-sm
              font-semibold
              text-indigo-700
              transition
              hover:scale-105
            "

          >

            <Mic size={17}/>

            Ask AI

            <ArrowUpRight size={15}/>


          </button>



        </div>









        {/* Intelligence cards */}



        <div

          className="
            mt-6
            grid
            gap-4
            md:grid-cols-2
            xl:grid-cols-4
          "

        >






          <div

            className="
              rounded-2xl
              bg-white/10
              p-4
              backdrop-blur-sm
            "

          >

            <Activity size={18}/>


            <p
              className="
                mt-3
                text-xs
                text-white/70
              "
            >
              Business Health
            </p>


            <h3
              className="
                mt-1
                text-lg
                font-bold
              "
            >
              Excellent 🟢
            </h3>


          </div>








          <div

            className="
              rounded-2xl
              bg-white/10
              p-4
              backdrop-blur-sm
            "

          >

            <TrendingUp size={18}/>


            <p
              className="
                mt-3
                text-xs
                text-white/70
              "
            >
              Revenue
            </p>



            <h3
              className="
                mt-1
                text-lg
                font-bold
              "
            >

              {
                revenue
                ?
                `$${revenue.totalRevenue.toLocaleString()}`
                :
                "Loading..."
              }

            </h3>



            <p
              className="
                text-xs
                text-green-200
              "
            >
              ↑ 12.5% growth
            </p>


          </div>









          <div

            className="
              rounded-2xl
              bg-white/10
              p-4
              backdrop-blur-sm
            "

          >

            <Package size={18}/>


            <p
              className="
                mt-3
                text-xs
                text-white/70
              "
            >
              Best Product
            </p>



            <h3
              className="
                mt-1
                truncate
                text-sm
                font-bold
              "
            >

              {
                topProduct?.name ||
                "Analyzing..."
              }

            </h3>


          </div>









          <div

            className="
              rounded-2xl
              bg-white/10
              p-4
              backdrop-blur-sm
            "

          >

            <Users size={18}/>


            <p
              className="
                mt-3
                text-xs
                text-white/70
              "
            >
              Top Customer
            </p>



            <h3
              className="
                mt-1
                truncate
                text-sm
                font-bold
              "
            >

              {
                topCustomer?.name ||
                "Analyzing..."
              }

            </h3>


          </div>




        </div>









        {/* Bottom AI message */}



        <div

          className="
            mt-5
            flex
            items-center
            gap-3
            rounded-2xl
            bg-white/10
            px-5
            py-4
          "

        >


          {
            hasInventoryRisk
            ?
            <AlertTriangle
              size={20}
              className="text-yellow-300"
            />
            :
            <Sparkles size={20}/>
          }





          <p

            className="
              text-sm
              text-white
            "

          >

            {
              hasInventoryRisk

              ?

              "AI detected inventory risk. Restocking is recommended."

              :

              "AI monitoring is active. No critical issues detected."

            }

          </p>


        </div>





      </div>


    </div>


  );

}


export default AIInsightCard;