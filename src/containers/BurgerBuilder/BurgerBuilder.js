import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Wrap/Wrap';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
// lowercase cause we're not using it with JSX, but at the end at export
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index'; // index kan je omitten

// const you want to use globally are often capitalized by convention

// l. 350 'export' added for testing
export class BurgerBuilder extends Component{
  // Constructor syntax will also work instead of the state as used below
  // constructor(props) {
  //   super(props);
  //   this.state = {

  //   }
  // }

  state = {
    // l.269:  ingredients, totalPrice en purchasable gaan nu via Redux 
    purchasing: false
    // loading: false, // gedelete in l. 294 vanwege axios request in redux
    // error: false // gedelete in l. 294 vanwege axios request in redux
  }

  //l.175 retrieving data from the backend.
  // l. 266 WE'LL DO THIS LATER AGAIN IN REDUX STYLE
  // l. 293. Moving async code into the redux world.
  componentDidMount(){
    // l. 294. De async axios code hier uit ge-cut, en naar de redux actions
    // l 295:
    this.props.onInitIngredients();
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
    return sum > 0 // sum > 0 = true of false
      // this.setState({purchasable: sum > 0}) 
  }

  // Note that the arrow syntax is necessary, otherwise the this refers to the wrong thing (ofzo)
  // l.324. Forwarding unauthenticated users (PurchaseHandler uitgebreid)
  purchaseHandler = () => {
    if (this.props.isAuthenticated){
    this.setState({purchasing: true});
    } else {
      // l. 325. 
      this.props.onSetAuthRedirectPath('/checkout');
      this.props.history.push('/auth');
    }
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    // l. 303. Redirecting to homepage na purchase (best ingewikkeld)
    this.props.onInitPurchase();
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
 
    // l. 175. Spinner opzet zolang we ingredients van database nog niet hebben
    // l. 295: error prop nu in Redux, niet meer in local state, dus this.props.error ipv this.state.error
    let burger = this.props.error ? <p>Ingredients can't be loaded!</p>: <Spinner />
    
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
            // l. 324 Forwarding unauthenticated users
            isAuth={this.props.isAuthenticated}
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

    // if (this.state.loading) {
    //   orderSummary = <Spinner />;
    // } // gedelete in l. 294

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
    // l. 302. Combined reducers, dus nu .burgerBuilder toegevoegd (to reach that 'slice' of the combined reducer)
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    // l. 324 Forwarding unauthenticated users
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // L 292. Opzet action creators. De originele line (hieronder) vervangen.
    // onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
    // Hier hebben we een argument (ingName). Soms is dat niet zo, nl als er geen payload is.
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
    // l. 295. Move axios request naar Redux.
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    // l. 325 Redirecting the user to the Checkout page.
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  }
}

// l. 174 voor creatie reuasable hoc 'withErrorHandler'
// We can wrap it around any component that uses axios to handle its errors
// l. 267. We now have 2 hocs. That's not a problem, the props are correctly passed on
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));