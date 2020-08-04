import { useMutation } from "@apollo/client";
import { REMOVE_MOVIE_MUTATION } from "../gql/movies.api";
import { GET_COLLECTION_BY_ID } from "../gql/collections.api";

export default function DeleteMovie({ movieId, collectionId }) {
  const [removeMovie] = useMutation(REMOVE_MOVIE_MUTATION);

  const handleRemoveMovie = () => {
    removeMovie({
      variables: {
        movieId: parseInt(movieId),
      },
      update: (cache, { data: { removeMovie } }) => {
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
              movies: data.collectionById.movies.filter(
                (movie) => movie.id !== removeMovie.id
              ),
            },
          },
        });
      },
    });
  };

  return (
    <button onClick={() => handleRemoveMovie()}>
      Remove
      <style jsx>{`
        button {
          background-color: transparent;
          border: 1px solid #e4e4e4;
          color: #000;
          cursor: pointer;
        }
        button:active {
          background-color: transparent;
        }
      `}</style>
    </button>
  );
}
