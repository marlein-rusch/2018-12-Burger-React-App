import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

// The side drawer itself and the toggle button

const sideDrawer = (props) => {
  // l. 140
  let attachedClasses = [classes.SideDrawer, classes.Close]
  
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open]
  }

  // Conditionally attach different CSS classes to slide in and out
  return (
    <Aux>
      {/* boolean value dus show = true */}
      <Backdrop show={props.open} clicked={props.closed}/>
      <div className={attachedClasses.join(' ')}>
        <div className={classes.Logo}>
          <Logo/>
        </div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuth}/>
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;