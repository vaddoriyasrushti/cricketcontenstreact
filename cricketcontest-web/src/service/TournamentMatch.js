import baseService from './baseService';

export function getTournamentMatch(id) {
    return baseService.get('/api/tournamentMatch/' + id);
}

// export function SelectTournamentMatchAction(pageno, parpageRecord, sorting, fieldName) {
//     return baseService.get('/api/tournamentMatch/' + pageno + '/' + parpageRecord + '/' + sorting + '/' + fieldName);
// }

export function SelectTournamentMatchAction(pageno, parpageRecord, fieldName, sorting) {
    return baseService.get('/api/tournamentMatch/' + pageno + '/' + parpageRecord + '/' + fieldName + '/' + sorting);
}

export function addTournamentMatch(data) {
    return baseService.post('/api/tournamentMatch/', data);
}

