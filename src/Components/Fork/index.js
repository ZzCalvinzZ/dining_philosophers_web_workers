import React from "react";
import PropTypes from "prop-types";
import { ReactComponent as Svg } from "./fork.svg";
import "./Fork.css";

const Fork = ({ style }) => {
  return <Svg style={{ height: "60px", position: "absolute", ...style }} />;
};

Fork.defaultProps = {};

Fork.propTypes = { style: PropTypes.object };

export default Fork;
