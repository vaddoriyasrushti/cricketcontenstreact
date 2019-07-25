import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Table, Button, Input, ButtonGroup } from 'reactstrap';
import { PanelHeader } from "components";

import * as TournamentMatchAction from '../../action/TournamentMatch';
import * as TournamentAction from '../../action/Tournament';
import AddTournamentMatch from './AddTournamentMatch/addTournamentMatch'
import path from '../../path';
import Timer from './DisplayTimer/displaytimer';
import WinnerModal from './winnerModal'
import '../view.css';
class TournamentMatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      tournamentid: 'selected',
      sort: false,
      pageno: 0,
      parpageRecord: 5,
      sorting: "",
      Editdataid: [],
      sortingValueName: "matchDate",
      sortingValue: "asc",
      showWinner: false,
      data: ''
    };
    this.toggle = this.toggle.bind(this);
  }

  componentWillMount = () => {
    this.props.action.TournamentAction.fetchTournamentDataAction();
    this.props.action.TournamentMatchAction.SelectTournamentMatchAction(this.state.pageno, this.state.parpageRecord, this.state.sortingValueName, this.state.sortingValue);
  }

  sortingdata = () => {
    let sortingValueName = 'matchDate';
    let sortingValue = "asc";
    if (this.state.sortingValueName === sortingValueName) {
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
    this.props.action.TournamentMatchAction.SelectTournamentMatchAction(this.state.pageno, this.state.parpageRecord, sortingValueName, sortingValue);
  }

  parpage = (Event) => {
    const nrecord = parseInt(Event.target.value, 10);
    this.setState({ pageno: 0 });
    this.props.action.TournamentMatchAction.SelectTournamentMatchAction(0, nrecord, this.state.sortingValueName, this.state.sortingValue);
    this.setState({ parpageRecord: nrecord })
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
    this.props.action.TournamentMatchAction.SelectTournamentMatchAction(pageno, this.state.parpageRecord, this.state.sortingValueName, this.state.sortingValue);
  }

  handlechangetournament = (Event) => {
    this.setState({ [Event.target.name]: Event.target.value })
    if (Event.target.value !== 'selected') {
      this.setState({ pageno: 0 });
      this.props.action.TournamentMatchAction.getTournamentMatch(Event.target.value);
    }
    else {
      let { pageno } = this.state;
      this.setState({ pageno: 0 });
      this.props.action.TournamentMatchAction.SelectTournamentMatchAction(pageno, this.state.parpageRecord, this.state.sortingValueName, this.state.sortingValue);
    }
  }

  toggle(Event) {
    this.setState({
      modal: !this.state.modal,
      Editdataid: null
    });
  }

  winningTeam = (data) => {
    this.setState({ data: data });
    this.setState({ showWinner: true })

  }
  toggleWinner = () => {
    const { showWinner } = this.state;
    this.setState({ showWinner: !showWinner });
  }
  Edittoggle = (data) => {
    if (!data) {
      alert("no data");
    } else {
      const tObject = {
        id: data.id,
        tournamentName: data.tournamentName,
        tournamentDescription: data.tournamentDescription
      }
      this.setState({
        modal: !this.state.modal,
        Editdataid: tObject
      });
    }
  }

  render() {
    let notNext = 0;
    let data = "";
    let start = 0;
    if (this.state.tournamentid === 'selected') {
      if (this.props.TournamentMatchs && this.props.TournamentMatchs.length > 0) {
        start = 0;
        start = this.state.pageno + 1;
        data = this.props.TournamentMatchs.map((data, key) => {
          notNext = key + 1
          let d = new Date(data.matchDate);
          let cdate = new Date();
          var remaintime = Math.round((d - cdate));
          var remainday = Math.round((d - cdate) / (1000 * 60 * 60 * 24));
          return <tr key={key}>
            <td className='header-center'>{start++}</td>
            <td className='header-center'>{data.Tournament.tournamentName}</td>
            <td><img src={path + "thumbnail/" + data.Team1[0].teamLogo} className='float-right' alt="TeamImage" />
              {
                (data.winningTeamId === data.Team1[0].id) ? <img className='team-1-badge' src={path + 'winbadge.png'} height="35px" width="30px" alt="" /> : null
              }
            </td>
            <td className='header-center'>{data.Team1[0].teamName}  <b> VS</b>   {data.Team2[0].teamName}</td>
            <td><img src={path + "thumbnail/" + data.Team2[0].teamLogo} alt="TeamImage" />
              {
                (data.winningTeamId === data.Team2[0].id) ? <img className='team-2-badge' src={path + 'winbadge.png'} height="35px" width="30px" alt="" /> : null
              }
            </td>
            <td className='header-center'>{d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear()}</td>
            {(remaintime > 0) ? (
              (remainday > 5) ?
                (<td className='header-center'>{remainday + ' days '}</td>) : (<td className='header-center' ><Timer date={data.matchDate} /></td>)
            ) : (
                <td className='header-center header-pointer' onClick={() => this.winningTeam(data)}> {'Finished'} </td>)
            }
          </tr>
        })
      }
      else {
        data = <tr><td colSpan="7" className='header-center'>No Match Exists</td></tr>
      }

    }
    else {
      if (this.props.TournamentMatchById && this.props.TournamentMatchById.length > 0) {
        data = this.props.TournamentMatchById.map((data, key) => {
          notNext = key + 1
          let d = new Date(data.matchDate);
          let cdate = new Date().getTime();
          var remainday = Math.round((d - cdate) / (1000 * 60 * 60 * 24));
          remainday = Math.round((d - cdate) / (1000 * 60 * 60 * 24));
          return <tr key={key}>
            <td className='header-center'>{key + 1}</td>
            <td><img src={path + "thumbnail/" + data.Team1[0].teamLogo} className='float-right' alt="TeamImage" />
              {
                (data.winningTeamId === data.Team1[0].id) ? <img className='team-one-badge' src={path + 'winbadge.png'} height="35px" width="30px" alt="" /> : null
              }
            </td>
            <td className='header-center'>{data.Team1[0].teamName}  <b> VS</b>   {data.Team2[0].teamName}</td>
            <td><img src={path + "thumbnail/" + data.Team2[0].teamLogo} alt="TeamImage" />
              {
                (data.winningTeamId === data.Team2[0].id) ? <img className='team-two-badge' src={path + 'winbadge.png'} height="35px" width="30px" alt="" /> : null
              }
            </td>
            <td className='header-center'>{d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear()}</td>
            {(remainday > 0) ? (
              (remainday > 5) ?
                (<td className='header-center'>{remainday + ' days '}</td>) : (<td className='header-center'><Timer date={data.matchDate} /></td>)
            ) : (
                <td className='header-center header-pointer' onClick={() => this.winningTeam(data)}> {'Finished'} </td>)
            }
          </tr>
        })
      }
      else {
        data = <tr><td colSpan="6" className='header-center'>No Match Exists</td></tr>
      }
    }

    let tournamentD = "";
    if (this.props.Tournament.length > 0 && this.props.Tournament) {
      tournamentD = this.props.Tournament.map((data, key) => {
        return <option value={data.id} key={key}>{data.tournamentName}</option>
      })

    }

    return (
      <div>
        <PanelHeader size="sm" />
        <div className="content" >
          {
            (this.state.data !== '') ? (
              <WinnerModal isOpen={this.state.showWinner} data={this.state.data} toggleWinner={this.toggleWinner} />
            ) : null
          }
          <AddTournamentMatch tournamentid={this.state.tournamentid} isOpen={this.state.modal} toggle={this.toggle} nrecord={this.state.parpageRecord} >  </AddTournamentMatch>
          <div className="headerdiv" >
            {
              (this.state.tournamentid === 'selected') ? (
                <div className='pagenumber'>
                  Show entries<Input type="select" name="select" id="exampleSelect" onChange={this.parpage.bind(Event)}>
                    <option>5</option>
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                    <option>100</option>
                  </Input>
                </div>
              ) : null
            }
            <div className="tournamentselect">
              Tournament<Input type="select" name="tournamentid" id="exampleSelect" onChange={this.handlechangetournament.bind(Event)}>
                <option value={'selected'}>All Selected</option>
                {tournamentD}
              </Input>
            </div>
            <div className="addbtn">
              <Button color="info" onClick={this.toggle} >Add</Button>
            </div>
          </div>
          {data ?
            <Table hover>
              <thead className="thead-dark">
                {
                  (this.state.tournamentid === 'selected') ? (
                    <tr onClick={this.sortingdata.bind(Event)}>
                      <th className='header-center header-pointer'>#</th>
                      <th id={'tournamentId'} className='header-center header-pointer'>Tournament</th>
                      <th colSpan="3" className='header-pointer header-center' id={'tournamentId'} >Teams</th>
                      <th className='header-pointer header-center'>Date</th>
                      <th className='header-pointer header-center'>Remaining Time</th>
                    </tr>
                  ) : (
                      <tr>
                        <th className='header-center'>#</th>
                        <th colSpan="3" className='header-center' id={'tournamentId'} >Teams</th>
                        <th className='header-center'>Date</th>
                        <th className='header-center'>Remaining Time</th>
                      </tr>
                    )
                }

              </thead>
              <tbody>
                {data}
              </tbody>
            </Table> : ""}
          {
            (this.state.tournamentid === 'selected') ? (
              <ButtonGroup>
                {this.state.pageno !== 0 ?
                  <Button color="info" onClick={this.changeRecord.bind(Event)} value="Prev">Prev</Button>
                  : <Button color="info" onClick={this.changeRecord.bind(Event)} value="Prev" hidden>Prev</Button>}
                &nbsp;
                {notNext >= this.state.parpageRecord ?
                  <Button color="info" onClick={this.changeRecord.bind(Event)} value="Next">Next</Button> :
                  <Button color="info" onClick={this.changeRecord.bind(Event)} value="Next" hidden>Next</Button >}
              </ButtonGroup>
            ) : null
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    TournamentMatchs: state.Tournament.allmatchs,
    Tournament: state.Tournament.Tournamentss,
    AddTournament: state.Tournament.Tournamentss,
    TournamentMatchById: state.Tournament.tournamentMatches
  }
};

const mapDispatchToProps = (dispatch) => ({
  action: {
    TournamentMatchAction: bindActionCreators(TournamentMatchAction, dispatch),
    TournamentAction: bindActionCreators(TournamentAction, dispatch)
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(TournamentMatch)
