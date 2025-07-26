import React, { Component } from "react";
import AlbumList from "../list/AlbumList";
import Pagination from "../Model/PaginationAlbum";
import { Link } from 'react-router-dom';


class AlbumsList extends Component {
  state = {
    albums: [],
    currentPage: 1,
    albumsPerPage: 10,
  };

  componentDidMount() {
    fetch("http://localhost:8000/albums")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          this.setState({ albums: data });
        } else {
          console.error("La réponse de l'API n'est pas un tableau:", data);
        }
      })
      .catch((error) => console.error("Erreur lors du fetch :", error));
  }

  handlePageChange = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  };

  render() {
    const { albums, currentPage, albumsPerPage } = this.state;
    if (!Array.isArray(albums)) {
      console.error("albums n'est pas un tableau:", albums);
      return <div>Erreur : les données des albums ne sont pas valides.</div>;
    }

    // Application de la pagination
    const indexOfLastAlbum = currentPage * albumsPerPage;
    const indexOfFirstAlbum = indexOfLastAlbum - albumsPerPage;
    const currentAlbums = albums.slice(indexOfFirstAlbum, indexOfLastAlbum);

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
      <div>
        <section class="py-12 px-4">
          <div class="container mx-auto text-center">
            <h1 class="text-4xl font-bold mb-4">Voici les albums !</h1>
          </div>
        </section>
        <AlbumList albums={currentAlbums} />
        <Pagination
          albumsPerPage={albumsPerPage}
          totalAlbums={albums.length}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </div>
      </div>
    );
  }
}

export default AlbumsList;
