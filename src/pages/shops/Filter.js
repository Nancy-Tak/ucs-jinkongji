import React from 'react';
import {withRouter } from "react-router";
import { InputItem, Button } from 'antd-mobile';
import AreaSelect from '../../components/AreaSelect';
import IndustrySelect from '../../components/IndustrySelect';
import axios from '../../utils/axios';

import './Filter.css';

const propTypes = {
  areaList: React.PropTypes.array,
  industrylist: React.PropTypes.array,
  onSearch: React.PropTypes.func,
};

const defaultProps = {
  areaList: [],
  industrylist: [],
  onSearch: () => {},
};

class ShopsFilter extends React.Component {
  constructor(props) {
    super(props);
    this.areaList = [];
    this.state = {
      shopName: '',
      areaList: props.areaList || [],
      industrylist: props.industrylist || [],
      area: [],
      industry: [],
    };
  }

  handleShopNameChange = (value) => {
    this.setState({ shopName: value });
  };

  onSelectArea = (value) => {
    this.setState({ area: value });
  };

  onSelectIndustry = (value) => {
    this.setState({ industry: value });
  };

  handleSearch = (e) => {
    const { location, router,} = this.props;
    const {shopName, area ,industry  } = this.state;
    	router.push({
    		pathname: location.pathname,
    		query: {
          name:  shopName,
          provinceId: area[0] || '',
          cityId: area[1] || '',
          areaId: area[2] || '',
          industryId: industry[0] || ''
    		},
    	})
  };

  render() {
    const {
      shopName, areaList,
      industrylist, area,
      industry
    } = this.state;

    return (
      <section>
        <div styleName="form">
          <InputItem
            styleName="flex-auto"
            className="ucs-input"
            placeholder="输入门店名称"
            onChange={this.handleShopNameChange}
          />
          <div styleName="picker">
            <AreaSelect
              onChange={this.onSelectArea}
            />
          </div>
          <Button
            styleName="search-btn"
            inline
            type="primary"
            children="查询"
            onClick={this.handleSearch}
          />
        </div>
      </section>
    );
  }
}

ShopsFilter.propTypes = propTypes;
ShopsFilter.defaultProps = defaultProps;

export default withRouter(ShopsFilter);
