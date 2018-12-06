import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

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
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
        <SideDrawer 
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

export default Layout;