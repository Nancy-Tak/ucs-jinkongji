import React from 'react';
import classnames from 'classnames';
import './style.less';
import {InfoDisplayWrap} from 'COM';

export default class infoDisplay extends React.Component {
	static propTypes = {
		name: React.PropTypes.string,
	};

	constructor(props) {
		super(props);
    this.state={
      isOver: false
    }
	}

	render() {

		const {
			info,
		} = this.props;

		const {
			infos
		} = info;
		return (
				<InfoDisplayWrap title={ info.title } first="true">
					<div className="clearfix"
          >
						{
							infos.map( (item, index) => {
							  return !item.hasOwnProperty('isDisPlay') || (item.hasOwnProperty('isDisPlay') && item.isDisPlay) ?
                    <div
                      className="item clearfix"
                      key={ index }
                    >
                        <div styleName="key">{ item.key }</div>
                        <div styleName="val">
                          {
                            typeof item.val == "string" && item.val.length>42 ? item.val.substr(0,41)+"..." : item.val
                          }
                        </div>
                    </div>
                  : null
							}
              )
						}
					</div>
				</InfoDisplayWrap>
		);
	}
}
