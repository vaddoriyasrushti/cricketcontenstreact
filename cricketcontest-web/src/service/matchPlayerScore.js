import BaseService from './baseService';

export const getTournaments = () => {
    return BaseService.get("/api/tournament/0/100/id/asc");
}

export const getTournamentMatchesByTournamentId = (tournamentId) => {
    return BaseService.get("/api/tournament/" + tournamentId);
}

export const getplayersByTournamentMatchId = (tournamentMatchId) => {
    return BaseService.get("/api/tournamentmatch/" + tournamentMatchId);
}

export const getTournamentMatchPlayerScore = (offset, perPageRecord, fieldName, order) => {
    return BaseService.get("api/tournamentmatchplayerscore/" + offset + '/' + perPageRecord + '/' + fieldName + '/' + order);
}

export const addTournamentMatchPlayerScore = (tournamentMatchPlayerScore) => {
    return BaseService.post("api/tournamentmatchplayerscore", tournamentMatchPlayerScore);
}
export const updateWinning = (matchId, winningTeamId) => {
    return BaseService.put("api/tournamentmatch/" + matchId + "/" + winningTeamId);
}