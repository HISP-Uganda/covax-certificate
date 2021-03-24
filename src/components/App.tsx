import { Box } from "@chakra-ui/layout";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Home from "./Home";
import TrackedEntityInstance from "./TrackedEntityInstance";

const App = () => (
  <Router>
    <Box padding="10px" fontFamily="sans-serif">
      <Switch>
        <Route path="/instances/:tei">
          <TrackedEntityInstance />
        </Route>
        <Route path="/instances">
          <Home />
        </Route>
        <Redirect from="/" to="/instances" />
      </Switch>
    </Box>
  </Router>
);

export default App;
