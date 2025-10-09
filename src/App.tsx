import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import CampaignsPage from "./pages/CampaignsPage";
import CampaignsDetails from "./pages/CampaignsDetails";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Overview from "./pages/Schools/Overview"
import Settings from "./pages/Schools/Settings";
import Campaigns from "./pages/Schools/Campaigns";
import CreateCampaign from "./pages/CreateCampaign";

import SignupSteps from "./components/SignupSteps/SignupSteps";
import DonatePage from "./pages/DonatePage";
import ActiveCampaigns from "./pages/Schools/ActiveCampaigns";
import InactiveCampaignsPage from "./pages/Schools/InactiveCampaignsPage";

import Donors from "./pages/Donors/Donors";

const App = () => {
  return (
    <Router>
      <Routes> 
        <Route path="/" element={<LandingPage />} /> 
        <Route path="/campaigns" element={<CampaignsPage />} />
        <Route path="/campaigns/:id" element={<CampaignsDetails />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/active-campaigns" element={<ActiveCampaigns />} />
        <Route path="/inactive-campaigns" element={<InactiveCampaignsPage />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/campaign" element={<Campaigns />} />
        <Route path="/signup-steps" element={<SignupSteps />} />
        <Route path="/create" element={<CreateCampaign />} />
        
        <Route path="/donate/:id" element={<DonatePage />}/>


        <Route path="/donors" element={<Donors />} />
      </Routes>
    </Router>
  );
};

export default App;