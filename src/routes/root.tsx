/* import useAuthCheck from "../hooks/useAuthCheck";
import { logout } from "../utils/Auth";
import { Link } from "react-router-dom";

export default function Root() {
  const isLoggedIn = useAuthCheck();

  return (
    <>
      <div className="max-w-4xl mx-auto px-5 py-6">
        <nav>
          <ul className="flex justify-center gap-x-5">
            <li>
              <Link to="/">Home</Link>
            </li>
            {!isLoggedIn ? (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <button onClick={() => logout()}>Logout</button>
                </li>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
      <div id="detail"></div>
    </>
  );
}
 */
