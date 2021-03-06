import React, { Component } from "react";

class Remove extends Component {
  state = {
    name: ""
  };

  handleChange = e => {
    // Updating State Varibles..
    this.setState({
      name: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    var el = document.getElementById("can");
    var ctx = el.getContext("2d");

    // Get the index of the entered Rectangle
    for (let t = 0; t < this.props.data.rectData.length; t++) {
      if (this.state.name === this.props.data.rectData[t].name) {
        el = this.props.data.rectData[t];
        // Clear the area of the entered rectangle co-ordinates.
        ctx.clearRect(el.xCo, el.yCo, el.width, el.height);
        return;
      }
    }
  };

  render() {
    return (
      <div>
        <h3>Remove Rectangle</h3>
        <form onSubmit={this.handleSubmit} autoComplete="off">
          <input
            type="text"
            name="name"
            placeholder="Name of Rectangle"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <br />
          <br />
          <input type="submit" value="Remove" className="btn btn-danger" />
        </form>
      </div>
    );
  }
}

export default Remove;
