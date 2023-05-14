import "./App.css";
import { Routes, Route } from "react-router-dom";
import MovieDetails from "./pages/MovieDetails";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:episode_id" element={<MovieDetails />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
