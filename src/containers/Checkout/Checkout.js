import React, {Component} from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  // l. 270: State & ComponentWillMount met queryparam shizzle WEG door redux approach


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
          ingredients={this.props.ings}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route 
          path={this.props.match.path + '/contact-data'} 
          // l.270 De render method, die we eerst nodig hadden voor het rondmoven van state,
          // nl zo: render={(props) => <ContactData ingredients={this.props.ings} price={this.props.price} {...props}/>}
          // Die is verwijderd, en vervangen door een gewone 'component' die de redux state gebruikt
          component={ContactData}
          />
      </div>
    )
  }
}

// l.270. Adjusting checkout and contact data
const mapStateToProps = state => {
  return {
    ings: state.ingredients
  }
};
// NB: Als je alleen mapDispatchToProps zou hebben, dan altijd als 2e arg:
// export default connect(null, mapDispatchToProps)(Checkout);
export default connect(mapStateToProps)(Checkout);