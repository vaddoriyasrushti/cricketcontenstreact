const INITIAL_STATE = {
    TeamData: [],
    TeamAddData: [],
    error_msg: "",
    Team: {},
    DeleteTeams: "",
    updateTeamData: [],
    TeamSData: []
}
export const deleteteamdata = "deleteteamdata";
export const Fetch_Data = "Fetch_Data";
export const update_Team_data = "update_Team_data";
export const Add_Team_Data = "Add_Team_Data";
export const INVALID_DATA = "INVALID_DATA";
export const Get_Data = "Get_Data";
export const Get_Team_By_Id = 'Get_Team_By_Id';
export default (state = INITIAL_STATE, action) => {    
    switch (action.type) {
        case deleteteamdata: {
            return Object.assign({}, state, {
                TeamData: action.DeleteTeams
            });
        }
        case update_Team_data: {
            let id = parseInt(action.updateTeamData.id, 10);

            return Object.assign({}, state, {
                TeamData: state.TeamData.map(item => {
                    ;
                    return item.id === id ? action.updateTeamData : item;
                })
            });
        }
        case Fetch_Data: {
            return Object.assign({}, state, { TeamData: action.TeamData });
        }
        case Add_Team_Data: {
            let {nrecord} = action;
            if(state.TeamData.length >= nrecord){
                state.TeamData.splice(-1, 1)
                state.TeamData.unshift(action.TeamAddData)
            }
            else{
                state.TeamData.unshift(action.TeamAddData);
            }
            return Object.assign({}, state, {
                TeamData: state.TeamData.splice(action.TeamAddData)
            });
        }
        case Get_Data: {
            return Object.assign({}, state, { TeamData: action.TeamData });
        }
        case Get_Team_By_Id: {
            let teamsData = state.TeamSData;
            let teamIds = teamsData.map(team => {
                return team.id;
            })
            if (!teamIds.includes(action.Team.id))
                teamsData.push(action.Team);
            return Object.assign({}, state, { Team: action.Team, TeamSData: [...teamsData] });
        }
        case INVALID_DATA: {
            return Object.assign({}, state, { error_msg: action.error_msg });
        }
        default:
            return state
    }
}