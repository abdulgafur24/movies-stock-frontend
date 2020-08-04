import Link from "next/link";
import { useQuery } from "@apollo/client";
import ErrorMessage from "./ErrorMessage";

import { ALL_COLLECTIONS } from "../gql/collections.api";

export default function Collections() {
  const { loading, error, data } = useQuery(ALL_COLLECTIONS);

  if (error) return <ErrorMessage message="Error loading collections." />;
  if (loading) return <div>Loading</div>;

  const { collections } = data;

  return (
    <section>
      <ul>
        {collections.map((collection, index) => (
          <li key={collection.id}>
            <div>
              <span>{index + 1}. </span>
              <Link href={"/collection/" + collection.id}>
                <a>{collection.name}</a>
              </Link>
              <span>({collection.moviesCount || 0})</span>
            </div>
          </li>
        ))}
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
