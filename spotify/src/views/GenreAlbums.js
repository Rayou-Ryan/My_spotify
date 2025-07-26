import React, { Component } from "react";
import { useParams, Link } from "react-router-dom"; // Import Link here

class GenreAlbums extends Component {
  state = {
    albums: [],
    genreName: "",
  };

  componentDidMount() {
    const { genreId } = this.props.params;

    // Fetch genre details
    fetch(`http://localhost:8000/genres/${genreId}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ genreName: data.name });
      })
      .catch((error) => console.error("Erreur lors du fetch du genre :", error));

    // Fetch albums pour le genre
    fetch(`http://localhost:8000/genres/${genreId}/albums`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          this.setState({ albums: data });
        } else {
          console.error("La réponse de l'API n'est pas un tableau:", data);
        }
      })
      .catch((error) => console.error("Erreur lors du fetch des albums :", error));
  }

  render() {
    const { albums, genreName } = this.state;

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
          <h1 className="text-3xl font-bold mb-6">Albums du genre : {genreName}</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {albums.map((album) => (
              <div key={album.id} className="bg-gray-800 p-4 rounded-lg">
                <h2 className="text-xl font-bold">{album.title}</h2>
                <p className="text-gray-400">{album.artist}</p>
              </div>
            ))}
          </div>
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

// Wrapper pour utiliser useParams dans un composant de classe
const GenreAlbumsWrapper = () => {
  const params = useParams();
  return <GenreAlbums params={params} />;
};

export default GenreAlbumsWrapper;