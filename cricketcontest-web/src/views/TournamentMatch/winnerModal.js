import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import path from '../../path';

class winnerModal extends Component {
    render() {
        let { data } = this.props;
        let show = (data !== undefined) ? (
            <ModalBody>
                {
                    (data.winningTeamId === 0) ? (
                        <div style={{ textAlign: 'center' }}>
                            <h5>Winning Team is not decided</h5>
                            <br />
                        </div>
                    ) : (
                            (data.winningTeamId === data.Team1[0].id) ? (
                                <div style={{ textAlign: 'center' }}>
                                    <h5>The winning team is {data.Team1[0].teamName}</h5>
                                    <br />
                                    <img src={path + data.Team1[0].teamLogo} height="70px" width="70px" alt="TeamImage" />{" "}
                                </div>
                            ) : (
                                    <div style={{ textAlign: 'center' }}>
                                        <h5>The winning team is {data.Team2[0].teamName} </h5>
                                        <br />
                                        <img src={path + data.Team2[0].teamLogo} height="70px" width="70px" alt="TeamImage" />{" "}
                                    </div>
                                )
                        )
                }
            </ModalBody>
        ) : null;
        return (

            <Modal isOpen={this.props.isOpen} centered toggle={this.props.toggleWinner}>
                <ModalHeader toggle={this.props.toggleWinner}>Winner Team</ModalHeader>
                {show}
            </Modal>

        );
    }
}

export default winnerModal;