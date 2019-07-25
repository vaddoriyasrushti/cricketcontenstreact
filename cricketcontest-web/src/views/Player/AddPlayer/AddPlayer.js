import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, ModalFooter, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import ImageUploader from 'react-images-upload'
import { DatePicker } from 'antd';
import moment from 'moment';

import * as PlayerAction from '../../../action/Player';
import path from '../../../path';
const deleteIcon = require('../../../Image/delete.jpg');

class AddPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Player: { id: "", firstName: "", lastName: "", dob: "", gender: 1, description: "", playerImage: [], showimage: true, displayImage: "" },
            fieldsErrors: { firstName: '', lastName: '', description: '' },
            fieldsValid: { firstName: false, lastName: false, description: false },
            formValid: false,
        }
    }
    componentWillReceiveProps(nextProps) {
        let Player = nextProps.data.Player;
        if (nextProps.data.Player) {
            if (nextProps.data.Edit) {
                this.setState({
                    Player: Player,
                    formValid: true,
                    fieldsValid: { firstName: true, lastName: true, description: true },
                    fieldsErrors: { firstName: '', lastName: '', description: '' }
                })
            }
            else {
                this.setState({
                    Player: Player,
                    formValid: false,
                    fieldsValid: { firstName: false, lastName: false, description: false },
                    fieldsErrors: { firstName: '', lastName: '', description: '' }
                })
            }
        }
    }
    genderChangeHandler(e) {
        let gender = 0;
        if (e.target.checked) {
            (e.target.value === "Female") ? gender = 2 : gender = 1;
            this.setState({
                Player: {
                    ...this.state.Player,
                    gender: gender
                }
            })
        }
    }

    imageChangedHandler(image) {
        var reader = new FileReader();
        reader.readAsDataURL(image[0]);
        reader.onloadend = (e) => {
            this.setState({
                Player: {
                    ...this.state.Player,
                    playerImage: image,
                    showimage: true,
                    displayImage: reader.result
                }
            })
        };
    }

    inputChangedHandler(e) {
        const name = e.target.name;
        const value = e.target.value;
        if (name === "gender") {
            this.genderChangeHandler(e);
        }
        else {
            this.setState({
                Player: {
                    ...this.state.Player,
                    [name]: value
                }
            }, () => { this.validateField(name, value) })
        }
    }

    handleDatePickerChange = (e) => {
        if (e) {
            let date = new Date(e._d).toISOString().substr(0, 10);
            this.setState({
                Player: {
                    ...this.state.Player,
                    dob: date
                }
            })
        }
    }

    cancelImageClick(e) {
        e.preventDefault();
        this.setState({
            Player: {
                ...this.state.Player,
                showimage: false,
                displayImage: ""
            },
        })
    }

    validateField(fieldName, value) {
        var fieldValidationErrors = this.state.fieldsErrors;
        var fieldValidation = this.state.fieldsValid;

        switch (fieldName) {
            case 'firstName':
                fieldValidation.firstName = /^[a-zA-Z 0-9]+$/.test(value);
                fieldValidationErrors.firstName = fieldValidation.firstName ? '' : ' Only Alphabets Allow';
                break;

            case 'lastName':
                fieldValidation.lastName = /^[a-zA-Z 0-9]+$/.test(value);
                fieldValidationErrors.lastName = fieldValidation.lastName ? '' : ' Only Alphabets Allow'
                break;

            case 'description':
                fieldValidation.description = true;
                break;
            default:
                break;
        }
        this.setState({
            fieldsErrors: { ...this.state.fieldsErrors, fieldValidationErrors },
            fieldsValid: fieldValidation
        }, this.validateForm);
    }

    disabledDate(current) {
        return current && current >= moment().subtract(365 * 5, 'days');
    }

    validateForm() {
        this.setState({
            formValid: this.state.fieldsValid.firstName &&
                this.state.fieldsValid.lastName &&
                this.state.fieldsValid.description
        });
    }

    btnSubmitClick = (e) => {
        e.preventDefault();
        if (this.state.Player.description === "") {
            this.setState({
                fieldsErrors: {
                    ...this.state.fieldsErrors,
                    description: "* Description Required"
                }
            })
        }
        if (this.state.Player.dob === "") {
            this.setState({
                fieldsErrors: {
                    ...this.state.fieldsErrors,
                    dob: "* Date of birth Required"
                }
            })
        }
        if (this.state.Player.lastName === "") {
            this.setState({
                fieldsErrors: {
                    ...this.state.fieldsErrors,
                    lastName: "* Last Name Required"
                }
            })
        }
        if (this.state.Player.firstName === "") {
            this.setState({
                fieldsErrors: {
                    ...this.state.fieldsErrors,
                    firstName: "* First Name Required"
                },
            })
        }

        if (this.state.formValid) {
            let formdata = new FormData();
            formdata.append("firstName", this.state.Player.firstName);
            formdata.append("lastName", this.state.Player.lastName);
            formdata.append("dob", this.state.Player.dob);
            formdata.append("gender", this.state.Player.gender);
            formdata.append("description", this.state.Player.description);
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }

            let loginUserId = this.props.auth.userId;
            if (!this.props.data.Edit) {
                formdata.append("playerImage", this.state.Player.playerImage[0]);
                formdata.append("createdBy", loginUserId);
                this.props.action.Player.addPlayer(this.props.nrecord, formdata, config);
            }
            else {
                let playerId = this.state.Player.id;
                if (this.state.Player.displayImage) {
                    formdata.append("playerImage", this.state.Player.playerImage[0]);
                }
                else if (!this.state.Player.showimage) {
                    formdata.append("playerImage", "defaultPlayerImage.png");
                }
                formdata.append("id", playerId);
                formdata.append("updatedBy", loginUserId);
                this.props.action.Player.updatePlayer(this.state.Player, formdata, config)
            }
            this.props.toggle();
        }
    }

    render() {
        return (
            <div>
                <div>
                    <Modal isOpen={this.props.isOpen}  >
                        <ModalHeader toggle={this.props.toggle}>Player</ModalHeader>
                        <ModalBody>
                            <Form>
                                <FormGroup>
                                    <Label for="firstName">First Name</Label>
                                    <Input type="text" name="firstName" id="firstName" placeholder="First Name" onChange={this.inputChangedHandler.bind(this)} defaultValue={this.state.Player.firstName} />
                                    <span className="spanError">{this.state.fieldsErrors.firstName}</span>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="lastName">Last Name</Label>
                                    <Input type="text" name="lastName" id="lastName" placeholder="Last Name" onChange={this.inputChangedHandler.bind(this)} defaultValue={this.state.Player.lastName} />
                                    <span className="spanError">{this.state.fieldsErrors.lastName}</span>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="dob">Date Of Birth</Label> {' '}
                                    {(this.state.Player.dob) ? <DatePicker
                                        name="dob"
                                        id="dob"
                                        placeholder='Select Date'
                                        disabledDate={this.disabledDate}
                                        onChange={this.handleDatePickerChange.bind(this)}
                                        defaultValue={moment(this.state.Player.dob, 'YYYY-MM-DD')}
                                    /> : <DatePicker
                                            name="dob"
                                            id="dob"
                                            placeholder='Select Date'
                                            disabledDate={this.disabledDate}
                                            onChange={this.handleDatePickerChange.bind(this)}
                                        />}
                                    <br />
                                    <span className="spanError">{this.state.fieldsErrors.dob}</span>
                                </FormGroup>
                                <FormGroup tag="fieldset">
                                    <Label>Gender</Label>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="radio" name="gender" onChange={this.inputChangedHandler.bind(this)} value="Male" checked={(this.state.Player.gender) === 1 ? true : false} />Male
                                        </Label>
                                        <Label check>
                                            <Input type="radio" name="gender" onChange={this.inputChangedHandler.bind(this)} value="Female" checked={(this.state.Player.gender) === 2 ? true : false} />Female
                                        </Label>
                                    </FormGroup>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="description">Description</Label>
                                    <Input type="text" name="description" id="playerDescription" onChange={this.inputChangedHandler.bind(this)} defaultValue={this.state.Player.description} maxLength="100" className="wordBreak" placeholder="description" />
                                    <span className="spanError">{this.state.fieldsErrors.description}</span>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="image">Player Image</Label>
                                    {(this.state.Player.showimage && this.state.Player.playerImage !== "defaultPlayerImage.png") ?
                                        (this.state.Player.length > 0 || this.state.Player.displayImage === "") ?
                                            <div align="center">
                                                <img src={path + this.state.Player.playerImage} alt="" className="selectImage" />
                                                <img src={deleteIcon} onClick={this.cancelImageClick.bind(this)} className="deleteImage" alt="" />
                                            </div> :
                                            <div align="center">
                                                <img src={this.state.Player.displayImage} alt="" className="selectImage" />
                                                <img src={deleteIcon} onClick={this.cancelImageClick.bind(this)} className="deleteImage" alt="" />
                                            </div>
                                        : (<div><ImageUploader
                                            withIcon={true}
                                            ref="file"
                                            buttonText="Select Images"
                                            imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
                                            onChange={this.imageChangedHandler.bind(this)}
                                            maxFileSize={5242880}
                                            withLabel={false}
                                            singleImage={true}
                                            accept={"image/*"} />
                                            <center><span className="spanError">{this.state.fieldsErrors.playerImage}</span></center></div>)
                                    }
                                </FormGroup>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="info" onClick={this.btnSubmitClick.bind(this)}>Submit</Button>
                            <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    const { auth } = state
    return {
        auth: auth
    }
};
const mapDispatchToProps = dispatch => ({
    action: {
        Player: bindActionCreators(PlayerAction, dispatch)
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(AddPlayer)
