const INITIAL_STATE = {
    score: {},
    get_points: [],
    error_msg: ""
}

export const ADD_SCORE = "ADD_SCORE";
export const GET_POINTS = "GET_POINTS";
export const FAILED = "FAILED";

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_SCORE: {
            return Object.assign({}, state, { get_points: action.data });
        }
        case GET_POINTS: {
            return Object.assign({}, state, { get_points: action.data });
        }
        case FAILED: {
            return Object.assign({}, state, { error_msg: "" });
        }
        default:
            return state;
    }
}