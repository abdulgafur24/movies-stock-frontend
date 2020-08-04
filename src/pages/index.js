import App from "../components/App";

import CreateCollection from "../components/CreateCollection";
import Collections from "../components/Collections";
import { initializeApollo } from "../lib/apolloClient";
import { ALL_COLLECTIONS } from "../gql/collections.api";

const IndexPage = () => (
  <App>
    <CreateCollection />
    <Collections />
  </App>
);

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: ALL_COLLECTIONS,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  };
}

export default IndexPage;
