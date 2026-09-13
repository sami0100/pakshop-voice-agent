import {
  ArrowUpRight,
} from "lucide-react";


function StatCard({

  title,

  value,

  change,

  icon: Icon,

  positive=true,

  onClick,

}) {


  return (

    <div

      onClick={onClick}

      className="
        cursor-pointer
        rounded-3xl
        bg-white
        p-6
        border
        border-slate-200
        shadow-sm
        transition
        hover:-translate-y-1
        hover:shadow-xl
      "

    >


      <div
        className="
          flex
          justify-between
          items-start
        "
      >


        <div>


          <p
            className="
              text-sm
              text-slate-500
            "
          >
            {title}
          </p>



          <h2
            className="
              mt-3
              text-3xl
              font-bold
              text-slate-900
            "
          >
            {value}
          </h2>


        </div>



        <div
          className="
            rounded-xl
            bg-slate-100
            p-3
          "
        >

          <Icon size={22}/>

        </div>


      </div>





      <div
        className={`
          mt-5
          flex
          items-center
          gap-2
          text-sm
          font-medium
          ${
            positive
            ?
            "text-green-600"
            :
            "text-red-500"
          }
        `}
      >

        <ArrowUpRight size={16}/>

        {change}


      </div>





      <p
        className="
          mt-5
          text-sm
          text-indigo-600
        "
      >

        View details →

      </p>


    </div>

  );

}


export default StatCard;