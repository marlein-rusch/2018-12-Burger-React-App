import React, {Component} from 'react';

import Aux from '../../../hoc/Wrap/Wrap';
import Button from '../../UI/Button/Button';

// This could be a funtional component (hadden we om iets te laten zien even omgezet en niet terug omgezet)
class OrderSummary extends Component {
  
  // l. 145, ter illustratie van waar we shouldComponentUpdate kunnen implementeren.
  componentWillUpdate(){
    // console.log('[OrderSummary] WillUpdate')
  }

  render() {

    const ingredientSummary = Object.keys(this.props.ingredients)
    .map(igKey => {
      return (
        <li key={igKey}>
          <span 
            style={{textTransform: 'capitalized'}}>{igKey}: {this.props.ingredients[igKey]}
          </span>
        </li>);
    });

    return(
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong>Total Price: {this.props.price}</strong></p>
        <p>Continue to Checkout?</p>
        <Button
          btnType="Danger"
          clicked= {this.props.purchaseCancelled}
          >CANCEL</Button>
        <Button
          btnType="Success"
          clicked= {this.props.purchaseContinued}
        >CONTINUE</Button>
      </Aux>
    )
  }
}

export default OrderSummary;