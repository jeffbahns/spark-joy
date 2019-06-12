import ApolloClient from "apollo-boost";
import fetch from "isomorphic-fetch";

const SERVER_URI = "https://3n16fnnvi4.execute-api.us-west-2.amazonaws.com/dev/graphql"
export const client = new ApolloClient({
    uri: SERVER_URI,
    fetch,
});