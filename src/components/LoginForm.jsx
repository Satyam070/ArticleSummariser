import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import AuthHeader from "./AuthHeader";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful");
      navigate("/");
    } catch (err) {
      alert("Login failed: " + err.message);
    }
  };

  return (
    <>

      <AuthHeader />

      <section className="w-full flex justify-center mt-10 px-4">
        <div className="w-full max-w-md p-6 bg-white rounded shadow flex flex-col items-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Login</h2>

          <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="p-2 border border-gray-300 rounded"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="p-2 border border-gray-300 rounded"
            />
            <button type="submit" className="black_btn w-full">
              Login
            </button>
          </form>

          <p className="text-sm mt-4 text-gray-600">
            Don’t have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer underline"
              onClick={() => navigate("/register")}
            >
              Register here
            </span>
          </p>
        </div>
      </section>
    </>
  );
};

export default LoginForm;
