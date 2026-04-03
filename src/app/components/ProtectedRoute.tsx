import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../../context/AuthContext';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  // Bypass de sécurité pour accéder directement au dashboard sans Auth/Mot de passe
  return <>{children}</>;

  return <>{children}</>;
}
