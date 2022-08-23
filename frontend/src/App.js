import "./App.css";
import { Home, Thanks } from "./pages";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/thanks" element={<Thanks />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
