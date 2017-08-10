import React, { Component } from 'react';

import './desktopSliderBox.less';

export default class DesktopSliderBox extends React.Component {

	static propTypes = {
        id: React.PropTypes.string.isRequired,
    };

	render() {
		return (
			<div styleName="slider-box" id={ this.props.id }>
				{ this.props.children }
			</div>
		);
	}
}
