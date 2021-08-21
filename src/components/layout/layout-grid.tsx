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
  selectedData?: any; // Selected data set
  setSelectedData?: (val: any) => void; // Set selected data obj
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
  const [staticWidths, setStaticWidths] = useState(
    layoutConfig.layouts[bpH][bpW].map((w) => w.staticWidth)
  );

  // Layout Height
  const layoutHeight = showToolbar
    ? height - layoutConfig.toolbar.height
    : height;

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

  // grid layout coords to px
  function coordToPx(val: number, dim: "w" | "h"): number {
    return (
      val *
      ((dim === "h" ? layoutHeight : width) /
        (dim === "h" ? widgetConfig.maxH : widgetConfig.maxW))
    );
  }

  // Save Layout
  function saveLayout(cb: Layout[]) {
    // copy static property and reset edges
    layoutConfig.layouts[bpH][bpW] = cb.map((w, idx) => ({
      staticHeight: layoutConfig.layouts[bpH][bpW][idx].staticHeight,
      staticWidth: layoutConfig.layouts[bpH][bpW][idx].staticWidth,
      // TODO: remove resize for static widgets
      // isResizable: layoutConfig.layouts[bpH][bpW][idx].staticHeight,
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

            // remove duplicates
            // TODO: needed? verify...
            w1.edges[side] = w1.edges[side].filter(
              (s, idx) => w1.edges[side].indexOf(s) === idx
            );
          }
        })
    );

    console.log("saved layout config: ");
    console.log(layoutConfig.layouts[bpH][bpW]);

    // set state
    setStaticWidths(layoutConfig.layouts[bpH][bpW].map((w) => w.staticWidth));
    setStaticHeights(layoutConfig.layouts[bpH][bpW].map((w) => w.staticHeight));
  }

  // Widget Components
  const widgetComponents = useMemo(() => {
    const widgets = layoutConfig.layouts[bpH][bpW];

    // static widget coordinate height in pixels subtracted by static height
    const calcTop = (names: string[]) => {
      const staticWidgets = names
        .filter((n) => widgets.find((w) => w.i === n)?.staticHeight)
        .map((i) => widgets.find((w) => w.i === i));

      return (
        (coordToPx(staticWidgets[0]?.h, "h") - staticWidgets[0]?.staticHeight ||
          0) * -1
      );
    };

    // static widget coordinate width in pixels subtracted by static height
    const calcLeft = (names: string[]) => {
      const staticWidgets = names
        .filter((n) => widgets.find((w) => w.i === n)?.staticWidth)
        .map((i) => widgets.find((w) => w.i === i));

      return (
        (coordToPx(staticWidgets[0]?.w, "w") - staticWidgets[0]?.staticWidth ||
          0) * -1
      );
    };

    // calc widget height
    const calcHeight = (w: any): string => {
      if (w.staticHeight) {
        return `${w.staticHeight}px`;
      } // check widget connected at top edge and is static
      else if (w.edges.t.length && calcTop(w.edges.t)) {
        // h - offset
        return `${coordToPx(w.h, "h") + calcTop(w.edges.t) * -1}px`;
      }
      return "";
    };

    // calc widget width
    const calcWidth = (w: any): string => {
      if (w.staticWidth) {
        return `${w.staticWidth}px`;
      } // check widget connected at left edge and is static
      else if (w.edges.l.length && calcLeft(w.edges.l)) {
        // w - offset
        return `${coordToPx(w.w, "w") + calcLeft(w.edges.l) * -1}px`;
      }
      return "";
    };

    return widgets.map((widget, idx) => (
      <div
        id={widget.i}
        key={widget.i}
        data-grid={widget}
        style={{
          maxHeight: calcHeight(widget),
          minHeight: calcHeight(widget),
          maxWidth: calcWidth(widget),
          minWidth: calcWidth(widget),
          zIndex: widget.i === selectedWidget ? 9999 : 0,
          // TODO: re-implement, buggy after widget static height feature
          /*border:
            widget.i === selectedWidget ? "2px dotted rgba(255, 0, 0, 1)" : "",
          */
          // set top offset if not static
          top:
            !widget.staticHeight && widget.edges.t.length
              ? calcTop(widget.edges.t)
              : "",
          // set left offset if not static
          left:
            !widget.staticWidth && widget.edges.l.length
              ? calcLeft(widget.edges.l)
              : "",
        }}
      >
        <Widget
          key={idx}
          i={widget.i}
          type={widget.i.substr(0, widget.i.lastIndexOf("-")) as WidgetType}
          showToolbar={showWidgetToolbars}
          data={data}
          selectedData={selectedData}
          setSelectedData={(val) => setSelectedData && setSelectedData(val)}
          selected={selectedWidget === widget.i}
          setSelected={setSelectedWidget}
          staticWidth={staticWidths[idx]}
          staticHeight={staticHeights[idx]}
          setStaticHeight={() => {
            const h = document.getElementById(widget.i)?.clientHeight;
            widget.staticHeight
              ? (widget.staticHeight = undefined)
              : // +2 for border
                (widget.staticHeight = h ? h + 2 : undefined);
            saveLayout(layoutConfig.layouts[bpH][bpW]);
          }}
          setStaticWidth={() => {
            const w = document.getElementById(widget.i)?.clientWidth;
            widget.staticWidth
              ? (widget.staticWidth = undefined)
              : // +2 for border
                (widget.staticWidth = w ? w + 2 : undefined);
            saveLayout(layoutConfig.layouts[bpH][bpW]);
          }}
        />
      </div>
    ));
  }, [
    staticHeights,
    staticWidths,
    selectedWidget,
    bpH,
    showWidgetToolbars,
    data,
    selectedData,
    width,
    height,
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

  // TODO: works better than expected
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

  return (
    <>
      {!refreshing && (
        <ResponsiveGrid
          style={{
            minHeight: layoutHeight,
            // Grid lines
            backgroundSize: `${
              width ? width / layoutConfig.cols[bpW] : "0"
            }px ${layoutHeight / widgetConfig.maxH}px`,
            backgroundImage: `linear-gradient(to right, #202020 1px, transparent 1px), linear-gradient(to bottom, #202020 1px, transparent 1px)`,
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
          // onResize={() => console.log(coordToPx(16))} /*saveLayout*/
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
