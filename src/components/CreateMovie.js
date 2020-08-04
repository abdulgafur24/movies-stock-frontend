import { useMutation } from "@apollo/client";
import { GET_COLLECTION_BY_ID } from "../gql/collections.api";
import { CREATE_MOVIE_MUTATION } from "../gql/movies.api";
import ErrorMessage from "./ErrorMessage";

export default function CreateMovie({ collectionId }) {
  const [createMovie, { loading, error }] = useMutation(CREATE_MOVIE_MUTATION);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new window.FormData(form);
    const name = formData.get("name");
    form.reset();

    createMovie({
      variables: { name, collectionId: parseInt(collectionId) },
      update: (cache, { data: { createMovie } }) => {
        const data = cache.readQuery({
          query: GET_COLLECTION_BY_ID,
          variables: {
            id: parseInt(collectionId),
          },
        });
        cache.writeQuery({
          query: GET_COLLECTION_BY_ID,
          data: {
            collectionById: {
              ...data.collectionById,
              movies: [...data.collectionById.movies, createMovie],
            },
          },
        });
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add movie to collection</h1>
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
