import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import SiteChrome from './components/SiteChrome.jsx';
import NotFound from './components/NotFound.jsx';

/* One chunk per page, so a visit only downloads the page it lands on. */
const AiAgents = lazy(() => import('./pages/AiAgents.jsx'));
const AiAssistedAutomation = lazy(() => import('./pages/AiAssistedAutomation.jsx'));
const AiAssistedEngineering = lazy(() => import('./pages/AiAssistedEngineering.jsx'));
const AiDevelopmentWorkspace = lazy(() => import('./pages/AiDevelopmentWorkspace.jsx'));
const AnvasComet = lazy(() => import('./pages/AnvasComet.jsx'));
const AnvasLogistics = lazy(() => import('./pages/AnvasLogistics.jsx'));
const Anvassoftware = lazy(() => import('./pages/Anvassoftware.jsx'));
const Careers = lazy(() => import('./pages/Careers.jsx'));
const CaseStudies = lazy(() => import('./pages/CaseStudies.jsx'));
const CaseStudyAnvasComet = lazy(() => import('./pages/CaseStudyAnvasComet.jsx'));
const CaseStudyAnvasLogistics = lazy(() => import('./pages/CaseStudyAnvasLogistics.jsx'));
const CaseStudyElegal = lazy(() => import('./pages/CaseStudyElegal.jsx'));
const CaseStudyFintech = lazy(() => import('./pages/CaseStudyFintech.jsx'));
const CaseStudyKuberaAi = lazy(() => import('./pages/CaseStudyKuberaAi.jsx'));
const CaseStudyTnIhip = lazy(() => import('./pages/CaseStudyTnIhip.jsx'));
const CaseStudyVishfulAttendance = lazy(() => import('./pages/CaseStudyVishfulAttendance.jsx'));
const CaseStudyVishful = lazy(() => import('./pages/CaseStudyVishful.jsx'));
const CloudDeployment = lazy(() => import('./pages/CloudDeployment.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const CustomSoftwareDevelopment = lazy(() => import('./pages/CustomSoftwareDevelopment.jsx'));
const DataAiEngineering = lazy(() => import('./pages/DataAiEngineering.jsx'));
const DigitalSolutions = lazy(() => import('./pages/DigitalSolutions.jsx'));
const Ecosystem = lazy(() => import('./pages/Ecosystem.jsx'));
const Elegal = lazy(() => import('./pages/Elegal.jsx'));
const EnterpriseApplications = lazy(() => import('./pages/EnterpriseApplications.jsx'));
const FinancialTechnology = lazy(() => import('./pages/FinancialTechnology.jsx'));
const FintechPlatform = lazy(() => import('./pages/FintechPlatform.jsx'));
const GenerativeAi = lazy(() => import('./pages/GenerativeAi.jsx'));
const Index = lazy(() => import('./pages/Index.jsx'));
const Industries = lazy(() => import('./pages/Industries.jsx'));
const InnovationImpact = lazy(() => import('./pages/InnovationImpact.jsx'));
const IntelligentWorkflows = lazy(() => import('./pages/IntelligentWorkflows.jsx'));
const KuberaAi = lazy(() => import('./pages/KuberaAi.jsx'));
const LegalTechnology = lazy(() => import('./pages/LegalTechnology.jsx'));
const LogisticsOperations = lazy(() => import('./pages/LogisticsOperations.jsx'));
const MlaCalendar = lazy(() => import('./pages/MlaCalendar.jsx'));
const MobileApplications = lazy(() => import('./pages/MobileApplications.jsx'));
const ProductEngineering = lazy(() => import('./pages/ProductEngineering.jsx'));
const PublicDigitalPlatforms = lazy(() => import('./pages/PublicDigitalPlatforms.jsx'));
const Recognition = lazy(() => import('./pages/Recognition.jsx'));
const Resources = lazy(() => import('./pages/Resources.jsx'));
const TechnologyExcellence = lazy(() => import('./pages/TechnologyExcellence.jsx'));
const TnIhip = lazy(() => import('./pages/TnIhip.jsx'));
const UiUxProductDesign = lazy(() => import('./pages/UiUxProductDesign.jsx'));
const UngalPakkam = lazy(() => import('./pages/UngalPakkam.jsx'));
const VishfulAttendance = lazy(() => import('./pages/VishfulAttendance.jsx'));
const Vishful = lazy(() => import('./pages/Vishful.jsx'));
const WebApplications = lazy(() => import('./pages/WebApplications.jsx'));
const WhatWeDo = lazy(() => import('./pages/WhatWeDo.jsx'));
const WhoWeAre = lazy(() => import('./pages/WhoWeAre.jsx'));

export default function App() {
  return (
    <SiteChrome>
      <Suspense fallback={<main id="main" />}>
        <Routes>
          <Route path="/ai-agents" element={<AiAgents />} />
          <Route path="/ai-assisted-automation" element={<AiAssistedAutomation />} />
          <Route path="/ai-assisted-engineering" element={<AiAssistedEngineering />} />
          <Route path="/ai-development-workspace" element={<AiDevelopmentWorkspace />} />
          <Route path="/anvas-comet" element={<AnvasComet />} />
          <Route path="/anvas-logistics" element={<AnvasLogistics />} />
          <Route path="/anvassoftware" element={<Anvassoftware />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/case-study-anvas-comet" element={<CaseStudyAnvasComet />} />
          <Route path="/case-study-anvas-logistics" element={<CaseStudyAnvasLogistics />} />
          <Route path="/case-study-elegal" element={<CaseStudyElegal />} />
          <Route path="/case-study-fintech" element={<CaseStudyFintech />} />
          <Route path="/case-study-kubera-ai" element={<CaseStudyKuberaAi />} />
          <Route path="/case-study-tn-ihip" element={<CaseStudyTnIhip />} />
          <Route path="/case-study-vishful-attendance" element={<CaseStudyVishfulAttendance />} />
          <Route path="/case-study-vishful" element={<CaseStudyVishful />} />
          <Route path="/cloud-deployment" element={<CloudDeployment />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/custom-software-development" element={<CustomSoftwareDevelopment />} />
          <Route path="/data-ai-engineering" element={<DataAiEngineering />} />
          <Route path="/digital-solutions" element={<DigitalSolutions />} />
          <Route path="/ecosystem" element={<Ecosystem />} />
          <Route path="/elegal" element={<Elegal />} />
          <Route path="/enterprise-applications" element={<EnterpriseApplications />} />
          <Route path="/financial-technology" element={<FinancialTechnology />} />
          <Route path="/fintech-platform" element={<FintechPlatform />} />
          <Route path="/generative-ai" element={<GenerativeAi />} />
          <Route path="/" element={<Index />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/innovation-impact" element={<InnovationImpact />} />
          <Route path="/intelligent-workflows" element={<IntelligentWorkflows />} />
          <Route path="/kubera-ai" element={<KuberaAi />} />
          <Route path="/legal-technology" element={<LegalTechnology />} />
          <Route path="/logistics-operations" element={<LogisticsOperations />} />
          <Route path="/mla-calendar" element={<MlaCalendar />} />
          <Route path="/mobile-applications" element={<MobileApplications />} />
          <Route path="/product-engineering" element={<ProductEngineering />} />
          <Route path="/public-digital-platforms" element={<PublicDigitalPlatforms />} />
          <Route path="/recognition" element={<Recognition />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/technology-excellence" element={<TechnologyExcellence />} />
          <Route path="/tn-ihip" element={<TnIhip />} />
          <Route path="/ui-ux-product-design" element={<UiUxProductDesign />} />
          <Route path="/ungal-pakkam" element={<UngalPakkam />} />
          <Route path="/vishful-attendance" element={<VishfulAttendance />} />
          <Route path="/vishful" element={<Vishful />} />
          <Route path="/web-applications" element={<WebApplications />} />
          <Route path="/what-we-do" element={<WhatWeDo />} />
          <Route path="/who-we-are" element={<WhoWeAre />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </SiteChrome>
  );
}
