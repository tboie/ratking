import "./config/theme.scss";

// Router
import { BrowserRouter as Router } from "react-router-dom";

// Layout
import Layout from "./components/layout/layout-grid";

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
