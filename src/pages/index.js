import App from "../components/App";

import CreateCollection from "../components/CreateCollection";
import Collections from "../components/Collections";

const IndexPage = () => (
  <App>
    <CreateCollection />
    <Collections />
  </App>
);

export default IndexPage;
