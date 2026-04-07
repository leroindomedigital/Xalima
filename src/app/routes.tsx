import { createBrowserRouter } from 'react-router';
import { Home } from './pages/Home';
import { Formation } from './pages/Formation';
import { CoursUniversitaires } from './pages/CoursUniversitaires';
import { Contact } from './pages/Contact';
import SuggestCourse from './pages/SuggestCourse';
import { EspaceApprentissage } from './pages/EspaceApprentissage';
import { Register } from './pages/Register';
import { AdminDashboard } from './pages/AdminDashboard';
import { Login } from './pages/Login';
import { NotFound } from './pages/NotFound';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'formation', Component: Formation },
      { path: 'cours', Component: CoursUniversitaires },
      { path: 'contact', Component: Contact },
      { path: 'suggerer-cours', Component: SuggestCourse },
      { path: 'dashboard', Component: EspaceApprentissage },
      { 
        path: 'admin', 
        element: <ProtectedRoute><AdminDashboard /></ProtectedRoute> 
      },
      { path: 'login', Component: Login },
      { path: 'register', Component: Register },
      { path: '*', Component: NotFound },
    ],
  },
]);
