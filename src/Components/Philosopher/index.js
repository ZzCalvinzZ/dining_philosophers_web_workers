import React from "react";
import PropTypes from "prop-types";
import img from "./philosopher.png";
import "./Philosopher.css";

const Philosopher = ({ style }) => {
  return (
    <img src={img} alt="philosopher" className="philosopher" style={style} />
  );
};

Philosopher.defaultProps = {};

Philosopher.propTypes = { style: PropTypes.object };

export default Philosopher;
