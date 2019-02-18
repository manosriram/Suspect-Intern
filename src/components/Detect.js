import React from "react";
import NavBar from "./NavBar";

class Detect extends React.Component {
  state = {
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
      "jack"
    ],
    co_ords: [{ x: 0, y: 0 }]
  };

  componentDidMount() {
    var data = [];
    var ele = document.getElementById("can");
    var imageDiv = document.getElementById("im");
    var ctx = ele.getContext("2d");
    for (let t = 0; t < 10; t++) {
      var img = new Image();
      img.src = ele.toDataURL("image/jpg");
      img.setAttribute("src", require(`../images/image${t + 1}.jpg`));
      // document.body.appendChild(img);
      ctx.drawImage(img, 0, 0, 100, 200);
      ele.appendChild(img);
      // img.setAttribute("id", t + 1);
      // img.src = require(`../images/image${t + 1}.jpg`);
    }
  }

  render() {
    return (
      <div>
        <NavBar />
        <br />
        <br />
        <form>
          <input type="text" placeholder="Enter Name" name="name" />
          <br />
          <br />
          <input className="btn btn-secondary" type="submit" value="Detect" />
        </form>
        <hr />
        <div id="im" />
        <br />
      </div>
    );
  }
}

export default Detect;
