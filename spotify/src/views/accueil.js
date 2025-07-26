import React from 'react';
import { Link } from 'react-router-dom';
import AlbumRandom from '../Model/random_album';
import ArtistRandom from '../Model/random_artists';

function Accueil() {
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

      {/* Hero Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Découvrez de la musique incroyable</h2>
          <p className="text-xl mb-8 text-gray-300">Explorez notre collection d'albums et d'artistes soigneusement sélectionnés</p>
        </div>
      </section>

      {/* Section Albums aléatoires */}
      <AlbumRandom>
        {(albums) => (
          <section className="py-8 px-4 mb-12">
            <div className="container mx-auto">
              <h3 className="text-2xl font-bold mb-6">Albums populaires</h3>
              
              {albums.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {albums.map((album, index) => (
                    <div key={index} className="bg-gray-800 p-4 rounded-lg text-center hover:bg-gray-700 transition-colors">
                      <img
                        src={album.cover}
                        alt={`Couverture de ${album.title}`}
                        className="w-full aspect-square object-cover mx-auto mb-3 rounded"
                      />
                      <h4 className="text-lg font-semibold truncate">{album.title}</h4>
                      <p className="text-sm text-gray-400 truncate">{album.artist}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}
      </AlbumRandom>

      {/* Section Artistes aléatoires */}
      <ArtistRandom>
        {(artists) => (
          <section className="py-8 px-4 mb-12">
            <div className="container mx-auto">
              <h3 className="text-2xl font-bold mb-6">Artistes populaires</h3>

              {artists.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {artists.map((artist, index) => (
                    <div key={index} className="bg-gray-800 p-4 rounded-lg text-center hover:bg-gray-700 transition-colors">
                      <img
                        src={artist.photo}
                        alt={`Photo de ${artist.name}`}
                        className="w-full aspect-square object-cover mx-auto mb-3 rounded-full"
                      />
                      <h4 className="text-lg font-semibold truncate">{artist.name}</h4>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}
      </ArtistRandom>

      {/* Footer */}
      <footer className="bg-black p-6 mt-auto">
        <div className="container mx-auto text-center text-gray-400">
          <p>&copy; 2025 MusiqueApp. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}

export default Accueil;