import React, {Component} from 'react';

import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Wrap/Wrap';

class Modal extends Component {
  // l. 145 (shouldCompUpdate en omzetting naar class)
  // Deze shouldComp zorgt ervoor dat de Modal, en dus de wrapped component 
  // .. 'OrderSummary' in de BurgerBuilder niet onnodig (wanneer niet visible) worden geupdate
  shouldComponentUpdate(nextProps, nextState) {
    // returns a boolean
    // de children blabla is nodig voor de Spinner
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  }

  // l. 145, ter illustratie van waar we shouldComponentUpdate kunnen implementeren.
  componentWillUpdate () {
    // console.log('[Modal] will update')
  }

  render(){
    return(
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
        <div 
          className={classes.Modal}
          // vh = viewport height, will slide it off the screen
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1': '0'
          }}
          >
          {this.props.children}
        </div>
      </Aux>)
  }
} 

export default Modal;