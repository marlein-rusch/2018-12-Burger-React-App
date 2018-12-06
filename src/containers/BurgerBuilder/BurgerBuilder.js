import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

// const you want to use globally are often capitalized by convention
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component{
  // Constructor syntax will also work instead of the state as used below
  // constructor(props) {
  //   super(props);
  //   this.state = {

  //   }
  // }

  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false
  }

  // Argument is nodig om de ge-update ingredients te krijgen in add&removedIngredientHandlers
  updatePurchaseState (ingredients) {

    // Object omzetten naar array
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey]
      })
      // 0 is starting number, dan optellen nummers (nl ingredient values)
      .reduce((sum, el) => {
        return sum + el
      }, 0);
    this.setState({purchasable: sum > 0}) // sum > 0 = true of false
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
      updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    // update de ORDER button (of deze disabled is of niet)
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0){
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
      updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    // update de ORDER button (of deze disabled is of niet)
    this.updatePurchaseState(updatedIngredients);
  }

  // Note that the arrow syntax is necessary, otherwise the this refers to the wrong thing (ofzo)
  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    //l. 173
    this.setState({loading: true})
    //alert('You continue!');
    //l.172: .json is the appropriate endpoint syntax for firebase
    const order = {
      ingredients: this.state.ingredients,
      // In real-world set-up this would not be safe: you'd recalculate the price on the server
      price: this.state.totalPrice,
      customer: {
        name: 'Marlein',
        address: {
          street: 'Teststraat 1',
          zipCode: '12345',
          country: 'The Netherlands'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    }
    // second argument 'order' is the data that gets sent
    axios.post('/orders.json', order)
    // l. 173 purchasing: false zorgt ervoor dat de modal closes
      .then(response => {
        this.setState({loading: false, purchasing: false});
      })
      .catch(error => {
        this.setState({loading: false, purchasing: false})
      });
    }

  render () {
    // const om 'less' button te disablen wanneer geen ingrediënten
    const disabledInfo = {
      ...this.state.ingredients
    };

    for (let key in disabledInfo) {
      // This check return true or false
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = 
      <OrderSummary
        ingredients={this.state.ingredients}
        price={this.state.totalPrice.toFixed(2)}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
      />

    if (this.state.loading) {
      orderSummary = <Spinner />
    }

    return (
      <Aux>
        <Modal 
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}>
          {/* shows either the spinner or the summary */}
          {orderSummary}
        </Modal>
        <Burger 
          ingredients={this.state.ingredients}
        />
        <BuildControls
        // Here we bind properties (that we name ourselves) to the state
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          ordered={this.purchaseHandler}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;