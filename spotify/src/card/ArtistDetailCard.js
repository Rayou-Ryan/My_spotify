import React from "react";

const ArtistDetailList = ({ artist }) => {
  if (!artist) {
    return (
      <div className="flex items-center justify-center h-64 text-lg text-gray-400">
        Chargement des détails de l'artiste...
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-lg max-w-lg mx-auto">
      <div className="flex flex-col items-center text-center">
        <img
          src={artist.photo}
          alt={artist.name}
          className="w-48 h-48 rounded-full object-cover border-4 border-green-500 shadow-lg"
        />
        <h2 className="mt-4 text-3xl font-bold">{artist.name}</h2>
        <p className="mt-2 text-gray-400 text-sm px-4">{artist.bio}</p>
      </div>
    </div>
  );
};

export default ArtistDetailList;
