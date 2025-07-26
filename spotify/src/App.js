import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Accueil from './views/accueil';
import AlbumsList from './views/albums-list';
import Artist from './views/Artist'; 
import ArtistDetail from './views/ArtistDetail';
import AlbumDetail from './views/AlbumDetail'; 
import Genres from './views/Genres';
import GenreAlbums from './views/GenreAlbums';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/albums" element={<AlbumsList />} />
          <Route path="/artists" element={<Artist />} />
          <Route path="/artists/:id" element={<ArtistDetail />} />    
          <Route path="/albums/:id" element={<AlbumDetail/>} /> 
          <Route path="/genres" element={<Genres />} />
          <Route path="/genres/:genreId/albums" element={<GenreAlbums />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;