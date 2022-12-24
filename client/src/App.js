import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navbar, ProtectedRoute } from "./components";
import { Admin, Documents, Landing, PageNotFound, ServiceCards } from "./pages";
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
        <Route path="/" element={<Landing />} />
        <Route
          path="/documents"
          element={
            <ProtectedRoute>
              <Documents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/servicecards"
          element={
            <ProtectedRoute>
              <ServiceCards />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
