import React, {Component} from 'react'
import {Button, message} from "antd";
import {GetCode} from "../../api/account";
import {validateEmail} from '../../utils/validate'
let timer = null
class Code extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: props.username,
      button_text: '获取验证码',
      button_loading: false,
      button_disabled: false,
    }
  }
  // 接收父组件传值
  componentWillReceiveProps(nextProps, nextContext) {
    console.log(nextProps,'nextProps')
    this.setState({
      username: nextProps.username
    })
  }
  // 组件销毁
  componentWillUnmount() {
    clearInterval(timer)
  }

  countDown = ()=> {
    let sec = 5
    this.setState({
      button_loading: false,
      button_disabled: true,
      button_text: `${sec}s`,
    })
    timer = setInterval(()=>{
      sec--
      if(sec === 0) {
        this.setState({
          button_disabled: false,
          button_text: `重新获取`,
        })
        clearInterval(timer)
        return
      }
      this.setState({
        button_text: `${sec}s`,
      })
    },1000)
  }

  getCode = () => {
    if (!this.state.username) {
      return message.warning('用户名不能为空')
    }
    console.log(this.state.username)
    if(!validateEmail(this.state.username)) {
      return message.warning('邮箱格式不正确')
    }
    this.setState({
      button_loading: true,
      button_text: '发送中',
    })
    GetCode({
      username: this.state.username,
      module: 'login'
    }).then(res => {
      // 执行倒计时
      this.countDown()

    }).catch(err => {
      console.log(err)
      this.setState({
        button_loading: false,
        button_text: '重新获取',
      })
    })
  }

  render() {
    return <Button type="danger" block onClick={this.getCode} disabled={this.state.button_disabled} loading={this.state.button_loading}>{this.state.button_text}</Button>
  }
}

export default Code