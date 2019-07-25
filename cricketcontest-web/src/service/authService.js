import BaseService from './baseService'

export function login(credential) {
    return BaseService.post('/auth/login', credential);
}

export function signUp(data) {
    return BaseService.post('/auth/signup', data);
}