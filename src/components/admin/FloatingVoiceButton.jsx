import {
  Sparkles,
} from "lucide-react";

import AdminVoiceAssistant from "./AdminVoiceAssistant";


function FloatingVoiceButton() {

  return (

    <div
      className="
        fixed
        bottom-5
        right-5
        z-[2500]
        md:bottom-7
        md:right-7
      "
    >

      <div
        className="
          flex
          items-center
          gap-3
          rounded-2xl
          border
          border-emerald-900/10
          bg-[#10251d]
          p-2
          pl-3
          text-white
          shadow-[0_20px_55px_rgba(16,37,29,0.28)]
        "
      >

        <div
          className="
            hidden
            items-center
            gap-2
            pl-1
            sm:flex
          "
        >

          <div
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-xl
              bg-white/10
              text-emerald-200
            "
          >
            <Sparkles
              size={15}
            />
          </div>


          <div>

            <p
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.13em]
                text-emerald-200/70
              "
            >
              AI Analyst
            </p>


            <p
              className="
                text-[11px]
                font-semibold
                text-white
              "
            >
              Ask about your store
            </p>

          </div>

        </div>


        <div
          className="
            rounded-xl
            bg-white
            p-1
            text-[#10251d]
          "
        >
          <AdminVoiceAssistant />
        </div>

      </div>

    </div>

  );

}


export default FloatingVoiceButton;