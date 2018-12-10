import React, {Component} from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  // Dummy data to be replaced
  state = {
    ingredients: null,
    price: null
  }

  // l. 216 There is no way we can route to this component
  // .. without it being mounted again, that's why we use componentDidMount.
  // l. 218. Veranderd naar WillMount, uitleg min. 7:42. Basically zodat state gegevens niet als 'null' worden doorgegven, want dat bugt.
  componentWillMount(){
    // URSearchParams = built in. We grijpen de tekst uit de URL zoals we die zelf manueel hebben opgebouwd in de purchaseContinueHandler in BurgerBuilder.js
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0
    for(let param of query.entries()){
      // l.216: the 0 and 1 are simply due to URLSearchParams format, that comes as: 'bacon','1'
      // the + converts the value to a number. 
      // l. 218: taking out price first.
      if (param[0] === 'price') {
        price = param[1]
      } else {
      ingredients[param[0]] = +param[1]
      }
    }
    this.setState({ingredients: ingredients, totalPrice: price })
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data')
  }


  render() {
    return(
      <div>
        <CheckoutSummary 
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route 
          path={this.props.match.path + '/contact-data'} 
          // eerst was dit 'component={ContactData}' (ipv render). Maar met render kan je ook props meegeven!
          // l. 218. De props tussen haakjes waren er eerst überhaupt niet. Zijn gewoon
          // .. beschikbaar via de render method, en is nodig om homescherm na bevestiging te rerenderen.
          render={(props) => <ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>}
          />
      </div>
    )
  }
}

export default Checkout;