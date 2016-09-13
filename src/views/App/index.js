import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { NavBar } from 'antd-mobile';
import './am.less';
import 'antd/style/index.less';
import './index.less';
import 'react-photoswipe/lib/photoswipe.css';
class App extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {

  }

  render() {
    return ( <div>
            {this.props.children}
            </div>
    );
  }
}

App.propTypes = {
  user: PropTypes.object,
  children: PropTypes.node.isRequired
};

App.contextTypes = {
  history: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  const {user} = state;
  return {
      user: user ? user : null
  };
};

function mapDispatchToProps(dispatch) {
  return {

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
