import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Table, Button, Input, ButtonGroup } from 'reactstrap';
import { message, Empty } from 'antd';

import AddTournament from '../tournament/AddTournament/addTournament';
import ShowTeams from '../TournamentTeam/showTeams';
import { PanelHeader } from "components";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import path from '../../path';


import * as TournamentTeamAction from '../../action/TournamentTeam';
import * as TeamAction from '../../action/Team';
import * as TournamentAction from '../../action/Tournament';

import '../view.css';

class tournament extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      modal: false,
      sort: false,
      pageno: 0,
      parpageRecord: 5,
      sorting: "",
      Editdataid: [],
      sortingValueName: "id",
      sortingValue: "desc",
      tournament: {},
      refresh: true,
      filteredteams: [],
      teamsdata: [],
      forRender: true
    };
    this.toggle = this.toggle.bind(this);
  }

  componentWillMount = () => {
    this.props.action.Tournament.fetchTournamentAction(this.state.pageno, this.state.parpageRecord, this.state.sortingValue, this.state.sortingValueName);
    this.props.action.Team.fetchTeamAction();
    const userId = localStorage.getItem("userId");
    this.setState({ updatedBy: userId });
  }

  refresh = () => {

    this.setState({ refresh: !this.state.refresh });
  }

  sortingdata = (Event) => {
    let sortingValueName = ""
    if (Event.target.childNodes[0].data === "Tournament") {
      sortingValueName = "tournamentName"
    } else if (Event.target.childNodes[0].data === "Description") {
      sortingValueName = "tournamentDescription";
    }
    if (sortingValueName !== "Action") {
      let sortingValue = "asc";
      if (!this.state.sortingValueName) {
        this.setState({ sortingValueName: sortingValueName })
      }
      else if (this.state.sortingValueName === sortingValueName) {
        if (this.state.sortingValue === "asc") {
          sortingValue = "desc"
        } else {
          sortingValue = "asc"
        }
        this.setState({ sortingValueName: sortingValueName, sortingValue: sortingValue })
      }
      else {
        this.setState({ sortingValueName: sortingValueName, sortingValue: "asc" })
      }
      this.props.action.Tournament.fetchTournamentAction(this.state.pageno, this.state.parpageRecord, sortingValue, sortingValueName);
    }
  }

  parpage = (Event) => {
    const parpage = parseInt(Event.target.value, 10);
    const pageno = 0
    this.setState({ parpageRecord: parpage, pageno: 0 })
    this.props.action.Tournament.fetchTournamentAction(pageno, parpage, this.state.sortingValue, this.state.sortingValueName);
  }

  changeRecord = (Event) => {
    let datachangeprevNext = Event.target.value;
    let pageno = 0
    if (datachangeprevNext === "Next") {
      this.setState({ pageno: this.state.pageno + 5 })
      if (this.state.pageno === 0) {
        this.setState({ pageno: this.state.parpageRecord })
        pageno = this.state.parpageRecord
      } else {
        pageno = this.state.pageno + this.state.parpageRecord
      }
    }
    else if (datachangeprevNext === "Prev") {
      this.setState({ pageno: this.state.pageno - this.state.parpageRecord })
      pageno = this.state.pageno - this.state.parpageRecord
    }
    this.props.action.Tournament.fetchTournamentAction(pageno, this.state.parpageRecord, this.state.sortingValue, this.state.sortingValueName);
  }

  toggle(Event) {
    this.setState({
      modal: !this.state.modal,
      Editdataid: null
    });
  }
  toggleTeam = () => {
    this.setState({
      visible: !this.state.visible
    });
  }

  ShowTeam = (tournament) => {
    this.props.action.Team.fetchTeamAction();
    if (tournament.Teams === undefined) {
      let Teams = [];
      tournament = { ...tournament, Teams };
    }
    this.setState({
      tournament: tournament,
      visible: true
    })
  }

  handleDelete = (tournamnetId, team) => {

    const { forRender } = this.state;
    message.success("successfully deleted");
    this.toggleTeam();
    let updatedBy = parseInt(this.state.updatedBy, 10);

    team.map(teamId => {
      this.props.action.TournamentTeam.DeleteTournamentTeamAction(tournamnetId, teamId, updatedBy);
      return teamId;
    })

    this.setState({ visible: true, forRender: !forRender });
  }

  Edittoggle = (data) => {
    if (data) {
      const tObject = {
        id: data.id,
        tournamentName: data.tournamentName,
        tournamentDescription: data.tournamentDescription,
        tournamentBanner: data.tournamentBanner,
        imagebanner: true
      }
      this.setState({
        modal: !this.state.modal,
        Editdataid: tObject
      });
    }
  }

  btnDeleteClick = (id) => {
    if (!id) {
      alert("no data");
    } else {
      if (this.props.ShowTornament.length !== 0) {
        this.props.ShowTornament.map((data, key) => {
          if (data.id === id) {
            if (data.TournamentMatches.length <= 0 && data.Teams.length <= 0) {
              confirmAlert({
                message: 'Are you sure you want to delete this Tournament?.',
                buttons: [{
                  label: 'Yes',
                  onClick: () => { this.props.action.Tournament.DeleteTournamentAction(id, this.state.pageno, this.state.parpageRecord, this.state.sortingValue, this.state.sortingValueName) }
                },
                {
                  label: 'No',
                  onClick: () => { }
                }
                ]
              })
            }
            else {
              confirmAlert({
                message: 'You cannot delete this tournament as it is being processed! ',
                buttons: [{ label: 'Ok' }]
                })
            }
          }
          return Empty;
        })
      }
    }
  }

  render() {
    let teamsdata = [];
    let notNext = 0;
    let data = ""
    let start = 0;
    if (this.state.tournament.Teams !== {}) {
      let teams = this.state.tournament.Teams;

      if (this.props.ShowTeamAll && this.props.ShowTeamAll.length > 0) {
        let teamId
        if (teams) {
          if (teams.length > 0) {
            teamId = teams.filter((team) => {
              let teamStatus = team.TournamentTeam;
              return (teamStatus.isDelete === 0)
            })

            let team_id = teamId.map((team) => {
              return team.id
            })

            teamsdata = this.props.ShowTeamAll.filter((team) => {
              return !team_id.includes(team.id);
            })
          }

          else if (teams.length === 0) {
            teamsdata = this.props.ShowTeamAll
          }
        }
        else if (teams === undefined) {
          teamsdata = this.props.ShowTeamAll
        }
      }
    }

    if (this.props.ShowTornament.length !== 0) {
      start = this.state.pageno + 1
      data = this.props.ShowTornament.map((data, key) => {
        notNext = key + 1
        return <tr key={key} className='header-center'>
          <td>{start++}</td>
          <td><img src={path + 'thumbnail/' + data.tournamentBanner} alt="" ></img></td>
          <td>{data.tournamentName}</td>
          <th onClick={() => this.ShowTeam(data)}><Button color="info">Teams</Button></th>
          <td><img src={path + "edit.png"} alt="Edit" onClick={() => this.Edittoggle(data)} value={data.id} className='width25'></img>
            <img src={path + "delete1.jpg"} alt="Edit" onClick={() => this.btnDeleteClick(data.id)} className='width25'></img>
          </td>
        </tr>
      })
    }
    else {
      data = <tr><td colSpan="5" className="tCenter">No Record</td></tr>;
    }

    return (
      <div>
        <PanelHeader size="sm" />
        {(teamsdata) ? (
          <ShowTeams tournament={this.state.tournament}
            teamid={this.state.teamid}
            tournamentid={this.state.tournamentid}
            deleteClick={this.handleDelete}
            visible={this.state.visible}
            toggleTeam={this.toggleTeam}
            refresh={this.refresh}
            filter={this.state.filteredteams}
            teamsdata={teamsdata}
            forRender={this.state.forRender}
          />) : null}
        <div className="content"  >
          <AddTournament isOpen={this.state.modal} toggle={this.toggle} dataid={this.state.Editdataid} />
          <div className='headerdiv'>
            <div className='pagenumber'>
              Show entries<Input type="select" name="select" id="exampleSelect" onChange={this.parpage.bind(Event)}>
                <option>5</option>
                <option>10</option>
                <option>25</option>
                <option>50</option>
                <option>100</option>
              </Input>
            </div>
            <div className="addbtn">
              <Button color="info" onClick={this.toggle} >Add</Button>
            </div>
          </div>
          {data ?
            <Table hover>
              <thead className="thead-dark">
                <tr onClick={this.sortingdata.bind(Event)} className='header-center'>
                  <th>#</th>
                  <th className='header-pointer'>Banner</th>
                  <th className='header-pointer'>Tournament</th>
                  <th>Teams</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data}
              </tbody>
            </Table>
            : ""}
          <ButtonGroup>
            {this.state.pageno !== 0 ?
              <Button color="info" onClick={this.changeRecord.bind(Event)} value="Prev">Prev</Button>
              : ""}
            &nbsp;
              {notNext >= this.state.parpageRecord ?
              <Button color="info" onClick={this.changeRecord.bind(Event)} value="Next">Next</Button> :
              ""}
          </ButtonGroup>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ShowTornament: state.Tournament.Tournaments,
    ShowTeamAll: state.Team.TeamData,
    Team: state.Team.Team,
    TeamsData: state.Team.TeamSData,
    Tournament: state.Tournament.FetchSingleTournamentData
  }
};

const mapDispatchToProps = dispatch => ({
  action: {
    Tournament: bindActionCreators(TournamentAction, dispatch),
    Team: bindActionCreators(TeamAction, dispatch),
    TournamentTeam: bindActionCreators(TournamentTeamAction, dispatch)
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(tournament)
