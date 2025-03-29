import React from "react";
import { Link } from "react-router-dom";
import picture from "./picture/yamal.png";

function Welcome() {
  return (
    <div className="relative min-h-screen bg-[#060143] text-white">
     
      <h1 className="text-center text-5xl font-bold">Welcome To Master League</h1>

      {/* Image */}
      <div className="flex justify-center mt-12">
        <img
          src={picture}
          alt="Yamal"
          className="w-1/4 h-auto rounded-full shadow-lg border-4 border-white"
        />
      </div>

    
      <div className="text-center mt-16">
        <Link
          to="/register"
          className="bg-gradient-to-r from-[#f12711] to-[#f5af19] text-white py-3 px-8 rounded-lg text-xl font-semibold shadow-lg hover:scale-105 transform transition duration-300"
        >
          START
        </Link>
      </div>
      <h1 className="text-center mt-5 text-5xl font-bold">ปลุกอารมณ์ฟุตบอลในตัวคุณ</h1>
    </div>
  );
}

export default Welcome;
