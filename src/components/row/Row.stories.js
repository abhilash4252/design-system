import React from "react";
import Row from "./Row";

export default {
  title: "Atoms/Row",
  component: Row
};

export const primary = () => (
  <React.Fragment>
    <Row>Antd default Row</Row>
    <br />
    <a
      href="https://ant.design/components/grid/#Row"
      rel="noopener noreferrer"
      target="_blank"
    >
      Check out complete documentation here
    </a>
  </React.Fragment>
);
