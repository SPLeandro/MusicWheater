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
        try{
            let savedPlaylists = localStorage.getItem('@music-wheater/saved-playlists');
            savedPlaylists ? savedPlaylists = JSON.parse(savedPlaylists) : savedPlaylists = [];
            const playlistsData = [...savedPlaylists, lastSearch];
            localStorage.setItem('@music-wheater/saved-playlists', JSON.stringify(playlistsData));
        } catch (error){
            throw error;
        }
    }

    const removePlaylist = async (playlist) => {
        try{
            let savedPlaylists = JSON.parse(localStorage.getItem('@music-wheater/saved-playlists'));
            const playlistIndex = savedPlaylists.findIndex(({searchDate, city, temp}) => (searchDate == playlist.searchDate && city == playlist.city && temp == playlist.temp));  
            if(playlistIndex == -1) throw { cod: 404, message: 'Playlist not exists or already been deleted'};
            savedPlaylists.splice(playlistIndex, 1);
            localStorage.setItem('@music-wheater/saved-playlists', JSON.stringify(savedPlaylists));
            setReloadSavedPlaylist(prevState => !prevState);
        } catch (error){
            throw error;
        }
    }

    return (
        <MusicContext.Provider value={{lastSearch, setLastSearch, savePlaylist, removePlaylist, reloadSavedPlaylist}}>
            {children}
        </MusicContext.Provider>
    )
}

export const useMusic = () => useContext(MusicContext);