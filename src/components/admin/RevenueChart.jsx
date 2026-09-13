import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


function RevenueChart({
  data = [],
}) {

  return (

    <div
      className="
        w-full
        overflow-hidden
        rounded-2xl
        bg-white
        p-6
        shadow-sm
        border
        border-slate-200
      "
    >

      <div className="mb-6">

        <h2
          className="
            text-xl
            font-semibold
            text-slate-900
          "
        >
          Sales Performance
        </h2>


        <p
          className="
            mt-1
            text-sm
            text-slate-500
          "
        >
          Revenue trend over time
        </p>

      </div>


      <div
        className="
          w-full
          h-[350px]
        "
      >

        {
          data.length > 0 ? (

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <LineChart
                data={data}
                margin={{
                  top: 10,
                  right: 30,
                  left: 10,
                  bottom: 10,
                }}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                />


                <XAxis
                  dataKey="_id"
                  tick={{
                    fontSize: 12,
                  }}
                />


                <YAxis
                  tick={{
                    fontSize: 12,
                  }}
                />


                <Tooltip />


                <Line

                  type="monotone"

                  dataKey="revenue"

                  strokeWidth={3}

                  dot={true}

                />


              </LineChart>


            </ResponsiveContainer>


          ) : (


            <div
              className="
                flex
                h-full
                items-center
                justify-center
                text-slate-400
              "
            >
              No sales data available
            </div>


          )

        }


      </div>


    </div>

  );

}


export default RevenueChart;