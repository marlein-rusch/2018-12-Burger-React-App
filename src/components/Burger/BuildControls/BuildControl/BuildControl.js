import React from 'react';

import classes from './BuildControl.css';

const buildControl = (props) => (
  <div className={classes.BuildControl}>
    <div className={classes.Label}>{props.label}</div>
    {/* disabled = default property we can set on HTML button element, and props.disabled is true or false */}
    <button 
      className={classes.Less} 
      onClick={props.removed} 
      disabled={props.disabled}>Less</button>
    {/* onClick = React built in element. NB: props.added is passed down by BuildControls */}
    <button className={classes.More} onClick={props.added}>More</button>
  </div>
);

export default buildControl;