import './App.css';
import {Route, Routes, BrowserRouter} from "react-router-dom";
import LandingPage from "./components/views/LandingPage/LandigPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
function App() {

    return (
      <BrowserRouter>
          {/* A <Switch> looks through its children <Routes> and
          renders the first one that matches the current URL. */}
          <Routes>
            <Route exact path="/" element={<LandingPage/>}/>
            <Route exact path="/login" element={<LoginPage/>}/>
            <Route exact path="/register" element={<RegisterPage/>}/>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
