import React from 'react';
import { Container, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as tournamentAction from '../../../action/Tournament';
import * as tournamentPointAction from '../../../action/tournamentPoint';
import Path from '../../../path';

class ModalExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tournamentId: 0,
            runBox: 0,
            sixBox: 0,
            fourBox: 0,
            wicketBox: 0,
            stumpingBox: 0,
            catchBox: 0,
            Runs: {},
            Six: {},
            Four: {},
            Wicket: {},
            Stumping: {},
            Catch: {},
            fieldsError: "",
            tournamentError: "",
            fieldsValid: false
        };
        this.addBox = this.addBox.bind(this);
        this.removeBox = this.removeBox.bind(this);
        this.addScore = this.addScore.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.tournamentNameChangedHandler = this.tournamentNameChangedHandler.bind(this);
        this.runChangeHandler = this.runChangeHandler.bind(this);
        this.sixChangeHandler = this.sixChangeHandler.bind(this);
        this.fourChangeHandler = this.fourChangeHandler.bind(this);
        this.wicketChangeHandler = this.wicketChangeHandler.bind(this);
        this.stumpingChangeHandler = this.stumpingChangeHandler.bind(this);
        this.catchChangeHandler = this.catchChangeHandler.bind(this);
    }

    componentDidMount() {
        this.props.action.Tournaments.fetchTournamentDataAction();
    }

    toggleModal() {
        this.props.toggle();
        this.setState({
            tournamentId: 0,
            Runs: {},
            Six: {},
            Four: {},
            Wicket: {},
            Stumping: {},
            Catch: {},
            runBox: 0,
            sixBox: 0,
            fourBox: 0,
            wicketBox: 0,
            stumpingBox: 0,
            catchBox: 0,
            fieldsError: "",
            tournamentError: "",
            fieldsValid: false
        });
    }

    tournamentNameChangedHandler(e) {
        this.setState({ [e.target.name]: e.target.value, tournamentError: "" });
    }

    addScore(e) {
        e.preventDefault();
        if (this.state.tournamentId === 0) {
            this.setState({
                tournamentError: "Please Select Tournament."
            })
        }

        let arr = [];
        if (this.state.Runs) {
            arr.push(Object.values(this.state.Runs));
            if (arr[0].length === this.state.runBox) {
                for (let i = 0; i < arr[0].length; i++) {
                    if (Object.keys(arr[0][i]).length === 3) {
                        if (arr[0][i].from === "" || arr[0][i].to === "" || arr[0][i].point === "" || parseInt(arr[0][i].from, 10) < 0 || parseInt(arr[0][i].to, 10) < 0 || parseInt(arr[0][i].point, 10) < 0) {
                            this.setState({ fieldsError: "Run Empty/Invalid Field Not Allowed.", fieldsValid: false });
                            return;
                        }
                        else {
                            this.setState({ fieldsError: "", fieldsValid: true });
                        }
                    }
                    else {
                        this.setState({ fieldsError: "Run Empty/Invalid Field Not Allowed.", fieldsValid: false });
                        return;
                    }
                }
            }
            else {
                this.setState({ fieldsError: "Run Empty/Invalid Field Not Allowed.", fieldsValid: false });
                return;
            }
        }

        if (this.state.Six) {
            arr.push(Object.values(this.state.Six));
            if (arr[1].length === this.state.sixBox) {
                for (let i = 0; i < arr[1].length; i++) {
                    if (Object.keys(arr[1][i]).length === 3) {
                        if (arr[1][i].from === "" || arr[1][i].to === "" || arr[1][i].point === "" || parseInt(arr[1][i].from, 10) < 0 || parseInt(arr[1][i].to, 10) < 0 || parseInt(arr[1][i].point, 10) < 0) {
                            this.setState({ fieldsError: "Six Empty/Invalid Field Not Allowed.", fieldsValid: false });
                            return;
                        }
                        else {
                            this.setState({ fieldsError: "", fieldsValid: true })
                        }
                    }
                    else {
                        this.setState({ fieldsError: "Six Empty/Invalid Field Not Allowed.", fieldsValid: false });
                        return;
                    }
                }
            }
            else {
                this.setState({ fieldsError: "Six Empty/Invalid Field Not Allowed.", fieldsValid: false });
                return;
            }
        }

        if (this.state.Four) {
            arr.push(Object.values(this.state.Four));
            if (arr[2].length === this.state.fourBox) {
                for (let i = 0; i < arr[2].length; i++) {
                    if (Object.keys(arr[2][i]).length === 3) {
                        if (arr[2][i].from === "" || arr[2][i].to === "" || arr[2][i].point === "" || parseInt(arr[2][i].from, 10) < 0 || parseInt(arr[2][i].to, 10) < 0 || parseInt(arr[2][i].point, 10) < 0) {
                            this.setState({ fieldsError: "Four Empty/Invalid Field Not Allowed.", fieldsValid: false });
                            return;
                        }
                        else {
                            this.setState({ fieldsError: "", fieldsValid: true })
                        }
                    }
                    else {
                        this.setState({ fieldsError: "Four Empty/Invalid Field Not Allowed.", fieldsValid: false });
                        return;
                    }
                }
            }
            else {
                this.setState({ fieldsError: "Four Empty/Invalid Field Not Allowed.", fieldsValid: false });
                return;
            }
        }

        if (this.state.Wicket) {
            arr.push(Object.values(this.state.Wicket));
            if (arr[3].length === this.state.wicketBox) {
                for (let i = 0; i < arr[3].length; i++) {
                    if (Object.keys(arr[3][i]).length === 3) {
                        if (arr[3][i].from === "" || arr[3][i].to === "" || arr[3][i].point === "" || parseInt(arr[3][i].from, 10) < 0 || parseInt(arr[3][i].to, 10) < 0 || parseInt(arr[3][i].point, 10) < 0) {
                            this.setState({ fieldsError: "Wicket Empty/Invalid Field Not Allowed.", fieldsValid: false });
                            return;
                        }
                        else {
                            this.setState({ fieldsError: "", fieldsValid: true })
                        }
                    }
                    else {
                        this.setState({ fieldsError: "Wicket Empty/Invalid Field Not Allowed.", fieldsValid: false });
                        return;
                    }
                }
            }
            else {
                this.setState({ fieldsError: "Wicket Empty/Invalid Field Not Allowed.", fieldsValid: false });
                return;
            }
        }

        if (this.state.Stumping) {
            arr.push(Object.values(this.state.Stumping));
            if (arr[4].length === this.state.stumpingBox) {
                for (let i = 0; i < arr[4].length; i++) {
                    if (Object.keys(arr[4][i]).length === 3) {
                        if (arr[4][i].from === "" || arr[4][i].to === "" || arr[4][i].point === "" || parseInt(arr[4][i].from, 10) < 0 || parseInt(arr[4][i].to, 10) < 0 || parseInt(arr[4][i].point, 10) < 0) {
                            this.setState({ fieldsError: "Stumping Empty/Invalid Field Not Allowed.", fieldsValid: false });
                            return;
                        }
                        else {
                            this.setState({ fieldsError: "", fieldsValid: true })
                        }
                    }
                    else {
                        this.setState({ fieldsError: "Stumping Empty/Invalid Field Not Allowed.", fieldsValid: false });
                        return;
                    }
                }
            }
            else {
                this.setState({ fieldsError: "Stumping Empty/Invalid Field Not Allowed.", fieldsValid: false });
                return;
            }
        }

        if (this.state.Catch) {
            arr.push(Object.values(this.state.Catch));
            if (arr[5].length === this.state.catchBox) {
                for (let i = 0; i < arr[5].length; i++) {
                    if (Object.keys(arr[5][i]).length === 3) {
                        if (arr[5][i].from === "" || arr[5][i].to === "" || arr[5][i].point === "" || parseInt(arr[5][i].from, 10) < 0 || parseInt(arr[5][i].to, 10) < 0 || parseInt(arr[5][i].point, 10) < 0) {
                            this.setState({ fieldsError: "Catch Empty/Invalid Field Not Allowed.", fieldsValid: false });
                            return;
                        }
                        else {
                            this.setState({ fieldsError: "", fieldsValid: true })
                        }
                    }
                    else {
                        this.setState({ fieldsError: "Catch Empty/Invalid Field Not Allowed.", fieldsValid: false });
                        return;
                    }
                }
            }
            else {
                this.setState({ fieldsError: "Catch Empty/Invalid Field Not Allowed.", fieldsValid: false });
                return;
            }
        }

        if (this.state.fieldsError === "" && this.state.tournamentError === "" && this.state.fieldsValid && this.state.tournamentId !== 0) {
            let points = {
                Runs: this.state.Runs,
                Six: this.state.Six,
                Four: this.state.Four,
                Wicket: this.state.Wicket,
                Stumping: this.state.Stumping,
                Catch: this.state.Catch
            }

            let finalPoints = {
                tournamentId: this.state.tournamentId,
                pointJson: JSON.stringify(points)
            }
            this.props.action.TournamentPoint.addTournamentPointScore(finalPoints, 0, 5, "id", "desc");
            this.toggleModal();
        }

    }

    runChangeHandler = (e, value) => {
        this.setState({
            Runs: {
                ...this.state.Runs,
                [value]: {
                    ...this.state.Runs[value],
                    [e.target.name]: e.target.value
                }
            }
        });
    }

    sixChangeHandler = (e, value) => {
        this.setState({
            Six: {
                ...this.state.Six,
                [value]: {
                    ...this.state.Six[value],
                    [e.target.name]: e.target.value
                }
            }
        });
    }

    fourChangeHandler = (e, value) => {
        this.setState({
            Four: {
                ...this.state.Four,
                [value]: {
                    ...this.state.Four[value],
                    [e.target.name]: e.target.value
                }
            }
        });
    }

    wicketChangeHandler = (e, value) => {
        this.setState({
            Wicket: {
                ...this.state.Wicket,
                [value]: {
                    ...this.state.Wicket[value],
                    [e.target.name]: e.target.value
                }
            }
        });
    }

    stumpingChangeHandler = (e, value) => {
        this.setState({
            Stumping: {
                ...this.state.Stumping,
                [value]: {
                    ...this.state.Stumping[value],
                    [e.target.name]: e.target.value
                }
            }
        });
    }

    catchChangeHandler = (e, value) => {
        this.setState({
            Catch: {
                ...this.state.Catch,
                [value]: {
                    ...this.state.Catch[value],
                    [e.target.name]: e.target.value
                }
            }
        });
    }

    addBox = (box) => {
        if (box === "Runs") {
            this.setState({ runBox: this.state.runBox + 1 })
        } else if (box === "Six") {
            this.setState({ sixBox: this.state.sixBox + 1 })
        } else if (box === "Four") {
            this.setState({ fourBox: this.state.fourBox + 1 })
        } else if (box === "Wicket") {
            this.setState({ wicketBox: this.state.wicketBox + 1 })
        } else if (box === "Stumping") {
            this.setState({ stumpingBox: this.state.stumpingBox + 1 })
        } else if (box === "Catch") {
            this.setState({ catchBox: this.state.catchBox + 1 })
        }
    }

    removeBox = (box) => {
        if (box === "Runs") {
            this.setState({ runBox: this.state.runBox - 1 })
        } else if (box === "Six") {
            this.setState({ sixBox: this.state.sixBox - 1 })
        } else if (box === "Four") {
            this.setState({ fourBox: this.state.fourBox - 1 })
        } else if (box === "Wicket") {
            this.setState({ wicketBox: this.state.wicketBox - 1 })
        } else if (box === "Stumping") {
            this.setState({ stumpingBox: this.state.stumpingBox - 1 })
        } else if (box === "Catch") {
            this.setState({ catchBox: this.state.catchBox - 1 })
        }
    }

    render() {
        let tournamentPointArr = [], notSelectedTournament = [];
        tournamentPointArr = this.props.TournamentPoint.map(tournamentPoint => tournamentPoint.tournamentId);
        let tournamentNameOption = "";
        if (this.props.TournamentPoint.length !== 0) {
            notSelectedTournament = this.props.Tournaments.filter(tournament => !tournamentPointArr.includes(tournament.id));
            tournamentNameOption = notSelectedTournament.map(tournament => {
                return (
                    <option key={tournament.id} value={tournament.id}>{tournament.tournamentName}</option>
                )
            })
        }
        else {
            if (this.props.Tournaments) {
                tournamentNameOption = this.props.Tournaments.map(tournament => {
                    return (
                        <option key={tournament.id} value={tournament.id}>{tournament.tournamentName}</option>
                    )
                })
            }
        }

        let runTotalBox = [], renderRunBox;
        for (let i = 0; i < this.state.runBox; i++) {
            runTotalBox.push(i);
        }
        renderRunBox = runTotalBox.map((value) => {
            return (
                <div key={value}>
                    {value === 0
                        ? <div>
                            <img onClick={() => this.addBox("Runs")} alt="plus" src={Path + "/plusPoints.png"} className='width20px height20 mr5'></img>
                            {this.state.runBox >= 2
                                ? <img onClick={() => this.removeBox("Runs")} alt="minus" src={Path + "/minusPoints.jpeg"} className='width20px height20'></img>
                                : ""}
                        </div>
                        : ""}
                    <div className='mt5'>
                        <input type="number" name={"from"} className='width20' onChange={(e) => this.runChangeHandler(e, value)} />
                        &nbsp;<b>to</b>&nbsp;<input type="number" name={"to"} className='width20' onChange={(e) => this.runChangeHandler(e, value)} />
                        &nbsp;<b>=</b>&nbsp;<input type="number" name={"point"} className='width20' onChange={(e) => this.runChangeHandler(e, value)} />
                    </div>
                </div>
            );
        });

        let sixTotalBox = [], renderSixBox;
        for (let i = 0; i < this.state.sixBox; i++) {
            sixTotalBox.push(i);
        }
        renderSixBox = sixTotalBox.map((value) => {
            return (
                <div key={value}>
                    {value === 0
                        ? <div >
                            <img onClick={() => this.addBox("Six")} alt="plus" src={Path + "/plusPoints.png"} className='width20px height20 mr5'></img>
                            {this.state.sixBox >= 2
                                ? <img onClick={() => this.removeBox("Six")} alt="minus" src={Path + "/minusPoints.jpeg"} className='width20px height20'></img>
                                : ""}
                        </div>
                        : ""}
                    <div className='mt5'>
                        <input type="number" name={"from"} className='width20' onChange={(e) => this.sixChangeHandler(e, value)} />
                        &nbsp;<b>to</b>&nbsp;<input type="number" name={"to"} className='width20' onChange={(e) => this.sixChangeHandler(e, value)} />
                        &nbsp;<b>=</b>&nbsp;<input type="number" name={"point"} className='width20' onChange={(e) => this.sixChangeHandler(e, value)} />
                    </div>
                </div>
            );
        });

        let fourTotalBox = [], renderFourBox;
        for (let i = 0; i < this.state.fourBox; i++) {
            fourTotalBox.push(i);
        }
        renderFourBox = fourTotalBox.map((value) => {
            return (
                <div key={value}>
                    {value === 0
                        ? <div >
                            <img onClick={() => this.addBox("Four")} alt="plus" src={Path + "/plusPoints.png"} className='width20px height20 mr5'></img>
                            {this.state.fourBox >= 2
                                ? <img onClick={() => this.removeBox("Four")} alt="minus" src={Path + "/minusPoints.jpeg"} className='width20px height20'></img>
                                : ""}
                        </div>
                        : ""}
                    <div className='mt5'>
                        <input type="number" name={"from"} className='width20'  onChange={(e) => this.fourChangeHandler(e, value)} />
                        &nbsp;<b>to</b>&nbsp;<input type="number" name={"to"} className='width20' onChange={(e) => this.fourChangeHandler(e, value)} />
                        &nbsp;<b>=</b>&nbsp;<input type="number" name={"point"} className='width20' onChange={(e) => this.fourChangeHandler(e, value)} />
                    </div>
                </div>
            );
        });

        let wicketTotalBox = [], renderWicketBox;
        for (let i = 0; i < this.state.wicketBox; i++) {
            wicketTotalBox.push(i);
        }
        renderWicketBox = wicketTotalBox.map((value) => {
            return (
                <div key={value}>
                    {value === 0
                        ? <div >
                            <img onClick={() => this.addBox("Wicket")} alt="plus" src={Path + "/plusPoints.png"} className='width20px height20 mr5'></img>
                            {this.state.wicketBox >= 2
                                ? <img onClick={() => this.removeBox("Wicket")} alt="minus" src={Path + "/minusPoints.jpeg"} className='width20px height20'></img>
                                : ""}
                        </div>
                        : ""}
                    <div className='mt5'>
                        <input type="number" name={"from"} className='width20' onChange={(e) => this.wicketChangeHandler(e, value)} />
                        &nbsp;<b>to</b>&nbsp;<input type="number" name={"to"} className='width20' onChange={(e) => this.wicketChangeHandler(e, value)} />
                        &nbsp;<b>=</b>&nbsp;<input type="number" name={"point"} className='width20' onChange={(e) => this.wicketChangeHandler(e, value)} />
                    </div>
                </div>
            );
        });

        let stumpingTotalBox = [], renderStumpingBox;
        for (let i = 0; i < this.state.stumpingBox; i++) {
            stumpingTotalBox.push(i);
        }
        renderStumpingBox = stumpingTotalBox.map((value) => {
            return (
                <div key={value}>
                    {value === 0
                        ? <div >
                            <img onClick={() => this.addBox("Stumping")} alt="plus" src={Path + "/plusPoints.png"} className='width20px height20 mr5'></img>
                            {this.state.stumpingBox >= 2
                                ? <img onClick={() => this.removeBox("Stumping")} alt="minus" src={Path + "/minusPoints.jpeg"} className='width20px height20'></img>
                                : ""}
                        </div>
                        : ""}
                    <div className='mt5'>
                        <input type="number" name={"from"} className='width20' onChange={(e) => this.stumpingChangeHandler(e, value)} />
                        &nbsp;<b>to</b>&nbsp;<input type="number" name={"to"} className='width20' onChange={(e) => this.stumpingChangeHandler(e, value)} />
                        &nbsp;<b>=</b>&nbsp;<input type="number" name={"point"} className='width20' onChange={(e) => this.stumpingChangeHandler(e, value)} />
                    </div>
                </div>
            );
        });

        let catchTotalBox = [], renderCatchBox;
        for (let i = 0; i < this.state.catchBox; i++) {
            catchTotalBox.push(i);
        }
        renderCatchBox = catchTotalBox.map((value) => {
            return (
                <div key={value}>
                    {value === 0
                        ? <div >
                            <img onClick={() => this.addBox("Catch")} alt="plus" src={Path + "/plusPoints.png"} className='width20px height20 mr5'></img>
                            {this.state.catchBox >= 2
                                ? <img onClick={() => this.removeBox("Catch")} alt="minus" src={Path + "/minusPoints.jpeg"} className='width20px height20'></img>
                                : ""}
                        </div>
                        : ""}
                    <div className='mt5'>
                        <input type="number" name={"from"} className='width20' onChange={(e) => this.catchChangeHandler(e, value)} />
                        &nbsp;<b>to</b>&nbsp;<input type="number" name={"to"} className='width20' onChange={(e) => this.catchChangeHandler(e, value)} />
                        &nbsp;<b>=</b>&nbsp;<input type="number" name={"point"} className='width20' onChange={(e) => this.catchChangeHandler(e, value)} />
                    </div>
                </div>
            );
        });

        return (
            <Container>
                <Modal isOpen={this.props.isOpen}>
                    <ModalHeader toggle={this.toggleModal}>Add Points</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="tournamentName">Select Tournament Name</Label>
                                <Input
                                    type="select" name="tournamentId" id="tournamentName"
                                    onChange={this.tournamentNameChangedHandler}>
                                    <option value="" disabled="" className='dNone'>Select Tournament</option>
                                    {tournamentNameOption}
                                </Input>
                                <center><span className='alert'>{this.state.tournamentError}</span></center>
                            </FormGroup>
                        </Form>
                        <center><span className='alert'>{this.state.fieldsError}</span></center>
                        {this.state.runBox
                            ? <div className='header-center mt10'>
                                <h6>Runs</h6>{renderRunBox}
                            </div> : ""}
                        {this.state.sixBox
                            ? <div className='header-center mt10'>
                                <h6>Six</h6>{renderSixBox}
                            </div> : ""}
                        {this.state.fourBox
                            ? <div className='header-center mt10'>
                                <h6>Four</h6>{renderFourBox}
                            </div> : ""}
                        {this.state.wicketBox
                            ? <div className='header-center mt10'>
                                <h6>Wicket</h6>{renderWicketBox}
                            </div> : ""}
                        {this.state.stumpingBox
                            ? <div className='header-center mt10'>
                                <h6>Stumping</h6>{renderStumpingBox}
                            </div> : ""}
                        {this.state.catchBox
                            ? <div className='header-center mt10'>
                                <h6>Catch</h6>{renderCatchBox}
                            </div> : ""}
                        <div className='header-center'>
                            {this.state.runBox === 0
                                ? <Button color="info" onClick={() => this.addBox("Runs")}>Add Runs</Button> : ""}
                            {this.state.sixBox === 0
                                ? <Button color="info" onClick={() => this.addBox("Six")}>Add Six</Button> : ""}
                            {this.state.fourBox === 0
                                ? <Button color="info" onClick={() => this.addBox("Four")}>Add Four</Button> : ""}
                        </div>
                        <div className='header-center'>
                            {this.state.wicketBox === 0
                                ? <Button color="info" onClick={() => this.addBox("Wicket")}>Add Wicket</Button> : ""}
                            {this.state.stumpingBox === 0
                                ? <Button color="info" onClick={() => this.addBox("Stumping")}>Add Stumping</Button> : ""}
                            {this.state.catchBox === 0
                                ? <Button color="info" onClick={() => this.addBox("Catch")}>Add Catch</Button> : ""}
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        {this.state.runBox >= 1 && this.state.sixBox >= 1 && this.state.fourBox >= 1 && this.state.wicketBox >= 1 && this.state.stumpingBox >= 1 && this.state.catchBox >= 1
                            ? <Button color="info" onClick={this.addScore}>submit</Button> : ""}
                        <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </Container>

            
        );
    }
}

const mapStateToProps = state => ({
    Tournaments: state.Tournament.Tournamentss,
    TournamentPoint: state.TournamentPoint.get_points
});
const mapDispatchToProps = dispatch => ({
    action: {
        Tournaments: bindActionCreators(tournamentAction, dispatch),
        TournamentPoint: bindActionCreators(tournamentPointAction, dispatch)
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(ModalExample);