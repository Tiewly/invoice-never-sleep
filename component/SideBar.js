import React from "react";
import { Icon, Button } from "semantic-ui-react";

var type = "";
export default function sideBar() {
  return (
    <div className="sidebar">
      <h2>NVSL - IMS</h2>
      <div className="menu">
        <a href="#">
          <div className="menu-item">
            <Icon name="home" />
            <p> Dashboard</p>
          </div>
        </a>
        <a href="#">
          <div className="menu-item">
            <Icon name="group" />
            <p> Partner</p>
          </div>
        </a>
        <a href="/">
          <div className="menu-item-open">
            <Icon name="dollar sign" />
            <p> Invoice</p>
          </div>
        </a>
      </div>
    </div>
  );
}
