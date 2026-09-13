import {
  Flame,
  TrendingUp,
  Package,
  Sparkles,
} from "lucide-react";


function TrendingProducts({

  products = [],

}) {



  return (

    <div
      className="
        rounded-3xl
        bg-white
        p-6
        border
        border-slate-200
        shadow-sm
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
                rounded-xl
                bg-orange-100
                p-3
              "
            >

              <Flame
                className="
                  text-orange-600
                "
              />

            </div>



            <h2
              className="
                text-xl
                font-bold
                text-slate-900
              "
            >
              Product Intelligence
            </h2>


          </div>



          <p
            className="
              mt-2
              text-sm
              text-slate-500
            "
          >
            AI-ranked products based on sales performance.
          </p>


        </div>


      </div>







      <div
        className="
          mt-6
          space-y-5
        "
      >



        {
          products.length > 0 ? (

            products.map((product, index) => (


              <div

                key={
                  product.productId ||
                  product._id ||
                  index
                }

                className="
                  group
                  rounded-2xl
                  border
                  border-slate-200
                  p-5
                  transition-all
                  hover:-translate-y-1
                  hover:shadow-lg
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
                        rounded-xl
                        bg-slate-100
                        font-bold
                        text-slate-700
                      "
                    >

                      #{index + 1}

                    </div>





                    <div>


                      <h3
                        className="
                          font-bold
                          text-slate-900
                        "
                      >

                        {
                          product.name ||
                          product.productId
                        }

                      </h3>



                      <p
                        className="
                          mt-1
                          text-sm
                          text-slate-500
                        "
                      >

                        {
                          product.category ||
                          "Product"
                        }

                      </p>


                    </div>


                  </div>





                  <TrendingUp
                    className="
                      text-green-500
                    "
                  />


                </div>








                {/* Metrics */}


                <div
                  className="
                    mt-5
                    grid
                    gap-4
                    md:grid-cols-2
                  "
                >



                  <div
                    className="
                      rounded-xl
                      bg-slate-50
                      p-4
                    "
                  >

                    <p
                      className="
                        text-xs
                        text-slate-500
                      "
                    >
                      Units Sold
                    </p>


                    <p
                      className="
                        mt-1
                        text-xl
                        font-bold
                      "
                    >

                      {
                        product.unitsSold || 0
                      }

                    </p>


                  </div>





                  <div
                    className="
                      rounded-xl
                      bg-slate-50
                      p-4
                    "
                  >

                    <p
                      className="
                        text-xs
                        text-slate-500
                      "
                    >
                      Revenue
                    </p>


                    <p
                      className="
                        mt-1
                        text-xl
                        font-bold
                      "
                    >

                      $
                      {
                        product.revenue
                        ?
                        product.revenue.toLocaleString()
                        :
                        0
                      }

                    </p>


                  </div>



                </div>







                {/* Momentum */}


                <div
                  className="
                    mt-5
                  "
                >


                  <div
                    className="
                      flex
                      justify-between
                      text-sm
                    "
                  >

                    <span
                      className="
                        text-slate-500
                      "
                    >
                      Sales Momentum
                    </span>


                    <span
                      className="
                        font-semibold
                        text-green-600
                      "
                    >
                      {
                        Math.min(
                          95,
                          (product.unitsSold || 0) * 10
                        )
                      }%

                    </span>


                  </div>



                  <div
                    className="
                      mt-2
                      h-2
                      overflow-hidden
                      rounded-full
                      bg-slate-100
                    "
                  >

                    <div
                      className="
                        h-full
                        rounded-full
                        bg-green-500
                      "
                      style={{
                        width:
                          `${Math.min(
                            95,
                            (product.unitsSold || 0) * 10
                          )}%`
                      }}
                    />

                  </div>


                </div>








                {/* AI Insight */}


                <div
                  className="
                    mt-5
                    flex
                    gap-3
                    rounded-xl
                    bg-indigo-50
                    p-4
                  "
                >


                  <Sparkles
                    size={18}
                    className="
                      mt-1
                      text-indigo-600
                    "
                  />



                  <p
                    className="
                      text-sm
                      text-indigo-900
                    "
                  >

                    {
                      product.unitsSold > 10

                      ?

                      "High demand product. Consider increasing availability."

                      :

                      "Product is performing steadily. Continue monitoring sales."

                    }

                  </p>


                </div>




              </div>


            ))

          ) : (


            <div
              className="
                py-10
                text-center
                text-slate-400
              "
            >
              No trending products available.
            </div>


          )

        }



      </div>



    </div>


  );

}


export default TrendingProducts;