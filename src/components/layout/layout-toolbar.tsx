import "./layout-toolbar.scss";

type LayoutEditorProps = {
  breakpoints: { [key: string]: number };
  currBreakpoint: string;
  height: number;
  showWidgetResize: boolean;
  toggleShowWidgetResize: () => void;
  showWidgetToolbars: boolean;
  toggleShowWidgetToolbars: () => void;
};

const LayoutToolbar = ({
  breakpoints,
  currBreakpoint,
  height,
  showWidgetResize,
  toggleShowWidgetResize,
  showWidgetToolbars,
  toggleShowWidgetToolbars,
}: LayoutEditorProps) => {
  return (
    <div id="layout-toolbar" style={{ height: height }}>
      <LayoutStatus currBreakpoint={currBreakpoint} breakpoints={breakpoints} />
      <BtnToggleWidgetResize
        showWidgetResize={showWidgetResize}
        toggleShowWidgetResize={toggleShowWidgetResize}
      />
      <BtnToggleWidgetToolbars
        showWidgetToolbars={showWidgetToolbars}
        toggleShowWidgetToolbars={toggleShowWidgetToolbars}
      />
    </div>
  );
};

type LayoutStatusProps = {
  breakpoints: { [key: string]: number };
  currBreakpoint: string;
};

const LayoutStatus = ({ breakpoints, currBreakpoint }: LayoutStatusProps) => {
  return (
    <>
      {Object.keys(breakpoints)
        .reverse()
        .map((bp) => (
          <span key={bp} className={bp === currBreakpoint ? "active" : ""}>
            {bp}
          </span>
        ))}
    </>
  );
};

type BtnToggleWidgetToolbarsProps = {
  showWidgetToolbars: boolean;
  toggleShowWidgetToolbars: () => void;
};

const BtnToggleWidgetToolbars = ({
  showWidgetToolbars,
  toggleShowWidgetToolbars,
}: BtnToggleWidgetToolbarsProps) => (
  <button onClick={toggleShowWidgetToolbars}>{`tlbr:${
    showWidgetToolbars ? "1" : "0"
  }`}</button>
);

type BtnToggleWidgetResizeProps = {
  showWidgetResize: boolean;
  toggleShowWidgetResize: () => void;
};

const BtnToggleWidgetResize = ({
  showWidgetResize,
  toggleShowWidgetResize,
}: BtnToggleWidgetResizeProps) => (
  <button onClick={toggleShowWidgetResize}>{`rsz:${
    showWidgetResize ? "1" : "0"
  }`}</button>
);

export default LayoutToolbar;
