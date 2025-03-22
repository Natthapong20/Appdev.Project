// PlayerSelectModal.jsx
import React from 'react';

const PlayerSelectModal = ({ players, onSelect, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4 text-center">เลือกนักเตะใส่สนาม</h2>
        <div className="grid grid-cols-2 gap-4 max-h-60 overflow-y-auto">
          {players.map((player) => (
            <div
              key={player._id}
              className="p-2 border rounded hover:bg-gray-200 cursor-pointer"
              onClick={() => onSelect(player)}
            >
              <img src={player.image_url} alt={player.PlayerName} className="w-full h-24 object-cover rounded" />
              <p className="text-center mt-1">{player.PlayerName}</p>
            </div>
          ))}
        </div>
        <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded w-full" onClick={onClose}>ปิด</button>
      </div>
    </div>
  );
};

export default PlayerSelectModal;
