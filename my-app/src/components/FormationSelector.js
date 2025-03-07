const FormationSelector = () => {
    return (
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold mb-2">PLAN</h2>
        {["4-3-3", "4-4-2", "4-3-2-1"].map((formation) => (
          <button key={formation} className="w-28 bg-yellow-500 text-black py-3 rounded-lg text-lg font-bold">
            {formation}
          </button>
        ))}
      </div>
    );
  };
  
  export default FormationSelector;
  