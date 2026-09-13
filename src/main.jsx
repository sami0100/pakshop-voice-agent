import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


import App from "./App.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";


import "./index.css";


import {
  VoiceToolkit,
} from "vtk-voice-ai-sdk";

import "vtk-voice-ai-sdk/dist/style.css";



createRoot(
  document.getElementById("root")
).render(

  <StrictMode>

    <VoiceToolkit

      appId={
        import.meta.env.VITE_AIROMOB_APP_ID
      }

      apiKey={
        import.meta.env.VITE_AIROMOB_API_KEY
      }

    >


      <BrowserRouter>

        <Routes>


          {/* Customer Store */}

          <Route

            path="/"

            element={
              <App />
            }

          />



          {/* Admin Dashboard */}

          <Route

            path="/admin"

            element={
              <AdminDashboard />
            }

          />


        </Routes>

      </BrowserRouter>


    </VoiceToolkit>


  </StrictMode>

);