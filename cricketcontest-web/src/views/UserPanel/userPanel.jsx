import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavLink, NavItem, DropdownToggle, DropdownItem, UncontrolledDropdown, DropdownMenu } from 'reactstrap';
import { Link } from 'react-router-dom';

import * as loginAction from '../../action/loginAction';
import './UserPanel.css'

class NavbarPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  logoutClick() {
    this.props.action.logout.logoutUser();
  }

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    return (
      <div style={{ position: "fixed", width: "100%", zIndex: "100", top: '0' }}>
        <Navbar color="dark" light expand="md" >
          <NavbarBrand href="/userDashBoard">Cricket Contest</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink tag={Link} to="/userDashBoard">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/Myteam">My Teams</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/viewTournamentteam">Tournament</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  <i className="fas fa-user-circle" style={{ fontSize: '18px' }} ></i>&nbsp;{localStorage.getItem("Name")}
                </DropdownToggle>
                <DropdownMenu right style={{ height: '38px', width: '35px' }}>
                  <center><DropdownItem onClick={this.logoutClick.bind(this)} style={{ marginTop: '-8px', backgroundColor: '#D3D3D3', border: '2px solid white', fontStyle: 'bold', fontSize: '15px' }}>
                    Logout</DropdownItem>
                  </center>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  action: {
    logout: bindActionCreators(loginAction, dispatch)
  }
})

export default connect(null, mapDispatchToProps)(NavbarPage);