import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
// lowercase cause we're not using it with JSX, but at the end at export
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

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
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  //l.175 retrieving data from the backend
  componentDidMount(){
    axios.get('https://react-marleins-burger.firebaseio.com/ingredients.json')
      .then(response => {
        this.setState({ingredients: response.data})
      })
      .catch(error => {
        this.setState({error: true})
      })
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


    const queryParams = [];

    for(let i in this.state.ingredients) {
      // l.216: encodeURIComponent = embedded in Javascript.
      // Hier niet echt nodig omdat we non-critical elements (gewoon de ingredientnamen en aantallen) hebben, maar is good practice.
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
    }
    queryParams.push('price=' + this.state.totalPrice); 
    const queryString = queryParams.join('&')

    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    })
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

    let orderSummary = null;
 
    // l.175. Spinner opzet zolang we ingredients van database nog niet hebben
    let burger = this.state.error ? <p>Ingredients can't be loaded!</p>: <Spinner />
    
    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients}/>
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
      orderSummary =
      <OrderSummary
        ingredients={this.state.ingredients}
        price={this.state.totalPrice.toFixed(2)}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
      />
    }  

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal 
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}>
          {/* shows either the spinner or the summary */}
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

// l. 174 voor creatie reuasable hoc 'withErrorHandler'
// We can wrap it around any component that uses axios to handle its errors
export default withErrorHandler(BurgerBuilder, axios);