import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import AlbumCard from "../card/AlbumCard";

const AlbumList = ({ albums }) => {
  const [artistNames, setArtistNames] = useState({});

  useEffect(() => {
    const fetchArtistNames = async () => {
      const artistNamesMap = {};

      for (const album of albums) {
        const response = await fetch(`http://localhost:8000/artists/${album.artist_id}`);
        const artistData = await response.json();
        artistNamesMap[album.artist_id] = artistData.name;
      }

      setArtistNames(artistNamesMap);
    };

    fetchArtistNames();
  }, [albums]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 w-full gap-4 p-4">
      {albums.map((album, index) => (
        <Link 
          key={index} 
          to={`/albums/${album.id}`}
          className="w-full transform transition-transform duration-300 hover:scale-105"
        >
          <AlbumCard
            name={album.name}
            photo={album.cover_small}
            artist={artistNames[album.artist_id]}
          />
        </Link>
      ))}
    </div>
  );
};

export default AlbumList;