// Backdrop is zwarte transparante achtergrond of..?

import React from 'react';

import classes from './Backdrop.css';

const backdrop = (props) => (
  // null = nothing get's rendered
  props.show ? <div className={classes.Backdrop} onClick={props.clicked}></div> : null
);

export default backdrop;