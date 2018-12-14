import React, {Component} from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
  
  // l.221. No way we go here without remounting, which is why we use DidMount (not DidUpdate)
  componentDidMount() {
    // l. 305. Axios code deleted (moved to actions, so Redux)
    this.props.onFetchOrders();
  }
  
  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = this.props.orders.map(order => (
        <Order 
        // id is door firebase gegenereerd
          key={order.id}
          ingredients={order.ingredients}
          price={+order.price}
        />
      ))
    }
    return (
      <div>
        {orders}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: () => dispatch(actions.fetchOrders())
  };
};

// l.221: wrapping in withErrorHandler hoc
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));