import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registration from "./components/Registration";
import Login from "./components/Login";
import UserDetails from "./components/UserDetails";



function App() {
  return (
    <Router>
      <Routes>
         <Route path="/" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<UserDetails />} />
      </Routes>
    </Router>
  );
}
export default App;
