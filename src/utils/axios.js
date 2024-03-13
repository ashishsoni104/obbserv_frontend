import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080/api/',
    // timeout: 10000, // Timeout of 10 seconds
    headers: {
        'Content-Type': 'application/json',
        // Add any other headers if needed
    }
});

export default instance;
