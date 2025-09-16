import React from "react";
import { AuthProvider } from "./context/AuthContext.jsx";
import MainPage from "./pages/MainPage.jsx";

function App() {
  return (
    <AuthProvider>
      <MainPage />
    </AuthProvider>
  );
}

export default App;
