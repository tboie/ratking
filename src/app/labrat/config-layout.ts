import GridLayout from "react-grid-layout";

// Widget Config
export const widgetConfig = {
  maxW: 32,
  maxH: 32,
  minW: 4,
  minH: 2,
  isBounded: true,
  staticWidth: undefined,
  staticHeight: undefined,
  edges: {
    t: [],
    r: [],
    b: [],
    l: [],
  },
};

// Mobile Layout
export const LayoutMobile: GridLayout.Layout[] = [
  {
    w: 32,
    h: 50,
    x: 0,
    y: 0,
    i: "test",
    ...widgetConfig,
  },
].map((p, idx) => {
  // NOTE: i property must be in "{type}-{index}", ex). "test-0" format
  p.i = `${p.i}-${idx}`;
  return p;
});

// Mobile Layout
export const LayoutDesktop: GridLayout.Layout[] = [
  {
    w: 6,
    h: 22,
    x: 26,
    y: 10,
    i: "test",
    ...widgetConfig,
  },
  {
    w: 6,
    h: 32,
    x: 0,
    y: 0,
    i: "nav",
    ...widgetConfig,
  },
  {
    w: 20,
    h: 22,
    x: 6,
    y: 10,
    i: "content",
    ...widgetConfig,
  },
  {
    w: 26,
    h: 10,
    x: 6,
    y: 0,
    i: "test",
    ...widgetConfig,
  },
].map((p, idx) => {
  // NOTE: i property must be in "{type}-{index}", ex). "test-0" format
  p.i = `${p.i}-${idx}`;
  return p;
});

const LayoutXXS = [...LayoutMobile];
const LayoutXS = [...LayoutMobile];
const LayoutSM = [...LayoutDesktop];
const LayoutMD = [...LayoutDesktop];
const LayoutLG = [...LayoutDesktop];
const layouts = {
  // copy to new
  xxs: [...LayoutXXS],
  xs: [...LayoutXS],
  sm: [...LayoutSM],
  md: [...LayoutMD],
  lg: [...LayoutLG],
} as any;

// Layout Config
export const layoutConfig = {
  // desc order
  breakpoints: {
    width: {
      lg: 1200,
      md: 996,
      sm: 768,
      xs: 480,
      xxs: 0,
    },
    height: {
      /*lg: 1200, // Extra large screens, TV.
      md: 900, //  Desktops, large screens.
      sm: 600, // Small screens, laptops.
      xs: 300, // iPads, Tablets.Small screens, laptops.*/
      xxs: 0, // Phones
    },
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
    xxs: Object.assign({}, layouts),
    xs: Object.assign({}, layouts),
    sm: Object.assign({}, layouts),
    md: Object.assign({}, layouts),
    lg: Object.assign({}, layouts),
  },

  margin: [0, 0],
  isBounded: true,
  compactType: null,
  preventCollision: true,
  draggableHandle: ".widget-toolbar",
  resizeHandles: ['se', 'sw'],

  toolbar: {
    height: 32,
  },
};
