import { createBrowserRouter } from "react-router-dom";
import NotFoundPage from "../pages/NotFoundPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage";
import HomePage from "../pages/HomePage";

const route = createBrowserRouter([
  {
    path: "*",
    element: <NotFoundPage />,
  },
  // auth route start
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/reset-password",
    element: <ResetPasswordPage />,
  },
  // auth route end
  {
    path: "/",
    // element: <PrivateRoute>{<Main />}</PrivateRoute>,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
]);

export default route;
