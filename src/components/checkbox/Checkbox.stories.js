import React from "react";
import Checkbox from "./Checkbox";

export default {
  title: "Atoms/Checkbox",
  component: Checkbox
};

export const primary = () => (
  <React.Fragment>
    <Checkbox>Antd default Checkbox</Checkbox>
    <br />
    <a
      href="https://ant.design/components/checkbox/"
      rel="noopener noreferrer"
      target="_blank"
    >
      Check out complete documentation here
    </a>
  </React.Fragment>
);
