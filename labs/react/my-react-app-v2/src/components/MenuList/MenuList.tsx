// rafce --- using https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets

import { NavLink } from "react-router-dom";

const MenuList: React.FC = () => {
    return (
      <ul className="navbar-nav me-auto mb-2 mb-md-0">
        <li className="nav-item">
          <NavLink className="nav-link" to="/">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/netflix">
            Netflix
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/crud">
            CRUD
          </NavLink>
        </li>
      </ul>
    );
  }
  
  export default MenuList