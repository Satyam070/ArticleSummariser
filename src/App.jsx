import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import Demo from "./components/Demo";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import BookmarkDashboard from "./components/BookmarkDashboard";
import AppNavbar from "./components/AppNavbar";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

import { useContext } from "react";
import { AuthContext } from "./context/AuthProvider";

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      {user && <AppNavbar />}

      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <>
                <Hero />
                <Demo />
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <BookmarkDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginForm />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterForm />
            </PublicRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
