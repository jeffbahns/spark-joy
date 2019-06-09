import { APIGatewayEvent } from "aws-lambda";
import { ApolloServer, gql } from "apollo-server-lambda";

const typeDefs = gql`
    type Query {
        hello: String
    }
`;

const resolvers = {
    Query: {
        hello: () => "Hello World"
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
});
export const handler = server.createHandler();
