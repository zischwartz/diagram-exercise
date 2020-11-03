import React, { useState, useEffect, useRef } from "react";

import { Handle } from "react-flow-renderer";

import { color_schemes, shape_lookup } from "../configuration.js";

export const TextInputParentNode = ({ id, data, isConnectable }) => {
  const style = {
    backgroundColor: color_schemes[data.color][0],
    ...shape_lookup[data.kind],
  };
  return (
    <div className="parent_node">
      <div className="shape" style={style}>
        <input
          className="nodrag"
          value={data.value}
          onChange={(event) => data.onChange(event, id)}
        />
      </div>
      <Handle type="source" position="bottom" isConnectable={isConnectable} />
    </div>
  );
};

const shapes_arr = Object.keys(shape_lookup);

export const ChildShapeNode = ({ id, data, isConnectable }) => {
  let multi = shapes_arr
    .map((key) => {
      const r = data.result[key];
      //prettier-ignore
      if (!r) { return }
      const style = {
        backgroundColor:
          color_schemes[r.color][r.level] || color_schemes[r.color].slice(-1),
        ...shape_lookup[key],
      };
      return (
        <div className="shape small" style={style} key={key}>
          {r.text}
        </div>
      );
    })
    .filter((x) => x);

  const message = data.value || "Connect me to a parent shape!";
  return (
    <div className="child_node">
      <Handle type="target" position="top" isConnectable={isConnectable} />
      {multi.length > 1 ? (
        multi
      ) : (
        <div
          className="shape"
          style={{
            backgroundColor:
              color_schemes[data.color][data.level] ||
              color_schemes[data.color].slice(-1),
            ...shape_lookup[data.kind],
          }}
        >
          {message}
        </div>
      )}

      <Handle type="source" position="bottom" isConnectable={isConnectable} />
    </div>
  );
};
