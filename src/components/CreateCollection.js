import { useMutation } from "@apollo/client";
import {
  CREATE_COLLECTION_MUTATION,
  ALL_COLLECTIONS,
} from "../gql/collections.api";
import ErrorMessage from "./ErrorMessage";

export default function CreateCollection() {
  const [createCollection, { loading, error }] = useMutation(
    CREATE_COLLECTION_MUTATION
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new window.FormData(form);
    const name = formData.get("name");
    form.reset();

    createCollection({
      variables: { name },
      update: (cache, { data: { createCollection } }) => {
        const data = cache.readQuery({
          query: ALL_COLLECTIONS,
        });
        cache.writeQuery({
          query: ALL_COLLECTIONS,
          data: {
            ...data,
            collections: [...data.collections, createCollection],
          },
        });
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create movie collection</h1>
      <input placeholder="name" name="name" type="text" required />
      <button type="submit" disabled={loading}>
        {loading ? "Loading..." : "Submit"}
      </button>
      {error && <ErrorMessage message={error.message} />}
      <style jsx>{`
        form {
          border-bottom: 1px solid #ececec;
          padding-bottom: 20px;
          margin-bottom: 20px;
        }
        h1 {
          font-size: 20px;
        }
        input {
          display: block;
          margin-bottom: 10px;
        }
      `}</style>
    </form>
  );
}
