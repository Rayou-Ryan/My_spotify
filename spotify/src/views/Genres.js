import React, { Component } from "react";
import { Link } from 'react-router-dom';
import GenreList from "../list/GenreList";

class Genre extends Component {
  state = {
    genres: [],
    currentPage: 1,
    genresPerPage: 10,
    searchQuery: "",
  };

  componentDidMount() {
    fetch("http://localhost:8000/genres")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (Array.isArray(data)) {
          this.setState({ genres: data });
        } else {
          console.error("La réponse de l'API n'est pas un tableau:", data);
        }
      })
      .catch((error) => console.error("Erreur lors du fetch :", error));
  }

  // Gestion du changement de page
  handlePageChange = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  };

  // Gestion du changement de la recherche
  handleSearchChange = (event) => {
    this.setState({ searchQuery: event.target.value, currentPage: 1 }); // Réinitialiser la page à 1 lors d'une nouvelle recherche
  };

  // Fonction pour filtrer et rechercher les genres
  getFilteredGenres = () => {
    const { genres, searchQuery } = this.state;

    return genres.filter((genre) => {
      // Filtre par recherche (nom du genre)
      return genre.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    });
  };

  render() {
    const { currentPage, genresPerPage, searchQuery } = this.state;

    // Obtenir la liste filtrée des genres
    const filteredGenres = this.getFilteredGenres();

    // Application de la pagination
    const indexOfLastGenre = currentPage * genresPerPage;
    const indexOfFirstGenre = indexOfLastGenre - genresPerPage;
    const currentGenres = filteredGenres.slice(
      indexOfFirstGenre,
      indexOfLastGenre
    );

    // Calcul du nombre total de pages
    const totalPages = Math.ceil(filteredGenres.length / genresPerPage);

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

        {/* Main Content */}
        <main className="container mx-auto py-8 px-4">
          <h1 className="text-3xl font-bold mb-6">Liste des genres</h1>

          {/* Barre de recherche */}
          <div className="mb-8 flex flex-col md:flex-row justify-between gap-4">
            <div className="w-full md:w-1/2">
              <label htmlFor="search" className="block text-gray-400 mb-2">
                Rechercher :
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="search"
                  placeholder="Nom du genre..."
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

          {/* Indicateur de résultats */}
          <div className="mb-4 text-gray-400">
            <p>{filteredGenres.length} genres trouvés</p>
          </div>

          {/* Liste des genres */}
          <GenreList genres={currentGenres} />

          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <nav className="flex items-center">
              <button
                onClick={() => this.handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="mx-1 px-3 py-2 rounded-md bg-gray-800 hover:bg-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => this.handlePageChange(index + 1)}
                  className={`mx-1 px-3 py-2 rounded-md ${
                    currentPage === index + 1
                      ? "bg-blue-600"
                      : "bg-gray-800 hover:bg-gray-700"
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() => this.handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="mx-1 px-3 py-2 rounded-md bg-gray-800 hover:bg-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </nav>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-black p-6 mt-auto">
          <div className="container mx-auto text-center text-gray-400">
            <p>&copy; 2025 MusiqueApp. Tous droits réservés.</p>
          </div>
        </footer>
      </div>
    );
  }
}

export default Genre;