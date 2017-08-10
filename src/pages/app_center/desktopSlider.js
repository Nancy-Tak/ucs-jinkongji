import React, { Component } from 'react';

import './desktopSlider.less';

export default class DesktopSlider extends React.Component {

	render() {
		return (
			<ul styleName="desktopSlider" className="clearfix">
				{
        			React.Children.map(this.props.children, function (child) {
          				return (
							<li>
								{ child }
							</li>
						);
        			})
      			}
			</ul>
		);
	}
}
