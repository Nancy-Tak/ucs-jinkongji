import React from 'react';
import { Link, withRouter } from 'react-router'
import {
  Button, NavBar,
  Toast, Modal
} from 'antd-mobile';
import { InfoDisplay } from 'COM';
import { axios, session } from 'UTILS';

const alert = Modal.alert;

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      channelInfo:{},
      accountInfo:{},
    }
  }

  componentWillMount() {
    this.getData();
  }

  getChannelInfo() {
    const v = new Date().getTime();
    return axios.get('/api/user/merchant' + '?' + v);
  }

  getAccountInfo() {
    const v = new Date().getTime();
    return axios.get('/api/user/user' + '?' + v);
  }

  getData = () => {
    axios
      .all([this.getChannelInfo(), this.getAccountInfo()])
      .then(
        axios.spread((channelInfo, accountInfo) => {
          const channelInfoStatus = channelInfo.status;
          const accountInfoStatus = accountInfo.status;

          if (channelInfoStatus === 1 && accountInfoStatus === 1) {
            this.setState({
              channelInfo: channelInfo.data,
              accountInfo: accountInfo.data,
            });
          } else if (channelInfoStatus === 1 && accountInfoStatus === 0) {
            this.setState({
              channelInfo: channelInfo.data,
            });
            Toast.fail(accountInfo.message, 2);
          } else if (channelInfoStatus === 0 && accountInfoStatus === 1) {
            this.setState({
              accountInfo: accountInfo.data,
            });
            Toast.fail(channelInfo.message, 2);
          } else if (channelInfoStatus === 0 && accountInfoStatus === 0) {
            Toast.fail('加载商户和账户信息出错，请稍后再试', 2);
          }
        })
      )
      .catch(error => {
        console.log(error);
      });
  };

  logout = () => {
    const { router } = this.props;
    axios
      .get('/api/logout')
      .then(res => {
        session.clearUserInfo();
        router.push('/');
        Toast.info('您已经成功注销账号', 2);
      })
      .catch(error => {
        Toast.fail(res.message, 2)
      })
  };

  logoutConfirm = () => {
    const alertLougout = alert('您正在注销账户', '未提交的内容将会丢失，是否继续?', [
      {
        text: '取消',
        onPress: () => console.log('cancel')
      },
      {
        text: '确定注销',
        style: {fontWeight: 'bold'},
        onPress: this.logout
      },
    ]);
  };

  render() {
    const {
      channelInfo,
      accountInfo,
    } = this.state;

    const channelInfoReset = {
      title: '商户信息',
      infos: [
        {
          key: '商户名称',
          val: channelInfo.name,
        },
        {
          key: '商户证件号',
          val: channelInfo.licenseNo,
        },
        {
          key: '商户负责人',
          val: channelInfo.director,
        },
        {
          key: '公司地址',
          val: channelInfo.address,
        }
      ]
    };

    const accountInfoReset = {
      title: '账户信息',
      infos: [
        {
          key: '账号名称',
          val: accountInfo.name,
        },
        {
          key: '账号角色',
          val: accountInfo.role,
        },
        {
          key: '操作人姓名',
          val: accountInfo.realName,
        },
        {
          key: '手机号码',
          val: accountInfo.phone,
        },
        {
          key: '常用邮箱',
          val: accountInfo.email,
        },
        {
          key: '状态',
          val: accountInfo.statusText,
        }
      ]
    };

    return (
      <div>
        <NavBar
          className="navBar"
          onLeftClick={() => {
            this.props.router.push('/appCenter');
          }}
        >
          账户管理
        </NavBar>
        <div style={{ margin: 20 }}>
          {/*商户信息*/}
          <InfoDisplay info={channelInfoReset} first={true} />
        </div>
        <div style={{ margin: 20 }}>
          {/*账户信息*/}
          <InfoDisplay info={accountInfoReset} first={true} />
        </div>
        <div
          style={{
            maxWidth: '40%',
            margin: '0 auto',
          }}
        >
          <Button
            className="btn"
            type="primary"
            children="退出登录"
            onClick={this.logoutConfirm}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(Account)
