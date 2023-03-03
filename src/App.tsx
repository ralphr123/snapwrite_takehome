import { Home } from "./pages/Home";

const App = () => {
  return (
    <div className="App">
      {/* No need for routing on a one page app */}
      <Home />
    </div>
  );
};

export default App;
