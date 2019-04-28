import React from "react";
import PropTypes from "prop-types";
import img from "./fork.png";
import "./Fork.css";

const Fork = ({ style }) => {
  return <img src={img} alt="fork" className="fork" style={style} />;
};

Fork.defaultProps = {};

Fork.propTypes = { style: PropTypes.object };

export default Fork;
