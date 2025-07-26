import React from "react";
import AlbumDetailCard from "../card/AlbumDetailCard";

const AlbumDetailList = ({ album }) => {
  if (!album) {
    return <div>Chargement des détails de l'album...</div>;
  }

  return (
    <div>
      <AlbumDetailCard
        name={album.album.name}
        photo={album.album.cover}
        bio={album.album.description}
        date={new Date(album.album.release_date * 1000).toLocaleDateString()}
        popularity={album.album.popularity}
        tracks={album.tracks}
      />
    </div>
  );
};

export default AlbumDetailList;