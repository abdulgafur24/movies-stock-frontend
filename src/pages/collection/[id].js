import App from "../../components/App";
import { useRouter } from "next/router";

import Movies from "../../components/Movies";
import CreateMovie from "../../components/CreateMovie";

const CollectionPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <App>
      <CreateMovie collectionId={id} />
      <Movies collectionId={id} />
    </App>
  );
};

export default CollectionPage;
