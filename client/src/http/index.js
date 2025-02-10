import axios from "axios";

const $authHost  = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});
const $host  = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

$authHost.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});
$authHost.interceptors.request.use(
  (config) => {
    return config;
  },
 async (error) => {
  const originalRequests = error.config;
    if (error.response.status=== 401){
      try{
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/user/refresh`, {withCredentials: true})
      localStorage.setItem('token', response.data.accessToken)
     return $authHost.request(originalRequests);
      } catch(e){
        console.error('Пользователь не авторизован', e)
      }
    }
  }
);

export {$authHost, $host};
