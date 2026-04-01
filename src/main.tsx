import { createRoot } from "react-dom/client";
import App from "./app/App";
import "./styles/index.css";
import { AuthProvider } from "./context/AuthContext";
import { ErrorBoundary } from "./components/ErrorBoundary";

console.log("XALIMA: Initialisation du site...");
const rootElement = document.getElementById("root");
if (rootElement) rootElement.innerHTML = "<div style='color:white; padding:20px;'>Chargement de la plateforme...</div>";

// --- GESTION DES ERREURS D'URGENCE ---
window.onerror = function(message, source, lineno, colno, error) {
  const root = document.getElementById("root");
  if (root) {
    root.innerHTML = `
      <div style="background: #111; color: #ff5555; padding: 30px; font-family: monospace; border: 2px solid #333; margin: 20px; border-radius: 10px;">
        <h2 style="margin-top: 0;">❌ Erreur détectée sur Xalima</h2>
        <p><strong>Message :</strong> ${message}</p>
        <p><strong>Source :</strong> ${source?.toString().split('/').pop()}:${lineno}:${colno}</p>
        ${error ? `<pre style="background: #222; padding: 10px; font-size: 12px; color: #aaa;">${error.stack}</pre>` : ''}
        <button onclick="window.location.reload()" style="background: #444; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin-top: 10px;">Réessayer</button>
      </div>
    `;
  }
};
// ------------------------------------

// --- TEST CRITIQUE DES VARIABLES ---
const rawUrl = import.meta.env.VITE_SUPABASE_URL;
if (!rawUrl || !rawUrl.startsWith('http')) {
  console.error("❌ ERREUR PRODUCTION : La variable VITE_SUPABASE_URL est manquante ou invalide sur Vercel !");
  console.log("Valeur détectée (tronquée) :", rawUrl ? rawUrl.substring(0, 5) + "..." : "RIEN");
} else {
  console.log("✅ VITE_SUPABASE_URL détectée.");
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