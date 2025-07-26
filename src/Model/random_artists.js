import React, { Component } from "react";
import ArtistList from "../list/ArtistList";

//View de la liste des artistes sur la page d'accueil, sortie random
class ArtistRandom extends Component {
    //Randomizer des artistes
  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) { //Prend les artistes depuis la fin jusqu'à ce qu'à arriver au premier (Toujours être au dessus de 0)
      const j = Math.floor(Math.random() * (i + 1)); //Math.random randomize les artistes, Math.floor arrondit vers le nombre entier inferieur
      [array[i], array[j]] = [array[j], array[i]]; //Echange les artistes
    }
    return array;
  }

  state = {
    artists: [],
    currentPage: 1,
    artistsPerPage: 10,
  };

  componentDidMount() {
    fetch("http://localhost:8000/artists")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const shuffledData = this.shuffleArray(data);
          this.setState({ artists: shuffledData });
        } else {
          console.error("La réponse de l'API n'est pas un tableau:", data);
        }
      })
      .catch((error) => console.error("Erreur lors du fetch :", error));
  }

  render() {
    const { artists, currentPage, artistsPerPage } = this.state;
    const indexOfLastArtist = currentPage * artistsPerPage;
    const indexOfFirstArtist = indexOfLastArtist - artistsPerPage;
    const currentArtists = artists.slice(indexOfFirstArtist, indexOfLastArtist);

    return (
      <div>
        <ArtistList artists={currentArtists} />
      </div>
    );
  }
}

//Il suffira de faire appel à ArtistRandom dans la vue Accueil pour afficher les artistes aléatoires
export default ArtistRandom;