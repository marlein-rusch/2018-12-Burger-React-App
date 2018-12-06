import React, {Component} from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

// l. 174 voor creatie reuasable hoc 'withErrorHandler'
// We can wrap it around any component that uses axios to handle its errors
const withErrorHandler = (WrappedComponent, axios) => {
  
  // class 'factory', so anynomous, no name
  return class extends Component {

    state = {
      error: null
    }
    // l.175. Dit was eerst compDidMount, maar was niet handig, want als we dan de ingredients
    // niet weten te fetchen dan blijft het spinnen en krijgen we geen error (heeft met volgorde van de lifecycles te maken)
    componentWillMount() {
      // .174. I want to clear errors so that whenever I send a request I don't have my error set up anymore
      // .176 this.reqInterceptor toegevoegd voor de compWillUnmount
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({error: null});
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(res => res, error => {
        this.setState({error: error});
      });
    }

    // l.176: We should remove the interceptors when we wrap the withErrorHandler around another component.
    // In the worst case unremoved interceptors can lead to errors, and in best case they leak memory: it's code
    // ..that still runs that is not required anymore. Therefore this lifecycle hook.
    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }
    
    errorConfirmedHandler = () => {
      this.setState({error: null})
    }

    render () {
      return(
        <Aux>
          <Modal 
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}
            >
            {/* the 'error' contains a message, zit er gewoon in, niet zelf gemaakt ofzo */}
            {this.state.error ? this.state.error.message: null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  }
}

export default withErrorHandler;