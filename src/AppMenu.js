import { Link } from "react-router-dom";

const AppMenu = () => {
  return (
    <ul className="nav flex-column">
      <li className="nav-item">
        <h6 className="text-white">React Home</h6>
        <Link to="/" className="nav-link text-warning">Home</Link>
      </li>
      <li className="nav-item mt-3">
        <h6 className="text-white">Redis</h6>
        <Link to="/redis" className="nav-link text-warning">WebSocket + Redis</Link>
      </li>
      <li className="nav-item mt-3">
        <h6 className="text-white">MQTT</h6>
        <Link to="/mqtt" className="nav-link text-warning">MQTT</Link>
      </li>
    </ul>
  );
};

export default AppMenu;

