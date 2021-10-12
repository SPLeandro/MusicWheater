import React, {useState, createContext, useContext} from 'react';

const MusicContext = createContext();

export const MusicProvider = ({children}) => {

    const [playlist, setPlaylist] = useState([]);

    return (
        <MusicContext.Provider value={{playlist, setPlaylist}}>
            {children}
        </MusicContext.Provider>
    )
}

export const useMusic = () => useContext(MusicContext);