import React, { Component } from 'react';
import { Container, Button, ModalFooter, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { bindActionCreators } from 'redux';
import { DatePicker, Select } from 'antd';
import moment from 'moment';

import * as TournamentAction from '../../../action/Tournament';
import * as TeamAction from '../../../action/Team';
import * as TournamentMatchAction from '../../../action/TournamentMatch';
import '../../view.css';


class AddTournamentMatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tournamentId: "",
      tournamentTeams: [],
      teams: [],
      teams2: [],
      team1: "",
      team2: "",
      date: '',
      isErrordate: '',
      isError: '',
      isteams: [],
      time: '',
      noteam1:'',
      noteam2:''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.action.Tournament.fetchTournamentDataAction();
  }

  handleChange = (e) => {
    if (e.target.name === "tournamentId") {
      this.setState({ [e.target.name]: e.target.value });
      this.setState({ date: '', time: '', isErrordate: '', teams: '', team1: '', team2: '', isError: '',noteam1:'',noteam2:'' });
      this.handleDatePickerChange();
    }
  }
  validateDate = (mdate, date) => {
    let date1 = new Date(mdate);
    let date2 = new Date(date);
    let matchDay = date1.getDate();
    let matchMonth = date1.getMonth() + 1;
    let matchYear = date1.getFullYear();
    let day = date2.getDate();
    let month = date2.getMonth() + 1;
    let year = date2.getFullYear();
    if (matchYear === year && matchMonth === month && matchDay === day)
      return true;
    return false;
  }

  disabledDate(current) {
    return current && current < moment().subtract(1, 'days');
  }
  handleDatePickerChange = (e) => {
    if (e)
      this.setState({ date: e._d})
    else {
      this.setState({ date: ''})
        }
    this.setState({time: '', teams: '', team1: '', team2: '', isError: '', isErrordate: '',noteam1:'',noteam2:''})
  }
  handleChangeTeam = (e) => {
    let filterTeam = -1;
    this.setState({ isErrordate: '', isError: '',noteam2:'' });
    this.setState({ [e.target.name]: parseInt(e.target.value, 10) });
    if (e.target.name === 'team1') {
      this.props.ShowTornamentAll.map((tournament) => {
        if (tournament.TournamentMatches.length > 0) {
          tournament.TournamentMatches.map((match) => {
            if (this.validateDate(this.state.date, match.matchDate)) {
              if (parseInt(e.target.value, 10) === parseInt(match.Team1[0].id, 10)) {
                filterTeam = match.Team2[0].id;
              }
              else if (parseInt(e.target.value, 10) === parseInt(match.Team2[0].id, 10)) {
                filterTeam = match.Team1[0].id;
              }
            }
            return filterTeam
          })
        }
        return (tournament.id === parseInt(this.state.tournamentId, 10)) ? (
          (tournament.Teams.length >0)?(
            this.setState({ teams2: tournament.Teams })
          ):(this.setState({noteam2:'* Match Already Scheduled'}))
          
        ) : null;
      })
      let newteams = this.state.teams.filter(team => {
        return team.id !== filterTeam && team.id!==parseInt(e.target.value, 10);
      })
      if(newteams.length > 0){
        this.setState({ teams2: newteams });
      }
       else{
         this.setState({noteam2:'* Match Already Scheduled'})
       }
    }
  }

  handleTimeChange = (e) => {
    this.setState({ team1: '', team2: '', isError: '' ,noteam1:''});
    let { date } = this.state;
    let d = new Date(date);
    let dateTime = d.toDateString().concat(' ' + e + " GMT");

    let current = new Date();
    let mydate = new Date(dateTime);
    if ((mydate - current) <= 900000) {
      this.setState({ isErrordate: '* Too late to set a match on selected time ' });
    }
    else {
      this.setState({ date: dateTime });
      this.setState({ time: e });
      let teams = [];
      this.setState({ isErrordate: '' });
      this.props.action.Team.fetchTeamAction();
      this.props.ShowTornamentAll.map((tournament) => {
        if (tournament.TournamentMatches.length > 0) {
          tournament.TournamentMatches.map((match) => {
            if ((new Date(match.matchDate) - new Date(dateTime)) === 0) {
              this.setState({ isErrordate: '* A match is already fixed on this date,select another' });
              this.setState({ isteams: '' });
              return '';
            }
            return null;
          })
        }
        return (tournament.id === parseInt(this.state.tournamentId, 10)) ? (
            (tournament.Teams.length > 0)?(
              this.setState({ teams: tournament.Teams })
            ):(this.setState({noteam1:'* No team Added yet'}))
        ) : null;
      })
      this.setState({ isteams: teams });
    }
  }
  addrecord = (e) => {
    let { tournamentId, team1, team2, date } = this.state;
    if (team1 === '' || team2 === '') {
      this.setState({ isError: '* All fields are required. Please complete the form.' });

    }
    else {
      const obj = {
        tournamentId: tournamentId,
        teamId1: team1,
        teamId2: team2,
        matchDate: date
      }
      let tournament = this.props.ShowTornamentAll.filter(tournament => {
        return tournament.id === parseInt(tournamentId, 10);
      })

      let teamid1 = this.props.ShowTeamAll.filter(team => {
        return team.id === parseInt(team1, 10);
      })

      let teamid2 = this.props.ShowTeamAll.filter(team => {
        return team.id === parseInt(team2, 10);
      })
      if (this.props.tournamentid === 'selected')
        this.props.action.TournamentMatch.AddTournamentMatchAction(obj, tournament, teamid1, teamid2, '', this.props.nrecord);
      else
        this.props.action.TournamentMatch.AddTournamentMatchAction(obj, tournament, teamid1, teamid2, this.props.tournamentid);
      this.closeModal();
    }
  }

  closeModal = () => {
    this.setState({
      tournamentId: "",
      tournamentTeams: [],
      teams: [],
      team1: "",
      team2: "",
      date: '',
      isErrordate: '',
      isError: '',
      isteams: [],
      time: '',
      noteam1:'',
      noteam2:''
    })
    this.props.toggle();
  }

  render() {
    const Option = Select.Option;
    const { tournamentId } = this.state;
    let data = "";
    if (this.props.ShowTornamentAll && this.props.ShowTornamentAll.length > 0) {
      data = this.props.ShowTornamentAll.map((tournament) => {
        return <option value={tournament.id}
          id={tournament.id}
          key={tournament.id}>
          {tournament.tournamentName}
        </option>
      });
    }

    const { team1, isteams } = this.state;
    let teamlist1 = ""
    if (this.state.teams !== '') {
      let filteredteams = this.state.teams.filter(team => {
        return !isteams.includes(team.id)
      })
      if (filteredteams !== '') {
        teamlist1 = filteredteams.map((t1, key) => {
          return <option value={t1.id} id={t1.id} key={t1.id}>{t1.teamName}</option>
        })
      }
    }

    const { team2 } = this.state;
    let teamlist2 = ""
    let filteredteams2 = this.state.teams2.filter(team => {
      return !isteams.includes(team.id)
    })
    if (team1 !== '') {
      if (filteredteams2 !== '') {
        teamlist2 = filteredteams2.map((t2, key) => {
          if (this.state.team1 !== t2.id)
            return <option value={t2.id} id={t2.id} key={t2.id}>{t2.teamName}</option>
          else
            return '';
        })
      }
    }

    return (
      <Container>
        <div className="containerDiv">
          <Modal isOpen={this.props.isOpen} >
            <ModalHeader toggle={this.closeModal} >Tournament Match</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label for="exampleSelect">Select Tournament Name</Label>
                  <Input required={true} onChange={this.handleChange} type="select" name="tournamentId" value={tournamentId}>
                    <option hidden>select</option>
                    {data}
                  </Input>
                </FormGroup>
                {
                  (this.state.tournamentId !== '') ? (
                    <FormGroup>
                      <Label for="exampleSelect">Select Match Date</Label>
                      {"   "}
                      <DatePicker
                        placeholder='Select Date'
                        disabledDate={this.disabledDate}
                        onChange={this.handleDatePickerChange}
                        allowClear={true}
                      />
                      {
                        (this.state.date !== '' || this.state.time !== '') ? (
                          <Select value={(this.state.time !== '') ? this.state.time : 'select'} style={{ width: 120, paddingLeft: '10px' }} onSelect={this.handleTimeChange}>
                            <Option value="select" hidden>select</Option>
                            <Option value="02:30:00">Morning</Option>
                            <Option value="7:30:00">Afternoon</Option>
                            <Option value="14:00:00">Evening</Option>
                          </Select>
                        ) : null
                      }

                    </FormGroup>
                  ) : null
                }
                {
                  (this.state.time !== '' && this.state.isErrordate === '') ? 
                    (<span className='span-display' >{ new Date(this.state.date).toString()}</span>) : null
                }
                {
                  (this.state.isErrordate !== '') ?
                    (<span className='span-error' >{this.state.isErrordate}</span>) : null
                }
                {
                  (this.state.noteam1 !== '') ?
                    (<span className='span-error'>{this.state.noteam1}</span>) : null
                }
                {
                  (this.state.time !== '' && this.state.isErrordate === '' && this.state.noteam1 === '') ? (
                    <FormGroup>
                      <Label for="exampleSelect">Select Team 1</Label>
                      <Input required={true} onChange={this.handleChangeTeam} type="select" name="team1" value={team1}>
                        <option hidden>select</option>
                        {teamlist1}
                      </Input>
                    </FormGroup>
                  ) : null
                }
                {
                  (this.state.noteam2 !== '') ?
                    (<span className='span-error'>{this.state.noteam2}</span>) : null
                }
                {
                  (this.state.team1 !== '' && this.state.noteam2 === '') ? (
                    <FormGroup>
                      <Label for="exampleSelect">Select Team 2</Label>
                      <Input required={true} onChange={this.handleChangeTeam} type="select" name="team2" value={team2}>
                        <option hidden>select</option>
                        {teamlist2}
                      </Input>
                    </FormGroup>
                  ) : null
                }
                {
                  (this.state.isError !== '') ?
                    (<span className='span-error'>{this.state.isError}</span>) : null
                }
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="info" onClick={this.addrecord.bind(this)} >Submit</Button>{''}
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
    ShowTeamAll: state.Team.TeamData
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    action: {
      Tournament: bindActionCreators(TournamentAction, dispatch),
      Team: bindActionCreators(TeamAction, dispatch),
      TournamentMatch: bindActionCreators(TournamentMatchAction, dispatch)
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddTournamentMatch))
