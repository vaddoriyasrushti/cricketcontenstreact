import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Table, Button, Badge } from 'reactstrap';
import { Modal as AntModal, Collapse } from 'antd';
import { PanelHeader } from "components";

import * as TournamentMatch from '../../action/TournamentMatch';
import * as  MatchPlayerScore from '../../action/matchPlayerScore';
import AddMatchPlayerScore from './AddTournamentMatchPlayerScore/AddTournamentMatchPlayerScore';

import 'antd/dist/antd.css';
import './TournamentMatchPlayer.css';

const Panel = Collapse.Panel;

class TournamenMatchPlayerScore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            showModal: false,
            matchPlayerScore: [],
            playes: [],
            teamName: "",
            score: [],
            tournamentId: 0,
            matchId: ''
        };
        this.toggleMatchPlayerScore = this.toggleMatchPlayerScore.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    componentDidMount() {
        this.getTournamentMatch();
        this.getMatchPlayerScore(0, 100, "id", "desc");
    }

    getTournamentMatch() {
        this.props.action.TournamentMatches.SelectTournamentMatchAction(0, 100, "id", "desc");
    }

    getMatchPlayerScore(offset, perPageRecord, fieldName, order) {
        this.props.action.MatchPlayerScore.getTournamentMatchPlayerScore(offset, perPageRecord, fieldName, order);
    }

    toggleMatchPlayerScore() {
        this.setState({
            visible: !this.state.visible
        });
    }

    toggleModal() {
        this.setState({
            showModal: !this.state.showModal
        })
    }

    btnAddClick() {
        this.toggleModal();
    }

    getTournamentMatchPlayerScoreByMatch(tournamentId, teamId, tournamentMatchId) {
        this.props.action.MatchPlayerScore.getPlayers(tournamentId, teamId);
        this.setState({
            visible: true,
            tournamentId: tournamentId,
            matchId: tournamentMatchId
        })
    }

    CollapsePlayerHandler(playerId) {
        let Score = "";
        if (this.props.MatchPlayerScore.tournamentMatchPlayerScore) {
            Score = this.props.MatchPlayerScore.tournamentMatchPlayerScore.map(score => {
                return (score.playerId === playerId) ? score : ''
            })
        }
        this.setState({ score: [].concat(Score) });
    }

    render() {
        let tournamentMatch = [];
        let start = 1;
        const { score } = this.state;
        let matchscore = [];
        if (this.props.MatchPlayerScore.tournamentMatchPlayerScore.length > 0) {
            tournamentMatch = this.props.MatchPlayerScore.tournamentMatchPlayerScore.map(matchScore => {
                if (this.props.TournamentMatches.allmatchs.length > 0) {
                    return this.props.TournamentMatches.allmatchs.map((tournamentmatch, key) => {
                        if (tournamentmatch.tournamentId === matchScore.tournamentId && tournamentmatch.id === matchScore.tournamentMatchId) {
                            if (!matchscore.includes(tournamentmatch.id)) {
                                matchscore.push(tournamentmatch.id);
                                return <tr key={key} className="header-center">
                                    <td>{start++}</td>
                                    <td>{tournamentmatch.Tournament.tournamentName}</td>
                                    <td>
                                        <Button className="team1Btn" color="info" onClick={() => this.getTournamentMatchPlayerScoreByMatch(tournamentmatch.tournamentId, tournamentmatch.Team1[0].id, matchScore.tournamentMatchId)} name="team1">
                                            {tournamentmatch.Team1[0].teamName}
                                        </Button>
                                    </td>
                                    <td>
                                        <b>VS</b>
                                    </td>
                                    <td>
                                        <Button className="team2Btn" color="info" onClick={() => this.getTournamentMatchPlayerScoreByMatch(tournamentmatch.tournamentId, tournamentmatch.Team2[0].id, matchScore.tournamentMatchId)} name="team2">
                                            {tournamentmatch.Team2[0].teamName}
                                        </Button>
                                    </td>
                                </tr>
                            }
                        }
                        return true;
                    })
                }
                return true;
            })

        }
        else {
            tournamentMatch = <tr><th>No data available</th></tr>;
        }
        return (
            <div>
                <PanelHeader size="sm" />
                <div className="content">
                    <AntModal title="Players"
                        visible={this.state.visible}
                        onCancel={this.toggleMatchPlayerScore}
                        footer={null}>
                        {(this.props.players && this.props.players.length > 0) ?
                            this.props.players.map((player) => {
                                if (player.Players) {
                                    return (player.Players.map((p) => {
                                        if (p)
                                            return (<Collapse accordion key={p.id} onChange={this.CollapsePlayerHandler.bind(this, p.id)}>
                                                <Panel header={p.firstName + '  ' + p.lastName} key={p.id}>
                                                    {(score.length > 0) ? score.map((data, i) => {
                                                        return (data !== '') ? (
                                                            (p.id === data.playerId && this.state.tournamentId === data.tournamentId && this.state.matchId === data.tournamentMatchId) ? (
                                                                <Table key={i}>
                                                                    <tbody>
                                                                        <tr>
                                                                            <th className="header-center">Runs</th>
                                                                            <td>{data.run}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th className="header-center"><b>Six  </b></th>
                                                                            <td>{data.six}</td>
                                                                        </tr>
                                                                        <tr >
                                                                            <th className="header-center"><b>Four  </b></th>
                                                                            <td>{data.four}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th className="header-center"><b>Catch  </b></th>
                                                                            <td>{data.catch}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th className="header-center"><b>Stumping  </b></th>
                                                                            <td>{data.stumping}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th className="header-center"><b>Wicket  </b></th>
                                                                            <td>{data.wicket}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th className="header-center"><b>Score </b></th>
                                                                            <td><Badge color="success"><h4 className="badgeH1">{data.score}</h4></Badge></td>
                                                                        </tr>
                                                                    </tbody>
                                                                </Table>
                                                            ) : null
                                                        ) : null
                                                    }) : <p>Player score not available</p>}
                                                </Panel>
                                            </Collapse>)
                                        return true;
                                    }))
                                }
                                return true;
                            }) : null
                        }
                    </AntModal>
                    <div className="divAdd">
                        <Button color="info" onClick={this.btnAddClick.bind(this)} >Add</Button>
                    </div>
                    <AddMatchPlayerScore isOpen={this.state.showModal} toggleAdd={this.btnAddClick.bind(this)} />

                    <Table hover>
                        <thead className="thead-dark">
                            <tr className="header-center">
                                <th>#</th>
                                <th>Tournament</th>
                                <th colSpan="3">Match</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tournamentMatch}
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        MatchPlayerScore: state.MatchPlayerScore,
        TournamentMatches: state.TournamentMatchs,
        players: state.MatchPlayerScore.players
    }
};

const mapDispatchToProps = dispatch => ({
    action: {
        MatchPlayerScore: bindActionCreators(MatchPlayerScore, dispatch),
        TournamentMatches: bindActionCreators(TournamentMatch, dispatch)
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(TournamenMatchPlayerScore);