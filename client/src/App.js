import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navbar } from "./components";
import { Admin, Documents } from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router className="container">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        pauseOnFocusLoss={false}
      />
      <Navbar />
      <Routes>
        <Route path="/documents" element={<Documents />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
