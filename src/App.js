import React from "react";
import "./App.css";
import { Layout } from "antd";
import Coursetable from './coursetable';

const { Footer, Content } = Layout;

class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <Layout id="root">
        <Content id="content">
          <h1>📗课表</h1>
          <Coursetable></Coursetable>
        </Content>
        <Footer id="footer">
          <div>
            ©2020 by
            <a href="https://msun.work/">Marshall Sun</a>
          </div>
          <div>
            Proudly powered by
            <a href="https://cn.vuejs.org/">
              <img
                width="55px"
                src="https://cdn.jsdelivr.net/gh/marshall-sun/CDN@latest/coursetable/vue.svg"
                alt="Vue.js"
              />
            </a>
          </div>
        </Footer>
      </Layout>
    );
  }
}

export default App;
