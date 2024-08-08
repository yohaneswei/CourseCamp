import axios from 'axios'
import { BEUrl, BEPythonUrl } from '../data';

export const api = axios.create({
    baseURL: `${BEUrl}`,
    timeout: 3000
})

export const pythonApi = axios.create({
    baseURL: `${BEPythonUrl}`,
    timeout: 3000
})

export const authToken = function () {
    let token = null;
    if (window.localStorage.getItem("token")) {
        const cekToken = window.localStorage.getItem("token");
        let [, payload,] = cekToken.split(".");//bagian kosong harusnya header dan signature di hapus untuk mengurangi warning
        token = JSON.parse(window.atob(payload));
    }
    return token;
};
