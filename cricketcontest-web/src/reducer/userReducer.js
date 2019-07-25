const INITIAL_STATE = {
    users: []
}

export const GET_USER = 'GET_USER';
export const FAILED = 'FAILED';

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_USER: {
            return Object.assign({}, state, { users: action.data });
        }
        case FAILED: {
            return Object.assign({}, state, { error_msg: action.data.error_msg });
        }
        default:
            return state;
    }
}