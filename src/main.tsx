import { createRoot } from "react-dom/client";
import App from "./app/App";
import "./styles/index.css";
import { AuthProvider } from "./context/AuthContext";
import { ErrorBoundary } from "./components/ErrorBoundary";

// --- TEST VISUEL CRITIQUE DES CLÉS VERCEL ---
if (!import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL.includes('placeholder')) {
  const div = document.createElement('div');
  div.style.cssText = "position:fixed; top:0; z-index:9999; background:red; color:white; width:100%; padding:10px; text-align:center; font-weight:bold;";
  div.innerText = "⚠️ VARIABLES VERCEL MANQUANTES : Allez dans les réglages Vercel -> Env Variables et REDEPLOYEZ le projet.";
  document.body.prepend(div);
}

const container = document.getElementById("root");

if (container) {
  try {
    createRoot(container).render(
      <ErrorBoundary>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ErrorBoundary>
    );
  } catch (err) {
    console.error("React failed to render:", err);
  }
} else {
  console.error("Critical: Could not find root element in index.html");
}