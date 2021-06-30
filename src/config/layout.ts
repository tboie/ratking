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
export const layoutDesktop: GridLayout.Layout[] = [
  {
    i: "nav",
    x: 0,
    y: 0,
    w: 16,
    h: 32,
    ...widgetConfig,
  },
  {
    i: "content",
    x: 16,
    y: 0,
    w: 16,
    h: 32,
    ...widgetConfig,
  },
].map((p, idx) => {
  // NOTE: i property must be in "{type}-{index}", ex). "test-0" format
  p.i = `${p.i}-${idx}`;
  return p;
});

// Mobile Layout
export const layoutMobile: GridLayout.Layout[] = [...layoutDesktop];

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
    xxs: [...layoutMobile],
    xs: [...layoutMobile],
    sm: [...layoutDesktop],
    md: [...layoutDesktop],
    lg: [...layoutDesktop],
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
