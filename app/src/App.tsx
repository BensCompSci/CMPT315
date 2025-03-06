import { useState } from "react";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard.tsx";
import { User } from "./models/User";
import "./App.css";

function App() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  return (
    <div>
      {loggedInUser ? (
        <Dashboard />
      ) : (
        <HomePage updateLoggedInUser={setLoggedInUser} />
      )}
    </div>
  );
}

export default App;
