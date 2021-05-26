import React, {Fragment} from 'react'
import {Layout} from 'antd'
import './layout.scss'
import Aside from './components/Aside'
import LayoutHeader from './components/Header'

const {Sider, Header, Content} = Layout

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <Fragment>
        <Layout className='layout'>
          <Header className='layout-header'>
            <LayoutHeader></LayoutHeader>
          </Header>
          <Layout>
            <Sider width='250px'><Aside></Aside></Sider>
            <Content className='layout-content'>内容</Content>
          </Layout>
        </Layout>
      </Fragment>
    )
  }
}

export default Index