import React from 'react';

import classes from './Button.css';

const button = (props) => (
  // 'btnType' set je dus zelf wanneer je deze Button gebruik,
  // -- moet ofwel Success of Danger zijn
  <button 
    className={[classes.Button, classes[props.btnType]].join(' ')}
    onClick={props.clicked}>{props.children}</button>
);

export default button;