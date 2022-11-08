import axios from 'axios';

export const data = axios.create({
    baseURL: process.env.DATA_API_LINK || "https://ghibliapi.herokuapp.com",
});

export default data;