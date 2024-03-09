import axios from 'axios';

export default axios.create({
    baseURL: 'https://movies-api-db-spring-1.onrender.com/',
    headers: {"skip-browser-warning" : "true"}
})