import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import AuthHeader from "./AuthHeader";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Registration successful. You can now log in.");
      navigate("/login");
    } catch (err) {
      alert("Register failed: " + err.message);
    }
  };

  return (
    <>
      <AuthHeader />

      <section className="w-full flex justify-center mt-10 px-4">
        <div className="w-full max-w-md p-6 bg-white rounded shadow flex flex-col items-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Register</h2>

          <form onSubmit={handleRegister} className="w-full flex flex-col gap-4">
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
              Register
            </button>
          </form>

          <p className="text-sm mt-4 text-gray-600">
            Already have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer underline"
              onClick={() => navigate("/login")}
            >
              Login here
            </span>
          </p>
        </div>
      </section>
    </>
  );
};

export default RegisterForm;
