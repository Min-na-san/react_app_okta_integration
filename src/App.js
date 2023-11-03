import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import Staff from "./components/pages/Staff";
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Route pathe="/" exact={true} component={Home} />
        <Route pathe="/staff" exact={true} component={Staff} />
        <h1>Hello World</h1>
      </div>
    </Router>
  );
}

export default App;
