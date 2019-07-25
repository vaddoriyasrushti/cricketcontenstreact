import * as teamPlayerService from '../service/teamPlayerService';
import { GET_TOURNAMENT, GET_TEAM, GET_PLAYER, ADD_TEAM_PLAYER, GET_PLAYER_OF_TEAM, DELETE_TEAM_PLAYER, FAILED } from '../reducer/teamPlayer';


export const getTournaments = (pageno, parpageRecord, sorting, fieldName) => {
    return dispatch => {
        teamPlayerService.getTournament(pageno, parpageRecord, sorting, fieldName)
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: GET_TOURNAMENT,
                        data: response.data
                    })
                }
            })
            .catch((error) => {
                dispatch({
                    type: FAILED,
                    data: error.response.data.error
                })
            })
    }
}

export const getTeamByTournamanetId = (tournamentId) => {
    return dispatch => {
        teamPlayerService.getTeamByTournamanetId(tournamentId)
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: GET_TEAM,
                        data: response.data
                    })
                }
            })
            .catch((error) => {
                dispatch({
                    type: FAILED,
                    data: error.response.data.error
                })
            })
    }
}

export const getPlayers = () => {
    return dispatch => {
        teamPlayerService.getPlayers()
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: GET_PLAYER,
                        data: response.data
                    })
                }
            })
            .catch((error) => {
                dispatch({
                    type: FAILED,
                    data: error.response.data.error
                })
            })
    }
}

export const AddTeamPlayer = (data) => {
    return dispatch => {
        teamPlayerService.AddTeamPlayer(data)
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: ADD_TEAM_PLAYER,
                        data: response.data
                    })
                }
            })
            .catch((error) => {
                dispatch({
                    type: FAILED,
                    data: error.response.data.error
                })
            })
    }
}

export const getPlayerOfTeam = (tournamentId, teamId) => {
    return dispatch => {
        teamPlayerService.getPlayerOfTeam(tournamentId, teamId)
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: GET_PLAYER_OF_TEAM,
                        data: response.data
                    })
                }
            })
            .catch((error) => {
                dispatch({
                    type: FAILED,
                    data: error.response.data.error
                })
            })
    }
}

export const deleteTeamPlayer = (teamplayerId, updatedBy) => {
    return dispatch => {
        teamPlayerService.deleteTeamPlayer(teamplayerId, updatedBy)
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: DELETE_TEAM_PLAYER,
                        teamplayerId: teamplayerId
                    })
                }
            })
            .catch((error) => {
                dispatch({
                    type: FAILED,
                    data: error.response.data.error
                })
            })
    }
}