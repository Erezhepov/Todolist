import axios from "axios";


export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {'API-KEY': '3dbf5c57-395a-4f66-bcf2-b9af8c3d8406'}
})