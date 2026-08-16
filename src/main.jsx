import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { VoiceToolkit } from "vtk-voice-ai-sdk";
import "vtk-voice-ai-sdk/dist/style.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <VoiceToolkit
      appId={import.meta.env.VITE_AIROMOB_APP_ID}
      apiKey={import.meta.env.VITE_AIROMOB_API_KEY}
    >
      <App />
    </VoiceToolkit>
  </StrictMode>
);