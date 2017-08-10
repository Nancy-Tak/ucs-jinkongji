import React from 'react';
import { Table } from 'antd-mobile';
import ToolTip from '../../../components/ToolTip';
import InfiniteScroll from 'react-infinite-scroller';
import axios from '../../../utils/axios';
import parseQuery from '../utils/parseQuery';
import { getColumns } from './Tables';

import './List.css';

const defaultPageSize = 16;

const popText = {
  order: '某段时间内该门店收单成功的订单数量',
  income: '某段时间内该门店收单成功的订单总和',
  netIncome: '某段时间内该门店收单成功的扣除手续费后的订单总收入',
};

const propTypes = {
  location: React.PropTypes.object.isRequired,
};

class ReportsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data || [],
      hasMore: false,
    };
  }

  componentDidMount() {
    const { query } = this.props.location;
    if (query.type) {
      this.setReports(query);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { query } = this.props.location;
    const { query: nextQuery } = nextProps.location;

    if (query.type !== nextQuery.type && nextQuery.type !== 'more') {
      this.setReports(nextQuery);
    }

    if (nextQuery.type === 'more') {
      const { beginDate, endDate, type } = nextQuery;
      if (!beginDate || !endDate) return;
      if (query.beginDate !== beginDate || query.endDate !== endDate) {
        this.setReports(nextQuery);
      }
    }
  }

  getReports = (params) => {
    return axios
      .get('/api/finance/shop', {
        params: {
          ...{ pageNo: 1, pageSize: defaultPageSize },
          ...params,
        }
      })
      .then(response => {
        const { data } = response;
        return data || [];
      })
  };

  setReports = (query) => {
    const params = parseQuery(query);

    return this.getReports(params)
      .then(data => {
        this.setState({
          data,
          hasMore: this.isHasMore(data.length),
        });
      })
      .catch(error => {
        console.log('setReports: ', error);
      });
  };

  loadMoreReports = (pageNo) => {
    const { data: reportList, hasMore } = this.state;
    const { query } = this.props.location;
    const params = { pageNo, ...parseQuery(query) };

    if (!hasMore) return;

    this.getReports(params)
      .then(response => {
        const { data } = response;
        this.setState({
          data: [...reportList, ...data],
          hasMore: this.isHasMore(data.length)
        });
      })
      .catch(error => {
        console.log('loadMore: ', error)
      })
  };

  isHasMore = (pageSize) => {
    return pageSize >= defaultPageSize;
  };

  renderEmptyText = () => '没有数据';

  render() {
    const { data, hasMore } = this.state;

    return (
      <section>
        <header styleName="title">详细数据</header>
        <InfiniteScroll
          pageStart={1}
          loadMore={this.loadMoreReports}
          threshold={50}
          hasMore={hasMore}
        >
          <Table
            key="id"
            emptyText={this.renderEmptyText}
            dataSource={data}
            columns={getColumns.call(this)}
          />
        </InfiniteScroll>
      </section>
    );
  }
}

ReportsList.propTypes = propTypes;

export default ReportsList;
