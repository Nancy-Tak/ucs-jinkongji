import React from 'react';
import { withRouter } from 'react-router';
import { LayoutForLogin } from 'COM';
import LoginForm from './loginForm';
import session from '../../utils/session';
import './style.less';

class Login extends React.Component {

	redirectAppCenter = () => {
		const userInfo = session.getUserInfo();
    if (userInfo && userInfo.userName) {
      this.props.router.push('/appCenter')
    }
	}

	componentDidMount() {
		this.redirectAppCenter();
	}

	render() {
		return (
      <LayoutForLogin>
        <div styleName="login-wrap">
          <LoginForm/>
        </div>
      </LayoutForLogin>
		);
	}

}

export default withRouter(Login);
