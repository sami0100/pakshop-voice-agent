import {
  Package,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";


function TrendingProducts({
  products = [],
}) {

  const topProducts =
    products.slice(0, 5);


  return (

    <div
      className="
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
            <TrendingUp
              size={18}
            />
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
              Product Performance
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
              Trending Products
            </h2>

          </div>

        </div>


        <span
          className="
            rounded-full
            bg-[#eef4ef]
            px-3
            py-1.5
            text-[10px]
            font-bold
            text-[#176247]
          "
        >
          Top {topProducts.length}
        </span>

      </div>


      <p
        className="
          mt-3
          text-xs
          leading-5
          text-slate-500
        "
      >
        Products generating the strongest sales activity and revenue.
      </p>


      {topProducts.length === 0 ? (

        <div
          className="
            mt-5
            flex
            min-h-[220px]
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

          <Package
            size={28}
            className="
              text-slate-300
            "
          />

          <p
            className="
              mt-3
              text-sm
              font-semibold
              text-slate-400
            "
          >
            No product data available
          </p>

        </div>

      ) : (

        <div
          className="
            mt-5
            grid
            gap-3
            md:grid-cols-2
            xl:grid-cols-5
          "
        >

          {topProducts.map(
            (product, index) => (

              <article
                key={
                  product.productId ||
                  product.id ||
                  product.name
                }
                className="
                  group
                  rounded-2xl
                  border
                  border-[#e4e8e4]
                  bg-[#fafbfa]
                  p-4
                  transition
                  hover:-translate-y-0.5
                  hover:border-emerald-700/20
                  hover:bg-white
                  hover:shadow-[0_10px_28px_rgba(16,37,29,0.06)]
                "
              >

                <div
                  className="
                    flex
                    items-start
                    justify-between
                    gap-3
                  "
                >

                  <div
                    className="
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-[#163a2c]
                      text-xs
                      font-black
                      text-white
                    "
                  >
                    {index + 1}
                  </div>


                  <ArrowUpRight
                    size={15}
                    className="
                      shrink-0
                      text-[#176247]
                      transition
                      group-hover:translate-x-0.5
                      group-hover:-translate-y-0.5
                    "
                  />

                </div>


                <div
                  className="
                    mt-4
                  "
                >

                  <h3
                    className="
                      min-h-[40px]
                      text-sm
                      font-black
                      leading-5
                      text-[#17231d]
                    "
                  >
                    {
                      product.name ||
                      product.productName ||
                      "Unnamed Product"
                    }
                  </h3>


                  <p
                    className="
                      mt-1
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.12em]
                      text-slate-400
                    "
                  >
                    {
                      product.category ||
                      "General"
                    }
                  </p>

                </div>


                <div
                  className="
                    mt-5
                    space-y-2
                  "
                >

                  <div
                    className="
                      rounded-xl
                      bg-[#f0f5f1]
                      px-3
                      py-2.5
                    "
                  >

                    <p
                      className="
                        text-[8px]
                        font-bold
                        uppercase
                        tracking-[0.1em]
                        text-slate-400
                      "
                    >
                      Units Sold
                    </p>


                    <strong
                      className="
                        mt-1
                        block
                        text-sm
                        font-black
                        text-[#17231d]
                      "
                    >
                      {
                        product.unitsSold ??
                        product.orderCount ??
                        product.totalSold ??
                        0
                      }
                    </strong>

                  </div>


                  <div
                    className="
                      rounded-xl
                      bg-[#f0f5f1]
                      px-3
                      py-2.5
                    "
                  >

                    <p
                      className="
                        text-[8px]
                        font-bold
                        uppercase
                        tracking-[0.1em]
                        text-slate-400
                      "
                    >
                      Revenue
                    </p>


                    <strong
                      className="
                        mt-1
                        block
                        text-sm
                        font-black
                        text-[#17231d]
                      "
                    >
                      PKR{" "}
                      {
                        Number(
                          product.revenue ||
                          0
                        ).toLocaleString()
                      }
                    </strong>

                  </div>

                </div>

              </article>

            )
          )}

        </div>

      )}

    </div>

  );

}


export default TrendingProducts;