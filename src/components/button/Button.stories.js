import React from "react";
import Button from "./Button";

export default {
  title: "Atoms/Button",
  component: Button
};

export const primary = () => (
  <React.Fragment>
    <Button>Antd default Button</Button>
    <br />
    <a
      href="https://ant.design/components/button/"
      rel="noopener noreferrer"
      target="_blank"
    >
      Check out complete documentation here
    </a>
  </React.Fragment>
);
