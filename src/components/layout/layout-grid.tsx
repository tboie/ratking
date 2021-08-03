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
  const [breakpoint, setBreakpoint] = useState(() => getCurrentBreakpoint());
  const [refreshing, setRefreshing] = useState(false);

  // Get Current Window Width Breakpoint
  function getCurrentBreakpoint(): string {
    let currBreakpoint = "unknown";

    Object.entries(layoutConfig.breakpoints).some((val) => {
      // @ts-ignore
      if (window.innerWidth > val[1]) {
        currBreakpoint = val[0];
        return true;
      }
      return false;
    });

    return currBreakpoint;
  }

  // Save Layout
  function saveLayout(cb: Layout[]) {
    console.log("layout config: ");
    console.log(cb);
    layoutConfig.layouts[breakpoint] = [...cb];
  }

  // Widget Components
  const widgets = useMemo(() => {
    return layoutConfig.layouts[breakpoint].map((obj: Layout, idx: number) => (
      <div key={obj.i} data-grid={obj}>
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
  }, [breakpoint, showWidgetToolbars, data, selectedData]);

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
          layouts={layoutConfig.layouts}
          rowHeight={layoutHeight / widgetConfig.maxH}
          margin={layoutConfig.margin as [number, number]}
          breakpoints={layoutConfig.breakpoints}
          cols={layoutConfig.cols}
          maxRows={widgetConfig.maxH}
          compactType={layoutConfig.compactType}
          isResizable={showWidgetResize}
          isBounded={layoutConfig.isBounded}
          preventCollision={layoutConfig.preventCollision}
          onBreakpointChange={(bp) => {
            setRefreshing(true);
            setBreakpoint(bp);
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
          currBreakpoint={breakpoint}
          breakpoints={layoutConfig.breakpoints}
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
