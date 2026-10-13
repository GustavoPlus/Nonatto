import { Route, Switch } from 'wouter';
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
        <Route path="/" component={LandingPage} />
        <Route path="/pedir" component={Marketplace} />
        <Route path="/sobre-nos" component={AboutPage} />
        <Route path="/parcerias" component={PartnershipsPage} />
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
      <p className="nm-lead"><Link href="/">Voltar ao início</Link> ou <Link href="/pedir">ver a seleção</Link>.</p>
    </main>
  );
}
