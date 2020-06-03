import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { handleVisible as handleVisibleAction } from "../../redux/actions/loginAction";
import { Avatar, Typography } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {
  isLoggedIn,
  removeToken,
  removeUserId,
  removeRoleId,
  getRoleId,
} from "../../utils/auth";
import { reqGetCustomer } from "../../api/customer";
import CreateProfile from "../CreateProfile/CreateProfile";
import Button from "@material-ui/core/Button";
import Login from "../Login/Login";
import FormDialog from "./Dialogs";
import "./navigation.scss";

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRegister: false,
      showModal: false,
      showModalExitWarning: false,
      userRoleId: "",
      setLoading: false,
      name: "",
      avatar: "",
      anchorEl: null,
    };
  }

  componentDidMount() {
    this.updatePageData();
  }

  updateRegisterStatus = (isRegister) => {
    this.setState({ isRegister });
  };

  handleShowModal = (isShow) => {
    this.setState({ showModal: isShow });
  };

  handleCloseModal = () => {
    this.setState({ showModalExitWarning: true });
  };

  handleCloseModalExitWarning = () => {
    this.setState({ showModalExitWarning: false });
  };

  handleExitEditing = () => {
    this.setState({ showModal: false, showModalExitWarning: false });
  };

  // logout = () => {
  //   console.log(this.props.history);
  //   removeToken();
  //   removeUserId();
  //   removeRoleId();
  //   this.props.history.push("/inspiration-board");
  //   localStorage.clear();
  // };

  updatePageData = async () => {
    this.setState({ setLoading: true });
    try {
      await reqGetCustomer(getRoleId("customer")).then((res) => {
        this.setState({ name: res.data.data.name });
        this.setState({ avatar: res.data.data.avatar });
        window.localStorage.setItem("user", res.data.data.name);
        window.localStorage.setItem("adminCheck", res.data.data._id);
      });
    } catch (e) {
      console.log(e);
    }
    this.setState({ setLoading: false });
  };

  renderLogin = () => {
    const {
      location: { pathname: currentPath },
      handleVisible,
    } = this.props;

    const customerId = getRoleId("customer");
    const tradieId = getRoleId("tradie");
    const userRoleId = customerId || tradieId;
    const { name, avatar, setLoading, anchorEl } = this.state;

    const StyledMenu = withStyles({
      paper: {
        border: "1px solid #d3d4d5",
      },
    })((props) => (
      <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        {...props}
      />
    ));

    const handleClick = (event) => {
      this.setState({ anchorEl: event.currentTarget });
    };

    const handleClose = () => {
      this.setState({ anchorEl: null });
    };

    if (isLoggedIn()) {
      return (
        <>
          {!setLoading ? (
            <li class="first expanded menu-item menu-item-has-children">
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                <div className="profile-div">
                  <div className="profile-username">Hi, {name}</div>
                </div>
              </Button>
              <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <Link
                    to={`/dashboard/${name}/stylingboard`}
                    className="nav-link"
                    // onClick={() => this.logout()}
                  >
                    Dashboard
                  </Link>
                </MenuItem>
                {/* <MenuItem onClick={handleClose}>
                  <Link
                    to={currentPath}
                    className="nav-link"
                    onClick={() => this.logout()}
                  >
                    Log out
                  </Link>
                </MenuItem> */}
              </StyledMenu>
            </li>
          ) : (
            <li class="first expanded menu-item menu-item-has-children">
              Loading
            </li>
          )}
        </>
      );
    }

    return (
      <>
        <li class="first expanded menu-item menu-item-has-children">
          <Link className="nav-link" onClick={() => handleVisible(true)}>
            <Button variant="outlined" size="small" disableElevation>
              Log in/Register
            </Button>
          </Link>
        </li>
      </>
    );
  };

  renderStylingBoard = () => {
    const { setLoading, name } = this.state;
    const initialUser = window.localStorage.getItem("user") || "";
    if (!isLoggedIn()) {
      return (
        <>
          {!setLoading && initialUser.length > 0 ? (
            <li class="last leaf">
              <Link
                to={`/stylingboard`}
                className="nav-link"
                // onClick={() => this.logout()}
              >
                Styling Board
              </Link>
            </li>
          ) : (
            <li class="last leaf">
              <FormDialog />
            </li>
          )}
        </>
      );
    }

    // return (
    //   <>
    //     {initialUser.length > 0 ? (
    //       <li class="last leaf">
    //         <a href="/stylingboard">Styling Board</a>
    //       </li>
    //     ) : (
    //       <li class="last leaf">
    //         <FormDialog />
    //       </li>
    //     )}
    //   </>
    // );
  };

  renderCatalogue = () => {
    const { setLoading } = this.state;
    const adminCheck = window.localStorage.getItem("adminCheck") || "";
    if (
      isLoggedIn() &&
      !setLoading &&
      adminCheck === "5ed6821dabbfb90022916970"
    ) {
      return (
        <>
          <li class="last leaf">
            <a href="/catalogue">Catalogue</a>
          </li>
        </>
      );
    }
  };

  render() {
    const { location, visible } = this.props;
    const { isRegister, showModal, showModalExitWarning } = this.state;

    const { handleVisible } = this.props;

    return (
      <Fragment>
        {isRegister && (
          <CreateProfile
            showModal={showModal}
            showModalExitWarning={showModalExitWarning}
            handleShowModal={this.handleShowModal}
            handleCloseModal={this.handleCloseModal}
            handleCloseModalExitWarning={this.handleCloseModalExitWarning}
            handleExitEditing={this.handleExitEditing}
            updateRegisterStatus={this.updateRegisterStatus}
            updatePageData={this.updatePageData}
          />
        )}
        {visible && (
          <Login
            updatePageData={this.updatePageData}
            showModal={showModal}
            handleCloseModal={this.handleCloseModal}
            handleShowModal={this.handleShowModal}
            updateRegisterStatus={this.updateRegisterStatus}
          />
        )}
        <div id="wrapper" class="full" data-boxed-bg="">
          <div id="heading" class="third-nav">
            <div class="nav-wrapper">
              <div class="nav-helper"></div>
              <div class="nav-container">
                <div class="nav-wrapper">
                  <div class="container group">
                    <div class="mobile-navigation">
                      <i class="fa fa-bars"></i>
                    </div>
                    <div class="mobile-menu"></div>
                    <div class="nav-search">
                      <i class="fa fa-search"></i>
                      <div class="searchbox">
                        <div
                          id="block-multiblock-4"
                          class="block block-multiblock block-search block-search-form-instance"
                        >
                          <form
                            action="/"
                            method="post"
                            id="search-block-form--2"
                            accept-charset="UTF-8"
                          >
                            <div>
                              <div class="container-inline">
                                <h2 class="element-invisible">Search form</h2>
                                <div class="form-item form-type-textfield form-item-search-block-form">
                                  <label
                                    class="element-invisible"
                                    for="edit-search-block-form--2"
                                  >
                                    Search{" "}
                                  </label>
                                  <input
                                    title="Enter the terms you wish to search for."
                                    placeholder="Type and Enter to Search"
                                    type="text"
                                    id="edit-search-block-form--2"
                                    name="search_block_form"
                                    value=""
                                    size="15"
                                    maxlength="128"
                                    class="form-text"
                                  />
                                </div>
                                <div
                                  class="form-actions form-wrapper"
                                  id="edit-actions"
                                >
                                  <input
                                    type="submit"
                                    id="edit-submit"
                                    name="op"
                                    value="Search"
                                    class="form-submit"
                                  />
                                </div>
                                <input
                                  type="hidden"
                                  name="form_build_id"
                                  value="form-UdqpIqovmpqtVjvWyL4FUG3INrli1OW8rk6HmQknZNc"
                                />
                                <input
                                  type="hidden"
                                  name="form_id"
                                  value="search_block_form"
                                />
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                    <div class="navigation block block-system block-menu">
                      <ul class="menu">
                        <li class="first expanded menu-item menu-item-has-children">
                          <a href="/" class="active">
                            Home
                          </a>
                          <ul class="menu">
                            <li class="first expanded menu-item menu-item-has-children">
                              <a href="/" class="active">
                                Featured Option
                              </a>
                              <ul class="sub-menu">
                                <li class="first leaf menu-item">
                                  <a href="/">Fullwidth Slider</a>
                                </li>
                                <li class="leaf menu-item">
                                  <a href="/">Highlight Slider</a>
                                </li>
                                <li class="last leaf menu-item">
                                  <a href="/">Stack Featured</a>
                                </li>
                              </ul>
                            </li>
                            <li class="last expanded menu-item menu-item-has-children">
                              <a href="/" class="menu-item-has-children active">
                                Post Layout
                              </a>
                              <ul class="menu">
                                <li class="first expanded menu-item">
                                  <a href="/">Masonry</a>
                                  <ul class="sub-menu">
                                    <li class="first leaf menu-item">
                                      <a href="/">Youtube</a>
                                    </li>
                                    <li class="leaf menu-item">
                                      <a href="/">Soundcloud</a>
                                    </li>
                                    <li class="last leaf menu-item">
                                      <a href="/">Post with Sidebar</a>
                                    </li>
                                  </ul>
                                </li>
                                <li class="leaf menu-item">
                                  <a href="/">Masonry no sidebar</a>
                                </li>
                                <li class="leaf menu-item">
                                  <a href="/">Normal</a>
                                </li>
                                <li class="last leaf menu-item">
                                  <a href="/">Normal no sidebar</a>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </li>
                        <li class="expanded menu-item menu-item-has-children">
                          <a class="active">New Features</a>
                          <ul class="sub-menu">
                            <li class="first leaf">
                              <a href="/inspiration-board">Inspiration Board</a>
                            </li>
                            {this.renderCatalogue()}
                            {this.renderStylingBoard()}
                          </ul>
                        </li>
                        <li class="leaf">
                          <a href="/">Reception Styling</a>
                        </li>
                        <li class="leaf">
                          <a href="/">Weddings</a>
                        </li>
                        <li class="expanded menu-item menu-item-has-children">
                          <a href="/" class="active">
                            Feature
                          </a>
                          <ul class="menu">
                            <li class="first expanded menu-item menu-item-has-children">
                              <a href="/" class="active">
                                Layout
                              </a>
                              <ul class="sub-menu">
                                <li class="first leaf menu-item">
                                  <a href="/">Boxed Container</a>
                                </li>
                                <li class="last leaf menu-item">
                                  <a href="/">Fullwidth Container</a>
                                </li>
                              </ul>
                            </li>
                            <li class="expanded menu-item menu-item-has-children">
                              <a href="/" class="active">
                                Top Menu
                              </a>
                              <ul class="sub-menu">
                                <li class="first leaf menu-item">
                                  <a href="/" class="active">
                                    Header Type 1
                                  </a>
                                </li>
                                <li class="leaf menu-item">
                                  <a href="/">Header Type 2</a>
                                </li>
                                <li class="leaf menu-item">
                                  <a href="/">Header Type 3</a>
                                </li>
                                <li class="leaf menu-item">
                                  <a href="/">Header Type 4</a>
                                </li>
                                <li class="last leaf menu-item">
                                  <a href="/">Header Type 5</a>
                                </li>
                              </ul>
                            </li>
                            <li class="expanded menu-item menu-item-has-children">
                              <a href="/" class="active">
                                Sticky Header
                              </a>
                              <ul class="sub-menu">
                                <li class="first leaf menu-item">
                                  <a href="/">Disable Sticky Header</a>
                                </li>
                                <li class="last leaf menu-item">
                                  <a href="/">Enable Sticky Header</a>
                                </li>
                              </ul>
                            </li>
                            <li class="expanded menu-item menu-item-has-children">
                              <a href="/" class="active">
                                Post
                              </a>
                              <ul class="sub-menu">
                                <li class="first last leaf menu-item">
                                  <a href="/">No Sidebar Post</a>
                                </li>
                              </ul>
                            </li>
                            <li class="expanded menu-item menu-item-has-children">
                              <a href="/" class="active">
                                Post Type
                              </a>
                              <ul class="sub-menu">
                                <li class="first leaf menu-item">
                                  <a href="/">Gallery</a>
                                </li>
                                <li class="last leaf menu-item">
                                  <a href="/">Music</a>
                                </li>
                              </ul>
                            </li>
                            <li class="last leaf menu-item">
                              <a href="/">Shortcode</a>
                            </li>
                          </ul>
                        </li>
                        <li class="last leaf menu-item">
                          <a href="/">Contact</a>
                        </li>
                      </ul>
                    </div>
                    <div class="nav-social">
                      <div class="block block-views">
                        <ul class="socials">
                          {this.renderLogin()}
                          <li class="">
                            <a
                              title="Facebook"
                              target="_blank"
                              href="http://fb.me/drupal"
                              class="social-facebook"
                            >
                              <i class="fa fa-facebook"></i>
                            </a>{" "}
                          </li>
                          <li class="">
                            <a
                              title="Twitter"
                              target="_blank"
                              href="http://twitter.com/drupal"
                              class="social-twitter"
                            >
                              <i class="fa fa-twitter"></i>
                            </a>{" "}
                          </li>
                          <li class="">
                            <a
                              title="Google Plus"
                              target="_blank"
                              href="https://www.google.com/+drupal"
                              class="social-google-plus"
                            >
                              <i class="fa fa-google-plus"></i>
                            </a>{" "}
                          </li>
                          <li class="">
                            <a
                              title="Pinterest"
                              target="_blank"
                              href="https://www.pinterest.com/login"
                              class="social-pinterest"
                            >
                              <i class="fa fa-pinterest"></i>
                            </a>{" "}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  visible: state.login.visible,
});

const mapDistachToProps = (dispatch) => ({
  handleVisible: (isVisible) => dispatch(handleVisibleAction(isVisible)),
});

export default connect(
  mapStateToProps,
  mapDistachToProps
)(withRouter(Navigation));
