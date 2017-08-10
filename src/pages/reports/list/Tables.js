import React from 'react';
import { Icon } from 'antd-mobile';
import ToolTip from '../../../components/ToolTip';
import { renderAmount, renderCount } from '../../../utils/renderUtils';

import '../sumary/Sumary.css';

const popText = {
  order: '某段时间内该门店收单成功的订单数量',
  income: '某段时间内该门店收单成功的订单总和',
  netIncome: '某段时间内该门店收单成功的扣除手续费后的订单总收入',
};

const iconQuestion = (
  <Icon
    styleName="icon-question"
    type={require('../../../assets/svg/question.svg')}
  />
);

const orderTitle = (
  <div>
    <span styleName="vertical-center">收单数量</span>
    <ToolTip title={popText.order} arrowPointAtCenter >
      <span>{ iconQuestion }</span>
    </ToolTip>
  </div>
);

const incomeTitle = (
  <div>
    <span styleName="vertical-center">订单收入小计</span>
    <ToolTip title={popText.income} arrowPointAtCenter >
      <span>{ iconQuestion }</span>
    </ToolTip>
  </div>
);

const netIncomeTitle = (
  <div>
    <span styleName="vertical-center">实际收入小计</span>
    <ToolTip title={popText.netIncome} arrowPointAtCenter >
      <span>{ iconQuestion }</span>
    </ToolTip>
  </div>
);

export function getColumns() {
  return [
    { title: '门店名称', dataIndex: 'shopName', key: 'shopName' },
    { title: orderTitle, dataIndex: 'orderCount', key: 'orderCount', render: renderCount },
    { title: incomeTitle, dataIndex: 'orderAmount', key: 'orderAmount', render: renderAmount },
    { title: netIncomeTitle, dataIndex: 'receiptAmount', key: 'receiptAmount', render: renderAmount },
  ];
}
