import {
  X,
  AlertTriangle,
  TrendingUp,
  Sparkles,
} from "lucide-react";



function NotificationPanel({
  open,
  onClose,
}) {


  if (!open) return null;



  return (

    <>


      {/* overlay */}

      <div

        onClick={onClose}

        className="
          fixed
          inset-0
          z-[90]
          bg-black/10
        "

      />





      {/* notification drawer */}

      <div

        className="
          fixed
          right-6
          top-24
          z-[100]
          w-[380px]
          rounded-3xl
          bg-white
          p-6
          shadow-2xl
          border
          border-slate-200
          animate-in
          slide-in-from-right
          duration-300
        "

      >


        <div
          className="
            flex
            justify-between
            items-center
            mb-6
          "
        >

          <h2
            className="
              text-xl
              font-bold
              text-slate-900
            "
          >
            Notifications
          </h2>



          <button

            onClick={onClose}

            className="
              rounded-xl
              p-2
              hover:bg-slate-100
            "

          >

            <X size={18}/>

          </button>


        </div>






        <div className="space-y-4">



          <div
            className="
              rounded-2xl
              bg-red-50
              p-4
              flex
              gap-3
            "
          >

            <AlertTriangle
              className="text-red-600"
            />


            <div>

              <p className="font-semibold">
                Inventory Alert
              </p>


              <p className="text-sm text-slate-600">
                Modern Living Room Sofa is below stock threshold.
              </p>

            </div>


          </div>





          <div
            className="
              rounded-2xl
              bg-green-50
              p-4
              flex
              gap-3
            "
          >

            <TrendingUp
              className="text-green-600"
            />


            <div>

              <p className="font-semibold">
                Sales Growth
              </p>


              <p className="text-sm text-slate-600">
                Revenue increased 12.5% this month.
              </p>

            </div>


          </div>






          <div
            className="
              rounded-2xl
              bg-indigo-50
              p-4
              flex
              gap-3
            "
          >

            <Sparkles
              className="text-indigo-600"
            />


            <div>

              <p className="font-semibold">
                AI Recommendation
              </p>


              <p className="text-sm text-slate-600">
                Restock HOME-001 soon.
              </p>

            </div>


          </div>




        </div>


      </div>


    </>

  );

}


export default NotificationPanel;