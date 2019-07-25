import * as authService from '../service/authService';
import { FAILED, LOGIN_SUCCESSFUL, LOGOUT } from '../reducer/loginReducer';

export const loginUser = (credentials) => {
    return (dispatch) => {
        authService.login(credentials)
            .then((response) => {
                if (response.status === 200) {
                    localStorage.setItem("token", response.data.user.token)
                    localStorage.setItem("userId", response.data.user.id)
                    const fullname = response.data.user.firstName + " " + response.data.user.lastName

                    localStorage.setItem("role", response.data.user.role)
                    localStorage.setItem("Name", fullname)
                    dispatch({
                        type: LOGIN_SUCCESSFUL,
                        data: { token: response.data.user.token, userId: response.data.user.id, Role: response.data.user.role, Name: fullname }
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

export const logoutUser = () => {
    return (dispatch) => {
        dispatch({
            type: LOGOUT
        });
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("role");
        localStorage.removeItem("Name");
    }
};

export const RegisterUser = (credentials) => {
    return (dispatch) => {
        authService.signUp(credentials)
            .then((response) => {
                if (response.status === 200) {
                    let credentials_Login = {
                        email: credentials.email,
                        password: credentials.password
                    }
                    authService.login(credentials_Login)
                        .then((response) => {
                            const fullname = response.data.user.firstName + " " + response.data.user.lastName
                            localStorage.setItem("token", response.data.user.token)
                            localStorage.setItem("userId", response.data.user.id)
                            localStorage.setItem("role", response.data.user.role)
                            localStorage.setItem("Name", fullname)
                            dispatch({
                                type: LOGIN_SUCCESSFUL,
                                data: { token: response.data.user.token, userId: response.data.user.id, Role: response.data.user.role, Name: fullname }
                            });
                        })
                }
            })
            .catch((error) => {
                if (error) {
                    dispatch({ type: FAILED, data: { error_msg: error.response.data.error } });
                }
            })
    }
}


