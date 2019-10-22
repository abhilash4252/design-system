import React from "react";
import Tag from "./Tag";

export default {
  title: "Atoms/Tag",
  component: Tag
};

export const primary = () => (
  <React.Fragment>
    <Tag>Antd default Tag</Tag>
    <br />
    <a
      href="https://ant.design/components/Tag/"
      rel="noopener noreferrer"
      target="_blank"
    >
      Check out complete documentation here
    </a>
  </React.Fragment>
);
