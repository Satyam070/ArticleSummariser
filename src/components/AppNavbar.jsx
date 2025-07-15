import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { logo } from "../assets";

const AppNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const uid = auth.currentUser?.uid;
    await signOut(auth);
    if (uid) localStorage.removeItem(`bookmarks_${uid}`);
    navigate("/login");
  };

  return (
    <nav className="w-full flex items-center justify-between p-4 border-b border-gray-200 relative">
      {/* Logo only */}
      <Link to="/">
        <img src={logo} alt='sumz_logo' className='w-28 object-contain' />
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-4">
        <Link to="/" className="text-gray-700 hover:text-black font-medium">
          Home
        </Link>
        <Link to="/dashboard" className="text-gray-700 hover:text-black font-medium">
          Dashboard
        </Link>
        <button
          onClick={() => window.open("https://github.com/Satyam070", "_blank")}
          className="black_btn"
        >
          GitHub
        </button>
        <button onClick={handleLogout} className="black_btn">
          Logout
        </button>
      </div>

      {/* Mobile Hamburger Icon */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-700 text-2xl focus:outline-none"
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-16 right-4 bg-white border shadow-md rounded-md flex flex-col p-4 gap-3 z-50 md:hidden w-40">
          <Link to="/" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-black">
            Home
          </Link>
          <Link to="/dashboard" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-black">
            Dashboard
          </Link>
          <button
            onClick={() => {
              setIsOpen(false);
              window.open("https://github.com/Satyam070", "_blank");
            }}
            className="black_btn"
          >
            GitHub
          </button>
          <button onClick={handleLogout} className="black_btn">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default AppNavbar;
