import { Link, useNavigate } from "react-router-dom";
import recipeLogo from "../assets/recipelogo.png";
import { button } from "motion/react-client";

export default function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link to="/" className="flex text-xl font-bold text-indigo-600">
        <img src={recipeLogo} className="w-11 h-11 mr-2" />
        RecipeAid
      </Link>

      <div className="flex items-center gap-4">
        <Link to="/mealbuilder" className="text-gray-700 hover:text-indigo-600">
          Meal Builder
        </Link>

        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={handleLogin}
            className="text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}
