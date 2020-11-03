import React, { useState, useEffect, useRef } from "react";
// prettier-ignore
import ReactFlow, { removeElements, addEdge, Handle, Controls, Background, getOutgoers, useStoreState} from "react-flow-renderer";

import { TextInputParentNode, ChildShapeNode } from "./nodes.js";

const nodeTypes = {
  text_input: TextInputParentNode,
  child_shape: ChildShapeNode,
};
/**
 * The main diagram UI
 * @param  {Object[]} props.elements - The array of elements to display
 * @param  {Function} props.onConnect - Handler for when two nodes are connect by the user
 * @param  {Function} props.onElementsRemove - Handler for when  an element is removed via delete key
 * @param  {Function} props.onPaneClick - Handler for a user click on the background canvas, used when adding a node
 * @param  {Function} props.onLoad - Handler for when our react-flow instance has loaded
 */
export function DiagramView(props) {
  const { elements, onConnect, onElementsRemove, onPaneClick, onLoad } = props;
  return (
    <ReactFlow
      elements={elements}
      onElementsRemove={onElementsRemove}
      onConnect={onConnect}
      onPaneClick={onPaneClick ? onPaneClick : undefined}
      onLoad={onLoad}
      snapToGrid={true}
      snapGrid={[15, 15]}
      nodeTypes={nodeTypes}
    >
      <Persist />
      <Controls />
      <Background color="#bbb" gap={16} />
    </ReactFlow>
  );
}

/**
 * React componenent which hooks into the internal react-flow store (so we can get positions) and saves that to local storage
 */
function Persist() {
  // XXX this should probably be throttled rather than writing to localstorage constantly
  const elements = useStoreState((state) => state.elements);
  const elements_as_string = JSON.stringify(
    elements.map((el) => {
      // XXX use the internal position!
      const position = el.__rf ? el.__rf.position : el.position;
      return { ...el, position };
    })
  );
  localStorage.setItem("diagram_elements", elements_as_string);
  return null;
}
