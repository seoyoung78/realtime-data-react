import { Link } from "react-router-dom";

function AppHeader() {
  return (
    <nav className="navbar bg-dark navbar-dark text-white font-weight-bold 
                    justify-content-between">
      <Link to="/" className="navbar-brand">
        <img src="/logo512.png" alt="" width="30" height="30" 
              className="align-top"/>
        {' '} React: RealTime Data Synchronization
      </Link>
      <div>
      </div>
    </nav>
  );
}

export default AppHeader;

