import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  TrendingUp,
  BarChart3,
} from "lucide-react";


function RevenueChart({
  data = [],
}) {

  const totalRevenue =
    data.reduce(
      (total, item) =>
        total +
        Number(
          item.revenue || 0
        ),
      0
    );


  const bestDay =
    data.reduce(
      (best, item) => {

        if (
          !best ||
          Number(item.revenue || 0) >
            Number(best.revenue || 0)
        ) {
          return item;
        }

        return best;

      },
      null
    );


  return (

    <div
      className="
        w-full
        overflow-hidden
        rounded-[24px]
        border
        border-[#dfe5df]
        bg-white
        p-5
        shadow-[0_16px_45px_rgba(16,37,29,0.06)]
        md:p-6
      "
    >

      <div
        className="
          flex
          flex-col
          gap-4
          sm:flex-row
          sm:items-start
          sm:justify-between
        "
      >

        <div>

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
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-[#e7f0e9]
                text-[#176247]
              "
            >
              <BarChart3 size={18} />
            </div>


            <div>

              <p
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.16em]
                  text-emerald-700
                "
              >
                Revenue Analytics
              </p>


              <h2
                className="
                  mt-0.5
                  text-xl
                  font-black
                  tracking-tight
                  text-[#17231d]
                "
              >
                Sales Performance
              </h2>

            </div>

          </div>


          <p
            className="
              mt-3
              text-xs
              leading-5
              text-slate-500
            "
          >
            Daily revenue performance and sales momentum.
          </p>

        </div>


        <div
          className="
            rounded-xl
            bg-[#f3f7f4]
            px-4
            py-3
            text-right
          "
        >

          <p
            className="
              text-[9px]
              font-bold
              uppercase
              tracking-[0.13em]
              text-slate-400
            "
          >
            Period Revenue
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
            PKR{" "}
            {
              totalRevenue.toLocaleString()
            }
          </strong>

        </div>

      </div>


      <div
        className="
          mt-5
          grid
          gap-3
          sm:grid-cols-2
        "
      >

        <div
          className="
            rounded-xl
            border
            border-[#e4e8e4]
            bg-[#fafbfa]
            px-4
            py-3
          "
        >

          <p
            className="
              text-[9px]
              font-bold
              uppercase
              tracking-[0.12em]
              text-slate-400
            "
          >
            Data Points
          </p>

          <p
            className="
              mt-1
              text-lg
              font-black
              text-[#17231d]
            "
          >
            {data.length}
          </p>

        </div>


        <div
          className="
            rounded-xl
            border
            border-[#e4e8e4]
            bg-[#fafbfa]
            px-4
            py-3
          "
        >

          <p
            className="
              text-[9px]
              font-bold
              uppercase
              tracking-[0.12em]
              text-slate-400
            "
          >
            Best Day
          </p>

          <div
            className="
              mt-1
              flex
              items-center
              gap-2
            "
          >

            <TrendingUp
              size={15}
              className="text-emerald-700"
            />

            <strong
              className="
                text-sm
                font-black
                text-[#17231d]
              "
            >
              {
                bestDay
                  ? `PKR ${Number(
                      bestDay.revenue || 0
                    ).toLocaleString()}`
                  : "No data"
              }
            </strong>

          </div>

        </div>

      </div>


      <div
        className="
          mt-6
          h-[320px]
          w-full
        "
      >

        {
          data.length > 0 ? (

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <AreaChart
                data={data}
                margin={{
                  top: 10,
                  right: 10,
                  left: 0,
                  bottom: 0,
                }}
              >

                <defs>

                  <linearGradient
                    id="revenueGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >

                    <stop
                      offset="5%"
                      stopColor="#176247"
                      stopOpacity={0.22}
                    />

                    <stop
                      offset="95%"
                      stopColor="#176247"
                      stopOpacity={0}
                    />

                  </linearGradient>

                </defs>


                <CartesianGrid
                  vertical={false}
                  stroke="#e9ede9"
                  strokeDasharray="4 4"
                />


                <XAxis
                  dataKey="_id"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 10,
                    fill: "#7d8a82",
                  }}
                />


                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 10,
                    fill: "#7d8a82",
                  }}
                  width={55}
                />


                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #dfe5df",
                    boxShadow:
                      "0 14px 35px rgba(16,37,29,0.12)",
                    fontSize: "12px",
                  }}
                />


                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#176247"
                  strokeWidth={3}
                  fill="url(#revenueGradient)"
                  activeDot={{
                    r: 5,
                    fill: "#176247",
                    stroke: "#ffffff",
                    strokeWidth: 2,
                  }}
                />

              </AreaChart>

            </ResponsiveContainer>

          ) : (

            <div
              className="
                flex
                h-full
                flex-col
                items-center
                justify-center
                rounded-2xl
                border
                border-dashed
                border-[#dce2dc]
                bg-[#f8faf8]
                text-center
              "
            >

              <BarChart3
                size={26}
                className="text-slate-300"
              />

              <p
                className="
                  mt-3
                  text-sm
                  font-semibold
                  text-slate-400
                "
              >
                No sales data available
              </p>

            </div>

          )
        }

      </div>

    </div>

  );

}


export default RevenueChart;