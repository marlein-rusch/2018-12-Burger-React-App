import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

// l. 140. const turned into class to implement method and listen to closing and opening
class Layout extends Component {

  state = {
    showSideDrawer: true // true for testing
  }
  // arrow function, so this keyword refers to the class at all time
  sideDrawerClosedHandler = () => {
    this.setState({showSideDrawer: false})
  }

  render () {
    return ( 
      <Aux>
        <Toolbar/>
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