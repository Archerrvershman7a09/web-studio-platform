import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

import { I18nProvider } from '@/lib/i18n';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

// Page Imports
import Home from '@/pages/home';
import Works from '@/pages/works';
import DemoCafe from '@/pages/demo-cafe';
import DemoBeauty from '@/pages/demo-beauty';
import DemoInterior from '@/pages/demo-interior';
import CreateWizard from '@/pages/create';
import Estimate from '@/pages/estimate';
import SimilarWork from '@/pages/similar';
import Workspace from '@/pages/workspace';
import SignIn from '@/pages/sign-in';
import Readiness from '@/pages/readiness';
import Admin from '@/pages/admin';

const queryClient = new QueryClient();

function Router() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 flex flex-col">
        <RoutedErrorBoundary>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/works" component={Works} />
            <Route path="/demo/cafe" component={DemoCafe} />
            <Route path="/demo/beauty" component={DemoBeauty} />
            <Route path="/demo/interior" component={DemoInterior} />
            <Route path="/create" component={CreateWizard} />
            <Route path="/estimate" component={Estimate} />
            <Route path="/similar/:work" component={SimilarWork} />
            <Route path="/workspace" component={Workspace} />
            <Route path="/sign-in" component={SignIn} />
            <Route path="/readiness" component={Readiness} />
            <Route path="/admin" component={Admin} />
            <Route component={NotFound} />
          </Switch>
        </RoutedErrorBoundary>
      </main>
      <Footer />
    </div>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <I18nProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
            <Router />
          </WouterRouter>
          <Toaster />
        </I18nProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
