import React, { Component } from 'react';
import { Button, ModalFooter, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Select } from 'antd';
import 'antd/dist/antd.css';
import '../../view.css';
import * as teamPlayerAction from '../../../action/teamPlayer';

const Option = Select.Option;

class AddTeamPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tournamentId: 0,
            teamId: 0,
            player: [],
            selectedItems: [],
            playersSelected: [],
            submitted: false
        };

        this.tournamentNameChangeHandler = this.tournamentNameChangeHandler.bind(this);
        this.teamNameChangeHandler = this.teamNameChangeHandler.bind(this);
    }

    componentDidMount() {
        this.props.action.getTeamPlayerData.getTournaments(0, 100, "desc", "tournamentName");
        this.props.action.getTeamPlayerData.getPlayers();
    }

    tournamentNameChangeHandler(e) {
        this.props.action.getTeamPlayerData.getTeamByTournamanetId(e.target.value);
        this.setState({
            tournamentId: e.target.value
        })
        this.setState({ submitted: false });
        document.getElementById("ddteam").hidden = false;
    }

    teamNameChangeHandler(e) {
        this.setState({
            teamId: e.target.value
        })
        this.setState({ submitted: false });
        document.getElementById("ddplayer").hidden = false;
    }

    handleChange = (selectedItems) => {
        this.setState({ selectedItems: selectedItems });
    };

    submitted = () => {
        this.setState({ submitted: true });
        this.addteamplayer(true);
    }

    addteamplayer(submitted) {
        const { selectedItems } = this.state;
        if (submitted && selectedItems.length > 0) {
            var players = selectedItems;
            var result = players.map(function (x) {
                return parseInt(x, 10);
            });
            var teamplayerdata = {
                tournamentId: parseInt(this.state.tournamentId, 10),
                teamId: parseInt(this.state.teamId, 10),
                selectedPlayers: result,
                createdBy: parseInt(localStorage.getItem("userId"), 10)
            }
            this.props.action.getTeamPlayerData.AddTeamPlayer(teamplayerdata);
            this.props.toggle();
        }
    }

    render() {
        let playerData = "";
        let selectedPlayers = [];
        let playertournamentId = this.state.tournamentId;
        let tournamentOption = "";
        let tournamentTeamOption = "";
        let teamPlayersOption = "";
        if (this.props.tournaments) {
            tournamentOption = this.props.tournaments.map((tournament) => {
                return (<option key={tournament.id} value={tournament.id}>{tournament.tournamentName}</option>)
            })
        }
        if (this.props.teams.Teams) {
            tournamentTeamOption = this.props.teams.Teams.map((team) => {
                if (team.TournamentTeam) {
                    if (team.TournamentTeam.isDelete === 0) {
                        return (<option key={team.id} value={team.id}>{team.teamName}</option>)
                    }
                }
                return "";
            })
        }
        if (this.props.players) {
            playerData = this.props.tournaments.filter((tournamentplayer) => {
                return (tournamentplayer.id === parseInt(playertournamentId, 10));
            })
            if (playerData[0]) {
                selectedPlayers = playerData[0].Players.map(player => {
                    if (player.TeamPlayer) {
                        if (player.TeamPlayer.isDelete === 0) {
                            return player.id;
                        }
                    }
                    return "";
                });
            }
            teamPlayersOption = this.props.players.map((player) => {
                if (selectedPlayers.includes(parseInt(player.id, 10))) {
                    return "";
                }
                else {
                    return <Option key={player.id}>{player.firstName + " " + player.lastName}</Option>
                }
            })
        }

        return (
            <Container>
                <div className='float-right margin15'>
                    <Modal isOpen={this.props.isOpen}>
                        <ModalHeader toggle={this.props.toggle}>Team Player</ModalHeader>
                        <ModalBody>
                            <Form>
                                <FormGroup>
                                    <Label for="tournamentName">Tournament Name:</Label>
                                    <Input type="select" name="select" onChange={this.tournamentNameChangeHandler} id="tournamentName">
                                        <option key="tournament" value="" disabled="" className='dNone'>Select Tournament</option>
                                        {tournamentOption}
                                    </Input>
                                    {(this.state.submitted && this.state.tournamentId === 0) ?
                                        <div>
                                            <br />
                                            <span className='alert'>
                                                Please select a tournament
                                            </span>
                                        </div> : ""}
                                </FormGroup>
                                <FormGroup id="ddteam" hidden>
                                    <Label for="teamName">Team Name</Label>
                                    <Input type="select" name="teamName" id="teamName" onChange={this.teamNameChangeHandler} disabled={this.state.tournamentId === 0 ? true : false}>
                                        <option key="team" value="" disabled="" className='dNone'>Select Team</option>
                                        {tournamentTeamOption}
                                    </Input>
                                    <br />
                                    {(tournamentTeamOption.length < 1) ? (<span className='alert'>
                                        No team added yet!!!
                                    </span>) : ""}
                                    {(this.state.submitted && this.state.teamId === 0 && this.state.tournamentId !== 0) ?
                                        <div>
                                            <span className='alert'>
                                                Please select a team
                                            </span>
                                        </div> : null
                                    }
                                </FormGroup>
                                <FormGroup id="ddplayer" hidden>
                                    <Label for="Players">Players</Label>
                                    <Select
                                        mode="multiple"
                                        className='width100'
                                        placeholder="Select Players "
                                        value={this.state.selectedItems}
                                        onChange={this.handleChange}
                                        disabled={(this.state.teamId === 0) ? true : false}>
                                        {teamPlayersOption}
                                    </Select>
                                    {(this.state.submitted && this.state.selectedItems.length === 0 && this.state.tournamentId !== 0 && this.state.teamId !== 0) ?
                                        <div>
                                            <br />
                                            <span className='alert'>
                                                Please select at least one player
                                            </span>
                                        </div> : null
                                    }
                                </FormGroup>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="info" onClick={this.submitted}>Add</Button>
                            <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tournaments: state.teamPlayer.tournaments,
        teams: state.teamPlayer.teams,
        players: state.teamPlayer.players,
        tournamentplayer: state.teamPlayer.tournamentplayer
    }
}

const mapDispatchToProps = (dispatch) => ({
    action: {
        getTeamPlayerData: bindActionCreators(teamPlayerAction, dispatch)
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AddTeamPlayer)
