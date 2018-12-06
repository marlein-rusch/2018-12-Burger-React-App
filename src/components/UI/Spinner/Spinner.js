import React from 'react'

import classes from './Spinner.css'

// 'loading' is a fallback for if ever CSS doesn't work
const spinner = () => (
  <div className={classes.Loader}>Loading...</div>
)

export default spinner;