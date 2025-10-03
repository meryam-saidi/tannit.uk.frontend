//pour ne pas répéter l’en-tête Authorization => crée un client Axios
import axios from 'axios';
import { store } from '../store/store';

const axiosInstance = axios.create({
  baseURL: 'https://localhost:7211/api', //  backend for account/me
});

// on expose une fonction d’attache du token, injectée APRÈS création du store
export function attachAuthToken(getToken: () => string | null) {
  axiosInstance.interceptors.request.use((cfg) => {
    const t = getToken();
    if (t) cfg.headers.Authorization = `Bearer ${t}`;
    return cfg;
  });
}

export default axiosInstance;

/**
 * puis dans userProfilePage:

import { axiosInstance } from "../api/axiosInstance";

const res = await axiosInstance.get("/accounts/me");
const me = res.data;
setBalance(me.balance ?? 0);


*/