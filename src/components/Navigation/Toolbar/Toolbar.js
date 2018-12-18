import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'

const toolbar = (props) => (
  <header className={classes.Toolbar}>
    {/* button by Marlein */}
    <DrawerToggle clicked={props.drawerToggleClicked}/>
    <div className={classes.Logo}>
      <Logo/>
    </div>
    <nav className={classes.DesktopOnly}>
    {/* l. 322. isAutenthicated: Updating UI depending on Auth stat
    props.isAuth wordt doorgegeven door Layout.js, waar het weer uit Redux wordt gehaald.
    */}
      <NavigationItems isAuthenticated={props.isAuth}/>
    </nav>
  </header>
);

export default toolbar;