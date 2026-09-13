import {
  AlertTriangle,
  Package,
  Sparkles,
  TrendingDown,
} from "lucide-react";


function InventoryAlerts({

  items = [],

}) {



  const getRisk = (item) => {


    const stock = item.stock || 0;

    const threshold =
      item.lowStockThreshold || 10;



    if (stock <= threshold / 2) {

      return {
        label: "High Risk",
        color:
          "bg-red-100 text-red-700",
      };

    }


    return {

      label: "Medium Risk",

      color:
        "bg-yellow-100 text-yellow-700",

    };


  };






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
          gap-3
        "
      >

        <div
          className="
            rounded-xl
            bg-red-100
            p-3
          "
        >

          <AlertTriangle
            className="
              text-red-600
            "
          />

        </div>




        <div>


          <h2
            className="
              text-xl
              font-bold
              text-slate-900
            "
          >
            Inventory Intelligence
          </h2>


          <p
            className="
              text-sm
              text-slate-500
            "
          >
            AI monitored stock risks and recommendations.
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
          items.length > 0 ? (


            items.map((item,index)=>{


              const risk = getRisk(item);


              const percentage = Math.min(
                100,
                (
                  (item.stock || 0) /
                  ((item.lowStockThreshold || 10) * 3)
                ) * 100
              );



              return (

                <div

                  key={
                    item._id ||
                    index
                  }

                  className="
                    rounded-2xl
                    border
                    border-slate-200
                    p-5
                    transition
                    hover:-translate-y-1
                    hover:shadow-lg
                  "

                >



                  <div
                    className="
                      flex
                      items-start
                      justify-between
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
                          rounded-xl
                          bg-slate-100
                          p-3
                        "
                      >

                        <Package
                          className="
                            text-slate-700
                          "
                        />

                      </div>





                      <div>


                        <h3
                          className="
                            font-bold
                            text-slate-900
                          "
                        >

                          {
                            item.name ||
                            item.productName ||
                            "Unknown Product"
                          }

                        </h3>



                        <p
                          className="
                            mt-1
                            text-sm
                            text-slate-500
                          "
                        >

                          Stock:
                          {" "}
                          {item.stock || 0}
                          {" "}
                          units

                        </p>


                      </div>


                    </div>






                    <span
                      className={`
                        rounded-full
                        px-3
                        py-1
                        text-xs
                        font-semibold
                        ${risk.color}
                      `}
                    >

                      {risk.label}

                    </span>


                  </div>








                  {/* Stock Bar */}


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
                        Stock Level
                      </span>


                      <span
                        className="
                          font-medium
                        "
                      >
                        {item.stock || 0}
                      </span>


                    </div>




                    <div
                      className="
                        mt-2
                        h-2
                        rounded-full
                        bg-slate-100
                        overflow-hidden
                      "
                    >


                      <div

                        className="
                          h-full
                          rounded-full
                          bg-red-500
                        "

                        style={{
                          width:`${percentage}%`
                        }}

                      />



                    </div>



                  </div>








                  {/* AI Recommendation */}


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
                        (item.stock || 0)
                        <=
                        (item.lowStockThreshold || 10)

                        ?

                        "AI recommends restocking this product soon to avoid missed sales."

                        :

                        "Inventory level is healthy. Continue monitoring demand."

                      }


                    </p>


                  </div>





                </div>

              );


            })


          )

          :

          (

            <div
              className="
                py-10
                text-center
                text-slate-400
              "
            >

              No inventory risks detected.

            </div>

          )


        }



      </div>



    </div>

  );

}


export default InventoryAlerts;