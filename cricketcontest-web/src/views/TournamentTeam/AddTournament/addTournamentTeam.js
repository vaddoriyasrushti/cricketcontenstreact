import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { bindActionCreators } from 'redux';

import { Container, Button, ModalFooter, Modal, ModalHeader, ModalBody, Form, FormGroup, Label } from 'reactstrap';
import { Select } from 'antd';
import '../tournamentTeam.css';
import '../../view.css';

import * as TournamentAction from '../../../action/Tournament';
import * as TeamAction from '../../../action/Team';
import * as TournamentTeamAction from '../../../action/TournamentTeam';

class AddTournament extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tournamentId: "",
      teams: [],
      tournamentTeams: [],
      createdBy: 0,
      submitted: false,
      noCallNext: 0,
      checkAll: false
    }
  }

  componentWillMount = () => {
    const userId = localStorage.getItem("userId");
    this.setState({ createdBy: userId });
    let { checkAll } = this.props;
    this.setState({ checkAll: !checkAll });
  }

  componentDidMount = () => {
    this.props.action.Tournament.fetchTournamentDataAction();
    this.props.action.Team.fetchTeamAction();
  }

  submitted = () => {
    this.setState({ submitted: true });
    this.AddData(true);
  }

  AddData = (submitted) => {
    const { teams } = this.state;
    let tournamentIdd = this.props.tournament.id;
    if (submitted && teams.length > 0) {
      let newTeams = this.props.TeamsData.filter((team) => {
        return teams.includes(team.id)
      })
      newTeams.map((team) => {
        let id = team.id;
        this.props.action.TournamentTeam.AddTournamentTeamAction({ tournamentId: tournamentIdd, teamId: id, createdBy: this.state.createdBy }, team);
        return true;
      });
      this.setState({ tournamentId: '', teams: [], submitted: false, noCallNext: 0 });
      this.props.refresh();
      this.props.toggle("1", this.state.checkAll);

    }
  }

  handleSelect = (e) => {
    this.setState({ teams: e });
    let id = e[e.length - 1];
    this.props.action.Team.getTeamAction(id);
  }

  closeModal = () => {
    this.setState({ tournamentId: '', teams: [], submitted: false, noCallNext: 0 });
    this.props.toggle(1);
  }
  render() {
    const Option = Select.Option;
    let teamNames = "";
    if (this.props.teamsdata && this.props.teamsdata.length > 0) {
      teamNames = this.props.teamsdata.map((team) => {
        return <Option value={team.id} id={team.id} key={team.id}>{team.teamName}</Option>
      })
    }

    const { teams } = this.state;

    return (
      <Container>
        <div className="containerDiv">
          <Modal isOpen={this.props.isOpen} >
            <ModalHeader toggle={this.closeModal} >Tournament</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label for="exampleSelect">Select Team Name</Label>
                  <Select
                    mode="multiple"
                    name="teamId"
                    style={{ width: '100%' }}
                    placeholder="Select Teams"
                    value={teams}
                    onChange={this.handleSelect}
                  >{teamNames}
                  </Select>

                  {(this.state.submitted && this.state.teams.length === 0 && this.props.tournament.id !== '') ?
                    <div>
                      <br />
                      <span className="alert">
                        Please select at least one team
                        </span>
                    </div> : null}
                </FormGroup>
              </Form>
            </ModalBody>

            <ModalFooter>
              <Button color="info" onClick={this.submitted}>Submit</Button>{' '}
              <Button color="secondary" onClick={this.closeModal}>Cancel</Button>
            </ModalFooter>

          </Modal>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ShowTornamentAll: state.Tournament.Tournamentss,
    ShowTeamAll: state.Team.TeamData,
    Team: state.Team.Team,
    TeamsData: state.Team.TeamSData,
    ShowTornament: state.Tournament.Tournaments
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    action: {
      Tournament: bindActionCreators(TournamentAction, dispatch),
      Team: bindActionCreators(TeamAction, dispatch),
      TournamentTeam: bindActionCreators(TournamentTeamAction, dispatch)
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddTournament))
