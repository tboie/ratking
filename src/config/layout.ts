import GridLayout from "react-grid-layout";

// Widget Config
export const widgetConfig = {
  maxW: 32,
  maxH: 32,
  minW: 5,
  minH: 2,
  isBounded: true,
};

// Desktop Layout
export const LayoutLG: GridLayout.Layout[] = [
  {
    i: "imagecarousel",
    x: 0,
    y: 0,
    w: 10,
    h: 25,
    ...widgetConfig,
  },
  {
    i: "listvirtual",
    x: 0,
    y: 25,
    w: 10,
    h: 7,
    ...widgetConfig,
  },
  {
    i: "imageslider",
    x: 10,
    y: 25,
    w: 22,
    h: 7,
    ...widgetConfig,
  },
  { i: "mediacontrols", w: 5, h: 2, x: 19, y: 0, ...widgetConfig },
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
    i: "imagecarousel",
    minW: 5,
    maxW: 32,
    minH: 2,
    maxH: 32,
    moved: false,
    static: false,
    isBounded: true,
  },
  {
    w: 9,
    h: 7,
    x: 0,
    y: 18,
    i: "listvirtual",
    minW: 5,
    maxW: 32,
    minH: 2,
    maxH: 32,
    moved: false,
    static: false,
    isBounded: true,
  },
  {
    w: 32,
    h: 7,
    x: 0,
    y: 25,
    i: "imageslider",
    minW: 5,
    maxW: 32,
    minH: 2,
    maxH: 32,
    moved: false,
    static: false,
    isBounded: true,
  },
  {
    w: 5,
    h: 2,
    x: 19,
    y: 0,
    i: "mediacontrols",
    minW: 5,
    maxW: 32,
    minH: 2,
    maxH: 32,
    moved: false,
    static: false,
    isBounded: true,
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
    i: "imagecarousel",
    minW: 5,
    maxW: 32,
    minH: 2,
    maxH: 32,
    moved: false,
    static: false,
    isBounded: true,
  },
  {
    w: 11,
    h: 7,
    x: 0,
    y: 18,
    i: "listvirtual",
    minW: 5,
    maxW: 32,
    minH: 2,
    maxH: 32,
    moved: false,
    static: false,
    isBounded: true,
  },
  {
    w: 32,
    h: 7,
    x: 0,
    y: 25,
    i: "imageslider",
    minW: 5,
    maxW: 32,
    minH: 2,
    maxH: 32,
    moved: false,
    static: false,
    isBounded: true,
  },
  {
    w: 5,
    h: 2,
    x: 19,
    y: 0,
    i: "mediacontrols",
    minW: 5,
    maxW: 32,
    minH: 2,
    maxH: 32,
    moved: false,
    static: false,
    isBounded: true,
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
    i: "imageslider",
    minW: 5,
    maxW: 32,
    minH: 2,
    maxH: 32,
    moved: false,
    static: false,
    isBounded: true,
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
