import React from "react";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";
import "semantic-ui-css/semantic.css";
import { Roles } from "meteor/alanning:roles";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import NavBar from "../components/nav-bar";
import Footer from "../components/footer";
import Landing from "../pages/landing";
import Shop from "../pages/shop";
import NotFound from "../pages/not-found";
import PayNow from "../pages/pay-now";
import PartsOrdering from "../pages/parts-ordering";
import Signin from "../pages/signin";
import Signup from "../pages/signup";
import Servicing from "../pages/servicing";
import Signout from "../pages/signout";
import Admin from "../pages/admin";
import Attendance from "../pages/attendance";
import SuperAdmin from "../pages/super-admin";

/** Top-level layout component for this application. Called in imports/startup/client/startup. */
class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/attendance" component={Attendance} />
            <Route path="/signup" component={Signup} />
            <Route path="/signin" component={Signin} />
            <Route path="/shop" component={Shop} />
            <ProtectedRoute path="/partsordering" component={PartsOrdering} />
            <ProtectedRoute path="/servicing" component={Servicing} />
            <ProtectedRoute path="/paynow" component={PayNow} />
            <AdminProtectedRoute path="/admin" component={Admin} />
            <SuperAdminProtectedRoute
              path="/superadmin"
              component={SuperAdmin}
            />
            <ProtectedRoute path="/signout" component={Signout} />
            <Route component={NotFound} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

/**
 * ProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      const isLogged = Meteor.userId() !== null;
      return isLogged ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/signin", state: { from: props.location } }}
        />
      );
    }}
  />
);

/**
 * AdminProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      const isLogged = Meteor.userId() !== null;
      const isAdmin = Roles.userIsInRole(Meteor.userId(), "admin");
      return isLogged && isAdmin ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/signin", state: { from: props.location } }}
        />
      );
    }}
  />
);

const SuperAdminProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      const isLogged = Meteor.userId() !== null;
      const isAdmin = Roles.userIsInRole(Meteor.userId(), "superAdmin");
      return isLogged && isAdmin ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/signin", state: { from: props.location } }}
        />
      );
    }}
  />
);

/** Require a component and location to be passed to each ProtectedRoute. */
ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object
};

/** Require a component and location to be passed to each AdminProtectedRoute. */
AdminProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object
};

SuperAdminProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object
};

export default App;
