import React from "react";
import NavBar from "./NavBar";

class Detect extends React.Component {
  state = {
    name: "",
    data: [],
    faces: [
      "elon",
      "mark",
      "ellison",
      "nadella",
      "torvalds",
      "wozniak",
      "bill",
      "steve",
      "jack",
      "larry"
    ],
    coOrds: [
      { x: 180, y: 120, w: 200, h: 200 },
      { x: 180, y: 850, w: 200, h: 200 },
      { x: 110, y: 1680, w: 200, h: 200 },
      { x: 110, y: 2500, w: 200, h: 200 },
      { x: 170, y: 3225, w: 200, h: 200 },
      { x: 150, y: 4070, w: 200, h: 200 },
      { x: 200, y: 4850, w: 200, h: 200 },
      { x: 140, y: 5700, w: 200, h: 200 },
      { x: 190, y: 6500, w: 200, h: 200 },
      { x: 130, y: 7270, w: 200, h: 200 }
    ],
    imgs: []
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const name = this.state.name;
    var index;
    for (let t = 0; t < this.state.faces.length; t++) {
      if (name === this.state.faces[t]) {
        index = t;
        break;
      }
    }

    var can = document.getElementById("can");
    var ctx = can.getContext("2d");
    ctx.rect(
      this.state.coOrds[index].x,
      this.state.coOrds[index].y,
      this.state.coOrds[index].w,
      this.state.coOrds[index].h
    );
    window.scrollBy(0, this.state.coOrds[index].y + 450);
    ctx.strokeStyle = "white";
    ctx.stroke();
    this.setState({ name: "" });
    console.log(this.state.imgs[index]);
  };

  componentDidMount() {
    var im = document.getElementById("im");
    var can = document.getElementById("can");
    var ctx = can.getContext("2d");

    can.width = 1000;
    can.height = 8000;

    var imgs = [];
    var imgIndex = 0;

    for (var x = 0; x < 10; x++) {
      for (var y = 0; y < 10; y++) {
        if (imgIndex < 10) {
          var texLoc = require(`../images/image${imgIndex + 1}.jpg`);
          imgs[imgIndex] = new Image();
          imgs[imgIndex].setAttribute("id", this.state.faces[imgIndex]);
          imgs[imgIndex].width = "50px";
          imgs[imgIndex].height = "50px";

          imgs[imgIndex].onload = (function() {
            var thisX = x * 800;
            var thisY = y * 800;

            return function() {
              ctx.drawImage(this, thisX, thisY, 500, 500);
            };
          })();

          imgs[imgIndex].src = texLoc;
          imgIndex += 1;
        } else break;
      }
    }
    this.setState({ imgs }, () => console.log(this.state));
  }

  render() {
    return (
      <div>
        <NavBar />
        <br />
        <br />
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Enter Name"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <br />
          <br />
          <input className="btn btn-secondary" type="submit" value="Detect" />
        </form>
        <hr />
        <h3>Search for : </h3>
        {this.state.faces.map((el, ind) => {
          return <h3 key={ind}>{el}</h3>;
        })}
        <hr />
        <br />
        <h2>Canvas Area</h2>
        <canvas id="can">
          <div id="divC" />
        </canvas>
      </div>
    );
  }
}

export default Detect;
