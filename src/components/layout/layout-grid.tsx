// SCSS
import "./layout-grid.scss";

// React
import { useEffect, useMemo, useState } from "react";
import { useWindowSize } from "@react-hook/window-size";

// Layout
import { Responsive as ResponsiveGrid, Layout } from "react-grid-layout";
import Widget, { WidgetType } from "../widget/widget-wrapper";
import LayoutToolbar from "./layout-toolbar";

// Component Data Props Type
export type DataProps = {
  data?: any; // Core data object
  selectedData?: any; // Selected obj from user data
  setSelectedData?: (val: any) => void; // Earth HTML element (child ref)
};

// Layout Grid Props Type
type LayoutGridProps = {
  showToolbar: boolean;
  layoutConfig: any;
  widgetConfig: any;
} & DataProps;

const LayoutGrid = ({
  showToolbar,
  data,
  selectedData,
  setSelectedData,
  layoutConfig,
  widgetConfig,
}: LayoutGridProps) => {
  const [width, height] = useWindowSize();
  const [showWidgetToolbars, setShowWidgetToolbars] = useState(showToolbar);
  const [showWidgetResize, setShowWidgetResize] = useState(showToolbar);
  const [bpW, setbpW] = useState(() => getWindowBreakpoints().width);
  const [bpH, setbpH] = useState(() => getWindowBreakpoints().height);
  const [refreshing, setRefreshing] = useState(false);

  // Get Current Window Width Breakpoint
  function getWindowBreakpoints(): { width: string; height: string } {
    let bps = { width: "unknown", height: "unknown" };

    // sort bp's desc and use first bp > value
    ["width", "height"].forEach((dim) =>
      Object.entries(
        layoutConfig.breakpoints[dim] as { [key: string]: number }
      ).some((ele) =>
        dim === "width"
          ? width > ele[1] && (bps.width = ele[0])
          : height > ele[1] && (bps.height = ele[0])
      )
    );

    return bps;
  }

  // Save Layout
  function saveLayout(cb: Layout[]) {
    console.log("before");
    console.log(layoutConfig.layouts[bpH][bpW]);
    console.log("layout config: ");
    console.log(cb);
    layoutConfig.layouts[bpH][bpW] = [...cb];
  }

  // Widget Components
  const widgets = useMemo(() => {
    return layoutConfig.layouts[bpH][bpW].map((obj: Layout, idx: number) => (
      <div id={obj.i} key={obj.i} data-grid={obj}>
        <Widget
          key={idx}
          type={obj.i.split("-")[0] as WidgetType}
          showToolbar={showWidgetToolbars}
          data={data}
          selectedData={selectedData}
          setSelectedData={(val) => setSelectedData && setSelectedData(val)}
        />
      </div>
    ));
  }, [bpH, showWidgetToolbars, data, selectedData]);

  // Reset layout on breakpoint change
  // Widget positioning gets buggy when number of widgets varies
  useEffect(() => {
    if (refreshing) {
      setTimeout(() => setRefreshing(false), 10);
    }
  }, [refreshing]);

  useEffect(() => {
    setRefreshing(true);
  }, [showWidgetResize]);

  useEffect(() => {
    setRefreshing(true);
    setbpH(getWindowBreakpoints().height);
  }, [height]);

  // Layout Height
  const layoutHeight = showToolbar
    ? height - layoutConfig.toolbar.height
    : height;

  return (
    <>
      {!refreshing && (
        <ResponsiveGrid
          style={{
            minHeight: layoutHeight,
          }}
          width={width}
          layouts={layoutConfig.layouts[bpH]}
          rowHeight={layoutHeight / widgetConfig.maxH}
          margin={layoutConfig.margin as [number, number]}
          breakpoints={layoutConfig.breakpoints.width}
          cols={layoutConfig.cols}
          maxRows={widgetConfig.maxH}
          compactType={layoutConfig.compactType}
          isResizable={showWidgetResize}
          isBounded={layoutConfig.isBounded}
          preventCollision={layoutConfig.preventCollision}
          onBreakpointChange={(bp) => {
            setRefreshing(true);
            setbpW(bp);
          }}
          onResizeStop={saveLayout}
          onDragStop={saveLayout}
          draggableHandle={layoutConfig.draggableHandle}
        >
          {widgets}
        </ResponsiveGrid>
      )}
      {showToolbar && (
        <LayoutToolbar
          bpW={bpW}
          bpH={bpH}
          bpConfigW={layoutConfig.breakpoints.width}
          bpConfigH={layoutConfig.breakpoints.height}
          height={layoutConfig.toolbar.height}
          showWidgetResize={showWidgetResize}
          toggleShowWidgetResize={() => setShowWidgetResize(!showWidgetResize)}
          showWidgetToolbars={showWidgetToolbars}
          toggleShowWidgetToolbars={() =>
            setShowWidgetToolbars(!showWidgetToolbars)
          }
        />
      )}
    </>
  );
};

export default LayoutGrid;
