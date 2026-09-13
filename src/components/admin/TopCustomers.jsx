import {
  Users,
  Crown,
  Sparkles,
  TrendingUp,
} from "lucide-react";


function TopCustomers({

  customers = [],

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
          gap-3
        "
      >


        <div
          className="
            rounded-xl
            bg-purple-100
            p-3
          "
        >

          <Users
            className="
              text-purple-600
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
            Customer Intelligence
          </h2>


          <p
            className="
              text-sm
              text-slate-500
            "
          >
            AI-ranked customers based on value and activity.
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
          customers.length > 0 ? (

            customers.map((customer,index)=>(


              <div

                key={
                  customer._id ||
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
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-full
                        bg-purple-100
                        font-bold
                        text-purple-700
                      "
                    >

                      {
                        index === 0
                        ?
                        "🥇"
                        :
                        `#${index+1}`
                      }

                    </div>





                    <div>


                      <h3
                        className="
                          font-bold
                          text-slate-900
                        "
                      >

                        {
                          customer.name ||
                          "Customer"
                        }

                      </h3>


                      <p
                        className="
                          text-sm
                          text-slate-500
                        "
                      >

                        {
                          customer.email ||
                          "Customer account"
                        }

                      </p>


                    </div>


                  </div>






                  {
                    index === 0 && (

                      <div
                        className="
                          flex
                          items-center
                          gap-1
                          rounded-full
                          bg-yellow-100
                          px-3
                          py-1
                          text-xs
                          font-semibold
                          text-yellow-700
                        "
                      >

                        <Crown size={14}/>

                        VIP

                      </div>

                    )
                  }




                </div>








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
                      Lifetime Value
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
                        customer.totalSpent
                        ?
                        customer.totalSpent.toLocaleString()
                        :
                        0
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
                      Customer Status
                    </p>


                    <p
                      className="
                        mt-1
                        flex
                        items-center
                        gap-2
                        font-bold
                      "
                    >

                      <TrendingUp
                        size={16}
                        className="
                          text-green-500
                        "
                      />

                      Active

                    </p>


                  </div>



                </div>







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
                      index === 0

                      ?

                      "High-value customer. AI recommends personalized engagement."

                      :

                      "Customer shows healthy purchasing activity."

                    }

                  </p>


                </div>



              </div>


            ))


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
              No customer data available.
            </div>

          )

        }


      </div>



    </div>

  );

}


export default TopCustomers;