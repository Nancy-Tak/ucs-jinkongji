import React from 'react';
import { Link } from 'react-router';
import InfiniteScroll from 'react-infinite-scroller';
import { Card } from 'antd-mobile';
import R from 'ramda';
import axios from '../../utils/axios';
import './List.less';

const pageSize = 16;

const propTypes = {
  location: React.PropTypes.object.isRequired,
  shopList: React.PropTypes.array,
};

class shopList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shopList: props.shopList || [],
      hasMore: false,
    };
  }

  componentDidMount() {
    const { query } = this.props.location;
    this.getShops(query).then(response => {
      const { total = 0, list = [] } = response;
      const isHasMore = Math.ceil(total / pageSize) >= 1;
      this.setState({ shopList: list, hasMore: isHasMore });
    });
  }

  componentWillReceiveProps(nextProps) {
    const { query } = this.props.location;
    const { query: nextQuery } = nextProps.location;
    if (!R.equals(query, nextQuery)) {
      this.getShops(nextQuery).then(response => {
        const { total = 0, list = [] } = response;
        const isHasMore = Math.ceil(total / pageSize) >= 1;
        this.setState({ shopList: list, hasMore: isHasMore });
      });
    }
  }


  getShops = (params) => {
    const v = new Date().getTime();
    return axios
      .get('/api/merchant/list' + '?' + v ,{
        params: {
          pageSize,
          ...params,
        }
      })
      .then(response => {
        return response.data || {};
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  loadMoreShops = (pageNum) => {
    const { shopList, hasMore } = this.state;
    const { query } = this.props.location;
    const params = { pageNum, ...query };

    if (!hasMore) return;

    this.getShops(params)
      .then(response => {
        const { total = 0, list = [] } = response;
        const isHasMore = Math.ceil(total / pageSize) >= pageNum;
        this.setState({ shopList: [...shopList, ...list], hasMore: isHasMore });
      })
      .catch(error => {
        console.log('loadMore: ', error)
      })
  };

  renderList = (shopList) => {
    if (!shopList.length) {
      return <div style={{ textAlign: 'center' }}>无相关记录</div>
    }

    return shopList.map(shop => (
      <Link
        key={shop.id}
        styleName="shopBox"
        to={`/DetailInfo/${shop.id}`}
      >
        <Card styleName="shop-card">
          <Card.Body>
            <img styleName="imgSize" src={"../api" +  shop.picUrl} />
            <div styleName="cardWords">
              <div styleName="shopNameSize"><nobr>{ shop.name }</nobr></div>
              <div styleName="shopTelSize"><nobr>{ shop.phone }</nobr></div>
              <div styleName="shopAddressSize"><nobr>{ shop.address }</nobr></div>
              {
                shop.status === "2" ?
                  <div styleName="disableBox">已禁用</div> :
                  shop.status == "-1" ?
                    <div styleName="disableBox">待启用</div> : null
              }
            </div>
          </Card.Body>
        </Card>
      </Link>
    ))
  };

  render() {
    const { shopList, hasMore } = this.state;
    return (
    <div>
      <InfiniteScroll
        pageStart={1}
        loadMore={this.loadMoreShops}
        threshold={50}
        hasMore={hasMore}
      >
        { this.renderList(shopList) }
      </InfiniteScroll>

      {/* this.state.noMoreShops ?
      <div styleName="noMoreShops">
        数据已加载到底了
      </div> : null
     */ }
    </div>
    );
  }
}

shopList.propTypes = propTypes;

export default shopList;
