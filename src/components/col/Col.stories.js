import React from "react";
import Col from "./Col";

export default {
  title: "Atoms/Col",
  component: Col
};

export const primary = () => (
  <React.Fragment>
    <Col>Antd default Col</Col>
    <br />
    <a
      href="https://ant.design/components/grid/#Col"
      rel="noopener noreferrer"
      target="_blank"
    >
      Check out complete documentation here
    </a>
  </React.Fragment>
);
