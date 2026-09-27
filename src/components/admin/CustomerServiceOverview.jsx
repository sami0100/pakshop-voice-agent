import {
  Headphones,
  RotateCcw,
  AlertTriangle,
  ArrowUpRight,
} from "lucide-react";


function CustomerServiceOverview({
  data,
}) {

  const tickets =
    data?.tickets || {
      total: 0,
      open: 0,
      resolved: 0,
    };

  const returns =
    data?.returns || {
      total: 0,
      requested: 0,
      processed: 0,
    };

  const attentionRequired =
    data?.attentionRequired || 0;

  const recentTickets =
    data?.recentTickets || [];

  const recentReturns =
    data?.recentReturns || [];


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
          flex-col
          gap-4
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >

        <div>

          <p
            className="
              text-[10px]
              font-bold
              uppercase
              tracking-[0.18em]
              text-emerald-700
            "
          >
            Customer Operations
          </p>

          <h2
            className="
              mt-1
              text-xl
              font-black
              tracking-tight
              text-[#17231d]
            "
          >
            Customer Service
          </h2>

          <p
            className="
              mt-1
              text-xs
              text-slate-500
            "
          >
            Support workload and return activity.
          </p>

        </div>


        <div
          className="
            inline-flex
            items-center
            gap-2
            rounded-full
            bg-[#eef4ef]
            px-3
            py-2
            text-xs
            font-bold
            text-[#176247]
          "
        >
          <AlertTriangle size={14} />

          {attentionRequired}
          {" "}
          need attention
        </div>

      </div>


      <div
        className="
          mt-5
          grid
          gap-3
          sm:grid-cols-3
        "
      >

        <div
          className="
            rounded-2xl
            border
            border-[#e2e7e2]
            bg-[#f8faf8]
            p-4
          "
        >

          <div
            className="
              flex
              items-center
              justify-between
            "
          >

            <span
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                bg-[#e7f0e9]
                text-[#176247]
              "
            >
              <Headphones size={16} />
            </span>

            <span
              className="
                text-[10px]
                font-semibold
                text-slate-400
              "
            >
              Tickets
            </span>

          </div>


          <h3
            className="
              mt-4
              text-2xl
              font-black
              text-[#17231d]
            "
          >
            {tickets.open}
          </h3>

          <p
            className="
              mt-1
              text-xs
              font-semibold
              text-slate-500
            "
          >
            Open tickets
          </p>

          <p
            className="
              mt-2
              text-[11px]
              text-slate-400
            "
          >
            {tickets.total} total
          </p>

        </div>


        <div
          className="
            rounded-2xl
            border
            border-[#e2e7e2]
            bg-[#f8faf8]
            p-4
          "
        >

          <div
            className="
              flex
              items-center
              justify-between
            "
          >

            <span
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                bg-[#e7f0e9]
                text-[#176247]
              "
            >
              <RotateCcw size={16} />
            </span>

            <span
              className="
                text-[10px]
                font-semibold
                text-slate-400
              "
            >
              Returns
            </span>

          </div>


          <h3
            className="
              mt-4
              text-2xl
              font-black
              text-[#17231d]
            "
          >
            {returns.requested}
          </h3>

          <p
            className="
              mt-1
              text-xs
              font-semibold
              text-slate-500
            "
          >
            Pending returns
          </p>

          <p
            className="
              mt-2
              text-[11px]
              text-slate-400
            "
          >
            {returns.total} total
          </p>

        </div>


        <div
          className="
            rounded-2xl
            border
            border-amber-200
            bg-amber-50
            p-4
          "
        >

          <div
            className="
              flex
              items-center
              justify-between
            "
          >

            <span
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                bg-amber-100
                text-amber-700
              "
            >
              <AlertTriangle size={16} />
            </span>

            <span
              className="
                text-[10px]
                font-semibold
                text-amber-700/70
              "
            >
              Priority
            </span>

          </div>


          <h3
            className="
              mt-4
              text-2xl
              font-black
              text-amber-900
            "
          >
            {attentionRequired}
          </h3>

          <p
            className="
              mt-1
              text-xs
              font-semibold
              text-amber-800
            "
          >
            Needs attention
          </p>

          <p
            className="
              mt-2
              text-[11px]
              text-amber-700/70
            "
          >
            Tickets + returns
          </p>

        </div>

      </div>


      <div
        className="
          mt-6
          grid
          gap-5
          lg:grid-cols-2
        "
      >

        <div>

          <div
            className="
              mb-3
              flex
              items-center
              justify-between
            "
          >

            <h3
              className="
                text-sm
                font-black
                text-[#17231d]
              "
            >
              Recent Complaints
            </h3>

            <span
              className="
                text-[10px]
                font-semibold
                text-slate-400
              "
            >
              Latest activity
            </span>

          </div>


          <div
            className="
              space-y-2
            "
          >

            {recentTickets.length ===
            0 ? (

              <div
                className="
                  rounded-xl
                  border
                  border-dashed
                  border-[#dce2dc]
                  bg-[#f8faf8]
                  px-4
                  py-6
                  text-center
                  text-xs
                  text-slate-400
                "
              >
                No recent support tickets.
              </div>

            ) : (

              recentTickets.map(
                (ticket) => (

                  <div
                    key={
                      ticket.ticketId
                    }
                    className="
                      rounded-xl
                      border
                      border-[#e3e7e3]
                      bg-[#fafbfa]
                      p-3
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

                      <div>

                        <p
                          className="
                            text-[10px]
                            font-bold
                            text-[#176247]
                          "
                        >
                          {
                            ticket.ticketId
                          }
                        </p>

                        <p
                          className="
                            mt-1
                            text-xs
                            font-semibold
                            text-[#26332c]
                          "
                        >
                          {
                            ticket.issue
                          }
                        </p>

                      </div>


                      <span
                        className="
                          rounded-full
                          bg-[#e7f0e9]
                          px-2
                          py-1
                          text-[9px]
                          font-bold
                          text-[#176247]
                        "
                      >
                        {
                          ticket.status
                        }
                      </span>

                    </div>


                    <div
                      className="
                        mt-3
                        flex
                        items-center
                        justify-between
                        border-t
                        border-[#ecefec]
                        pt-2
                        text-[10px]
                        text-slate-400
                      "
                    >

                      <span>
                        {
                          ticket.orderNumber
                        }
                      </span>

                      <span>
                        {
                          ticket.priority
                        }
                      </span>

                    </div>

                  </div>

                )
              )

            )}

          </div>

        </div>


        <div>

          <div
            className="
              mb-3
              flex
              items-center
              justify-between
            "
          >

            <h3
              className="
                text-sm
                font-black
                text-[#17231d]
              "
            >
              Recent Returns
            </h3>

            <span
              className="
                text-[10px]
                font-semibold
                text-slate-400
              "
            >
              Latest activity
            </span>

          </div>


          <div
            className="
              space-y-2
            "
          >

            {recentReturns.length ===
            0 ? (

              <div
                className="
                  rounded-xl
                  border
                  border-dashed
                  border-[#dce2dc]
                  bg-[#f8faf8]
                  px-4
                  py-6
                  text-center
                  text-xs
                  text-slate-400
                "
              >
                No recent return requests.
              </div>

            ) : (

              recentReturns.map(
                (returnRequest) => (

                  <div
                    key={
                      returnRequest.returnId
                    }
                    className="
                      rounded-xl
                      border
                      border-[#e3e7e3]
                      bg-[#fafbfa]
                      p-3
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

                      <div>

                        <p
                          className="
                            text-[10px]
                            font-bold
                            text-[#176247]
                          "
                        >
                          {
                            returnRequest.returnId
                          }
                        </p>

                        <p
                          className="
                            mt-1
                            text-xs
                            font-semibold
                            text-[#26332c]
                          "
                        >
                          {
                            returnRequest.reason
                          }
                        </p>

                      </div>


                      <span
                        className="
                          rounded-full
                          bg-[#e7f0e9]
                          px-2
                          py-1
                          text-[9px]
                          font-bold
                          text-[#176247]
                        "
                      >
                        {
                          returnRequest.status
                        }
                      </span>

                    </div>


                    <div
                      className="
                        mt-3
                        flex
                        items-center
                        justify-between
                        border-t
                        border-[#ecefec]
                        pt-2
                        text-[10px]
                        text-slate-400
                      "
                    >

                      <span>
                        {
                          returnRequest.orderNumber
                        }
                      </span>

                      <ArrowUpRight
                        size={12}
                      />

                    </div>

                  </div>

                )
              )

            )}

          </div>

        </div>

      </div>

    </div>

  );

}


export default CustomerServiceOverview;