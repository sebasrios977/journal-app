import { Navigate, createBrowserRouter } from "react-router-dom";
import LoginPage from "../auth/pages/LoginPage";
import RegisterPage from "../auth/pages/RegisterPage";
import JournalPage from "../journal/pages/JournalPage";
import AuthRoutes from "../auth/routes/AuthRoutes";
import JournalRoutes from '../journal/routes/JournalRoutes';

export const appRouter = createBrowserRouter([
  {
    path: 'auth',
    element: <AuthRoutes />,
    children: [
      {
          path: 'login',
          element: <LoginPage />
      }, 
      {
          path: 'register',
          element: <RegisterPage />
      },
      {
          path: '*',
          element: <Navigate to='login' />
      }
    ]
  },
  {
    path: 'journal',
    element: <JournalRoutes />,
    children: [
      {
        path: 'home',
        element: <JournalPage />
      },
      {
        path: '*',
        element: <Navigate to='home' />
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to='auth/login' />
  }
  ]);
