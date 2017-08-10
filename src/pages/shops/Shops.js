import React from 'react';
import { withRouter } from 'react-router';
import { NavBar } from 'antd-mobile';
import ShopsFilter from './Filter';
import ShopsList from './List';
import R from 'ramda';
import { axios, session } from '../../utils';

import './Shops.css';

class ShopsPage extends React.Component {
  getMerchantName = () => {
    const { merchantName } = session.getUserInfo();
    //console.log("用户名 ", merchantName)
    return merchantName;
  };

  handleBackClick = () => {
    this.props.router.push(`/appCenter`)
  };

  render() {
    const { location } = this.props;

    return (
      <div styleName="root">
        <NavBar
          onLeftClick={this.handleBackClick}
        >门店信息</NavBar>
        <header styleName="container header">你好，{ this.getMerchantName() }，以下是你的门店信息：</header>
        <ShopsFilter onSearch={this.getShops} />
        <div styleName="container">
          <ShopsList location={location} />
        </div>
      </div>
    );
  }
}

export default withRouter(ShopsPage);
