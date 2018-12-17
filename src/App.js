import React, { Component } from 'react';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import { Route, Switch } from 'react-router-dom';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';


class App extends Component {

  render() {
    return (
      <div>
        <Layout>
          {/* Note to self: NIET JSX in {component=..}, gewoon alleen curly braces */}
          <Switch>
            {/* Je kunt Switch gebruiken en dan checkout bovenaan hebben staan,
            OF 'exact' toevoegen aan path='/' */}
            <Route path="/checkout" component={Checkout} />
            {/* l. 219: Orders path */}
            <Route path="/orders" component={Orders} />
            <Route path="/auth" component={Auth} />
            {/* l.323: Adding a logout link */}
            <Route path="/logout" component={Logout} />
            <Route path="/" component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
