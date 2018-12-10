import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


class Orders extends Component {
  state = {
    orders: [],
    loading: true // initially true because we start with loading
  }
  
  // l.221. No way we go here without remounting, which is why we use DidMount (not DidUpdate)
  componentDidMount() {
    axios.get('/orders.json')
    .then(res => {
      const fetchedOrders = [];
      for (let key in res.data) {
        fetchedOrders.push(
          {...res.data[key],
          // key (de property key) is gewoon het nr gecreëerd door firebase,
          id: key
        });
      }      
      this.setState({loading: false, orders: fetchedOrders})
      console.log('res.data: ', this.state.orders.fetche);
    })
    .catch(error => {
      this.setState({loading: false})
    })
  }
  
  render() {
    return (
      <div>
        {this.state.orders.map(order =>
        // order.id is hier dus die firebase id die we in de state hebben gestopt na het te hebben gefetched
          <Order 
            key={order.id}
            ingredients={order.ingredients}
            price={+order.price}
          />
        )}
      </div>
    );
  }
}

// l.221: wrapping in withErrorHandler hoc
export default withErrorHandler(Orders, axios);