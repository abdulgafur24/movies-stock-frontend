import { gql } from "@apollo/client";

export const ALL_COLLECTIONS = gql`
  query {
    collections {
      id
      name
      moviesCount
    }
  }
`;

export const CREATE_COLLECTION_MUTATION = gql`
  mutation createCollection($name: String!) {
    createCollection(name: $name) {
      id
      name
      moviesCount
    }
  }
`;

export const GET_COLLECTION_BY_ID = gql`
  query collectionById($id: Int!) {
    collectionById(id: $id) {
      id
      name
      movies {
        id
        name
      }
    }
  }
`;
