import React, { Fragment, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { Button } from "@material-ui/core";
import emailjs from "emailjs-com";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormDialog from "../HomePage/Dialogs";
import Script from "react-load-script";
import FeedbackForm from "../StylingBoard/StylingBoard";
import { Modal } from "antd";
import { Form, Icon, Input, Spin } from "antd";
import { reqGetCustomer, reqGetTradie } from "../../api/customer";
import { getRoleId } from "../../utils/auth";
import "../StylingBoard/stylingboard.scss";

const { TextArea } = Input;

class MyStylingBoard extends React.Component {
  state = {
    visible: false,
    loading: false,
    initialUser: "",
    stylingBoard: "",
    message: "",
    email: "",
  };

  componentDidMount() {
    this.renderUsername();
  }

  componentDidUpdate(preProps, prevState) {
    const scriptLoaded = this.state;

    if (scriptLoaded !== prevState) {
      this.renderUsername();
    }
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  onFinish = (values) => {
    this.setState({ loading: true });
    this.setState({ message: values.message, email: values.email });
    this.sendEmail();
    setTimeout(() => {
      this.setState({
        visible: false,
        loading: false,
        initialUser: "",
        stylingBoard: "",
        message: "",
        email: "",
      });
    }, 1000);
  };

  sendEmail = () => {
    const { initialUser, stylingBoard, message, email } = this.state;

    emailjs
      .send(
        "default_service",
        "template_y3k7qOdK",
        {
          initialUser,
          stylingBoard,
          message,
          email,
        },
        "user_d4hUp4GpXz1TOTjBympqO"
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
        },
        (err) => {
          console.log("FAILED...", err);
        }
      );
  };

  renderUsername = () => {
    const initialUser = window.localStorage.getItem("user") || "";
    const { scriptLoaded, loading } = this.state;

    const stylingBoard = `https://www.pinterest.com/${initialUser || ""}/ `;
    const initialUserEmail = window.localStorage.getItem("email") || "";

    const layout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };

    const tailLayout = {
      wrapperCol: {
        offset: 16,
        span: 8,
      },
    };

    if (initialUser.length > 0 && scriptLoaded) {
      return (
        <Fragment>
          <script async defer src="//assets.pinterest.com/js/pinit.js"></script>
          <a
            data-pin-do="embedUser"
            data-pin-board-width="800"
            data-pin-scale-height="600"
            data-pin-scale-width="800"
            href={stylingBoard}
          ></a>
          {/* <Button onClick={() => this.sendEmail(initialUser, stylingBoard)}> */}
          <Button onClick={this.showModal}>Share Your Board to Us</Button>
          {loading ? (
            <Modal
              visible={this.state.visible}
              title="Contact Us"
              centered
              onCancel={this.handleCancel}
              footer={null}
            >
              <Spin tip="Sending...">
                <Form {...layout} name="basic" onFinish={this.onFinish}>
                  <Form.Item
                    label="E-mail"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Please input your E-mail",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Message"
                    name="message"
                    rules={[
                      {
                        required: true,
                        message: "Please input your message",
                      },
                    ]}
                  >
                    <TextArea rows={4} />
                  </Form.Item>
                  <Form.Item {...tailLayout}>
                    <Button onClick={this.handleCancel}>Back</Button>
                    <Button
                      type="primary"
                      htmlType="submit"
                      onClick={() =>
                        this.setState({
                          initialUser: initialUser,
                          stylingBoard: stylingBoard,
                        })
                      }
                    >
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </Spin>
            </Modal>
          ) : (
            <Modal
              visible={this.state.visible}
              title="Contact Us"
              centered
              onCancel={this.handleCancel}
              footer={null}
            >
              <Form {...layout} name="basic" onFinish={this.onFinish}>
                <Form.Item
                  label="E-mail"
                  name="email"
                  initialValue={initialUserEmail}
                  rules={[
                    {
                      required: true,
                      message: "Please input your E-mail",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Message"
                  name="message"
                  rules={[
                    {
                      required: true,
                      message: "Please input your message",
                    },
                  ]}
                >
                  <TextArea rows={4} />
                </Form.Item>
                <Form.Item {...tailLayout}>
                  <Button onClick={this.handleCancel}>Back</Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={() =>
                      this.setState({
                        initialUser: initialUser,
                        stylingBoard: stylingBoard,
                      })
                    }
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
          )}
        </Fragment>
      );
    }

    return <FormDialog />;
  };

  handleScriptCreate() {
    this.setState({ scriptLoaded: false });
  }

  handleScriptError() {
    this.setState({ scriptError: true });
  }

  handleScriptLoad() {
    this.setState({ scriptLoaded: true });
  }

  render() {
    const scriptLoaded = this.state;
    return (
      <Fragment>
        <div className="pin-board">
          <Script
            url="https://assets.pinterest.com/js/pinit.js"
            onCreate={this.handleScriptCreate.bind(this)}
            onError={this.handleScriptError.bind(this)}
            onLoad={this.handleScriptLoad.bind(this)}
          />
          {scriptLoaded ? this.renderUsername() : <CircularProgress />}
        </div>

        <div id="post-wrapper" class="normal" data-sticky-header="1">
          <div class="container">
            <div class="post-container">
              <div class="clear"></div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default withRouter(MyStylingBoard);
