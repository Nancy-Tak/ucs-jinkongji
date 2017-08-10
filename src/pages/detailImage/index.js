import React, { Component } from 'react';
import './style.less';
import axios from '../../utils/axios';

import {
  Button,
  List,
  NavBar,
  ActivityIndicator,
  Carousel, WhiteSpace, WingBlank
} from 'antd-mobile';

export default class detailImage extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      customId : this.props.params.id,
      isHidden:false,
      truePics:[],
      enterIndex: Number(this.props.location.query.enterIndex),
      isHaveSt: true
    }
  }

  // 默认渲染
  componentWillMount(){
    this.initPage();
  }

  initPage(){
    const v = new Date().getTime();
    return axios
      .get('/api/merchant/attachments?id='+this.state.customId +
        '&type='+this.props.location.query.type + "&t=" + v
      )
      .then(response=>{
        //console.log("大图成功",response.data )
        this.setState({
          truePics: response.data,
          isHaveSt: false
        })
      })
  }

  // 隐藏nav
  handleClick(){
    //console.log("1");
    this.setState({
      isHidden : !this.state.isHidden
    })
  }

  handleBackClick(){
    //console.log("back")
    this.context.router.push(`/detailInfo/${this.state.customId}`)
  }

  render() {
    const truePics = this.state.truePics ;
    return  (
      <div  styleName="pageBox">

        {/*标题栏*/}
        <div>
          { this.state.isHidden ===false ?
            <NavBar
              className="navBar"
              onLeftClick={this.handleBackClick.bind(this)}
            >
              图片预览
            </NavBar>
            : null
          }
        </div>

        {this.state.isHaveSt ?
          <div styleName="waitDiv">
            <div styleName="waitPic">
              <ActivityIndicator size="large" animating/>
            </div>
            <div styleName="waitWords">加载中...</div>
          </div>
          :

          <div
            className="imgBox"
            onClick={this.handleClick.bind(this)}
            style={{
              height: document.documentElement.clientHeight
            }}
          >
            <WingBlank>
              <Carousel
                className="my-carousel"
                autoplay={false}
                infinite
                selectedIndex={this.state.enterIndex}
                beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                afterChange={index => console.log('slide to', index)}
              >
                {truePics.map((item, index) => (
                  <a href="#" key={index }>
                    <img
                      src={"../api/" + item.url}
                      styleName='img'
                      style={{
                        height: document.documentElement.clientHeight
                      }}
                    />
                  </a>
                ))}
              </Carousel>
            </WingBlank>
          </div>
        }
      </div>
    );
  }
}
