import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { logo } from "../assets";

const AppNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const uid = auth.currentUser?.uid;
      await signOut(auth);
      if (uid) localStorage.removeItem(`bookmarks_${uid}`);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <nav className="flex justify-between items-center w-full mb-10 pt-3 px-5">
      {/* Left side: logo and links */}
      <div className="flex items-center gap-6">
        <img src={logo} alt="sumz_logo" className="w-28 object-contain" />
        <Link to="/" className="text-gray-700 hover:text-black font-semibold">Home</Link>
        <Link to="/dashboard" className="text-gray-700 hover:text-black font-semibold">Dashboard</Link>
      </div>

      {/* Right side: GitHub + Logout */}
      <div className="flex gap-4 items-center">
        <button
          type="button"
          onClick={() => window.open("https://github.com/Satyam070", "_blank")}
          className="black_btn"
        >
          GitHub
        </button>
        <button onClick={handleLogout} className="black_btn">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AppNavbar;
