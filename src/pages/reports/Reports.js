import React from 'react';
import { Link, withRouter } from 'react-router';
import { NavBar } from 'antd-mobile';
import Menu from './Menu';
import Sumary from './sumary/Sumary';
import List from './list/List';
import session from '../../utils/session';

import './Reports.css';

const TYPES = ['today', 'yesterday', 'week', 'month', 'more'];

const propTypes = {
  location: React.PropTypes.object.isRequired,
};

class ReportsPage extends React.Component {
  componentWillMount() {
    const {query = {}} = this.props.location;
    if (!~TYPES.indexOf(query.type)) {
      this.props.router.push('/reports?type=today');
    }
  }

  getMerchantName =  () => {
    const { merchantName } = session.getUserInfo();
    return merchantName;
  };

  redirectAppCenter = () => {
    this.props.router.push(`/appCenter`)
  };

  render() {
    const { location } = this.props;

    return (
      <div styleName="root">
        <NavBar  onLeftClick={this.redirectAppCenter}>财务报表</NavBar>
        <header styleName="header">你好，{ this.getMerchantName() }，以下是你的财务报表：</header>
        <Menu location={location} />
        <Sumary location={location} />
        <List location={location} />
      </div>
    );
  }
}

ReportsPage.propTypes = propTypes;

export default withRouter(ReportsPage);
