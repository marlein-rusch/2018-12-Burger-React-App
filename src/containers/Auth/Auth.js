// l. 314

import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';

class Auth extends Component {

  // local state want het is gewoon alleen de inputdata op die pagina

  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      },
    }
  }

  checkValidity(value, rules) {
    // l.234. Omdraaien logica: eerst isValid op true, en naar false zetten naargelang condities.
    let isValid = true;

    if (rules.required) {
      // trim = remove whitespace at beginning and end
      isValid = value.trim() !== '' && isValid;
    }
    // die &&isValid is een beetje een trick
    // .. zodat all rules need to resolve to true
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true
      }
    };
    this.setState({controls: updatedControls})
  }

  render(){
    const formElementsArray = [];
    for (let key in this.state.controls){
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    const form = formElementsArray.map(formElement => (
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

    ))

    return(
      <div className={classes.Auth}>
        <form>
          {form}
          <Button btnType="Success">SUBMIT</Button>
        </form>
      </div>
    )
  }
}

export default Auth;