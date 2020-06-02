import React from "react";
import ReactDom from "react-dom";
import AvatarEditor from "react-avatar-editor";
import { Avatar } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { Slider } from "@material-ui/core";
import "../AccountDetails/slector.scss";
import Zoom from "@material-ui/core/Zoom";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";

export default class AvatarUpload extends React.Component {
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.setEditorRef = this.setEditorRef.bind(this);
    this.handleZoomSlider = this.handleZoomSlider.bind(this);
    this.rotateLeft = this.rotateLeft.bind(this);
    this.rotateRight = this.rotateRight.bind(this);
    this.state = {
      cropperOpen: false,
      img: null,
      zoom: 2,
      rotate: 0,
      croppedImg:
        "https://upload.wikimedia.org/wikipedia/commons/0/09/Man_Silhouette.png"
    };
    this.fullname = props.values.fullname;
  }

  handleZoomSlider(event, value) {
    this.setState({ zoom: value });
  }

  handleFileChange(e) {
    let url = window.URL.createObjectURL(e.target.files[0]);
    ReactDom.findDOMNode(this.refs.in).value = "";
    this.setState({ img: url });
    this.setState({ cropperOpen: true });
  }

  handleSave(e) {
    if (this.editor) {
      const canvasScaled = this.editor.getImageScaledToCanvas();
      const croppedImg = canvasScaled.toDataURL();
      this.setState({ img: null, cropperOpen: false, croppedImg, rotate: 0 });
      this.props.handleAvatar(croppedImg);
    }
  }
  handleCancel() {
    this.setState({ cropperOpen: false });
  }
  setEditorRef(editor) {
    this.editor = editor;
  }

  rotateLeft() {
    this.setState({
      rotate: this.state.rotate - 90
    });
  }

  rotateRight() {
    this.setState({
      rotate: this.state.rotate + 90
    });
  }

  render() {
    const srcimage = this.props.avatar;

    return (
      <MuiThemeProvider>
        <div className="upload-container">
          <div className="avatar-container">
            <div className="avatar-img">
              <Avatar src={srcimage} style={{ height: 80, width: 80 }} />
              <label htmlFor="contained-button-file" className="upload-button">
                <Button
                  aria-label="upload picture"
                  component="span"
                  variant="contained"
                  color="primary"
                  startIcon={<PhotoCamera />}
                  fullWidth
                  style={{}}
                >
                  Upload picture
                </Button>
              </label>
            </div>
          </div>

          <input
            onChange={this.handleFileChange}
            ref="in"
            accept="image/*"
            style={{ display: "none" }}
            id="contained-button-file"
            multiple
            type="file"
          />

          {this.state.cropperOpen && (
            <Zoom
              in={this.state.cropperOpen}
              {...(this.state.cropperOpen ? { timeout: 1000 } : {})}
            >
              <div className="cropper-wrapper">
                <Paper>
                  <div className="editor-container">
                    <AvatarEditor
                      ref={this.setEditorRef}
                      image={this.state.img}
                      width={200}
                      height={200}
                      border={50}
                      color={[255, 255, 255, 0.6]} // RGBA
                      rotate={this.state.rotate}
                      scale={this.state.zoom}
                    />

                    <div className="cropper-wrapper-content">
                      <label className="cropper-wrapper-content-label">
                        Zoom
                      </label>
                      <Slider
                        min={1}
                        max={10}
                        step={0.1}
                        value={this.state.zoom}
                        onChange={this.handleZoomSlider}
                        style={{ width: 200 }}
                        color="primary"
                      />
                    </div>
                    <div className="rotate">
                      <label className="rotate-content">Rotate</label>
                      <Button
                        size="small"
                        color="primary"
                        onClick={this.rotateLeft}
                      >
                        Left
                      </Button>
                      <Button
                        size="small"
                        color="primary"
                        onClick={this.rotateRight}
                      >
                        Right
                      </Button>
                    </div>
                    <div>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleCancel}
                        startIcon={<DeleteIcon />}
                        style={{ marginRight: 30 }}
                      >
                        CANCEL
                      </Button>

                      <Button
                        variant="contained"
                        color="primary"
                        name="srcimage"
                        value={srcimage}
                        onClick={event => {
                          this.handleSave(event);
                        }}
                        startIcon={<SaveIcon />}
                        style={{ marginLeft: 30 }}
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                </Paper>
              </div>
            </Zoom>
          )}
        </div>
      </MuiThemeProvider>
    );
  }
}
