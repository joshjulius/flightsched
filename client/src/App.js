import { Switch, Route } from "react-router-dom";
import "./App.scss";
import "./normalize.css";

import Userpage from "./pages/Userpage/Userpage";
import Loginpage from "./pages/Loginpage/Loginpage";

function App() {
  return (
    <div className="app">
      <Switch>
        <Route path="/" exact render={(...props) => <Loginpage {...props} />} />
        <Route
          path="/user/:id"
          render={(...props) => <Userpage {...props} />}
        />
      </Switch>
    </div>
  );
}

export default App;
