import React from "react";
import { Menu } from "antd";
import {
  LoginOutlined,
  PieChartOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import "./dashboard.scss";

const { SubMenu } = Menu;

export default class Dashboard extends React.Component {
  handleClick = (e) => {
    console.log("click ", e);
  };

  render() {
    return (
      <div className="App">
        <div className="App">
          <div id="wrapper" class="full" data-boxed-bg="">
            <div class="block block-views">
              <div id="slider" class="highlightslider">
                <div class="container">
                  <div className="ant-dashboard">
                    <Menu
                      onClick={this.handleClick}
                      style={{ width: 256, height: "100%" }}
                      defaultSelectedKeys={["1"]}
                      mode="inline"
                    >
                      <Menu.Item key="1" icon={<PieChartOutlined />}>
                        Option 1
                      </Menu.Item>
                      <Menu.Item key="2" icon={<SettingOutlined />}>
                        Option 2
                      </Menu.Item>
                      <Menu.Item key="3" icon={<LoginOutlined />}>
                        Option 3
                      </Menu.Item>
                    </Menu>
                  </div>
                </div>
              </div>
            </div>

            <div id="post-wrapper" class="normal" data-sticky-header="1">
              <div class="container">
                <div class="post-container">
                  <div class="clear"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
