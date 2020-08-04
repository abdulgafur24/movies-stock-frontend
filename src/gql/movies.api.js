import { gql } from "@apollo/client";

export const CREATE_MOVIE_MUTATION = gql`
  mutation createMovie($name: String!, $collectionId: Int!) {
    createMovie(name: $name, collectionId: $collectionId) {
      id
      name
    }
  }
`;

export const REMOVE_MOVIE_MUTATION = gql`
  mutation removeMovie($movieId: Int!) {
    removeMovie(movieId: $movieId) {
      id
    }
  }
`;
