import baseService from './baseService';

export function addTournamentTeam(data) {
    return baseService.post('./api/tournamentteam', data);
}

export function deleteTournamentTeam(tournamentId, teamId, updatedBy) {
    return baseService.delete(`./api/tournamentteam/${tournamentId}/${teamId}/${updatedBy}`);
}