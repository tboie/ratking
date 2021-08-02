// CSS
import "./config/theme.scss";

// React
import React, { Suspense } from "react";

// React Router
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Suspense Loader
import Loader from "react-spinners/RiseLoader";

// ResiumIG Prototype
const ResiumIG = React.lazy(() => import("./app/resiumig/app-resiumig"));

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <div>LABRAT.ART</div>
        </Route>
        <Route path="/resiumig/:user">
          <Suspense fallback={<Loader />}>
            <ResiumIG />
          </Suspense>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
