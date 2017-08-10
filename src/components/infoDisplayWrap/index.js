import React from 'react';

import classnames from 'classnames';

import './style.less';

export default class infoDisplayWrap extends React.Component {
	static propTypes = {
		name: React.PropTypes.string,
	};

	constructor(props) {
		super(props);
	}

	render() {
		const {
			title,
			first
		} = this.props;

		const containerStyleName = classnames({
			'infoContainer': true,
			'firstContainer': first,
		});

		return (
			<div styleName={ containerStyleName }>
				<div styleName="title">
					{ title }
				</div>
				<div styleName="body">
					{ this.props.children }
				</div>
			</div>
		);
	}
}