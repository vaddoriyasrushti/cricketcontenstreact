import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ImageUploader from 'react-images-upload'
import { Container, Button, ModalFooter, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';

import path from '../../../path';
import * as TeamAction from '../../../action/Team';

import '../../view.css'

const deleteIcon = require('../../../Image/delete.jpg');

class AddTeam extends Component {
  
  state = {
    teamName: "",
    id: 0,
    createdBy: 0,
    updatedBy: 0, teamLogo: [],
    imagebanner: false,
    fieldsErrors: { teamName: '' },
    fieldsValid: { teamName: false },
    submitted: false,
    alert_msg: '',
    displayImage: ""
  }

  componentWillMount = () => {
    const userId = localStorage.getItem("userId");
    this.setState({ createdBy: userId, updatedBy: userId });
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.dataid.length !== 0 && nextProps.dataid !== null && !this.state.notcallnext) {
      this.setState({
        teamName: nextProps.dataid.teamName,
        teamLogo: nextProps.dataid.teamLogo,
        notcallnext: 1,
        imagebanner: true,
        id: nextProps.dataid.id,
      })
    }
  }

  inputChangeHandler(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => { this.validateField(name, value) })
    this.setState({ submitted: false });
  }

  imageChangedHandler(image) {
    var reader = new FileReader();
    reader.readAsDataURL(image[0]);
    reader.onloadend = (e) => {
      this.setState({
        teamLogo: image,
        imagebanner: true,
        displayImage: reader.result
      })
    };
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.fieldsErrors;
    let fieldValidation = this.state.fieldsValid;
    switch (fieldName) {
      case 'teamName':
        fieldValidation.teamName = value.match(/^[a-zA-Z0-9_ ]+$/i);
        fieldValidationErrors.teamName = fieldValidation.teamName ? '' : ' Only Alphabets Allow'
        break;
      default:
        break;
    }
    this.setState({
      fieldsErrors: fieldValidationErrors,
      fieldsValid: fieldValidation
    }, this.validateForm);
  }

  UpdateDataData = (Event) => {
    let formdata = new FormData();
    formdata.append("id", this.state.id);
    formdata.append("teamName", this.state.teamName);
    let image;
    if (this.props.dataid.teamLogo !== "defaultTeamLogo.png" && this.state.imagebanner === false) {
      image = this.props.dataid.teamLogo
      formdata.append("teamLogo", "defaultTeamLogo.png");
    }
    else if (typeof (this.state.teamLogo) === "object") {
      image = this.state.teamLogo[0]
      formdata.append("teamLogo", this.state.teamLogo[0]);
    } else if (this.props.dataid.teamLogo !== "defaultTeamLogo.png") {
      image = this.props.dataid.teamLogo
      formdata.append("teamLogo", this.state.teamLogo);
    }
    formdata.append("updatedBy", parseInt(this.state.updatedBy, 10));
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    const data = {
      "teamName": this.state.teamName,
      "teamLogo": image,
      "updatedBy": parseInt(this.state.updatedBy, 10),
      "id": this.state.id
    }
    Event.preventDefault();
    this.props.action.Team.UpdateTournamentAction(this.props.dataid.id, data, formdata, config);
    this.setState({ notcallnext: 0, teamLogo: [], teamName: "", id: "" })
    this.props.toggle(Event);
  }

  closeModal = () => {
    this.setState({ submitted: false });
    this.props.toggle(Event);
  }

  submitted = () => {
    this.setState({ submitted: true });
    this.AddDataData(true);
  }

  AddDataData = (submitted) => {
    let formdata = new FormData();
    if (submitted === true && this.state.teamName !== '') {
      formdata.append("teamName", this.state.teamName);
      if (this.state.teamLogo.length !== 0) {
        formdata.append("teamLogo", this.state.teamLogo[0]);
      }
      formdata.append("createdBy", parseInt(this.state.createdBy, 10));
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }
      this.props.action.Team.AddTeamAction(this.props.nrecord, formdata, config);
      this.closeModal();
      this.setState({ displayImage: "" })
    }
  }

  cancelImageClick = () => {
    if (this.props.dataid) {
      this.props.dataid.imagebanner = false
    }
    this.setState({ imagebanner: false, displayImage: "", teamLogo: "" })
  }

  render() {
    let image;
    let imageuploader = <div><ImageUploader withIcon={true}
      buttonText="Select Images"
      imgExtension={['.jpg', '.jpeg', '.gif', '.png', '.gif']}
      onChange={this.imageChangedHandler.bind(this)}
      maxFileSize={5242880}
      withLabel={false}
      singleImage={false}
      accept={"image/*"} />
      <center><span className='alert'>{this.state.fieldsErrors.BannerImage}</span></center></div>
    if (this.props.dataid !== null) {
      if (this.props.dataid.teamLogo === 'defaultTeamLogo.png') {
        if (!this.state.displayImage) {
          image = imageuploader
        } else {
          image = <div className='aCenter'>  
                    <img src={this.state.displayImage} alt="" className='wh100px'/>
                    <img src={deleteIcon} className='width25 height25 cancelIcon' onClick={this.cancelImageClick.bind(this)} alt="" />
                  </div>
        }
      } else if (this.props.dataid.imagebanner) {
        image = <div className='aCenter'>
                  <img src={path + this.props.dataid.teamLogo} className='wh100px' alt="" />
                  <img src={deleteIcon} className='width25 height25 cancelIcon' onClick={this.cancelImageClick.bind(this)} alt="" />
                </div>
      }
      else {
        if (!this.state.displayImage) {
          image = imageuploader
        } else {
          image = <div className='aCenter'>
                    <img src={this.state.displayImage} alt="" className='wh100px' />
                    <img src={deleteIcon} className='width25 height25 cancelIcon' onClick={this.cancelImageClick.bind(this)} alt="" />
                  </div>
        }
      }
    } else {
        if (!this.state.displayImage) {
          image = imageuploader
        } else {
          image = <div>
                    <img src={this.state.displayImage} alt="" className='wh100px' />
                    <img src={deleteIcon} className='width25 height25 cancelIcon' onClick={this.cancelImageClick.bind(this)} alt="" />
                  </div>
        }
    }

    return (
      <Container>
        <div className='float-right margin15'>
          <Modal isOpen={this.props.isOpen}  >
            <ModalHeader toggle={this.closeModal} >Team</ModalHeader>
            <ModalBody>
              <Form method="post">
                <FormGroup>
                  <Label for="teamName">Team Name</Label>
                  <Input type="text" name="teamName" id="teamName" placeholder="Team Name" defaultValue={this.props.dataid ? this.props.dataid.teamName : ""} onChange={this.inputChangeHandler.bind(this)} />
                  <span className='alert'>{this.state.fieldsErrors.teamName}</span>
                  {(this.state.teamName === '' && this.state.submitted) ? <p className='alert'>* Required Teamname</p> : null}
                </FormGroup>
                {image}
              </Form>
            </ModalBody>
            <ModalFooter>
              {this.props.dataid && this.props.dataid.length !== 0 ?
                <Button color="info" onClick={this.UpdateDataData.bind(this)}>Update</Button>
                : <Button color="info" onClick={this.submitted.bind(this)}>Submit</Button>}
              <Button color="secondary" onClick={this.closeModal}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ShowTeam: state.Team.TeamData,
    auth: state.auth
  }
};

const mapDispatchToProps = dispatch => ({
  action: {
    Team: bindActionCreators(TeamAction, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTeam)