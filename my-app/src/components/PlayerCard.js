const PlayerCard = ({ position, name, rating }) => {
  return (
    <div className="w-20 h-28 bg-blue-900 text-white flex flex-col justify-center items-center rounded-lg">
      <span className="text-sm font-bold">{position || "?"}</span>
      <span className="text-lg">{name || "Unknown"}</span>
      <span className="text-sm">⭐ {rating || "-"}</span>
    </div>
  );
};

export default PlayerCard;
