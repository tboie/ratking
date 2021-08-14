import "./layout-toolbar.scss";

// React
import { useState } from "react";

// Window Size Hook
import { useWindowSize } from "@react-hook/window-size";

// Components
import BtnToggle from "../entity/entity-btn-toggle";

type LayoutToolbarProps = {
  bpConfigW: { [key: string]: number };
  bpConfigH: { [key: string]: number };
  height: number;
  showWidgetResize: boolean;
  toggleShowWidgetResize: () => void;
  showWidgetToolbars: boolean;
  toggleShowWidgetToolbars: () => void;
  bpW: string;
  bpH: string;
};

const LayoutToolbar = ({
  bpConfigW,
  bpConfigH,
  bpW,
  bpH,
  height,
  showWidgetResize,
  toggleShowWidgetResize,
  showWidgetToolbars,
  toggleShowWidgetToolbars,
}: LayoutToolbarProps) => {
  return (
    <div id="layout-toolbar" style={{ height: height }}>
      <LayoutStatus
        bpW={bpW}
        bpH={bpH}
        bpConfigW={bpConfigW}
        bpConfigH={bpConfigH}
      />
      <BtnToggle
        text={"rsz"}
        on={showWidgetResize}
        click={toggleShowWidgetResize}
      />
      <BtnToggle
        text={"tlbr"}
        on={showWidgetToolbars}
        click={toggleShowWidgetToolbars}
      />
    </div>
  );
};

type LayoutStatusProps = {
  bpConfigW: { [key: string]: number };
  bpConfigH: { [key: string]: number };
  bpW: string;
  bpH: string;
};

const LayoutStatus = ({
  bpW,
  bpH,
  bpConfigW,
  bpConfigH,
}: LayoutStatusProps) => {
  const [width, height] = useWindowSize();
  const [mode, setMode] = useState<"w" | "h">("w");

  return (
    <>
      {["w", "h"].map((name) => (
        <button
          key={name}
          className={mode === name ? "on" : ""}
          onClick={() => setMode(name as "w" | "h")}
        >
          {name === "w" ? `w:${width}` : `h:${height}`}
        </button>
      ))}
      {Object.keys(mode === "w" ? bpConfigW : bpConfigH)
        .reverse()
        .map((bp) => (
          <span
            key={bp}
            className={
              mode === "w"
                ? bp === bpW
                  ? "active"
                  : ""
                : bp === bpH
                ? "active"
                : ""
            }
          >
            {bp}
          </span>
        ))}
    </>
  );
};

export default LayoutToolbar;
