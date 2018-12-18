// l.323. Adding a Logout Link
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../../store/actions/index';


class Logout extends Component {

  componentDidMount () {
    this.props.onLogout();

  }

  render() {
    // l.323. Instantly redirect. Handig!
    // We make sure that the logout container gets loaded for /logout,
    // waar je heen navigate als je erop klikt rechtsbovenaan
    return <Redirect to="/"/>;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.logout())
  }
}

export default connect(null, mapDispatchToProps)(Logout);