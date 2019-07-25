import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Table, Button, Input, ButtonGroup } from 'reactstrap';
import { confirmAlert } from 'react-confirm-alert';
import { PanelHeader } from "components";

import path from '../../path';
import AddTeam from '../Team/AddTeam/AddTeam';
import * as TeamAction from '../../action/Team';
import '../view.css';

import '../view.css';

class Team extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      sort: false,
      pageno: 0,
      parpageRecord: 5,
      sorting: "",
      Editdataid: [],
      sortingValueName: "id",
      sortingValue: "desc",
      pageRecord: 0,
    };
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount = () => {
    this.props.action.Team.selectTeamAction(this.state.pageno, this.state.parpageRecord, this.state.sortingValue, this.state.sortingValueName);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
      Editdataid: ""
    });
  }

  parpage = (Event) => {
    const parpage = parseInt(Event.target.value, 10);
    const pageno = 0
    this.setState({ parpageRecord: parpage, pageno: 0 })
    this.props.action.Team.selectTeamAction(pageno, parpage, this.state.sortingValue, this.state.sortingValueName);
  }

  changeRecord = (Event) => {
    let datachangeprevNext = Event.target.value;
    let pageno = 0
    if (datachangeprevNext === "Next") {
      this.setState({ pageno: this.state.pageno + 5, pageRecord: this.state.pageRecord + 5 })
      if (this.state.pageno === 0) {
        this.setState({ pageno: this.state.parpageRecord })
        pageno = this.state.parpageRecord
      } else {
        pageno = this.state.pageno + this.state.parpageRecord
      }
    }
    else if (datachangeprevNext === "Prev") {
      this.setState({ pageno: this.state.pageno - this.state.parpageRecord, pageRecord: this.state.pageRecord - 5 })
      pageno = this.state.pageno - this.state.parpageRecord
    }
    this.props.action.Team.selectTeamAction(pageno, this.state.parpageRecord, this.state.sortingValue, this.state.sortingValueName);
  }

  sortingdata = (Event) => {
    let sortingValueName;
    if (Event.target.childNodes[0].data === "Team") {
      sortingValueName = "teamName"
    }
    if (Event.target.childNodes[0].data !== "#" && Event.target.childNodes[0].data !== "Action" && Event.target.childNodes[0].data !== "Logo") {
      let sortingValue = "asc";
      if (!this.state.sortingValueName) {
        this.setState({ sortingValueName: sortingValueName })
      } else if (this.state.sortingValueName === sortingValueName) {
        if (this.state.sortingValue === "asc") {
          sortingValue = "desc"
        } else {
          sortingValue = "asc"
        }
        this.setState({ sortingValueName: sortingValueName, sortingValue: sortingValue })
      } else {
        this.setState({ sortingValueName: sortingValueName, sortingValue: "asc" })
      }
      this.props.action.Team.selectTeamAction(this.state.pageno, this.state.parpageRecord, sortingValue, sortingValueName);
    }
  }

  Edittoggle = (data) => {
    if (!data)
      alert("no data");
    else {
      const tObject = {
        id: data.id,
        teamName: data.teamName,
        teamLogo: data.teamLogo,
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
      confirmAlert({
        message: 'Are you sure you want to delete this Team?.',
        buttons: [{
          label: 'Yes',
          onClick: () => { this.props.action.Team.DeleteTeamAction(id, this.state.pageno, this.state.parpageRecord, this.state.sortingValue, this.state.sortingValueName) }
        },
        {
          label: 'No',
          onClick: () => { }
        }]
      })
    }
  }

  render() {
    let notNext = 0;
    let data = ""
    let start
    if (this.props.ShowTeam) {
      start = 0;
      start = this.state.pageno + 1;
      data = this.props.ShowTeam.map((data, key) => {
        notNext = key + 1
        return <tr key={key} className='header-center'>
          <td>{start++}</td>
          <td><img src={path + "thumbnail/" + data.teamLogo} alt="" className='teamLogo'></img></td>
          <td>{data.teamName}</td>
          <td>
            <img src={path + "edit.png"} alt="Edit" onClick={() => this.Edittoggle(data)} value={data.id} className='width25'></img>
            <img src={path + "delete1.jpg"} alt="Edit" onClick={() => this.btnDeleteClick(data.id)} className='width25'></img>
          </td>
        </tr>
      })
    }
    return (
      <div>
        <PanelHeader size="sm" />
        <div className="content">
          <AddTeam isOpen={this.state.modal} toggle={this.toggle} dataid={this.state.Editdataid} nrecord={this.state.parpageRecord}/>
          <div className='headerdiv'>
            <div className='pagenumber'>
              Show entries<Input type="select" name="select" id="exampleSelect" onChange={this.parpage.bind(Event)}>
                <option>5</option>
                <option>10</option>
                <option>25</option>
                <option>50</option>
                <option>100</option>
              </Input></div>
            <div className='addbtn'>
              <Button color="info" onClick={this.toggle} >Add</Button>
            </div>
          </div>
          {data ?
            <Table hover>
              <thead className="thead-dark">
                <tr onClick={this.sortingdata.bind(Event)} className='header-center'>
                  <th>#</th>
                  <th>Logo</th>
                  <th className='header-pointer'>Team</th>
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
              <Button color="info" onClick={this.changeRecord.bind(Event)} value="Prev" >Prev</Button>
              : ""}
            &nbsp;
            {notNext >= this.state.parpageRecord ?
              <Button color="info" onClick={this.changeRecord.bind(Event)} value="Next">Next</Button> : ""}
          </ButtonGroup>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ShowTeam: state.Team.TeamData,
  }
};

const mapDispatchToProps = dispatch => ({
  action: {
    Team: bindActionCreators(TeamAction, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Team)