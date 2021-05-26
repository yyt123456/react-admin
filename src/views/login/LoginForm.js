import React, {Component, Fragment} from 'react'
import {withRouter} from 'react-router-dom';
import './index.scss'
import {Form, Input, Button, Row, Col, message} from 'antd';
import {UserOutlined, UnlockOutlined} from '@ant-design/icons';
import {validatePassword, validateCode} from '../../utils/validate'
import {Login} from '../../api/account'
import Code from '../../compoments/code/index'
import CrytoJs from 'crypto-js'
/* eslint-disable */
class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      code: '',
      loading: false,
      modules: 'login',
    }
  }
  inputChangeUsername = (e) => {
    let val = e.target.value
    this.setState({
      username: val
    })
  }
  inputChangePassword = (e) => {
    let val = e.target.value
    this.setState({
      password: val
    })
  }
  inputChangeCode = (e) => {
    let val = e.target.value
    this.setState({
      code: val
    })
  }
  onFinish = (values) => {
    this.setState({
      loading: true
    })
    Login({
      username: this.state.username,
      code: this.state.code,
      password: CrytoJs.MD5(this.state.password).toString(),
    }).then(res => {
      message.success(res.data.message)
      this.props.history.push('/index')
      this.setState({
        loading: false
      })
    }).catch(err => {
      console.log(err)
      this.setState({
        loading: false
      })
    })
  };

  toggleLogin = () => {
    this.props.switchToggle('register')
  }

  render() {
    const {username,modules,loading} = this.state
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
              <Input value={username} onChange={this.inputChangeUsername}
                     prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="请输入邮箱"/>
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
              <Input prefix={<UnlockOutlined className="site-form-item-icon"/>} placeholder="请输入密码" onChange={this.inputChangePassword} type='password'/>
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
                  <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="请输入验证码" onChange={this.inputChangeCode}/>
                </Col>
                <Col span={9}>
                  <Code username={username} modules={modules}/>
                </Col>
              </Row>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button" block loading={loading}>登录</Button>
            </Form.Item>
          </Form>
        </div>
      </Fragment>
    )
  }
}

export default withRouter(LoginForm)