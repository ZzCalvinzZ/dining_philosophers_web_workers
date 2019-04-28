import React from "react";
import PropTypes from "prop-types";
import "./Table.css";

const Table = ({ philosophers, forks }) => {
  const diameter = philosophers.length * 100;
  const radius = diameter / 2;
  const [
    Philosopher1,
    Philosopher2,
    Philosopher3,
    Philosopher4,
    Philosopher5
  ] = philosophers;

  const [Fork1, Fork2, Fork3, Fork4, Fork5] = forks;

  return (
    <div
      className={"table"}
      style={{
        width: diameter,
        height: diameter
      }}
    >
      <Philosopher1 style={{ left: "54px", top: "170px" }} />
      <Philosopher2 style={{ left: "210px", top: "25px" }} />
      <Philosopher3 style={{ left: "376px", top: "170px" }} />
      <Philosopher4 style={{ left: "125px", top: "340px" }} />
      <Philosopher5 style={{ left: "300px", top: "338px" }} />
      <Fork1 style={{ left: "127px", top: "104px" }} />
      <Fork2 style={{ left: "320px", top: "110px" }} />
      <Fork3 style={{ left: "86px", top: "280px" }} />
      <Fork4 style={{ left: "228px", top: "400px" }} />
      <Fork5 style={{ left: "366px", top: "283px" }} />
    </div>
  );
};

Table.propTypes = {
  philosophers: PropTypes.array,
  forks: PropTypes.array
};

export default Table;
