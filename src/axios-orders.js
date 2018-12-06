import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-marleins-burger.firebaseio.com/'
})

export default instance;