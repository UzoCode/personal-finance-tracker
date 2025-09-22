import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow px-6 py-3 flex justify-between items-center">
      {/* App Title */}
      <h1 className="text-xl font-bold text-gray-800">ReadIn</h1>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {user && (
          <span className="text-gray-700 font-medium">
            👋 {user.name || "User"}
          </span>
        )}

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
