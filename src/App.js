import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import AddEvent from "./components/AddEvent/AddEvent";
import Home from "./components/Home/Home";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home></Home>
        </Route>
        <Route path="/home">
          <Home></Home>
        </Route>
        <Route path="/addEvent">
          <AddEvent></AddEvent>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
