import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Pokemon from "./pages/Pokemon";
import Details from "./pages/Details";
import Customizer from "./pages/Customizer";
import Favorites from "./pages/Favorites";
import Compare from "./pages/Compare";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Pokemon />} />
        <Route path="pokemon/:name" element={<Details />} />
        <Route path="/customizer/:name" element={<Customizer />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/compare" element={<Compare />} />
      </Route>
    </Routes>
  );
};

export default App;
