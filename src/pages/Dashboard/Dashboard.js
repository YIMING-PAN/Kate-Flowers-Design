import React from "react";
import { Menu } from "antd";
import {
  LoginOutlined,
  PieChartOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { ACCOUNT_BASE_URL } from "../../routes/URLMAP";
import { Switch, Route, withRouter } from "react-router-dom";
import { getRoleId } from "../../utils/auth";
import { reqGetCustomer } from "../../api/customer";
import MyStylingBoard from "./MyStylingBoard";
import SettingProfile from "./SettingProfile";
import Sidebar from "./Sidebar";
import { isLoggedIn } from "../../utils/auth";
import "antd/dist/antd.css";
import "./dashboard.scss";

const { SubMenu } = Menu;

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setLoading: false,
      name: "",
    };
  }

  handleClick = (e) => {
    console.log("click ", e);
  };

  componentDidMount() {
    window.location.reload();
    this.updatePageData();
  }

  componentDidUpdate() {
    if (!isLoggedIn()) {
      this.props.history.push("/");
    }
  }

  updatePageData = async () => {
    this.setState({ setLoading: true });
    try {
      await reqGetCustomer(getRoleId("customer")).then((res) => {
        this.setState({ name: res.data.data.name });
      });
    } catch (e) {
      console.log(e);
    }
    this.setState({ setLoading: false });
  };

  render() {
    const { match } = this.props;
    const { setLoading, name } = this.state;

    return (
      <div className="App">
        <div className="App">
          <div id="wrapper" class="full" data-boxed-bg="">
            <div class="block block-views">
              <div id="slider" class="highlightslider">
                <div className="container">
                  <div className="dashboard-container">
                    <div className="col-8 left-panel">
                      <Switch>
                        <Route
                          path={`${match.path}/${name}/stylingboard`}
                          component={MyStylingBoard}
                        />
                      </Switch>
                    </div>
                    <div className="col-4 right-panel">
                      <div className="ant-dashboard">
                        <Sidebar name={name} />
                      </div>
                    </div>
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

export default withRouter(Dashboard);
