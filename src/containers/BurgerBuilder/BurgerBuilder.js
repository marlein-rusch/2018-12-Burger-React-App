import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
// lowercase cause we're not using it with JSX, but at the end at export
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actionTypes from '../../store/actions';

// const you want to use globally are often capitalized by convention


class BurgerBuilder extends Component{
  // Constructor syntax will also work instead of the state as used below
  // constructor(props) {
  //   super(props);
  //   this.state = {

  //   }
  // }

  state = {
    // l.269:  ingredients, totalPrice en purchasable gaan nu via Redux 
    purchasing: false,
    loading: false,
    error: false
  }

  //l.175 retrieving data from the backend.
  // l. 266 WE'LL DO THIS LATER AGAIN IN REDUX STYLE
  // componentDidMount(){
  //   axios.get('https://react-marleins-burger.firebaseio.com/ingredients.json')
  //     .then(response => {
  //       this.setState({ingredients: response.data})
  //     })
  //     .catch(error => {
  //       this.setState({error: true})
  //     })
  // }

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
    return sum > 0 // sum > 0 = true of false
      // this.setState({purchasable: sum > 0}) 
  }

  // Note that the arrow syntax is necessary, otherwise the this refers to the wrong thing (ofzo)
  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    // l. 270. Is nu veel korter door Redux. Geen query params meer.
    this.props.history.push('/checkout');
  }

  render () {
    // const om 'less' button te disablen wanneer geen ingrediënten
    const disabledInfo = {
      ...this.props.ings
    };

    for (let key in disabledInfo) {
      // This check return true or false
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null;
 
    // l.175. Spinner opzet zolang we ingredients van database nog niet hebben
    let burger = this.state.error ? <p>Ingredients can't be loaded!</p>: <Spinner />
    
    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings}/>
          <BuildControls
          // Here we bind properties (that we name ourselves) to the state
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.price}
            // l. 269. Method aangepast to enable/disable order button
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );
      orderSummary =
      <OrderSummary
        ingredients={this.props.ings}
        price={this.props.price.toFixed(2)}
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

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
    onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
  }
}

// l. 174 voor creatie reuasable hoc 'withErrorHandler'
// We can wrap it around any component that uses axios to handle its errors
// l. 267. We now have 2 hocs. That's not a problem, the props are correctly passed on
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));