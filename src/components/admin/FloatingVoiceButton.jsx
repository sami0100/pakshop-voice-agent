import AdminVoiceAssistant from "./AdminVoiceAssistant";


function FloatingVoiceButton() {


  return (

    <div
      className="
        fixed
        bottom-8
        right-8
        z-50
      "
    >

      <AdminVoiceAssistant />

    </div>

  );

}


export default FloatingVoiceButton;