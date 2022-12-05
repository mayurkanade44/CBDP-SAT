import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navbar } from "./components";
import { Documents } from "./pages";

function App() {
  return (
    <Router className="container">
      <Navbar />
      <Routes>
        <Route path="/documents" element={<Documents />} />
      </Routes>
    </Router>
  );
}

export default App;
