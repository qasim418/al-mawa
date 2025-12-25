import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import About from './pages/About';
import ConstructionProject from './pages/ConstructionProject';
import Donate from './pages/Donate';
import Fundraising from './pages/Fundraising';
import Home from './pages/Dashboard';
import PrayerTimings from './pages/PrayerTimings';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/construction" component={ConstructionProject} />
        <Route exact path="/donate" component={Donate} />
        <Route exact path="/prayer-timings" component={PrayerTimings} />
        <Route exact path="/fundraising" component={Fundraising} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
