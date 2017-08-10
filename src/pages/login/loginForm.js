import React from 'react';
import { withRouter } from 'react-router';
import {
	Icon, Button, InputItem,
	WhiteSpace, Toast
} from 'antd-mobile';
import { createForm } from 'rc-form';
import { axios } from 'UTILS';
import session from '../../utils/session';
import lockIcon from 'ASSETS/svg/lock.svg';
import userIcon from 'ASSETS/svg/user.svg';

import './loginFormStyle.less';

class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
  		data: {},
      merchantName: '',
      userName: '',
		}
	}

	// 提交表单，校验出错后，显示第一个不通过校验的信息
	showError(errors) {
    let message = "表单校验错误";
    for (let prop in errors) {
			if (errors[prop] && errors[prop].errors && errors[prop].errors[0] && errors[prop].errors[0].message) {
				message = errors[prop].errors[0].message;
				break;
			}
    }
    Toast.fail(message, 2);
	}

  getUserInfo = () => {
    const v = new Date().getTime();
    return axios
      .all([axios.get('/api/user/merchant' + '?' + v), axios.get('/api/user/user' + '?' + v)])
      .then(axios.spread((merchant, user) => {
        return {merchant, user};
      }))
  };

  login = (formData) => {
    return axios.post('/api/login', formData);
  };

  redirectAppCenter = () => {
    this.props.router.push('/appCenter');
  };

  submit = () => {
    const { data } = this.state;
    const { form } = this.props;

    form.validateFields((errors, data) => {
      const formData = new URLSearchParams();
      formData.append('userName', data.account);
      formData.append('passWord', data.password);

      if (errors) {
        this.showError(errors);
      } else {
        this.login(formData)
          .then(response => {
            session.setUserInfo(response.data || {})
            return this.getUserInfo();
          })
          .then(response => {
            const { merchant, user } = response;
            session.setUserInfo({
              ...session.getUserInfo(),
              ...{
                userName: user.data.name,
                merchantName: merchant.data.name,
              }
            });
            this.redirectAppCenter();
          })
          .catch(error => {
            Toast.fail(error.message, 2);
          });
      }
    });
  };

	render() {
		const { data } = this.state;
		const { getFieldProps, getFieldValue, getFieldError } = this.props.form;

		const fieldProps = {
    	account: {
    		validateTrigger: 'onBlur',
    		rules: [
					{
            required: true,
            message: '登录账号不能为空'
					},
					{
            pattern: /^\S*$/,
            message: '不支持输入空格',
          },
      	]
    	},
    	password: {
    		validateTrigger: 'onBlur',
    		rules: [
    			{
      			required: true,
      			message: '登录密码不能为空'
    			}
    		]
    	}
		};

		return (
			<div styleName="loginForm">
				<InputItem
					{...getFieldProps('account',fieldProps['account'])}
					error={!!getFieldError('account')}
					onErrorClick={
						() => {
							Toast.fail(getFieldError('account'), 2);
						}
					}
        	placeholder="请输入登录账号"
					clear
					labelNumber=''
      	>
					<Icon
						type={userIcon}
						size='md'
						style={{
							verticalAlign: 'middle',
							marginLeft: '20px',
							marginRight: '20px'
						}}
					/>
				</InputItem>
				<InputItem
					{...getFieldProps('password',fieldProps['password'])}
					error={!!getFieldError('password')}
					onErrorClick={
						() => {
							Toast.fail(getFieldError('password'),2);
						}
					}
        	placeholder="请输入登录密码"
					clear
					labelNumber=''
					type='password'
      			>
					<Icon
						type={lockIcon}
						size='md'
						style={{
							verticalAlign: 'middle',
							marginLeft: '20px',
							marginRight: '20px'
						}}
					/>
				</InputItem>
				<WhiteSpace/>
				<Button
					className="btn"
					type="primary"
					onClick={this.submit}
				>
					登录
				</Button>
			</div>
		);
	}
}

const loginForm = withRouter(createForm()(LoginForm));

export default loginForm;
