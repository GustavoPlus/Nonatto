import { Redirect, Route, Switch } from 'wouter';
import { Link } from 'wouter';
import { LandingPage } from './nm/LandingPage';
import Marketplace from './Marketplace';
import { Layout } from './nm/Layout';
import { AboutPage } from './nm/AboutPage';
import { PartnershipsPage } from './nm/PartnershipsPage';

export default function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={() => <LandingPage demoBase="/demo" />} />
        <Route path="/demo" component={() => <LandingPage demoBase="/demo" />} />
        <Route path="/demo/pedir" component={Marketplace} />
        <Route path="/demo/sobre-nos" component={AboutPage} />
        <Route path="/demo/parcerias" component={PartnershipsPage} />
        <Route path="/pedir"><Redirect to="/demo/pedir" /></Route>
        <Route path="/sobre-nos"><Redirect to="/demo/sobre-nos" /></Route>
        <Route path="/parcerias"><Redirect to="/demo/parcerias" /></Route>
        <Route component={NotFoundPage} />
      </Switch>
    </Layout>
  );
}

function NotFoundPage() {
  return (
    <main className="nm-page nm-wrap">
      <div className="nm-kicker">Nonatto</div>
      <h1 className="nm-serif">Esta página não existe.</h1>
      <p className="nm-lead"><Link href="/">Voltar ao início</Link> ou <Link href="/demo/pedir">ver a demonstração</Link>.</p>
    </main>
  );
}
