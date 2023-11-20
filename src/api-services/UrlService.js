import axios from 'axios';
const BASE_URL = "https://kyf-backend.azurewebsites.net/api";

// signup and signin methods
export const signup =  (data) => {
    const url = `${BASE_URL}/auth/signup`;
    data = {...data, roles: ["USER"]}
    return axios.post(url, data);
}

export const signin = (data) => {
    const url = `${BASE_URL}/auth/signin`;
    return axios.post(url, data);
}

export const forgotPassword = (data) => {
    const url = `${BASE_URL}/auth/forgotpassword?email=${data}`;
    return axios.post(url);
}

export const resetPassword = (data) => {
    const url = `${BASE_URL}/auth/resetpassword`;
    return axios.post(url, data);
}

// User Services methods

export const onBoardUser = (data) => {
    const url = `${BASE_URL}/users/onboard`;
    return axios.post(url, data);
}

export const setUserGoal = (userId,data) => {
    const url = `${BASE_URL}/users/setgoal/${userId}`;
    return axios.post(url, data);
}

export const getUser = (userId) => {
    const url = `${BASE_URL}/users/${userId}`;
    return axios.get(url);
}

// Recipe Services methods

export const getOwnerRecipes = (userId) => {
    const url = `${BASE_URL}/recipe/owner/${userId}`;
    return axios.get(url);
}
