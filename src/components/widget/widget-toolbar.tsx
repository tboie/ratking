// SCSS
import "./widget-toolbar.scss";

// Widget Type
import { WidgetType } from "./widget-wrapper";

// Components
import BtnToggle from "../entity/entity-btn-toggle";

// Font Awesome Icon
import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";

type WidgetToolbarProps = {
  i: string;
  type: WidgetType;
  staticHeight?: number;
  setStaticHeight: () => void;
  staticWidth?: number;
  setStaticWidth: () => void;
  selected: boolean;
  setSelected: (val: string) => void;
};

export const WidgetToolbar = ({
  i,
  type,
  staticHeight,
  setStaticHeight,
  staticWidth,
  setStaticWidth,
  selected,
  setSelected,
}: WidgetToolbarProps) => {
  // Stop dragging when mouse leaves
  /*
  const mouseLeave = (e: any) => {
    const mouseEvent = document.createEvent("MouseEvents");
    mouseEvent.initEvent("mouseup", true, true);
    e.target.dispatchEvent(mouseEvent);
  };
  */

  return (
    <div
      className="widget-toolbar"
      // TODO: re-implement, buggy after adding widget static height feature
      // onMouseDown={() => setSelected(i)} /*onMouseLeave={mouseLeave}*/
    >
      <div>
        <BtnToggle
          text={"w: "}
          on={staticWidth ? false : true}
          icon={staticWidth ? faLock : faLockOpen}
          click={setStaticWidth}
        />
        <BtnToggle
          text={"h: "}
          on={staticHeight ? false : true}
          icon={staticHeight ? faLock : faLockOpen}
          click={setStaticHeight}
        />
      </div>
      <span className="widget-toolbar-title">{type}</span>
      <div />
    </div>
  );
};

export default WidgetToolbar;
