import recipeLogo from "../assets/recipelogo.png";

function Homepage() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <nav className="flex items-center justify-between px-6 py-4  bg-white">
        <div className="flex items-center gap-3">
          <img src={recipeLogo} alt="RecipeAid Logo" className="h-10 w-10" />
          <span className="text-xl font-bold">RecipeAid</span>
        </div>
        <div className="hidden md:flex gap-6 text-md font-medium">
          <a href="/about" className="hover:text-green-600">
            About
          </a>
          <a href="/mealbuilder" className="hover:text-green-600">
            Try App
          </a>
          <a
            href="https://github.com/bobbyjayy/recipeaid"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-600"
          >
            Github
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between px-6 py-20 max-w-6xl mx-auto gap-12">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            AI-Powered Recipes from Your Ingredients
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Just tell us what's in your kitchen - We will turn it into a
            delicious meal using AI
          </p>
          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
            <a
              href="/mealbuilder"
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl text-lg transition"
            >
              Try It Now
            </a>
            <a
              href="https://github.com/bobbyjayy/recipeaid"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-gray-300 hover:border-gray-500 text-gray-800 px-6 py-3 rounded-xl text-lg transition"
            >
              View on Github
            </a>
          </div>
        </div>

        {/* Demo */}
        <div>
          <img
            src={recipeLogo}
            alt="RecipeAid demo"
            className="rounded-xl shadow-lg w-full max-w-md mx-auto"
          />
        </div>
      </section>
    </div>
  );
}

export default Homepage;
