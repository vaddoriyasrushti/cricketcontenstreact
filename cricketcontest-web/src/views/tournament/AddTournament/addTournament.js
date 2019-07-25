import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ImageUploader from 'react-images-upload'
import { Container, Button, ModalFooter, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';

import * as TournamentAction from '../../../action/Tournament';
import path from '../../../path';

import '../../view.css';

const deleteIcon = require('../../../Image/delete.jpg');


class AddTournament extends Component {
  state = {
    tournamentName: "",
    tournamentDescription: "",
    tournamentBanner: [],
    notcallnext: 0,
    createdBy: 0,
    updatedBy: 0,
    id: 0,
    imagebanner: false,
    fieldsErrors: { tournamentName: '', tournamentDescription: '', tournamentBanner: '' },
    fieldsValid: { tournamentName: false, tournamentDescription: false, tournamentBanner: "false" },
    displayImage: ""
  }

  componentWillMount = () => {
    const userId = localStorage.getItem("userId");
    this.setState({ createdBy: userId, updatedBy: userId });
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.dataid !== null && nextProps.dataid.length !== 0 && !this.state.notcallnext) {
      this.setState({
        tournamentName: nextProps.dataid.tournamentName,
        tournamentDescription: nextProps.dataid.tournamentDescription,
        tournamentBanner: nextProps.dataid.tournamentBanner,
        notcallnext: 1,
        imagebanner: true,
        id: nextProps.dataid.id,
      })
    }
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.fieldsErrors;
    let fieldValidation = this.state.fieldsValid;
    switch (fieldName) {
      case 'tournamentName':
        fieldValidation.tournamentName = value.match(/^[a-zA-Z0-9_ ]+$/i);
        fieldValidationErrors.tournamentName = fieldValidation.tournamentName ? '' : ' Invalied Tournament'
        break;
      case 'tournamentDescription':
        fieldValidation.tournamentDescription = value.match(/^[~`!@#$%^&*()-=+a-zA-Z0-9_ ]+$/i);
        fieldValidationErrors.tournamentDescription = fieldValidation.tournamentDescription ? '' : ' Invalied description'
        break;
      default:
        break;
    }
    this.setState({
      fieldsErrors: fieldValidationErrors,
      fieldsValid: fieldValidation
    }, this.validateForm);
  }

  inputChangeHandler(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => { this.validateField(name, value) })
  }

  UpdateDataData = (Event) => {
    if (this.state.tournamentDescription === "") {
      this.setState({
        fieldsErrors: {
          ...this.state.fieldsErrors,
          tournamentDescription: "Please Enter Tournament Discription"
        }
      })
    }
    if (this.state.tournamentName === "") {
      this.setState({
        fieldsErrors: {
          ...this.state.fieldsErrors,
          tournamentName: "Please Enter Tournament Name"
        }
      })
    }
    if (this.state.tournamentName && this.state.tournamentDescription) {
      Event.preventDefault();
      let formdata = new FormData();
      formdata.append("id", this.state.id);
      formdata.append("tournamentName", this.state.tournamentName);
      formdata.append("tournamentDescription", this.state.tournamentDescription);
      let image = ""

      if (this.props.dataid.tournamentBanner !== "defaultTournament.png" && this.state.imagebanner === false) {
        image = this.props.dataid.tournamentBanner
        formdata.append("tournamentBanner", "defaultTournament.png");
      }
      else if (typeof (this.state.tournamentBanner) === "object") {
        image = this.state.tournamentBanner[0]
        formdata.append("tournamentBanner", this.state.tournamentBanner[0]);
      } else if (this.props.dataid.tournamentBanner !== "defaultTournament.png") {
        image = this.props.dataid.tournamentBanner
        formdata.append("tournamentBanner", this.state.tournamentBanner);
      }

      formdata.append("updatedBy", parseInt(this.state.updatedBy, 10));
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }
      const data = {
        "id": this.state.id,
        "tournamentName": this.state.tournamentName,
        "tournamentDescription": this.state.tournamentDescription,
        "tournamentBanner": image,
        "updatedBy": parseInt(this.state.updatedBy, 10)
      }
      this.props.action.Tournament.UpdateTournamentAction(this.props.dataid.id, data, formdata, config)
      this.setState({ notcallnext: 0, tournamentBanner: [], tournamentDescription: "", tournamentName: "", id: "" })
      this.props.toggle(Event);
    }
  }
  
  AddDataData = (Event) => {
    Event.preventDefault();
    if (this.state.tournamentDescription === "") {
      this.setState({
        fieldsErrors: {
          ...this.state.fieldsErrors,
          tournamentDescription: "Please Enter Tournament Discription"
        }
      })
    }
    if (this.state.tournamentName === "") {
      this.setState({
        fieldsErrors: {
          ...this.state.fieldsErrors,
          tournamentName: "Please Enter Tournament Name"
        }
      })
    }
    if (this.state.tournamentName && this.state.tournamentDescription) {
      let formdata = new FormData();
      formdata.append("tournamentName", this.state.tournamentName);
      formdata.append("tournamentDescription", this.state.tournamentDescription);
      formdata.append("tournamentBanner", this.state.tournamentBanner[0]);
      formdata.append("createdBy", this.state.createdBy);
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }
      this.props.action.Tournament.AddTournamentAction(this.props.nrecord, formdata, config)
      this.props.toggle(Event);
      this.setState({displayImage:""});
    }
  }

  imageChangedHandler(image) {
    var reader = new FileReader();
    reader.readAsDataURL(image[0]);
    reader.onloadend = (e) => {
      this.setState({
        tournamentBanner: image,
        imagebanner: true,
        displayImage: reader.result
      })
    }
  }

  cancelImageClick = () => {
    if (this.props.dataid) {
      this.props.dataid.imagebanner = false
    }
    this.setState({ imagebanner: false, displayImage: "", tournamentBanner: "" })
  }

  render() {
    let image;
    let imageuploader = <ImageUploader  
                              withIcon={true} 
                              buttonText="Select Images" 
                              imgExtension={['.jpg', '.jpeg', '.gif', '.png', '.gif']}
                              onChange={this.imageChangedHandler.bind(this)}
                              maxFileSize={5242880}
                              withLabel={false}
                              singleImage={true}
                              accept={"image/*"} />

    if (this.props.dataid !== null) {
      if (this.props.dataid.tournamentBanner === "defaultTournament.png") {
        if (!this.state.displayImage) {
          image = imageuploader
        } else {
          image = <div className='aCenter'>  
                    <img src={this.state.displayImage} alt="" className='wh100px' />
                    <img src={deleteIcon} className='width25 height25 cancelIcon' onClick={this.cancelImageClick.bind(this)} alt="" />
                  </div>
        }
      }
      else if (this.props.dataid.imagebanner) {
        image = <div className='aCenter'>
                  <img src={path + this.props.dataid.tournamentBanner} className='wh100px' alt="" />
                  <img src={deleteIcon} className='width25 height25 cancelIcon' onClick={this.cancelImageClick.bind(this)} alt="" />
                </div>
      } else {
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
        image = <div className='aCenter'>  
                  <img src={this.state.displayImage} alt=""  className='wh100px' />
                  <img src={deleteIcon} className='width25 height25 cancelIcon'  onClick={this.cancelImageClick.bind(this)} alt="" />
                </div>
      }
    }
    return (
      <Container>
        <div className='float-right margin15'>
          <Modal isOpen={this.props.isOpen}  >
            <ModalHeader toggle={this.props.toggle} >{this.props.dataid ? " Update Tournament" : "Tournament"} </ModalHeader>
            <ModalBody>
              <Form >
                <FormGroup>
                  <Label for="tournamentName">Tournament Name</Label>
                  <Input  type="text"
                          name="tournamentName"
                          id="tournamentName"
                          defaultValue={this.props.dataid ? this.props.dataid.tournamentName : ""}
                          placeholder="Tournament Name"
                          onChange={this.inputChangeHandler.bind(this)} />
                  <span className='alert'>{this.state.fieldsErrors.tournamentName}</span>
                </FormGroup>
                <FormGroup>
                  <Label for="tournamentDescription">Tournament Description</Label>
                  <Input  type="textarea" 
                          name="tournamentDescription" 
                          id="tournamentDescription"
                          placeholder="Description"
                          defaultValue={this.props.dataid ? this.props.dataid.tournamentDescription : ""}
                          onChange={this.inputChangeHandler.bind(this)}
                          maxLength="275" 
                          className='wordBreak' />
                  <span className='alert'>{this.state.fieldsErrors.tournamentDescription}</span>
                </FormGroup>
                {image}
              </Form>
            </ModalBody>
            <ModalFooter>
              {this.props.dataid ?
                <Button color="info" onClick={this.UpdateDataData.bind(this)}>Update</Button>
                : <Button color="info" onClick={this.AddDataData.bind(this)}>Submit</Button>}
              <Button color="secondary" onClick={this.props.toggle.bind(Event)}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  action: {
    Tournament: bindActionCreators(TournamentAction, dispatch)
  }
})

export default connect(null, mapDispatchToProps)(AddTournament)
