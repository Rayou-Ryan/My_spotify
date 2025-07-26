import React from "react";

const ArtistCard = ({ name, photo }) => {
  return (
    <div className="bg-gray-800 hover:bg-gray-700 transition duration-300 rounded-lg p-4 shadow-lg text-center cursor-pointer">
      <img 
        src={photo} 
        alt={name} 
        className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto object-cover border-4 border-gray-600"
      />
      <h3 className="text-white text-lg font-semibold mt-3 truncate">{name}</h3>
    </div>
  );
};

export default ArtistCard;
