import Login from "./pages/login";
import Admin from "./pages/admin";
import Register from "./pages/register";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
const apiUrl = "https://emoji-api-3j2woe7nna-nw.a.run.app";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login apiUrl={apiUrl} />} />
        <Route path="/register" element={<Register apiUrl={apiUrl} />} />
        <Route path="/admin" element={<Admin apiUrl={apiUrl} />} />
      </Routes>
    </Router>
  );
}

export default App;
