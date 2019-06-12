import { APIGatewayEvent } from "aws-lambda";
import { ApolloServer, gql } from "apollo-server-lambda";
import uuidv4 from "uuid/v4";
import { updateItem } from "./dynamodb";



const typeDefs = gql`
    type Query {
        hello: String
    }
    type Widget {
        widgetId: String!
        name: String!
        thumbsup: Int
        thumbsdown: Int
    }

    type Mutation {
        saveWidget(name: String!): Widget
    }
`;

const resolvers = {
    Query: {
        hello: () => "hello world"
    },
    Mutation: {
        saveWidget: async ( _: any, { name }: { name: string }) => {
            const widgetId = uuidv4();

            const result = await updateItem({
                    TableName: process.env.DYNAMODB_TABLE!,
                    Key: { widgetId },
                    UpdateExpression: "SET widgetId = :widgetId, widgetName = :name",
                    ExpressionAttributeValues: {
                        ":widgetId": widgetId,
                        ":name": name
                    }
            });
            console.log(result);
            return {
                name,
                widgetId: widgetId,
                thumbsup: 0,
                thumbsdown: 0
            };
        }
    }
}

export const server = new ApolloServer({
    typeDefs,
    resolvers
});

export const handler = server.createHandler();
