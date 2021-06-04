import "./config/theme.scss";

// React
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Layout
import Layout from "./components/layout/layout-grid";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          {/* Note: Root goes last */}
          <Layout />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
