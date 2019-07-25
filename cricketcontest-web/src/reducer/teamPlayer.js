const INITIAL_STATE = {
    tournaments: [],
    teams: [],
    players: [],
    addteamplayer: [],
    errors: "",
    playerofteam: []
}

export const GET_TOURNAMENT = "GET_TOURNAMENT";
export const GET_TEAM = "GET_TEAM";
export const GET_PLAYER = "GET_PLAYER";
export const FAILED = "FAILED";
export const ADD_TEAM_PLAYER = "ADD_TEAM_PLAYER";
export const GET_PLAYER_OF_TEAM = 'GET_PLAYER_OF_TEAM';
export const DELETE_TEAM_PLAYER = 'DELETE_TEAM_PLAYER';

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_TOURNAMENT: {
            return Object.assign({}, state, { tournaments: action.data });
        }

        case GET_TEAM: {
            return Object.assign({}, state, { teams: action.data });
        }

        case GET_PLAYER: {
            return Object.assign({}, state, { players: action.data });
        }

        case ADD_TEAM_PLAYER: {
            return Object.assign({}, state,{players:action.data})
        }

        case GET_PLAYER_OF_TEAM: {
            return Object.assign({}, state, { playerofteam: action.data });
        }

        case DELETE_TEAM_PLAYER: {                         
            return Object.assign({}, state, { playerofteam: [...state.playerofteam.filter(playerofteam => playerofteam.id !== action.teamplayerId)] });
        }

        case FAILED: {
            return Object.assign({}, state, { errors: "" });
        }

        default:
            return state;
    }
}