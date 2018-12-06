import React from 'react';

import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.css'

const logo = (props) => (
  // src = imported, vanwege hoe webpack bundelt, want src = string naar locatie werkt niet vanwege hoe Webpack alles bundelt
  <div className={classes.Logo}>
    <img src={burgerLogo} alt="MyBurger"/>
  </div>
);

export default logo;