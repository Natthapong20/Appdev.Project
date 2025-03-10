const FormationSelector = ({ formation, setFormation }) => {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-white font-bold text-lg">PLAN</h3>
      {["4-3-3", "4-4-2", "4-3-2-1"].map((plan) => (
        <button
          key={plan}
          className={`py-1 px-4 rounded bg-yellow-500 text-black font-bold ${
            formation === plan ? "ring-4 ring-yellow-300" : ""
          }`}
          onClick={() => setFormation(plan)} // ✅ เมื่อกดเปลี่ยนแผน
        >
          {plan}
        </button>
      ))}
    </div>
  );
};

export default FormationSelector;
