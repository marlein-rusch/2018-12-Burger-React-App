import React, {Component} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import * as actions from '../../store/actions/index';

class Checkout extends Component {

  // l. 270: State & ComponentWillMount met queryparam shizzle WEG door redux approach

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data')
  }


  render() {
    // l 301 (Redirect if no ingredients selected)
    let summary = <Redirect to="/"/>
    
    if (this.props.ings) {
      const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
      summary = (
        <div>   
           {/* l. 303. Interesting approach! purchasedRedirect redirect dus indien de 
            .. 'purchased' part van de 'order' slice van de Redux state true is. 
            .. Indien dat zo is, dan wordt dat hele stukje
            .. <CheckoutSummary> en <Route> dus gewoon overgeslagen, want je gaat nr andere page  */}
          {purchasedRedirect}
          <CheckoutSummary 
            ingredients={this.props.ings}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}/>
          <Route 
            path={this.props.match.path + '/contact-data'} 
            // l.270 De render method, die we eerst nodig hadden voor het rondmoven van state,
            // nl zo: render={(props) => <ContactData ingredients={this.props.ings} price={this.props.price} {...props}/>}
            // Die is verwijderd, en vervangen door een gewone 'component' die de redux state gebruikt
            component={ContactData}/>
        </div>
      );
    }
    // l. 301: So this is now redirect (if no ingredients), or the code above.
    return summary
  }
}

// l.270. Adjusting checkout and contact data
const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  }
};

// NB: Als je alleen mapDispatchToProps zou hebben, dan altijd als 2e arg:
// export default connect(null, mapDispatchToProps)(Checkout);
export default connect(mapStateToProps)(Checkout);