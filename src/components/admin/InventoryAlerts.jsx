import {
  AlertTriangle,
  PackageSearch,
  Warehouse,
  ArrowUpRight,
} from "lucide-react";


function InventoryAlerts({
  items = [],
}) {

  const sortedItems = [
    ...items,
  ].sort(
    (a, b) =>
      Number(a.stock || 0) -
      Number(b.stock || 0)
  );


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
              bg-amber-100
              text-amber-700
            "
          >
            <AlertTriangle
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
                text-amber-700
              "
            >
              Inventory Risk
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
              Low Stock Alerts
            </h2>

          </div>

        </div>


        <span
          className="
            rounded-full
            bg-amber-50
            px-3
            py-1.5
            text-[10px]
            font-bold
            text-amber-700
          "
        >
          {items.length}
          {" "}
          flagged
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
        Products currently below or near their configured stock threshold.
      </p>


      <div
        className="
          mt-5
          space-y-3
        "
      >

        {sortedItems.length === 0 ? (

          <div
            className="
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

            <PackageSearch
              size={30}
              className="text-slate-300"
            />

            <h3
              className="
                mt-3
                text-sm
                font-black
                text-[#17231d]
              "
            >
              Inventory looks healthy
            </h3>

            <p
              className="
                mt-1
                text-xs
                text-slate-400
              "
            >
              No low-stock products require attention.
            </p>

          </div>

        ) : (

          sortedItems.map(
            (item) => {

              const stock =
                Number(
                  item.stock || 0
                );

              const threshold =
                Number(
                  item.lowStockThreshold ||
                  item.threshold ||
                  0
                );

              const critical =
                threshold > 0 &&
                stock <=
                  Math.max(
                    2,
                    Math.floor(
                      threshold *
                        0.5
                    )
                  );


              return (

                <div
                  key={
                    item.id ||
                    item.productId ||
                    item.name
                  }
                  className={`
                    group
                    rounded-2xl
                    border
                    p-4
                    transition
                    hover:-translate-y-0.5
                    hover:shadow-[0_10px_28px_rgba(16,37,29,0.06)]
                    ${
                      critical
                        ? "border-red-200 bg-red-50/60"
                        : "border-amber-200 bg-amber-50/40"
                    }
                  `}
                >

                  <div
                    className="
                      flex
                      items-start
                      justify-between
                      gap-4
                    "
                  >

                    <div className="min-w-0">

                      <div
                        className="
                          flex
                          flex-wrap
                          items-center
                          gap-2
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
                            item.name ||
                            item.productName ||
                            "Unnamed Product"
                          }
                        </h3>


                        <span
                          className={`
                            rounded-full
                            px-2
                            py-1
                            text-[9px]
                            font-bold
                            ${
                              critical
                                ? "bg-red-100 text-red-700"
                                : "bg-amber-100 text-amber-700"
                            }
                          `}
                        >
                          {
                            critical
                              ? "Critical"
                              : "Needs Restock"
                          }
                        </span>

                      </div>


                      <p
                        className="
                          mt-1
                          text-[10px]
                          font-semibold
                          uppercase
                          tracking-[0.1em]
                          text-slate-400
                        "
                      >
                        {
                          item.category ||
                          "Inventory Item"
                        }
                      </p>

                    </div>


                    <ArrowUpRight
                      size={15}
                      className="
                        shrink-0
                        text-amber-700
                      "
                    />

                  </div>


                  <div
                    className="
                      mt-4
                      grid
                      gap-3
                      sm:grid-cols-3
                    "
                  >

                    <div
                      className="
                        rounded-xl
                        bg-white/70
                        px-3
                        py-2.5
                      "
                    >

                      <p
                        className="
                          text-[9px]
                          font-bold
                          uppercase
                          tracking-[0.1em]
                          text-slate-400
                        "
                      >
                        Current Stock
                      </p>

                      <strong
                        className={`
                          mt-1
                          block
                          text-lg
                          font-black
                          ${
                            critical
                              ? "text-red-700"
                              : "text-amber-800"
                          }
                        `}
                      >
                        {stock}
                      </strong>

                    </div>


                    <div
                      className="
                        rounded-xl
                        bg-white/70
                        px-3
                        py-2.5
                      "
                    >

                      <p
                        className="
                          text-[9px]
                          font-bold
                          uppercase
                          tracking-[0.1em]
                          text-slate-400
                        "
                      >
                        Threshold
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
                        {threshold}
                      </strong>

                    </div>


                    <div
                      className="
                        rounded-xl
                        bg-white/70
                        px-3
                        py-2.5
                      "
                    >

                      <div
                        className="
                          flex
                          items-center
                          gap-1.5
                          text-[9px]
                          font-bold
                          uppercase
                          tracking-[0.1em]
                          text-slate-400
                        "
                      >
                        <Warehouse
                          size={12}
                        />

                        Warehouse
                      </div>

                      <strong
                        className="
                          mt-1
                          block
                          truncate
                          text-sm
                          font-black
                          text-[#17231d]
                        "
                      >
                        {
                          item.warehouse ||
                          "Not specified"
                        }
                      </strong>

                    </div>

                  </div>


                  <div
                    className="
                      mt-4
                      border-t
                      border-black/5
                      pt-3
                    "
                  >

                    <p
                      className="
                        text-[11px]
                        leading-5
                        text-slate-500
                      "
                    >
                      {
                        critical
                          ? "Stock is critically low. Restocking should be prioritized."
                          : "Inventory is below the preferred operating threshold."
                      }
                    </p>

                  </div>

                </div>

              );

            }
          )

        )}

      </div>

    </div>

  );

}


export default InventoryAlerts;