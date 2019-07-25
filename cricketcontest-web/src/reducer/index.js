import { combineReducers } from 'redux'

import auth from './loginReducer';
import Tournament from './Tournament'
import Team from './Team'
import Player from './Player'
import teamPlayer from './teamPlayer'
import TournamentTeam from './TournamentTeam'
import MatchPlayerScore from './matchPlayerScore'
import TournamentPoint from './tournamentPoint'
import TournamentMatchs from './TournamentMatch' 
import CreateteamReducer from './User/CreateTeam'
import User from './userReducer'
export default combineReducers({ auth, Tournament, Team, TournamentTeam, Player, teamPlayer, MatchPlayerScore, TournamentPoint,TournamentMatchs,CreateteamReducer,User });
