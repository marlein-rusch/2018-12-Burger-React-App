import React from 'react';

import classes from './Button.css';

const button = (props) => (
  // 'btnType' set je dus zelf wanneer je deze Button gebruik,
  // -- moet ofwel Success of Danger zijn
  <button 
    // l. 238. We need to pass on a disabled property to the native 'button'.
    // Only then it will actually be disabled (unclickable), an HTML property
    disabled={props.disabled}
    className={[classes.Button, classes[props.btnType]].join(' ')}
    onClick={props.clicked}>{props.children}</button>
);

export default button;