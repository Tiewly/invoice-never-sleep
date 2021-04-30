import React from "react";
import { Icon, Button } from "semantic-ui-react";

export default function sideBar() {
  return (
    <div className="sidebar">
      <h2>NVSL - IMS</h2>
      <div className="menu">
        <div className="menu-item">
          <Icon name="home" />
          <p> Dashboard</p>
        </div>
        <div className="menu-item">
          <Icon name="group" />
          <p> Partner</p>
        </div>
        <div className="menu-item">
          <Icon name="dollar sign" />
          <p> Invoice</p>
        </div>
      </div>
    </div>
  );
}
