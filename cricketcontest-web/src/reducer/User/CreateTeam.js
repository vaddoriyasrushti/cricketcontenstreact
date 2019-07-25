const INITIAL_STATE = {
    TeamData:[],
    CreateTeamAddData:[],
    error_msg:"",
    showTornamentPlayer:[]
}
export const showtornamentplayer = "showtornamentplayer";
export const Fetch_myteam_Data = "Fetch_myteam_Data";
export const Create_Team_Data = "Create_Team_Data";
export const FAILED = 'FAILED';
export default (state = INITIAL_STATE, action) => {
    
    switch (action.type) {          
        case showtornamentplayer: {            
            return Object.assign({}, state, {
                showTornamentPlayer:action.showTornamentPlayer
             });             
        }
        case Fetch_myteam_Data: {            
            return Object.assign({}, state, {
                TeamData:action.TeamData
             });             
        }
        case Create_Team_Data: {            
            return Object.assign({}, state, {
                CreateTeamAddData:action.CreateTeamAddData
             });             
        }
        case FAILED: {
            return Object.assign({}, state, { error_msg: action.data.error_msg });
        }
        default:
            return state
    }
}