import * as authService from '../../service/user/Createteam';
import { Create_Team_Data, FAILED, Fetch_myteam_Data,showtornamentplayer } from '../../reducer/User/CreateTeam';

export const createTeam = (data) => {
    return (dispatch) => {
        authService.createTeamService(data)
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: Create_Team_Data,
                        CreateTeamAddData: response.data
                    });
                }
            })
            .catch((error) => {
                if (error) {
                    dispatch({ type: FAILED, data: { error_msg: error.response.data.error } });
                }
            });
    }
};
export const Show_My_TeamData = (userid) => {
    return (dispatch) => {
        authService.showMyteams(userid)
            .then((response) => {

                if (response.status === 200) {
                    dispatch({
                        type: Fetch_myteam_Data,
                        TeamData: response.data
                    });
                }
            })
            .catch((error) => {
                if (error) {
                    dispatch({ type: FAILED, data: { error_msg: error.response.data.error } });
                }
            });
    }
};

export const show_Tornament_Player = (tornamentid) => {
    return (dispatch) => {
        authService.showtournamentplayerscore(tornamentid)
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: showtornamentplayer,
                        showTornamentPlayer: response.data
                    });
                }
            })
            .catch((error) => {
                if (error) {
                    dispatch({ type: FAILED, data: { error_msg: error.response.data.error } });
                }
            });
    }
};