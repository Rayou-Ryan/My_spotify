import React from "react";

const AlbumDetailCard = ({ name, photo, bio, date, popularity, tracks }) => {
  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen w-full p-8">
      {/* En-tête album */}
      <div className="flex flex-col md:flex-row items-start md:items-end mb-8">
        <img 
          src={photo} 
          alt={name} 
          className="w-48 h-48 md:w-64 md:h-64 rounded-lg shadow-2xl mb-4 md:mb-0"
        />
        
        <div className="md:ml-8">
          <h2 className="text-4xl font-bold mb-4">{name}</h2>
          <p className="text-gray-400 text-lg mb-2">{bio}</p>
          <div className="flex space-x-4 text-gray-400">
            <p>{date}</p>
            <span>•</span>
            <p>{popularity} ❤️</p>
          </div>
        </div>
      </div>

      {/* Liste des pistes */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold mb-6">Pistes</h3>
        <ul className="space-y-2">
          {tracks.map((track) => (
            <li 
              key={track.id}
              className="group hover:bg-gray-800 rounded-lg p-4 transition-colors duration-200"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{track.name}</p>
                  <p className="text-gray-400 text-sm">
                    {Math.floor(track.duration / 60)}:
                    {(track.duration % 60).toString().padStart(2, '0')}
                  </p>
                </div>
                
                <div className="flex items-center space-x-4">
                  <audio 
                    controls 
                    className="w-32 h-10 group-hover:opacity-100 opacity-70 transition-opacity"
                  >
                    <source src={track.mp3} type="audio/mpeg" />
                  </audio>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AlbumDetailCard;