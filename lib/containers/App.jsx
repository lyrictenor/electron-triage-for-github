import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import * as settingActionCreators from '../actions/settingActionCreators';
import { decryptData } from '../utils/cryptData';


function mapStateToProps (state) {
  return {
    router: state.router,
    setting: Object.assign(
      {},
      state.setting,
      {
        token: decryptData(state.setting.token)
      }
    )
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ ...settingActionCreators }, dispatch);
}

class App extends Component {
  render() {
    const { children } = this.props;
    return (
      <div>{children}</div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
