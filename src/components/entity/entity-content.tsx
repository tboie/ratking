import "./entity-content";

// Router Route
import { Route } from "react-router-dom";

const Content = () => {
  return (
    <div className="entity-content">
      <Route exact path="/">
        <span>Home</span>
      </Route>
      <Route exact path="/news">
        <span>News</span>
      </Route>
    </div>
  );
};

export default Content;
