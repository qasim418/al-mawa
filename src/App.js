import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import About from './pages/About';
import MissionVision from './pages/MissionVision';
import OurHistory from './pages/OurHistory';
import ShuraManagement from './pages/ShuraManagement';
import Bylaws from './pages/Bylaws';
import ConstructionProject from './pages/ConstructionProject';
import ConstructionPhases from './pages/ConstructionPhases';
import ConstructionFundraising from './pages/ConstructionFundraising';
import ConstructionGallery from './pages/ConstructionGallery';
import Donate from './pages/Donate';
import Home from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import Media from './pages/Media';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/admin" component={AdminDashboard} />
        <Route exact path="/about" component={About} />
        <Route exact path="/about/mission-vision" component={MissionVision} />
        <Route exact path="/about/our-history" component={OurHistory} />
        <Route exact path="/about/shura-management" component={ShuraManagement} />
        <Route exact path="/about/bylaws" component={Bylaws} />
        <Route exact path="/construction" component={ConstructionProject} />
        <Route exact path="/construction/project" component={ConstructionProject} />
        <Route exact path="/construction/phases" component={ConstructionPhases} />
        <Route exact path="/construction/fundraising" component={ConstructionFundraising} />
        <Route exact path="/construction/gallery" component={ConstructionGallery} />
        <Route exact path="/donate" component={Donate} />
        <Route exact path="/media" component={Media} />
        <Redirect exact from="/fundraising" to="/construction" />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
