import "./entity-nav.scss";

// Router Link
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="entity-nav">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/news">News</Link>
        </li>
      </ul>
    </div>
  );
};

export default Nav;
