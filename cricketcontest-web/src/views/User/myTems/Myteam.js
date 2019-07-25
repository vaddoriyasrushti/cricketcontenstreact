import React, { Component } from 'react';
import { Row, Card, CardBody } from 'reactstrap';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import UserPanel from '../../UserPanel/userPanel';
import path from '../../../path';
import * as  showUserMatchesAction from '../../../action/user/Createteam';
import * as TournamentAction from '../../../action/Tournament';
import '../style.css';

let urlImage = path + "UserSideBackgroundImage.jpg";
class userDashBoard extends Component {
    componentWillMount() {
        this.props.action.Tournament.fetchTournamentAction(0, 100, "desc", "id");
    }

    componentDidMount = () => {
        this.getTournamentMatch();
    }

    getTournamentMatch() {
        let userid = localStorage.getItem("userId")
        this.props.action.UserMatchesteams.Show_My_TeamData(userid);
    }

    handletornamentteams = (id) => {
        this.props.history.push('/MyTeamPlayer/' + id);
    }

    

    render() {
        

        let tournaments = '';
        let t = [];
        if (this.props.Tournaments.length > 0) {
            tournaments = this.props.Tournaments.map((tournament, i) => {
                if (this.props.showUserMatches.length > 0) {
                    return this.props.showUserMatches.map((usermatches, i) => {
                        if (tournament.id === usermatches.tournamentId) {
                            if (!t.includes(usermatches.tournamentId)) {
                                t.push(usermatches.tournamentId)
                                return (
                                    <Card key={tournament.id} body className="myteamShowTournament" onClick={() => this.handletornamentteams(tournament.id)}>
                                        <div className="row textAlian" >
                                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 ">
                                                <img alt="demo" src={path + "thumbnail/" + tournament.tournamentBanner} className="myteamShowTournamentlogo" ></img>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 FullNameDiv" >
                                                <p className="heraderheading"> {tournament.tournamentName}</p>
                                            </div>
                                            <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                                            </div>
                                        </div>
                                    </Card>
                                )
                            }
                        }
                        return null
                    })
                }
                else {
                    tournaments = "No Data found"
                }
                return null
            })
        }


        return (
            <div style={{ backgroundImage: `url(${urlImage})`}} className="containdiv">
                <UserPanel></UserPanel>
                <div className="container containdiv2">
                    <div className="row">
                        <div className="col-md-6" >
                            <Row>   </Row>
                        </div>
                        <div className="col-sm-6" >
                            <Card className="headercard">
                                <CardBody >
                                    <div className="row headerCardTextColur"  >
                                        <div className="headerFixed_38df7 myteamShowTournamentheading">
                                            <div className="container_aa549">
                                                <div className="maxInfoText_13e5b" >Tournaments</div>
                                            </div>
                                        </div>
                                    </div>
                                    {(tournaments.length > 0) ?
                                        <div className="row myteamShowTournamentCONATIN" >
                                            {tournaments}
                                        </div> : <div className="row myteamShowTournamentCONATIN" >No Teams selected</div>}
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        showTotalScore: state.CreateteamReducer.showTornamentPlayer,
        showUserMatches: state.CreateteamReducer.TeamData,
        Tournaments: state.Tournament.Tournaments
    }
};

const mapDispatchToProps = dispatch => ({
    action: {
        UserMatchesteams: bindActionCreators(showUserMatchesAction, dispatch),
        Tournament: bindActionCreators(TournamentAction, dispatch)
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(userDashBoard);