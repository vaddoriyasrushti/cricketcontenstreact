const INITIAL_STATE = {
    TournamentData: [],
    DeleteTournaments: "",
    Tournaments: [],
    TournamentAddData: [],
    FetchSingleTournamentData: [],
    updateTournamentData: [],
    error_msg: "",
    Tournamentss: [],
    tournamentmatchs: [],
    allmatchs:[],
    tournamentMatches:[],
    errors: "",
    addtournament:""
}

export const deletetournamentdata = "deletetournamentdata";
export const Fetch_Tournament_Data = "Fetch_Tournament_Data";
export const updatetournamentdata = "updatetournamentdata";
export const FetchSingleTournament = "FetchSingleTournament";
export const Add_Data = "Add_Data";
export const INVALID_DATA = "INVALID_DATA";
export const Get_Data = "Get_Data";
export const Get_Tournament_Data = "Get_Tournament_Data";
export const Add_New_Team = "Add_New_Team";
export const Add_Tournament_Data = "Add_Tournament_Data";
export const Delete_Team = "Delete_Team";
export const GET_TOURNAMENTMATCHS = "GET_TOURNAMENTMATCHS";
export const GET_ALLTOURNAMENTMATCHS="GET_ALLTOURNAMENTMATCHS";
export const ADD_TOURNAMENTMATCHS="ADD_TOURNAMENTMATCHS"

export default (state = INITIAL_STATE, action) => {
    
    switch (action.type) {
        case deletetournamentdata: {
           
            return Object.assign({}, state, {
                Tournaments: action.TournamentAddData
            });
        }
        case updatetournamentdata: {
          
            let id = parseInt(action.updateTournamentData.id, 10);
            var newState = state.Tournaments.map(item => {
                return item.id === id ? action.updateTournamentData : item;
            })
            
            return Object.assign({}, state, {
                Tournaments: newState
            });
        }

        case FetchSingleTournament: {
            return Object.assign({}, state, { FetchSingleTournamentData: [].concat(action.FetchSingleTournamentData) });
        }

        case Fetch_Tournament_Data: {
            return Object.assign({}, state, { TournamentData: action.TournamentData });
        }

        case Get_Data: {
            let tournamentData = action.TournamentData;
            let newTournaments = tournamentData.map((tournament) => {
                let newTeam = tournament.Teams.filter((team) => {
                    return team.TournamentTeam.isDelete === parseInt(0, 10);
                })
                tournament.Teams = newTeam
                return tournament;
            })
            return Object.assign({}, state, { Tournaments: newTournaments });
        }

        case Get_Tournament_Data: {
            return Object.assign({}, state, { Tournamentss: action.TournamentData });
        }

        case Add_Data: {
            const newstate = state.TournamentData.concat(action.TournamentAddData);
            return Object.assign({}, state, {
                TournamentAddData: action.TournamentAddData,
                TournamentData: newstate
            });
        }

        case Add_Tournament_Data: {
            let myTournaments={};
            myTournaments=action.TournamentAddData;
            let { nrecord }=action;
            let {Tournaments} = state;
            if(myTournaments.Teams===undefined){
                let Teams=[];
                myTournaments={...myTournaments,Teams};
            }
            if(Tournaments.length >= nrecord){
                Tournaments.splice(-1,1);
                Tournaments.unshift(myTournaments); 
            }
            else{
                Tournaments.unshift(myTournaments);
            }
            return Object.assign({}, state, { Tournaments: [...Tournaments]});
        }

        case Delete_Team: {
            let tournamentss = state.Tournaments;
            let teamId = action.teamId;
            let tournamentId = action.tournamentId;
            let k = tournamentss.findIndex(tournament => {
                return tournament.id === parseInt(tournamentId, 10);
            })

            let newTournament = tournamentss[k].Teams.filter((team, i) => {
                return team.id !== teamId;
            })

            tournamentss[k].Teams = newTournament;
            return Object.assign({}, state, { Tournaments: [...tournamentss]});
        }

        case INVALID_DATA: {
            return Object.assign({}, state, { error_msg: action.error_msg });
        }

        case Add_New_Team: {
            // let tournamentssData = state.Tournamentss;
            let tournaments = state.Tournaments;
            let id={};
            id={...action.TournamentTeamAddData};
            let b;
            b=id.tournamentId;
           // let id = action.TournamentTeamAddData.tournamentId;
            let i = tournaments.findIndex(tournament => {
                return tournament.id === parseInt(b, 10);
            })
            // let j = tournamentssData.findIndex(tournament => {
            //     return tournament.id === parseInt(b, 10);
            // })
            let TournamentTeam = {id:action.tournamentTeamm.id,isDelete:action.tournamentTeamm.isDelete};
            let newTeamm = {...action.newTeam,TournamentTeam};
            // if(tournaments[i].Teams===undefined){
            //     let Teams=[];
            //     tournaments[i]={...tournaments[i],Teams};
            // }
            // tournamentssData[j].Teams = [...tournamentssData[j].Teams, newTeamm];
            tournaments[i].Teams = [...tournaments[i].Teams, newTeamm]
            return Object.assign({}, state, { Tournaments: [...tournaments] });
        }

        case ADD_TOURNAMENTMATCHS: {
            let tournamentI = state.Tournamentss;
            let { allmatchs } = state;
            let { data, tournament, team1, team2, tournamentid, nrecord } = action;
            let { id, tournamentName } = tournament[0];
            let Tournament = { id, tournamentName };
            let Team1 = team1;
            let Team2 = team2;
            let { tournamentMatches } = state;
            data = { ...data, Tournament, Team1, Team2 };
            if (parseInt(tournamentid, 10) === Tournament.id) {
                tournamentMatches = [...tournamentMatches, data];
            }
            if(allmatchs.length >= nrecord){
                allmatchs.splice(-1,1);
                allmatchs.unshift(data); 
            }
            else{
                allmatchs.unshift(data);
            }
            let index = tournamentI.findIndex(tournament => {
                return tournament.id === parseInt(id, 10);
            })
            tournamentI[index].TournamentMatches = [...tournamentI[index].TournamentMatches,data];
            return Object.assign({}, state, { addtournament: action.data, allmatchs: [...allmatchs], tournamentMatches: [...tournamentMatches], Tournamentss:[...tournamentI] });
        }

        case GET_TOURNAMENTMATCHS: {
            return Object.assign({}, state, { tournamentMatches: [...action.tournamentMatches] });
        }

        case GET_ALLTOURNAMENTMATCHS: {
            return Object.assign({}, state, { allmatchs: action.allmatchs });
         }
        default:
            return state
    }
}