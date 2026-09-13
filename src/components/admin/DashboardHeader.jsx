import {
  Bell,
  RefreshCw,
  Sparkles,
} from "lucide-react";

import { useState } from "react";

import NotificationPanel from "./NotificationPanel";


function DashboardHeader() {


  const [refreshing, setRefreshing] = useState(false);

  const [notificationsOpen, setNotificationsOpen] = useState(false);



  const handleRefresh = () => {


    setRefreshing(true);


    setTimeout(() => {

      window.location.reload();

    },800);


  };





  return (

    <>


    <div
      className="
        mb-8
        rounded-3xl
        bg-white
        p-8
        border
        border-slate-200
        shadow-sm
      "
    >



      <div
        className="
          flex
          flex-col
          gap-6
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >



        <div>


          <h1
            className="
              text-4xl
              font-bold
              text-slate-900
            "
          >
            Good evening, Admin 👋
          </h1>



          <p
            className="
              mt-2
              text-slate-500
            "
          >
            Here's what's happening with PakShop today.
          </p>




          <div
            className="
              mt-4
              flex
              gap-3
              flex-wrap
            "
          >


            <span
              className="
                rounded-full
                bg-green-100
                px-4
                py-2
                text-sm
                text-green-700
              "
            >
              🟢 AI Assistant Online
            </span>


            <span
              className="
                rounded-full
                bg-indigo-100
                px-4
                py-2
                text-sm
                text-indigo-700
              "
            >
              ✨ Store Intelligence Active
            </span>


          </div>


        </div>






        <div
          className="
            flex
            gap-3
          "
        >



          <button

            onClick={handleRefresh}

            className="
              flex
              items-center
              gap-2
              rounded-xl
              border
              px-5
              py-3
              transition
              hover:shadow-md
            "

          >

            <RefreshCw

              size={17}

              className={
                refreshing
                ?
                "animate-spin"
                :
                ""
              }

            />

            Refresh


          </button>





          <button

            onClick={() =>
              setNotificationsOpen(true)
            }

            className="
              relative
              rounded-xl
              border
              p-3
              transition
              hover:shadow-md
            "

          >

            <Bell size={20}/>


            <span
              className="
                absolute
                right-2
                top-2
                h-2
                w-2
                rounded-full
                bg-red-500
              "
            />


          </button>


        </div>



      </div>



    </div>





    <NotificationPanel

      open={notificationsOpen}

      onClose={() =>
        setNotificationsOpen(false)
      }

    />


    </>

  );

}


export default DashboardHeader;