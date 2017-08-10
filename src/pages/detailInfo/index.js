import React, { Component } from 'react';
import {Link, withRouter} from 'react-router'
import './style.less';
import axios from '../../utils/axios';
import { InfoDisplay } from 'COM';
import { ImagesDisplay } from 'COM';
import { createForm } from 'rc-form';
import {
  Button,
  List,
  NavBar,
  ActivityIndicator
} from 'antd-mobile';

class detailInfo extends React.Component {


  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      trueId: props.params.id,
      shopsInfo: {},
      testList:{},
      shopStatus: '',
      licenseType: '',
      animating: true,
       isHaveSt:false
    }
  }

  componentWillMount() {
    this.initPage()
  }

  initPage() {
    const v = new Date().getTime();
    axios
    .get('/api/merchant/detail?id=' + this.props.params.id + '&t=' + v)
    .then(response => {
      const shopsInfo = response.data;
      this.setState({
        shopsInfo,
        isHaveSt:true
      })
      // 店铺状态
       const shopStatus = response.data.status;
      switch (shopStatus) {
        case - 1:
        {
          this.setState({
            shopsInfo, shopStatus: "待启用"
          })
          break
        }
        case 1:
        {
          this.setState({
            shopsInfo,
            shopStatus: "启用 "
          })
          break
        }
      case 2:
        {
          this.setState({
            shopsInfo,
            shopStatus: "禁用"
          })
          break
        }
      default:
        {}
      }

      // 证件类型
      const licenseType = response.data.licenseType ;
      switch (licenseType) {
        case 2:
        {
          this.setState({
            shopsInfo, licenseTypes: "营业执照" ,licenseTypeKey:"营业执照注册号"
          })
          break
        }
        case 3:
        {
          this.setState({
            shopsInfo,
            licenseTypes: "社会信用证", licenseTypeKey:"社会信用证号"
          })
          break
        }
        default:
        {}
      }

      const testList = response.data;
      this.setState({
        testList,
      })
    })
  }

  // 返回
  handleBackClick=()=>{
    // console.log("back")
    this.context.router.push(`/shops`)
  }

  // 转换时间
  changeTime=(times)=>{
    const date = new Date(times);
    // return   date.getFullYear() + '-' +  (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-' +  date.getDate() + ' '
    return   date.getFullYear() + '-' +  (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-' +  (date.getDate()+1 < 10 ? '0'+(date.getDate()+1) : date.getDate()+1)
  }

  render() {
    const {shopStatus} = this.state;
    const {licenseTypes} = this.state;
    const {licenseTypeKey} = this.state;
    const shopsInfo = this.state.shopsInfo;
    const licType = shopsInfo.licenseType == "2";

        const companyInfo = {
            title: '门店基本信息',
            infos: [{
                key: '门店名称',
                val:  shopsInfo.name ,
            }, {
                key: '所属行业',
                val: shopsInfo.industryName,
            },
             {
                key: '所在地',
                val: shopsInfo.provinceName +" " +  shopsInfo.cityName + "   " + shopsInfo.areaName ,
            }, {
                key: '详细地址',
                val: shopsInfo.address,
            },{
                key: '联系电话',
                val: shopsInfo.directorPhone,
            },{
                key: '营业时间',
                val:  shopsInfo.openingBeginTime + " - " + shopsInfo.openingEndTime ,
            },{
                key: '商户负责人',
                val: shopsInfo.director,
            },{
                key: '负责人手机号',
                val: shopsInfo.directorPhone,
            },{
                key: '证件类型',
                val:licenseTypes
            },{
                key: licenseTypeKey,
                val: shopsInfo.licenseNo,
            },{
                key: '证件有效日期',
                val:  shopsInfo.licenseBeginTime ? ( this.changeTime(shopsInfo.licenseBeginTime) + " 至 " + this.changeTime(shopsInfo.licenseEndTime) ) : ' ',
            }, {
                key:  '组织机构代码',
                val:shopsInfo.certificateCode ,
              isDisPlay: licType
            },{
                key: '税务登记证编号',
                val: shopsInfo.taxNo,
                isDisPlay: licType
            },
              {
                key: '状态',
                val: shopStatus
                ,
            },
            ]
        };

        const {
          socialCreditPics=[],
          businessLicensePics=[],
          certificatePics=[],
          taxPics=[],
          industryPics=[],
          wholeFacadePics=[],
          cashierPics=[],
          innerShopPics = [],
          otherPics = [],
        } = shopsInfo;
        const imageInfo = {
            title: '图片资料',
            infos: [{
                key: '社会证扫描件',
                val:socialCreditPics,
               isDisplay: !licType
            }, {
                key: '营业执照扫描件',
                val:businessLicensePics,
                isDisplay: licType
              },{
                key: '组织机构代码扫描件',
                val:certificatePics,
                isDisplay: licType
              },{
                key: '税务登记证扫描件',
                val:taxPics,
              isDisplay: licType
              },{
                key: '行业许可证扫描件',
                val:industryPics,
              },{
                  key: '整体门面（含招牌）',
                  val:wholeFacadePics
              },{
                  key: '收银台',
                  val:cashierPics
              },{
                key: '店内环境',
                val:innerShopPics
              },{
                  key: '其他资料',
                  val: otherPics
                }
            ]
        };


        return (
            <div>
              <NavBar
                className="navBar"
                onLeftClick={this.handleBackClick}
              >
                门店信息
              </NavBar>

              {this.state.isHaveSt ?
                  <div>
                    <div
                      style={{margin:"20px"}}>
                      {/*门店基本信息*/}
                      <InfoDisplay info={ companyInfo } first={ true }/>
                    </div>
                    <div
                      style={{margin:"20px "}}>
                      {/* 图片资料*/}
                      <ImagesDisplay info={ imageInfo } dataId={this.props.params.id} first={ true }/>
                    </div>
                  </div>
                :
                <div styleName="waitDiv">
                  <ActivityIndicator size="large" animating  text="加载中..." />
                </div>
              }


            </div>
        );
    }
}
export default createForm()(detailInfo)
