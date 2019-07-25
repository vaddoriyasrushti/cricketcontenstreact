const INITIAL_STATE = {
    TournamentTeamData: [],
    TournamentTeamAddData:[]
}

export const Add_Team = "Add_Team";
export const INVALID_DATA = "INVALID_DATA";

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Add_Team: {
            const newstate = state.TournamentTeamData.concat(action.TournamentTeamAddData)
            return Object.assign({}, state, {
                TournamentTeamAddData: action.TournamentTeamAddData,
                TournamentTeamData: newstate
            });
        }
        case INVALID_DATA: {
            return Object.assign({}, state, { error_msg: action.error_msg });
        }
        default:
            return state
    }
}