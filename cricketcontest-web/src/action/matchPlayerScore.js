import * as MatchPlayerService from '../service/matchPlayerScore';
import * as TeamPlayerService from '../service/teamPlayerService';
import * as tournamentMatchService from '../service/TournamentMatch'
import { GET_PLAYER, GET_TOURNAMENT, FAILED, GET_TOURNAMENT_MATCHPLAYER_SCORE, GET_MATCHBYTOURNAMENT, ADD_SCORE } from '../reducer/matchPlayerScore';

export const getTournaments = () => {
    return dispatch => {
        MatchPlayerService.getTournaments()
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: GET_TOURNAMENT,
                        data: response.data
                    })
                }
            })
            .catch((error) => {
                if (error.response) {
                    dispatch({
                        type: FAILED,
                        data: error.response.data.error
                    })
                }
            })
    }
}

export const getTournamentMatchPlayerScore = (offset, perPageRecord, fieldName, order) => {
    return dispatch => {
        MatchPlayerService.getTournamentMatchPlayerScore(offset, perPageRecord, fieldName, order)
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: GET_TOURNAMENT_MATCHPLAYER_SCORE,
                        data: response.data
                    })
                }
            })
            .catch((error) => {
                if (error.response) {
                    dispatch({
                        type: FAILED,
                        data: error.response.data.error
                    })
                }
            })
    }
}

export const getPlayers = (tournamentId, teamId) => {
    return dispatch => {
        TeamPlayerService.getPlayerOfTeam(tournamentId, teamId)
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: GET_PLAYER,
                        data: response.data
                    })
                }
            })
            .catch((error) => {
                if (error.response) {
                    dispatch({
                        type: FAILED,
                        data: error.response.data.error
                    })
                }
            })
    }
}

export const getMatchByTournament = (tournamentId) => {
    return dispatch => {
        tournamentMatchService.getTournamentMatch(tournamentId)
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: GET_MATCHBYTOURNAMENT,
                        data: response.data
                    })
                }
            })
            .catch((error) => {
                if (error.response) {
                    dispatch({
                        type: FAILED,
                        data: error.response.data.error
                    })
                }
            })
    }
}
export const addTournamentMatchPlayerScore = (score) => {
    return (dispatch) => {
        MatchPlayerService.addTournamentMatchPlayerScore(score).then((response) => {
            if (response.status === 200) {
                dispatch({
                    type: ADD_SCORE,
                    data: response.data
                });
            }
        }).catch((error) => {
            if (error.response) {
                dispatch({ type: FAILED, data: { error_msg: error.response.data.error } });
            }
        })
    }
};
export const updateWinning = (matchId,winingTeamId) => {
    return (dispatch) => {
        MatchPlayerService.updateWinning(matchId,winingTeamId).then((response) => {
            if (response.status === 200) {    
                    
            }
        }).catch((error) => {
            if (error.response) {
                dispatch({ type: FAILED, data: { error_msg: error.response.data.error } });
            }
        })
    }
};




