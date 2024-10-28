import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import StudentComponent from "./components/StudentComponent";
import StudentDetails from "./pages/StudentDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StudentComponent />} />
        <Route path="/details/:id" element={<StudentDetails />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
