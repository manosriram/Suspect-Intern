import React, { Component } from "react";
import Remove from "./Remove";
import NavBar from "./NavBar";

class Create extends Component {
  state = {
    page: 0,
    xCo: "",
    yCo: "",
    width: "",
    height: "",
    name: "",
    color: "",
    newWidth: "",
    newHeight: "",
    newName: "",
    rectData: [
      {
        name: "",
        xCo: "",
        yCo: "",
        width: "",
        height: "",
        color: ""
      }
    ]
  };

  componentDidMount() {
    // Create a Canvas of Width and height of the window.
    var canvas = document.querySelector("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  handleChange = e => {
    // Updating state variables
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleCreateSubmit = e => {
    e.preventDefault();

    var canvas = document.getElementById("can");
    canvas.setAttribute("class", this.state.name);

    var ctx = canvas.getContext("2d");

    // Adding properties to the Canvas
    ctx.fillStyle = this.state.color;
    ctx.fillRect(
      Number(this.state.xCo),
      Number(this.state.yCo),
      Number(this.state.width),
      Number(this.state.height)
    );
    // Wrapping up all the properties into one payload
    const payload = {
      name: this.state.name,
      xCo: this.state.xCo,
      yCo: this.state.yCo,
      width: this.state.width,
      height: this.state.height,
      color: this.state.color
    };
    var newLoad = [];
    newLoad = this.state.rectData;
    newLoad.push(payload);
    // setting the state of the payload
    this.setState({ rectData: newLoad });
  };

  handleResizeSubmit = e => {
    e.preventDefault();
    var x, y, z, g;
    var ele = document.getElementById("can");
    var ctx = ele.getContext("2d");

    // To resize, the index of the rectangle must be found and then their properties must be changed.

    for (let t = 0; t < this.state.rectData.length; t++) {
      if (this.state.rectData[t].name === this.state.newName) {
        var newData = this.state.rectData;
        x = this.state.rectData[t].xCo;
        y = this.state.rectData[t].yCo;
        z = this.state.rectData[t].width;
        g = this.state.rectData[t].height;

        newData[t].width = this.state.newWidth;
        newData[t].height = this.state.newHeight;

        // setting the state of resized rectangle.
        this.setState({ rectData: newData });

        // Remove the old rectangle.
        ctx.clearRect(Number(x), Number(y), Number(z), Number(g));

        // Set the new properties to the rectangle.
        ctx.fillRect(
          Number(x),
          Number(y),
          Number(this.state.newWidth),
          Number(this.state.newHeight)
        );
      }
    }
  };

  render() {
    return (
      <div>
        {/*navbar component */}
        <NavBar />

        <div className="removeCom">
          <Remove data={this.state} />
        </div>
        <div className="create-resize">
          <h3>Create Rectangle</h3>
          <form onSubmit={this.handleCreateSubmit} autoComplete="off">
            <input
              type="text"
              placeholder="X Co-Ordinate"
              value={this.state.xCo}
              name="xCo"
              onChange={this.handleChange}
            />
            <br />
            <br />
            <input
              type="text"
              name="yCo"
              value={this.state.yCo}
              placeholder="Y Co-ordinate"
              onChange={this.handleChange}
            />
            <br />
            <br />
            <input
              type="text"
              placeholder="Name of Rectangle"
              value={this.state.name}
              name="name"
              onChange={this.handleChange}
            />
            <br />
            <br />
            <input
              type="text"
              name="color"
              placeholder="Colour"
              value={this.state.color}
              onChange={this.handleChange}
            />
            <br />
            <br />
            <input
              type="text"
              name="width"
              placeholder="Width"
              value={this.state.width}
              onChange={this.handleChange}
            />
            <br />
            <br />
            <input
              type="text"
              placeholder="Height"
              value={this.state.height}
              name="height"
              onChange={this.handleChange}
            />
            <br />
            <br />

            <input type="submit" value="Create" className="btn btn-primary" />
          </form>
          <br />
          <br />
          <br />
          <h3>Resize Rectangle</h3>
          <form onSubmit={this.handleResizeSubmit} autoComplete="off">
            <input
              type="text"
              placeholder="Name of Rectangle"
              value={this.state.newName}
              name="newName"
              onChange={this.handleChange}
            />
            <br />
            <br />
            <input
              type="text"
              placeholder="New Width"
              value={this.state.newWidth}
              name="newWidth"
              onChange={this.handleChange}
            />
            <br />
            <br />
            <input
              type="text"
              placeholder="New Height"
              value={this.state.newHeight}
              name="newHeight"
              onChange={this.handleChange}
            />
            <br />
            <br />
            <input type="submit" value="Resize" className="btn btn-info" />
          </form>
          <br />
          <br />
        </div>

        <br />
        <br />
        <br />
        <br />
        <hr />
        <h2>Canvas Area</h2>
        <canvas id="can" />
      </div>
    );
  }
}

export default Create;
