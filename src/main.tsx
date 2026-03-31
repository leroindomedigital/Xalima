import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";
import { AuthProvider } from "./context/AuthContext.tsx";
import { ErrorBoundary } from "./components/ErrorBoundary.tsx";

const container = document.getElementById("root");

if (container) {
  createRoot(container).render(
    <ErrorBoundary>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ErrorBoundary>
  );
} else {
  console.error("Critical: Could not find root element in index.html");
}