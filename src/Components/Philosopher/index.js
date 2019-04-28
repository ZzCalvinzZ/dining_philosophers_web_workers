import React from "react";
import PropTypes from "prop-types";
import { ReactComponent as Svg } from "./philosopher.svg";
import { ReactComponent as EatingSvg } from "./eating.svg";
import "./Philosopher.css";

const Philosopher = ({ style, eating }) => {
  const fullStyle = { height: "75px", position: "absolute", ...style };
  if (eating) {
    return <EatingSvg style={fullStyle} />;
  }
  return <Svg style={fullStyle} />;
};

Philosopher.defaultProps = {};

Philosopher.propTypes = { style: PropTypes.object, eating: PropTypes.bool };

export default Philosopher;
