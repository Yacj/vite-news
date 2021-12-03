import {Storage} from "./localstorge.js";

const TokenKey = 'mobile'

export function getToken() {
    return Storage.getItem(TokenKey)
}

export function setToken(token) {
    return Storage.setItem(TokenKey, token)
}

export function removeToken() {
    return Storage.removeItem(TokenKey)
}