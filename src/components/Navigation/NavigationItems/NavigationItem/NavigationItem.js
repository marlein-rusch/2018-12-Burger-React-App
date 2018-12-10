import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.css';

const navigationItem = (props) => (
  <li className={classes.NavigationItem}>
  {/* l.220. NavLink van gemaakt ipv <a> NavLink ipv Link zodat het de active style krijgt die we kunnen gebruiken voor CSS */}
   <NavLink 
      to={props.link}
      exact={props.exact}
      // activeClassName = ingebouwd. Is the active className as 
      // our CSS modules spits it out. Sluit aan op active van NavLink.
      activeClassName={classes.active}>
    {props.children}
    </NavLink>
  </li>
)

export default navigationItem