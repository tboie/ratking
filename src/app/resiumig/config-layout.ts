import GridLayout from "react-grid-layout";

// Widget Config
export const widgetConfig = {
  maxW: 32,
  maxH: 32,
  minW: 5,
  minH: 2,
  isBounded: true,
  isResizable: true,
  staticWidth: undefined,
  staticHeight: undefined,
  edges: {
    t: [],
    r: [],
    b: [],
    l: [],
  },
};

// Desktop Layout
export const LayoutLG: GridLayout.Layout[] = [
  {
    i: "image-carousel",
    x: 0,
    y: 0,
    w: 10,
    h: 25,
    ...widgetConfig,
  },
  {
    i: "list-virtual",
    x: 0,
    y: 25,
    w: 10,
    h: 7,
    ...widgetConfig,
  },
  {
    i: "image-slider",
    x: 10,
    y: 25,
    w: 22,
    h: 7,
    ...widgetConfig,
  },
  { i: "media-controls", w: 5, h: 2, x: 19, y: 0, ...widgetConfig },
].map((p, idx) => {
  // NOTE: i property must be in "{type}-{index}", ex). "test-0" format
  p.i = `${p.i}-${idx}`;
  return p;
});

const LayoutMD: GridLayout.Layout[] = [
  {
    w: 9,
    h: 18,
    x: 0,
    y: 0,
    i: "image-carousel",
    ...widgetConfig,
  },
  {
    w: 9,
    h: 7,
    x: 0,
    y: 18,
    i: "list-virtual",
    ...widgetConfig,
  },
  {
    w: 32,
    h: 7,
    x: 0,
    y: 25,
    i: "image-slider",
    ...widgetConfig,
  },
  {
    w: 5,
    h: 2,
    x: 19,
    y: 0,
    i: "media-controls",
    ...widgetConfig,
  },
].map((p, idx) => {
  // NOTE: i property must be in "{type}-{index}", ex). "test-0" format
  p.i = `${p.i}-${idx}`;
  return p;
});

// SM Layout
const LayoutSM: GridLayout.Layout[] = [
  {
    w: 11,
    h: 18,
    x: 0,
    y: 0,
    i: "image-carousel",
    ...widgetConfig,
  },
  {
    w: 11,
    h: 7,
    x: 0,
    y: 18,
    i: "list-virtual",
    ...widgetConfig,
  },
  {
    w: 32,
    h: 7,
    x: 0,
    y: 25,
    i: "image-slider",
    ...widgetConfig,
  },
  {
    w: 5,
    h: 2,
    x: 19,
    y: 0,
    i: "media-controls",
    ...widgetConfig,
  },
].map((p, idx) => {
  // NOTE: i property must be in "{type}-{index}", ex). "test-0" format
  p.i = `${p.i}-${idx}`;
  return p;
});

// Mobile Layout
export const LayoutXS: GridLayout.Layout[] = [
  {
    w: 32,
    h: 10,
    x: 0,
    y: 22,
    i: "image-slider",
    ...widgetConfig,
  },
];

// XXS
const LayoutXXS: GridLayout.Layout[] = [...LayoutXS];

// Layout Config
export const layoutConfig = {
  // desc order
  breakpoints: {
    lg: 1200,
    md: 996,
    sm: 768,
    xs: 480,
    xxs: 0,
  },

  // num of cols for each breakpoint
  cols: {
    lg: widgetConfig.maxW,
    md: widgetConfig.maxW,
    sm: widgetConfig.maxW,
    xs: widgetConfig.maxW,
    xxs: widgetConfig.maxW,
  },

  layouts: {
    // copy to new
    xxs: [...LayoutXXS],
    xs: [...LayoutXS],
    sm: [...LayoutSM],
    md: [...LayoutMD],
    lg: [...LayoutLG],
  },

  margin: [0, 0],
  isBounded: true,
  compactType: null,
  preventCollision: true,
  draggableHandle: ".widget-toolbar",

  toolbar: {
    height: 32,
  },
};
