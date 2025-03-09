import { useState } from "react";

const formations = ["4-3-3", "4-4-2", "4-3-2-1"];

const FormationSelector = () => {
  const [selectedFormation, setSelectedFormation] = useState("4-3-3");

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-lg font-bold mb-2">PLAN</h3>
      {formations.map((formation) => (
        <button
          key={formation}
          className={`p-2 rounded bg-yellow-500 my-1 ${
            selectedFormation === formation ? "ring-4 ring-yellow-300" : ""
          }`}
          onClick={() => setSelectedFormation(formation)}
        >
          {formation}
        </button>
      ))}
    </div>
  );
};

export default FormationSelector;
