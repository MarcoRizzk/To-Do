import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/auth-context";

const Navbar = () => {
  const auth = useContext(AuthContext);

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">To-Do App</h1>
      <div>
        {auth?.user ? (
          <>
            <span className="mr-4">{auth.user.name}</span>
            <button onClick={auth.logout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
