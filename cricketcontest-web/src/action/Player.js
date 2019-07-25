import * as playerService from '../service/Player';

import { FETCH_PLAYER, INVALID_DATA, ADD_PLAYER, UPDATE_PLAYER, DELETE_PLAYER } from '../reducer/Player';

export const getPlayer = (start, end, sortFiled, sortType) => {
    return (dispatch) => {
        playerService.getPlayer(start, end, sortFiled, sortType).then((response) => {
            if (response.status === 200) {            
                dispatch({
                    type: FETCH_PLAYER,
                    PlayerData: response.data
                });
            }
        }).catch((error) => {
            if (error.response) {
                dispatch({ type: INVALID_DATA, data: { error_msg: error.response.data.error } });
            }
        })
    }
};
export const addPlayer = (nrecord,player) => {
    return (dispatch) => {
        playerService.addPlayer(player).then((response) => {
            if (response.status === 200) {
                dispatch({
                    type: ADD_PLAYER,
                    PlayerAddData: response.data,
                    nrecord
                });
            }
        }).catch((error) => {
            if (error.response) {
                dispatch({ type: INVALID_DATA, data: { error_msg: error.response.data.error } });
            }
        })
    }
};

export const updatePlayer = (player, playerFormData) => {
    return (dispatch) => {
        playerService.updatePlayer(player.id, playerFormData).then((response) => {            
            let playerImage = "";
            (response.data.playerImage) ? playerImage = response.data.playerImage
                : playerImage = player.playerImage
            if (response.status === 200) {
                dispatch({
                    type: UPDATE_PLAYER,
                    PlayerUpdateData: {
                        ...player,
                        playerImage: playerImage
                    }
                });
            }
        }).catch((error) => {
            if (error.response) {
                dispatch({ type: INVALID_DATA, data: { error_msg: error.response.data.error } });
            }
        })
    }
};

export const deletePlayer = (id, start, end, sortFiled, sortType) => {
    return (dispatch) => {
        playerService.deletePlayer(id).then((res) => {
            if (res.status === 200) {
                playerService.getPlayer(start, end, sortFiled, sortType).then((response) => {
                    if (response.status === 200) {
                        dispatch({
                            type: DELETE_PLAYER,
                            PlayerData: response.data
                        });
                    }
                })
            }
        }).catch((error) => {
            if (error.response) {
                dispatch({ type: INVALID_DATA, data: { error_msg: error.response.data.error } });
            }
        })
    }
};
