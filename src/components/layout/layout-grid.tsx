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
  const [selectedWidget, setSelectedWidget] = useState("");
  const [staticHeights, setStaticHeights] = useState(
    layoutConfig.layouts[bpH][bpW].map((w) => w.staticHeight)
  );

  // Get Current Window Width Breakpoint
  function getWindowBreakpoints(): { width: string; height: string } {
    const bps = { width: "unknown", height: "unknown" };

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
    // copy static property and reset edges
    layoutConfig.layouts[bpH][bpW] = cb.map((w, idx) => ({
      staticHeight: layoutConfig.layouts[bpH][bpW][idx].staticHeight,
      edges: { t: [], r: [], b: [], l: [] },
      ...w,
    }));

    // get/set connected widget edges
    const widgets = layoutConfig.layouts[bpH][bpW];
    widgets.forEach((w1) =>
      widgets
        .filter((w) => w1.i !== w.i)
        .forEach((w2) => {
          const side = getLongestOverlappingSide(w1, w2);
          if (side !== "none") {
            w1.edges[side].push(w2.i);
          }
        })
    );

    console.log("saved layout config: ");
    console.log(layoutConfig.layouts[bpH][bpW]);

    // set state
    setStaticHeights(layoutConfig.layouts[bpH][bpW].map((w) => w.staticHeight));
  }

  // Widget Components
  const widgetComponents = useMemo(() => {
    return layoutConfig.layouts[bpH][bpW].map((widget, idx) => (
      <div
        id={widget.i}
        key={widget.i}
        data-grid={widget}
        style={{
          maxHeight: widget.staticHeight ? `${widget.staticHeight}px` : "",
          minHeight: widget.staticHeight ? `${widget.staticHeight}px` : "",
          zIndex: widget.i === selectedWidget ? 9999 : 0,
          border:
            widget.i === selectedWidget ? "2px dotted rgba(255, 0, 0, 1)" : "",
        }}
      >
        <Widget
          key={idx}
          i={widget.i}
          type={widget.i.split("-")[0] as WidgetType}
          showToolbar={showWidgetToolbars}
          data={data}
          selectedData={selectedData}
          setSelectedData={(val) => setSelectedData && setSelectedData(val)}
          selected={selectedWidget === widget.i}
          setSelected={setSelectedWidget}
          staticHeight={staticHeights[idx]}
          setStaticHeight={() => {
            const h = document.getElementById(widget.i)?.clientHeight;
            widget.staticHeight
              ? (widget.staticHeight = undefined)
              : (widget.staticHeight = h);
            saveLayout(layoutConfig.layouts[bpH][bpW]);
          }}
        />
      </div>
    ));
  }, [
    staticHeights,
    selectedWidget,
    bpH,
    showWidgetToolbars,
    data,
    selectedData,
  ]);

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
    !showWidgetToolbars && setSelectedWidget("");
  }, [showWidgetToolbars]);

  useEffect(() => {
    setRefreshing(true);
    setbpH(getWindowBreakpoints().height);
  }, [height]);

  // TODO: refurbish ***crude*** works kinda
  function getLongestOverlappingSide(w1, w2): "t" | "r" | "b" | "l" | "none" {
    let side: "t" | "r" | "b" | "l" | "none" = "none";

    const rectSelection = document
      .getElementById(w1.i)
      ?.getBoundingClientRect();
    const rect = document.getElementById(w2.i)?.getBoundingClientRect();

    // boundary for collision detection
    const boundary = 6;
    const t = rectSelection?.top ? rectSelection?.top - boundary : 0,
      r = rectSelection?.right ? rectSelection?.right + boundary : 0,
      b = rectSelection?.bottom ? rectSelection?.bottom + boundary : 0,
      l = rectSelection?.left ? rectSelection?.left - boundary : 0;

    // colliding sides
    let left = false,
      right = false,
      top = false,
      bottom = false;

    if (
      rectSelection &&
      rect &&
      // collides or not
      rect.top + rect.height > t &&
      rect.left + rect.width > l &&
      rect.bottom - rect.height < b &&
      rect.right - rect.width < r
    ) {
      // get sides
      if (rect.top < t && rect.top + rect.height > t) {
        top = true;
      }
      if (rect.bottom > b && rect.bottom - rect.height < b) {
        bottom = true;
      }
      if (rect.right > r && rect.right - rect.width < r) {
        right = true;
      }
      if (rect.left < l && rect.left + rect.width > l) {
        left = true;
      }

      // get distances of overlapping intersections
      // TODO: buggy
      let dy = 0,
        dx = 0;

      if (rect.top > rectSelection.top) {
        dy += rect.top - rectSelection.top;
      }
      if (rect.bottom < rectSelection.bottom) {
        dy += rectSelection.bottom - rect.bottom;
      }
      if (rect.left > rectSelection.left) {
        dx += rect.left - rectSelection.left;
      }
      if (rect.right < rectSelection.right) {
        dx += rectSelection.right - rect.right;
      }

      // determine greater horizonal or vertical overlap and set side
      // TODO: verify
      const overlapX = rectSelection.width - dx,
        overlapY = rectSelection.height - dy;

      if (overlapX > overlapY) {
        if (top) {
          side = "t";
        } else if (bottom) {
          side = "b";
        }
      } else if (overlapY >= overlapX) {
        if (right) {
          side = "r";
        } else if (left) {
          side = "l";
        }
      }
    }

    return side;
  }

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
          //onResize={saveLayout}
          onResizeStop={saveLayout}
          onDragStop={saveLayout}
          draggableHandle={layoutConfig.draggableHandle}
        >
          {widgetComponents}
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
