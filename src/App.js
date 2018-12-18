import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
// import Checkout from './containers/Checkout/Checkout'; // l. 339. Kan weg door lazy loading
// import Orders from './containers/Orders/Orders'; // l. 339. Kan weg door lazy loading
// import Auth from './containers/Auth/Auth'; // l. 339. Kan weg door lazy loading
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

// l. 339 Adding lazy loading (dat je maar delen van app laadt, voor performance optimization)
// argument should be a function
const asyncCheckout = asyncComponent(() => {
  return import ('./containers/Checkout/Checkout');
});

const asyncOrders= asyncComponent(() => {
  return import ('./containers/Orders/Orders');
});

const asyncAuth= asyncComponent(() => {
  return import ('./containers/Auth/Auth');
});

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
        <Route path="/auth" component={asyncAuth} />
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
          {/* l. 339 async components = lazy loading. 
            Was eerst gewoon Checkout ipv asynCheckout (en andere 2 ook.) */}
          <Route path="/checkout" component={asyncCheckout} />
          {/* l. 219: Orders path */}
          <Route path="/orders" component={asyncOrders} />
          {/* l.323: Adding a logout link */}
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={asyncAuth} />
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
