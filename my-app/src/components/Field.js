import PlayerCard from "./PlayerCard";

const formations = {
  "4-3-3": ["GK", "LB", "CB", "CB", "RB", "CM", "CM", "CAM", "LW", "ST", "RW"],
  "4-4-2": ["GK", "LB", "CB", "CB", "RB", "LM", "CM", "CM", "RM", "ST", "ST"],
  "4-3-2-1": ["GK", "LB", "CB", "CB", "RB", "CM", "CM", "CM", "LF", "CF", "RF"],
};

const Field = ({ formation = "4-3-3" }) => {
  const positions = formations[formation];

  return (
    <div className="bg-green-600 p-6 rounded-lg w-[500px] h-[700px] flex flex-col items-center relative">
      <h2 className="text-white text-xl font-bold mb-2">MYCLUB_MAIN</h2>
      <div className="grid grid-rows-5 grid-cols-3 gap-4 w-full h-full place-items-center">
        {positions.map((pos, index) => (
          <PlayerCard key={index} position={pos} />
        ))}
      </div>
    </div>
  );
};

export default Field;
