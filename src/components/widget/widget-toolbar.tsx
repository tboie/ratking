import "./widget-toolbar.scss";

import { WidgetType } from "./widget-wrapper";

type WidgetToolbarProps = {
  type: WidgetType;
};

export const WidgetToolbar = ({ type }: WidgetToolbarProps) => {
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
      <span className="widget-toolbar-title">{type}</span>
    </div>
  );
};

export default WidgetToolbar;
