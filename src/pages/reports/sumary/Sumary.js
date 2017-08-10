import React from 'react';
import { Icon } from 'antd-mobile';
import ToolTip from '../../../components/ToolTip';
import parseQuery from '../utils/parseQuery';
import { axios } from '../../../utils';
import { renderAmount } from '../../../utils/renderUtils';

import './Sumary.css';

const popText = {
  totalShop: '指该商户下目前为止所拥有的状态为已开启的数量',
  totalOrder: '某段时间内该商户下所有门店收单成功的订单数量',
  totalIncome: '某段时间内该商户下所有门店收单成功的累计订单总收入',
  totalNetIncome: '某段时间内该商户下所有门店收单成功的扣除手续费的总收入',
};

const propTypes = {
  location: React.PropTypes.object.isRequired,
};

class ReportsSumary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }

  componentDidMount() {
    const { query } = this.props.location;
    if (query.type) {
      this.getSumary(parseQuery(query));
    }
  }

  componentWillReceiveProps(nextProps) {
    const { query } = this.props.location;
    const { query: nextQuery } = nextProps.location;

    if (query.type !== nextQuery.type && nextQuery.type !== 'more') {
      this.getSumary(parseQuery(nextQuery));
    }

    if (nextQuery.type === 'more') {
      const { beginDate, endDate, type } = nextQuery;
      if (!beginDate || !endDate) return;
      if (query.beginDate !== beginDate || query.endDate !== endDate) {
        this.getSumary(parseQuery(nextQuery));
      }
    }
  }

  getSumary = (params) => {
    return axios
      .get('/api/finance/merchant', { params })
      .then(response => {
        const { data = {} } = response;
        this.setState({ data });
      })
      .catch(error => {
        console.log('getSumary: ', error)
      })
  }

  render() {
    const { data } = this.state;

    const iconQuestion = (
      <Icon
        styleName="icon-question"
        type={require('../../../assets/svg/question.svg')}
      />
    );

    return (
      <section styleName="root">
        <header styleName="title">汇总数据</header>
        <section styleName="list">
          <div styleName="item">
            <div styleName="item-title">
              <span styleName="vertical-center">门店总数量</span>
              <ToolTip
                title={popText.totalShop}
                arrowPointAtCenter
              >
                <span>{ iconQuestion }</span>
              </ToolTip>
            </div>
            <div styleName="count">{ data.shopCount || 0 }</div>
          </div>
          <div styleName="item">
            <div styleName="item-title">
              <span styleName="vertical-center">总收单数量</span>
              <ToolTip
                title={popText.totalOrder}
                arrowPointAtCenter
              >
                <span>{ iconQuestion }</span>
              </ToolTip>
            </div>
            <div styleName="count">{ data.orderCount || 0 }</div>
          </div>
          <div styleName="item">
            <div styleName="item-title">
              <span styleName="vertical-center">订单总收入</span>
              <ToolTip
                title={popText.totalIncome}
                arrowPointAtCenter
              >
                <span>{ iconQuestion }</span>
              </ToolTip>
            </div>
            <div styleName="count">{ renderAmount(data.orderAmount ) }</div>
          </div>
          <div styleName="item">
            <div styleName="item-title">
              <span styleName="vertical-center">实际总收入</span>
              <ToolTip
                title={popText.totalNetIncome}
                arrowPointAtCenter
              >
                <span>{ iconQuestion }</span>
              </ToolTip>
            </div>
            <div styleName="count">{ renderAmount(data.receiptAmount) }</div>
          </div>
        </section>
      </section>
    );
  }
}

ReportsSumary.propTypes = propTypes;

export default ReportsSumary;
