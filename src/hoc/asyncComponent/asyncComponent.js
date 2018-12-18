// l. 339 Adding lazy loading
import React, {Component} from 'react';

const asyncComponent = (importComponent) => {
  return class extends Component{
    state = {
      component: null
    }

    componentDidMount () {
      // Execute the function that is passed as an argument
      // Je ziet indd dat in App.js dat een naamloze functie met een return statement
      // .. in zijn geheel as argument aan asyncComponent wordt doorgegeven
      importComponent()
        .then(cmp => {
          this.setState({component: cmp.default});
        });
    }

    render() {
      const C = this.state.component;

      return C ? <C {...this.props} /> : null;
    }
  }
}

export default asyncComponent;