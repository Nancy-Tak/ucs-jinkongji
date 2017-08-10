import React from 'react';
import {Link} from 'react-router'
import classnames from 'classnames';
import './style.less';
import {InfoDisplayWrap} from 'COM';
import axios from '../../utils/axios';


export default class imagesDisplay extends React.Component {

	static propTypes = {
		name: React.PropTypes.string,
	};

	constructor(props) {
		super(props);
    this.state={
      shopId: props.dataId
    }
	}

	static contextTypes = {
		router: React.PropTypes.object.isRequired
	}

	render() {

		const { info, } = this.props;
		const { infos } = info;

		return (
			<InfoDisplayWrap title={ info.title } first="true">
					<div className="clearfix">
						{
							infos.map( (item, _index) => {
								return (
                  !item.hasOwnProperty('isDisplay') || (item.hasOwnProperty('isDisplay') && item.isDisplay) ?
                    <div
                      className=" clearfix"
                      styleName ="item"
                      key={ _index }
                    >
                      <div styleName="key"
                      >{ item.key }</div>
                      <div
                        styleName="val"
                      >
                        { item.val.map((childItem,index) =>{
                          return (
                            <div
                              className="item-img clearfix"
                              styleName="inline-block"
                              key={index}
                            >
                              <Link
                                to={
                                  {
                                    pathname: `/detailImage/${this.state.shopId}`,
                                    query:{
                                      key:item.key ,
                                      type:childItem.relateType,
                                      enterIndex:index
                                    }
                                  }
                                }
                              >
                                <img src={"../api/" + childItem.thumbnailUrl} alt="" styleName="imagesDetail"/>
                              </Link>
                            </div>
                          )
                        }) }
                      </div>
                    </div> : null
								);
							})
						}
					</div>
				</InfoDisplayWrap>
		);
	}
}
