import React, { Component } from 'react';
import { Row, Card, CardBody } from 'reactstrap';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import UserPanel from '../../UserPanel/userPanel'
import path from '../../../path';
import * as  showUserMatchesAction from '../../../action/user/Createteam';
import * as TournamentAction from '../../../action/Tournament';

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
        this.props.history.push('/CreateTeam/' + id);
    }

    render() {
        let temp, temp2 = [];
        this.props.showUserMatches.map((usermatches, i) => {
            if (temp !== usermatches.tournamentId) {
                temp2.push(usermatches.tournamentId)
            }
            temp = usermatches.tournamentId
            return null
        })
        let tournaments = '';
        if (this.props.Tournaments.length) {
            tournaments = this.props.Tournaments.map((tournament, i) => {
                if (!temp2.includes(tournament.id)) {
                    return (
                        <Card key={tournament.id} body style={{ borderRadius: "10px", cursor: "pointer", margin: "10px 20px", background: "" }} onClick={() => this.handletornamentteams(tournament.id)}>
                            <div className="row" style={{ textAlign: "center" }}>
                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 ">
                                    <img alt="demo" src={path + "thumbnail/" + tournament.tournamentBanner} style={{ width: "150" }} ></img>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6" style={{ margin: "auto", float: "center" }}>
                                    <p style={{ fontSize: "20px" }}> {tournament.tournamentName}</p>
                                </div>
                                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                                </div>
                            </div>
                        </Card>)
                }
                return null
            })
        } else {
            tournaments = "No Data found"
        }
        return (
            <div style={{ backgroundImage: `url(${urlImage})`, backgroundAttachment: "fixed", height: "100vh", backgroundSize: 'cover', paddingTop: '62px' }}>
                <UserPanel></UserPanel>
                <div className="container" style={{ overflow: 'auto', height: 'calc(100vh - 62px)' }}>
                    <div className="row">
                        <div className="col-md-6" style={{}}>
                            <Row></Row>
                        </div>
                        <div className="col-sm-6">
                            <Card style={{ background: "linear-gradient(104deg, #3c3c3c 47%, #323232" }}>
                                <CardBody>
                                    <div className="row" style={{ color: "white" }} >
                                        <div className="headerFixed_38df7" style={{ height: "80px" }}>
                                            <div className="container_aa549">
                                                <div className="maxInfoText_13e5b" style={{ fontSize: "30px" }}>Tournaments</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row" style={{ background: "#e6e6e6" }}>
                                        {tournaments}
                                    </div>
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