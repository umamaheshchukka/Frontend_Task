import RegisterForm from "./componenets/register";
import LoginForm from "./componenets/login";
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import TemperatureChart from "./componenets/chart";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Link to={"/"}>RegisterForm</Link>/
      <Link to={"/login"}>LoginForm</Link>
      {/* <Link to="/chart">chart</Link> */}
      <Routes>
      <Route path='/' element={<RegisterForm />} />
      <Route path="/login" element={<LoginForm/>}/>
      <Route path="/chart" element={<TemperatureChart/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
