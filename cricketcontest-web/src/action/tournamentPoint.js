import * as TournamentPointService from "../service/tournamentPoint";
import { ADD_SCORE, GET_POINTS, FAILED } from '../reducer/tournamentPoint';

export const addTournamentPointScore = (score, offset, perPageRecord, fieldName, order) => {
    return dispatch => {
        TournamentPointService.addTournamentPointScore(score)
            .then(response => {
                if (response.status === 200) {
                    TournamentPointService.getTournamentPointScore(offset, perPageRecord, fieldName, order)
                        .then(res => {
                            if (res.status === 200) {
                                res.data.map(data => data.pointJson=JSON.parse(data.pointJson))
                                dispatch({
                                    type: ADD_SCORE,
                                    data: res.data
                                })
                            }
                        })
                }
            })
            .catch(error => {
                if (error.response) {
                    dispatch({
                        type: FAILED,
                        data: error.response.data.error
                    })
                }
            })
    }
}

export const getTournamentPointScore = (offset, perPageRecord, fieldName, order) => {
    return dispatch => {
        TournamentPointService.getTournamentPointScore(offset, perPageRecord, fieldName, order)
            .then((response) => {
                if (response.status === 200) {
                    response.data.map(data => data.pointJson=JSON.parse(data.pointJson))
                    dispatch({
                        type: GET_POINTS,
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