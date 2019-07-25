import * as userService from '../service/userService';
import { FAILED, GET_USER } from '../reducer/userReducer';

export const getUser = () => {
    return (dispatch) => {
        userService.getUser()
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: GET_USER,
                        data: response.data
                    });
                }
            })
            .catch((error) => {
                if (error) {
                    dispatch({
                        type: FAILED,
                        data: { error_msg: error.response.data.error }
                    });
                }
            });
    }
};


