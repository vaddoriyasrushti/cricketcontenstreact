import * as authService from '../service/Tournament'

import { Get_Data } from '../reducer/Tournament';
import { Fetch_Tournament_Data, deletetournamentdata, INVALID_DATA, FetchSingleTournament, updatetournamentdata, Add_Tournament_Data, Get_Tournament_Data } from '../reducer/Tournament';

export const SelectTournamentAction = (pageno, parpageRecord, sorting, filedName) => {
    return (dispatch) => {
        authService.Tournament(pageno, parpageRecord, sorting, filedName).then((response) => {
            if (response.status === 200) {
                dispatch({
                    type: Fetch_Tournament_Data,
                    TournamentData: response.data
                });
            }
        })
            .catch((error) => {
                if (error.response) {
                    dispatch({ type: INVALID_DATA, data: { error_msg: error.response.data.error } });
                }
            })
    }
};
export const AddTournamentAction = (nrecord,data) => {
    return (dispatch) => {
        authService.TournamentAdd(data).then((response) => {
            if (response.status === 200) {

                dispatch({
                    type: Add_Tournament_Data,
                    TournamentAddData: response.data,
                    nrecord
                });
            }
        })
            .catch((error) => {
                if (error.response) {
                    dispatch({ type: INVALID_DATA, data: { error_msg: error.response.data.error } });
                }
            })
    }
};
export const DeleteTournamentAction = (id, pageno, parpageRecord, sorting, filedName) => {
    return (dispatch) => {
        authService.DeleteTournament(id).then((response) => {
            if (response.status === 200) {
                authService.Tournament(pageno, parpageRecord, sorting, filedName).then(data => {
                    if (data.status === 200) {
                        dispatch(
                            {
                                type: deletetournamentdata,
                                TournamentAddData: data.data
                            }
                        );
                    }
                })
            }
        })
            .catch((error) => {
                if (error.response) {
                    dispatch({ type: INVALID_DATA, data: { error_msg: error.response.data.error } });
                }
            })
    }
};
export const FetchSingleTournamentAction = (id) => {
    return (dispatch) => {
        authService.fetchSingleTournamentdata(id).then((response) => {
            if (response.status === 200) {
                dispatch(
                    {
                        type: FetchSingleTournament,
                        FetchSingleTournamentData: response.data
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
export const UpdateTournamentAction = (id, tornament, data) => {
    return (dispatch) => {
        authService.UpdateTournamentdata(id, data).then((response) => {
            let tournamentBanner = "";
            (response.data.tournamentBanner) ? tournamentBanner = response.data.tournamentBanner
                : tournamentBanner = tornament.tournamentBanner
            if (response.status === 200) {
                dispatch(
                    {
                        type: updatetournamentdata,
                        updateTournamentData: {
                            ...tornament,
                            tournamentBanner
                        }
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

export const fetchTournamentAction = (pageno, parpageRecord, sorting, filedName) => {
    return (dispatch) => {
        authService.AllTournamentData(pageno, parpageRecord, sorting, filedName).then((response) => {
            if (response.status === 200) {
                dispatch(
                    {
                        type: Get_Data,
                        TournamentData: response.data
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

export const fetchTournamentDataAction = () => {
    return (dispatch) => {
        authService.TournamentData().then((response) => {
            if (response.status === 200) {
                dispatch(
                    {
                        type: Get_Tournament_Data,
                        TournamentData: response.data
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