import {ApiEndpoints} from '../utils/constants';

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

export async function login(request)  {
    const requestData = JSON.stringify(request)
    console.log("called api" + requestData);
    return fetch(`${process.env.REACT_APP_NODE_SERVER_BASE_URL}${ApiEndpoints.LOGIN_API}`,
    {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: requestData
    }).then (response => response.json())
}


// export async function fetchCart()  {
//     return fetch(`${process.env.REACT_APP_CART_URL}`,
//     {
//         method: 'GET',
//         headers: { 'Content-Type': 'application/json' }
//     }).then (response => response.json())
// }

// export async function checkout()  {
//     return fetch(`${process.env.REACT_APP_CHECKOUT_URL}`,
//     {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' }
//     }).then (response => response.json())
// }

// export async function addItemToCart(request)  {
//     const jsonRequest={"sku":request}
//     const requestData = JSON.stringify(jsonRequest)
//     console.log("called api"+requestData);
//     return fetch(`${process.env.REACT_APP_CART_URL}`,
//     {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: requestData
//     }).then (response => response.json())
// }

// export async function deleteItemFromCart(request)  {
//     const jsonRequest={"sku":request}
//     const requestData = JSON.stringify(jsonRequest)
//     return fetch(`${process.env.REACT_APP_CART_URL}`,
//     {
//         method: 'DELETE',
//         headers: { 'Content-Type': 'application/json' },
//         body: requestData
//     }).then (response => response.json())
// }