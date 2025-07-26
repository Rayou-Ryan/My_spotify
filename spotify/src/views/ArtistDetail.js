import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ArtistDetailList from '../list/ArtistDetailList';

const ArtistDetail = () => {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [albums, setAlbums] = useState([]); // État distinct pour les albums

  useEffect(() => {
    // Récupérer les détails de l'artiste
    fetch(`http://localhost:8000/artists/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setArtist(data);
      })
      .catch((error) => console.error("Erreur lors du fetch de l'artiste :", error));

    // Récupérer les albums de l'artiste
    fetch(`http://localhost:8000/albums?artist_id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setAlbums(data);
        } else {
          console.error("La réponse de l'API pour les albums n'est pas un tableau:", data);
        }
      })
      .catch((error) => console.error("Erreur lors du fetch des albums :", error));
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
              <li><Link to="/test" className="hover:text-blue-400">Genres</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <div>
        <h1>Détails de l'Artiste</h1>
        <ArtistDetailList artist={artist} albums={albums} />
      </div>
    </div>
  );
};

export default ArtistDetail;