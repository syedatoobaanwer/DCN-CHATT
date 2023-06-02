import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <h1>
        <Link to="/">DCN CHAT APP!</Link>
      </h1>
      <div>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
};
export default Navbar;
