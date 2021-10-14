import axios from 'axios';

const appid = process.env.WHEATER_APPID;
const wheaterApi = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5',
    params: {
        appid,
        units: 'metric',
    }
});

export const getWheaterByCityName = async (city_name, state, country) => {
    let params = `q=${city_name}`;
    if (state) params += `,${state}`;
    if (country) params += `,${country}`;

    try {
        const response = await wheaterApi.get(`/weather?${params}`);
        return response.data;
    } catch (error){
        throw error.response.data;
    }
}

export const getWheaterByCityId = async (city_id) => {
    let params = `id=${city_id}`;
    try {
        const response = await wheaterApi.get(`/weather?${params}`);
        return response.data;
    } catch (error){
        throw error.response.data;
    }
}

export const getWheaterByGeoCoords = async (lat, long) => {
    let params = `lat=${lat}&lon=${long}`;
    try {
        const response = await wheaterApi.get(`/weather?${params}`);
        return response.data;
    } catch (error){
        throw error.response.data;
    }
}

export const getWheaterByZipCode = async (zipcode, uf) => {
    let params = `zip=${zipcode}`;
    if (uf) params += `,${uf}`;
    try {
        const response = await wheaterApi.get(`/weather?${params}`);
        return response.data;
    } catch (error){
        throw error.response.data;
    }
}