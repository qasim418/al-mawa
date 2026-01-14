import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import About from './pages/About';
import ConstructionProject from './pages/ConstructionProject';
import Donate from './pages/Donate';
import Home from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import PrayerTimings from './pages/PrayerTimings';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/admin" component={AdminDashboard} />
        <Route exact path="/about" component={About} />
        <Route exact path="/construction" component={ConstructionProject} />
        <Route exact path="/donate" component={Donate} />
        <Route exact path="/prayer-timings" component={PrayerTimings} />
        <Redirect exact from="/fundraising" to="/construction" />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
