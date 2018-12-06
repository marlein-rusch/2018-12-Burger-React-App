import React from 'react';
import classes from './DrawerToggle.css';

const drawerToggle = (props) => (
// l. 142 De drie lege DIVs zijn puur voor CSS: de drie witte streepjes in het menu item in mobile version.
  <div className={classes.DrawerToggle} onClick={props.clicked}>
    <div></div>
    <div></div>
    <div></div>
  </div>
)

export default drawerToggle;