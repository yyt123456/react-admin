import React, {Component} from 'react'
import './index.scss'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

class Login extends Component {
  constructor() {
    super()
    this.state = {
      formType: 'login'
    }
  }

  switchToggle = (val) => {
    this.setState({
      formType: val
    })
  }

  render() {
    return (
      <div className="form-wrap">
        <div>
          {this.state.formType === 'login' ? <LoginForm switchToggle={this.switchToggle}></LoginForm> :
            <RegisterForm switchToggle={this.switchToggle}></RegisterForm>}
        </div>
      </div>
    )
  }
}

export default Login