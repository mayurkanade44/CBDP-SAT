import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navbar } from "./components";
import { Attach, Documents } from "./pages";

function App() {
  return (
    <Router className="container">
      <Navbar />
      <Routes>
        <Route path="/documents" element={<Documents />} />
        <Route path="/attach" element={<Attach />} />
      </Routes>
    </Router>
  );
}

export default App;
