import BaseService from './baseService';

export const addTournamentPointScore = (score) => {
    return BaseService.post("/api/tournamentpoint",score)
}

export const getTournamentPointScore = (offset, perPageRecord, fieldName, order) => {
    return BaseService.get("/api/tournamentpoint/" + offset + '/' + perPageRecord + '/' + fieldName + '/' + order)
}