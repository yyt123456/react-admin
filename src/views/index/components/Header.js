import React, {Fragment} from 'react'
import './aside.scss'
class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }s

  render() {
    return (
      <Fragment>
        <div className='logo'>
          <span>Aside</span>
        </div>
      </Fragment>
    )
  }
}

export default Header