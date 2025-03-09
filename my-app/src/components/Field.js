import React, { useState } from "react";

const formations = {
  "4-3-3": [
    ["ST"],
    ["LW", "RW"],
    ["CM", "CM", "CM"],
    ["LB", "CB", "CB", "RB"],
    ["GK"],
  ],
  "4-4-2": [
    ["ST", "ST"],
    ["LM", "CM", "CM", "RM"],
    ["LB", "CB", "CB", "RB"],
    ["GK"],
  ],
  "4-3-2-1": [
    ["ST"],
    ["CF", "CF"],
    ["CM", "CM", "CM"],
    ["LB", "CB", "CB", "RB"],
    ["GK"],
  ],
};

const Field = () => {
  const [formation, setFormation] = useState("4-3-3");

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar ซ้าย */}
      <div className="w-1/6 bg-purple-900 p-4 flex flex-col gap-4">
        <button className="bg-yellow-500 p-2 rounded">MYCLUB</button>
        <button className="text-gray-300">MARKET</button>
        <button className="text-gray-300">COMPARE</button>
      </div>

      {/* สนามฟุตบอล */}
      <div className="flex-grow flex justify-center items-center">
        <div className="relative bg-green-600 w-[600px] h-[800px] p-6 rounded-lg flex flex-col items-center justify-evenly">
          {formations[formation].map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center gap-2">
              {row.map((position, index) => (
                <div
                  key={index}
                  className="w-20 h-28 bg-purple-700 flex flex-col items-center justify-center rounded-lg shadow-lg"
                >
                  <span className="text-sm font-bold">{position}</span>
                  <span className="text-xl">+</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar ขวา */}
      <div className="w-1/6 bg-purple-900 p-4 flex flex-col items-center gap-4">
        <div className="w-20 h-20 bg-gray-700 rounded-full"></div>
        <span>Username</span>
        <h3 className="font-bold">PLAN</h3>
        {Object.keys(formations).map((plan) => (
          <button
            key={plan}
            className={`p-2 rounded bg-yellow-500 ${
              formation === plan ? "ring-4 ring-yellow-300" : ""
            }`}
            onClick={() => setFormation(plan)}
          >
            {plan}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Field;
