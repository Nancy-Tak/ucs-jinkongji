import React from 'react';
import {withRouter} from 'react-router';
import {Toast} from 'antd-mobile';
import {axios} from 'UTILS';
import {LayoutForLogin} from 'COM';
import DesktopSlider from './desktopSlider.js';
import DesktopSliderBox from './desktopSliderBox.js';
import session from '../../utils/session';

import './style.less';

class AppCenter extends React.Component {

  constructor(props) {
		super(props);
    this.state = {
      userToken: session.getUserInfo().token,
      //financeAddress: 'http://accountcmbzd.frontpay.cn/serviceapi/osService.do',
      //cbsAddress: 'http://tcbsft.qianduan.com/SteadyInvestment/Unauthorize',
      //shopsAddress: '/shops',
      //reportsAddress: '/reports',
      financeAddress: '#',
      financeStatus: false,
      cbsAddress: '#',
      cbsStatus: false,
      shopsAddress: '#',
      shopsStatus: false,
      reportsAddress: '#',
      reportsStatus: false,
		}
	}

  getApps = () => {
    axios
    .get('/api/apps')
    .then(res => {

      const financeAddress = res.data[0].appUrl,
            cbsAddress = res.data[1].appUrl,
            shopsAddress = res.data[2].appUrl,
            reportsAddress = res.data[3].appUrl;

      const financeStatus = res.data[0].appStatus,
            cbsStatus = res.data[1].appStatus,
            shopsStatus = res.data[2].appStatus,
            reportsStatus = res.data[3].appStatus;

      if (financeStatus) {
        this.setState({
          financeAddress: financeAddress,
          financeStatus: financeStatus,
        });
      }

      if (cbsStatus) {
        this.setState({
          cbsAddress: cbsAddress,
          cbsStatus: cbsStatus,
        });
      }

      if (shopsStatus) {
        this.setState({
          shopsAddress: shopsAddress,
          shopsStatus: shopsStatus,
        });
      }

      if (reportsStatus) {
        this.setState({
          reportsAddress: reportsAddress,
          reportsStatus: reportsStatus,
        });
      }

    })
    .catch(error => {
      Toast.fail(res.message,2);
    })
  }

  cdr = (name,method,address,value) => {
    const form = document.createElement("form");
    form.method = method;
    form.action = address;
    form.style.display = 'none';
    form.id = 'cdrForm'

    const input = document.createElement("input");
    input.value = value;
    input.name = name;
    input.id = 'cdrInput';

    form.appendChild(input);
    document.body.appendChild(form);

    form.submit();
  }

  componentDidMount() {
    this.getApps();
  }

	render() {

    const {
      userToken,
      financeAddress,
      financeStatus,
      cbsAddress,
      cbsStatus,
      shopsAddress,
      shopsStatus,
      reportsAddress,
      reportsStatus,
    } = this.state;

    // const toShops = () => {
    //   // window.open('http://www.google.cn/', 'sharer', 'toolbar=0,status=0,width=548,height=325');
  	// 	this.props.router.push(shopsAddress);
  	// }

    const toShops = () => {
      shopsStatus ?
      this.props.router.push(shopsAddress)
      : Toast.fail('需要开通此应用的使用权限',2);
    };

    const toReports = () => {
      reportsStatus ?
      this.props.router.push(reportsAddress)
      : Toast.fail('需要开通此应用的使用权限',2);
    };

		return (
			<LayoutForLogin>
        <div styleName="app-center" className="clearfix">
          <DesktopSlider>
            <DesktopSliderBox id="screen1">
              <div
                className="box1"
                styleName="onclick"
                onClick={
                  () => {
                    this.cdr(
                      'ticket',
                      'POST',
                      financeAddress,
                      userToken
                    );
                  }
                }
              ></div>
              <div className="box2">
                <div className="box2-vc">
                  <div
                    className="box2-1"
                    styleName="onclick"
                    //跳转CBS
                    onClick={
                      () => {
                        this.cdr(
                          'ticket',
                          'POST',
                          cbsAddress,
                          userToken
                        );
                      }
                    }
                  ></div>
                  <div className="box2-2" styleName="onclick" onClick={toShops}></div>
                </div>
              </div>
              <div className="box3" styleName="onclick" onClick={toReports}></div>
            </DesktopSliderBox>
          </DesktopSlider>
        </div>
			</LayoutForLogin>
		);
	}
}

export default withRouter(AppCenter);
