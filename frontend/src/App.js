import { Home, Thanks, Login, Register } from "./pages";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { useSelector } from "react-redux";
import { Chips } from "./components";
import { UserResponse } from "./pages";
function App() {
  const errors = useSelector((state) => state.component.errors);

  return (
    <div className="App">
      <div className="home-error">
        {errors.map((x, i) => {
          if (errors.length - 1 == i) {
            return (
              <Chips
                destroy={true}
                type={errors[errors.length - 1].type}
                text={errors[errors.length - 1].text}
              />
            );
          }
        })}
      </div>
      <Routes>
        <Route path="/thanks" element={<Thanks />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/register" element={<Register />} />
        <Route path="/collect/response/:id" element={<UserResponse />} />

        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
