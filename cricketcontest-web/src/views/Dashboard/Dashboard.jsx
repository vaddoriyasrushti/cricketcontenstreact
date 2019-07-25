import React from "react";
import { Card, CardHeader, CardBody, CardFooter, CardTitle, Row, Col } from "reactstrap";
import { PanelHeader, Stats } from "components";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import path from '../../path';
import * as TotalTournament from '../../action/Tournament';
import * as TotalTeam from '../../action/Team';
import * as TotalPlayer from '../../action/Player';
import * as TotalUser from '../../action/userAction';

class Dashboard extends React.Component {

  componentDidMount() {
    this.props.action.getTotalTournament.SelectTournamentAction(0, 500, "desc", "id");
    this.props.action.getTotalTeam.selectTeamAction(0, 500, "desc", "id");
    this.props.action.getTotalPlayer.getPlayer(0, 500, "id", "desc");
    this.props.action.getTotalUser.getUser();
  }

  render() {
    let tournaments = "", teams = "", players = "", users = "";
    if (this.props.tournaments) {
      tournaments = this.props.tournaments.length;
    }
    if (this.props.teams) {
      teams = this.props.teams.length;
    }
    if (this.props.players) {
      players = this.props.players.length;
    }
    if (this.props.users) {
      users = this.props.users.length;
    }

    return (
      <div>
        <PanelHeader size="lg" content={<img alt="Cricket Contest" style={{ width: '100%', height: 'fit-content' }} src={path + "Cricket-DashBoard.jpg"}></img>} />
        <Row style={{ margin: "5px" }}>
          <Col xs={12} md={3}>
            <Card className="card-chart">
              <CardHeader>
                <CardTitle tag="h4" style={{ textAlign: "center" }}>Tournaments</CardTitle>
              </CardHeader>
              <CardBody style={{ height: "150px" }}>
                <hr />
                <div className="chart-area">
                  <br />
                  <h1 style={{ textAlign: "center", marginTop: "10px" }}>{tournaments}</h1>
                </div>
              </CardBody>
              <CardFooter>
                <hr />
                <Stats>
                  {[{
                    i: "now-ui-icons sport_trophy",
                    t: "Total Tournaments"
                  }]}
                </Stats>
              </CardFooter>
            </Card>
          </Col>
          <Col xs={12} md={3}>
            <Card className="card-chart">
              <CardHeader>
                <CardTitle tag="h4" style={{ textAlign: "center" }}>Teams</CardTitle>
              </CardHeader>
              <CardBody style={{ height: "150px" }}>
                <hr />
                <div className="chart-area">
                  <br />
                  <h1 style={{ textAlign: "center", marginTop: "10px" }}>{teams}</h1>
                </div>
              </CardBody>
              <CardFooter>
                <hr />
                <Stats>
                  {[{
                    i: "now-ui-icons users_circle-08",
                    t: "Total Teams"
                  }]}
                </Stats>
              </CardFooter>
            </Card>
          </Col>
          <Col xs={12} md={3}>
            <Card className="card-chart">
              <CardHeader>
                <CardTitle tag="h4" style={{ textAlign: "center" }}>Players</CardTitle>
              </CardHeader>
              <CardBody style={{ height: "150px" }}>
                <hr />
                <div className="chart-area">
                  <br />
                  <h1 style={{ textAlign: "center", marginTop: "10px" }}>{players}</h1>
                </div>
              </CardBody>
              <CardFooter>
                <hr />
                <Stats>
                  {[{
                    i: "now-ui-icons sport_user-run ",
                    t: "Total Players"
                  }]}
                </Stats>
              </CardFooter>
            </Card>
          </Col>
          <Col xs={12} md={3}>
            <Card className="card-chart">
              <CardHeader>
                <CardTitle tag="h4" style={{ textAlign: "center" }}>Users</CardTitle>
              </CardHeader>
              <CardBody style={{ height: "150px" }}>
                <hr />
                <div className="chart-area">
                  <br />
                  <h1 style={{ textAlign: "center", marginTop: "10px" }}>{users - 1}</h1>
                </div>
              </CardBody>
              <CardFooter>
                <hr />
                <Stats>
                  {[{
                    i: "now-ui-icons users_single-02",
                    t: "Total Users"
                  }]}
                </Stats>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tournaments: state.Tournament.TournamentData,
    teams: state.Team.TeamData,
    players: state.Player.PlayerData,
    users: state.User.users
  }
}

const mapDispatchToProps = (dispatch) => ({
  action: {
    getTotalTournament: bindActionCreators(TotalTournament, dispatch),
    getTotalTeam: bindActionCreators(TotalTeam, dispatch),
    getTotalPlayer: bindActionCreators(TotalPlayer, dispatch),
    getTotalUser: bindActionCreators(TotalUser, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);