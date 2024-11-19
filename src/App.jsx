import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home/index.jsx";
import Dashboard from "./components/Dashboard.jsx";
import NotFound from "./pages/NotFound/Index.jsx";
import Login from "./pages/Login/Index.jsx";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar.jsx";
import UserDetail from "./pages/UserDetails/Index.jsx";

const ProtectedRoute = ({ children }) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  // console.log("CurrentUser===", currentUser);

  if (!currentUser || currentUser.islogin !== true) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <Navbar />
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Navbar />
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/userDetail/:id",
    element: (
      <ProtectedRoute>
        <Navbar />
        <UserDetail />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}
