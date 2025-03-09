import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

const MyClub = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold">Welcome to MyClub</h1>
      <p className="mt-2">Your exclusive football club management area.</p>
      
      <button 
        onClick={logout} 
        className="mt-4 bg-red-500 px-4 py-2 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
};

export default MyClub;
