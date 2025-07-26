import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import AlbumDetailList from '../list/AlbumDetailList';

const AlbumDetail = () => {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/albums/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setAlbum(data);
      })
      .catch((error) => console.error("Erreur lors du fetch :", error));
  }, [id]);

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Header */}
      <header className="p-4 bg-black">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">MusiqueApp</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><Link to="/" className="hover:text-blue-400">Accueil</Link></li>
              <li><Link to="/albums" className="hover:text-blue-400">Bibliothèque</Link></li>
              <li><Link to="/artists" className="hover:text-blue-400">Artistes</Link></li>
              <li><Link to="/genres" className="hover:text-blue-400">Genres</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Contenu principal */}
      <div className="p-6">
        <h1 className="text-2xl font-bold">Détails de l'album</h1>
        {album ? <AlbumDetailList album={album} /> : <p>Chargement...</p>}
      </div>
    </div>
  );
};

export default AlbumDetail;
