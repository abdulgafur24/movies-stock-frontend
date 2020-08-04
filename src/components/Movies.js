import { useQuery } from "@apollo/client";
import ErrorMessage from "./ErrorMessage";
import DeleteMovie from "./DeleteMovie";
import { GET_COLLECTION_BY_ID } from "../gql/collections.api";

export default function Collections({ collectionId }) {
  const { loading, error, data } = useQuery(GET_COLLECTION_BY_ID, {
    variables: {
      id: parseInt(collectionId),
    },
  });

  if (error) return <ErrorMessage message="Error loading collection." />;
  if (loading) return <div>Loading</div>;

  const { collectionById } = data;

  return (
    <section>
      <h1>Collection: {collectionById.name}</h1>
      <ul>
        {collectionById.movies.map((movie, index) => (
          <li key={movie.id}>
            <div>
              <span>{index + 1}. </span>
              <a>{movie.name}</a>
              <DeleteMovie
                movieId={movie.id}
                collectionId={collectionById.id}
              />
            </div>
          </li>
        ))}
        {collectionById.movies.length <= 0 && (
          <span>List is empty. Try to add somthing</span>
        )}
      </ul>

      <style jsx>{`
        section {
          padding-bottom: 20px;
        }
        li {
          display: block;
          margin-bottom: 10px;
        }
        div {
          align-items: center;
          display: flex;
        }
        a {
          font-size: 14px;
          margin-right: 10px;
          text-decoration: none;
          padding-bottom: 0;
          border: 0;
        }
        span {
          font-size: 14px;
          margin-right: 5px;
        }
        ul {
          margin: 0;
          padding: 0;
        }
        button:before {
          align-self: center;
          border-style: solid;
          border-width: 6px 4px 0 4px;
          border-color: #ffffff transparent transparent transparent;
          content: "";
          height: 0;
          margin-right: 5px;
          width: 0;
        }
      `}</style>
    </section>
  );
}
