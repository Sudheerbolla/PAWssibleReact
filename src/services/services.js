import {ApiEndpoints} from '../utils/constants';

// Dogs related APIS
export async function fetchDogs()  {
    return fetch(`${process.env.REACT_APP_NODE_SERVER_BASE_URL}${ApiEndpoints.DOGS_BASE}`,
    {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    }).then (response => response.json())
}

export async function fetchDogsByUser(userId)  {
    return fetch(`${process.env.REACT_APP_NODE_SERVER_BASE_URL}${ApiEndpoints.DOGS_BY_USER}${userId}`,
    {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    }).then (response => response.json())
}

// Users related APIS
export async function login(request)  {
    const requestData = JSON.stringify(request)
    return fetch(`${process.env.REACT_APP_NODE_SERVER_BASE_URL}${ApiEndpoints.LOGIN_API}`,
    {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: requestData
    }).then (response => response.json())
}

export async function register(request)  {
    const requestData = JSON.stringify(request)
    return fetch(`${process.env.REACT_APP_NODE_SERVER_BASE_URL}${ApiEndpoints.REGISTER_API}`,
    {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: requestData
    }).then (response => response.json())
}

export async function updateUser(request)  {
    const requestData = JSON.stringify(request)
    return fetch(`${process.env.REACT_APP_NODE_SERVER_BASE_URL}${ApiEndpoints.UPDATE_USER_API}`,
    {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: requestData
    }).then (response => response.json())
}

export async function resetPassword(request)  {
    const requestData = JSON.stringify(request)
    return fetch(`${process.env.REACT_APP_NODE_SERVER_BASE_URL}${ApiEndpoints.RESET_PASSWORD_API}`,
    {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: requestData
    }).then (response => response.json())
}