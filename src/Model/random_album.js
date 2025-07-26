import React, { Component } from "react";
import AlbumList from "../list/AlbumList";

//View de la liste des albums sur la page d'accueil, sortie random
class AlbumRandom extends Component {
    //Randomizer des albums
  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) { //Prend les albums depuis la fin jusqu'à ce qu'à arriver au premier (Toujours être au dessus de 0)
      const j = Math.floor(Math.random() * (i + 1)); //Math.random randomize les albums, Math.floor arrondit vers le nombre entier inferieur
      [array[i], array[j]] = [array[j], array[i]]; //Echange les albums
    }
    return array;
  }

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
          const shuffledData = this.shuffleArray(data);
          this.setState({ albums: shuffledData });
        } else {
          console.error("La réponse de l'API n'est pas un tableau:", data);
        }
      })
      .catch((error) => console.error("Erreur lors du fetch :", error));
  }

  render() {
    const { albums, currentPage, albumsPerPage } = this.state;
    const indexOfLastAlbum = currentPage * albumsPerPage;
    const indexOfFirstAlbum = indexOfLastAlbum - albumsPerPage;
    const currentAlbums = albums.slice(indexOfFirstAlbum, indexOfLastAlbum);

    return (
      <div>
        <AlbumList albums={currentAlbums} />
      </div>
    );
  }
}

//Il suffira de faire appel à AlbumRandom dans la vue Accueil pour afficher les albums aléatoires
export default AlbumRandom;