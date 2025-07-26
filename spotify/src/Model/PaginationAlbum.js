import React from "react";

const Pagination = ({ albumsPerPage, totalAlbums, currentPage, onPageChange }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalAlbums / albumsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className="bg-gray-900 p-4 w-full">
            <ul className="flex flex-wrap justify-center gap-2">
                <li>
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-3 py-1 rounded-full ${
                            currentPage === 1 
                            ? 'opacity-50 cursor-not-allowed' 
                            : 'hover:bg-gray-700'
                        } transition-colors`}
                    >
                        ←
                    </button>
                </li>
                
                {pageNumbers.map((number) => (
                    <li key={number}>
                        <button
                            onClick={() => onPageChange(number)}
                            className={`min-w-8 h-8 px-2 rounded-full flex items-center justify-center ${
                                currentPage === number 
                                ? 'bg-green-500 text-black font-bold' 
                                : 'text-white hover:bg-gray-700'
                            } transition-colors`}
                        >
                            {number}
                        </button>
                    </li>
                ))}

                <li>
                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === pageNumbers.length}
                        className={`px-3 py-1 rounded-full ${
                            currentPage === pageNumbers.length 
                            ? 'opacity-50 cursor-not-allowed' 
                            : 'hover:bg-gray-700'
                        } transition-colors`}
                    >
                        →
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;