import {
  VoiceAIButton,
} from "vtk-voice-ai-sdk";

import {
  createAdminTools,
} from "../../agents/adminAgent/tools";

import {
  adminAgentContext,
} from "../../agents/adminAgent/context";


function AdminVoiceAssistant({ onToolResult }) {

  const adminTools =
    createAdminTools({
      onResult:
        onToolResult,
    });


  return (

    <VoiceAIButton

      buttonType="pill"

      title="PakShop AI Analyst"

      initialContext={
        adminAgentContext
      }

      tools={
        adminTools
      }

    />

  );

}


export default AdminVoiceAssistant;