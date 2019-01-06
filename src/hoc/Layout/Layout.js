// Layout is verplaatst naar de folder hoc, omdat we eigenlijk de BurgerBuilder
// .. simpelweg wrappen met de Layout Component.
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../Wrap/Wrap';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

// l. 140. const turned into class to implement method and listen to closing and opening
class Layout extends Component {

  state = {
    showSideDrawer: false // true for testing
  }
  // arrow function, so this keyword refers to the class at all time
  sideDrawerClosedHandler = () => {
    this.setState({showSideDrawer: false})
  }

  sideDrawerToggleHandler = () => {
    // NIET de line hieronder gebruiken: may lead to unexpected results due to the asynchronous nature of setState
    // WRONG: this.setState({showSideDrawer: !this.state.showSideDrawer})
    // Instead: use the function form.
    this.setState((prevState) => {
      return {showSideDrawer: !prevState.showSideDrawer};
    })
  }

  render () {
    return ( 
      <Aux>
        <Toolbar 
          isAuth={this.props.isAuthenticated}
          drawerToggleClicked={this.sideDrawerToggleHandler}
        />
        <SideDrawer 
          isAuth={this.props.isAuthenticated}
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler} 
          />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    )
  }
}

// l. 322. Updating the UI Depending on Auth State
const mapStateToProps = state => {
  return {
    // l. 322 Returns boolean value
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(Layout);