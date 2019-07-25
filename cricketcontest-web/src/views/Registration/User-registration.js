import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Row, Col, Label, CardFooter, Button, Form, FormGroup, Input } from "reactstrap";
import { PanelHeader } from "components";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Link } from 'react-router-dom';
import * as registerAction from '../../action/loginAction';

class UserRegistration extends Component {
    state = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: 1,
        fieldsErrors: { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' },
        fieldsValid: { firstName: false, lastName: false, email: false, password: false, confirmPassword: false },
        formValid: false,
        inValidEmail: ""
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.err_msg === "") {
            this.setState({ inValidEmail: "" })
            this.props.history.push('/login');
        }
        else {
            this.setState({ inValidEmail: nextProps.err_msg })
        }
    }

    genderChangeHandler(e) {
        if (e.target.checked) {
            if (e.target.value === "Female")
                this.setState({ gender: 2 })
        }
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.fieldsErrors;
        let fieldValidation = this.state.fieldsValid;

        switch (fieldName) {
            case 'firstName':
                fieldValidation.firstName = value.match(/^[a-zA-Z 0-9]+$/i);
                fieldValidationErrors.firstName = fieldValidation.firstName ? '' : ' Invalid first name'
                break;

            case 'lastName':
                fieldValidation.lastName = value.match(/^[a-zA-Z 0-9]+$/i);
                fieldValidationErrors.lastName = fieldValidation.lastName ? '' : '  Invalid last name'
                break;

            case 'email':
                fieldValidation.email = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = fieldValidation.email ? '' : ' Invalid email';
                break;
            case 'password':
                fieldValidation.password = value.length >= 6;
                fieldValidationErrors.password = fieldValidation.password ? '' : ' Password is too short';
                break;
            case 'confirmPassword':
                var confirmPassword = value;
                var password = this.state.password;
                fieldValidation.confirmPassword = (password === confirmPassword);
                fieldValidationErrors.confirmPassword = fieldValidation.confirmPassword ? '' : ' Confirm Password Doesn\'t Match';
                break;
            default:
                break;
        }
        this.setState({
            fieldsErrors: { ...this.state.fieldsErrors, fieldValidationErrors },
            fieldsValid: fieldValidation,
        }, this.validateForm);
    }

    validateForm() {
        this.setState({
            formValid: this.state.fieldsValid.firstName &&
                this.state.fieldsValid.lastName &&
                this.state.fieldsValid.email &&
                this.state.fieldsValid.password &&
                this.state.fieldsValid.confirmPassword
        });
    }

    inputChangeHandler(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value }, () => { this.validateField(name, value) })
    }

    btnRegisterClick() {        
        if (this.state.confirmPassword === "")
            this.setState({
                fieldsErrors: {
                    ...this.state.fieldsErrors,
                    confirmPassword: "* Password Required"
                }
            })
        if (this.state.password === "")
            this.setState({
                fieldsErrors: {
                    ...this.state.fieldsErrors,
                    password: "* Password Required"
                }
            })

        if (this.state.email === "")
            this.setState({
                fieldsErrors: {
                    ...this.state.fieldsErrors,
                    email: "* Email Required"
                }
            })
        if (this.state.lastName === "")
            this.setState({
                fieldsErrors: {
                    ...this.state.fieldsErrors,
                    lastName: "* Last Name Required"
                }
            })
        if (this.state.firstName === "")
            this.setState({
                fieldsErrors: {
                    ...this.state.fieldsErrors,
                    firstName: "* First Name Required"
                }
            })
        let abc = true;
        if (parseInt(this.state.password, 10) !== parseInt(this.state.confirmPassword, 10)) {
            abc = false;
            this.setState({
                fieldsErrors: {
                    ...this.state.fieldsErrors,
                    password: "* Passwords are not same"
                }
            })
        }

        if (this.state.formValid && abc) {          
           this.props.action.register.RegisterUser(this.state);
        }
    }

    render() {
        return (
            <div>
                <hr />
                <PanelHeader size="sm" ><h1 style={{ color: "white", marginTop: "-35px", textAlign: "center" }}>Cricket Contest</h1></PanelHeader>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: "15px" }}>
                    <Row  >
                        <Col sm={12}>
                            <Card style={{ width: "500px" }}>
                                <CardHeader>
                                    <h5 className="title">User Registration</h5>
                                </CardHeader>
                                <CardBody>
                                    <Form>
                                        <FormGroup>
                                            <Label for="firstName"><b>First Name</b></Label>
                                            <Input type="text" name="firstName" id="firstName" placeholder="First Name" onChange={this.inputChangeHandler.bind(this)} required />
                                            <span style={{ color: "red" }}>{this.state.fieldsErrors.firstName}</span>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="lastName"><b>Last Name</b></Label>
                                            <Input type="text" name="lastName" id="lastName" placeholder="Last Name" onChange={this.inputChangeHandler.bind(this)} />
                                            <span style={{ color: "red" }}>{this.state.fieldsErrors.lastName}</span>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="email"><b>Email</b></Label>
                                            <Input type="email" name="email" id="email" placeholder="example@example.com" onChange={this.inputChangeHandler.bind(this)} />
                                            <span style={{ color: "red" }}>{this.state.fieldsErrors.email}</span>
                                            <span style={{ color: "red" }}>{this.state.inValidEmail}</span>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="password"><b>Password</b></Label>
                                            <Input type="password" name="password" id="password" placeholder="Password" onChange={this.inputChangeHandler.bind(this)} />
                                            <span style={{ color: "red" }}>{this.state.fieldsErrors.password}</span>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="confirmPassword"><b>Confirm Password</b></Label>
                                            <Input type="password" name="confirmPassword" id="confirmPassword" onChange={this.inputChangeHandler.bind(this)} placeholder="Confirm Password" />
                                            <span style={{ color: "red" }}>{this.state.fieldsErrors.confirmPassword}</span>
                                        </FormGroup>
                                        <FormGroup tag="fieldset">
                                            <Label for="password"><b>Gender</b></Label>
                                            <FormGroup check>
                                                <Label check>
                                                    <Input type="radio" name="gender" onChange={this.genderChangeHandler.bind(this)} value="Male" checked />Male</Label>
                                            </FormGroup>
                                            <FormGroup check>
                                                <Label check>
                                                    <Input type="radio" name="gender" onChange={this.genderChangeHandler.bind(this)} value="Female" />Female
                                                </Label>
                                            </FormGroup>
                                        </FormGroup>
                                    </Form>
                                </CardBody>
                                <CardFooter>
                                    <Button style={{ "float": "right", "marginBottom": "10px", width: "100%" }} color="info" onClick={this.btnRegisterClick.bind(this)} >Register</Button>
                                </CardFooter>
                                <br />
                                <hr />
                                <CardFooter>
                                    <center>Already have an account? <Link to="/login" path="/login">Login</Link></center>
                                </CardFooter>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { auth } = state;
    return {
        auth: auth,
        err_msg: auth.error_msg,
        email: auth.email
    }
}

const mapDispatchToProps = (dispatch) => ({
    action: {
        register: bindActionCreators(registerAction, dispatch)
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(UserRegistration);