import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import '../src/styles/main.scss'
//引用组件
import Login from './views/login/Login'


// npm install react-router-dom --save-dev
/* eslint-disable */
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact component={Login} exact path="/"/>
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
