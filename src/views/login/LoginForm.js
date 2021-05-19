import React, {Component, Fragment} from 'react'
import './index.scss'
import {Form, Input, Button, Row, Col, message} from 'antd';
import {UserOutlined, UnlockOutlined} from '@ant-design/icons';
import {validatePassword, validateCode} from '../../utils/validate'
import {Login, GetCode} from '../../api/account'

/* eslint-disable */
class LoginForm extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      code_button_loading: false,
      code_button_text: '获取验证码',
    }
  }

  onFinish = (values) => {
    Login().then(res => {

    }).catch(err => {
      console.log(err)
    })
  };

  toggleLogin = () => {
    this.props.switchToggle('register')
  }

  inputChange = (e) => {
    let val = e.target.value
    this.setState({
      username: val
    })
  }

  getCode = () => {
    if (!this.state.username) {
      return message.warning('用户名不能为空')
    }
    this.setState({
      code_button_loading: true,
      code_button_text: '发送中',
    })
    GetCode({
      username: this.state.username,
      module: ''
    }).then(res => {

    }).catch(err => {
      console.log(err)
      this.setState({
        code_button_loading: false,
        code_button_text: '重新获取',
      })
    })
  }

  render() {
    const _this = this
    const {username, code_button_loading, code_button_text} = this.state
    return (
      <Fragment>
        <div className="form-header">
          <div className="colunm">登录</div>
          <span onClick={this.toggleLogin}>账号注册</span>
        </div>
        <div className="form-content">
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{remember: true}}
            onFinish={this.onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {required: true, message: '邮箱不能为空'},
                {type: 'email', message: '邮箱格式不正确'}
                // ({ getFieldValue }) => ({
                //   validator(rule, value) {
                //     if (validateEmail(value)) {
                //       _this.setState({
                //         code_button_disabled: false
                //       })
                //       return Promise.resolve()
                //     } else {
                //       return Promise.reject('邮箱格式不正确')
                //     }
                //
                //   },
                // }),
              ]}
            >
              <Input value={username} onChange={this.inputChange}
                     prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"/>
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {required: true, message: '密码不能为空'},
                // ({ getFieldValue }) => ({
                //   validator(rule, value) {
                //     if (value.length < 6) {
                //       return Promise.reject(new Error('密码不能小于6位'));
                //     } else {
                //       Promise.resolve()
                //     }
                //
                //   },
                // }),
                // {min: 6, message: '密码不能小于6位'},
                // {max: 20, message: '密码不能d大于20位'},
                {pattern: validatePassword, message: '密码格式不正确'},
              ]}
            >
              <Input prefix={<UnlockOutlined className="site-form-item-icon"/>} placeholder="Password"/>
            </Form.Item>

            <Form.Item
              name="code"
              rules={[
                {required: true, message: '验证码不能为空'},
                {pattern: validateCode, message: '验证码格式不正确'}
              ]}
            >
              <Row gutter={13}>
                <Col span={15}>
                  <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="请输入验证码"/>
                </Col>
                <Col span={9}>
                  <Button type="danger" block loading={code_button_loading} onClick={this.getCode}>{code_button_text}</Button>
                </Col>
              </Row>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button" block>登录</Button>
            </Form.Item>
          </Form>
        </div>
      </Fragment>
    )
  }
}

export default LoginForm