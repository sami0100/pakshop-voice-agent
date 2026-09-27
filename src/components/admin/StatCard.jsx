import {
  ArrowUpRight,
} from "lucide-react";


function StatCard({

  title,

  value,

  change,

  icon: Icon,

  positive = true,

  onClick,

}) {


  return (

    <div
      onClick={
        onClick
      }
      className="
        group
        cursor-pointer
        rounded-[22px]
        border
        border-[#dfe5df]
        bg-white
        p-5
        shadow-[0_10px_30px_rgba(16,37,29,0.05)]
        transition
        duration-200
        hover:-translate-y-1
        hover:border-emerald-700/20
        hover:shadow-[0_18px_45px_rgba(16,37,29,0.10)]
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

        <div>

          <p
            className="
              text-[10px]
              font-bold
              uppercase
              tracking-[0.15em]
              text-slate-500
            "
          >
            {title}
          </p>


          <h2
            className="
              mt-3
              text-[28px]
              font-black
              tracking-tight
              text-[#17231d]
            "
          >
            {value}
          </h2>

        </div>


        <div
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-2xl
            bg-[#eaf0eb]
            text-[#176247]
            transition
            group-hover:bg-[#163a2c]
            group-hover:text-white
          "
        >
          <Icon size={19} />
        </div>

      </div>


      <div
        className={`
          mt-5
          flex
          items-center
          gap-1.5
          text-xs
          font-semibold
          ${
            positive
              ? "text-emerald-700"
              : "text-amber-700"
          }
        `}
      >

        <ArrowUpRight size={14} />

        {change}

      </div>


      <div
        className="
          mt-5
          flex
          items-center
          justify-between
          border-t
          border-slate-100
          pt-3
        "
      >

        <span
          className="
            text-xs
            font-semibold
            text-slate-500
          "
        >
          View details
        </span>

        <ArrowUpRight
          size={14}
          className="
            text-[#176247]
            transition
            group-hover:translate-x-0.5
            group-hover:-translate-y-0.5
          "
        />

      </div>

    </div>

  );

}


export default StatCard;