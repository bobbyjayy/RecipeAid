# RecipeAid

RecipeAid is a full-stack web application that suggests complete three-course meals (appetizer, main, side dish) based on user-provided ingredients, preferred cuisine, servings, and meal time. It features a React frontend and an Express backend, utilizing AI to generate realistic recipes.

## Features

- Enter your available ingredients
- Choose cuisine, servings, and meal time
- Get AI-generated meal suggestions with detailed ingredients and steps
- Clean, user-friendly interface

## Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS
- **Backend:** Express, TypeScript
- **AI Integration:** OpenAI (for meal suggestion logic)

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/bobbyjayy/RecipeAid.git
   cd RecipeAid
   ```

2. **Install dependencies for both frontend and backend:**

   ```sh
   cd packages/backend
   npm install
   cd ../frontend
   npm install
   ```

3. **Set up environment variables:**
   - Create a `.env` file in `/packages/backend` for backend secrets (e.g., API keys).

### Running the App

**Backend:**

```sh
cd packages/backend
npm run dev
```

**Frontend:**

```sh
cd packages/frontend
npm run dev
```

The frontend will be available at [http://localhost:3000](http://localhost:3000) by default.

## Project Structure

```
/packages
  /backend    # Express API
  /frontend   # React app
```

##
