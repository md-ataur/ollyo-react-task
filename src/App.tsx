import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeDnd from "./pages/Home/HomeDnd";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeDnd />} />
      </Routes>
    </Router>
  );
}

export default App;
