import React from 'react';
import { Table, Badge } from 'reactstrap';
import { Button, Empty } from 'antd';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import path from '../../../path';
import UserPanel from '../../UserPanel/userPanel';
import ViewPlayerScore from './ViewPlayerScore/viewPlayerScore';
import * as  showUserMatchesAction from '../../../action/user/Createteam'
import '../style.css';

class Players extends React.Component {
  state = {
    visible: false,
    scoredata: []
  }

  componentDidMount = () => {
    this.getTournamentMatch();
  }

  getTournamentMatch() {
    let userid = localStorage.getItem("userId")
    this.props.action.UserMatchesteams.Show_My_TeamData(userid);
    this.props.action.UserMatchesteams.show_Tornament_Player(this.props.match.params.id)
  }

  showModal = (data) => {
    let bindScoreData = {
      playerId: data.playerId,
      tournamentId: data.tournamentId
    }
    this.setState({
      visible: true,
      scoredata: bindScoreData
    });
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }
  showuserTeamPlayer = () => {
    let playersId = []
    return playersId = this.props.showUserMatches.map((usermatches, i) => {
      return playersId.push(usermatches.playerId)
    })
  }
  render() {
    let playersId = []
    playersId = this.showuserTeamPlayer();
    let singleplayer = []
    let totalScore = 0;
    if (this.props.showTotalScore) {
      this.props.showTotalScore.map(data => {
        if (!singleplayer.includes(data.playerId)) {
          singleplayer.push(data.playerId);
          if (playersId.includes(data.playerId)) {
            totalScore = totalScore + data.score
          }
        }
        return null
      })
    }
    let players, no = 1;
    if (this.props.showUserMatches.length !== 0) {
      players = this.props.showUserMatches.map((data, key) => {
        if (data.tournamentId === parseInt(this.props.match.params.id, 10)) {
          return <tr key={key}>
            <th scope="row">{no++}</th>
            <th><img alt="logo1" src={path + "/thumbnail/" + data.Players[0].playerImage} className="Plyearimage" ></img></th>
            <td>{data.Players[0].firstName}{"  "}{data.Players[0].lastName}</td>
            <td>{data.Players[0].description}</td>
            <td><Button type="primary" onClick={() => this.showModal(data)}>show Score</Button></td>
          </tr>
        }
        return Empty
      })
    }
    return (<div >
      <UserPanel></UserPanel>
      <ViewPlayerScore
        visible={this.state.visible}
        onCancel={this.handleCancel}
        binddata={this.state.scoredata} />
      <div className="container PlayearshowcountPoint" >
        {totalScore ?
          (
            <div className="row">
              <div className="col-md-4"></div>
              <div className="col-md-4"></div>
              <div className="col-md-4 PlayearshowcountPointdiv" >
                <Badge className="secondary PlayearShowCountPointShowPointDiv" >  Total Points :{totalScore}</Badge>
              </div>
            </div>
          )
          : ""}

        {players !== "" ?
          <Table>
            <thead >
              <tr>
                <th>#</th>
                <th>Avtar</th>
                <th>Name</th>
                <th>Detail</th>
                <th>View Point</th>
              </tr>
            </thead>
            <tbody>
              {players}
            </tbody>
          </Table>
          : <h3>No Data</h3>}
      </div>
    </div >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    showTotalScore: state.CreateteamReducer.showTornamentPlayer,
    showUserMatches: state.CreateteamReducer.TeamData,
  }
};
const mapDispatchToProps = dispatch => ({
  action: {
    UserMatchesteams: bindActionCreators(showUserMatchesAction, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Players);