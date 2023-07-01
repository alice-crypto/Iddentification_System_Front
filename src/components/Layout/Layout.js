import React from "react";
import {
  Route,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom";
import classnames from "classnames";
import {Box, IconButton, Link} from '@material-ui/core'
import Icon from '@mdi/react'

//icons
import {
  mdiFacebook as FacebookIcon,
  mdiTwitter as TwitterIcon,
  mdiGithub as GithubIcon,
} from '@mdi/js'

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// pages
import Dashboard from "../../pages/dashboard";
import Typography from "../../pages/typography";
import Notifications from "../../pages/notifications";
import Maps from "../../pages/maps";
import Tables from "../../pages/tables";
import Icons from "../../pages/icons";
import Charts from "../../pages/charts";
import CreateCard from "../../pages/createCard";
import ListAvis from "../../pages/listAvis";
import ListCard from "../../pages/listCard";
import CreateAvis from "../../pages/createAvis";
import CreateReporting from "../../pages/CreateReporting";
import SeeAvis from "../../pages/SeeAvis";
import ListUser from "../../pages/listUser";
import CreateUser from "../../pages/createUser";

// context
import { useLayoutState } from "../../context/LayoutContext";
import UpdateAvis from "../../pages/updateAvis";
import UpdateCard from "../../pages/updateCard/UpdateCard";
import UpdateUser from "../../pages/updateUser/UpdateUser";

function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
        <>
          <Header history={props.history}/>
          <Sidebar />
          <div
            className={classnames(classes.content, {
              [classes.contentShift]: layoutState.isSidebarOpened,
            })}
          >
            <div className={classes.fakeToolbar} />
            <Switch>
              <Route path="/app/dashboard" component={Dashboard} />
              <Route path="/app/typography" component={Typography} />
              <Route path="/app/tables" component={Tables} />

              <Route path="/app/notifications" component={Notifications} />
              <Route
                exact
                path="/app/ui"
                render={() => <Redirect to="/app/ui/icons" />}
              />
              <Route path="/app/ui/maps" component={Maps} />
              <Route path="/app/ui/icons" component={Icons} />
              <Route path="/app/ui/charts" component={Charts} />
              <Route path="/app/reporting/CreateReporting" component={CreateReporting} />
              <Route path="/app/avis/createavis" component={CreateAvis} />
              <Route path="/app/avis/updateavis" component={UpdateAvis} />
              <Route path="/app/avis/updateCard" component={UpdateCard} />
              <Route path="/app/avis/listavis" component={ListAvis} />
              <Route path="/app/card/listcard" component={ListCard} />
              <Route path="/app/card/createcard" component={CreateCard} />
              <Route path="/app/avis/seeavis" component={SeeAvis}/>
              <Route path="/app/user/listuser" component={ListUser}/>
              <Route path="/app/user/createuser" component={CreateUser}/>
              <Route path="/app/user/updateuser" component={UpdateUser}/>


            </Switch>
          </div>
        </>
    </div>
  );
}

export default withRouter(Layout);
