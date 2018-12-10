// l. 217
import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css'
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
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
      price: this.props.price,
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
    let form = (
      <form>
        <input className={classes.Input} type="text" name="name" placeholder="Your Name"/>
        <input className={classes.Input} type="text" name="email" placeholder="Your Email"/>
        <input className={classes.Input} type="text" name="street" placeholder="Street"/>
        <input className={classes.Input} type="text" name="postal" placeholder="Postal code"/>
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