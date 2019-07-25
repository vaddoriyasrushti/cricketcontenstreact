import Dashboard from "views/Dashboard/Dashboard.jsx";
import Tournament from "../views/tournament/tournament";
import Team from "../views/Team/team";
import Player from "../views//Player/Player";
import TeamPlayer from '../views/TeamPlayer/TeamPlayer';
import TournamentMatch from '../views/TournamentMatch/tournamentmatch'
import TournamentMatchPlayerScore from '../views/TournamentMatchPlayerScore/TournamentMatchPlayerScore'
import TournamentPoint from '../views/tornamentPoints/tournamentPoint'

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "design_app",
    component: Dashboard
  },
  {
    path: "/tournament",
    name: "Tournaments",
    icon: "sport_trophy",
    component: Tournament
  },
  {
    path: "/Team",
    name: "Teams",
    icon: "sport_trophy",
    component: Team
  },
  {
    path: "/Player",
    name: "Players",
    icon: "sport_user-run",
    component: Player
  },
  {
    path: "/teamplayer",
    name: "Tournament Team Players",
    icon: "sport_user-run",
    component: TeamPlayer
  },
  {
    path: "/TournamentMatchs",
    name: "Tournament Matches",
    icon: "sport_user-run",
    component: TournamentMatch
  },
  {
    path: "/TournamentPoint",
    name: "Tournament Points",
    icon: "sport_trophy",
    component: TournamentPoint
  },
  {
    path: "/TournamentMatchPlayerScore",
    name: "Match Player Scores",
    icon: "sport_trophy",
    component: TournamentMatchPlayerScore
  },

  { redirect: true, path: "/", pathTo: "/dashboard", name: "Dashboard" }
];
export default dashRoutes;
