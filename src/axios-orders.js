import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://udemy-burger-d490e.firebaseio.com/',
});

export default instance;
