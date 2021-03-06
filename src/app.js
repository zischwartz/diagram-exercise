import React, { useState, useEffect, useRef } from "react";
// prettier-ignore
import { removeElements, addEdge, Handle, Controls, Background, getOutgoers} from "react-flow-renderer";

import { DiagramView } from "./components/diagram_view.js";

const findNodeById = (id) => (n) => n.id === id;

/**
 * The main application UI
 * @param  {Object[]} props.initialElements - The initial elements to display
 */
function App({ initialElements }) {
  // the elements are loaded in the effect below, so we can easily add the onChange event
  const [elements, setElements] = useState(false);
  // possible modes are: "add" and ""
  const [activeMode, setActiveMode] = useState("");
  // store our react flow instance so we can use .project(pos) later on
  const instanceRef = useRef();
  useEffect(() => {
    // run propagateAll on elements initially, for consistency
    propagateAll(initialElements);
    // set up the handler for when an input changes
    const onChange = (event, id) => {
      setElements((els) => {
        let node = els.find(findNodeById(id));
        node.data.value = event.target.value;
        propagateAll(els);
        return [...els];
      });
    };
    // finally set our inital elements, including the onChange handler
    setElements(
      initialElements.map((e) => {
        return { ...e, data: { ...e.data, onChange } };
      })
    );
  }, []);

  const onConnect = (params) => {
    // console.log(params);
    setElements((els) => {
      const exists = els.find(
        (e) => e.source === params.source && e.target === params.target
      );
      // only add the connection if it does not already exist
      if (!exists) {
        els = addEdge(params, els);
        propagateAll(els);
      }
      return els;
    });
  };
  const onElementsRemove = (elementsToRemove) => {
    setElements((els) => removeElements(elementsToRemove, els));
  };

  return (
    <div id="root" className={`mode_${activeMode}`}>
      <nav>
        <div
          className="add_button"
          onClick={(e) => {
            setActiveMode(activeMode === "add" ? "" : "add");
          }}
        >
          <span>+</span>
        </div>
      </nav>
      {elements ? (
        <DiagramView
          elements={elements}
          onConnect={onConnect}
          onElementsRemove={onElementsRemove}
          onLoad={(reactFlowInstance) => {
            instanceRef.current = reactFlowInstance;
            instanceRef.current.fitView();
          }}
          onPaneClick={(e) => {
            // prettier-ignore
            if (activeMode !== "add") { return }
            let position = instanceRef.current.project({
              x: e.clientX,
              y: e.clientY,
            });
            const data = {
              kind: "rect",
              color: "greys",
              value: "",
              level: 0,
              result: {},
            };
            const id = `p_${elements.length}`;
            const node = { position, data, id, type: "child_shape" };
            setElements([...elements, node]);
            setActiveMode("");
          }}
        />
      ) : null}
    </div>
  );
}

/**
 * Recursively apply the text, kind, and color from the start node, down to it's children
 * @param {Object} node - The node we wish to start from
 * @param  {Object[]}  els - An array of all the elements we have
 * @param {Number} level - How far from the start node are we
 * @param {String[]} [seen] - An array of ids to ignore, passed recursively so we don't revist nodes and loop forever
 */
function propagateDown(node, els, level, seen = []) {
  const out = getOutgoers(node, els)
    .filter((n) => n.type !== "text_input")
    .filter((n) => !seen.includes(n.id));
  const text = node.data.value;
  seen.push(node.id);
  const { kind, color } = node.data;
  // a failsafe for not getting an infinite loop while debugging
  if (level > 100) {
    throw Error("Propagate Loop");
  }
  for (const n of out) {
    n.data.value = text;
    if (n.data.result) {
      n.data.result[kind] = { text, level, color };
    } else {
      // let k = n.data.kind;
      n.data.result = { [kind]: { text, level, color } };
    }
    n.data.level = level;
    n.data.kind = kind;
    n.data.color = color;
    propagateDown(n, els, level + 1, seen);
  }
}

/**
 * Runs `propagateDown` starting from each of our `text_input` nodes
 * @param  {Object[]}  els - An array of all the elements we have
 */
function propagateAll(els) {
  els
    .filter((node) => node.type === "text_input")
    .map((node) => {
      propagateDown(node, els, 1);
    });
}

export default App;
