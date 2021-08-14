// SCSS
import "./widget-toolbar.scss";

// Widget Type
import { WidgetType } from "./widget-wrapper";

// Components
import BtnToggle from "../entity/entity-btn-toggle";

// Font Awesome Icon
import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";

type WidgetToolbarProps = {
  type: WidgetType;
  staticHeight?: number;
  setStaticHeight: () => void;
};

export const WidgetToolbar = ({
  type,
  staticHeight,
  setStaticHeight,
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
    <div className="widget-toolbar" /*onMouseLeave={mouseLeave}*/>
      <BtnToggle
        text={"h: "}
        on={staticHeight ? false : true}
        icon={staticHeight ? faLock : faLockOpen}
        click={setStaticHeight}
      />
      <span className="widget-toolbar-title">{type}</span>
      <div />
    </div>
  );
};

export default WidgetToolbar;
