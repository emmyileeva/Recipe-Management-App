import axios from 'axios';

const instance = axios.create({
  //baseURL: process.env.REACT_APP_API_BASE_URL,
  baseURL: 'http://emmy-app-demo-dev.us-east-1.elasticbeanstalk.com'
});

export default instance;