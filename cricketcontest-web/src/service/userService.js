import BaseService from './baseService'

export function getUser() {
    return BaseService.get('/api/user');
}