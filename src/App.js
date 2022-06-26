import "./App.css";
import MainHeader from "./components/MainHeader/MainHeader.js";
import MainContent from "./components/MainContent/MainContent.js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <MainHeader />
        <Switch>
          <Route path="/">
            <MainContent />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
