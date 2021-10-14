import React, {useState, createContext, useContext} from 'react';

const MusicContext = createContext();

export const MusicProvider = ({children}) => {

    const [reloadSavedPlaylist, setReloadSavedPlaylist] = useState(false);
    const [lastSearch, setLastSearch] = useState({
        searchDate: null,
        temp: null,
        city: null,
        genre: null,
        tracks: []
    });

    const savePlaylist = async () => {
        let savedPlaylists = localStorage.getItem('@music-wheater/saved-playlists');
        savedPlaylists ? savedPlaylists = JSON.parse(savedPlaylists) : savedPlaylists = [];
        const playlistsData = [...savedPlaylists, lastSearch];
        localStorage.setItem('@music-wheater/saved-playlists', JSON.stringify(playlistsData));
    }

    const removePlaylist = async (playlist) => {
        let savedPlaylists = JSON.parse(localStorage.getItem('@music-wheater/saved-playlists'));
        const playlistIndex = savedPlaylists.findIndex(({searchDate, city, temp}) => (searchDate == playlist.searchDate && city == playlist.city && temp == playlist.temp));  
        savedPlaylists.splice(playlistIndex, 1);
        localStorage.setItem('@music-wheater/saved-playlists', JSON.stringify(savedPlaylists));
        setReloadSavedPlaylist(prevState => !prevState);
    }

    return (
        <MusicContext.Provider value={{lastSearch, setLastSearch, savePlaylist, removePlaylist, reloadSavedPlaylist}}>
            {children}
        </MusicContext.Provider>
    )
}

export const useMusic = () => useContext(MusicContext);