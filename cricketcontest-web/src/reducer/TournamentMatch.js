const INITIAL_STATE = {
    tournamentmatchs: [],
    allmatchs:[],
    tournamentMatches:[],
    errors: "",
    addtournament:""
}

export const GET_TOURNAMENTMATCHS = "GET_TOURNAMENTMATCHS";
export const GET_ALLTOURNAMENTMATCHS="GET_ALLTOURNAMENTMATCHS";
export const INVALID_DATA = "INVALID_DATA";
export const ADD_TOURNAMENTMATCHS="ADD_TOURNAMENTMATCHS"

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_TOURNAMENTMATCHS: {
            return Object.assign({}, state, { tournamentMatches: [...action.tournamentMatches] });
        }
        case GET_ALLTOURNAMENTMATCHS: {
           return Object.assign({}, state, { allmatchs: action.allmatchs });
        }
        case ADD_TOURNAMENTMATCHS: {
            let {allmatchs} = state;
            let {data, tournament, team1, team2, tournamentid,nrecord} = action;
            let { id, tournamentName } = tournament[0];
            let Tournament = {id,tournamentName};
            let Team1 = team1[0];
            let Team2 = team2[0];
            let {tournamentMatches}=state;
            data={...data,Tournament, Team1, Team2};
            if (parseInt(tournamentid,10)===Tournament.id){
                tournamentMatches=[data,...tournamentMatches];  
            }
            if(allmatchs.length >= nrecord){
                allmatchs.splice(-1,1);
                allmatchs.unshift(data); 
            }
            else{
                allmatchs.unshift(data);
            }
            
            return Object.assign({}, state, { addtournament: action.data, allmatchs:[...allmatchs], tournamentMatches: [...tournamentMatches] });
       }
        case INVALID_DATA: {
             return Object.assign({}, state, { errors: "" });
        }
        default:
            return state;
    }
}