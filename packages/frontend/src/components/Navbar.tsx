import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-indigo-600">
        🍽️ RecipeAid
      </Link>

      <div className="flex items-center gap-4">
        <Link to="/" className="text-gray-700 hover:text-indigo-600">
          Meal Builder
        </Link>

        <button
          onClick={handleLogout}
          className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
