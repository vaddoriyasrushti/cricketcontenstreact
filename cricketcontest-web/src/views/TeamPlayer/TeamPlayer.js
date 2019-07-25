import React, { Component } from 'react'
import { Table, Input, Button, ButtonGroup } from "reactstrap";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { PanelHeader } from "components";
import { Collapse, Button as AntButton, Modal as AntModal, Popconfirm } from 'antd';
import 'antd/dist/antd.css';

import path from '../../path';
import './TeamPlayer.css'
import * as teamPlayerAction from '../../action/teamPlayer';
import AddTeamPlayer from './AddTeamPlayer/AddTeamPlayer';
import '../view.css';
const Panel = Collapse.Panel;
let notNext = 0;

class TeamPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            visible: false,
            tournamentId: 0,
            teamId: 0,
            sort: false,
            pageno: 0,
            recordPerPage: 5,
            sorting: "",
            Editdataid: [],
            sortingValueName: "tournamentName",
            sortingValue: "desc"
        };

        this.toggle = this.toggle.bind(this);
        this.showTeamModal = this.showTeamModal.bind(this);
    }

    componentDidMount() {
        this.props.action.getTeamPlayerData.getTournaments(this.state.pageno, this.state.recordPerPage, this.state.sortingValue, this.state.sortingValueName);
    }

    showTeamModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }

    toggle() {
        const { modal } = this.state;
        this.setState({
            modal: !modal
        });
    }

    sortingdata = (Event) => {
        let sortingValueName = Event.target.childNodes[0].data;
        if (sortingValueName === "Tournament") {
            sortingValueName = "tournamentName";
        }
        if (sortingValueName !== "Team" && sortingValueName !== "Banner") {
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
            this.props.action.getTeamPlayerData.getTournaments(this.state.pageno, this.state.recordPerPage, sortingValue, sortingValueName);
        }
    }

    perPage = (Event) => {
        const perPage = parseInt(Event.target.value, 10);
        this.setState({ recordPerPage: perPage })
        this.setState({ pageno: 0 });
        this.props.action.getTeamPlayerData.getTournaments(0, perPage, this.state.sortingValue, this.state.sortingValueName);
    }

    changeRecord = (Event) => {
        let datachangeprevNext = Event.target.value;
        let pageno = 0;
        if (datachangeprevNext === "Next") {
            this.setState({ pageno: this.state.pageno + 5 })
            if (this.state.pageno === 0) {
                this.setState({ pageno: this.state.recordPerPage })
                pageno = this.state.recordPerPage
            } else {
                pageno = this.state.pageno + this.state.recordPerPage
            }
        }
        else if (datachangeprevNext === "Prev") {
            this.setState({ pageno: this.state.pageno - this.state.recordPerPage })
            pageno = this.state.pageno - this.state.recordPerPage
        }
        this.props.action.getTeamPlayerData.getTournaments(pageno, this.state.recordPerPage, this.state.sortingValue, this.state.sortingValueName);
    }

    CollapseChangeHandler(teamId) {
        this.setState({ teamId: teamId });
        this.props.action.getTeamPlayerData.getPlayerOfTeam(this.state.tournamentId, teamId);
    }

    renderTable(teamplayer, key) {
        notNext = key + 1
        return (
            <tbody key={teamplayer.id}>
                <tr className='header-center'>
                    <td>{key + this.state.pageno + 1}</td>
                    <td><img src={path + 'thumbnail/' + teamplayer.tournamentBanner} alt="Banner"></img></td>
                    <td>{teamplayer.tournamentName}</td>
                    <td><Button color="info" onClick={() => this.showTeamHandler(teamplayer.id)} >Show Teams</Button></td>
                </tr>
            </tbody>
        );
    }

    showTeamHandler(tournamentId) {
        this.showTeamModal();
        this.setState({ tournamentId: tournamentId });
        this.props.action.getTeamPlayerData.getTeamByTournamanetId(tournamentId);
    }

    DeleteHandler(teamplayerid) {
        this.props.action.getTeamPlayerData.deleteTeamPlayer(teamplayerid, parseInt(localStorage.getItem("userId"), 10));
    }

    rendershowTeamsModal() {
        let player = [];
        if (this.props.playerofteam) {
            this.props.playerofteam.map(playerdata => {
                return player.push(playerdata.Players.map(p => {
                    return <ul key={p.id}>
                        <li>{p.firstName}{' '}{p.lastName}
                            <Popconfirm title="Are you sure you want to remove this player from this team?" okText="Yes" cancelText="No" onConfirm={this.DeleteHandler.bind(this, playerdata.id)}>
                                <AntButton style={{ left: "90%", position: "sticky" }} type="danger" icon="delete" />
                            </Popconfirm>
                        </li>
                    </ul>
                }))
            });
        }
        return (
            <AntModal
                title="Team"
                visible={this.state.visible}
                onCancel={this.handleCancel}
                footer={
                    <AntButton type="primary" onClick={this.handleCancel}>Ok</AntButton>}>
                {(this.props.teams.Teams) ?
                    this.props.teams.Teams.map((data) => {
                        if (data.TournamentTeam) {
                            if (data.TournamentTeam.isDelete === 0) {
                                return (
                                    <Collapse key={data.TournamentTeam.id} onChange={this.CollapseChangeHandler.bind(this, data.id)} accordion>
                                        <Panel header={data.teamName}>
                                            {(player.length > 0) ? player : <p className="noTeams">No Players found</p>}
                                        </Panel>
                                    </Collapse>
                                );
                            }
                        }
                        return "";
                    }) : <p>No Teams</p>
                }
            </AntModal>
        );
    }

    render() {
        let teamplayerdetails = "";
        if (this.props.tournaments.length !== 0) {
            teamplayerdetails = this.props.tournaments.map((teamplayer, key) => this.renderTable(teamplayer, key))
        }
        else {
            teamplayerdetails = <tbody><tr><td colSpan="4" className="header-center">No Record</td></tr></tbody>;
        }
        return (
            <div>
                <PanelHeader size="sm" />
                <div className="content">
                    {this.state.modal ? <AddTeamPlayer isOpen={this.state.modal} toggle={this.toggle} /> : null}
                    <div className='headerdiv'>
                        <div className='pagenumber'>
                            Show entries
                            <Input type="select" name="select" id="exampleSelect" onChange={this.perPage.bind(Event)}>
                                <option>5</option>
                                <option>10</option>
                                <option>25</option>
                                <option>50</option>
                                <option>100</option>
                            </Input>
                        </div>
                        <div className='addbtn'>
                            <Button color="info" onClick={this.toggle} >Add</Button>                           
                        </div>
                    </div>
                    <Table hover>
                        <thead className="thead-dark">
                            <tr className='headerdiv' onClick={this.sortingdata.bind(Event)}>
                                <th>#</th>
                                <th>Banner</th>
                                <th className='header-pointer'>Tournament</th>
                                <th>Team</th>
                            </tr>
                        </thead>
                        {teamplayerdetails}
                    </Table>
                    <ButtonGroup>
                        {this.state.pageno !== 0 ?
                            <Button color="info" onClick={this.changeRecord.bind(Event)} value="Prev">Prev</Button>
                            : <Button color="info" onClick={this.changeRecord.bind(Event)} value="Prev" hidden>Prev</Button>}
                        &nbsp;
                        {notNext >= this.state.recordPerPage ?
                            <Button color="info" onClick={this.changeRecord.bind(Event)} value="Next">Next</Button> :
                            <Button color="info" onClick={this.changeRecord.bind(Event)} value="Next" hidden>Next</Button >}
                    </ButtonGroup>
                </div>
                {this.rendershowTeamsModal()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tournaments: state.teamPlayer.tournaments,
        teams: state.teamPlayer.teams,
        playerofteam: state.teamPlayer.playerofteam
    }
}

const mapDispatchToProps = (dispatch) => ({
    action: {
        getTeamPlayerData: bindActionCreators(teamPlayerAction, dispatch)
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(TeamPlayer);

