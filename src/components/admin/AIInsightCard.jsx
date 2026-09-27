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


  const topProduct =
    products[0];

  const topCustomer =
    customers[0];

  const hasInventoryRisk =
    inventory.length > 0;



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
              <Sparkles size={22} />
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
                Live operational intelligence for your store.
              </p>

            </div>

          </div>


          <button
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
            <Mic size={16} />

            Ask AI

            <ArrowUpRight size={14} />
          </button>

        </div>


        <div
          className="
            mt-6
            grid
            gap-3
            sm:grid-cols-2
            xl:grid-cols-4
          "
        >

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
              <Activity
                size={17}
                className="text-[#176247]"
              />

              <span
                className="
                  h-2
                  w-2
                  rounded-full
                  bg-emerald-500
                "
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
              Excellent
            </h3>

          </div>


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
              {
                revenue
                  ? `$${revenue.totalRevenue.toLocaleString()}`
                  : "Loading..."
              }
            </h3>


            <p
              className="
                mt-1
                text-xs
                font-semibold
                text-emerald-700
              "
            >
              ↑ 12.5% growth
            </p>

          </div>


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
              Best Product
            </p>


            <h3
              className="
                mt-1
                truncate
                text-sm
                font-black
                text-[#17231d]
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
              border
              border-emerald-900/10
              bg-white/75
              p-4
            "
          >

            <Users
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
              Top Customer
            </p>


            <h3
              className="
                mt-1
                truncate
                text-sm
                font-black
                text-[#17231d]
              "
            >
              {
                topCustomer?.name ||
                "Analyzing..."
              }
            </h3>

          </div>

        </div>


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
            hasInventoryRisk
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


          <p
            className="
              text-sm
              leading-5
              text-emerald-50
            "
          >
            {
              hasInventoryRisk
                ? "AI detected inventory risk. Restocking is recommended."
                : "AI monitoring is active. No critical issues detected."
            }
          </p>

        </div>

      </div>

    </div>

  );

}


export default AIInsightCard;