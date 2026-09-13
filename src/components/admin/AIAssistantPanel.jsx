import { useEffect, useState } from "react";

import {
  X,
  Sparkles,
  LoaderCircle,
  Send,
} from "lucide-react";


import {
  getAdminBusinessContext,
} from "../../agents/adminAgent";


import {
  askAdminAI,
} from "../../services/aiService";




function AIAssistantPanel({

  open,

  onClose,

}) {



  const [loading,setLoading] = useState(false);

  const [context,setContext] = useState(null);

  const [question,setQuestion] = useState("");

  const [answer,setAnswer] = useState("");





  useEffect(()=>{


    if(open){

      loadContext();

    }


  },[open]);






  async function loadContext(){


    try{


      setLoading(true);


      const data =
        await getAdminBusinessContext();


      setContext(data);


    }
    catch(error){

      console.error(error);

    }
    finally{

      setLoading(false);

    }


  }







  async function handleAsk(){


    if(!question.trim()) return;



    try{


      setLoading(true);


      const response =
        await askAdminAI(question);



      setAnswer(response);



    }
    catch(error){


      console.error(error);


      setAnswer(
        "Unable to analyze data right now."
      );


    }
    finally{

      setLoading(false);

    }


  }







  if(!open) return null;







  return (

    <>


      <div

        className="
          fixed
          inset-0
          z-[80]
          bg-black/20
        "

        onClick={onClose}

      />






      <div

        className="
          fixed
          right-6
          top-24
          z-[90]
          w-[420px]
          rounded-3xl
          bg-white
          p-6
          shadow-2xl
        "

      >




        <div
          className="
            flex
            justify-between
            items-center
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
                rounded-xl
                bg-indigo-100
                p-2
              "
            >

              <Sparkles
                className="
                  text-indigo-600
                "
              />

            </div>


            <div>

              <h2
                className="
                  font-bold
                "
              >
                PakShop AI Assistant
              </h2>


              <p
                className="
                  text-xs
                  text-slate-500
                "
              >
                Ask about your store
              </p>


            </div>


          </div>





          <button
            onClick={onClose}
            className="
              rounded-lg
              p-2
              hover:bg-slate-100
            "
          >

            <X size={18}/>

          </button>



        </div>









        <div className="mt-6 space-y-4">



          <div
            className="
              rounded-2xl
              bg-indigo-50
              p-4
            "
          >

            <p className="text-sm">

              Revenue:

            </p>


            <p className="font-bold">

              $
              {
                context
                ?.get_revenue
                ?.totalRevenue
                ?.toLocaleString()
                ||
                0
              }

            </p>


          </div>







          {
            answer && (

              <div
                className="
                  rounded-2xl
                  bg-green-50
                  p-4
                "
              >

                <p
                  className="
                    text-sm
                    font-semibold
                  "
                >
                  AI Response
                </p>


                <p
                  className="
                    mt-2
                    text-sm
                  "
                >
                  {answer}
                </p>


              </div>

            )
          }






          <div
            className="
              flex
              gap-2
            "
          >


            <input

              value={question}

              onChange={(e)=>
                setQuestion(e.target.value)
              }

              placeholder="
                Ask: What should I restock?
              "

              className="
                flex-1
                rounded-xl
                border
                px-4
                py-3
                outline-none
              "

            />



            <button

              onClick={handleAsk}

              className="
                rounded-xl
                bg-indigo-600
                px-4
                text-white
              "

            >

              {
                loading
                ?
                <LoaderCircle
                  className="
                    animate-spin
                  "
                />
                :
                <Send size={18}/>
              }


            </button>



          </div>




        </div>




      </div>



    </>

  );

}



export default AIAssistantPanel;