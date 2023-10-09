import "./App.css";
import React from "react";
import Navbar from "./components/shared/Navbar";
import { AuthProvider } from "./hooks/useAuth";
import RouterPage from "./components/shared/RouterPage";

function App() {
  return (
    <div className="App">
      <Navbar />
      <AuthProvider>
        <RouterPage />
      </AuthProvider>
    </div>
  );
}

export default App;
