import React, { Component } from 'react';
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

class CRoute extends Component {
    getExtractedJson({ component, cprivate, crole, actions, auth, ...rest }) {
        return rest;
    }
    render() {
        const rest = this.getExtractedJson(this.props);
        const isUserLoggedIn = this.props.auth.token ? this.props.auth.token !== "" : false;
        const userCurrentRole = parseInt(this.props.auth.Role, 10);
        const { component, cprivate, crole } = this.props;
        const Component = component;
        let redirectTo = undefined;

        if (isUserLoggedIn && rest.path === "/userDashBoard" && userCurrentRole === 1) {
            redirectTo = "/"
        }
        else if (isUserLoggedIn && rest.path === "/viewTournamentteam" && userCurrentRole === 1) {
            redirectTo = "/"
        }
        else if (isUserLoggedIn && rest.path === "/Myteam" && userCurrentRole === 1) {
            redirectTo = "/"
        }
        else if (isUserLoggedIn && rest.path === "/login" && userCurrentRole === 2) {
            redirectTo = "/userDashBoard"
        }
        else if (isUserLoggedIn && rest.path === "/" && userCurrentRole === 2) {
            redirectTo = "/userDashBoard"
        } else if (!isUserLoggedIn && rest.path === "/viewTournamentteam") {
            redirectTo = "/login"
        }
        else if (!isUserLoggedIn && rest.path === "/Myteam") {
            redirectTo = "/login"
        }
        else if (!isUserLoggedIn && rest.path === "/userDashBoard") {
            redirectTo = "/login"
        }
        else if (isUserLoggedIn && rest.path === "/login" && userCurrentRole === 1 && cprivate) {
            redirectTo = "/"
        }
        else if (isUserLoggedIn && rest.path === "/login")
            redirectTo = "/";
        else if (isUserLoggedIn && rest.path === "/registration")
            redirectTo = "/";
        else if (!isUserLoggedIn && cprivate)
            redirectTo = "/login";
        else if (isUserLoggedIn && cprivate && crole && crole.filter((item) => item === userCurrentRole).length === 0)
            redirectTo = "/unauthorized-access";
        else if (!isUserLoggedIn && rest.path === "*") {
            redirectTo = "/login";
        }
        else if (!isUserLoggedIn && rest.path === "/CreateTeam/:id") {
            redirectTo = "/login"
        }
        else if (!isUserLoggedIn && rest.path === "/userDashBoard") {
            redirectTo = "/login"
        }
        else if (!isUserLoggedIn && rest.path === "/MyTeamPlayer/:id") {
            redirectTo = "/login"
        }
        return (
            <Route
                {...rest}
                render={props => (
                    (redirectTo)
                        ? <Redirect to={{ pathname: redirectTo, state: { from: props.location } }} />
                        : <Component {...props} />
                )}
            />
        );
    }
}

const mapStateToProps = (state) => {
    const { auth } = state;
    return {
        auth: auth
    }
};

export default connect(mapStateToProps)(CRoute)
