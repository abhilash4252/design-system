import React from "react";
import Typography from "./Typography";

export default {
  title: "Atoms/Typography",
  component: Typography
};

export const primary = () => (
  <React.Fragment>
    <Typography>Antd default Typography</Typography>
    <br />
    <a
      href="https://ant.design/components/typography/"
      rel="noopener noreferrer"
      target="_blank"
    >
      Check out complete documentation here
    </a>
  </React.Fragment>
);
