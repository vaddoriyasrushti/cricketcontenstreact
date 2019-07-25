import React, { Component } from 'react';
import { ModalFooter, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Button, Label, Badge } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as matchPlayerScoreAction from '../../../action/matchPlayerScore';
import * as TournamentMatchAction from '../../../action/TournamentMatch';
import *  as TournamentPointAction from '../../../action/tournamentPoint'
import './AddTournamentMatchPlayerScore.css'

class AddMatchPlayerScore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playerScore: {},
            tournamentMatchTeam: [],
            teams: [],
            tournamentId: 0,
            matchId: 0,
            teamScore: {},
            teamId: 0,
            isError: ""
        };
    }
    componentDidMount() {
        this.props.action.TournamentMatches.SelectTournamentMatchAction(0, 100, "desc", "id");
        this.props.action.MatchPlayerScore.getTournamentMatchPlayerScore(1, 100, "desc", "id");
        this.props.action.TournamentPoint.getTournamentPointScore(0, 100, "id", "desc");
    }
    componentWillReceiveProps() {
        this.setState({ isError: "" });
    }
    tournamentNameChangedHandler(tournament, e) {
        let t = [];
        document.getElementById("teamPlayer").hidden = true
        document.getElementById("tournamentMatch").hidden = false;
        let tournamentId = parseInt(e.target.value, 10);
        let tournamentMatchTeam = "";
        if (tournament) {
            tournamentMatchTeam = tournament.map(tournament => {
                if (tournament) {
                    if (tournament.tournamentId !== tournamentId) {
                        if (this.props.MatchPlayerScore.tournamentMatchPlayerScore.length > 0) {
                            return this.props.MatchPlayerScore.tournamentMatchPlayerScore.map(scoreMatches => {
                                if (scoreMatches.tournamentMatchId && tournament) {
                                    if (scoreMatches.tournamentMatchId !== parseInt(tournament.id, 10)) {
                                        if (!t.includes(tournament.id)) {
                                            t.push(tournament.id)
                                            return (<option value={tournament.id} key={tournament.id} >{tournament.Team1[0].teamName + '  VS  ' + tournament.Team2[0].teamName + " (" + tournament.matchDate.substr(0, 10) + ")"}</option>)
                                        }
                                    }
                                }
                                return true;
                            })
                        }
                        return true
                    }
                    else {
                        return (<option value={tournament.id} key={tournament.id} >{tournament.Team1[0].teamName + '  VS  ' + tournament.Team2[0].teamName + " (" + tournament.matchDate.substr(0, 10) + ")"}</option>)
                    }
                }
                return true
            })
        }
        this.setState({
            tournamentMatchTeam: tournamentMatchTeam,
            tournamentId: tournamentId,
            isError: ""
        })
    }
    matchChangeHandler(tournament, e) {
        document.getElementById("teamPlayer").hidden = true
        document.getElementById("tournamentMatchTeams").hidden = false
        let matchId = parseInt(e.target.value, 10);
        let teams = [];
        tournament.map(tournament => {
            if (tournament) {
                return (tournament.id === matchId) ?
                    (teams.push((<option value={tournament.Team1[0].id} key={tournament.Team1[0].id} >{tournament.Team1[0].teamName}</option>),
                        teams.push(<option value={tournament.Team2[0].id} key={tournament.Team2[0].id}>{tournament.Team2[0].teamName}</option>))
                    )
                    : null
            }
            return true
        })
        this.setState({
            teams: teams,
            matchId: matchId,
            isError: ""
        })
    }

    teamChangeHandler(e) {
        document.getElementById("teamPlayer").hidden = false
        let teamId = e.target.value;
        this.setState({
            isError: "",
            teamId: teamId,
            teamScore: {
                ...this.state.teamScore,
                [teamId]: {
                    ...this.state.teamScore[teamId],
                    Totalscore: 0
                }
            }
        })
        this.props.action.MatchPlayerScore.getPlayers(this.state.tournamentId, teamId);
    }

    inputChangeHandler(playerId, e) {
        this.setState({
            isError: "",
            playerScore: {
                ...this.state.playerScore,
                [playerId]:
                {
                    ...this.state.playerScore[playerId],
                    [e.target.name]: parseInt(e.target.value, 10),
                    score: 0,
                    teamId: this.state.teamId
                }
            }
        })
    }

    addTournamentMatchPlayerScore() {
        let { tournamentId, matchId, playerScore } = this.state;
        if (tournamentId === 0 || matchId === 0 || Object.keys(playerScore).length === 0) {
            this.setState({ isError: 'All fields are required' });
        }
        else {
            Object.entries(this.state.playerScore).map(([key, value]) => {
                if (this.props.TournamentPoint.get_points.length > 0) {
                    this.props.TournamentPoint.get_points.map(tournamentPoint => {
                        if (tournamentPoint.tournamentId === this.state.tournamentId) {
                            Object.entries(tournamentPoint.pointJson).map(([pointType, pointValue]) => {
                                let from, to;
                                if (pointType === "Catch") {
                                    for (var Cpv in pointValue) {
                                        from = parseInt((pointValue[Cpv].from), 10);
                                        to = parseInt((pointValue[Cpv].to), 10);
                                        if (from <= value.catch && to >= value.catch) {
                                            value.score += parseInt(pointValue[Cpv].point, 10)
                                            break;
                                        }
                                    }
                                }
                                if (pointType === "Wicket") {
                                    for (var Wpv in pointValue) {
                                        from = parseInt((pointValue[Wpv].from), 10);
                                        to = parseInt((pointValue[Wpv].to), 10);
                                        if (from <= value.wicket && to >= value.wicket) {
                                            value.score += parseInt(pointValue[Wpv].point, 10)
                                            break;
                                        }
                                    }

                                }
                                if (pointType === "Runs") {
                                    for (var Rpv in pointValue) {
                                        from = parseInt((pointValue[Rpv].from), 10);
                                        to = parseInt((pointValue[Rpv].to), 10);
                                        Object.entries(this.state.teamScore).map(([key, score]) => {
                                            if (key === value.teamId) {
                                                score.Totalscore += value.runs;
                                            }
                                            return true;
                                        })
                                        if (from <= value.runs && to >= value.runs) {
                                            value.score += parseInt(pointValue[Rpv].point, 10)
                                            break;
                                        }
                                    }
                                }
                                if (pointType === "Stumping") {
                                    for (var Spv in pointValue) {
                                        from = parseInt((pointValue[Spv].from), 10);
                                        to = parseInt((pointValue[Spv].to), 10);
                                        if (from <= value.stumping && to >= value.stumping) {
                                            value.score += parseInt(pointValue[Spv].point, 10)
                                            break;
                                        }
                                    }
                                }
                                if (pointType === "Four") {
                                    for (var Fpv in pointValue) {
                                        from = parseInt((pointValue[Fpv].from), 10);
                                        to = parseInt((pointValue[Fpv].to), 10);
                                        if (from <= value.four && to >= value.four) {
                                            value.score += parseInt(pointValue[Fpv].point, 10)
                                            break;
                                        }
                                    }

                                }
                                if (pointType === "Six") {
                                    for (var Sixpv in pointValue) {
                                        from = parseInt((pointValue[Sixpv].from), 10);
                                        to = parseInt((pointValue[Sixpv].to), 10);
                                        if (from <= value.six && to >= value.six) {
                                            value.score += parseInt(pointValue[Sixpv].point, 10)
                                            break;
                                        }
                                    }
                                }
                                return true;
                            })
                        }
                        return true;
                    })
                }
                let finalScore = {
                    tournamentId: this.state.tournamentId,
                    tournamentMatchId: this.state.matchId,
                    playerId: parseInt(key, 10),
                    wicket: value.wicket,
                    run: value.runs,
                    catch: value.catch,
                    six: value.six,
                    four: value.four,
                    stumping: value.stumping,
                    score: value.score
                }
                this.props.action.MatchPlayerScore.addTournamentMatchPlayerScore(finalScore);
                this.setState({
                    playerScore: {}
                })
                return ""
            })
            let TeamValues = Object.values(this.state.teamScore);
            let TeamKeys = Object.keys(this.state.teamScore);
            let winId = 0;
            if (TeamValues[0] && TeamValues[1]) {
                if (TeamValues[0].Totalscore > TeamValues[1].Totalscore) {
                    winId = TeamKeys[0];
                }
                else if (TeamValues[0].Totalscore === TeamValues[1].Totalscore) {
                    winId = 0;
                }
                else {
                    winId = TeamKeys[1];
                }
                this.props.toggleAdd();
                this.props.action.MatchPlayerScore.updateWinning(this.state.matchId, parseInt(winId, 10));
            }
            else {
                this.setState({ isError: 'All fields are required' });
            }
        }
    }

    render() {
        let tournamentNameOption = {};
        if (this.props.TournamentMatches.allmatchs.length > 0) {
            tournamentNameOption = this.props.TournamentMatches.allmatchs.map((tournamentMatch) => {
                var d1 = new Date(tournamentMatch.matchDate);
                var d2 = new Date(new Date().toISOString());
                return (d1 < d2) ? tournamentMatch : null
            })
        }
        let tournament = []
        let t = [];
        if (tournamentNameOption.length > 0) {
            tournament = tournamentNameOption.map(tournament => {
                if (tournament) {
                    if (!t.includes(tournament.Tournament.id)) {
                        t.push(tournament.Tournament.id);
                        return <option value={tournament.Tournament.id} key={tournament.Tournament.id}>{tournament.Tournament.tournamentName}</option>
                    }
                }
                return null;
            })
        }
        let player = "";
        if (this.props.MatchPlayerScore.players.length > 0) {
            player = this.props.MatchPlayerScore.players.map(player => {
                if (player.Players) {
                    return player = player.Players.map((p) => {
                        return <tr key={p.id} className="playerScore" >
                            <td><Badge color="secondary" className="BadgeScore">{p.firstName + ' ' + p.lastName}</Badge></td>
                            <td><Input type="text" name="runs" placeholder="0" onChange={this.inputChangeHandler.bind(this, p.id)} defaultValue={(this.state.playerScore[p.id]) ? this.state.playerScore[p.id]["runs"] : ""} /></td>
                            <td><Input type="text" name="four" placeholder="0" onChange={this.inputChangeHandler.bind(this, p.id)} defaultValue={(this.state.playerScore[p.id]) ? this.state.playerScore[p.id]["four"] : ""} /></td>
                            <td><Input type="text" name="six" placeholder="0" onChange={this.inputChangeHandler.bind(this, p.id)} defaultValue={(this.state.playerScore[p.id]) ? this.state.playerScore[p.id]["six"] : ""} /></td>
                            <td><Input type="text" name="catch" placeholder="0" onChange={this.inputChangeHandler.bind(this, p.id)} defaultValue={(this.state.playerScore[p.id]) ? this.state.playerScore[p.id]["catch"] : ""} /></td>
                            <td><Input type="text" name="stumping" placeholder="0" onChange={this.inputChangeHandler.bind(this, p.id)} defaultValue={(this.state.playerScore[p.id]) ? this.state.playerScore[p.id]["stumping"] : ""} /></td>
                            <td><Input type="text" name="wicket" placeholder="0" onChange={this.inputChangeHandler.bind(this, p.id)} defaultValue={(this.state.playerScore[p.id]) ? this.state.playerScore[p.id]["wicket"] : ""} /></td>
                        </tr>
                    })
                }
                return true;
            })
        }
        return (
            <Modal isOpen={this.props.isOpen} >
                <ModalHeader toggle={this.props.toggleAdd} >
                    MatchPlayerScore
                </ModalHeader>
                <ModalBody >
                    <Form>
                        <FormGroup>
                            <Label for="SelectTournament">Select Tournament</Label>
                            <Input required={true} type="select" name="tournament" onChange={this.tournamentNameChangedHandler.bind(this, tournamentNameOption)} >
                                <option hidden>select</option>
                                {tournament}
                            </Input>
                        </FormGroup>
                        <FormGroup hidden id="tournamentMatch">
                            <Label for="SelectTournament">Select Match</Label>
                            <Input required={true} type="select" name="match" onChange={this.matchChangeHandler.bind(this, tournamentNameOption)} >
                                <option hidden>select</option>
                                {this.state.tournamentMatchTeam}
                            </Input>
                        </FormGroup>
                        <FormGroup hidden id="tournamentMatchTeams">
                            <Label for="SelectTournament">Select Team</Label>
                            <Input required={true} type="select" name="team" onChange={this.teamChangeHandler.bind(this)} >
                                <option hidden>select</option>
                                {this.state.teams}
                            </Input>
                        </FormGroup>
                        <FormGroup hidden id="teamPlayer">
                            {(player) ?
                                <table className="header-center">
                                    <thead>
                                        <tr>
                                            <th>Player</th>
                                            <th className="green">Runs</th>
                                            <th className="green">Four</th>
                                            <th className="green">Six</th>
                                            <th className="red">Catch</th>
                                            <th className="red">Stump</th>
                                            <th className="red">Wicket</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {player}
                                    </tbody>
                                </table> : ""}
                        </FormGroup>
                        {(this.state.isError !== '') ?
                            (<span className='span-error'>{this.state.isError}</span>) : null}
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="info" onClick={() => this.addTournamentMatchPlayerScore()}>Submit</Button>
                    <Button color="secondary" onClick={this.props.toggleAdd}>Cancel</Button>
                </ModalFooter>
            </Modal>
        );
    }
}
const mapStateToProps = state => {
    return {
        MatchPlayerScore: state.MatchPlayerScore,
        TournamentMatches: state.TournamentMatchs,
        TournamentPoint: state.TournamentPoint
    }
}
const mapDispatchToProps = dispatch => ({
    action: {
        MatchPlayerScore: bindActionCreators(matchPlayerScoreAction, dispatch),
        TournamentMatches: bindActionCreators(TournamentMatchAction, dispatch),
        TournamentPoint: bindActionCreators(TournamentPointAction, dispatch)
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(AddMatchPlayerScore);