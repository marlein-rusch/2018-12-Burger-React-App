import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';


class App extends Component {

  // l. 326. Local Storage.
  componentDidMount () {
    this.props.onTryAutoSignup();
  }

  render() {

    // l. 329: Guarding routes
    // /auth en / are available for unauthenticated users
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        {/* Als je nu naar /orders gaat, wordt je na / geredirect */}
        <Redirect to="/"/>
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          {/* Note to self: NIET JSX in {component=..}, gewoon alleen curly braces */}
        
          {/* Je kunt Switch gebruiken en dan checkout bovenaan hebben staan,
          OF 'exact' toevoegen aan path='/' */}

          <Route path="/checkout" component={Checkout} />
          {/* l. 219: Orders path */}
          <Route path="/orders" component={Orders} />
          {/* l. 329: Auth kan nu weg, je hoeft niet naar /auth als je authenticated bent
            <Route path="/auth" component={Auth} /> */}
          {/* l.323: Adding a logout link */}
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/"/>
        </Switch>
      );
    }

    return (
      <div>
        <Layout>
          {/* l. 329 Guarding routes */}
          {routes}
        </Layout>
      </div>
    );
  }
}

// l.327. Guarding Routes (dat je niet manueel naar /blabla kan als je niet authenticated bent)
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}


// l. 326 Local storage

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

// l. 327. Fix the app nadat connect was toegevoegd, met withRouter
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
