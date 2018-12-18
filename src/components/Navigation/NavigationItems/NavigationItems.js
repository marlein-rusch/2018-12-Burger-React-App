import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

// l.322. Updating the UI depending on the state.
// props argument toegevoegd. Komt uit Toolbar/Sidedrawer, die halen
// het weer uit Layout.js, en die weer uit Redux (!)
  const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact>Burger Builder</NavigationItem>
    {/* l. 324 Conditional UI rendering obv Auth */}
    {props.isAuthenticated ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
    {/* l. 314: Authenticate toegevoegd*/}
    {/* l 316. Conditional UI rendering op basis van Auth */}
    {!props.isAuthenticated 
      ? <NavigationItem link="/auth">Authenticate</NavigationItem>
      : <NavigationItem link="/logout">Logout</NavigationItem>}
  </ul>
);

export default navigationItems;