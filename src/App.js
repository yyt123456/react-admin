import React from 'react'
import {HashRouter, Route, Switch} from 'react-router-dom';
import '../src/styles/main.scss'
//引用组件
import Home from './views/Home'
import About from './views/About'

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
        <HashRouter>
          <Switch>
            <Route exact component={Home} exact path="/"/>
            <Route component={About} path="/about"/>
          </Switch>
        </HashRouter>
      </div>
    )
  }
}

export default App;
