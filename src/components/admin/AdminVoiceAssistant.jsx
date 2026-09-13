import { VoiceAIButton } from "vtk-voice-ai-sdk";

import {
  createAdminTools,
} from "../../agents/adminAgent/tools";

import {
  adminAgentContext,
} from "../../agents/adminAgent/context";



function AdminVoiceAssistant() {


  const adminTools = createAdminTools();



  return (

    <VoiceAIButton

      buttonType="pill"

      title="PakShop Admin Analyst"

      initialContext={adminAgentContext}

      tools={createAdminTools()}

    />

  );

}


export default AdminVoiceAssistant;