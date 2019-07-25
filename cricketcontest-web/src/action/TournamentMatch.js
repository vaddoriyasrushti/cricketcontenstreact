import * as tournamentMatchService from '../service/TournamentMatch'
import { GET_TOURNAMENTMATCHS, GET_ALLTOURNAMENTMATCHS, INVALID_DATA, ADD_TOURNAMENTMATCHS } from '../reducer/TournamentMatch';

export const getTournamentMatch = (id) => {
    return (dispatch) => {
        tournamentMatchService.getTournamentMatch(id)
            .then((response) => {
                if (response.status === 200) {
                    var data = response.data;
                    dispatch(
                        {
                            type: GET_TOURNAMENTMATCHS,
                            tournamentMatches: data
                        }
                    );
                }
            })
            .catch((error) => {
                if (error.response) {
                    dispatch({ type: INVALID_DATA, data: { error_msg: error.response.data.error } });
                }
            })
    }
};

export const SelectTournamentMatchAction = (pageno, parpageRecord, fieldName, sorting) => {
    return (dispatch) => {
        tournamentMatchService.SelectTournamentMatchAction(pageno, parpageRecord, fieldName, sorting)
            .then((response) => {
                if (response.status === 200) {
                    var data = response.data;
                    dispatch(
                        {
                            type: GET_ALLTOURNAMENTMATCHS,
                            allmatchs: data
                        }
                    );
                }
            })
            .catch((error) => {
                if (error.response) {
                    dispatch({ type: INVALID_DATA, data: { error_msg: error.response.data.error } });
                }
            })
    }
};

export const AddTournamentMatchAction = (data, tournament, team1, team2, tournamentid, nrecord) => {
    return (dispatch) => {
        tournamentMatchService.addTournamentMatch(data)
            .then((response) => {
                if (response.status === 200) {
                    var data = response.data;
                    dispatch(
                        {
                            type: ADD_TOURNAMENTMATCHS,
                            data: data,
                            tournament,
                            team1,
                            team2,
                            tournamentid,
                            nrecord
                        }
                    );
                }
            })
            .catch((error) => {
                if (error.response) {
                    dispatch({ type: INVALID_DATA, data: { error_msg: error.response.data.error } });
                }
            })
    }
}