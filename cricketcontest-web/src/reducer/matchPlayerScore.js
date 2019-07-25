const INITIAL_STATE = {
    tournaments: [],
    teams: [],
    players: [],
    add_score: [],
    tournamentMatchPlayerScore: [],
    tournamentMatch: [],
    error_msg: ""
}

export const GET_TOURNAMENT = "GET_TOURNAMENT";
export const GET_TOURNAMENT_MATCHPLAYER_SCORE = "GET_TOURNAMENT_MATCHPLAYER_SCORE";
export const GET_MATCHBYTOURNAMENT = "GET_MATCHBYTOURNAMENT";
export const GET_TEAM = "GET_TEAM";
export const GET_PLAYER = "GET_PLAYER";
export const ADD_SCORE = "ADD_SCORE";
// export const UPDATE_WINING_TEAM="UPDATE_WINING_TEAM";
export const FAILED = "FAILED";


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_TOURNAMENT: {
            return Object.assign({}, state, { tournaments: action.data });
        }
        case GET_TOURNAMENT_MATCHPLAYER_SCORE: {
            return Object.assign({}, state, { tournamentMatchPlayerScore: action.data });
        }
        case GET_MATCHBYTOURNAMENT: {
            return Object.assign({}, state, { tournamentMatch: action.data })
        }
        case GET_TEAM: {
            return Object.assign({}, state, { teams: action.data });
        }
        case GET_PLAYER: {
            return Object.assign({}, state, { players: [...action.data] });
        }
        case ADD_SCORE: {
            let scores = [...state.tournamentMatchPlayerScore]
            return Object.assign({}, state, {
                tournamentMatchPlayerScore: scores.concat(action.data),
            });
        }      
        case FAILED: {
            return Object.assign({}, state, { error_msg: "" });
        }
        default:
            return state;
    }
}