import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Table, Button, Input, ButtonGroup } from 'reactstrap';
import { confirmAlert } from 'react-confirm-alert';
import { PanelHeader } from "components";

import 'react-confirm-alert/src/react-confirm-alert.css';
import * as PlayerAction from '../../action/Player';
import AddPlayer from '../Player/AddPlayer/AddPlayer';
import path from '../../path';

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      Player: {
        firstName: "",
        lastName: "",
        dob: "",
        gender: 1,
        description: "",
        playerImage: [],
        showimage: false
      },
      pageRecord: 0,
      noOfRecords: 5,
      sortFiled: 'firstName',
      sortType: 'ASC'
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  componentDidMount() {
    this.getPlayerData(this.state.pageRecord, this.state.noOfRecords, this.state.sortFiled, this.state.sortType);
  }

  calculateAge(dobString) {
    var dob = new Date(dobString);
    var ageDifMs = Date.now() - dob.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  getPlayerData(start, end, sortFiled, sortType) {
    this.props.action.Player.getPlayer(start, end, sortFiled, sortType);
  }

  showEntriesChanged(e) {
    let noOfRecords = parseInt(e.target.value, 10);
    let pageRecord = 0;
    this.setState({
      pageRecord: pageRecord,
      noOfRecords: noOfRecords
    })
    this.getPlayerData(pageRecord, noOfRecords, this.state.sortFiled, this.state.sortType);
  }

  btnPageChangeClick(e) {
    let pageRecord = 0;
    let noOfRecords = parseInt(this.state.noOfRecords, 10);
    if (e.target.name === "Prev") {
      pageRecord = this.state.pageRecord - this.state.noOfRecords;
    }
    else if (e.target.name === "Next") {
      pageRecord = this.state.pageRecord + this.state.noOfRecords;
    }
    this.setState({
      pageRecord: pageRecord
    })
    this.getPlayerData(pageRecord, noOfRecords, this.state.sortFiled, this.state.sortType);
  }

  sortingChangedHandler(e) {
    let sortingField = e.target.childNodes[0].data;
    let sortType = "ASC";
    if (sortingField !== "Avtar" && sortingField !== "Action" && sortingField !== "Description") {
      if (sortingField === "Age") sortingField = "dob"
      if (sortingField === "Name") sortingField = "firstName";
      if (sortingField === "Gender") sortingField = "gender";
      if (this.state.sortFiled === sortingField) {
        if (this.state.sortType === sortType) {
          sortType = 'DESC'
        } else {
          sortType = 'ASC'
        }
      }
      else {
        sortType = 'DESC'
      }
      this.setState({
        sortFiled: sortingField,
        sortType: sortType
      })
      this.getPlayerData(this.state.pageRecord, this.state.noOfRecords, sortingField, sortType);
    }
  }

  btnAddClick() {
    this.setState({
      Player: {
        id: "",
        firstName: "",
        lastName: "",
        dob: "",
        gender: 1,
        description: "",
        playerImage: [],
        showimage: false
      },
      Edit: false,
    })
    this.toggle();
  }

  btnEditClick(player) {
    this.setState({
      Player: {
        ...player,
        showimage: true,
        displayImage: ""
      },
      Edit: true,
    })
    this.toggle();
  }

  btnDeleteClick(id) {
    confirmAlert({
      message: 'Are you sure you want to delete this player?.',
      buttons: [{
        label: 'Yes',
        onClick: () => {
          this.props.action.Player.deletePlayer(id, this.state.pageRecord, this.state.noOfRecords, this.state.sortFiled, this.state.sortType);
        }
      },
      {
        label: 'No',
        onClick: () => { }
      }
      ]
    })
  }
  render() {
    let player = '';
    let start = 0;
    if (this.props.Player) {
      start = 0;
      start = this.state.pageRecord + 1;
      player = this.props.Player.PlayerData.map((player, key) => {
        return <tr key={key} className="header-center" >
          <td>{start++}</td>
          <td><img src={path + 'thumbnail/' + player.playerImage} alt="playerImage" /></td>
          <td>{player.firstName}&nbsp;{player.lastName}</td>
          <td>{this.calculateAge(player.dob).toString()}</td>
          <td>{(player.gender === 1) ? "Male" : "Female"}</td>
          <td>{player.description}</td>
          <td>
            <img src={path + "edit.png"} className="width25" alt="edit" onClick={() => this.btnEditClick(player)} ></img>
            <img src={path + "delete1.jpg"} className="width25" alt="delete" onClick={() => this.btnDeleteClick(player.id)} ></img>
          </td>
        </tr>
      })
    } else { return <tr>No Player Found</tr> }
    return (
      <div>
        <PanelHeader size="sm" />
        <div className="content">
          <AddPlayer noOfRecords={this.state.noOfRecords} isOpen={this.state.modal} toggle={this.btnAddClick.bind(this)} data={this.state} nrecord={this.state.noOfRecords}> </AddPlayer>
          <div className="headerdiv">
            <div className='pagenumber'>
              Show entries
                <Input type="select" name="select" onChange={this.showEntriesChanged.bind(this)}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </Input>
            </div>
            <div className="addbtn">
              <Button color="info" onClick={this.toggle} >Add</Button>
            </div>
          </div>
          <Table hover>
            <thead className="thead-dark">
              <tr className="header-center" onClick={this.sortingChangedHandler.bind(this)}>
                <th>#</th>
                <th>Avtar</th>
                <th className="header-pointer">Name</th>
                <th className="header-pointer">Age</th>
                <th className="header-pointer">Gender</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {player}
            </tbody>
          </Table>
          <ButtonGroup>
            {(this.state.pageRecord !== 0) ? <Button color="info" onClick={this.btnPageChangeClick.bind(this)} name="Prev">Prev</Button> : null}&nbsp;
            {(start >= this.state.pageRecord + this.state.noOfRecords) ?
              <Button color="info" onClick={this.btnPageChangeClick.bind(this)} name="Next">Next</Button> : null}
          </ButtonGroup>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const { Player } = state
  return {
    Player: Player
  }
};

const mapDispatchToProps = dispatch => ({
  action: {
    Player: bindActionCreators(PlayerAction, dispatch)
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(Player);