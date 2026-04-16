import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NotFound from "@/pages/NotFound";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Expression from "./pages/Expression";
import Exercices from "./pages/Exercices";
import Creatif from "./pages/Creatif";
import Bibliotheque from "./pages/Bibliotheque";
import Urgence from "./pages/Urgence";
import Confidentialite from "./pages/Confidentialite";
import Annuaire from "./pages/Annuaire";
import CasDeVie from "./pages/CasDeVie";
import Communaute from "./pages/Communaute";
import Suivi from "./pages/Suivi";
import Bascule from "./pages/Bascule";
import { useLocation } from "wouter";

function Router() {
  const [location] = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const isUrgenceRoute = location === "/urgence";

  const pageTransition = prefersReducedMotion
    ? undefined
    : {
        initial: { opacity: 0, y: 8, filter: "blur(2px)" },
        animate: { opacity: 1, y: 0, filter: "blur(0px)" },
        exit: { opacity: 0, y: -8, filter: "blur(2px)" },
        transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] as const },
      };

  const content = (
    <AnimatePresence mode="wait">
      <motion.div key={location} {...(pageTransition ?? {})}>
        <Switch>
          <Route path={"/"} component={Home} />
          <Route path={"/expression"} component={Expression} />
          <Route path={"/exercices"} component={Exercices} />
          <Route path={"/creatif"} component={Creatif} />
          <Route path={"/bibliotheque"} component={Bibliotheque} />
          <Route path={"/annuaire"} component={Annuaire} />
          <Route path={"/cas-de-vie"} component={CasDeVie} />
          <Route path={"/cas-de-vie/:id"} component={CasDeVie} />
          <Route path={"/communaute"} component={Communaute} />
          <Route path={"/nous"} component={Communaute} />
          <Route path={"/suivi"} component={Suivi} />
          <Route path={"/basculer"} component={Bascule} />
          <Route path={"/urgence"} component={Urgence} />
          <Route path={"/confidentialite"} component={Confidentialite} />
          <Route path={"/404"} component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </motion.div>
    </AnimatePresence>
  );

  return (
    <div className="min-h-screen bg-bg-main flex flex-col">
      {!isUrgenceRoute && <Header />}
      <main className={!isUrgenceRoute ? "flex-1" : undefined}>
        {content}
      </main>
      {!isUrgenceRoute && <Footer />}
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
