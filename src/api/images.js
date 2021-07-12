/* eslint-disable prettier/prettier */
import authFetch from '../utils/authFetch';
import { BASE_URL } from "../utils/constants";
import { forEach } from 'lodash';
import axios from 'axios';


export const searchImages = async (logout) => {
    try {
        const url = `${BASE_URL}/upload/files?_sort=createdAt:DESC&_limit=200`;
        const response = await authFetch(url, null, logout);
        return response;

    } catch (error) {
        console.log(error)
        return null;
    }
}

export const uploadImage = async (image) => {
    try {

        const formData = new FormData();
        formData.append('files', image);
        const url = `${BASE_URL}/upload`;
        const params = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
        }
        const response= await axios.post(url, formData, params);

        return response;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const uploadImages = async (images) => {
    try {

        const formData = new FormData();
        forEach(images, (image) => {
            formData.append('files', image);
        })
        
        const url = `${BASE_URL}/upload`;
        const params = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
        }
        const response = await axios.post(url, formData, params);
        return response;
    } catch (error) {
        console.log(error);
        return null;
    }
}