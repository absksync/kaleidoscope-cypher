import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { 
  LandingPage, 
  DiversityMeter, 
  IdeaVariationGenerator, 
  GamifiedCollaboration, 
  MindMapVisualization, 
  SWOTEvaluation 
} from './components';
import KAIChat from './components/KAIChat';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/diversity-meter" element={<DiversityMeter />} />
        <Route path="/idea-variation-generator" element={<IdeaVariationGenerator />} />
        <Route path="/gamified-collaboration" element={<GamifiedCollaboration />} />
        <Route path="/mindmap-visualization" element={<MindMapVisualization />} />
        <Route path="/swot-evaluation" element={<SWOTEvaluation />} />
        <Route path="/kai-chat" element={<KAIChat />} />
      </Routes>
    </Router>
  );
}

export default App;

