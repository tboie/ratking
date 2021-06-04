import "./widget-loader.scss";

// SVG
import RiseLoader from "react-spinners/RiseLoader";

const WidgetLoader = () => {
  return (
    <div className="loader">
      <RiseLoader color={"white"} loading={true} size={16} />
    </div>
  );
};

export default WidgetLoader;
