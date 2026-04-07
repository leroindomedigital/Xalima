import { createRoot } from "react-dom/client";
import App from "./app/App";
import "./styles/index.css";
import { AuthProvider } from "./context/AuthContext";
import { HelmetProvider } from 'react-helmet-async';
import { ErrorBoundary } from "./components/ErrorBoundary";

const container = document.getElementById("root");

if (container) {
  try {
    createRoot(container).render(
      <ErrorBoundary>
        <HelmetProvider>
           <AuthProvider>
             <App />
           </AuthProvider>
        </HelmetProvider>
      </ErrorBoundary>
    );
  } catch (err) {
    console.error("React failed to render:", err);
  }
} else {
  console.error("Critical: Could not find root element in index.html");
}