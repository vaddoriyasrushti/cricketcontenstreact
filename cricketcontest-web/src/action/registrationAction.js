import * as authService from '../service/authService';
import { FAILED, REGISTER_SUCCESSFUL } from '../reducer/loginReducer';


export const RegisterUser = (credentials) => {
    return (dispatch) => {
        authService.signUp(credentials)
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: REGISTER_SUCCESSFUL,
                        users: { email: response.data.user.email }
                    });
                }
            })
            .catch((error) => {
                if (error) {
                    dispatch({ type: FAILED, data: { error_msg: error.response.data.error } });
                }
            })
    }
}
