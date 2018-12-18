// l. 217
import React, {Component} from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css'
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
   // l. 335: REFACTORING: Use the 'updateObject' function.
    // HEB IK NIET GEIMPLMENTEERD!! (Maar handig voor reference)
// import { updateObject } from '../../../shared/utility';
// l. 337: Handig! Vrij makkelijk te implementeren, zie utility file voor notes
import { checkValidity} from '../../../shared/utility';

class ContactData extends Component {
  // l.228 (omzetting naar dit object) 
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP Code'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-mail'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliverymethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'},          
          ]
        },
        // l.302. Je kan geen lege initiële value hebben, 
        // want hij pakt pas de dropdown menu value als je iets verandert. Dus standaard 'fastest'
        value: 'fastest',
        // L. 239. Dropdown had geen validation, maar nodig om error te voorkomen.
        validation: {},
        // L. 238 Dropdown heeft geen validity normaal, maar is nodig voor overall validity check.
        valid: true
      },
    },
    formIsValid: false,
    // loading: false // l.300 Deleted because of Redux.
  }

  orderHandler = (event) => {
    // Avoid sending request to reload the page
    event.preventDefault();

    // l. 232. We can take the values from the state because it's constantly
    // .. updated with two-way binding.
    // this.setState({loading: true}) // OLD. (delete for Redux, l. 298)
   
    // l. 232. Transformation of state to get only certain values.
    const formData = {}
    for (let formElementIdentifier in this.state.orderForm) {
      // simply set key-value pairs (e.g. country = Albania), Albania being value that user enters.
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }

    //l.172: .json is the appropriate endpoint syntax for firebase
    const order = {
      ingredients: this.props.ings,
      // In real-world set-up this would not be safe: you'd recalculate the price on the server
      price: this.props.price,
      orderData: formData,
      // l. 330 Displaying user specific orders
      userId: this.props.userId
    }
    // l. 297: AXIOS-code ge-cut naar order.js action file (voor Redux)
    // l. 298: Replaced by the following (we receive our dispatch actions via this.props)
    // l. 321. token argument toegevoegd
    this.props.onOrderBurger(order, this.props.token);
  }

  // l.231 Handling User Input. 
  // Namelijk: als je typt, dan wordt dit in de input fields gevisualiseerd
  inputChangedHandler = (event, inputIdentifier) => {
    // l. 335: REFACTORING: Use the 'updateObject' function.
    // HEB IK NIET GEIMPLMENTEERD!! (Maar handig voor reference)
    // l.231 Inmutably updating any effective form elements.
    // We need 2x the spread operator, to ensure
    // .. an actual deep copy of the nested objects.
    const updatedOrderForm = {
      ...this.state.orderForm
    };
    // l. 231. Als je de Elemenconfig zou willlen gebruiken, dus 
    // .. nog een level dieper, moet je nog een keer spreaden
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };
    // Nested value aanpassen..
    updatedFormElement.value = event.target.value
    updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation) // l. 233
      // (l.236)
    updatedFormElement.touched = true
    // .. met de aangepaste nested value het hele object aanpassen..
    updatedOrderForm[inputIdentifier] = updatedFormElement
    // .. en dan de state setten met het gehele object
    // console.log('updatedform element', updatedFormElement)
    
    // l. 238. Add overall form validity
    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    
    
    this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid})
  }


  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm){
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    let form = (
      // l. 232: onsubmit.
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id} 
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            // l.235. Adding validation feedback. Invert false or true.
            invalid={!formElement.config.valid}
            // l. 235 will return false if validation property isn't set
            shouldValidate={formElement.config.validation}
            // l. 236
            touched={formElement.config.touched}
            // L.231. Veranderd van changed={this.inputChangedHandler}
            // .. naar een arrow syntax, zodat we een argument kunnen meegeven.
            changed={(event) => this.inputChangedHandler(event, formElement.id)}
          />
        ))}
        <Button 
          btnType="Success"
          disabled={!this.state.formIsValid}
        >ORDER</Button>        
      </form>
    );

    if (this.props.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    )
  }
}

// l.270. Adjusting checkout and contact data
const mapStateToProps = state => {
  return {
    // l.302 De 'slices' (burg.B & order) namen zijn gedefinieerd in de root index.js file
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    // l. 330 Displaying user specific orders
    userId: state.auth.userId
  }
}

// l. 298. HIER GAAT IETS MIS, IK WEET NIET WAT????? PRECIES HETZELFDE ALS VIDEO 298

const mapDispatchToProps = dispatch => {
  return {
    // l. 321. Auth: second argument 'token' toegevoegd
    onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));