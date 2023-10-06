import "./App.css";
import React from "react";
import Navbar from "./components/shared/Navbar";
import { AuthProvider } from "./hooks/useAuth";
import RouterPage from "./components/shared/RouterPage";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Navbar />
        <RouterPage />
      </div>
    </AuthProvider>
  );
}

export default App;
