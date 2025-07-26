import React from "react";
import { Link } from 'react-router-dom';

const GenreList = ({ genres }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {genres.map((genre) => (
        <Link key={genre.id} to={`/genres/${genre.id}/albums`} className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition duration-300">
          <h2 className="text-xl font-bold">{genre.name}</h2>
          <p className="text-gray-400">{genre.description}</p>
        </Link>
      ))}
    </div>
  );
};

export default GenreList;