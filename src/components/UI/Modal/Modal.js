import React from 'react';

import classes from './Modal.css';

const modal = (props) => (
  <div 
    className={classes.Modal}
    // vh = viewport height, will slide it off the screen
    style={{
      transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
      opacity: props.show ? '1': '0'
    }}
    >
    {props.children}
  </div>
);

export default modal;