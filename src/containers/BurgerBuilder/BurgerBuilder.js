import React, { Component } from 'react';
import Aux from '../../hoc/Aux';

import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component{
  // Constructor syntax will also work instead of the state as used below
  // constructor(props) {
  //   super(props);
  //   this.state = {

  //   }
  // }

  state = {
    ingredients: {
      salad: 1,
      bacon: 0,
      cheese: 0,
      meat: 0
    }
  }

  render () {
    return (
      <Aux>
        <Burger 
          ingredients={this.state.ingredients}
        />
        <div>Build Controls</div>
      </Aux>
    );
  }
}

export default BurgerBuilder;