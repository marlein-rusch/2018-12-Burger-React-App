import React, { Component } from 'react';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { Route, Switch } from 'react-router-dom';


class App extends Component {

  render() {
    return (
      <div>
        <Layout>
          {/* Note to self: NIET JSX in {component=..}, gewoon alleen curly braces */}
          <Switch>
            {/* Je kunt Switch gebruiken en dan checkout bovenaan hebben staan,
            OF 'exact' toevoegen aan path='/' */}
            <Route path="/checkout/" component={Checkout} />
            <Route path="/" component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
