import React, {useState, createContext, useContext, useEffect} from 'react';

const MusicContext = createContext();

export const MusicProvider = ({children}) => {

    const [lastSearch, setLastSearch] = useState({
        searchDate: null,
        temp: null,
        city: null,
        genre: null,
        tracks: []
    });

    const handleSavePlaylist = async () => {
        let savedPlaylists = localStorage.getItem('@music-wheater/saved-playlists');
        savedPlaylists ? savedPlaylists = JSON.parse(savedPlaylists) : savedPlaylists = [];
        const playlistsData = [...savedPlaylists, lastSearch];
        localStorage.setItem('@music-wheater/saved-playlists', JSON.stringify(playlistsData));
    }

    return (
        <MusicContext.Provider value={{lastSearch, setLastSearch, handleSavePlaylist}}>
            {children}
        </MusicContext.Provider>
    )
}

export const useMusic = () => useContext(MusicContext);