import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from "./components/AuthProvider";
import Layout from "./components/Layout";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/*" element={<Layout />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;