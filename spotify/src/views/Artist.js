import React, { Component } from "react";
import { Link } from 'react-router-dom';
import ArtistList from "../list/ArtistList";
import Pagination from "../Model/PaginationAlbum";

class Artist extends Component {
  state = {
    artists: [],
    currentPage: 1,
    artistsPerPage: 10,
    searchQuery: "",
    filter: "all",
  };

  componentDidMount() {
    fetch("http://localhost:8000/artists")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (Array.isArray(data)) {
          this.setState({ artists: data });
        } else {
          console.error("La réponse de l'API n'est pas un tableau:", data);
        }
      })
      .catch((error) => console.error("Erreur lors du fetch :", error));
  }

  handlePageChange = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  };

  handleSearchChange = (event) => {
    this.setState({ searchQuery: event.target.value, currentPage: 1 });
  };

  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value, currentPage: 1 });
  };

  getFilteredArtists = () => {
    const { artists, searchQuery, filter } = this.state;

    return artists.filter((artist) => {
      const matchesSearch = artist.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesFilter = filter === "all" || artist.type === filter;

      return matchesSearch && matchesFilter;
    });
  };

  render() {
    const { currentPage, artistsPerPage, searchQuery, filter } = this.state;
    const filteredArtists = this.getFilteredArtists();

    const indexOfLastArtist = currentPage * artistsPerPage;
    const indexOfFirstArtist = indexOfLastArtist - artistsPerPage;
    const currentArtists = filteredArtists.slice(
      indexOfFirstArtist,
      indexOfLastArtist
    );

    return (
      <div className="bg-gray-900 text-white min-h-screen">
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

        <main className="container mx-auto py-8 px-4">
          <h1 className="text-3xl font-bold mb-6">Liste des artistes</h1>

          <div className="mb-8 flex flex-col md:flex-row justify-between gap-4">
            <div className="w-full md:w-1/3">
              <label htmlFor="filter" className="block text-gray-400 mb-2">
                Filtrer par type :
              </label>
              <select
                id="filter"
                className="w-full bg-gray-800 text-white p-2 rounded-md"
                value={filter}
                onChange={this.handleFilterChange}
              >
                <option value="all">Tous les types</option>
                <option value="solo">Artiste solo</option>
                <option value="band">Groupe</option>
                <option value="composer">Compositeur</option>
              </select>
            </div>

            <div className="w-full md:w-1/2">
              <label htmlFor="search" className="block text-gray-400 mb-2">
                Rechercher :
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="search"
                  placeholder="Nom de l'artiste..."
                  className="flex-grow bg-gray-800 text-white p-2 rounded-l-md"
                  value={searchQuery}
                  onChange={this.handleSearchChange}
                />
                <button
                  className="bg-blue-600 px-4 py-2 rounded-r-md flex items-center justify-center"
                  onClick={() => console.log("Recherche:", searchQuery)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="mb-4 text-gray-400">
            <p>{filteredArtists.length} artistes trouvés</p>
          </div>

          <ArtistList artists={currentArtists} />

          <Pagination
            albumsPerPage={artistsPerPage}
            totalAlbums={filteredArtists.length}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </main>

        <footer className="bg-black p-6 mt-auto">
          <div className="container mx-auto text-center text-gray-400">
            <p>&copy; 2025 MusiqueApp. Tous droits réservés.</p>
          </div>
        </footer>
      </div>
    );
  }
}

export default Artist;