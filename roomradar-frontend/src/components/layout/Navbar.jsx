import { Link, NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

const Navbar = () => {

const navigate = useNavigate();

const {
user,
logout,
} = useAuth();

const handleLogout =
async () => {

  await logout();

  navigate(
    "/login",
    {
      replace: true,
    }
  );
};


return ( <nav className="bg-white border-b shadow-sm">

  <div className="max-w-7xl mx-auto px-6">

    <div className="flex items-center justify-between h-16">

      {/* Logo */}

      <Link
        to="/matches"
        className="text-2xl font-bold text-blue-600"
      >
        RoomRadar
      </Link>

      {/* Navigation */}

      <div className="flex items-center gap-6">

        <NavLink
          to="/matches"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-semibold"
              : "text-gray-700"
          }
        >
          Matches
        </NavLink>

        <NavLink
          to="/requests"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-semibold"
              : "text-gray-700"
          }
        >
          Requests
        </NavLink>

        <NavLink
          to="/connections"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-semibold"
              : "text-gray-700"
          }
        >
          Connections
        </NavLink>

        <NavLink
          to="/chat"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-semibold"
              : "text-gray-700"
          }
        >
          Chat
        </NavLink>

        <NavLink
          to="/profile/setup"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-semibold"
              : "text-gray-700"
          }
        >
          Profile
        </NavLink>

        <NavLink
  to="/sent"
  className={({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold"
      : "text-gray-700"
  }
>
  Sent
</NavLink>

      </div>

      {/* Right Side */}

      <div className="flex items-center gap-4">

        <span className="text-sm text-gray-600">
          {user?.name}
        </span>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>

      </div>

    </div>

  </div>

</nav>

);
};

export default Navbar;
