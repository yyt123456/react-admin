import React from 'react'
import {Switch} from 'react-router-dom';
import user from '../../views/user/index'
import add from '../../views/add/index'
import PrivateRouter from '../../compoments/PrivateRouter/index'

/* eslint-disable */
class layoutContent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <Switch>
        <PrivateRouter component={user} path='/index/user/list' exact></PrivateRouter>
        <PrivateRouter component={add} path='/index/user/add' exact></PrivateRouter>
      </Switch>
    )
  }
}

export default layoutContent;
