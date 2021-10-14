import axios from 'axios';

const x_rapidapi_key = process.env.MUSIC_RAPIDAPI_KEY;
const musicApi = axios.create({
    baseURL: 'https://shazam.p.rapidapi.com/charts',
    params: {
        offset: '0', 
        limit: '20'
    },
    headers: {
        'x-rapidapi-host': 'shazam.p.rapidapi.com',
        'x-rapidapi-key': x_rapidapi_key,
    }
});

export const searchPlaylists = async (temp) => {
    let genre, genreId;
    if (temp >= 32) {
        genre = 'Rock';
        genreId = 'genre-global-chart-7' ;
    }
    if (temp >= 24 && temp < 32) {
        genre = 'Pop';
        genreId = 'genre-global-chart-1';
    }
    if (temp >= 16 && temp < 24) {
        genre = 'Classic';
        genreId = 'genre-global-chart-10';
    }
    if (temp < 16) {
        genre = 'Lofi';
        genreId = 'genre-global-chart-2';
    }

    try {
        const response = await musicApi.get(`/track?listId=${genreId}`);
        const tracks = response.data.tracks?.map(track => { return {key: track.key, title: track.title, subtitle: track.subtitle, url: track.url, images: track.images}})
        return { genre, tracks };
    } catch (error){
        throw {cod: error.response.status, message: error.response.data};
    }
}