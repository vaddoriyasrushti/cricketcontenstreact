import React, { Component } from 'react';

import path from '../../path';
import UserPanel from '../UserPanel/userPanel';
import './userDashBoard.css';

class userDashBoard extends Component {

    state = {
        width: window.innerWidth,
        height: window.innerHeight
    }

    logoutClick() {
        this.props.action.logout.logoutUser();
    }

    handleLetsGoButton = () => {
        this.props.history.push('/viewTournamentteam');
    }

    render() {
        return (
            <div>
                <UserPanel></UserPanel>
                <div style={{ position: "relative" }}>
                    <img src={path + "UserMainImage.jpg"} alt="" style={{ width: this.state.width, height: this.state.height, backgroundRepeat: "no-repeat", backgroundAttachment: "fixed" }} ></img>
                    <center>
                        <div style={{ position: "absolute", left: "0", top: "50%", width: "100%", textAlign: "center" }}>
                            <button onClick={this.handleLetsGoButton.bind(this)} className="button button2 btn btn-info">Let's play</button></div>
                    </center>
                </div>
            </div>
        );
    }
}

export default userDashBoard;