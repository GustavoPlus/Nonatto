import { Route, Switch } from 'wouter';
import Marketplace from './Marketplace';
import { Layout } from './nm/Layout';
import { AboutPage } from './nm/AboutPage';
import { PartnershipsPage } from './nm/PartnershipsPage';

export default function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Marketplace} />
        <Route path="/sobre-nos" component={AboutPage} />
        <Route path="/parcerias" component={PartnershipsPage} />
        <Route component={Marketplace} />
      </Switch>
    </Layout>
  );
}
