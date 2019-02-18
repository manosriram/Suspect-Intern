import React from "react";

class NavBar extends React.Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="/">
            Task 1
          </a>
          <a className="navbar-brand" href="/detect">
            Task 2
          </a>
        </nav>
      </div>
    );
  }
}

export default NavBar;
