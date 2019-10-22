import React from "react";
import Radio from "./Radio";

export default {
  title: "Atoms/Radio",
  component: Radio
};

export const primary = () => (
  <React.Fragment>
    <Radio>Antd default Radio</Radio>
    <br />
    <a
      href="https://ant.design/components/radio/"
      rel="noopener noreferrer"
      target="_blank"
    >
      Check out complete documentation here
    </a>
  </React.Fragment>
);
