import React from "react";
import { Select } from "../";

const { Option } = Select;

export default {
  title: "Atoms/Select",
  component: Select
};

export const primary = () => (
  <React.Fragment>
    <Select defaultValue="1">
      <Option value="1">Option 1</Option>
      <Option value="2">Option 2</Option>
    </Select>
    <br />
    <a
      href="https://ant.design/components/select/"
      rel="noopener noreferrer"
      target="_blank"
    >
      Check out complete documentation here
    </a>
  </React.Fragment>
);
