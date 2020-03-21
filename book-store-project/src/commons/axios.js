import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_DOMAIN ||'http://localhost:3003',
    timeout: 1000,
});

export default instance;