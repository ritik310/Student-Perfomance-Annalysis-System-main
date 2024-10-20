import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:5003/api',//OUR PROJECT API
  headers: {
    'Content-Type': 'application/json',
  },
});
