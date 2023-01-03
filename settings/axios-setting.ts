import axios from 'axios';

const axiosSetting = () => {
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
  axios.defaults.headers.common['Authorization'] = `Token ${process.env.NEXT_PUBLIC_API_TOKEN}`;
  axios.defaults.headers.common['Content-Type'] = 'application/json';
};

export default axiosSetting;
