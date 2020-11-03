// https://observablehq.com/@d3/color-schemes?collection=@d3/d3-scale-chromatic
// prettier-ignore
export const color_schemes= {
  blues:["#c6dbef","#9ecae1","#6baed6","#4292c6","#2171b5","#084594"],
  greens:["#c7e9c0","#a1d99b","#74c476","#41ab5d","#238b45","#005a32"],
  reds:["#fcbba1","#fc9272","#fb6a4a","#ef3b2c","#cb181d","#99000d"],
  greys:["#d9d9d9","#bdbdbd","#969696","#737373","#525252","#252525"]
}

// https://developer.mozilla.org/en-US/docs/Web/CSS/basic-shape
/**
 *  A lookup of our available shapes, and the css clipPath for each
 *  This is where we could easily add additional shapes
 */
export const shape_lookup = {
  rect: {},
  ellipse: { clipPath: "ellipse(50% 40% at 50% 50%)" },
  star: {
    clipPath:
      "polygon(50% 2.4%, 34.5% 33.8%, 0% 38.8%, 25% 63.1%, 19.1% 97.6%, 50% 81.3%, 80.9% 97.6%, 75% 63.1%, 100% 38.8%, 65.5% 33.8%)",
  },
};

export const defaultInitialElements = [
  {
    id: "parent_1",
    type: "text_input",
    data: {
      value: "One",
      kind: "rect",
      color: "blues",
    },
    position: { x: 0, y: 0 },
  },
  {
    id: "parent_2",
    type: "text_input",
    data: {
      value: "Two",
      kind: "ellipse",
      color: "greens",
    },
    position: { x: 150, y: 0 },
  },
  {
    id: "parent_3",
    type: "text_input",
    data: {
      value: "Third",
      kind: "star",
      color: "reds",
    },
    position: { x: 300, y: 0 },
  },
  {
    id: "edge_a",
    source: "parent_1",
    target: "child_1",
    animated: true,
  },
  {
    id: "child_1",
    type: "child_shape",
    data: {
      value: "Will be replaced",
      kind: "rect",
      color: "blues",
      level: 1,
    },
    position: { x: 0, y: 200 },
  },
];
