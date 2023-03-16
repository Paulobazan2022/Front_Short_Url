import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import UserMenu from "./components/UserMenu";
import Redirect from "./components/Redirect";
import {UserProvider} from "./context/Context.User"

function App() {
  return (
    <>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/log-in" element={<Login />} />
            <Route path="/users/register" element={<Register />} />
            <Route path="/user/user-menu" element={<UserMenu />} />
            <Route path="/:shorturl" element={<Redirect />}/>
          </Routes>
        </Router>
      </UserProvider>
    </>
  );
}

export default App;
