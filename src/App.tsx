import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import ResearchAnalyzerPage from "./pages/ResearchAnalyzerPage";
import FundingMatchmakerPage from "./pages/FundingMatchmakerPage";
import MentorshipHubPage from "./pages/MentorshipHubPage";
import SettingsPage from "./pages/SettingsPage";
import GraduationDeclarationPage from "./pages/GraduationDeclarationPage";
import routes from "tempo-routes";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/research" element={<ResearchAnalyzerPage />} />
          <Route path="/funding" element={<FundingMatchmakerPage />} />
          <Route path="/mentorship" element={<MentorshipHubPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route
            path="/graduation-declaration"
            element={<GraduationDeclarationPage />}
          />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
