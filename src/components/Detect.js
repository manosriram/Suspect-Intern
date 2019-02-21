import React from "react";
import NavBar from "./NavBar";
import { timingSafeEqual } from "crypto";

class Detect extends React.Component {
  state = {
    index: 0,
    status: 0,
    label: "",
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

  handleLabelSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    var el = document.getElementById("textDiv");
    el.innerHTML = this.state.label;
    el.style.display = "block";
    el.style.position = "absolute";

    el.style.right = this.state.coOrds[this.state.index].x + 400 + "px";
    el.style.top = this.state.coOrds[this.state.index].y + 700 + "px";
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
    var inp = document.getElementById("canText");

    inp.style.display = "block";
    inp.style.position = "absolute";

    inp.style.right = this.state.coOrds[index].x + 100 + "px";
    inp.style.top = this.state.coOrds[index].y + 800 + "px";
    this.setState({ index });
    ctx.rect(
      this.state.coOrds[index].x,
      this.state.coOrds[index].y,
      this.state.coOrds[index].w,
      this.state.coOrds[index].h
    );
    window.scrollBy(0, this.state.coOrds[index].y + 450);

    ctx.strokeStyle = "white";
    ctx.stroke();

    this.setState({ name: "", status: 1 });
  };

  componentDidMount() {
    var inp = document.getElementById("canText");

    inp.style.display = "none";

    var im = document.getElementById("im");
    var can = document.getElementById("can");

    var ctx = can.getContext("2d");

    can.width = 500;
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
        <form onSubmit={this.handleSubmit} autoComplete="off">
          <input
            type="text"
            placeholder="Enter Name"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            ref="label"
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
        <div>
          <form
            id="canText"
            onSubmit={this.handleLabelSubmit}
            autoComplete="off"
          >
            <input
              id="label"
              type="text"
              value={this.state.label}
              name="label"
              onChange={this.handleChange}
              placeholder="Label Here.."
            />
            <br />
            <br />
            <input
              className="btn btn-primary"
              type="submit"
              value="Set Label"
            />
          </form>
          <h2 id="textDiv" />
          <canvas id="can" />
        </div>
      </div>
    );
  }
}

export default Detect;
