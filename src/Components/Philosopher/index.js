import React from "react";
import PropTypes from "prop-types";
import { ReactComponent as Svg } from "./philosopher.svg";
import "./Philosopher.css";

const Philosopher = ({ style }) => {
  return <Svg style={{ height: "50px", position: "absolute", ...style }} />;
};

Philosopher.defaultProps = {};

Philosopher.propTypes = { style: PropTypes.object };

export default Philosopher;
