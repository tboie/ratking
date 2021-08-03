// SCSS
import "./app-labrat.scss";

// Theme
import "./config-theme.scss";

// Layout
import Layout from "../../components/layout/layout-grid";

// Layout Config
import { layoutConfig, widgetConfig } from "./config-layout";

// Component
const LabRat = () => {
  return (
    <div className="app-labrat">
      <Layout
        showToolbar={true}
        layoutConfig={layoutConfig}
        widgetConfig={widgetConfig}
      />
    </div>
  );
};

export default LabRat;
