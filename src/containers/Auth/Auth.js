// l. 314

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';

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
      }
    },
    isSignup: true
  }
  // l. 325 Redirecting the User to the Checkout page 
  // l. 325 = moeilijk!!  En niet echt gelukt lijkt het.
  componentDidMount(){
    // l. 325: Make sure that we set the path if we reach this page whilst not building a burger.
    // Tweede check omdat it means we try to redirect to checkout even though we're not building a burger
    if (!this.props.buildingBurger && this.props.authRedirectPath !== '/' ) {
      this.props.onSetAuthRedirectPath();
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

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup)
  }

  // l. 317 Switch isSignup value to false/true
  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {isSignup: !prevState.isSignup}
    }) 
  };

  render(){
    const formElementsArray = [];
    for (let key in this.state.controls){
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    let form = formElementsArray.map(formElement => (
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

    // l. 319: adding a Spinner (simpel)
    if (this.props.loading) {
      form = <Spinner />
    }

    // l. 319: error message

    let errorMessage = null;

    if (this.props.error) {
      // de .message property komt van firebase
      errorMessage = (
        <p>{this.props.error.message}</p>
      )
    }

    // l. 324: Forwarding unauthenticated users
    let authRedirect = null;
    if (this.props.isAuthenticated) {
      // l. 325 Redirecting the user to the checkout page (moeilijk)
      authRedirect = <Redirect to={this.props.authRedirectPath}/>
    }

    return(
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">SUBMIT</Button>
        </form>
        <Button 
          clicked={this.switchAuthModeHandler}
          btnType="Danger">SWITCH TO {this.state.isSignup? 'SIGN IN' : 'SIGN UP'} </Button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building, // l. 325 (moeilijke les)
    authRedirectPath: state.auth.authRedirectPath // l. 325 (moeilijke les)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
    // l. 325 (moeilijke les) (Redirecting the user to the checkout page)
    // l.325 Wanneer deze action in deze component wordt gedispatched, wil je het pad altijd naar 
    // .. de vorm '/' resetten, vandaar dat we het hier harcoden.
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);