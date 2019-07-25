import React, { Component } from 'react';
import { Switch, withRouter } from 'react-router-dom';
import CRoute from './components/customRoute/customRoute';

import UserRegistration from './views/Registration/User-registration';
import Login from './views/Login/Login';
import indexRoutes from './routes/index';
import userDashBoard from './views/userDashBoard/userDashBoard';
import ViewTournamentteam from './views/User/ViewTournamentTeam/ViewTournamentTeam';
import CreateTeam from './views/User/CreateTeam/CreateTeam';
import Myteam from './views/User/myTems/Myteam';
import MyTeamPlayer from './views/User/myTems/Players';

class App extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <CRoute path="/registration" exact component={UserRegistration} />
                    <CRoute path="/login" exact component={Login} />
                    <CRoute path="/userDashBoard" exact component={userDashBoard} />
                    <CRoute path="/viewTournamentteam" exact component={ViewTournamentteam} />
                    <CRoute path="/CreateTeam/:id" exact component={CreateTeam} />
                    <CRoute path="/MyTeamPlayer/:id" exact component={MyTeamPlayer} />
                    <CRoute path="/Myteam" exact component={Myteam} />
                    {indexRoutes.map((prop, key) => {
                        return <CRoute path={prop.path} key={key} component={prop.component} cprivate />;
                    })}
                </Switch>
            </div>
        );
    }
}

export default withRouter(App);