import React from "react";
import { Link } from 'react-router-dom';
import ArtistCard from "../card/ArtistCard";

const ArtistList = ({ artists }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 w-full gap-4 p-4">
      {artists.map((artist, index) => (
        <Link key={index} to={`/artists/${artist.id}`}>
          <ArtistCard
            name={artist.name}
            photo={artist.photo}
          />
        </Link>
      ))}
    </div>
  );
};

export default ArtistList;