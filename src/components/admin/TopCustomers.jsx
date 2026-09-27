import {
  Users,
  Crown,
  ShoppingBag,
  ArrowUpRight,
} from "lucide-react";


function TopCustomers({
  customers = [],
  onSelectCustomer,
}) {

  const topCustomers =
    customers.slice(0, 5);


  return (

    <div
      className="
        h-full
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
          items-start
          justify-between
          gap-4
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
            <Users size={18} />
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
              Customer Intelligence
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
              Top Customers
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
          Top {topCustomers.length}
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
        Highest-value customers based on real order spending.
      </p>


      <div
        className="
          mt-5
          space-y-3
        "
      >

        {topCustomers.length === 0 ? (

          <div
            className="
              flex
              min-h-[260px]
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

            <Users
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
              No customer data available
            </p>

          </div>

        ) : (

          topCustomers.map(
            (customer, index) => {

              const spending =
                Number(
                  customer.totalSpent ||
                  customer.totalSpending ||
                  customer.revenue ||
                  0
                );

              const orderCount =
                Number(
                  customer.totalOrders ||
                  customer.orderCount ||
                  customer.orders ||
                  0
                );


              return (

                <button
                  type="button"

                  key={
                    customer.id ||
                    customer._id ||
                    customer.email ||
                    customer.name
                  }

                  onClick={() =>
                    onSelectCustomer?.(
                      customer
                    )
                  }

                  className="
                    group
                    w-full
                    rounded-2xl
                    border
                    border-[#e4e8e4]
                    bg-[#fafbfa]
                    p-4
                    text-left
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
                      items-center
                      gap-3
                    "
                  >

                    <div
                      className={`
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        font-black
                        ${
                          index === 0
                            ? "bg-[#163a2c] text-white"
                            : "bg-[#e7f0e9] text-[#176247]"
                        }
                      `}
                    >

                      {
                        index === 0
                          ? (
                            <Crown
                              size={17}
                            />
                          )
                          : index + 1
                      }

                    </div>


                    <div
                      className="
                        min-w-0
                        flex-1
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
                            min-w-0
                          "
                        >

                          <h3
                            className="
                              truncate
                              text-sm
                              font-black
                              text-[#17231d]
                            "
                          >
                            {
                              customer.name ||
                              "Unknown Customer"
                            }
                          </h3>


                          <p
                            className="
                              mt-0.5
                              truncate
                              text-[10px]
                              text-slate-400
                            "
                          >
                            {
                              customer.email ||
                              "No email available"
                            }
                          </p>

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
                          mt-3
                          grid
                          grid-cols-2
                          gap-2
                        "
                      >

                        <div
                          className="
                            rounded-xl
                            bg-[#f0f5f1]
                            px-3
                            py-2
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
                            Lifetime Value
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
                            $
                            {
                              spending.toLocaleString()
                            }
                          </strong>

                        </div>


                        <div
                          className="
                            rounded-xl
                            bg-[#f0f5f1]
                            px-3
                            py-2
                          "
                        >

                          <div
                            className="
                              flex
                              items-center
                              gap-1
                              text-[8px]
                              font-bold
                              uppercase
                              tracking-[0.1em]
                              text-slate-400
                            "
                          >
                            <ShoppingBag
                              size={10}
                            />

                            Orders
                          </div>


                          <strong
                            className="
                              mt-1
                              block
                              text-sm
                              font-black
                              text-[#17231d]
                            "
                          >
                            {orderCount}
                          </strong>

                        </div>

                      </div>

                    </div>

                  </div>

                </button>

              );

            }
          )

        )}

      </div>

    </div>

  );

}


export default TopCustomers;