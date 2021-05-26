import React, {Component, Fragment} from 'react'
import './index.scss'
import {Form, Input, Button, Row, Col, message} from 'antd';
import {UserOutlined, UnlockOutlined} from '@ant-design/icons';
import Code from '../../compoments/code/index'
import {validate_password} from '../../utils/validate'
import {Register} from '../../api/account'
import CrytoJs from 'crypto-js'

class RegisterForm extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      modules: 'register',
      code: '',
      password: ''
    }
  }

  onFinish = (values) => {
    console.log('Received values of form: ', values);
    Register({
      username: this.state.username,
      code: this.state.code,
      password: CrytoJs.MD5(this.state.password).toString()
    }).then(res => {
      message.success(res.data.message)
      if(res.data.resCode === 0) {
        this.toggleLogin()
      }
    }).catch(err => {
      console.log(err)
    })
  };
  toggleLogin = () => {
    this.props.switchToggle('login')
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
  inputChangePasswords = (e) => {
    let val = e.target.value
    this.setState({
      passwords: val
    })
  }
  inputChangeCode = (e) => {
    let val = e.target.value
    this.setState({
      code: val
    })
  }

  render() {
    const {username, modules} = this.state
    return (
      <Fragment>
        <div className="form-header">
          <div className="colunm">注册</div>
          <span onClick={this.toggleLogin}>登录</span>
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
              rules={[{required: true, message: '邮箱不能为空'}, {type: 'email', message: '邮箱格式不正确'}]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="请输入邮箱"
                     onChange={this.inputChangeUsername}/>
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {required: true, message: '密码不能为空'},
                ({getFieldValue}) => ({
                  validator(row, value) {
                    if (!validate_password(value)) {
                      return Promise.reject('请输入大于6位小于20位密码')
                    }
                    if (getFieldValue('passwords') && value !== getFieldValue('passwords')) {
                      return Promise.reject('两次密码不一致')
                    }
                    return Promise.resolve()
                  }
                })
              ]}
            >
              <Input prefix={<UnlockOutlined className="site-form-item-icon"/>} placeholder="请输入密码" type='password'
                     onChange={this.inputChangePassword}/>
            </Form.Item>

            <Form.Item
              name="passwords"
              rules={[
                {required: true, message: '密码不能为空'},
                ({getFieldValue}) => ({
                  validator(row, value) {
                    if (getFieldValue('password') !== value) {
                      return Promise.reject('两次密码不一致')
                    }
                    return Promise.resolve()
                  }
                })
              ]}
            >
              <Input prefix={<UnlockOutlined className="site-form-item-icon"/>} placeholder="请输入密码" type='password'
                     onChange={this.inputChangePasswords}/>
            </Form.Item>

            <Form.Item
              name="code"
              rules={[{required: true, message: '请输入6位验证码', len: 6}]}
            >
              <Row gutter={13}>
                <Col span={15}>
                  <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="请输入验证码"
                         onChange={this.inputChangeCode}/>
                </Col>
                <Col span={9}>
                  <Code username={username} modules={modules}/>
                </Col>
              </Row>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button" block>注册</Button>
            </Form.Item>
          </Form>
        </div>
      </Fragment>
    )
  }
}

export default RegisterForm