import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";

import { Checkbox, Col, Row, Button, Popconfirm, Icon, Modal } from 'antd';
import { Button as ReactButton } from 'reactstrap';


import AddTournamentTeam from '.././TournamentTeam/AddTournament/addTournamentTeam';

import * as TournamentTeamAction from '../../action/TournamentTeam';
import * as TournamentAction from '../../action/Tournament';

import '../view.css';
import 'antd/dist/antd.css';

class ShowTeams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addModal: false,
      teamModal: false,
      visible: false,
      toggle: this.props.toggle,
      tournament: {},
      team: [],
      indeterminate: true,
      checkAll: false,
      tournamentId: "",
      callNotnext: 0,
      checked: false
    }
    this.toggle = this.toggle.bind(this);
  }

  componentDidUpdate = () => {
    if (this.props.tournament.id !== undefined && !this.state.callNotnext) {
      this.setState({ tournamentId: this.props.tournament.id, callNotnext: 1 })
    }
  }

  deleteClick = (d, d2) => {
    this.setState({
      team: [],
      indeterminate: true,
      checkAll: false
    });
    this.props.deleteClick(d, d2);
  }

  toggle(id, checkAll) {
    let { checked } = this.state
    this.setState({
      addModal: !this.state.addModal,
      Editdataid: null,
    });
    if (!checkAll === true) {
      let teams = this.props.tournament.Teams.map(team => {
        return team.id
      });
      this.setState({
        team: checked ? teams : [], indeterminate: false,
        checkAll: false
      })
    }
    if (id === "1") {
      this.props.history.push('/tournament');
    }
    else {
      this.props.toggleTeam();
    }
    this.props.toggleTeam(); this.props.toggleTeam();

  }

  Change = (e) => {
    debugger;
    this.setState({ team: e });
    e.length === this.props.tournament.Teams.length ? this.setState({ checkAll: true, indeterminate: false }) : this.setState({ checkAll: false, indeterminate: e.length === 0 ? false : true })

  }

  onCheckAllChange = (e) => {
    debugger;
    //let {checked} = this.state;
    let teams = this.props.tournament.Teams.map(team => {
      return team.id
    });
    this.setState({
      team: e.target.checked ? teams : [], indeterminate: false,
      checkAll: e.target.checked
    })
  }

  closeModal = () => {
    this.setState({
      team: [],
      indeterminate: true,
      checkAll: false
    });
    this.props.toggleTeam();
  }

  render() {

    let sTournament = '';
    let { tournament } = this.props;

    if (this.props.Tournaments && this.props.Tournaments.length > 0) {
      sTournament = this.props.Tournaments.filter(t => {
        return t.id === tournament.id;
      })
    }
    let teams = ((sTournament[0] ? sTournament[0].Teams : null))
    let teamNames = '';
    if (teams && teams.length > 0) {
      teamNames = teams.map((team, i) => {
        return <Row key={i} className="divTeam">
          <Col span={23}>
            <Checkbox value={team.id}>
              {team.teamName}
            </Checkbox>
          </Col>
        </Row>
      })
    }

    return (
      <div>
        <AddTournamentTeam
          isOpen={this.state.addModal}
          toggle={this.toggle}
          tournamentid={this.state.tournamentId}
          tournament={this.props.tournament}
          refresh={this.props.refresh}
          teamsdata={this.props.teamsdata}
          checkAll={this.state.checkAll}
        />

        <Modal title={tournament.tournamentName}
          visible={this.props.visible}
          onCancel={this.closeModal}
          footer={null} >
          <div className='mbml'>

            {!teams || teams.length === 0 ?
              <div>

                <div>
                  <p className='noTeams'> No Teams found in {tournament.tournamentName}</p>
                </div>
                <div className='float-right'>
                  <div onClick={this.toggle}><ReactButton color="info" >Add Team</ReactButton></div>
                </div>
              </div> :
              <div>
                <Checkbox indeterminate={this.state.indeterminate}
                  checked={this.state.checkAll}
                  onChange={this.onCheckAllChange}>
                  Check all
                </Checkbox>
                <div className='float-right'>
                  <div onClick={this.toggle}><ReactButton color="info" >Add Team</ReactButton></div>
                </div>
              </div>
            }
          </div>

          <Checkbox.Group className='width100' onChange={this.Change} value={this.state.team}>
            {teamNames}
          </Checkbox.Group>

          <Popconfirm title="Do you want to delete these teams?"
            onConfirm={() => this.deleteClick(tournament.id, this.state.team)} okText="Yes" cancelText="No">
            <Button className='plInherit' hidden={this.state.team.length > 0 ? false : true}
              type="danger">
              Delete
                <span className='pl5'>
                <Icon type='delete' style={{ verticalAlign: "text-bottom" }} />
              </span>
            </Button>
          </Popconfirm>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { Tournament } = state;
  return {
    Tournaments: Tournament.Tournaments
  }
}

const mapDispatchToProps = dispatch => ({
  action: {
    TournamentTeam: bindActionCreators(TournamentTeamAction, dispatch),
    Tournament: bindActionCreators(TournamentAction, dispatch)
  }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ShowTeams))





