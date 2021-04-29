import React from "react";
import { Menu, Icon, Sidebar } from "semantic-ui-react";

export default function sideBar() {
  return (
    <div className="sidebar">
      <h2>NVSL - IMS</h2>
      <Menu.Item as="a">
        <Icon name="home" />
        Home
      </Menu.Item>
      <Menu.Item as="a">
        <Icon name="gamepad" />
        Games
      </Menu.Item>
      <Menu.Item as="a">
        <Icon name="camera" />
        Channels
      </Menu.Item>
    </div>
  );
}
