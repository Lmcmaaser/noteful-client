export default {
  // API_ENDPOINT: 'http://localhost:9090'
  API_ENDPOINT: process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000/api',
  API_TOKEN: process.env.REACT_APP_API_TOKEN
};
