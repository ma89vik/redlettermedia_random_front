import React from 'react';
import { Layout, Menu, Row, Col } from 'antd';
import './App.css';
import RlmRandom from './components/RlmRandom';
import RlmWheel from './components/RlmWheel';
import { Route, Switch, Link, Redirect } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

const App = () => (
  <div className="App">
    <Layout className="layout">
    <Header>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1"><Link to="/rlm/random">Random Episode</Link></Menu.Item>
        <Menu.Item key="2"><Link to="/rlm/wheel">Wheel of the Wheel of the Worst</Link></Menu.Item>
        <Menu.Item className="menuRight" key="4"><a href="https://patreon.com/redlettermedia">RLM Patreon</a></Menu.Item>
      </Menu>
    </Header>
    <Row justify="center">
      <Col>
      <Content >
      <Switch>
        <Route path="/rlm/random">
          <RlmRandom />
        </Route>
        <Route path="/rlm/wheel">
          <RlmWheel />
        </Route>
        <Route path="/">
          <Redirect to="/rlm/random"/>
        </Route>
      </Switch>

    </Content>
      </Col>


    </Row>

    <Footer style={{ textAlign: 'center' }}> This site is a fan project and is in no way affiliated with Redlettermedia </Footer>
  </Layout>,
  </div>
);

export default App;

