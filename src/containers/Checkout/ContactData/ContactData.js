// l. 217
import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css'
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

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
          value: ''
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: ''
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP Code'
        },
        value: ''
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: ''
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-mail'
        },
        value: ''
      },
      deliverymethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'},          
          ]
        },
        value: ''
      },
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault(); // prevent reloading the page
    console.log('this.props.ingr', this.props.ingredients)

    this.setState({loading: true})
    //alert('You continue!');
    //l.172: .json is the appropriate endpoint syntax for firebase
    const order = {
      ingredients: this.props.ingredients,
      // In real-world set-up this would not be safe: you'd recalculate the price on the server
      price: this.props.price
    }
    // second argument 'order' is the data that gets sent
    axios.post('/orders.json', order)
    // l. 173 purchasing: false zorgt ervoor dat de modal closes
      .then(response => {
        this.setState({loading: false });
        // l.178. History object beschikbaar doordat we props via de render method hebben
        // .. meegegeven onderaan in de checkout component. 
        this.props.history.push('/')
      })
      .catch(error => {
        this.setState({loading: false })
      });
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
      <form>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id} 
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
          />
        ))}
        <Button 
          btnType="Success"
          clicked={this.orderHandler}
        >ORDER</Button>        
      </form>
    );
    if (this.state.loading) {
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

export default ContactData;