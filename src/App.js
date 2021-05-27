import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom';
//私有路由组件
import PrivateRouter from './compoments/PrivateRouter/index'
//引用组件
import Login from './views/login/Login'
import Index from './views/index/Index'


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
            <Route exact render={() => <Login/>} path="/"/>
            {/*<Route component={Index} exact path="/index"/>*/}
            <PrivateRouter component={Index}></PrivateRouter>
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
